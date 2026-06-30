export interface IPASound {
  symbol: string;
  keyword: string;
  vietnameseCue: string;
  description: string;
  instruction: string;
  mouthCue: string;
  examples: { word: string; phonetic: string; translation: string }[];
  contrastSymbol?: string;
  mistake: string;
}

export interface SoundGroup {
  id: string;
  name: string;
  nameVi: string;
  sounds: IPASound[];
}

export interface MinimalPair {
  id: string;
  word1: string;
  word2: string;
  phonetic1: string;
  phonetic2: string;
  vietnameseExplanation: string;
  correctWordIndex: 0 | 1; // index of word to play/test
}

export interface StressWord {
  word: string;
  phonetic: string;
  stressPattern: string;
  meaning: string;
  context: 'marketing' | 'family' | 'ielts';
  syllables: string[];
  stressedIndex: number; // 0-based
}

export interface NounVerbContrast {
  noun: { word: string; phonetic: string; meaning: string };
  verb: { word: string; phonetic: string; meaning: string };
  explanation: string;
}

export interface PracticeSentence {
  id: string;
  category: 'marketing' | 'family' | 'ielts';
  text: string;
  phonetics: string;
  translation: string;
  stressHighlights: string[]; // key content words to stress
  targetSounds: string[]; // IPA symbols targeted
}

export const SOUND_GROUPS: SoundGroup[] = [
  {
    id: 'short-vowels',
    name: 'Short Vowels',
    nameVi: 'Nguyên âm ngắn',
    sounds: [
      {
        symbol: '/ɪ/',
        keyword: 'ship',
        vietnameseCue: 'i ngắn, dứt khoát',
        description: 'Short, lax front unrounded vowel.',
        instruction: 'Mở miệng tự nhiên, phát âm âm "i" cực kỳ ngắn, nhanh và dứt khoát. Âm trung gian giữa "i" và "ê" trong tiếng Việt.',
        mouthCue: 'Hai khóe miệng hơi khép hơn âm /i/ dài, lưỡi hạ thấp hơn, phát âm dứt khoát dưới 0.5 giây.',
        examples: [
          { word: 'bid', phonetic: '/bɪd/', translation: 'đấu thầu / giá thầu' },
          { word: 'click', phonetic: '/klɪk/', translation: 'lượt nhấp chuột' },
          { word: 'brief', phonetic: '/brif/', translation: 'bản yêu cầu sáng tạo (chú ý brief dùng /i/ dài, còn clip/click dùng /ɪ/ ngắn)' },
          { word: 'live', phonetic: '/lɪv/', translation: 'sống / trực tiếp' },
          { word: 'pitch', phonetic: '/pɪtʃ/', translation: 'bài thuyết trình ý tưởng' }
        ],
        contrastSymbol: '/i/',
        mistake: 'Người Việt thường đọc quá dài thành "íp", "ít" hoặc lẫn lộn với âm /i/ dài.'
      },
      {
        symbol: '/ɛ/',
        keyword: 'bed',
        vietnameseCue: 'e ngắn, mở vừa',
        description: 'Short, open-mid front unrounded vowel.',
        instruction: 'Mở miệng rộng hơn âm /ɪ/ một chút. Đầu lưỡi chạm nhẹ chân răng dưới. Phát âm dứt khoát giống chữ "e" nhẹ của tiếng Việt.',
        mouthCue: 'Khoảng cách môi mở rộng trung bình, lưỡi đặt thấp hơn âm /ɪ/.',
        examples: [
          { word: 'lead', phonetic: '/lɛd/', translation: 'đã dẫn dắt (quá khứ of lead /lid/)' },
          { word: 'spend', phonetic: '/spɛnd/', translation: 'chi tiêu ngân sách' },
          { word: 'metrics', phonetic: '/ˈmɛtrɪks/', translation: 'chỉ số đo lường' },
          { word: 'reps', phonetic: '/rɛps/', translation: 'lượt lặp lại / đại diện' }
        ],
        contrastSymbol: '/æ/',
        mistake: 'Dễ bị biến thành âm "ê" tiếng Việt nếu khép môi quá nhiều.'
      },
      {
        symbol: '/æ/',
        keyword: 'bad',
        vietnameseCue: 'a bẹt, mở rộng miệng',
        description: 'Near-open front unrounded vowel.',
        instruction: 'Mở rộng miệng hết cỡ sang hai bên và hạ hàm dưới xuống sâu. Lưỡi đè thấp. Phát âm ra âm lai giữa "a" và "e".',
        mouthCue: 'Miệng há to như đang cười lớn, hạ quai hàm tối đa, đầu lưỡi chạm chân răng dưới.',
        examples: [
          { word: 'ads', phonetic: '/ædz/', translation: 'quảng cáo' },
          { word: 'brand', phonetic: '/brænd/', translation: 'thương hiệu' },
          { word: 'campaign', phonetic: '/kæmˈpeɪn/', translation: 'chiến dịch' },
          { word: 'plan', phonetic: '/plæn/', translation: 'kế hoạch' }
        ],
        contrastSymbol: '/ɛ/',
        mistake: 'Người Việt thường đọc thành âm "e" thuần Việt (bét, ren, kem) làm mất độ mở của quai hàm.'
      },
      {
        symbol: '/ʊ/',
        keyword: 'good',
        vietnameseCue: 'u ngắn, lỏng môi',
        description: 'Near-close near-back rounded vowel.',
        instruction: 'Không chu môi nhiều như âm /u/ dài. Đẩy hơi ngắn ra từ cổ họng, môi mở tự nhiên, hơi lai giữa "u" và "ư".',
        mouthCue: 'Môi mở hơi tròn nhẹ, lỏng cơ miệng, phát âm cực nhanh.',
        examples: [
          { word: 'book', phonetic: '/bʊk/', translation: 'đặt chỗ / cuốn sách' },
          { word: 'good', phonetic: '/ɡʊd/', translation: 'tốt / chất lượng' },
          { word: 'look', phonetic: '/lʊk/', translation: 'nhìn / vẻ ngoài' },
          { word: 'push', phonetic: '/pʊʃ/', translation: 'thúc đẩy / đẩy mạnh' }
        ],
        contrastSymbol: '/u/',
        mistake: 'Hay đọc thành âm "u" tiếng Việt quá tròn môi và dài (gút, búk).'
      },
      {
        symbol: '/ʌ/',
        keyword: 'cup',
        vietnameseCue: 'á nhẹ, phát âm nhanh',
        description: 'Open-mid back unrounded vowel.',
        instruction: 'Mở miệng vừa phải, lưỡi đặt ở giữa miệng. Phát âm hơi giống âm "ớ" hoặc "á" ngắn trong tiếng Việt.',
        mouthCue: 'Miệng mở tự nhiên như khi nói từ "uh-huh". Hạ hàm dưới nhẹ.',
        examples: [
          { word: 'budget', phonetic: '/ˈbʌdʒət/', translation: 'ngân sách' },
          { word: 'funnel', phonetic: '/ˈfʌnəl/', translation: 'phễu marketing' },
          { word: 'run', phonetic: '/rʌn/', translation: 'khởi chạy chiến dịch' },
          { word: 'trust', phonetic: '/trʌst/', translation: 'sự tin cậy' }
        ],
        contrastSymbol: '/ɑ/',
        mistake: 'Dễ đọc thành "u" (bút-gét) hoặc "ă" quá nặng.'
      },
      {
        symbol: '/ə/',
        keyword: 'sofa',
        vietnameseCue: 'ơ nhẹ, không nhấn',
        description: 'Mid central vowel (Schwa).',
        instruction: 'Lỏng toàn bộ cơ miệng và lưỡi. Phát âm âm "ơ" cực kỳ ngắn và nhẹ. Đây là âm phổ biến nhất trong tiếng Anh, luôn không được nhấn trọng âm.',
        mouthCue: 'Miệng mở hờ tự nhiên nhất, không tốn chút sức lực nào.',
        examples: [
          { word: 'agenda', phonetic: '/əˈdʒɛndə/', translation: 'nội dung cuộc họp' },
          { word: 'conversion', phonetic: '/kənˈvɝʒən/', translation: 'lượt chuyển đổi' },
          { word: 'creative', phonetic: '/kriˈeɪtɪv/', translation: 'ấn phẩm sáng tạo' },
          { word: 'about', phonetic: '/əˈbaʊt/', translation: 'về cái gì đó' }
        ],
        contrastSymbol: '/ʌ/',
        mistake: 'Nhiều người cố phát âm rõ thành "a", "o" hoặc nhấn trọng âm vào âm Schwa này.'
      },
      {
        symbol: '/ɑ/',
        keyword: 'hot',
        vietnameseCue: 'o/a tròn sâu',
        description: 'Open back unrounded vowel.',
        instruction: 'Hạ quai hàm rộng, kéo lưỡi lùi sâu về phía sau cổ họng. Phát âm âm hơi lai giữa "o" và "a" dứt khoát.',
        mouthCue: 'Há miệng tròn to theo chiều dọc, đầu lưỡi không chạm răng.',
        examples: [
          { word: 'copy', phonetic: '/ˈkɑpi/', translation: 'lời quảng cáo / bản sao' },
          { word: 'jobs', phonetic: '/dʒɑbz/', translation: 'công việc' },
          { word: 'blocker', phonetic: '/ˈblɑkɚ/', translation: 'vấn đề gây tắc nghẽn' },
          { word: 'shop', phonetic: '/ʃɑp/', translation: 'cửa hàng / mua sắm' }
        ],
        contrastSymbol: '/ɔ/',
        mistake: 'Đọc thành âm "o" dẹt kiểu tiếng Việt (hót, cóp-pi), thiếu độ mở dọc và chiều sâu họng.'
      }
    ]
  },
  {
    id: 'long-vowels',
    name: 'Long Vowels',
    nameVi: 'Nguyên âm dài',
    sounds: [
      {
        symbol: '/i/',
        keyword: 'sheep',
        vietnameseCue: 'i dài, kéo khóe miệng',
        description: 'Close front unrounded vowel.',
        instruction: 'Kéo khóe miệng sang hai bên như đang mỉm cười. Phát âm chữ "i" kéo dài khoảng 1.5 giây, âm thanh căng và rõ.',
        mouthCue: 'Mép miệng căng rộng, đầu lưỡi nâng cao hướng về vòm miệng.',
        examples: [
          { word: 'reach', phonetic: '/ritʃ/', translation: 'lượt tiếp cận' },
          { word: 'lead', phonetic: '/lid/', translation: 'khách hàng tiềm năng' },
          { word: 'brief', phonetic: '/brif/', translation: 'bản yêu cầu sáng tạo' },
          { word: 'team', phonetic: '/tim/', translation: 'đội ngũ' }
        ],
        contrastSymbol: '/ɪ/',
        mistake: 'Đọc quá ngắn giống âm /ɪ/ khiến người nghe nhầm lẫn giữa "lead" và "lid" hoặc "reach" và "rich".'
      },
      {
        symbol: '/u/',
        keyword: 'shoot',
        vietnameseCue: 'u tròn môi kéo dài',
        description: 'Close back rounded vowel.',
        instruction: 'Chu môi tròn và nhỏ về phía trước như đang huýt sáo. Phát âm âm "u" sâu kéo dài hơi.',
        mouthCue: 'Môi chúm nhỏ tròn trịa, lưỡi nâng cao ở phía sau.',
        examples: [
          { word: 'tool', phonetic: '/tul/', translation: 'công cụ hỗ trợ' },
          { word: 'group', phonetic: '/ɡrup/', translation: 'nhóm / phòng ban' },
          { word: 'approval', phonetic: '/əˈpruvəl/', translation: 'sự phê duyệt' },
          { word: 'room', phonetic: '/rum/', translation: 'phòng họp / không gian' }
        ],
        contrastSymbol: '/ʊ/',
        mistake: 'Không chu tròn môi đủ sâu, làm âm thanh bị loãng và ngắn.'
      },
      {
        symbol: '/ɔ/',
        keyword: 'door',
        vietnameseCue: 'o sâu tròn môi',
        description: 'Open-mid back rounded vowel.',
        instruction: 'Môi hơi tròn, kéo hàm dưới xuống một chút và kéo lưỡi lùi sâu. Phát âm âm "o" trầm và sâu kéo dài.',
        mouthCue: 'Khẩu hình miệng tròn vừa, lưỡi rút về sau để hơi đi qua sâu từ họng.',
        examples: [
          { word: 'forecast', phonetic: '/ˈfɔrkæst/', translation: 'dự báo' },
          { word: 'audience', phonetic: '/ˈɔdiəns/', translation: 'khán giả / tệp đối tượng' },
          { word: 'call', phonetic: '/kɔl/', translation: 'cuộc gọi / liên lạc' },
          { word: 'board', phonetic: '/bɔrd/', translation: 'bảng tin / ban giám đốc' }
        ],
        contrastSymbol: '/ɑ/',
        mistake: 'Thường đọc thành âm "o" dẹt hoặc nhầm lẫn sang âm Schwa /ə/.'
      },
      {
        symbol: '/ɝ/',
        keyword: 'bird',
        vietnameseCue: 'ơ cong lưỡi r',
        description: 'Open-mid central rounded vowel with r-coloring.',
        instruction: 'Mở miệng tự nhiên, phát âm âm "ơ" đồng thời cuộn đầu lưỡi sâu về phía sau nhưng không chạm vòm họng để tạo âm "r" đặc trưng Mỹ.',
        mouthCue: 'Môi mở hờ tròn nhẹ, lưỡi cong hình chiếc thìa kéo lùi về sau.',
        examples: [
          { word: 'workstream', phonetic: '/ˈwɝkstrim/', translation: 'luồng công việc' },
          { word: 'search', phonetic: '/sɝtʃ/', translation: 'tìm kiếm' },
          { word: 'first', phonetic: '/fɝst/', translation: 'đầu tiên' },
          { word: 'learn', phonetic: '/lɝn/', translation: 'học hỏi' }
        ],
        contrastSymbol: '/ə/',
        mistake: 'Đọc thành "ơ" phẳng hoặc "uốc" (quấc-chim, sớt-ch) mà quên không cong đầu lưỡi tạo âm R.'
      }
    ]
  },
  {
    id: 'diphthongs',
    name: 'Diphthongs',
    nameVi: 'Nguyên âm đôi',
    sounds: [
      {
        symbol: '/eɪ/',
        keyword: 'day',
        vietnameseCue: 'ê-i lướt nhanh',
        description: 'Diphthong shifting from mid-front to close-front.',
        instruction: 'Mở miệng phát âm âm /ɛ/ rồi lướt mượt mà sang âm /ɪ/. Không đọc thành âm "ê" phẳng lì.',
        mouthCue: 'Miệng dẹt dần khi chuyển sang âm /ɪ/, khóe miệng hơi kéo ra sau.',
        examples: [
          { word: 'campaign', phonetic: '/kæmˈpeɪn/', translation: 'chiến dịch' },
          { word: 'takeaway', phonetic: '/ˈteɪkəˌweɪ/', translation: 'điểm rút ra chính' },
          { word: 'agency', phonetic: '/ˈeɪdʒənsi/', translation: 'đơn vị truyền thông' },
          { word: 'database', phonetic: '/ˈdeɪtəˌbeɪs/', translation: 'cơ sở dữ liệu' }
        ],
        mistake: 'Hay đọc thành âm "ê" tiếng Việt (kem-pen, ê-gần-si).'
      },
      {
        symbol: '/aɪ/',
        keyword: 'sky',
        vietnameseCue: 'a-i thanh thoát',
        description: 'Diphthong shifting from open-front to close-front.',
        instruction: 'Phát âm âm /ɑ/ mở rộng hàm rồi từ từ lướt nhanh lên âm /ɪ/. Giữ âm /ɑ/ chiếm 70% thời gian.',
        mouthCue: 'Miệng thu hẹp dần từ há to sang dẹt.',
        examples: [
          { word: 'buyer', phonetic: '/ˈbaɪɚ/', translation: 'người mua' },
          { word: 'guideline', phonetic: '/ˈɡaɪdlaɪn/', translation: 'quy chuẩn hướng dẫn' },
          { word: 'client', phonetic: '/ˈklaɪənt/', translation: 'khách hàng' },
          { word: 'timeline', phonetic: '/ˈtaɪmlaɪn/', translation: 'tiến độ dự án' }
        ],
        mistake: 'Đọc thành "ai" dẹt ngắn kiểu tiếng Việt, thiếu độ sâu hơi từ hàm dưới.'
      },
      {
        symbol: '/oʊ/',
        keyword: 'no',
        vietnameseCue: 'ô-u tròn môi',
        description: 'Diphthong shifting from mid-back to close-back.',
        instruction: 'Bắt đầu bằng âm "ô" nhẹ rồi khép tròn môi dần sang âm "u". Đây là âm "O" tiêu chuẩn Mỹ.',
        mouthCue: 'Khẩu hình khép dần từ tròn vừa sang chu tròn nhỏ.',
        examples: [
          { word: 'owner', phonetic: '/ˈoʊnɚ/', translation: 'người làm chủ đầu việc' },
          { word: 'notes', phonetic: '/noʊts/', translation: 'ghi chép / biên bản' },
          { word: 'mix', phonetic: '/mɪks/', translation: 'sự phối hợp (chú ý: post/social/mix)' },
          { word: 'growth', phonetic: '/ɡroʊθ/', translation: 'sự tăng trưởng' }
        ],
        mistake: 'Hay đọc thành chữ "ô" phẳng đơn thuần (nốt, ôn-nơ).'
      },
      {
        symbol: '/aʊ/',
        keyword: 'cow',
        vietnameseCue: 'a-u tròn hơi sâu',
        description: 'Diphthong shifting from open to close-back.',
        instruction: 'Phát âm âm /ɑ/ há to hàm rồi lướt thật nhanh sang khép tròn môi âm /ʊ/.',
        mouthCue: 'Miệng khép đột ngột thành hình tròn nhỏ.',
        examples: [
          { word: 'account', phonetic: '/əˈkaʊnt/', translation: 'tài khoản khách hàng' },
          { word: 'outreach', phonetic: '/ˈaʊtˌritʃ/', translation: 'tiếp cận cộng đồng' },
          { word: 'hours', phonetic: '/ˈaʊɚz/', translation: 'giờ giấc làm việc' }
        ],
        mistake: 'Đọc thành "ao" cụt tiếng Việt làm mất âm đuôi tròn môi.'
      }
    ]
  },
  {
    id: 'difficult-consonants',
    name: 'Key Consonants',
    nameVi: 'Phụ âm trọng điểm',
    sounds: [
      {
        symbol: '/θ/',
        keyword: 'thin',
        vietnameseCue: 'th - kẹp lưỡi thổi hơi',
        description: 'Voiceless dental fricative.',
        instruction: 'Đặt đầu lưỡi ở giữa răng cửa trên và dưới. Thổi hơi mạnh thoát ra ngoài qua khe răng. Không rung dây thanh quản.',
        mouthCue: 'Đầu lưỡi nhô ra ngoài nhẹ giữa hai hàng răng, không phát ra tiếng mà chỉ có tiếng gió xì.',
        examples: [
          { word: 'growth', phonetic: '/ɡroʊθ/', translation: 'sự tăng trưởng' },
          { word: 'think', phonetic: '/θɪŋk/', translation: 'suy nghĩ' },
          { word: 'path', phonetic: '/pæθ/', translation: 'con đường / lộ trình' },
          { word: 'monthly', phonetic: '/ˈmʌnθli/', translation: 'hằng tháng' }
        ],
        contrastSymbol: '/s/',
        mistake: 'Rất hay đọc thành chữ "th" tiếng Việt (gờ-rốt, thinh) hoặc đổi hẳn thành âm "t" hoặc "s".'
      },
      {
        symbol: '/ð/',
        keyword: 'this',
        vietnameseCue: 'đ/d - kẹp lưỡi rung cổ',
        description: 'Voiced dental fricative.',
        instruction: 'Khẩu hình giống hệt âm /θ/ (đặt lưỡi giữa răng). Tuy nhiên, thay vì chỉ thổi gió, bạn cần rung dây thanh quản tạo tiếng rừ rừ.',
        mouthCue: 'Lưỡi kẹp nhẹ giữa hai răng, cổ họng rung rõ rệt.',
        examples: [
          { word: 'the', phonetic: '/ðə/', translation: 'mạo từ "the"' },
          { word: 'this', phonetic: '/ðɪs/', translation: 'cái này' },
          { word: 'with', phonetic: '/wɪð/', translation: 'với' },
          { word: 'together', phonetic: '/təˈɡɛðɚ/', translation: 'cùng nhau' }
        ],
        contrastSymbol: '/d/',
        mistake: 'Hay đọc hẳn thành chữ "d" hoặc "đ" Việt Nam (đít, đát, wit).'
      },
      {
        symbol: '/ʃ/',
        keyword: 'she',
        vietnameseCue: 's nặng - cong môi xì hơi',
        description: 'Voiceless postalveolar fricative.',
        instruction: 'Chu môi tròn về phía trước, hai hàm răng khép gần sát. Cong đầu lưỡi lên gần vòm họng. Thổi luồng hơi mạnh thoát ra ngoài.',
        mouthCue: 'Môi chu loe ra, luồng hơi thoát ra nghe tiếng xì xì rất ấm.',
        examples: [
          { word: 'share', phonetic: '/ʃɛr/', translation: 'chia sẻ' },
          { word: 'short', phonetic: '/ʃɔrt/', translation: 'ngắn hạn' },
          { word: 'action', phonetic: '/ˈækʃən/', translation: 'hành động' },
          { word: 'shop', phonetic: '/ʃɑp/', translation: 'cửa hàng' }
        ],
        contrastSymbol: '/s/',
        mistake: 'Hay đọc nhẹ thành chữ "s" tiếng Việt (se, sút-phim), làm mất đi âm ấm của vòm miệng.'
      },
      {
        symbol: '/tʃ/',
        keyword: 'chin',
        vietnameseCue: 'ch - bật hơi cong môi',
        description: 'Voiceless postalveolar affricate.',
        instruction: 'Chu môi tròn giống âm /ʃ/. Đặt đầu lưỡi lên nướu răng trên để chặn hơi lại, sau đó bật mạnh đầu lưỡi xuống để giải phóng luồng hơi.',
        mouthCue: 'Môi chu loe nhẹ, lưỡi chạm vòm miệng bật mạnh tạo âm bật dứt khoát.',
        examples: [
          { word: 'pitch', phonetic: '/pɪtʃ/', translation: 'bài trình bày ý tưởng' },
          { word: 'channel', phonetic: '/ˈtʃænəl/', translation: 'kênh marketing' },
          { word: 'reach', phonetic: '/ritʃ/', translation: 'lượt tiếp cận' },
          { word: 'launch', phonetic: '/lɔntʃ/', translation: 'khởi chạy' }
        ],
        contrastSymbol: '/t/',
        mistake: 'Đọc thành "ch" tiếng Việt dẹt môi và không bật hơi (pít, sênh-nần).'
      },
      {
        symbol: '/dʒ/',
        keyword: 'joy',
        vietnameseCue: 'ch/gi - bật hơi rung cổ',
        description: 'Voiced postalveolar affricate.',
        instruction: 'Khẩu hình và thao tác bật hơi giống hệt âm /tʃ/. Tuy nhiên, phải rung dây thanh quản ở cổ họng thật mạnh khi bật hơi ra.',
        mouthCue: 'Chu môi loe nhẹ, đầu lưỡi bật xuống, họng rung rất rõ.',
        examples: [
          { word: 'manager', phonetic: '/ˈmænədʒɚ/', translation: 'quản lý / sếp' },
          { word: 'budget', phonetic: '/ˈbʌdʒət/', translation: 'ngân sách' },
          { word: 'agenda', phonetic: '/əˈdʒɛndə/', translation: 'nội dung họp' },
          { word: 'agency', phonetic: '/ˈeɪdʒənsi/', translation: 'agency quảng cáo' }
        ],
        contrastSymbol: '/z/',
        mistake: 'Dễ đọc thành "z" hoặc chữ "gi" nhẹ Việt Nam (bắt-dít, mê-ni-zơ).'
      },
      {
        symbol: '/v/',
        keyword: 'van',
        vietnameseCue: 'v - răng trên môi dưới',
        description: 'Voiced labiodental fricative.',
        instruction: 'Đặt răng cửa hàm trên chạm nhẹ lên phần trong môi dưới. Đẩy luồng hơi đi qua khe răng môi đồng thời rung cổ họng.',
        mouthCue: 'Răng trên kháp môi dưới, rung tê nhẹ ở môi.',
        examples: [
          { word: 'conversion', phonetic: '/kənˈvɝʒən/', translation: 'lượt chuyển đổi' },
          { word: 'view', phonetic: '/vju/', translation: 'lượt xem' },
          { word: 'creative', phonetic: '/kriˈeɪtɪv/', translation: 'ấn phẩm sáng tạo' },
          { word: 'review', phonetic: '/rɪˈvju/', translation: 'đánh giá / xem lại' }
        ],
        contrastSymbol: '/f/',
        mistake: 'Người miền Nam dễ đọc thành "d/gi" (diu, cờ-ri-ây-díp), người miền Bắc dễ đọc thiếu rung dứt khoát.'
      }
    ]
  }
];

export const MINIMAL_PAIRS: MinimalPair[] = [
  {
    id: 'mp_01',
    word1: 'ship',
    word2: 'sheep',
    phonetic1: '/s-h-i-p/',
    phonetic2: '/s-h-e-e-p/',
    vietnameseExplanation: ' ship dùng /ɪ/ ngắn dứt khoát. sheep dùng /i/ dài căng miệng cười.',
    correctWordIndex: 0
  },
  {
    id: 'mp_02',
    word1: 'live',
    word2: 'leave',
    phonetic1: '/l-ɪ-v/',
    phonetic2: '/l-i-v/',
    vietnameseExplanation: ' live dùng /ɪ/ ngắn. leave dùng /i/ dài kéo dài khóe miệng.',
    correctWordIndex: 1
  },
  {
    id: 'mp_03',
    word1: 'full',
    word2: 'fool',
    phonetic1: '/f-ʊ-l/',
    phonetic2: '/f-u-l/',
    vietnameseExplanation: ' full dùng /ʊ/ ngắn, thả lỏng môi. fool dùng /u/ dài tròn chúm môi.',
    correctWordIndex: 0
  },
  {
    id: 'mp_04',
    word1: 'bed',
    word2: 'bad',
    phonetic1: '/b-ɛ-d/',
    phonetic2: '/b-æ-d/',
    vietnameseExplanation: ' bed dùng /ɛ/ vừa miệng. bad dùng /æ/ bẹt há miệng cực to kéo sang hai bên.',
    correctWordIndex: 1
  },
  {
    id: 'mp_05',
    word1: 'hat',
    word2: 'hot',
    phonetic1: '/h-æ-t/',
    phonetic2: '/h-ɑ-t/',
    vietnameseExplanation: ' hat dùng /æ/ bẹt miệng bẹt ngang. hot dùng /ɑ/ tròn mở sâu hàm dọc đặc trưng Mỹ.',
    correctWordIndex: 0
  },
  {
    id: 'mp_06',
    word1: 'fan',
    word2: 'van',
    phonetic1: '/f-æ-n/',
    phonetic2: '/v-æ-n/',
    vietnameseExplanation: ' fan không rung dây thanh quản (vô thanh). van phải rung mạnh cổ họng (hữu thanh).',
    correctWordIndex: 1
  },
  {
    id: 'mp_07',
    word1: 'rice',
    word2: 'lice',
    phonetic1: '/r-aɪ-s/',
    phonetic2: '/l-aɪ-s/',
    vietnameseExplanation: ' rice bắt đầu bằng âm cuộn lưỡi r sâu. lice bắt đầu bằng âm đầu lưỡi chạm răng l.',
    correctWordIndex: 0
  },
  {
    id: 'mp_08',
    word1: 'thin',
    word2: 'sin',
    phonetic1: '/θ-ɪ-n/',
    phonetic2: '/s-ɪ-n/',
    vietnameseExplanation: ' thin kẹp lưỡi giữa răng thổi gió. sin khép răng xì gió không kẹp lưỡi.',
    correctWordIndex: 0
  },
  {
    id: 'mp_09',
    word1: 'think',
    word2: 'sink',
    phonetic1: '/θ-ɪ-ŋ-k/',
    phonetic2: '/s-ɪ-ŋ-k/',
    vietnameseExplanation: ' think thổi hơi qua khe lưỡi răng. sink răng khép xì gió thông thường.',
    correctWordIndex: 0
  },
  {
    id: 'mp_10',
    word1: 'bad',
    word2: 'bat',
    phonetic1: '/b-æ-d/',
    phonetic2: '/b-æ-t/',
    vietnameseExplanation: ' bad kết thúc bằng phụ âm hữu thanh d rung cổ. bat kết thúc bằng t bật gió dứt khoát.',
    correctWordIndex: 1
  },
  {
    id: 'mp_11',
    word1: 'light',
    word2: 'right',
    phonetic1: '/l-aɪ-t/',
    phonetic2: '/r-aɪ-t/',
    vietnameseExplanation: ' light đầu lưỡi đặt chân răng trên. right chu tròn môi cong lưỡi r sâu trước khi phát âm.',
    correctWordIndex: 1
  },
  {
    id: 'mp_12',
    word1: 'walk',
    word2: 'work',
    phonetic1: '/w-ɔ-k/',
    phonetic2: '/w-ɝ-k/',
    vietnameseExplanation: ' walk dùng nguyên âm /ɔ/ sâu miệng tròn. work dùng nguyên âm trung tâm cong lưỡi /ɝ/.',
    correctWordIndex: 1
  }
];

export const NOUN_VERB_CONTRASTS: NounVerbContrast[] = [
  {
    noun: { word: 'present', phonetic: '/ˈprɛzənt/', meaning: 'món quà / bản trình bày' },
    verb: { word: 'present', phonetic: '/prɪˈzɛnt/', meaning: 'trình bày / thuyết trình' },
    explanation: 'Danh từ nhấn âm 1 (PREsent), động từ nhấn âm 2 (preSENT) và chuyển âm Schwa ở âm đầu.'
  },
  {
    noun: { word: 'record', phonetic: '/ˈrɛkɚd/', meaning: 'bản ghi / kỷ lục' },
    verb: { word: 'record', phonetic: '/rɪˈkɔrd/', meaning: 'ghi âm / thu hình' },
    explanation: 'Danh từ nhấn âm 1 (REcord), động từ nhấn âm 2 (reCORD) có nguyên âm cuối thay đổi sâu.'
  },
  {
    noun: { word: 'increase', phonetic: '/ˈɪnkris/', meaning: 'sự gia tăng' },
    verb: { word: 'increase', phonetic: '/ɪnˈkris/', meaning: 'gia tăng / làm tăng' },
    explanation: 'Danh từ nhấn âm 1 (INcrease), động từ nhấn âm 2 (inCREASE).'
  },
  {
    noun: { word: 'produce', phonetic: '/ˈproʊdus/', meaning: 'nông sản / sản phẩm' },
    verb: { word: 'produce', phonetic: '/prəˈdus/', meaning: 'sản xuất / chế tạo' },
    explanation: 'Danh từ nhấn âm 1 (PROduce), động từ nhấn âm 2 (proDUCE) chuyển âm đầu thành Schwa.'
  }
];

export const STRESS_WORDS: StressWord[] = [
  {
    word: 'marketing',
    phonetic: '/ˈmɑrkətɪŋ/',
    stressPattern: 'O o o',
    meaning: 'tiếp thị',
    context: 'marketing',
    syllables: ['mar', 'ket', 'ing'],
    stressedIndex: 0
  },
  {
    word: 'campaign',
    phonetic: '/kæmˈpeɪn/',
    stressPattern: 'o O',
    meaning: 'chiến dịch',
    context: 'marketing',
    syllables: ['cam', 'paign'],
    stressedIndex: 1
  },
  {
    word: 'advertisement',
    phonetic: '/ˌædvɚˈtaɪzmənt/',
    stressPattern: 'o o O o',
    meaning: 'quảng cáo',
    context: 'marketing',
    syllables: ['ad', 'ver', 'tise', 'ment'],
    stressedIndex: 2
  },
  {
    word: 'strategy',
    phonetic: '/ˈstrætədʒi/',
    stressPattern: 'O o o',
    meaning: 'chiến lược',
    context: 'marketing',
    syllables: ['strat', 'e', 'gy'],
    stressedIndex: 0
  },
  {
    word: 'budget',
    phonetic: '/ˈbʌdʒət/',
    stressPattern: 'O o',
    meaning: 'ngân sách',
    context: 'marketing',
    syllables: ['bud', 'get'],
    stressedIndex: 0
  },
  {
    word: 'groceries',
    phonetic: '/ˈɡroʊsəriz/',
    stressPattern: 'O o o',
    meaning: 'thực phẩm tạp hóa',
    context: 'family',
    syllables: ['gro', 'cer', 'ies'],
    stressedIndex: 0
  },
  {
    word: 'routine',
    phonetic: '/ruˈtin/',
    stressPattern: 'o O',
    meaning: 'thói quen hằng ngày',
    context: 'family',
    syllables: ['rou', 'tine'],
    stressedIndex: 1
  },
  {
    word: 'affordable',
    phonetic: '/əˈfɔrdəbəl/',
    stressPattern: 'o O o o',
    meaning: 'hợp túi tiền / phải chăng',
    context: 'ielts',
    syllables: ['af', 'ford', 'a', 'ble'],
    stressedIndex: 1
  }
];

export const PRACTICE_SENTENCES: PracticeSentence[] = [
  {
    id: 'ps_01',
    category: 'marketing',
    text: 'I need to review the campaign results.',
    phonetics: '/aɪ nid tu rɪˈvju ðə kæmˈpeɪn rɪˈzʌlts/',
    translation: 'Tôi cần xem xét kết quả chiến dịch.',
    stressHighlights: ['need', 'review', 'campaign', 'results'],
    targetSounds: ['/i/', '/eɪ/', '/v/']
  },
  {
    id: 'ps_02',
    category: 'marketing',
    text: 'We can launch the new creative tomorrow.',
    phonetics: '/wi kæn lɔntʃ ðə nu kriˈeɪtɪv təˈmɑroʊ/',
    translation: 'Chúng ta có thể khởi chạy ấn phẩm sáng tạo mới vào ngày mai.',
    stressHighlights: ['launch', 'new', 'creative', 'tomorrow'],
    targetSounds: ['/tʃ/', '/v/', '/oʊ/']
  },
  {
    id: 'ps_03',
    category: 'family',
    text: 'Can you pick up the child after work?',
    phonetics: '/kæn ju pɪk ʌp ðə tʃaɪld ˈæftɚ wɝk/',
    translation: 'Anh có thể đón con sau khi đi làm về không?',
    stressHighlights: ['pick up', 'child', 'after', 'work'],
    targetSounds: ['/ɪ/', '/tʃ/', '/ɝ/']
  },
  {
    id: 'ps_04',
    category: 'family',
    text: 'I need to buy groceries after dinner.',
    phonetics: '/aɪ nid tu baɪ ˈɡroʊsəriz ˈæftɚ ˈdɪnɚ/',
    translation: 'Tôi cần mua thực phẩm tạp hóa sau bữa tối.',
    stressHighlights: ['need', 'buy', 'groceries', 'dinner'],
    targetSounds: ['/i/', '/aɪ/', '/oʊ/']
  },
  {
    id: 'ps_05',
    category: 'ielts',
    text: 'I think public transport should be more affordable.',
    phonetics: '/aɪ θɪŋk ˈpʌblɪk ˈtrænspɔrt ʃʊd bi mɔr əˈfɔrdəbəl/',
    translation: 'Tôi nghĩ giao thông công cộng nên có giá cả phải chăng hơn.',
    stressHighlights: ['think', 'public', 'transport', 'more', 'affordable'],
    targetSounds: ['/θ/', '/ʊ/', '/ɔ/']
  }
];
