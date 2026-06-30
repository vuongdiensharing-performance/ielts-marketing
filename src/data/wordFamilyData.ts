export interface WordForm {
  word: string;
  type: 'Verb' | 'Noun' | 'Adjective' | 'Adverb';
  phonetic: string;
  meaningVi: string;
  example: string;
  exampleVi: string;
}

export interface WordFamily {
  id: string;
  root: string;
  meaningVi: string;
  forms: WordForm[];
  coachNoteVi: string;
}

export interface AffixExample {
  word: string;
  root: string;
  meaningVi: string;
  sentence: string;
  sentenceVi: string;
}

export interface Affix {
  affix: string;
  type: 'prefix' | 'suffix';
  meaning: string;
  meaningVi: string;
  examples: AffixExample[];
}

export interface SpellingExample {
  base: string;
  modified: string;
  explanationVi: string;
}

export interface SpellingQuiz {
  sentence: string;
  options: string[];
  correctIndex: number;
  explanationVi: string;
}

export interface SpellingRule {
  id: string;
  title: string;
  titleVi: string;
  concept: string;
  conceptVi: string;
  examples: SpellingExample[];
  quiz: SpellingQuiz[];
}

// Phase 2B: Context Practice Interfaces & Data
export interface ContextQuestion {
  id: string;
  category: 'marketing' | 'family' | 'ielts';
  type: 'choose' | 'complete' | 'identify' | 'transform';
  instructionVi: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanationVi: string;
}

export interface ClinicCase {
  id: string;
  title: string;
  titleVi: string;
  symptomVi: string;
  brokenSentence: string;
  diagnosticVi: string;
  cureSentence: string;
  testSentence: string;
  testOptions: string[];
  testCorrectIndex: number;
  testExplanationVi: string;
}

// Word Families Seed Data
export const WORD_FAMILIES: WordFamily[] = [
  {
    id: 'optimize',
    root: 'optimize',
    meaningVi: 'tối ưu hóa',
    coachNoteVi: 'Học cách phân biệt động từ hành động "optimize" (tối ưu hóa), danh từ quá trình "optimization" (sự tối ưu hóa) và tính từ "optimal" (tốt nhất, đạt hiệu suất tối đa). Marketers Việt hay viết nhầm "optimization" thành "optimizing" hoặc dùng sai từ loại trong câu như "for get optimal results" thay vì "to get optimal results".',
    forms: [
      {
        word: 'optimize',
        type: 'Verb',
        phonetic: '/ˈɑːptɪmaɪz/',
        meaningVi: 'tối ưu hóa (hành động)',
        example: 'We need to optimize our Google Ads bidding strategy to reduce CPA.',
        exampleVi: 'Chúng ta cần tối ưu hóa chiến lược đặt giá thầu Google Ads để giảm chi phí trên mỗi lượt chuyển đổi (CPA).'
      },
      {
        word: 'optimization',
        type: 'Noun',
        phonetic: '/ˌɑːptɪmaɪˈzeɪʃn/',
        meaningVi: 'sự tối ưu hóa (quá trình/hoạt động)',
        example: 'Search engine optimization (SEO) is a long-term play for organic traffic.',
        exampleVi: 'Tối ưu hóa công cụ tìm kiếm (SEO) là một chiến lược dài hạn để có được lượng truy cập tự nhiên.'
      },
      {
        word: 'optimizer',
        type: 'Noun',
        phonetic: '/ˈɑːptɪmaɪzər/',
        meaningVi: 'người/công cụ tối ưu hóa',
        example: 'As a conversion rate optimizer, she runs A/B tests on landing pages.',
        exampleVi: 'Với vai trò là một chuyên gia tối ưu hóa tỷ lệ chuyển đổi, cô ấy chạy thử nghiệm A/B trên các trang đích.'
      },
      {
        word: 'optimal',
        type: 'Adjective',
        phonetic: '/ˈɑːptɪməl/',
        meaningVi: 'tối ưu, lý tưởng (trạng thái đạt hiệu quả cao nhất)',
        example: 'The optimal budget distribution between Facebook and TikTok is 60:40.',
        exampleVi: 'Sự phân bổ ngân sách tối ưu giữa Facebook và TikTok là 60:40.'
      },
      {
        word: 'optimally',
        type: 'Adverb',
        phonetic: '/ˈɑːptɪməlɪ/',
        meaningVi: 'một cách tối ưu',
        example: 'The campaign is now performing optimally after our audience refinement.',
        exampleVi: 'Chiến dịch hiện đang hoạt động một cách tối ưu sau khi chúng tôi tinh chỉnh tệp đối tượng.'
      }
    ]
  },
  {
    id: 'analyze',
    root: 'analyze',
    meaningVi: 'phân tích',
    coachNoteVi: 'Chú ý cách viết: tiếng Anh-Mỹ thường dùng đuôi "-yze" (analyze) còn tiếng Anh-Anh dùng "-yse" (analyse). Danh từ chỉ hành động phân tích là "analysis" (phát âm là /əˈnæləsɪs/, số nhiều đổi thành "analyses" /əˈnæləsiːz/), trong khi danh từ chỉ con người là "analyst". Tính từ "analytical" thường mô tả tư duy phân tích của một marketer.',
    forms: [
      {
        word: 'analyze',
        type: 'Verb',
        phonetic: '/ˈænəlaɪz/',
        meaningVi: 'phân tích (hành động)',
        example: 'Let’s analyze the campaign report to see where the drop-off occurs.',
        exampleVi: 'Hãy cùng phân tích báo cáo chiến dịch để xem tỷ lệ rơi rụng khách hàng xảy ra ở đâu.'
      },
      {
        word: 'analysis',
        type: 'Noun',
        phonetic: '/əˈnæləsɪs/',
        meaningVi: 'sự phân tích, bản phân tích (vật/quá trình)',
        example: 'The data analysis revealed that retargeting ads drive 70% of sales.',
        exampleVi: 'Bản phân tích dữ liệu chỉ ra rằng quảng cáo bám đuổi (retargeting) đóng góp tới 70% doanh số.'
      },
      {
        word: 'analyst',
        type: 'Noun',
        phonetic: '/ˈænəlɪst/',
        meaningVi: 'chuyên viên phân tích (người)',
        example: 'Our performance analyst tracks daily ROAS and CPM fluctuations.',
        exampleVi: 'Chuyên viên phân tích hiệu suất của chúng tôi theo dõi biến động ROAS và CPM hằng ngày.'
      },
      {
        word: 'analytical',
        type: 'Adjective',
        phonetic: '/ˌænəˈlɪtɪkl/',
        meaningVi: 'thuộc về phân tích, có tính phân tích',
        example: 'A good growth marketer must possess strong analytical skills.',
        exampleVi: 'Một nhà tiếp thị tăng trưởng giỏi phải sở hữu kỹ năng phân tích mạnh mẽ.'
      },
      {
        word: 'analytically',
        type: 'Adverb',
        phonetic: '/ˌænəˈlɪtɪklɪ/',
        meaningVi: 'dưới góc độ phân tích, một cách khoa học',
        example: 'We approached the creative brief analytically rather than emotionally.',
        exampleVi: 'Chúng tôi tiếp cận bản yêu cầu sáng tạo một cách phân tích khoa học thay vì theo cảm tính.'
      }
    ]
  },
  {
    id: 'create',
    root: 'create',
    meaningVi: 'sáng tạo, tạo ra',
    coachNoteVi: 'Động từ "create" (tạo ra), danh từ "creation" (sự sáng tạo/tác phẩm), danh từ chỉ phẩm chất "creativity" (sức sáng tạo), danh từ chỉ người "creator" (nhà sáng tạo nội dung), tính từ "creative" (sáng tạo), và trạng từ "creatively". Trong marketing, "content creator" là vai trò cực kỳ quen thuộc.',
    forms: [
      {
        word: 'create',
        type: 'Verb',
        phonetic: '/kriˈeɪt/',
        meaningVi: 'tạo ra, sáng tạo (hành động)',
        example: 'We need to create a content calendar for next month.',
        exampleVi: 'Chúng ta cần tạo một lịch nội dung cho tháng tới.'
      },
      {
        word: 'creation',
        type: 'Noun',
        phonetic: '/kriˈeɪʃn/',
        meaningVi: 'sự sáng tạo, tác phẩm',
        example: 'The creation of this brand identity took six months.',
        exampleVi: 'Sự sáng tạo nên bộ nhận diện thương hiệu này đã mất sáu tháng.'
      },
      {
        word: 'creativity',
        type: 'Noun',
        phonetic: '/ˌkriːeɪˈtɪvətɪ/',
        meaningVi: 'sức sáng tạo, óc sáng tạo',
        example: 'Digital marketing campaigns require a mix of data and creativity.',
        exampleVi: 'Các chiến dịch tiếp thị số yêu cầu sự kết hợp giữa dữ liệu và sức sáng tạo.'
      },
      {
        word: 'creator',
        type: 'Noun',
        phonetic: '/kriˈeɪtər/',
        meaningVi: 'nhà sáng tạo (con người)',
        example: 'The content creator designed an engaging video hook.',
        exampleVi: 'Nhà sáng tạo nội dung đã thiết kế một đoạn mở đầu video hấp dẫn.'
      },
      {
        word: 'creative',
        type: 'Adjective',
        phonetic: '/kriˈeɪtɪv/',
        meaningVi: 'sáng tạo (có tính chất)',
        example: 'She has many creative ideas for the TikTok video.',
        exampleVi: 'Cô ấy có nhiều ý tưởng sáng tạo cho video TikTok.'
      },
      {
        word: 'creatively',
        type: 'Adverb',
        phonetic: '/kriˈeɪtɪvlɪ/',
        meaningVi: 'một cách sáng tạo',
        example: 'The team solved the low CTR problem creatively.',
        exampleVi: 'Đội ngũ đã giải quyết vấn đề tỷ lệ nhấp (CTR) thấp một cách sáng tạo.'
      }
    ]
  },
  {
    id: 'decide',
    root: 'decide',
    meaningVi: 'quyết định',
    coachNoteVi: 'Phân biệt động từ "decide" (quyết định), danh từ "decision" (quyết định), tính từ "decisive" (mang tính quyết định, dứt khoát) và trạng từ "decisively" (một cách dứt khoát).',
    forms: [
      {
        word: 'decide',
        type: 'Verb',
        phonetic: '/dɪˈsaɪd/',
        meaningVi: 'quyết định',
        example: 'We must decide on our primary marketing channel today.',
        exampleVi: 'Chúng ta phải quyết định về kênh tiếp thị chính của mình hôm nay.'
      },
      {
        word: 'decision',
        type: 'Noun',
        phonetic: '/dɪˈsɪʒn/',
        meaningVi: 'quyết định',
        example: 'The decision to pause the campaign was based on low ROAS.',
        exampleVi: 'Quyết định tạm dừng chiến dịch dựa trên chỉ số ROAS thấp.'
      },
      {
        word: 'decisive',
        type: 'Adjective',
        phonetic: '/dɪˈsaɪsɪv/',
        meaningVi: 'mang tính quyết định, quả quyết',
        example: 'Our decisive action saved 20% of the quarterly budget.',
        exampleVi: 'Hành động dứt khoát của chúng tôi đã tiết kiệm được 20% ngân sách quý.'
      },
      {
        word: 'decisively',
        type: 'Adverb',
        phonetic: '/dɪˈsaɪsɪvlɪ/',
        meaningVi: 'một cách quyết đoán/dứt khoát',
        example: 'The marketing lead acted decisively during the crisis.',
        exampleVi: 'Trưởng nhóm tiếp thị đã hành động một cách dứt khoát trong suốt cuộc khủng hoảng.'
      }
    ]
  },
  {
    id: 'communicate',
    root: 'communicate',
    meaningVi: 'giao tiếp, truyền thông',
    coachNoteVi: 'Tính từ của "communicate" thường dùng là "communicative" (mô tả người cởi mở, thích giao tiếp) hoặc "communicational" (liên quan đến truyền thông, kỹ thuật giao tiếp). Danh từ hành động "communication" thường dùng ở dạng số nhiều "communications" (hoặc MarCom - Marketing Communications) để chỉ các hoạt động truyền thông tích hợp quảng cáo.',
    forms: [
      {
        word: 'communicate',
        type: 'Verb',
        phonetic: '/kəˈmjuːnɪkeɪt/',
        meaningVi: 'giao tiếp, truyền đạt thông điệp',
        example: 'The brand copywriter must communicate the unique selling proposition clearly.',
        exampleVi: 'Người viết nội dung thương hiệu phải truyền đạt được lợi điểm bán hàng độc nhất (USP) một cách rõ ràng.'
      },
      {
        word: 'communication',
        type: 'Noun',
        phonetic: '/kəˌmjuːnɪˈkeɪʃn/',
        meaningVi: 'sự giao tiếp, việc truyền thông, thông điệp',
        example: 'Poor communication between the client and the account manager led to a delay.',
        exampleVi: 'Giao tiếp kém hiệu quả giữa khách hàng và quản lý tài khoản (account manager) đã dẫn tới việc chậm trễ.'
      },
      {
        word: 'communicator',
        type: 'Noun',
        phonetic: '/kəˈmjuːnɪkeɪtər/',
        meaningVi: 'người truyền đạt, người giao tiếp',
        example: 'A good brand ambassador is not just a celebrity, but an authentic communicator.',
        exampleVi: 'Một đại sứ thương hiệu tốt không chỉ là một ngôi sao, mà phải là một người truyền đạt chân thực.'
      },
      {
        word: 'communicative',
        type: 'Adjective',
        phonetic: '/kəˈmjuːnɪkeɪtɪv/',
        meaningVi: 'có tính cởi mở, thích giao tiếp',
        example: 'The new product manager is highly communicative and always open to feedback.',
        exampleVi: 'Quản lý sản phẩm mới là người cực kỳ cởi mở giao tiếp và luôn đón nhận phản hồi.'
      },
      {
        word: 'communicatively',
        type: 'Adverb',
        phonetic: '/kəˈmjuːnɪkeɪtɪvlɪ/',
        meaningVi: 'một cách cởi mở/truyền đạt',
        example: 'They worked communicatively to resolve client feedback.',
        exampleVi: 'Họ đã làm việc một cách cởi mở để giải quyết các phản hồi từ khách hàng.'
      }
    ]
  },
  {
    id: 'improve',
    root: 'improve',
    meaningVi: 'cải thiện, nâng cao',
    coachNoteVi: 'Động từ "improve" (cải tiến/nâng cao), danh từ "improvement" (sự cải tiến), tính từ "improved" (đã được cải thiện) mô tả kết quả chiến dịch sau khi tinh chỉnh.',
    forms: [
      {
        word: 'improve',
        type: 'Verb',
        phonetic: '/ɪmˈpruːv/',
        meaningVi: 'cải thiện, nâng cấp',
        example: 'We must improve our website loading speed to lower bounce rate.',
        exampleVi: 'Chúng ta phải cải thiện tốc độ tải trang web để giảm tỷ lệ thoát.'
      },
      {
        word: 'improvement',
        type: 'Noun',
        phonetic: '/ɪmˈpruːvmənt/',
        meaningVi: 'sự cải tiến, sự nâng cao',
        example: 'We saw a significant improvement in conversion rate.',
        exampleVi: 'Chúng tôi thấy một sự cải thiện đáng kể trong tỷ lệ chuyển đổi.'
      },
      {
        word: 'improved',
        type: 'Adjective',
        phonetic: '/ɪmˈpruːvd/',
        meaningVi: 'được cải thiện, tốt hơn',
        example: 'The improved landing page performed better in A/B testing.',
        exampleVi: 'Trang đích đã được cải tiến hoạt động tốt hơn trong thử nghiệm A/B.'
      }
    ]
  },
  {
    id: 'perform',
    root: 'perform',
    meaningVi: 'vận hành, đạt hiệu suất',
    coachNoteVi: 'Trong Performance Marketing, "perform" mô tả hoạt động hiệu quả của các nhóm quảng cáo. Danh từ "performance" (hiệu suất) là thuật ngữ nòng cốt.',
    forms: [
      {
        word: 'perform',
        type: 'Verb',
        phonetic: '/pərˈfɔːrm/',
        meaningVi: 'hoạt động, vận hành, thể hiện',
        example: 'The retargeting ad group is starting to perform well.',
        exampleVi: 'Nhóm quảng cáo bám đuổi đang bắt đầu hoạt động tốt.'
      },
      {
        word: 'performance',
        type: 'Noun',
        phonetic: '/pərˈfɔːrməns/',
        meaningVi: 'hiệu suất, kết quả hoạt động',
        example: 'We track our daily ad performance using custom dashboards.',
        exampleVi: 'Chúng tôi theo dõi hiệu suất quảng cáo hằng ngày bằng bảng điều khiển tùy chỉnh.'
      },
      {
        word: 'performer',
        type: 'Noun',
        phonetic: '/pərˈfɔːrmər/',
        meaningVi: 'người thể hiện, thành phần hoạt động',
        example: 'This video hook is our top performer of the week.',
        exampleVi: 'Đoạn mở đầu video này là phần mang lại hiệu quả tốt nhất trong tuần.'
      },
      {
        word: 'performing',
        type: 'Adjective',
        phonetic: '/pərˈfɔːrmɪŋ/',
        meaningVi: 'đang hoạt động, đang thể hiện',
        example: 'We scaled up our high-performing ad sets.',
        exampleVi: 'Chúng tôi đã tăng ngân sách cho các nhóm quảng cáo đang hoạt động hiệu quả cao.'
      }
    ]
  },
  {
    id: 'succeed',
    root: 'succeed',
    meaningVi: 'thành công',
    coachNoteVi: 'Động từ "succeed" (đạt được thành công), danh từ "success" (sự thành công), tính từ "successful" (thành công) và trạng từ "successfully" (một cách thành công). Tránh viết nhầm "success" thành "sucess"!',
    forms: [
      {
        word: 'succeed',
        type: 'Verb',
        phonetic: '/səkˈsiːd/',
        meaningVi: 'thành công, đạt thắng lợi',
        example: 'To succeed in social commerce, brands must master live-streaming.',
        exampleVi: 'Để thành công trong thương mại mạng xã hội, các thương hiệu phải làm chủ việc phát trực tiếp.'
      },
      {
        word: 'success',
        type: 'Noun',
        phonetic: '/səkˈsɛs/',
        meaningVi: 'sự thành công',
        example: 'The success of the campaign was due to precise audience targeting.',
        exampleVi: 'Sự thành công của chiến dịch là nhờ nhắm mục tiêu đối tượng chính xác.'
      },
      {
        word: 'successful',
        type: 'Adjective',
        phonetic: '/səkˈsɛsfl/',
        meaningVi: 'thành công (tính từ)',
        example: 'Our email campaign was highly successful with a 25% open rate.',
        exampleVi: 'Chiến dịch email của chúng tôi đã thành công rực rỡ với tỷ lệ mở 25%.'
      },
      {
        word: 'successfully',
        type: 'Adverb',
        phonetic: '/səkˈsɛsfəlɪ/',
        meaningVi: 'một cách thành công',
        example: 'We successfully migrated our customer database to the new CRM.',
        exampleVi: 'Chúng tôi đã di chuyển thành công cơ sở dữ liệu khách hàng sang hệ thống CRM mới.'
      }
    ]
  },
  {
    id: 'organize',
    root: 'organize',
    meaningVi: 'tổ chức, sắp xếp',
    coachNoteVi: 'Động từ "organize", danh từ "organization" (sự tổ chức/tổ chức doanh nghiệp), danh từ "organizer" (người tổ chức), tính từ "organizational" (liên quan đến tổ chức) và tính từ "organized" (gọn gàng, có tổ chức).',
    forms: [
      {
        word: 'organize',
        type: 'Verb',
        phonetic: '/ˈɔːrɡənaɪz/',
        meaningVi: 'tổ chức, sắp xếp',
        example: 'We need to organize our digital assets into clear folders.',
        exampleVi: 'Chúng ta cần sắp xếp các tài nguyên số của mình vào các thư mục rõ ràng.'
      },
      {
        word: 'organization',
        type: 'Noun',
        phonetic: '/ˌɔːrɡənəˈzeɪʃn/',
        meaningVi: 'sự tổ chức, doanh nghiệp',
        example: 'A clear campaign organization is critical for agency workflows.',
        exampleVi: 'Sự tổ chức chiến dịch rõ ràng là rất quan trọng đối với quy trình làm việc của agency.'
      },
      {
        word: 'organizer',
        type: 'Noun',
        phonetic: '/ˈɔːrɡənaɪzər/',
        meaningVi: 'người tổ chức, ban tổ chức',
        example: 'The event organizer sent the registration data to the marketing team.',
        exampleVi: 'Người tổ chức sự kiện đã gửi dữ liệu đăng ký cho đội ngũ marketing.'
      },
      {
        word: 'organized',
        type: 'Adjective',
        phonetic: '/ˈɔːrɡənaɪzd/',
        meaningVi: 'được sắp xếp ngăn nắp, có tổ chức',
        example: 'Keeping an organized content calendar saves hours of work.',
        exampleVi: 'Giữ một lịch nội dung được sắp xếp ngăn nắp giúp tiết kiệm hàng giờ làm việc.'
      }
    ]
  },
  {
    id: 'plan',
    root: 'plan',
    meaningVi: 'lên kế hoạch',
    coachNoteVi: 'Lưu ý quy tắc nhân đôi phụ âm cuối trước khi thêm "-ing" hoặc "-ed" trong spelling của "planning" và "planned".',
    forms: [
      {
        word: 'plan',
        type: 'Verb',
        phonetic: '/plæn/',
        meaningVi: 'lên kế hoạch, dự định',
        example: 'We plan to launch a new brand awareness campaign next week.',
        exampleVi: 'Chúng tôi lên kế hoạch khởi chạy một chiến dịch nhận diện thương hiệu mới vào tuần tới.'
      },
      {
        word: 'plan',
        type: 'Noun',
        phonetic: '/plæn/',
        meaningVi: 'kế hoạch (bản kế hoạch)',
        example: 'We drafted a detailed media plan for Q4.',
        exampleVi: 'Chúng tôi đã phác thảo một kế hoạch truyền thông chi tiết cho quý 4.'
      },
      {
        word: 'planning',
        type: 'Noun',
        phonetic: '/ˈplænɪŋ/',
        meaningVi: 'hoạt động/quy trình lên kế hoạch',
        example: 'Strategic planning is the first phase of any product launch.',
        exampleVi: 'Lên kế hoạch chiến lược là giai đoạn đầu tiên của bất kỳ đợt ra mắt sản phẩm nào.'
      },
      {
        word: 'planned',
        type: 'Adjective',
        phonetic: '/plænd/',
        meaningVi: 'đã được lên kế hoạch',
        example: 'The planned spend is $5,000 for search ads.',
        exampleVi: 'Chi phí đã được lên kế hoạch là 5.000 USD cho quảng cáo tìm kiếm.'
      }
    ]
  },
  {
    id: 'respond',
    root: 'respond',
    meaningVi: 'phản hồi, phản ứng',
    coachNoteVi: 'Động từ "respond", danh từ "response" (sự phản hồi/câu trả lời), tính từ "responsive" (nhạy bén, có phản hồi nhanh) và trạng từ "responsively".',
    forms: [
      {
        word: 'respond',
        type: 'Verb',
        phonetic: '/rɪˈspɑːnd/',
        meaningVi: 'phản hồi, trả lời',
        example: 'Our support team must respond to client inquiries within 10 minutes.',
        exampleVi: 'Đội ngũ hỗ trợ của chúng tôi phải phản hồi các yêu cầu của khách hàng trong vòng 10 phút.'
      },
      {
        word: 'response',
        type: 'Noun',
        phonetic: '/rɪˈspɑːns/',
        meaningVi: 'sự phản hồi, câu trả lời',
        example: 'The audience response to the brand video was overwhelmingly positive.',
        exampleVi: 'Sự phản hồi của khán giả đối với video thương hiệu là cực kỳ tích cực.'
      },
      {
        word: 'responsive',
        type: 'Adjective',
        phonetic: '/rɪˈspɑːnsɪv/',
        meaningVi: 'phản hồi nhanh nhạy, tương thích tốt',
        example: 'Responsive web design is critical for mobile user experience.',
        exampleVi: 'Thiết kế trang web tương thích nhanh nhạy là rất quan trọng đối với trải nghiệm người dùng di động.'
      },
      {
        word: 'responsively',
        type: 'Adverb',
        phonetic: '/rɪˈspɑːnsɪvlɪ/',
        meaningVi: 'một cách nhanh nhạy, có phản hồi',
        example: 'The agency acted responsively to the client\'s urgent feedback.',
        exampleVi: 'Agency đã hành động một cách nhanh nhạy trước phản hồi khẩn cấp của khách hàng.'
      }
    ]
  },
  {
    id: 'develop',
    root: 'develop',
    meaningVi: 'phát triển',
    coachNoteVi: 'Động từ "develop", danh từ "development" (sự phát triển), danh từ "developer" (nhà phát triển), tính từ "developing" hoặc "developed".',
    forms: [
      {
        word: 'develop',
        type: 'Verb',
        phonetic: '/dɪˈvɛləp/',
        meaningVi: 'phát triển (hành động)',
        example: 'Our product team needs to develop a user-friendly onboarding flow.',
        exampleVi: 'Đội ngũ sản phẩm của chúng tôi cần phát triển một luồng giới thiệu thân thiện với người dùng.'
      },
      {
        word: 'development',
        type: 'Noun',
        phonetic: '/dɪˈvɛləpmənt/',
        meaningVi: 'sự phát triển, quá trình phát triển',
        example: 'Software development requires close collaboration with product managers.',
        exampleVi: 'Phát triển phần mềm yêu cầu sự hợp tác chặt chẽ với những người quản lý sản phẩm.'
      },
      {
        word: 'developer',
        type: 'Noun',
        phonetic: '/dɪˈvɛləpər/',
        meaningVi: 'nhà phát triển (con người/lập trình viên)',
        example: 'Our web developer optimized the loading speed of the landing page.',
        exampleVi: 'Nhà phát triển web của chúng tôi đã tối ưu hóa tốc độ tải của trang đích.'
      },
      {
        word: 'developing',
        type: 'Adjective',
        phonetic: '/dɪˈvɛləpɪŋ/',
        meaningVi: 'đang phát triển',
        example: 'We are focusing on developing markets in Southeast Asia.',
        exampleVi: 'Chúng tôi đang tập trung vào các thị trường đang phát triển ở Đông Nam Á.'
      }
    ]
  },
  {
    id: 'manage',
    root: 'manage',
    meaningVi: 'quản lý, điều hành',
    coachNoteVi: 'Động từ "manage", danh từ "management" (sự quản lý, ban quản lý), danh từ "manager" (người quản lý), tính từ "managerial" (thuộc về quản lý) và "manageable" (có thể quản lý được).',
    forms: [
      {
        word: 'manage',
        type: 'Verb',
        phonetic: '/ˈmænɪdʒ/',
        meaningVi: 'quản lý, điều hành (hành động)',
        example: 'Account managers must manage client expectations carefully.',
        exampleVi: 'Quản lý tài khoản phải quản lý kỳ vọng của khách hàng một cách cẩn thận.'
      },
      {
        word: 'management',
        type: 'Noun',
        phonetic: '/ˈmænɪdʒmənt/',
        meaningVi: 'sự quản lý, ban quản lý',
        example: 'Effective time management is a key skill for digital marketers.',
        exampleVi: 'Quản lý thời gian hiệu quả là một kỹ năng then chốt đối với các nhà tiếp thị số.'
      },
      {
        word: 'manager',
        type: 'Noun',
        phonetic: '/ˈmænɪdʒər/',
        meaningVi: 'người quản lý',
        example: 'The campaign manager monitored the daily ad budget utilization.',
        exampleVi: 'Người quản lý chiến dịch đã theo dõi việc sử dụng ngân sách quảng cáo hằng ngày.'
      },
      {
        word: 'managerial',
        type: 'Adjective',
        phonetic: '/ˌmænəˈdʒɪriəl/',
        meaningVi: 'thuộc về quản lý, có tính quản lý',
        example: 'She was promoted to a managerial role after achieving great campaign KPIs.',
        exampleVi: 'Cô ấy đã được thăng chức lên một vai trò quản lý sau khi đạt được KPI chiến dịch tuyệt vời.'
      }
    ]
  },
  {
    id: 'compete',
    root: 'compete',
    meaningVi: 'cạnh tranh',
    coachNoteVi: 'Động từ "compete", danh từ "competition" (sự cạnh tranh), danh từ "competitor" (đối thủ cạnh tranh), tính từ "competitive" (có tính cạnh tranh) và trạng từ "competitively".',
    forms: [
      {
        word: 'compete',
        type: 'Verb',
        phonetic: '/kəmˈpiːt/',
        meaningVi: 'cạnh tranh, thi đấu',
        example: 'To compete in this market, we must offer a unique value proposition.',
        exampleVi: 'Để cạnh tranh trong thị trường này, chúng ta phải đưa ra một tuyên bố giá trị độc nhất.'
      },
      {
        word: 'competition',
        type: 'Noun',
        phonetic: '/ˌkɑːmpəˈtɪʃn/',
        meaningVi: 'sự cạnh tranh, cuộc thi',
        example: 'Market competition is driving up our Facebook CPM.',
        exampleVi: 'Sự cạnh tranh thị trường đang đẩy giá CPM Facebook của chúng tôi lên cao.'
      },
      {
        word: 'competitor',
        type: 'Noun',
        phonetic: '/kəmˈpɛtɪtər/',
        meaningVi: 'đối thủ cạnh tranh (người/thương hiệu)',
        example: 'We need to perform a deep competitor analysis on social channels.',
        exampleVi: 'Chúng ta cần thực hiện một bản phân tích đối thủ cạnh tranh sâu sắc trên các kênh mạng xã hội.'
      },
      {
        word: 'competitive',
        type: 'Adjective',
        phonetic: '/kəmˈpɛtətɪv/',
        meaningVi: 'có tính cạnh tranh, có sức cạnh tranh',
        example: 'We maintain a highly competitive pricing strategy for our SaaS tool.',
        exampleVi: 'Chúng tôi duy trì một chiến lược giá cực kỳ cạnh tranh cho công cụ SaaS của mình.'
      },
      {
        word: 'competitively',
        type: 'Adverb',
        phonetic: '/kəmˈpɛtətɪvlɪ/',
        meaningVi: 'một cách cạnh tranh',
        example: 'Our product is priced competitively compared to other players.',
        exampleVi: 'Sản phẩm của chúng tôi được định giá một cách cạnh tranh so với các đối thủ khác.'
      }
    ]
  },
  {
    id: 'advertise',
    root: 'advertise',
    meaningVi: 'quảng cáo',
    coachNoteVi: 'Marketers rất hay nhầm lẫn giữa "advertising" và "advertisement". "Advertising" (danh từ không đếm được) nói về toàn bộ ngành, hoạt động hoặc kỹ thuật quảng cáo. "Advertisement" (danh từ đếm được, viết tắt là ad/ads) nói về một ấn phẩm, một clip quảng cáo cụ thể.',
    forms: [
      {
        word: 'advertise',
        type: 'Verb',
        phonetic: '/ˈædvərtaɪz/',
        meaningVi: 'quảng cáo, đăng quảng cáo',
        example: 'We plan to advertise our new SaaS product on LinkedIn next month.',
        exampleVi: 'Chúng tôi lên kế hoạch quảng cáo sản phẩm SaaS mới của mình trên LinkedIn vào tháng tới.'
      },
      {
        word: 'advertising',
        type: 'Noun',
        phonetic: '/ˈædvərtaɪzɪŋ/',
        meaningVi: 'ngành quảng cáo, hoạt động quảng cáo (không đếm được)',
        example: 'Digital advertising budgets have overtaken traditional TV spend.',
        exampleVi: 'Ngân sách dành cho ngành quảng cáo số đã vượt qua mức chi tiêu cho truyền hình truyền thống.'
      },
      {
        word: 'advertisement',
        type: 'Noun',
        phonetic: '/ˌædvərˈtaɪzmənt/',
        meaningVi: 'mẫu quảng cáo, tờ quảng cáo (đếm được)',
        example: 'The 30-second video advertisement generated thousands of leads.',
        exampleVi: 'Mẫu quảng cáo video dài 30 giây đã đem lại hàng ngàn khách hàng tiềm năng.'
      },
      {
        word: 'advertiser',
        type: 'Noun',
        phonetic: '/ˈædvərtaɪzər/',
        meaningVi: 'nhà quảng cáo (thương hiệu, doanh nghiệp đi mua quảng cáo)',
        example: 'The platform charges advertisers based on cost-per-impression (CPM).',
        exampleVi: 'Nền tảng này tính phí các nhà quảng cáo dựa trên giá mỗi nghìn lượt hiển thị (CPM).'
      }
    ]
  },
  {
    id: 'persuade',
    root: 'persuade',
    meaningVi: 'thuyết phục',
    coachNoteVi: 'Động từ "persuade", danh từ "persuasion" (sự thuyết phục), tính từ "persuasive" (mang tính thuyết phục) và trạng từ "persuasively".',
    forms: [
      {
        word: 'persuade',
        type: 'Verb',
        phonetic: '/pərˈsweɪd/',
        meaningVi: 'thuyết phục (hành động)',
        example: 'Our landing page copy must persuade visitors to sign up.',
        exampleVi: 'Nội dung trang đích của chúng tôi phải thuyết phục khách truy cập đăng ký.'
      },
      {
        word: 'persuasion',
        type: 'Noun',
        phonetic: '/pərˈsweɪʒn/',
        meaningVi: 'sự thuyết phục, sức thuyết phục',
        example: 'The power of visual persuasion can boost conversion rates by 20%.',
        exampleVi: 'Sức mạnh của sự thuyết phục bằng hình ảnh có thể tăng tỷ lệ chuyển đổi lên 20%.'
      },
      {
        word: 'persuasive',
        type: 'Adjective',
        phonetic: '/pərˈsweɪsɪv/',
        meaningVi: 'mang tính thuyết phục',
        example: 'The copywriter wrote a highly persuasive email subject line.',
        exampleVi: 'Người viết quảng cáo đã viết một dòng tiêu đề email mang tính thuyết phục cao.'
      },
      {
        word: 'persuasively',
        type: 'Adverb',
        phonetic: '/pərˈsweɪsɪvlɪ/',
        meaningVi: 'một cách thuyết phục',
        example: 'She presented the marketing proposal persuasively to the client.',
        exampleVi: 'Cô ấy đã trình bày đề xuất tiếp thị một cách thuyết phục trước khách hàng.'
      }
    ]
  },
  {
    id: 'satisfy',
    root: 'satisfy',
    meaningVi: 'làm hài lòng, thỏa mãn',
    coachNoteVi: 'Động từ "satisfy", danh từ "satisfaction" (sự hài lòng, thỏa mãn), tính từ "satisfactory" (đạt yêu cầu) hoặc "satisfied" (cảm thấy hài lòng) và trạng từ "satisfactorily".',
    forms: [
      {
        word: 'satisfy',
        type: 'Verb',
        phonetic: '/ˈsætɪsfaɪ/',
        meaningVi: 'làm hài lòng, thỏa mãn',
        example: 'We must optimize our product quality to satisfy demanding customers.',
        exampleVi: 'Chúng ta phải tối ưu hóa chất lượng sản phẩm để làm hài lòng những khách hàng khó tính.'
      },
      {
        word: 'satisfaction',
        type: 'Noun',
        phonetic: '/ˌsætɪsˈfækʃn/',
        meaningVi: 'sự hài lòng, sự thỏa mãn',
        example: 'We measure customer satisfaction quarterly using Net Promoter Score (NPS).',
        exampleVi: 'Chúng tôi đo lường sự hài lòng của khách hàng hằng quý bằng chỉ số Net Promoter Score (NPS).'
      },
      {
        word: 'satisfactory',
        type: 'Adjective',
        phonetic: '/ˌsætɪsˈfæktərɪ/',
        meaningVi: 'đạt yêu cầu, vừa lòng',
        example: 'The initial campaign results were satisfactory but could be optimized further.',
        exampleVi: 'Kết quả chiến dịch ban đầu đạt yêu cầu nhưng có thể tối ưu hóa thêm nữa.'
      },
      {
        word: 'satisfactorily',
        type: 'Adverb',
        phonetic: '/ˌsætɪsˈfæktərəlɪ/',
        meaningVi: 'một cách thỏa đáng, đạt yêu cầu',
        example: 'The support team resolved the customer complaint satisfactorily.',
        exampleVi: 'Đội ngũ hỗ trợ đã giải quyết khiếu nại của khách hàng một cách thỏa đáng.'
      }
    ]
  },
  {
    id: 'employ',
    root: 'employ',
    meaningVi: 'thuê dùng, tuyển dụng, sử dụng',
    coachNoteVi: 'Động từ "employ", danh từ "employment" (việc làm, sự thuê mướn), danh từ "employer" (chủ doanh nghiệp/người thuê), danh từ "employee" (nhân viên), tính từ "employable" (có khả năng được tuyển dụng). Trong marketing, "employ" cũng có nghĩa là áp dụng, sử dụng một chiến thuật/phương pháp.',
    forms: [
      {
        word: 'employ',
        type: 'Verb',
        phonetic: '/ɪmˈplɔɪ/',
        meaningVi: 'thuê dùng, sử dụng, tuyển dụng',
        example: 'We can employ multi-channel marketing to reach a wider audience.',
        exampleVi: 'Chúng ta có thể sử dụng tiếp thị đa kênh để tiếp cận lượng khán giả rộng lớn hơn.'
      },
      {
        word: 'employment',
        type: 'Noun',
        phonetic: '/ɪmˈplɔɪmənt/',
        meaningVi: 'việc làm, sự tuyển dụng',
        example: 'The startup boosted local employment by hiring ten copywriters.',
        exampleVi: 'Công ty khởi nghiệp đã thúc đẩy việc làm tại địa phương bằng cách thuê mười người viết nội dung.'
      },
      {
        word: 'employee',
        type: 'Noun',
        phonetic: '/ɪmˈplɔɪiː/',
        meaningVi: 'nhân viên, người lao động',
        example: 'Every employee in our agency must be trained in AI writing tools.',
        exampleVi: 'Mỗi nhân viên trong agency của chúng tôi đều phải được đào tạo về các công cụ viết bài bằng AI.'
      },
      {
        word: 'employable',
        type: 'Adjective',
        phonetic: '/ɪmˈplɔɪəbl/',
        meaningVi: 'có khả năng tuyển dụng, có kỹ năng phù hợp',
        example: 'Learning data analytics makes young marketers highly employable.',
        exampleVi: 'Học phân tích dữ liệu giúp các nhà tiếp thị trẻ cực kỳ dễ tìm được việc làm.'
      }
    ]
  },
  {
    id: 'collaborate',
    root: 'collaborate',
    meaningVi: 'hợp tác, phối hợp',
    coachNoteVi: 'Động từ "collaborate", danh từ "collaboration" (sự hợp tác), danh từ "collaborator" (người cộng tác), tính từ "collaborative" (có tính hợp tác) và trạng từ "collaboratively".',
    forms: [
      {
        word: 'collaborate',
        type: 'Verb',
        phonetic: '/kəˈlæbəreɪt/',
        meaningVi: 'hợp tác, phối hợp (hành động)',
        example: 'We need to collaborate with micro-influencers on this product launch.',
        exampleVi: 'Chúng ta cần hợp tác với các nhà ảnh hưởng nhỏ (micro-influencers) trong đợt ra mắt sản phẩm này.'
      },
      {
        word: 'collaboration',
        type: 'Noun',
        phonetic: '/kəˌlæbəˈreɪʃn/',
        meaningVi: 'sự hợp tác, sự phối hợp',
        example: 'Cross-functional collaboration is essential for conversion rate optimization.',
        exampleVi: 'Sự hợp tác liên phòng ban là rất quan trọng để tối ưu hóa tỷ lệ chuyển đổi.'
      },
      {
        word: 'collaborator',
        type: 'Noun',
        phonetic: '/kəˈlæbəreɪtər/',
        meaningVi: 'người hợp tác, cộng tác viên',
        example: 'She is a frequent collaborator with our brand design team.',
        exampleVi: 'Cô ấy là một cộng tác viên thường xuyên với đội ngũ thiết kế thương hiệu của chúng tôi.'
      },
      {
        word: 'collaborative',
        type: 'Adjective',
        phonetic: '/kəˈlæbəreɪtɪv/',
        meaningVi: 'mang tính hợp tác, phối hợp',
        example: 'We use collaborative whiteboards to brainstorm ad campaign ideas.',
        exampleVi: 'Chúng tôi sử dụng bảng trực tuyến mang tính phối hợp để động não các ý tưởng chiến dịch quảng cáo.'
      },
      {
        word: 'collaboratively',
        type: 'Adverb',
        phonetic: '/kəˈlæbəreɪtɪvlɪ/',
        meaningVi: 'một cách hợp tác, phối hợp',
        example: 'The copywriter and designer worked collaboratively to design the landing page.',
        exampleVi: 'Người viết quảng cáo và nhà thiết kế đã làm việc phối hợp để thiết kế trang đích.'
      }
    ]
  },
  {
    id: 'produce',
    root: 'produce',
    meaningVi: 'sản xuất, tạo ra',
    coachNoteVi: 'Đặc biệt cẩn thận: từ gốc "produce" vừa là động từ /prəˈduːs/ (sản xuất) vừa là danh từ /ˈproʊduːs/ (chỉ nông sản, rau củ quả). Trong Marketing, ta thường dùng "product" (sản phẩm vật lý hoặc số), "production" (quá trình sản xuất, ví dụ: video production), "productivity" (năng suất làm việc) và "productive" (đạt năng suất cao, hiệu quả).',
    forms: [
      {
        word: 'produce',
        type: 'Verb',
        phonetic: '/prəˈduːs/',
        meaningVi: 'sản xuất, tạo ra (hành động)',
        example: 'Our creative team can produce five high-converting video hooks per day.',
        exampleVi: 'Đội ngũ sáng tạo của chúng tôi có thể sản xuất năm đoạn mở đầu video (hooks) có tỷ lệ chuyển đổi cao mỗi ngày.'
      },
      {
        word: 'product',
        type: 'Noun',
        phonetic: '/ˈprɑːdʌkt/',
        meaningVi: 'sản phẩm (kết quả hữu hình/vô hình)',
        example: 'Before launching the product, we must achieve product-market fit.',
        exampleVi: 'Trước khi ra mắt sản phẩm, chúng ta phải đạt được độ phù hợp của sản phẩm với thị trường.'
      },
      {
        word: 'production',
        type: 'Noun',
        phonetic: '/prəˈdʌkʃn/',
        meaningVi: 'quá trình sản xuất, sự sản xuất',
        example: 'High-quality post-production makes a huge difference in TikTok CTR.',
        exampleVi: 'Hậu kỳ sản xuất chất lượng cao tạo ra sự khác biệt khổng lồ đối với tỷ lệ nhấp (CTR) trên TikTok.'
      },
      {
        word: 'productivity',
        type: 'Noun',
        phonetic: '/ˌproʊdʌkˈtɪvətɪ/',
        meaningVi: 'năng suất, hiệu suất lao động',
        example: 'Using AI copywriting tools increased our content team’s productivity by 50%.',
        exampleVi: 'Sử dụng các công cụ viết bài bằng AI đã tăng năng suất của đội ngũ nội dung lên 50%.'
      },
      {
        word: 'productive',
        type: 'Adjective',
        phonetic: '/prəˈdʌktɪv/',
        meaningVi: 'năng suất, hiệu quả, tạo ra nhiều giá trị',
        example: 'We had a highly productive brainstorming session with the client.',
        exampleVi: 'Chúng tôi đã có một buổi động não (brainstorming) cực kỳ hiệu quả với khách hàng.'
      },
      {
        word: 'productively',
        type: 'Adverb',
        phonetic: '/prəˈdʌktɪvlɪ/',
        meaningVi: 'một cách hiệu quả, có năng suất',
        example: 'The agency allocated the campaign budget very productively across core channels.',
        exampleVi: 'Agency đã phân bổ ngân sách chiến dịch một cách cực kỳ hiệu quả giữa các kênh cốt lõi.'
      }
    ]
  },
  {
    id: 'connect',
    root: 'connect',
    meaningVi: 'kết nối',
    coachNoteVi: 'Trong thời đại chuyển đổi số, phân biệt giữa "connection" (sự kết nối nói chung giữa người với người hoặc thiết bị) và "connectivity" (khả năng kết nối, tính liên kết hệ thống số). Ví dụ: "omnichannel connectivity" (sự kết nối đa kênh liền mạch giúp dữ liệu chạy thông suốt).',
    forms: [
      {
        word: 'connect',
        type: 'Verb',
        phonetic: '/kəˈnɛkt/',
        meaningVi: 'kết nối, liên kết (hành động)',
        example: 'Interactive social media posts help brands connect with younger consumer cohorts.',
        exampleVi: 'Các bài viết mạng xã hội mang tính tương tác giúp các thương hiệu kết nối với nhóm người tiêu dùng trẻ tuổi hơn.'
      },
      {
        word: 'connection',
        type: 'Noun',
        phonetic: '/kəˈnɛkʃn/',
        meaningVi: 'mối liên kết, sự kết nối',
        example: 'There is a strong connection between high-quality content and brand loyalty.',
        exampleVi: 'Có một mối liên kết mạnh mẽ giữa nội dung chất lượng cao và lòng trung thành với thương hiệu.'
      },
      {
        word: 'connectivity',
        type: 'Noun',
        phonetic: '/ˌkɑːnɛkˈtɪvətɪ/',
        meaningVi: 'khả năng liên kết, tính kết nối (hạ tầng, mạng lưới số)',
        example: 'Omnichannel retail requires continuous connectivity between offline and online inventory databases.',
        exampleVi: 'Bán lẻ đa kênh (omnichannel) yêu cầu tính kết nối liên tục giữa cơ sở dữ liệu hàng tồn kho thực tế và trực tuyến.'
      },
      {
        word: 'connected',
        type: 'Adjective',
        phonetic: '/kəˈnɛktəd/',
        meaningVi: 'được kết nối, có liên kết',
        example: 'Today’s consumers are more connected than ever before through multiple smart devices.',
        exampleVi: 'Người tiêu dùng ngày nay được kết nối nhiều hơn bao giờ hết thông qua hàng loạt thiết bị thông minh.'
      }
    ]
  }
];

// Affixes Seed Data
export const AFFIXES: Affix[] = [
  {
    affix: 're-',
    type: 'prefix',
    meaning: 'again, backward',
    meaningVi: 'làm lại, lặp lại hoặc quay ngược lại',
    examples: [
      {
        word: 'retarget',
        root: 'target',
        meaningVi: 'nhắm đối tượng mục tiêu lại (bám đuổi)',
        sentence: 'We need to retarget visitors who abandoned their shopping carts.',
        sentenceVi: 'Chúng ta cần nhắm quảng cáo bám đuổi (retarget) những khách truy cập đã bỏ giỏ hàng.'
      },
      {
        word: 'rebrand',
        root: 'brand',
        meaningVi: 'tái định vị/thay đổi nhận diện thương hiệu',
        sentence: 'After 10 years, the company decided to rebrand to appeal to Gen Z.',
        sentenceVi: 'Sau 10 năm, công ty quyết định tái định vị thương hiệu (rebrand) để thu hút thế hệ Z.'
      },
      {
        word: 'reposition',
        root: 'position',
        meaningVi: 'tái định vị sản phẩm/thương hiệu trong tâm trí khách hàng',
        sentence: 'The marketing team is trying to reposition the product as a premium option.',
        sentenceVi: 'Đội ngũ marketing đang cố gắng tái định vị (reposition) sản phẩm thành một lựa chọn cao cấp.'
      }
    ]
  },
  {
    affix: 'de-',
    type: 'prefix',
    meaning: 'down, remove, reverse',
    meaningVi: 'giảm xuống, loại bỏ, đảo ngược trạng thái',
    examples: [
      {
        word: 'devalue',
        root: 'value',
        meaningVi: 'làm giảm giá trị',
        sentence: 'Overusing discount codes can devalue the brand’s premium perception.',
        sentenceVi: 'Lạm dụng mã giảm giá có thể làm giảm giá trị (devalue) nhận diện cao cấp của thương hiệu.'
      },
      {
        word: 'demarket',
        root: 'market',
        meaningVi: 'giảm bớt nhu cầu thị trường (giảm chi phí tiếp thị chủ động)',
        sentence: 'During supply shortages, the power company had to demarket electricity consumption.',
        sentenceVi: 'Trong thời gian thiếu hụt nguồn cung, công ty điện lực phải tiến hành tiếp thị giảm nhu cầu (demarket) tiêu thụ điện.'
      },
      {
        word: 'decelerate',
        root: 'celerate',
        meaningVi: 'giảm tốc độ, kìm hãm đà tăng',
        sentence: 'Macroeconomic factors caused brand acquisition metrics to decelerate in Q2.',
        sentenceVi: 'Các yếu tố kinh tế vĩ mô đã khiến các chỉ số chuyển đổi khách hàng mới của thương hiệu bị giảm tốc (decelerate) trong quý 2.'
      }
    ]
  },
  {
    affix: 'multi-',
    type: 'prefix',
    meaning: 'many, multiple',
    meaningVi: 'đa, nhiều thành phần',
    examples: [
      {
        word: 'multichannel',
        root: 'channel',
        meaningVi: 'đa kênh tiếp thị tách biệt',
        sentence: 'A multichannel strategy uses social media, email, and print separately.',
        sentenceVi: 'Chiến lược đa kênh (multichannel) sử dụng mạng xã hội, email và ấn phẩm một cách tách biệt.'
      },
      {
        word: 'multivariate',
        root: 'variate',
        meaningVi: 'đa biến (nhiều biến số thay đổi đồng thời)',
        sentence: 'Multivariate testing allows us to test multiple page elements simultaneously.',
        sentenceVi: 'Thử nghiệm đa biến (multivariate testing) cho phép chúng ta kiểm tra nhiều yếu tố trang cùng một lúc.'
      }
    ]
  },
  {
    affix: 'hyper-',
    type: 'prefix',
    meaning: 'excessive, over, extremely',
    meaningVi: 'quá mức, cực kỳ, siêu vượt trội',
    examples: [
      {
        word: 'hyperlocal',
        root: 'local',
        meaningVi: 'siêu địa phương (phạm vi cực nhỏ gần người dùng)',
        sentence: 'Hyperlocal targeting helps cafes run ads to users within a 500-meter radius.',
        sentenceVi: 'Nhắm mục tiêu siêu địa phương (hyperlocal) giúp các quán cà phê chạy quảng cáo tới người dùng trong bán kính 500 mét.'
      },
      {
        word: 'hyperpersonalize',
        root: 'personalize',
        meaningVi: 'cá nhân hóa cực độ (dựa trên thời gian thực và hành vi chi tiết)',
        sentence: 'Netflix uses AI to hyperpersonalize recommendation banners for each user.',
        sentenceVi: 'Netflix sử dụng AI để cá nhân hóa cực độ (hyperpersonalize) các biểu ngữ gợi ý cho từng người dùng.'
      }
    ]
  },
  {
    affix: '-ize / -ise',
    type: 'suffix',
    meaning: 'to make, convert into',
    meaningVi: 'biến đổi thành, thực hiện hành động làm cho có đặc tính của...',
    examples: [
      {
        word: 'monetize',
        root: 'money',
        meaningVi: 'kiếm tiền từ, thương mại hóa',
        sentence: 'Content creators use sponsorships and ad revenue to monetize their channels.',
        sentenceVi: 'Các nhà sáng tạo nội dung sử dụng tài trợ và doanh thu quảng cáo để kiếm tiền (monetize) từ kênh của họ.'
      },
      {
        word: 'personalize',
        root: 'person',
        meaningVi: 'cá nhân hóa',
        sentence: 'Marketers personalize email subject lines to improve open rates.',
        sentenceVi: 'Marketers cá nhân hóa (personalize) dòng tiêu đề email để nâng cao tỷ lệ mở thư.'
      }
    ]
  },
  {
    affix: '-ation / -tion',
    type: 'suffix',
    meaning: 'state, condition, process of',
    meaningVi: 'quá trình, hành động, trạng thái của hành vi...',
    examples: [
      {
        word: 'segmentation',
        root: 'segment',
        meaningVi: 'sự phân khúc khách hàng',
        sentence: 'Audience segmentation helps craft tailored messages for distinct groups.',
        sentenceVi: 'Sự phân khúc đối tượng (segmentation) giúp xây dựng các thông điệp tùy chỉnh cho từng nhóm riêng biệt.'
      },
      {
        word: 'automation',
        root: 'automating',
        meaningVi: 'sự tự động hóa',
        sentence: 'Marketing automation saves time by sending follow-up emails automatically.',
        sentenceVi: 'Tự động hóa tiếp thị (marketing automation) tiết kiệm thời gian nhờ tự động gửi các email bám đuổi.'
      }
    ]
  },
  {
    affix: '-wise',
    type: 'suffix',
    meaning: 'concerning, in the direction of',
    meaningVi: 'về phương diện, về mặt, theo hướng',
    examples: [
      {
        word: 'budget-wise',
        root: 'budget',
        meaningVi: 'về mặt ngân sách, phương diện ngân sách',
        sentence: 'Budget-wise, we are fully committed to branding rather than search ads this month.',
        sentenceVi: 'Về mặt ngân sách (budget-wise), tháng này chúng tôi tập trung hoàn toàn vào nhận diện thương hiệu thay vì quảng cáo tìm kiếm.'
      },
      {
        word: 'performance-wise',
        root: 'performance',
        meaningVi: 'về mặt hiệu suất, tiến trình hoạt động',
        sentence: 'Performance-wise, the retargeting campaign is outperforming all cold audience ad sets.',
        sentenceVi: 'Về mặt hiệu suất (performance-wise), chiến dịch bám đuổi đang vượt trội hơn tất cả các nhóm quảng cáo khách hàng lạnh.'
      }
    ]
  },
  {
    affix: '-ive',
    type: 'suffix',
    meaning: 'having the nature of, tending to',
    meaningVi: 'mang tính chất, có xu hướng làm cái gì đó',
    examples: [
      {
        word: 'persuasive',
        root: 'persuade',
        meaningVi: 'mang tính thuyết phục cao',
        sentence: 'A persuasive copywriter knows how to trigger emotional buying decisions.',
        sentenceVi: 'Một người viết nội dung thuyết phục (persuasive copywriter) biết cách kích hoạt quyết định mua hàng bằng cảm xúc.'
      },
      {
        word: 'disruptive',
        root: 'disrupt',
        meaningVi: 'mang tính đột phá, thay đổi cuộc chơi',
        sentence: 'Uber introduced a disruptive business model that changed urban transit forever.',
        sentenceVi: 'Uber đã giới thiệu một mô hình kinh doanh mang tính đột phá (disruptive) làm thay đổi giao thông đô thị mãi mãi.'
      }
    ]
  }
];

// Spelling Rules Seed Data
export const SPELLING_RULES: SpellingRule[] = [
  {
    id: 'double-consonants',
    title: 'Doubling Consonants Rule',
    titleVi: 'Quy tắc nhân đôi phụ âm cuối',
    concept: 'When adding a suffix starting with a vowel (-ing, -ed, -er, -est), double the final consonant of a one-syllable word ending in Consonant-Vowel-Consonant (CVC) or a multi-syllable word where the last syllable is stressed.',
    conceptVi: 'Khi thêm hậu tố bắt đầu bằng nguyên âm (-ing, -ed, -er), ta phải nhân đôi phụ âm cuối nếu từ gốc chỉ có 1 âm tiết kết thúc dạng Phụ âm - Nguyên âm - Phụ âm (CVC). Đặc biệt, đối với từ nhiều âm tiết, ta chỉ nhân đôi nếu trọng âm rơi vào âm tiết cuối (ví dụ: refer -> referring, target -> targeted (không nhân đôi "t" vì target nhấn âm 1)). Marketers rất hay viết sai "marketing" thành "marketting"!',
    examples: [
      {
        base: 'plan',
        modified: 'planning',
        explanationVi: 'plan kết thúc dạng CVC (p-l-a-n), từ 1 âm tiết -> nhân đôi phụ âm "n" thành "planning" (hoạt động lên kế hoạch).'
      },
      {
        base: 'target',
        modified: 'targeting',
        explanationVi: 'target có 2 âm tiết nhưng trọng âm rơi vào âm tiết đầu /ˈtɑːrɡɪt/, do đó không nhân đôi chữ "t". Viết chuẩn là targeting / targeted.'
      },
      {
        base: 'market',
        modified: 'marketing',
        explanationVi: 'market nhấn âm tiết đầu /ˈmɑːrkɪt/, do đó KHÔNG được nhân đôi chữ "t". Viết "marketting" là sai chính tả nghiêm trọng.'
      },
      {
        base: 'run',
        modified: 'running',
        explanationVi: 'run kết thúc dạng CVC, 1 âm tiết -> nhân đôi thành running (ví dụ: running ads - đang chạy quảng cáo).'
      }
    ],
    quiz: [
      {
        sentence: 'The agency is currently ________ a high-budget TikTok brand campaign.',
        options: ['planing', 'planning', 'plannings'],
        correctIndex: 1,
        explanationVi: 'Từ gốc "plan" (1 âm tiết, tận cùng bằng CVC) bắt buộc phải nhân đôi "n" trước khi thêm "-ing" để tạo thành "planning".'
      },
      {
        sentence: 'We have carefully ________ our campaign to reach female entrepreneurs aged 25-35.',
        options: ['targeted', 'targetted', 'targetting'],
        correctIndex: 0,
        explanationVi: '"target" nhấn âm tiết 1, không nhân đôi phụ âm cuối "t". Dạng quá khứ viết đúng là "targeted".'
      },
      {
        sentence: 'Social media ________ has changed completely due to short-form video content.',
        options: ['marketting', 'marketing', 'marketers'],
        correctIndex: 1,
        explanationVi: '"market" nhấn âm tiết 1, tuyệt đối không nhân đôi "t". Viết đúng là "marketing".'
      }
    ]
  },
  {
    id: 'silent-e',
    title: 'Drop Silent "e" Rule',
    titleVi: 'Quy tắc bỏ âm "e" câm',
    concept: 'Drop the silent "e" at the end of a base word when adding a suffix that begins with a vowel (like -ing, -ation, -ive, -able). Keep the "e" if the suffix begins with a consonant (like -ly, -ment).',
    conceptVi: 'Bỏ chữ "e" câm ở cuối từ gốc khi thêm các hậu tố bắt đầu bằng nguyên âm (như -ing, -ation, -ive, -able). Giữ lại chữ "e" nếu hậu tố bắt đầu bằng phụ âm (như -ly, -ment). Ví dụ: value -> valuing / valuable (bỏ e) nhưng value -> valuement (giữ e nếu có, hoặc manage -> management).',
    examples: [
      {
        base: 'value',
        modified: 'valuing / valuable',
        explanationVi: 'value kết thúc bằng "e" câm. Suffix "-ing" và "-able" bắt đầu bằng nguyên âm -> bỏ "e" thành "valuing" và "valuable".'
      },
      {
        base: 'produce',
        modified: 'producing / productive',
        explanationVi: 'produce kết thúc bằng "e" câm. Suffix "-ing" và "-ive" bắt đầu bằng nguyên âm -> bỏ "e" thành "producing" và "productive".'
      },
      {
        base: 'advertise',
        modified: 'advertisement',
        explanationVi: 'Hậu tố "-ment" bắt đầu bằng phụ âm "m" -> giữ nguyên "e" thành "advertisement".'
      }
    ],
    quiz: [
      {
        sentence: 'Creating a ________ customer relationship strategy is key for high LTV.',
        options: ['valueable', 'valuable', 'valuing'],
        correctIndex: 1,
        explanationVi: 'Từ gốc "value" bỏ "e" câm khi ghép với hậu tố bắt đầu bằng nguyên âm "-able", viết chuẩn là "valuable" (có giá trị).'
      },
      {
        sentence: 'The team spent the entire afternoon ________ the new video storyboard.',
        options: ['produceing', 'producing', 'producting'],
        correctIndex: 1,
        explanationVi: '"produce" bỏ "e" câm trước khi thêm đuôi nguyên âm "-ing", tạo thành "producing".'
      }
    ]
  },
  {
    id: 'y-to-i',
    title: 'Y-to-I Change Rule',
    titleVi: 'Quy tắc biến đổi "y" thành "i"',
    concept: 'If a word ends in a consonant + "y", change the "y" to "i" before adding any suffix except those starting with "i" (like -ing). If the word ends in a vowel + "y", do not change it.',
    conceptVi: 'Nếu từ gốc kết thúc bằng một Phụ âm + "y", đổi "y" thành "i" trước khi thêm hầu hết các hậu tố (như -es, -ed, -ly, -ful). KHÔNG đổi nếu hậu tố bắt đầu bằng chữ "i" (như -ing để tránh double "ii"). Nếu từ kết thúc bằng Nguyên âm + "y", giữ nguyên không đổi.',
    examples: [
      {
        base: 'strategy',
        modified: 'strategies / strategic',
        explanationVi: 'strategy tận cùng phụ âm "g" + "y". Khi chuyển số nhiều thành "strategies" hoặc tính từ "strategic" (đổi y thành i).'
      },
      {
        base: 'multiply',
        modified: 'multiplied / multiplying',
        explanationVi: 'multiply tận cùng phụ âm "l" + "y". Quá khứ thành "multiplied" (đổi y thành i), nhưng thêm ing giữ nguyên "multiplying".'
      },
      {
        base: 'play',
        modified: 'playing / played',
        explanationVi: 'play tận cùng nguyên âm "a" + "y" -> giữ nguyên "y" trong mọi trường hợp.'
      }
    ],
    quiz: [
      {
        sentence: 'We need to design three different ________ for our product launch.',
        options: ['strategys', 'strategyes', 'strategies'],
        correctIndex: 2,
        explanationVi: 'Từ "strategy" kết thúc bằng phụ âm + "y", đổi "y" thành "i" rồi thêm "-es" để tạo thành số nhiều "strategies".'
      },
      {
        sentence: 'By using automated funnel systems, we successfully ________ our lead flow.',
        options: ['multiplyed', 'multiplied', 'multiplyid'],
        correctIndex: 1,
        explanationVi: '"multiply" đổi "y" thành "i" trước khi thêm hậu tố quá khứ "-ed" -> "multiplied".'
      }
    ]
  },
  {
    id: 'noun-verb-confusions',
    title: 'Noun-Verb Spelling Confusion',
    titleVi: 'Phân biệt chính tả Danh từ vs Động từ',
    concept: 'Some pairs have slight spelling changes (like -ice vs -ise, or -ct vs -ct) that change their grammatical categories entirely.',
    conceptVi: 'Một số cặp từ tiếng Anh chuyên dùng trong công việc có sự biến đổi chính tả cực kỳ nhỏ giữa Danh từ và Động từ, thường là đuôi "-ice" cho Danh từ và "-ise/-ise" cho Động từ, hoặc thay đổi hoàn toàn nguyên âm. Viết sai các từ này trong email gửi sếp/khách hàng sẽ gây cảm giác thiếu chuyên nghiệp.',
    examples: [
      {
        base: 'advice (Noun)',
        modified: 'advise (Verb)',
        explanationVi: 'advice /ˈædˈvaɪs/ là danh từ không đếm được (lời khuyên). advise /ədˈvaɪz/ là động từ (khuyên bảo). Ví dụ: "Listen to my advice" và "I advise you to run ads".'
      },
      {
        base: 'practice (Noun)',
        modified: 'practise (Verb)',
        explanationVi: 'Trong tiếng Anh-Anh (UK), "practice" là danh từ, "practise" là động từ. Trong tiếng Anh-Mỹ (US), "practice" được dùng cho cả hai.'
      },
      {
        base: 'device (Noun)',
        modified: 'devise (Verb)',
        explanationVi: 'device /dɪˈvaɪs/ là danh từ (thiết bị). devise /dɪˈvaɪz/ là động từ (sáng chế ra, phát minh ra một kế hoạch, phương án).'
      },
      {
        base: 'affect (Verb)',
        modified: 'effect (Noun)',
        explanationVi: 'affect /əˈfɛkt/ là động từ (ảnh hưởng lên cái gì). effect /ɪˈfɛkt/ là danh từ (kết quả, hiệu ứng của ảnh hưởng). Ví dụ: "The iOS update affected our ROAS" và "The new ads had a positive effect".'
      }
    ],
    quiz: [
      {
        sentence: 'Could you please ________ us on the best channel to allocate our Q3 budget?',
        options: ['advice', 'advise', 'advises'],
        correctIndex: 1,
        explanationVi: 'Ở đây cần một Động từ đi sau trợ động từ "please". Do đó dùng "advise" (khuyên bảo), còn "advice" là Danh từ.'
      },
      {
        sentence: 'The marketing manager is trying to ________ a new referral program to boost organic viral loop.',
        options: ['device', 'devise', 'devising'],
        correctIndex: 1,
        explanationVi: '"devise" là Động từ có nghĩa là tạo ra/nghĩ ra một kế hoạch hoặc chương trình. "device" là Danh từ chỉ thiết bị.'
      },
      {
        sentence: 'The change in Apple’s privacy policy had a severe ________ on digital attribution.',
        options: ['affect', 'effect', 'effective'],
        correctIndex: 1,
        explanationVi: 'Đứng sau tính từ "severe" cần một Danh từ, do đó chọn "effect" (tác động, hiệu ứng). "affect" là Động từ.'
      }
    ]
  }
];

export const CONTEXT_QUESTIONS: ContextQuestion[] = [
  // ==========================================
  // MARKETING & WORK (8 questions)
  // ==========================================
  {
    id: 'm1',
    category: 'marketing',
    type: 'choose',
    questionText: "We must run a highly _______ ad campaign to capture Gen-Z interest.",
    instructionVi: "Chọn tính từ phù hợp đứng sau trạng từ chỉ mức độ 'highly' và bổ nghĩa cho cụm danh từ 'ad campaign'.",
    options: ["production", "productive", "productively", "produce"],
    correctIndex: 1, // productive
    explanationVi: "Chính xác: 'productive' là tính từ nghĩa là có năng suất/hiệu quả cao. Cần một tính từ đứng sau trạng từ chỉ mức độ 'highly' để bổ nghĩa cho danh từ 'ad campaign'.\n- 'production' là danh từ (sự sản xuất).\n- 'productively' là trạng từ.\n- 'produce' là động từ."
  },
  {
    id: 'm2',
    category: 'marketing',
    type: 'complete',
    questionText: "Our team plans to conduct deep budget _______ across social channels to minimize wasted spend.",
    instructionVi: "Chọn danh từ phù hợp đứng sau cụm danh từ 'budget' và động từ 'conduct'.",
    options: ["optimize", "optimization", "optimal", "optimally"],
    correctIndex: 1, // optimization
    explanationVi: "Chính xác: 'optimization' là danh từ chỉ sự tối ưu hóa. Cụm 'conduct budget optimization' nghĩa là thực hiện việc tối ưu hóa ngân sách.\n- 'optimize' là động từ.\n- 'optimal' là tính từ.\n- 'optimally' là trạng từ."
  },
  {
    id: 'm3',
    category: 'marketing',
    type: 'identify',
    questionText: "The low conversion rate will negative [A] affect [B] our primary [C] sales target.",
    instructionVi: "Xác định từ loại bị dùng sai trong câu trên.",
    options: ["negative", "affect", "primary", "sales"],
    correctIndex: 0, // negative (should be negatively)
    explanationVi: "Chính xác: 'negative' (tính từ) là sai vì vị trí này đứng trước động từ 'affect' để bổ nghĩa cho nó, do đó cần một trạng từ 'negatively'.\n- 'affect' là động từ đúng (ảnh hưởng).\n- 'primary' là tính từ đúng bổ nghĩa cho 'sales target'."
  },
  {
    id: 'm4',
    category: 'marketing',
    type: 'transform',
    questionText: "Our growth team needs to _______ (ANALYZE) the user churn rate from the last webinar.",
    instructionVi: "Biến đổi từ gốc 'ANALYZE' thành dạng động từ nguyên thể đứng sau cụm 'needs to'.",
    options: ["analyze", "analysis", "analyst", "analytical"],
    correctIndex: 0, // analyze
    explanationVi: "Chính xác: Sau động từ khuyết thiếu hoặc cụm 'needs to' cần một động từ nguyên mẫu 'analyze' (phân tích).\n- 'analysis' là danh từ sự phân tích.\n- 'analyst' là danh từ chỉ người phân tích.\n- 'analytical' là tính từ."
  },
  {
    id: 'm5',
    category: 'marketing',
    type: 'choose',
    questionText: "The brand manager decided to shift some budget to digital _______ because of better attribution.",
    instructionVi: "Chọn danh từ không đếm được chỉ ngành, hoạt động quảng cáo nói chung.",
    options: ["advertising", "advertisement", "advertisements", "advertise"],
    correctIndex: 0, // advertising
    explanationVi: "Chính xác: Khi nói về ngành hoặc hoạt động quảng cáo nói chung, ta dùng danh từ không đếm được 'advertising'.\n- 'advertisement' là danh từ đếm được chỉ một mẫu quảng cáo cụ thể.\n- 'advertisements' là dạng số nhiều.\n- 'advertise' là động từ."
  },
  {
    id: 'm6',
    category: 'marketing',
    type: 'complete',
    questionText: "Please ensure a reliable ________ between the email server and the CRM platform.",
    instructionVi: "Chọn danh từ phù hợp đứng sau cụm 'a reliable' (mạo từ + tính từ).",
    options: ["connect", "connection", "connectivity", "connected"],
    correctIndex: 1, // connection
    explanationVi: "Chính xác: 'connection' là danh từ chỉ mối liên kết/sự kết nối cụ thể giữa hai hệ thống.\n- 'connect' là động từ.\n- 'connectivity' chỉ khả năng liên kết kỹ thuật chung.\n- 'connected' là tính từ."
  },
  {
    id: 'm7',
    category: 'marketing',
    type: 'identify',
    questionText: "The growth hacker completed [A] a deep [B] click-stream analyst [C] yesterday.",
    instructionVi: "Xác định từ loại bị dùng sai trong câu trên.",
    options: ["completed", "deep", "analyst", "yesterday"],
    correctIndex: 2, // analyst (should be analysis)
    explanationVi: "Chính xác: 'analyst' là danh từ chỉ người (nhà phân tích). Trong ngữ cảnh này, ta cần danh từ chỉ hoạt động/bản phân tích dữ liệu, tức là 'analysis'.\n- 'completed' là động từ chia quá khứ đơn đúng.\n- 'deep' là tính từ bổ nghĩa đúng."
  },
  {
    id: 'm8',
    category: 'marketing',
    type: 'transform',
    questionText: "Internal marketing ________ (COMMUNICATE) must be concise and actionable to keep cross-functional teams aligned.",
    instructionVi: "Biến đổi gốc từ 'COMMUNICATE' thành danh từ làm chủ ngữ chính của câu.",
    options: ["communicated", "communication", "communicative", "communicator"],
    correctIndex: 1, // communication
    explanationVi: "Chính xác: 'communication' là danh từ chỉ hoạt động giao tiếp, truyền đạt thông tin (làm chủ ngữ của câu).\n- 'communicated' là động từ quá khứ.\n- 'communicative' là tính từ.\n- 'communicator' là danh từ chỉ người truyền đạt."
  },

  // ==========================================
  // FAMILY LIFE (8 questions)
  // ==========================================
  {
    id: 'f1',
    category: 'family',
    type: 'choose',
    questionText: "We must _______ our household chores to save more time for family weekend trips.",
    instructionVi: "Chọn động từ phù hợp đứng sau động từ khuyết thiếu 'must'.",
    options: ["optimize", "optimization", "optimal", "optimally"],
    correctIndex: 0, // optimize
    explanationVi: "Chính xác: Sau động từ khuyết thiếu 'must' ta cần một động từ nguyên mẫu 'optimize' (tối ưu hóa).\n- 'optimization' là danh từ.\n- 'optimal' là tính từ.\n- 'optimally' là trạng từ."
  },
  {
    id: 'f2',
    category: 'family',
    type: 'complete',
    questionText: "My parents always encourage clear ________ when resolving siblings misunderstanding.",
    instructionVi: "Chọn danh từ phù hợp làm tân ngữ trực tiếp sau tính từ 'clear'.",
    options: ["communicative", "communicator", "communication", "communicate"],
    correctIndex: 2, // communication
    explanationVi: "Chính xác: Cần danh từ không đếm được chỉ việc giao tiếp/trao đổi thông tin: 'communication'.\n- 'communicative' là tính từ.\n- 'communicator' là danh từ chỉ người giao tiếp.\n- 'communicate' là động từ."
  },
  {
    id: 'f3',
    category: 'family',
    type: 'identify',
    questionText: "To prepare [A] for the dinner party, we bought [B] some colorful birthday advertising [C] banners.",
    instructionVi: "Xác định từ loại bị dùng sai trong ngữ cảnh này.",
    options: ["prepare", "bought", "advertising", "banners"],
    correctIndex: 2, // advertising (should be advertisement / decorative)
    explanationVi: "Chính xác: 'advertising' (ngành quảng cáo) không dùng để mô tả banner trang trí sinh nhật trong gia đình. Cần dùng danh từ ghép 'advertisement banners' hoặc tính từ 'decorative' (mang tính trang trí).\n- 'prepare' là động từ nguyên mẫu đúng sau 'To'.\n- 'bought' là động từ chia quá khứ đơn đúng."
  },
  {
    id: 'f4',
    category: 'family',
    type: 'transform',
    questionText: "Smart home systems provide reliable ________ (CONNECT) between family gadgets.",
    instructionVi: "Biến đổi gốc từ 'CONNECT' thành danh từ chỉ tính kết nối kỹ thuật tổng thể của các thiết bị.",
    options: ["connected", "connection", "connectivity", "connector"],
    correctIndex: 2, // connectivity
    explanationVi: "Chính xác: 'connectivity' là danh từ chỉ khả năng kết nối/tính kết nối kỹ thuật công nghệ giữa các thiết bị thông minh.\n- 'connection' là sự liên kết cụ thể giữa hai đối tượng.\n- 'connected' là tính từ.\n- 'connector' là đầu nối vật lý."
  },
  {
    id: 'f5',
    category: 'family',
    type: 'choose',
    questionText: "During weekends, we prefer to spend time on _______ household tasks like gardening.",
    instructionVi: "Chọn tính từ phù hợp bổ nghĩa cho danh từ 'tasks'.",
    options: ["produce", "productive", "production", "productively"],
    correctIndex: 1, // productive
    explanationVi: "Chính xác: Đứng trước danh từ 'tasks' và sau giới từ 'on' cần tính từ 'productive' (năng suất, mang lại kết quả hữu ích).\n- 'produce' là động từ.\n- 'production' là danh từ.\n- 'productively' là trạng từ."
  },
  {
    id: 'f6',
    category: 'family',
    type: 'complete',
    questionText: "Having dinner together is an ________ way for parents to bond with their children.",
    instructionVi: "Chọn tính từ phù hợp bắt đầu bằng nguyên âm đứng trước danh từ 'way'.",
    options: ["optimal", "optimization", "optimally", "optimize"],
    correctIndex: 0, // optimal
    explanationVi: "Chính xác: Đứng trước danh từ 'way' cần một tính từ bổ nghĩa. 'optimal' (tối ưu, lý tưởng) là tính từ duy nhất bắt đầu bằng một nguyên âm trong các phương án.\n- 'optimization' là danh từ.\n- 'optimally' là trạng từ.\n- 'optimize' là động từ."
  },
  {
    id: 'f7',
    category: 'family',
    type: 'identify',
    questionText: "The smart fridge helps [A] us analyze [B] the food storage, generating an analytical [C] shopping list automatically.",
    instructionVi: "Xác định từ loại bị dùng sai trong câu trên.",
    options: ["helps", "analyze", "analytical", "automatically"],
    correctIndex: 2, // analytical (should be analyzed / standard)
    explanationVi: "Chính xác: 'analytical' (thuộc về tư duy phân tích) là sai khi mô tả 'shopping list' (danh sách mua sắm). Nên dùng tính từ thông thường hoặc 'automated shopping list' (danh sách tự động).\n- 'helps' là động từ chia đúng ngôi số ít.\n- 'analyze' là động từ nguyên mẫu đúng sau 'helps us'.\n- 'automatically' là trạng từ bổ nghĩa đúng."
  },
  {
    id: 'f8',
    category: 'family',
    type: 'transform',
    questionText: "My mom loves to ________ (PERSONALIZE) each of our family photo albums with hand-drawn stickers.",
    instructionVi: "Biến đổi gốc từ 'PERSONALIZE' thành động từ nguyên mẫu đứng sau cấu trúc 'loves to'.",
    options: ["personalize", "personalized", "personalization", "personally"],
    correctIndex: 0, // personalize
    explanationVi: "Chính xác: Đứng sau 'loves to' cần một động từ nguyên mẫu: 'personalize' (cá nhân hóa, trang trí theo ý thích cá nhân).\n- 'personalized' là dạng quá khứ hoặc tính từ.\n- 'personalization' là danh từ.\n- 'personally' là trạng từ."
  },

  // ==========================================
  // IELTS CONTEXT (8 questions)
  // ==========================================
  {
    id: 'i1',
    category: 'ielts',
    type: 'choose',
    questionText: "Many IELTS candidates fail to _______ their essay structure during the final minutes of the exam.",
    instructionVi: "Chọn động từ thích hợp đứng sau cấu trúc 'fail to'.",
    options: ["optimize", "optimization", "optimal", "optimally"],
    correctIndex: 0, // optimize
    explanationVi: "Chính xác: Cấu trúc 'fail to + V (nguyên mẫu)' đòi hỏi động từ nguyên mẫu 'optimize' (tối ưu hóa).\n- 'optimization' là danh từ.\n- 'optimal' là tính từ.\n- 'optimally' là trạng từ."
  },
  {
    id: 'i2',
    category: 'ielts',
    type: 'complete',
    questionText: "The academic charts show an interesting ________ between urban migration and internet consumption.",
    instructionVi: "Chọn danh từ làm chủ ngữ phụ đứng sau mạo từ + tính từ 'an interesting'.",
    options: ["connect", "connection", "connectivity", "connected"],
    correctIndex: 1, // connection
    explanationVi: "Chính xác: Đứng sau tính từ 'interesting' và trước giới từ 'between' cần một danh từ đếm được chỉ mối quan hệ/sự liên kết: 'connection'.\n- 'connect' là động từ.\n- 'connectivity' chỉ khả năng liên kết kỹ thuật chung.\n- 'connected' là tính từ."
  },
  {
    id: 'i3',
    category: 'ielts',
    type: 'identify',
    questionText: "Examiners evaluate [A] the coherence and cohesive [B] of the essay [C] based on linking devices.",
    instructionVi: "Xác định từ loại bị dùng sai trong câu trên.",
    options: ["evaluate", "cohesive", "essay", "linking"],
    correctIndex: 1, // cohesive (should be cohesion)
    explanationVi: "Chính xác: Cấu trúc song hành với danh từ 'coherence' qua liên từ 'and' đòi hỏi một Danh từ ở vị trí này. Từ đúng phải là danh từ 'cohesion'. 'cohesive' là tính từ.\n- 'evaluate' là động từ chính đúng chia theo chủ ngữ số nhiều.\n- 'essay' là danh từ số ít đúng."
  },
  {
    id: 'i4',
    category: 'ielts',
    type: 'transform',
    questionText: "To score high in IELTS Writing, you must present an ________ (ANALYZE) breakdown of the graph.",
    instructionVi: "Biến đổi gốc từ 'ANALYZE' thành tính từ bổ nghĩa cho danh từ 'breakdown' đứng sau mạo từ 'an'.",
    options: ["analytical", "analysis", "analyst", "analyze"],
    correctIndex: 0, // analytical
    explanationVi: "Chính xác: Đứng trước danh từ 'breakdown' cần một tính từ bổ nghĩa, và vì đi sau mạo từ 'an' nên cần tính từ bắt đầu bằng nguyên âm: 'analytical' (mang tính phân tích).\n- 'analysis' là danh từ.\n- 'analyst' là danh từ chỉ người.\n- 'analyze' là động từ."
  },
  {
    id: 'i5',
    category: 'ielts',
    type: 'choose',
    questionText: "A highly _______ study schedule is essential for achieving an overall Band 8.0.",
    instructionVi: "Chọn tính từ phù hợp bổ nghĩa cho cụm danh từ 'study schedule' và đứng sau trạng từ 'highly'.",
    options: ["productive", "production", "produce", "productively"],
    correctIndex: 0, // productive
    explanationVi: "Chính xác: Đứng sau trạng từ 'highly' và trước danh từ 'study schedule' cần tính từ 'productive' (năng suất, hiệu quả cao).\n- 'production' là danh từ.\n- 'produce' là động từ.\n- 'productively' là trạng từ."
  },
  {
    id: 'i6',
    category: 'ielts',
    type: 'complete',
    questionText: "Modern digital ________ has transformed how multinational corporations engage with local audiences.",
    instructionVi: "Chọn danh từ không đếm được chỉ ngành quảng cáo nói chung đóng vai trò chủ ngữ.",
    options: ["advertising", "advertisement", "advertisements", "advertise"],
    correctIndex: 0, // advertising
    explanationVi: "Chính xác: Làm chủ ngữ chỉ ngành/hoạt động quảng cáo nói chung, ta dùng danh từ không đếm được 'advertising'.\n- 'advertisement' là danh từ đếm được số ít.\n- 'advertisements' là dạng số nhiều.\n- 'advertise' là động từ."
  },
  {
    id: 'i7',
    category: 'ielts',
    type: 'identify',
    questionText: "The candidate was able to communicate [A] his opinions very communicative [B] despite the pressure [C].",
    instructionVi: "Xác định từ loại bị dùng sai trong câu trên.",
    options: ["communicate", "communicative", "pressure", "despite"],
    correctIndex: 1, // communicative (should be communicatively)
    explanationVi: "Chính xác: Để bổ nghĩa cho động từ hành động 'communicate' đứng trước đó, ta cần sử dụng trạng từ 'communicatively' chứ không phải tính từ 'communicative'.\n- 'communicate' là động từ nguyên mẫu đúng sau 'able to'.\n- 'pressure' là danh từ đúng sau 'the'."
  },
  {
    id: 'i8',
    category: 'ielts',
    type: 'transform',
    questionText: "Adopting high-tech farming techniques has increased agricultural ________ (PRODUCE) significantly.",
    instructionVi: "Biến đổi gốc từ 'PRODUCE' thành danh từ không đếm được chỉ sản lượng, năng suất sản xuất.",
    options: ["productivity", "production", "productive", "productively"],
    correctIndex: 0, // productivity
    explanationVi: "Chính xác: Trong ngữ cảnh nông nghiệp và sản lượng, 'agricultural productivity' (năng suất nông nghiệp) là cụm thuật ngữ chuyên ngành chính xác nhất.\n- 'production' là sự sản xuất nói chung.\n- 'productive' là tính từ.\n- 'productively' là trạng từ."
  }
];

export const CLINIC_CASES: ClinicCase[] = [
  {
    id: 'case-uncountable-ads',
    title: 'Uncountable vs Countable Ads',
    titleVi: 'Bệnh lẫn lộn quảng cáo Đếm được & Không đếm được',
    symptomVi: 'Dùng từ "advertisement" ở dạng số ít không có mạo từ (như danh từ không đếm được), hoặc lạm dụng từ "advertisement" khi nói về ngành quảng cáo nói chung.',
    brokenSentence: 'We spend 80% of our marketing budget on Facebook advertisement.',
    diagnosticVi: 'Trong tiếng Anh, "advertising" là danh từ KHÔNG đếm được, dùng để chỉ ngành, hoạt động hoặc kỹ thuật quảng cáo nói chung. "advertisement" (hoặc "ad") là danh từ ĐẾM ĐƯỢC chỉ một mẩu quảng cáo cụ thể. Do đó, bạn không thể dùng "Facebook advertisement" đứng một mình không mạo từ. Bạn phải dùng "Facebook advertising" hoặc "Facebook ads".',
    cureSentence: 'We spend 80% of our marketing budget on Facebook advertising (or Facebook ads).',
    testSentence: 'The client asked us to draft five separate ________ for the upcoming Father\'s Day promotion.',
    testOptions: ['advertising', 'advertisement', 'advertisements'],
    testCorrectIndex: 2,
    testExplanationVi: 'Vì có số từ cụ thể "five separate" (năm cái riêng biệt), ta bắt buộc phải dùng Danh từ đếm được số nhiều là "advertisements" (hoặc "ads"). "advertising" là không đếm được nên không đi kèm số từ cụ thể.'
  },
  {
    id: 'case-process-person',
    title: 'Process vs Agent Confusion',
    titleVi: 'Bệnh nhầm lẫn giữa Hoạt động & Con người',
    symptomVi: 'Sử dụng từ chỉ người phân tích (analyst) để thay thế cho bản báo cáo phân tích (analysis) hoặc ngược lại.',
    brokenSentence: 'According to our recent data analyst, the organic conversion rate dropped by 2.5%.',
    diagnosticVi: '"Analyst" là danh từ chỉ NGƯỜI (nhà phân tích, chuyên viên phân tích). Bạn không thể nói "theo nhà phân tích dữ liệu gần đây của chúng tôi" để diễn tả một báo cáo hay một tập số liệu. Bạn phải dùng từ "analysis" (bản báo cáo, sự phân tích dữ liệu) để diễn tả văn bản chứa số liệu.',
    cureSentence: 'According to our recent data analysis, the organic conversion rate dropped by 2.5%.',
    testSentence: 'Our startup is looking to hire a senior growth ________ to build our SQL database dashboards.',
    testOptions: ['analysis', 'analyst', 'analytical'],
    testCorrectIndex: 1,
    testExplanationVi: 'Vị trí tuyển dụng ("looking to hire a...") cần một Danh từ chỉ NGƯỜI (vị trí công việc), đó chính là "analyst". "analysis" là sự phân tích, "analytical" là tính từ.'
  },
  {
    id: 'case-double-t',
    title: 'The Double T Spell',
    titleVi: 'Bệnh viết thừa chữ "t" trong "marketing"',
    symptomVi: 'Viết thừa chữ "t" thành "marketting" hoặc "marketting campaign" do liên tưởng sai quy tắc gấp đôi phụ âm.',
    brokenSentence: 'We are hiring a digital marketting executive for our food brand.',
    diagnosticVi: 'Theo quy tắc nhân đôi phụ âm cuối (Doubling Consonants Rule), ta chỉ nhân đôi phụ âm cuối khi thêm đuôi nguyên âm (như -ing) nếu từ 1 âm tiết kết thúc dạng CVC, hoặc từ nhiều âm tiết có trọng âm rơi vào âm tiết CUỐI CÙNG. Từ "market" /ˈmɑːrkɪt/ có trọng âm rơi vào âm tiết ĐẦU TIÊN, do đó ta không nhân đôi chữ "t". Viết "marketting" là lỗi chính tả nghiêm trọng gây mất uy tín.',
    cureSentence: 'We are hiring a digital marketing executive for our food brand.',
    testSentence: 'A successful email ________ campaign requires segmenting the contact list based on user behavior.',
    testOptions: ['marketting', 'marketing', 'marketted'],
    testCorrectIndex: 1,
    testExplanationVi: 'Từ duy nhất đúng chính tả và được công nhận là "marketing" (chỉ có 1 chữ "t" cuối của market).'
  },
  {
    id: 'case-affect-effect',
    title: 'Action vs Result Trap',
    titleVi: 'Cạm bẫy nhầm lẫn giữa Affect (Verb) & Effect (Noun)',
    symptomVi: 'Sử dụng từ "effect" như một động từ hành động hoặc dùng "affect" khi cần một danh từ chỉ kết quả.',
    brokenSentence: 'The low engagement rate on Facebook will negative effect our lead generation target.',
    diagnosticVi: 'Đây là cạm bẫy từ vựng kinh điển. "Affect" /əˈfɛkt/ là ĐỘNG TỪ (gây ảnh hưởng, tác động lên cái gì). "Effect" /ɪˈfɛkt/ là DANH TỪ (sự ảnh hưởng, kết quả, hiệu ứng). Đứng sau trợ động từ khuyết thiếu "will" và trạng từ "negatively" cần một Động từ hành động nguyên mẫu, do đó từ đúng phải là "affect".',
    cureSentence: 'The low engagement rate on Facebook will negatively affect our lead generation target.',
    testSentence: 'We are running an A/B test to measure the exact ________ of the new landing page header on conversions.',
    testOptions: ['affect', 'effect', 'effective'],
    testCorrectIndex: 1,
    testExplanationVi: 'Đứng sau cụm từ mạo từ + tính từ "the exact" cần một Danh từ đóng vai trò làm tân ngữ, do đó ta chọn "effect" (hiệu ứng, kết quả). "affect" là Động từ.'
  }
];
