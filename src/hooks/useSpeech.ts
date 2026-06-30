import { useState, useEffect, useCallback } from 'react';
import { SpeechSettings } from '../types';

export const DEFAULT_SPEECH_SETTINGS: SpeechSettings = {
  selectedEnglishVoiceName: 'Google US English',
  selectedVietnameseVoiceName: 'Linh',
  speechRatePreset: 1.1,
};

const PREFERRED_ENGLISH_VOICES = ['Google US English', 'Google UK English Female', 'Google UK English Male'];

export function useSpeech(settings: SpeechSettings = DEFAULT_SPEECH_SETTINGS, onUpdateSettings?: (updater: (prev: SpeechSettings) => SpeechSettings) => void) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [currentSettings, setCurrentSettings] = useState<SpeechSettings>(settings);

  useEffect(() => {
    const updateVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
      setVoicesLoaded(true);
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const getActiveEnglishVoice = useCallback(() => {
      const requested = voices.find(v => v.name === currentSettings.selectedEnglishVoiceName);
      if (requested) return requested;
      
      for (const name of PREFERRED_ENGLISH_VOICES) {
          const v = voices.find(v => v.name === name);
          if (v) return v;
      }
      return voices.find(v => v.lang.startsWith('en-US')) || voices.find(v => v.lang.startsWith('en')) || null;
  }, [voices, currentSettings.selectedEnglishVoiceName]);

  const speak = useCallback((text: string, context: 'english' | 'vietnamese', rate: number = currentSettings.speechRatePreset) => {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = context === 'english' 
        ? getActiveEnglishVoice() 
        : voices.find(v => v.name === currentSettings.selectedVietnameseVoiceName) || voices.find(v => v.lang.startsWith('vi')) || null;
    
    utterance.voice = voice;
    utterance.lang = context === 'english' ? 'en-US' : 'vi-VN';
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.volume = 1;
    
    window.speechSynthesis.speak(utterance);
  }, [voices, currentSettings, getActiveEnglishVoice]);

  const previewEnglishVoice = useCallback((text: string) => {
      speak(text, 'english', currentSettings.speechRatePreset);
  }, [speak, currentSettings.speechRatePreset]);

  const updateSettings = (newSettings: SpeechSettings) => {
      setCurrentSettings(newSettings);
      if (onUpdateSettings) {
          onUpdateSettings(() => newSettings);
      }
  };

  return { 
      speak, 
      previewEnglishVoice,
      englishVoices: voices.filter(v => PREFERRED_ENGLISH_VOICES.includes(v.name)),
      vietnameseVoices: voices.filter(v => v.name === 'Linh'),
      settings: currentSettings, 
      updateSettings,
      voicesLoaded,
      activeEnglishVoice: getActiveEnglishVoice()
  };
}
