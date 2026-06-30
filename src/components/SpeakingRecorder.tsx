import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Play, Pause, Trash2, AlertCircle, Save, CheckCircle2, MicOff, RefreshCw } from 'lucide-react';
import { audioDB } from '../data/audioDB';

interface SpeakingRecorderProps {
  lessonId: string;
  onSave: (audioId: string, transcript: string) => void;
  savedAudioId?: string;
  savedTranscript?: string;
}

export default function SpeakingRecorder({ lessonId, onSave, savedAudioId, savedTranscript }: SpeakingRecorderProps) {
  const [isSupported, setIsSupported] = useState(true);
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied' | 'no_mic' | 'in_use' | 'insecure' | 'error'>('prompt');
  
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioMissing, setAudioMissing] = useState(false);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const [transcript, setTranscript] = useState(savedTranscript || '');
  const [isSaved, setIsSaved] = useState(!!savedAudioId);
  const [isSaving, setIsSaving] = useState(false);
  
  const [lastError, setLastError] = useState<{name: string, message: string} | null>(null);
  const [isIframe, setIsIframe] = useState<boolean>(false);
  const [selectedMimeType, setSelectedMimeType] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsIframe(window !== window.parent);
    
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      setIsSupported(false);
      if (window.isSecureContext === false) {
        setPermissionState('insecure');
      }
    }
    
    // Check if we have a saved audio ID to load
    if (savedAudioId) {
      audioDB.getAudio(savedAudioId).then(blob => {
        if (blob) {
          setAudioBlob(blob);
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
          setIsSaved(true);
        } else {
          setAudioMissing(true);
        }
      }).catch(err => {
        console.error('Failed to load audio from IndexedDB', err);
        setAudioMissing(true);
      });
    }
    
    return () => {
      cleanup();
    };
  }, [savedAudioId]);

  const cleanup = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const getSupportedMimeType = () => {
    const possibleTypes = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/ogg;codecs=opus',
      'audio/ogg',
      'audio/aac'
    ];
    for (const type of possibleTypes) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return '';
  };

  const startRecording = async () => {
    try {
      setAudioMissing(false);
      setLastError(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      setPermissionState('granted');
      streamRef.current = stream;
      
      const mimeType = getSupportedMimeType();
      setSelectedMimeType(mimeType);
      const options = mimeType ? { mimeType } : undefined;
      
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType || 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      };
      
      mediaRecorder.start(100);
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      setIsSaved(false);
      
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (err: any) {
      console.warn('Microphone access failed:', err);
      setLastError({ name: err.name, message: err.message });
      
      if (err.name === 'NotAllowedError') {
        setPermissionState('denied');
      } else if (err.name === 'NotFoundError') {
        setPermissionState('no_mic');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setPermissionState('in_use');
      } else if (err.name === 'SecurityError') {
        setPermissionState('insecure');
      } else {
        setPermissionState('error');
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  const resetRecording = async () => {
    // Stop tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // Revoke URL
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    
    // Remove from DB if saved
    if (savedAudioId && isSaved) {
      try {
        await audioDB.deleteAudio(savedAudioId);
      } catch (e) {
        console.error("Failed to delete audio from IndexedDB", e);
      }
    }
    
    setAudioBlob(null);
    setRecordingTime(0);
    setIsSaved(false);
    setPlaybackTime(0);
    setIsPlaying(false);
    setPermissionState('prompt');
    setAudioMissing(false);
    
    // Tell parent to clear audioId, but keep transcript
    onSave('', transcript);
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setPlaybackTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      // Some browsers have issues with Blob duration, default to recorded time if needed
      setDuration(audioRef.current.duration === Infinity ? recordingTime : audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setPlaybackTime(0);
  };

  const saveAudio = async () => {
    if (!audioBlob && !transcript.trim()) return; // Must have one or the other
    
    setIsSaving(true);
    const audioId = `audio_${lessonId}_${Date.now()}`;
    
    try {
      if (audioBlob) {
        await audioDB.saveAudio(audioId, audioBlob);
      }
      onSave(audioBlob ? audioId : '', transcript);
      setIsSaved(true);
    } catch (err) {
      console.error('Failed to save audio', err);
      alert('Không thể lưu audio vào bộ nhớ máy, nhưng bản nháp text vẫn sẽ được lưu tạm.');
      onSave('', transcript); // Fallback to saving just transcript
      setIsSaved(true);
    } finally {
      setIsSaving(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!isSupported) {
    return (
      <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-red-800">Trình duyệt không hỗ trợ ghi âm</h4>
          <p className="text-xs text-red-600 mt-1">
            Vui lòng sử dụng Chrome, Firefox, hoặc Safari phiên bản mới nhất, hoặc chỉ nhập văn bản vào ô transcript bên dưới.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Recording Area */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-4">
        {permissionState === 'denied' && (
          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-800 text-xs flex items-col items-start gap-2 mb-4">
            <div className="flex gap-2">
              <MicOff className="h-4 w-4 shrink-0 mt-0.5" />
              <span className="text-left">Vui lòng cấp quyền sử dụng Micro trong trình duyệt để ghi âm. Nếu đã từ chối, hãy vào cài đặt trình duyệt để mở lại.</span>
            </div>
          </div>
        )}
        {permissionState === 'no_mic' && (
          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-800 text-xs flex gap-2 mb-4">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="text-left">Không tìm thấy Micro. Vui lòng kết nối Micro và thử lại.</span>
          </div>
        )}
        {permissionState === 'in_use' && (
          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-800 text-xs flex gap-2 mb-4">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="text-left">Micro đang được sử dụng bởi ứng dụng khác. Vui lòng đóng ứng dụng đó và thử lại.</span>
          </div>
        )}
        {permissionState === 'insecure' && (
          <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-red-800 text-xs flex gap-2 mb-4">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="text-left">Trình duyệt chặn Micro vì trang web không bảo mật (yêu cầu HTTPS).</span>
          </div>
        )}
        {permissionState === 'error' && (
          <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-red-800 text-xs flex gap-2 mb-4">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="text-left">Đã xảy ra lỗi khi khởi động Micro. Bạn có thể thử tải lại trang hoặc dùng tính năng nhập Transcript.</span>
          </div>
        )}

        {isIframe && permissionState !== 'prompt' && permissionState !== 'granted' && (
          <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-blue-800 text-xs flex gap-2 mt-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="text-left font-medium">Bản xem trước nhúng có thể đang chặn quyền Micro. Hãy mở ứng dụng ở tab riêng hoặc dùng URL Deploy/Publish HTTPS để thử lại.</span>
          </div>
        )}
        
        {audioMissing && !audioBlob && (
          <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-blue-800 text-xs flex items-center justify-center gap-2 mb-4">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span className="text-left">Không thể tải lại file ghi âm cũ. Transcript vẫn được giữ lại. Bạn có thể thu âm lại nếu muốn.</span>
          </div>
        )}

        {!audioBlob ? (
          <div className="space-y-4">
            <div className={`text-4xl font-mono font-bold ${isRecording ? 'text-emerald-600' : 'text-slate-400'}`}>
              {formatTime(recordingTime)}
            </div>
            
            <div className="flex justify-center gap-3">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  disabled={permissionState === 'denied'}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-full h-14 w-14 flex items-center justify-center transition-transform hover:scale-105"
                  title="Start Recording"
                >
                  <Mic className="h-6 w-6" />
                </button>
              ) : (
                <>
                  {isPaused ? (
                    <button
                      onClick={resumeRecording}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full h-14 w-14 flex items-center justify-center transition-transform hover:scale-105"
                      title="Resume"
                    >
                      <Mic className="h-6 w-6" />
                    </button>
                  ) : (
                    <button
                      onClick={pauseRecording}
                      className="bg-amber-500 hover:bg-amber-600 text-white rounded-full h-14 w-14 flex items-center justify-center transition-transform hover:scale-105"
                      title="Pause"
                    >
                      <Pause className="h-6 w-6" />
                    </button>
                  )}
                  <button
                    onClick={stopRecording}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full h-14 w-14 flex items-center justify-center transition-transform hover:scale-105"
                    title="Stop"
                  >
                    <Square className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            {!isRecording && permissionState === 'prompt' && (
              <p className="text-xs text-slate-500">Bấm để bắt đầu ghi âm</p>
            )}
            {isRecording && (
              <p className="text-xs text-emerald-600 animate-pulse font-medium">
                {isPaused ? 'Đã tạm dừng' : 'Đang ghi âm...'}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white border border-slate-200 p-2 pl-4 rounded-xl shadow-sm">
              <span className="text-sm font-mono text-slate-600 w-12 text-left">
                {formatTime(playbackTime)}
              </span>
              
              <div className="flex-1 px-4">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-100"
                    style={{ width: `${duration ? (playbackTime / duration) * 100 : 0}%` }}
                  />
                </div>
              </div>
              
              <span className="text-sm font-mono text-slate-600 w-12 text-right pr-2">
                {formatTime(duration || recordingTime)}
              </span>
              
              <button
                onClick={togglePlayback}
                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 h-10 w-10 rounded-lg flex items-center justify-center ml-2 transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
            </div>
            
            {audioUrl && (
              <audio
                ref={audioRef}
                src={audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                className="hidden"
              />
            )}
            
            <div className="flex justify-center gap-3">
              <button
                onClick={resetRecording}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-lg hover:bg-slate-50 text-xs font-semibold disabled:opacity-50"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Thu âm lại
              </button>
              
              {!isSaved ? (
                <button
                  onClick={saveAudio}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-xs font-semibold disabled:opacity-50"
                >
                  <Save className="h-3.5 w-3.5" /> 
                  {isSaving ? 'Đang lưu...' : 'Lưu bản thu'}
                </button>
              ) : (
                <div className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold">
                  <CheckCircle2 className="h-4 w-4" /> Đã lưu
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Transcript Fallback Area */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
          Transcript (Tùy chọn)
        </label>
        <p className="text-[11px] text-slate-500 leading-relaxed mb-2">
          Viết ra nội dung bạn vừa nói (hoặc định nói) để hệ thống có thể phân tích từ vựng và ngữ pháp chi tiết hơn.
        </p>
        <textarea
          value={transcript}
          onChange={(e) => {
            setTranscript(e.target.value);
            setIsSaved(false); // require re-saving if transcript changes
          }}
          className="w-full h-32 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-sm font-sans"
          placeholder="Nhập nội dung bạn đã nói..."
        />
      </div>
      
      {transcript.trim() && !audioBlob && !isSaved && (
        <div className="flex justify-end">
          <button
            onClick={saveAudio}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-xs font-semibold disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" /> 
            {isSaving ? 'Đang lưu...' : 'Nộp Transcript (Không cần thu âm)'}
          </button>
        </div>
      )}

      {/* Development Diagnostics Panel */}
      {(import.meta as any).env?.DEV && (
        <div className="mt-8 p-4 bg-slate-800 text-slate-300 rounded-xl font-mono text-[10px] space-y-2">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
            <span className="font-bold text-slate-100 uppercase tracking-wider">Recorder Diagnostics</span>
            <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[9px]">DEV ONLY</span>
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div><span className="text-slate-500">isSecureContext:</span> {window.isSecureContext ? 'true' : 'false'}</div>
            <div><span className="text-slate-500">isIframe:</span> {isIframe ? 'true' : 'false'}</div>
            
            <div><span className="text-slate-500">MediaRecorder API:</span> {typeof window.MediaRecorder !== 'undefined' ? 'supported' : 'missing'}</div>
            <div><span className="text-slate-500">navigator.mediaDevices:</span> {navigator.mediaDevices ? 'supported' : 'missing'}</div>
            
            <div><span className="text-slate-500">MIME Type:</span> {selectedMimeType || 'pending...'}</div>
            <div><span className="text-slate-500">Permission State:</span> {permissionState}</div>
          </div>
          
          {lastError && (
            <div className="mt-2 pt-2 border-t border-slate-700">
              <div className="text-red-400 font-bold mb-1">Latest Error: {lastError.name}</div>
              <div className="text-slate-400 break-all">{lastError.message}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
