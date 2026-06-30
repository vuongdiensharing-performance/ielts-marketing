export interface FormulaSlot {
  name: string;
  description: string;
  phraseBank: {
    marketing: string[];
    family: string[];
    ielts: string[];
  };
}

export interface FormulaExample {
  text: string;
  translationVi: string;
}

export interface SentenceFormula {
  id: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  title: string;
  pattern: string;
  explanationVi: string;
  whenToUseVi: string;
  grammarNotesVi: string;
  commonMistakes: string;
  complexityLabel: string;
  contextTags: string[];
  skillTags: string[];
  slots: FormulaSlot[];
  examples: {
    marketing: FormulaExample;
    family: FormulaExample;
    ielts: FormulaExample;
  };
}

export const SENTENCE_FORMULAS: SentenceFormula[] = [
  // A1 Formulas (1 to 8)
  {
    id: 'f1',
    level: 'A1',
    title: 'Subject + Be + Complement',
    pattern: 'Subject + am/is/are + Adjective/Noun',
    explanationVi: 'Cấu trúc miêu tả tính chất, trạng thái hoặc nghề nghiệp/danh tính cơ bản của chủ thể.',
    whenToUseVi: 'Dùng khi muốn giới thiệu thông tin cơ bản, miêu tả thuộc tính sản phẩm, tình trạng gia đình, hoặc đưa ra định nghĩa học thuật đơn giản.',
    grammarNotesVi: 'Chọn động từ To Be (am/is/are) tương thích với ngôi của chủ từ. Bổ ngữ (Complement) có thể là một Tính từ (Adjective) hoặc Cụm danh từ (Noun Phrase).',
    commonMistakes: 'Quên động từ To Be (ví dụ viết "The product effective" thay vì "The product is effective").',
    complexityLabel: 'Đơn giản (Simple)',
    contextTags: ['Tiếp thị', 'Gia đình', 'Học thuật'],
    skillTags: ['Writing', 'Speaking'],
    slots: [
      {
        name: 'Subject',
        description: 'Chủ từ',
        phraseBank: {
          marketing: ['The campaign', 'This Facebook ad', 'Our creative team'],
          family: ['The living room', 'The dinner', 'My children'],
          ielts: ['Digital literacy', 'Public transport', 'Education']
        }
      },
      {
        name: 'Be Verb',
        description: 'Động từ Be',
        phraseBank: {
          marketing: ['is', 'are'],
          family: ['is', 'are'],
          ielts: ['is', 'are']
        }
      },
      {
        name: 'Complement',
        description: 'Bổ ngữ',
        phraseBank: {
          marketing: ['ready for review', 'very creative', 'under budget'],
          family: ['clean and organized', 'ready on the table', 'very happy today'],
          ielts: ['essential for modern students', 'free of charge', 'a major global challenge']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'The campaign is under budget.',
        translationVi: 'Chiến dịch đang chi dưới mức ngân sách dự kiến.'
      },
      family: {
        text: 'The dinner is ready on the table.',
        translationVi: 'Bữa tối đã sẵn sàng trên bàn.'
      },
      ielts: {
        text: 'Education is essential for modern students.',
        translationVi: 'Giáo dục là thiết yếu đối với học sinh hiện đại.'
      }
    }
  },
  {
    id: 'f2',
    level: 'A1',
    title: 'Subject + Verb + Object',
    pattern: 'Subject + Verb (s/es) + Object',
    explanationVi: 'Mô tả một hành động chủ động tác động lên đối tượng cụ thể ở thời hiện tại đơn.',
    whenToUseVi: 'Dùng để diễn tả nhiệm vụ hằng ngày của team, công việc nhà thường nhật, hoặc các thói quen học tập của con người.',
    grammarNotesVi: 'Lưu ý chia động từ thêm s/es nếu chủ ngữ là số ít ngôi thứ ba (He, She, It, The team, Technology).',
    commonMistakes: 'Quên thêm s/es cho động từ khi chủ ngữ số ít (ví dụ "He write copy" thay vì "He writes copy").',
    complexityLabel: 'Cơ bản (SVO)',
    contextTags: ['Công việc', 'Hằng ngày', 'Tổng quan'],
    skillTags: ['Writing', 'Speaking'],
    slots: [
      {
        name: 'Subject',
        description: 'Chủ từ',
        phraseBank: {
          marketing: ['The copywriter', 'Our designer', 'The manager'],
          family: ['My father', 'My wife', 'My sister'],
          ielts: ['Many citizens', 'Young students', 'Governments']
        }
      },
      {
        name: 'Verb',
        description: 'Động từ',
        phraseBank: {
          marketing: ['writes', 'creates', 'analyzes'],
          family: ['prepares', 'cleans', 'buys'],
          ielts: ['use', 'prefer', 'support']
        }
      },
      {
        name: 'Object',
        description: 'Tân ngữ',
        phraseBank: {
          marketing: ['engaging TikTok copy', 'creative video hooks', 'campaign data daily'],
          family: ['the kitchen every weekend', 'healthy dinner for the family', 'fresh groceries from the supermarket'],
          ielts: ['online communication tools', 'public libraries', 'renewable energy systems']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'The copywriter writes engaging TikTok copy.',
        translationVi: 'Người viết quảng cáo viết những nội dung quảng cáo TikTok rất thu hút.'
      },
      family: {
        text: 'My wife cleans the kitchen every weekend.',
        translationVi: 'Vợ tôi dọn dẹp nhà bếp vào mỗi cuối tuần.'
      },
      ielts: {
        text: 'Many citizens prefer public libraries.',
        translationVi: 'Nhiều người dân ưa thích thư viện công cộng hơn.'
      }
    }
  },
  {
    id: 'f3',
    level: 'A1',
    title: 'There is / There are',
    pattern: 'There is + Singular Noun / There are + Plural Noun',
    explanationVi: 'Dùng để giới thiệu sự tồn tại của một hoặc nhiều sự vật, sự việc tại một địa điểm hoặc bối cảnh.',
    whenToUseVi: 'Dùng khi báo cáo số lượng kênh quảng cáo, liệt kê việc cần làm trong nhà, hoặc nêu các nhân tố ảnh hưởng trong bài viết học thuật.',
    grammarNotesVi: 'Dùng "There is" với danh từ số ít hoặc danh từ không đếm được. Dùng "There are" với danh từ số nhiều.',
    commonMistakes: 'Dùng nhầm lẫn "There are" cho danh từ số ít (ví dụ: "There are a meeting" thay vì "There is a meeting").',
    complexityLabel: 'Tồn tại (Existential)',
    contextTags: ['Báo cáo', 'Liệt kê', 'IELTS'],
    skillTags: ['Writing'],
    slots: [
      {
        name: 'There be',
        description: 'Có',
        phraseBank: {
          marketing: ['There is', 'There are'],
          family: ['There is', 'There are'],
          ielts: ['There is', 'There are']
        }
      },
      {
        name: 'Noun Phrase',
        description: 'Cụm danh từ',
        phraseBank: {
          marketing: ['a crucial campaign update', 'three active ad sets', 'many positive feedback emails'],
          family: ['some fresh fruit', 'five chores left', 'a dirty window in the attic'],
          ielts: ['a strong link', 'many practical benefits', 'a major drawback']
        }
      },
      {
        name: 'Modifier / Place',
        description: 'Cụm từ bổ ngữ chỉ nơi chốn / thời gian',
        phraseBank: {
          marketing: ['on the team dashboard', 'in this week\'s budget plan', 'from our VIP client'],
          family: ['in the refrigerator', 'on our weekend schedule', 'to fix this afternoon'],
          ielts: ['between education and employment', 'to public transportation', 'to this aggressive approach']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'There are three active ad sets in this week\'s budget plan.',
        translationVi: 'Có ba nhóm quảng cáo đang hoạt động trong kế hoạch ngân sách tuần này.'
      },
      family: {
        text: 'There is some fresh fruit in the refrigerator.',
        translationVi: 'Có một số trái cây tươi trong tủ lạnh.'
      },
      ielts: {
        text: 'There are many practical benefits to public transportation.',
        translationVi: 'Có nhiều lợi ích thực tế đối với việc sử dụng phương tiện giao thông công cộng.'
      }
    }
  },
  {
    id: 'f4',
    level: 'A1',
    title: 'Subject + Can + Base Verb',
    pattern: 'Subject + can + Verb (bare infinitive) (+ Object)',
    explanationVi: 'Diễn tả khả năng, năng lực hiện tại hoặc một lựa chọn có thể thực hiện được.',
    whenToUseVi: 'Dùng khi muốn đề xuất một giải pháp marketing khả thi, phân công công việc nhà cho người có khả năng, hoặc trình bày hành động con người có thể làm.',
    grammarNotesVi: 'Sau động từ khuyết thiếu "can", động từ chính phải giữ nguyên thể không "to", không chia theo chủ từ.',
    commonMistakes: 'Thêm "to" sau can (ví dụ: "We can to improve" thay vì "We can improve").',
    complexityLabel: 'Khả năng (Modality)',
    contextTags: ['Đề xuất', 'Phân công', 'Ý kiến'],
    skillTags: ['Speaking', 'Writing'],
    slots: [
      {
        name: 'Subject',
        description: 'Chủ từ',
        phraseBank: {
          marketing: ['Our design team', 'The audience', 'We'],
          family: ['My son', 'You', 'We'],
          ielts: ['Students', 'People', 'Local communities']
        }
      },
      {
        name: 'Modal',
        description: 'Khuyết thiếu',
        phraseBank: {
          marketing: ['can'],
          family: ['can'],
          ielts: ['can']
        }
      },
      {
        name: 'Base Verb',
        description: 'Động từ nguyên thể',
        phraseBank: {
          marketing: ['deliver', 'skip', 'optimize'],
          family: ['do', 'clean', 'buy'],
          ielts: ['learn', 'find', 'reduce']
        }
      },
      {
        name: 'Complement / Object',
        description: 'Bổ ngữ / Tân ngữ',
        phraseBank: {
          marketing: ['the final creative files on Monday', 'the YouTube ads quickly', 'the budget effectively'],
          family: ['the dishes easily', 'the back garden', 'some fresh flowers'],
          ielts: ['new skills online', 'accurate information', 'waste production']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'Our design team can deliver the final creative files on Monday.',
        translationVi: 'Đội ngũ thiết kế của chúng tôi có thể bàn giao các tệp sáng tạo cuối cùng vào thứ Hai.'
      },
      family: {
        text: 'My son can do the dishes easily.',
        translationVi: 'Con trai tôi có thể rửa bát đĩa một cách dễ dàng.'
      },
      ielts: {
        text: 'Students can learn new skills online.',
        translationVi: 'Học sinh có thể học các kỹ năng mới trực tuyến.'
      }
    }
  },
  {
    id: 'f5',
    level: 'A1',
    title: 'Need / Want + to Verb',
    pattern: 'Subject + need/want(s) + to + Verb (bare infinitive)',
    explanationVi: 'Diễn tả mong muốn hoặc nhu cầu bắt buộc cần làm một hành động nào đó.',
    whenToUseVi: 'Dùng để nhấn mạnh mục tiêu công việc cấp bách, phân công mong muốn nội bộ gia đình, hoặc thể hiện định hướng xã hội trong IELTS.',
    grammarNotesVi: 'Chú ý chia s/es cho "need" hoặc "want" tương tự động từ thường hiện tại đơn.',
    commonMistakes: 'Bỏ quên giới từ "to" (ví dụ: "We need launch" thay vì "We need to launch").',
    complexityLabel: 'Nhu cầu (Obligation/Desire)',
    contextTags: ['Mục tiêu', 'Đề xuất', 'Ưu tiên'],
    skillTags: ['Writing', 'Speaking'],
    slots: [
      {
        name: 'Subject',
        description: 'Chủ từ',
        phraseBank: {
          marketing: ['The client', 'We', 'Our manager'],
          family: ['I', 'The kids', 'My wife'],
          ielts: ['Every individual', 'Governments', 'Many consumers']
        }
      },
      {
        name: 'Need / Want',
        description: 'Cần / Muốn',
        phraseBank: {
          marketing: ['needs to', 'want to', 'wants to'],
          family: ['need to', 'want to', 'wants to'],
          ielts: ['needs to', 'need to', 'want to']
        }
      },
      {
        name: 'Base Verb',
        description: 'Động từ nguyên thể',
        phraseBank: {
          marketing: ['launch', 'approve', 'reduce'],
          family: ['clean', 'buy', 'arrange'],
          ielts: ['protect', 'improve', 'save']
        }
      },
      {
        name: 'Object',
        description: 'Tân ngữ',
        phraseBank: {
          marketing: ['the email campaign tomorrow', 'the new banner design', 'the ad spend quickly'],
          family: ['the dog house', 'new groceries', 'the living room shelf'],
          ielts: ['the local environment', 'public school facilities', 'more money for retirement']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'The client wants to approve the new banner design.',
        translationVi: 'Khách hàng muốn phê duyệt thiết kế biểu ngữ mới.'
      },
      family: {
        text: 'I need to clean the dog house.',
        translationVi: 'Tôi cần dọn dẹp nhà cho chó.'
      },
      ielts: {
        text: 'Governments need to improve public school facilities.',
        translationVi: 'Các chính phủ cần cải thiện các trang thiết bị trường học công lập.'
      }
    }
  },
  {
    id: 'f6',
    level: 'A1',
    title: 'Do / Does question',
    pattern: 'Do / Does + Subject + Verb (bare infinitive) + Object?',
    explanationVi: 'Dạng câu hỏi Có/Không (Yes/No Question) cơ bản để kiểm tra thông tin hoặc trạng thái ở hiện tại đơn.',
    whenToUseVi: 'Dùng để kiểm tra tiến độ chiến dịch, hỏi ý kiến thành viên gia đình về kế hoạch ăn tối, hoặc khảo sát ý kiến người tiêu dùng.',
    grammarNotesVi: 'Mượn trợ động từ Do (với I/you/we/they) hoặc Does (với he/she/it/danh từ số ít), động từ chính trở về nguyên thể.',
    commonMistakes: 'Vẫn chia động từ chính sau khi đã dùng Does (ví dụ: "Does he writes the draft?" thay vì "Does he write the draft?").',
    complexityLabel: 'Câu hỏi Yes/No',
    contextTags: ['Hỏi ý kiến', 'Kiểm tra', 'Giao tiếp'],
    skillTags: ['Speaking'],
    slots: [
      {
        name: 'Auxiliary',
        description: 'Trợ động từ',
        phraseBank: {
          marketing: ['Do', 'Does'],
          family: ['Do', 'Does'],
          ielts: ['Do', 'Does']
        }
      },
      {
        name: 'Subject',
        description: 'Chủ từ',
        phraseBank: {
          marketing: ['you', 'the client', 'our team members'],
          family: ['you', 'your husband', 'the children'],
          ielts: ['modern advertising', 'consumers', 'online education']
        }
      },
      {
        name: 'Base Verb',
        description: 'Động từ nguyên thể',
        phraseBank: {
          marketing: ['have', 'require', 'support'],
          family: ['like', 'clean', 'want'],
          ielts: ['influence', 'prefer', 'provide']
        }
      },
      {
        name: 'Object',
        description: 'Tân ngữ',
        phraseBank: {
          marketing: ['the latest dashboard password', 'a written brief', 'this optimization task'],
          family: ['spicy food', 'their bedrooms', 'to eat outdoors'],
          ielts: ['purchasing decisions', 'traditional stores', 'equal opportunities']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'Do you have the latest dashboard password?',
        translationVi: 'Bạn có mật khẩu bảng điều khiển mới nhất không?'
      },
      family: {
        text: 'Does your husband like spicy food?',
        translationVi: 'Chồng bạn có thích đồ ăn cay không?'
      },
      ielts: {
        text: 'Does modern advertising influence purchasing decisions?',
        translationVi: 'Quảng cáo hiện đại có ảnh hưởng đến quyết định mua sắm không?'
      }
    }
  },
  {
    id: 'f7',
    level: 'A1',
    title: 'WH-Question',
    pattern: 'Who / What / When / Where / Why / How + do/does + Subject + Verb?',
    explanationVi: 'Câu hỏi mở dùng để lấy thông tin chi tiết về nhân tố, thời điểm, lý do, hoặc phương thức hành động.',
    whenToUseVi: 'Dùng khi họp bàn chiến lược để khai thác dữ liệu, lên lịch trình gia đình, hoặc đặt câu hỏi mở trong các bài luận văn nghị luận.',
    grammarNotesVi: 'Từ để hỏi đứng đầu câu, theo sau bởi cấu trúc đảo ngữ của câu hỏi thường.',
    commonMistakes: 'Quên trợ động từ khi đặt câu hỏi (ví dụ: "Why we target this group?" thay vì "Why do we target this group?").',
    complexityLabel: 'Câu hỏi thông tin (Information)',
    contextTags: ['Hỏi ý kiến', 'Khai thác', 'Planning'],
    skillTags: ['Speaking', 'Writing'],
    slots: [
      {
        name: 'Wh- Word',
        description: 'Từ để hỏi',
        phraseBank: {
          marketing: ['How', 'Why', 'When'],
          family: ['Where', 'What', 'How'],
          ielts: ['How', 'Why', 'What']
        }
      },
      {
        name: 'Auxiliary',
        description: 'Trợ động từ',
        phraseBank: {
          marketing: ['do', 'does'],
          family: ['do', 'does'],
          ielts: ['do', 'does']
        }
      },
      {
        name: 'Subject',
        description: 'Chủ từ',
        phraseBank: {
          marketing: ['we', 'the manager', 'you'],
          family: ['we', 'the kids', 'you'],
          ielts: ['people', 'advertisers', 'technology']
        }
      },
      {
        name: 'Base Verb & Rest',
        description: 'Động từ chính & Thành phần còn lại',
        phraseBank: {
          marketing: ['analyze performance data', 'plan the budget', 'publish the blog post'],
          family: ['buy fresh groceries', 'spend their pocket money', 'cook this dinner'],
          ielts: ['learn moral values', 'persuade potential buyers', 'affect mental health']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'How do we analyze performance data?',
        translationVi: 'Chúng ta phân tích dữ liệu hiệu suất bằng cách nào?'
      },
      family: {
        text: 'Where do the kids spend their pocket money?',
        translationVi: 'Lũ trẻ tiêu tiền tiêu vặt của chúng ở đâu?'
      },
      ielts: {
        text: 'Why do advertisers persuade potential buyers?',
        translationVi: 'Tại sao các nhà quảng cáo lại thuyết phục những người mua tiềm năng?'
      }
    }
  },
  {
    id: 'f8',
    level: 'A1',
    title: 'Imperative / Simple Request',
    pattern: 'Verb (bare infinitive) + Object (+ please)',
    explanationVi: 'Câu mệnh lệnh trực tiếp hoặc lời yêu cầu lịch sự không cần chủ từ.',
    whenToUseVi: 'Dùng khi phân công việc nhanh trong kênh chat chung, yêu cầu hành động ngay lập tức từ người nhà, hoặc đưa ra chỉ dẫn kỹ thuật.',
    grammarNotesVi: 'Câu bắt đầu bằng một Động từ nguyên thể. Thêm "Please" ở đầu hoặc cuối để làm câu nói lịch sự, nhẹ nhàng hơn.',
    commonMistakes: 'Dùng động từ có "to" hoặc thêm "-ing" ở đầu câu mệnh lệnh (ví dụ: "To check the links" thay vì "Check the links").',
    complexityLabel: 'Mệnh lệnh / Yêu cầu',
    contextTags: ['Hành động', 'Phân công', 'Giao tiếp'],
    skillTags: ['Speaking'],
    slots: [
      {
        name: 'Intro / Please',
        description: 'Từ đệm lịch sự',
        phraseBank: {
          marketing: ['Please', 'Kindly'],
          family: ['Please', 'Please help me'],
          ielts: ['Please note that we must', 'First,']
        }
      },
      {
        name: 'Base Verb',
        description: 'Động từ nguyên thể',
        phraseBank: {
          marketing: ['check', 'review', 'update'],
          family: ['clean', 'wash', 'buy'],
          ielts: ['consider', 'observe', 'avoid']
        }
      },
      {
        name: 'Object & Adverb',
        description: 'Tân ngữ & Trạng từ kèm theo',
        phraseBank: {
          marketing: ['all active campaign metrics immediately', 'the creative design files before noon', 'the agency Slack channel'],
          family: ['the dinner table now', 'your dirty clothes today', 'some milk from the shop'],
          ielts: ['the overall social consequences', 'the children\'s behavior closely', 'unnecessary spending in commercial areas']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'Please review the creative design files before noon.',
        translationVi: 'Vui lòng kiểm tra các tệp thiết kế sáng tạo trước giờ trưa.'
      },
      family: {
        text: 'Please wash your dirty clothes today.',
        translationVi: 'Con làm ơn giặt quần áo bẩn của con hôm nay nhé.'
      },
      ielts: {
        text: 'Please consider the overall social consequences.',
        translationVi: 'Hãy cân nhắc đến các hệ quả xã hội tổng quan.'
      }
    }
  },

  // A2 Formulas (9 to 16)
  {
    id: 'f9',
    level: 'A2',
    title: 'Present Continuous',
    pattern: 'Subject + am/is/are + Verb-ing (+ Object)',
    explanationVi: 'Diễn tả hành động đang diễn ra tại thời điểm nói hoặc một xu hướng đang tăng trưởng.',
    whenToUseVi: 'Dùng khi báo cáo công việc đang chạy, mô tả hoạt động gia đình lúc rảnh, hoặc nêu xu hướng thay đổi xã hội trong IELTS.',
    grammarNotesVi: 'Sử dụng to be thích hợp + động từ chính thêm đuôi -ing. Chú ý gấp đôi phụ âm cuối trước khi thêm -ing ở một số từ ngắn (run -> running).',
    commonMistakes: 'Thiếu động từ to be (ví dụ: "The agency planning the strategy" thay vì "The agency is planning the strategy").',
    complexityLabel: 'Hiện tại tiếp diễn',
    contextTags: ['Đang thực hiện', 'Xu hướng', 'Báo cáo'],
    skillTags: ['Writing', 'Speaking'],
    slots: [
      {
        name: 'Subject',
        description: 'Chủ từ',
        phraseBank: {
          marketing: ['Our agency team', 'The copywriter', 'My designer'],
          family: ['My daughter', 'My family', 'I'],
          ielts: ['Global temperatures', 'Many consumers', 'Modern schools']
        }
      },
      {
        name: 'Be Verb',
        description: 'Động từ Be',
        phraseBank: {
          marketing: ['is', 'are'],
          family: ['is', 'are', 'am'],
          ielts: ['is', 'are']
        }
      },
      {
        name: 'Verb-ing',
        description: 'Động từ dạng -ing',
        phraseBank: {
          marketing: ['planning', 'developing', 'analyzing'],
          family: ['cleaning', 'cooking', 'shopping for'],
          ielts: ['rising', 'turning to', 'replacing']
        }
      },
      {
        name: 'Object / Rest',
        description: 'Tân ngữ / Thành phần phụ',
        phraseBank: {
          marketing: ['the launch budget strategy', 'a highly engaging video hook', 'last week\'s ad metrics'],
          family: ['her messy bedroom', 'a big pot of spicy soup', 'new clothes at the mall'],
          ielts: ['rapidly every year', 'digital shopping platforms', 'traditional textbooks with screens']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'Our agency team is planning the launch budget strategy.',
        translationVi: 'Đội ngũ đại diện của chúng tôi đang lên kế hoạch cho chiến lược ngân sách ra mắt.'
      },
      family: {
        text: 'My daughter is cleaning her messy bedroom.',
        translationVi: 'Con gái tôi đang dọn dẹp phòng ngủ bừa bộn của nó.'
      },
      ielts: {
        text: 'Many consumers are turning to digital shopping platforms.',
        translationVi: 'Nhiều người tiêu dùng đang chuyển dịch sang các nền tảng mua sắm kỹ thuật số.'
      }
    }
  },
  {
    id: 'f10',
    level: 'A2',
    title: 'Past Simple',
    pattern: 'Subject + Verb-ed / Irregular Verb (+ Object)',
    explanationVi: 'Diễn tả hành động đã xảy ra và kết thúc hoàn toàn trong quá khứ, có mốc thời gian rõ ràng.',
    whenToUseVi: 'Dùng khi phân tích kết quả của chiến dịch trước, kể lại hoạt động dọn dẹp ngày hôm qua, hoặc báo cáo các cột mốc lịch sử.',
    grammarNotesVi: 'Phân biệt động từ có quy tắc (thêm -ed) và động từ bất quy tắc (cột 2 trong bảng). Thường đi kèm cụm chỉ thời gian như yesterday, last week, in 2024.',
    commonMistakes: 'Sử dụng động từ nguyên thể cho hành động đã kết thúc (ví dụ: "Yesterday, we optimize the campaign" thay vì "optimized").',
    complexityLabel: 'Quá khứ đơn',
    contextTags: ['Quá khứ', 'Báo cáo', 'Tổng kết'],
    skillTags: ['Writing', 'Speaking'],
    slots: [
      {
        name: 'Subject',
        description: 'Chủ từ',
        phraseBank: {
          marketing: ['The creative team', 'Our media buyer', 'We'],
          family: ['My father', 'We', 'My sister'],
          ielts: ['Many companies', 'The government', 'Early ancestors']
        }
      },
      {
        name: 'Past Verb',
        description: 'Động từ quá khứ',
        phraseBank: {
          marketing: ['launched', 'improved', 'analyzed'],
          family: ['organized', 'bought', 'prepared'],
          ielts: ['developed', 'introduced', 'invested']
        }
      },
      {
        name: 'Object / Time',
        description: 'Tân ngữ & Thời gian',
        phraseBank: {
          marketing: ['the search ad campaign yesterday', 'the CTR metrics last night', 'a new product brand last year'],
          family: ['the entire house last Sunday', 'fresh ingredients for dinner', 'a beautiful cake'],
          ielts: ['new industrial laws in 2010', 'heavy taxes on plastic bags', 'massive funds in public housing']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'The creative team launched the search ad campaign yesterday.',
        translationVi: 'Đội ngũ sáng tạo đã khởi chạy chiến dịch quảng cáo tìm kiếm ngày hôm qua.'
      },
      family: {
        text: 'We organized the entire house last Sunday.',
        translationVi: 'Chúng tôi đã dọn dẹp sắp xếp toàn bộ ngôi nhà vào Chủ nhật tuần trước.'
      },
      ielts: {
        text: 'The government introduced heavy taxes on plastic bags.',
        translationVi: 'Chính phủ đã áp mức thuế nặng lên túi nilon.'
      }
    }
  },
  {
    id: 'f11',
    level: 'A2',
    title: 'Future with Will',
    pattern: 'Subject + will + Verb (bare infinitive) (+ Object)',
    explanationVi: 'Diễn tả lời hứa, quyết định đưa ra ngay tại thời điểm nói hoặc một dự đoán tương lai không có căn cứ chắc chắn.',
    whenToUseVi: 'Dùng khi đưa ra phản hồi nhanh cho sếp/khách hàng, đồng ý làm việc nhà ngay lập tức, hoặc đưa ra các dự báo vĩ mô trong tương lai.',
    grammarNotesVi: 'Động từ sau "will" luôn ở dạng nguyên thể không chia.',
    commonMistakes: 'Thêm "to" sau will (ví dụ: "I will to update" thay vì "I will update").',
    complexityLabel: 'Tương lai (Will)',
    contextTags: ['Tương lai', 'Hứa hẹn', 'Dự báo'],
    skillTags: ['Speaking', 'Writing'],
    slots: [
      {
        name: 'Subject',
        description: 'Chủ từ',
        phraseBank: {
          marketing: ['We', 'Our account manager', 'The client'],
          family: ['I', 'My daughter', 'We'],
          ielts: ['This trend', 'Automation', 'Online platforms']
        }
      },
      {
        name: 'Modal',
        description: 'Sẽ',
        phraseBank: {
          marketing: ['will'],
          family: ['will'],
          ielts: ['will']
        }
      },
      {
        name: 'Base Verb',
        description: 'Động từ nguyên thể',
        phraseBank: {
          marketing: ['update', 'improve', 'approve'],
          family: ['do', 'clean', 'help'],
          ielts: ['affect', 'create', 'provide']
        }
      },
      {
        name: 'Object & Context',
        description: 'Tân ngữ & Ngữ cảnh',
        phraseBank: {
          marketing: ['the performance dashboard tomorrow', 'our TikTok CTR soon', 'the proposed design budget'],
          family: ['the laundry after dinner', 'the living room shelf', 'you clean the back garden'],
          ielts: ['the global economy significantly', 'more employment opportunities', 'better access to academic resources']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'We will update the performance dashboard tomorrow.',
        translationVi: 'Chúng tôi sẽ cập nhật bảng theo dõi hiệu suất vào ngày mai.'
      },
      family: {
        text: 'I will do the laundry after dinner.',
        translationVi: 'Tôi sẽ đi giặt quần áo sau bữa tối.'
      },
      ielts: {
        text: 'Automation will create more employment opportunities.',
        translationVi: 'Tự động hóa sẽ tạo ra nhiều cơ hội việc làm hơn.'
      }
    }
  },
  {
    id: 'f12',
    level: 'A2',
    title: 'Be Going To',
    pattern: 'Subject + am/is/are + going to + Verb (bare infinitive)',
    explanationVi: 'Diễn tả dự định, kế hoạch đã được chuẩn bị sẵn, hoặc một dự đoán có căn cứ/dấu hiệu rõ ràng.',
    whenToUseVi: 'Dùng khi trình bày kế hoạch chạy quảng cáo tuần tới, bàn bạc kế hoạch dã ngoại gia đình đã thống nhất, hoặc bàn về xu hướng chắc chắn sẽ diễn ra.',
    grammarNotesVi: 'Đừng quên chia động từ "be" đi trước cụm "going to" theo chủ từ.',
    commonMistakes: 'Bỏ quên động từ "be" (ví dụ: "We going to pitch" thay vì "We are going to pitch").',
    complexityLabel: 'Kế hoạch (Be going to)',
    contextTags: ['Kế hoạch', 'Dự đoán', 'Sắp diễn ra'],
    skillTags: ['Speaking', 'Writing'],
    slots: [
      {
        name: 'Subject',
        description: 'Chủ từ',
        phraseBank: {
          marketing: ['Our media buyers', 'The agency', 'We'],
          family: ['We', 'My husband and I', 'My mother'],
          ielts: ['Many universities', 'The local council', 'Some developing nations']
        }
      },
      {
        name: 'Be Going To',
        description: 'Sẽ (kế hoạch)',
        phraseBank: {
          marketing: ['are going to', 'is going to'],
          family: ['are going to', 'is going to'],
          ielts: ['are going to', 'is going to']
        }
      },
      {
        name: 'Base Verb',
        description: 'Động từ nguyên thể',
        phraseBank: {
          marketing: ['launch', 'optimize', 'collaborate'],
          family: ['visit', 'buy', 'arrange'],
          ielts: ['adopt', 'construct', 'implement']
        }
      },
      {
        name: 'Object & Time',
        description: 'Tân ngữ & Thời điểm',
        phraseBank: {
          marketing: ['three new search ads next Monday', 'our creative production workflow', 'with top YouTube creators'],
          family: ['our grandparents this weekend', 'a new dishwasher next month', 'the dining area space'],
          ielts: ['online enrollment methods', 'a new recycling plant', 'stricter environmental rules']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'The agency is going to launch three new search ads next Monday.',
        translationVi: 'Đơn vị đại diện chuẩn bị khởi chạy ba mẫu quảng cáo tìm kiếm mới vào thứ Hai tới.'
      },
      family: {
        text: 'We are going to visit our grandparents this weekend.',
        translationVi: 'Chúng tôi dự định sẽ đi thăm ông bà vào cuối tuần này.'
      },
      ielts: {
        text: 'Many universities are going to adopt online enrollment methods.',
        translationVi: 'Nhiều trường đại học chuẩn bị áp dụng các phương thức tuyển sinh trực tuyến.'
      }
    }
  },
  {
    id: 'f13',
    level: 'A2',
    title: 'Frequency Adverbs',
    pattern: 'Subject + Adverb of Frequency + Verb (+ Object)',
    explanationVi: 'Diễn tả tần suất thực hiện các thói quen hoặc hành động thường kỳ trong cuộc sống/công việc.',
    whenToUseVi: 'Dùng khi mô tả nhịp độ công việc hằng ngày, kể về tần suất dọn dẹp nhà cửa, hoặc nhận xét thói quen học tập của con người.',
    grammarNotesVi: 'Trạng từ chỉ tần suất (always, usually, often, sometimes, rarely, never) thường đứng trước động từ thường nhưng đứng sau động từ to be.',
    commonMistakes: 'Đặt trạng từ chỉ tần suất sai vị trí (ví dụ: "We review always our KPIs" thay vì "We always review our KPIs").',
    complexityLabel: 'Tần suất (Frequency)',
    contextTags: ['Thói quen', 'Tần suất', 'Đời sống'],
    skillTags: ['Speaking'],
    slots: [
      {
        name: 'Subject',
        description: 'Chủ từ',
        phraseBank: {
          marketing: ['We', 'Our marketing team', 'The client'],
          family: ['My family', 'I', 'My children'],
          ielts: ['Modern consumers', 'Young people', 'Successful companies']
        }
      },
      {
        name: 'Frequency Adverb',
        description: 'Trạng từ tần suất',
        phraseBank: {
          marketing: ['always', 'usually', 'rarely'],
          family: ['usually', 'often', 'sometimes'],
          ielts: ['frequently', 'rarely', 'always']
        }
      },
      {
        name: 'Verb',
        description: 'Động từ',
        phraseBank: {
          marketing: ['analyze', 'update', 'approve'],
          family: ['cook', 'clean', 'eat'],
          ielts: ['use', 'read', 'rely on']
        }
      },
      {
        name: 'Object & Rest',
        description: 'Tân ngữ & Thành phần phụ',
        phraseBank: {
          marketing: ['our ad performance reports hằng tuần', 'our search campaigns', 'creative briefs on time'],
          family: ['lunch together', 'the back garden', 'fresh vegetables'],
          ielts: ['digital marketing services', 'printed newspapers', 'online product reviews']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'We always analyze our ad performance reports hằng tuần.',
        translationVi: 'Chúng tôi luôn phân tích báo cáo hiệu suất quảng cáo hằng tuần.'
      },
      family: {
        text: 'My family usually cooks lunch together.',
        translationVi: 'Gia đình tôi thường nấu bữa trưa cùng nhau.'
      },
      ielts: {
        text: 'Modern consumers frequently rely on online product reviews.',
        translationVi: 'Người tiêu dùng hiện đại thường xuyên phụ thuộc vào đánh giá sản phẩm trực tuyến.'
      }
    }
  },
  {
    id: 'f14',
    level: 'A2',
    title: 'Comparative Structures',
    pattern: 'Subject + Be + Adj-er/More Adj + than + Object',
    explanationVi: 'Cấu trúc so sánh hơn giữa hai chủ thể về một thuộc tính hoặc chỉ số cụ thể.',
    whenToUseVi: 'Dùng khi đối chiếu hiệu quả giữa 2 chiến dịch (CTR, CPA), so sánh giá cả/diện tích đồ nội thất, hoặc thảo luận các khía cạnh xã hội trong học thuật.',
    grammarNotesVi: 'Với tính từ ngắn, thêm đuôi "-er". Với tính từ dài (từ 2 âm tiết trở lên), dùng "more + tính từ". Đừng quên từ "than" đi sau.',
    commonMistakes: 'Dùng cả more và đuôi er cùng lúc (ví dụ: "more cheaper than" hay "more better than").',
    complexityLabel: 'So sánh hơn (Comparison)',
    contextTags: ['So sánh', 'Báo cáo', 'IELTS'],
    skillTags: ['Writing', 'Speaking'],
    slots: [
      {
        name: 'Subject',
        description: 'Chủ thể 1',
        phraseBank: {
          marketing: ['The new search ad group', 'This marketing campaign', 'Digital advertising'],
          family: ['The new smart vacuum', 'Living in the suburbs', 'This dining table'],
          ielts: ['Online education', 'Renewable energy source', 'Public transport system']
        }
      },
      {
        name: 'Be Verb',
        description: 'Động từ Be',
        phraseBank: {
          marketing: ['is', 'are'],
          family: ['is', 'are'],
          ielts: ['is', 'are']
        }
      },
      {
        name: 'Comparative Adj',
        description: 'Tính từ so sánh hơn',
        phraseBank: {
          marketing: ['more effective than', 'cheaper than', 'more competitive than'],
          family: ['more convenient than', 'quieter than', 'cheaper than'],
          ielts: ['more flexible than', 'more beneficial than', 'cleaner than']
        }
      },
      {
        name: 'Object',
        description: 'Chủ thể 2',
        phraseBank: {
          marketing: ['the old social media campaign', 'traditional TV advertising', 'our competitor\'s ad campaign'],
          family: ['the old broom', 'living in the noisy city', 'the wooden desks'],
          ielts: ['traditional classroom learning', 'fossil fuels', 'private cars']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'The new search ad group is more effective than the old social media campaign.',
        translationVi: 'Nhóm quảng cáo tìm kiếm mới hiệu quả hơn chiến dịch mạng xã hội cũ.'
      },
      family: {
        text: 'The new smart vacuum is quieter than the old broom.',
        translationVi: 'Máy hút bụi thông minh mới chạy êm hơn cái chổi cũ.'
      },
      ielts: {
        text: 'Online education is more flexible than traditional classroom learning.',
        translationVi: 'Giáo dục trực tuyến linh hoạt hơn so với việc học trên lớp học truyền thống.'
      }
    }
  },
  {
    id: 'f15',
    level: 'A2',
    title: 'Because / So',
    pattern: 'Clause 1 + because + Clause 2 / Clause 1 + so + Clause 2',
    explanationVi: 'Kết nối hai mệnh đề thể hiện mối quan hệ Nhân quả (Nguyên nhân -> Kết quả).',
    whenToUseVi: 'Dùng khi giải thích biến động số liệu, nêu lý do phải làm sạch nhà, hoặc xây dựng lập luận có tính liên kết chặt chẽ.',
    grammarNotesVi: 'Mệnh đề sau "because" là nguyên nhân. Mệnh đề sau "so" là kết quả. Khi dùng "so", thường có dấu phẩy đứng trước.',
    commonMistakes: 'Dùng cả because và so trong cùng một câu ghép (ví dụ: "Because we have low budget, so we paused ads").',
    complexityLabel: 'Nhân quả (Cause/Effect)',
    contextTags: ['Nhân quả', 'Giải thích', 'Liên kết'],
    skillTags: ['Writing', 'Speaking'],
    slots: [
      {
        name: 'Clause 1',
        description: 'Mệnh đề 1',
        phraseBank: {
          marketing: ['We paused the Facebook ads', 'The campaign CTR increased', 'The client rejected the brief'],
          family: ['I cooked a simple dinner', 'We had to organize the attic', 'We bought a bigger cabinet'],
          ielts: ['Many people work from home', 'Fossil fuels are limited', 'Students study online']
        }
      },
      {
        name: 'Conjunction',
        description: 'Từ nối',
        phraseBank: {
          marketing: ['because', ', so'],
          family: ['because', ', so'],
          ielts: ['because', ', so']
        }
      },
      {
        name: 'Clause 2',
        description: 'Mệnh đề 2',
        phraseBank: {
          marketing: ['the conversion cost was extremely high', 'the creative hook was very engaging', 'the designer did not follow guidelines'],
          family: ['my husband was tired', 'it was full of old clothes', 'we needed more storage space'],
          ielts: ['modern technology is highly advanced', 'we must invest in solar energy', 'they want to save traveling time']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'We paused the Facebook ads because the conversion cost was extremely high.',
        translationVi: 'Chúng tôi đã tạm dừng quảng cáo Facebook vì chi phí chuyển đổi cực kỳ cao.'
      },
      family: {
        text: 'I cooked a simple dinner because my husband was tired.',
        translationVi: 'Tôi đã nấu một bữa tối đơn giản vì chồng tôi mệt.'
      },
      ielts: {
        text: 'Many people work from home because modern technology is highly advanced.',
        translationVi: 'Nhiều người làm việc tại nhà vì công nghệ hiện đại đã vô cùng tiến bộ.'
      }
    }
  },
  {
    id: 'f16',
    level: 'A2',
    title: 'Could you / Would you mind request',
    pattern: 'Could you + Verb (bare) + Object? / Would you mind + Verb-ing + Object?',
    explanationVi: 'Mẫu câu yêu cầu lịch sự, tôn trọng đối phương khi muốn họ thực hiện một hành động nào đó.',
    whenToUseVi: 'Dùng khi nhắn tin nhờ đồng nghiệp làm việc gấp, nhờ người thân giúp đỡ dọn dẹp, hoặc giao tiếp xã giao lịch sự.',
    grammarNotesVi: 'Sau "Could you" dùng động từ nguyên thể. Sau "Would you mind" bắt buộc phải dùng động từ thêm đuôi -ing.',
    commonMistakes: 'Dùng động từ nguyên mẫu sau Would you mind (ví dụ: "Would you mind check the metrics?" thay vì "checking").',
    complexityLabel: 'Yêu cầu lịch sự (Request)',
    contextTags: ['Yêu cầu', 'Giao tiếp', 'Nhờ vả'],
    skillTags: ['Speaking'],
    slots: [
      {
        name: 'Polite Request',
        description: 'Cụm yêu cầu lịch sự',
        phraseBank: {
          marketing: ['Could you please', 'Would you mind'],
          family: ['Could you please', 'Would you mind'],
          ielts: ['Could we', 'Would the authorities mind']
        }
      },
      {
        name: 'Action (Verb / Verb-ing)',
        description: 'Hành động',
        phraseBank: {
          marketing: ['update / updating', 'share / sharing', 'review / reviewing'],
          family: ['clean / cleaning', 'take out / taking out', 'buy / buying'],
          ielts: ['limit / limiting', 'improve / improving', 'provide / providing']
        }
      },
      {
        name: 'Object & Rest',
        description: 'Tân ngữ',
        phraseBank: {
          marketing: ['the performance database now', 'the raw design assets with the team', 'the proposed marketing budget'],
          family: ['the dog house after lunch', 'the smelly garbage bags', 'some organic milk from the store'],
          ielts: ['ad broadcast hours for children', 'public library services', 'better environmental guidelines']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'Would you mind sharing the raw design assets with the team?',
        translationVi: 'Bạn có phiền chia sẻ các tệp thiết kế gốc với cả đội không?'
      },
      family: {
        text: 'Could you please clean the dog house after lunch?',
        translationVi: 'Anh/con có thể quét dọn chuồng chó sau bữa trưa được không?'
      },
      ielts: {
        text: 'Would the authorities mind improving public library services?',
        translationVi: 'Liệu chính quyền có phiền cải thiện các dịch vụ thư viện công cộng?'
      }
    }
  },

  // B1 Formulas (17 to 24)
  {
    id: 'f17',
    level: 'B1',
    title: 'Present Perfect',
    pattern: 'Subject + have/has + Past Participle (+ Object)',
    explanationVi: 'Diễn tả hành động đã hoàn thành tính đến thời điểm hiện tại, nhấn mạnh kết quả đạt được hoặc trải nghiệm.',
    whenToUseVi: 'Dùng khi báo cáo KPI đã đạt được, thông báo công việc nhà đã hoàn thành xong xuôi, hoặc nêu số liệu thực tế trong IELTS.',
    grammarNotesVi: 'Has/Have + Động từ phân từ 2 (V-ed hoặc cột 3). Chú ý sự hòa hợp giữa chủ ngữ số ít/số nhiều.',
    commonMistakes: 'Dùng nhầm thì quá khứ đơn khi muốn nhấn mạnh kết quả hiện tại (ví dụ: "I cleaned the kitchen so it is ready now" -> nên dùng "I have cleaned...").',
    complexityLabel: 'Hiện tại hoàn thành',
    contextTags: ['Kết quả', 'Báo cáo', 'B1-Core'],
    skillTags: ['Writing', 'Speaking'],
    slots: [
      {
        name: 'Subject',
        description: 'Chủ từ',
        phraseBank: {
          marketing: ['Our creative team', 'We', 'The agency'],
          family: ['I', 'My daughter', 'We'],
          ielts: ['The government', 'Many schools', 'Modern technology']
        }
      },
      {
        name: 'Auxiliary Verb',
        description: 'Trợ động từ',
        phraseBank: {
          marketing: ['has', 'have'],
          family: ['have', 'has'],
          ielts: ['has', 'have']
        }
      },
      {
        name: 'Past Participle',
        description: 'Phân từ quá khứ (V3/V-ed)',
        phraseBank: {
          marketing: ['achieved', 'launched', 'optimized'],
          family: ['cleaned', 'bought', 'arranged'],
          ielts: ['improved', 'provided', 'changed']
        }
      },
      {
        name: 'Object & Context',
        description: 'Tân ngữ & Trạng từ bổ sung',
        phraseBank: {
          marketing: ['the campaign target successfully', 'two main ad campaigns this week', 'our media buyer strategy'],
          family: ['the entire living room recently', 'fresh milk and eggs for the week', 'the dining chairs nicely'],
          ielts: ['educational systems significantly', 'unlimited learning materials', 'the way people communicate globally']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'We have achieved the campaign target successfully.',
        translationVi: 'Chúng tôi đã hoàn thành mục tiêu chiến dịch một cách thành công.'
      },
      family: {
        text: 'I have cleaned the entire living room recently.',
        translationVi: 'Gần đây tôi đã dọn sạch toàn bộ phòng khách.'
      },
      ielts: {
        text: 'Modern technology has changed the way people communicate globally.',
        translationVi: 'Công nghệ hiện đại đã thay đổi cách con người giao tiếp trên toàn cầu.'
      }
    }
  },
  {
    id: 'f18',
    level: 'B1',
    title: 'Passive Voice',
    pattern: 'Subject (receiver) + am/is/are/was/were + Past Participle (+ by Agent)',
    explanationVi: 'Nhấn mạnh vào đối tượng chịu tác động của hành động, thay vì đối tượng thực hiện hành động.',
    whenToUseVi: 'Dùng khi muốn báo cáo kết quả số liệu khách quan, nói về một tác vụ gia đình đã được xử lý xong, hoặc hành văn trang trọng trong IELTS.',
    grammarNotesVi: 'Động từ "Be" được chia theo thì của hành động gốc và theo số ít/số nhiều của chủ ngữ mới.',
    commonMistakes: 'Quên chia phân từ 2 hoặc quên động từ Be (ví dụ: "The report optimized by the team" thay vì "is optimized").',
    complexityLabel: 'Bị động (Passive)',
    contextTags: ['Khách quan', 'Học thuật', 'Báo cáo'],
    skillTags: ['Writing'],
    slots: [
      {
        name: 'Subject (Receiver)',
        description: 'Đối tượng nhận tác động',
        phraseBank: {
          marketing: ['The campaign design assets', 'The final budget draft', 'All search ad copy'],
          family: ['The front window', 'The healthy dinner', 'The back garden plants'],
          ielts: ['Public libraries', 'Natural wildlife habitats', 'Online personal data']
        }
      },
      {
        name: 'Be Verb',
        description: 'Động từ Be',
        phraseBank: {
          marketing: ['were', 'was', 'is'],
          family: ['is', 'was', 'were'],
          ielts: ['are', 'is', 'were']
        }
      },
      {
        name: 'Past Participle',
        description: 'Động từ V3/V-ed',
        phraseBank: {
          marketing: ['delivered', 'approved', 'optimized'],
          family: ['cleaned', 'prepared', 'watered'],
          ielts: ['supported', 'destroyed', 'stolen']
        }
      },
      {
        name: 'Agent / Time',
        description: 'Tác nhân / Thời gian',
        phraseBank: {
          marketing: ['by our agency partner yesterday', 'by the marketing lead last night', 'for optimal conversion rate'],
          family: ['by my sister with soap', 'by my husband early', 'every day in summer'],
          ielts: ['by the local community funds', 'by expanding industrial zones', 'by professional cyber criminals']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'The campaign design assets were delivered by our agency partner yesterday.',
        translationVi: 'Các tệp tài nguyên thiết kế chiến dịch đã được bàn giao bởi đối tác agency ngày hôm qua.'
      },
      family: {
        text: 'The healthy dinner was prepared by my husband early.',
        translationVi: 'Bữa tối lành mạnh đã được chồng tôi chuẩn bị từ sớm.'
      },
      ielts: {
        text: 'Online personal data is sometimes stolen by professional cyber criminals.',
        translationVi: 'Dữ liệu cá nhân trực tuyến đôi khi bị đánh cắp bởi các tội phạm mạng chuyên nghiệp.'
      }
    }
  },
  {
    id: 'f19',
    level: 'B1',
    title: 'Relative Clauses',
    pattern: 'Subject + who/which/that + defining clause (+ main verb + object)',
    explanationVi: 'Sử dụng mệnh đề quan hệ để bổ sung thông tin chi tiết cho danh từ đi trước mà không cần tách câu.',
    whenToUseVi: 'Dùng để phân loại nhóm đối tượng khách hàng mục tiêu, nói về thành viên phụ trách công việc nhà, hoặc viết luận học thuật phức hợp.',
    grammarNotesVi: 'Dùng "who" cho người, "which" cho vật, "that" cho cả hai (trong mệnh đề xác định).',
    commonMistakes: 'Dùng sai đại từ quan hệ (ví dụ: "The target customer which is interested..." -> đúng phải là "who").',
    complexityLabel: 'Mệnh đề quan hệ',
    contextTags: ['Mô tả', 'Phân loại', 'Liên kết'],
    skillTags: ['Writing'],
    slots: [
      {
        name: 'Main Subject',
        description: 'Chủ ngữ chính',
        phraseBank: {
          marketing: ['The potential customers', 'The tracking pixel', 'The ad agency'],
          family: ['My younger son', 'The smart oven', 'Our neighbor'],
          ielts: ['People', 'A government system', 'Technological tools']
        }
      },
      {
        name: 'Relative Pronoun',
        description: 'Đại từ quan hệ',
        phraseBank: {
          marketing: ['who', 'which', 'that'],
          family: ['who', 'which', 'that'],
          ielts: ['who', 'which', 'that']
        }
      },
      {
        name: 'Relative Clause Verb & Obj',
        description: 'Mệnh đề bổ trợ',
        phraseBank: {
          marketing: ['prefer short video content', 'collects demographic data', 'designed our brand book'],
          family: ['always washes the dishes', 'has an automatic self-check timer', 'helps us feed the dog'],
          ielts: ['acquire online certificates', 'manages public library facilities', 'improve social connectivity']
        }
      },
      {
        name: 'Main Verb & Object',
        description: 'Vị ngữ chính của câu',
        phraseBank: {
          marketing: ['will purchase our products', 'helps us optimize budgets', 'is extremely reliable'],
          family: ['gets extra pocket money', 'saves my wife hours of cooking', 'is very helpful'],
          ielts: ['can easily find jobs', 'requires significant tax funding', 'have changed our daily lifestyles']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'The potential customers who prefer short video content will purchase our products.',
        translationVi: 'Những khách hàng tiềm năng thích nội dung video ngắn sẽ mua sản phẩm của chúng tôi.'
      },
      family: {
        text: 'The smart oven which has an automatic self-check timer saves my wife hours of cooking.',
        translationVi: 'Chiếc lò nướng thông minh có bộ hẹn giờ tự động giúp vợ tôi tiết kiệm hàng giờ nấu nướng.'
      },
      ielts: {
        text: 'People who acquire online certificates can easily find jobs.',
        translationVi: 'Những người đạt được chứng chỉ trực tuyến có thể dễ dàng tìm kiếm việc làm.'
      }
    }
  },
  {
    id: 'f20',
    level: 'B1',
    title: 'First Conditional',
    pattern: 'If + Subject + Present Simple, Subject + will + Base Verb',
    explanationVi: 'Diễn tả giả định về một tình huống có thật, hoàn toàn có khả năng xảy ra trong tương lai nếu có điều kiện đi kèm.',
    whenToUseVi: 'Dùng khi phân tích dự toán mục tiêu hoặc rủi ro marketing, cam kết khen thưởng nội bộ gia đình, hoặc suy luận giả thuyết học thuật.',
    grammarNotesVi: 'Mệnh đề chứa "If" chia ở hiện tại đơn. Mệnh đề chính chia ở tương lai đơn (will + động từ nguyên thể).',
    commonMistakes: 'Dùng "will" ở cả hai vế (ví dụ: "If we will launch, we will see results").',
    complexityLabel: 'Câu điều kiện loại 1',
    contextTags: ['Giả định', 'Dự kiến', 'Lập luận'],
    skillTags: ['Writing', 'Speaking'],
    slots: [
      {
        name: 'If Clause Subject',
        description: 'Chủ từ vế điều kiện (If)',
        phraseBank: {
          marketing: ['If we optimize the ad copy', 'If the client approves the creative brief', 'If our CTR drops below 1%'],
          family: ['If the children complete their homework early', 'If my husband cleans the kitchen floor', 'If we organize our schedules collaboratively'],
          ielts: ['If the government provides free online courses', 'If corporations limit aggressive advertising campaigns', 'If citizens choose public transport systems']
        }
      },
      {
        name: 'Comma',
        description: 'Dấu phẩy',
        phraseBank: {
          marketing: [','],
          family: [','],
          ielts: [',']
        }
      },
      {
        name: 'Main Subject',
        description: 'Chủ từ vế kết quả',
        phraseBank: {
          marketing: ['the conversion cost will decrease', 'the team will begin production', 'we will redesign the landing page'],
          family: ['we will go to the cinema', 'I will cook a healthy dinner', 'we will save time for rest'],
          ielts: ['more citizens will learn tech skills', 'consumers will buy healthier products', 'urban air quality will improve']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'If we optimize the ad copy, we will have a better chance of lowering the cost per conversion.',
        translationVi: 'Nếu chúng ta tối ưu hóa nội dung quảng cáo, chúng ta sẽ có cơ hội tốt hơn để giảm chi phí trên mỗi chuyển đổi.'
      },
      family: {
        text: 'If the children complete their homework early, we will go to the cinema.',
        translationVi: 'Nếu các con hoàn thành bài tập về nhà sớm, chúng ta sẽ đi xem phim.'
      },
      ielts: {
        text: 'If the government provides free online courses, more citizens will learn tech skills.',
        translationVi: 'Nếu chính phủ cung cấp các khóa học trực tuyến miễn phí, nhiều người dân hơn sẽ được học các kỹ năng công nghệ.'
      }
    }
  },
  {
    id: 'f21',
    level: 'B1',
    title: 'Modal Verbs (Advice/Obligation)',
    pattern: 'Subject + should / must / have to + Base Verb (+ Object)',
    explanationVi: 'Diễn tả lời khuyên chân thành, sự bắt buộc phải làm việc gì đó vì tính cấp bách hoặc nghĩa vụ luật pháp.',
    whenToUseVi: 'Dùng để tư vấn các bước chiến lược cấp bách, quy ước trách nhiệm dọn dẹp nhà cửa nghiêm khắc, hoặc đưa ra giải pháp giải quyết tệ nạn xã hội.',
    grammarNotesVi: 'Sau should/must/have to, động từ chính giữ nguyên thể. "Have to" chia theo thì và chủ ngữ (has to / had to), còn "should/must" giữ nguyên.',
    commonMistakes: 'Thêm "to" sau must hoặc should (ví dụ: "We should to improve" -> sai).',
    complexityLabel: 'Khuyết thiếu (Khuyên/Bắt buộc)',
    contextTags: ['Giải pháp', 'Nghĩa vụ', 'B1-Core'],
    skillTags: ['Speaking', 'Writing'],
    slots: [
      {
        name: 'Subject',
        description: 'Chủ từ',
        phraseBank: {
          marketing: ['The media buyer', 'We', 'Our account manager'],
          family: ['Every family member', 'The children', 'I'],
          ielts: ['Governments', 'The young generation', 'Local councils']
        }
      },
      {
        name: 'Modal Verb',
        description: 'Nên / Phải',
        phraseBank: {
          marketing: ['should', 'must', 'has to'],
          family: ['should', 'must', 'have to'],
          ielts: ['should', 'must', 'have to']
        }
      },
      {
        name: 'Base Verb',
        description: 'Động từ chính',
        phraseBank: {
          marketing: ['optimize', 'analyze', 'communicate'],
          family: ['wash', 'organize', 'save'],
          ielts: ['limit', 'encourage', 'invest in']
        }
      },
      {
        name: 'Object & Rest',
        description: 'Tân ngữ bổ trợ',
        phraseBank: {
          marketing: ['the search ad target keywords', 'all traffic conversion patterns', 'with client stakeholders clearly'],
          family: ['their dirty dishes after lunch', 'their private bedrooms weekly', 'energy consumption at home'],
          ielts: ['aggressive online advertising strategies', 'ecological protection projects', 'public infrastructure services']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'The media buyer should optimize the search ad target keywords.',
        translationVi: 'Nhà phân phối truyền thông nên tối ưu hóa các từ khóa mục tiêu của quảng cáo tìm kiếm.'
      },
      family: {
        text: 'Every family member must wash their dirty dishes after lunch.',
        translationVi: 'Mỗi thành viên trong gia đình phải tự rửa bát đĩa bẩn của mình sau bữa trưa.'
      },
      ielts: {
        text: 'Governments should invest in public infrastructure services.',
        translationVi: 'Chính phủ nên đầu tư vào các dịch vụ hạ tầng công cộng.'
      }
    }
  },
  {
    id: 'f22',
    level: 'B1',
    title: 'Purpose: to / in order to',
    pattern: 'Subject + Verb + Object + to / in order to + Base Verb',
    explanationVi: 'Sử dụng cụm từ mục đích để làm rõ lý do hoặc động cơ đứng sau một hành động cụ thể.',
    whenToUseVi: 'Dùng khi trình bày giải pháp marketing nhằm đạt mục tiêu số liệu, diễn tả công việc nhà làm vì gia đình, hoặc làm rõ giải pháp học thuật.',
    grammarNotesVi: 'Cụm "to", "in order to" hoặc "so as to" đều đi kèm động từ nguyên thể không chia.',
    commonMistakes: 'Dùng "for + verb-ing" thay cho "to/in order to + base verb" khi nói về mục đích hành động của chủ ngữ (ví dụ: "I work hard for improving" -> nên là "to improve").',
    complexityLabel: 'Chỉ mục đích (Purpose)',
    contextTags: ['Mục đích', 'Giải thích', 'Hành động'],
    skillTags: ['Writing', 'Speaking'],
    slots: [
      {
        name: 'Main Clause',
        description: 'Mệnh đề hành động chính',
        phraseBank: {
          marketing: ['We adjusted our ad targets', 'Our designer created five templates', 'The team launched the brand contest'],
          family: ['My husband washes the fresh vegetables', 'We arranged the living room chairs', 'I bought a smart cooking device'],
          ielts: ['Schools provide computers', 'The government raises taxes on fuel', 'Communities clean local rivers'],
          
        }
      },
      {
        name: 'Purpose Marker',
        description: 'Để / Nhằm mục đích',
        phraseBank: {
          marketing: ['in order to', 'to', 'so as to'],
          family: ['to', 'in order to', 'so as to'],
          ielts: ['to', 'in order to', 'so as to']
        }
      },
      {
        name: 'Base Verb for Purpose',
        description: 'Động từ nguyên thể mục đích',
        phraseBank: {
          marketing: ['optimize conversion costs', 'persuade the picky client', 'improve brand visibility'],
          family: ['cook a healthy soup', 'create a spacious play area', 'save cooking time daily'],
          ielts: ['aid digital education methods', 'reduce carbon dioxide emissions', 'protect local biodiversity']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'We adjusted our ad targets in order to optimize conversion costs.',
        translationVi: 'Chúng tôi điều chỉnh mục tiêu quảng cáo để tối ưu hóa chi phí chuyển đổi.'
      },
      family: {
        text: 'We arranged the living room chairs to create a spacious play area.',
        translationVi: 'Chúng tôi sắp xếp lại ghế phòng khách để tạo ra không gian chơi rộng rãi.'
      },
      ielts: {
        text: 'The government raises taxes on fuel in order to reduce carbon dioxide emissions.',
        translationVi: 'Chính phủ tăng thuế nhiên liệu nhằm cắt giảm lượng phát thải khí CO2.'
      }
    }
  },
  {
    id: 'f23',
    level: 'B1',
    title: 'Contrast: although / however',
    pattern: 'Although + Clause 1, Clause 2 / Clause 1. However, Clause 2',
    explanationVi: 'Mô tả tính đối lập, tương phản hoặc nhượng bộ giữa hai thông tin, sự việc diễn ra song song.',
    whenToUseVi: 'Dùng khi đối chiếu một chỉ số thấp cạnh một chỉ số cao, kể về nỗ lực dọn nhà bất chấp bận rộn, hoặc thảo luận các mặt ưu-khuyết điểm trong IELTS.',
    grammarNotesVi: '"Although" đứng đầu mệnh đề nhượng bộ, ngăn cách mệnh đề sau bằng dấu phẩy. "However" đứng ở mệnh đề 2, sau dấu chấm và trước dấu phẩy.',
    commonMistakes: 'Dùng cả although và but trong cùng một câu (ví dụ: "Although we optimized but CPM increased").',
    complexityLabel: 'Tương phản (Contrast)',
    contextTags: ['Tương phản', 'Đối chiếu', 'Nhượng bộ'],
    skillTags: ['Writing'],
    slots: [
      {
        name: 'Clause 1 / Although Clause',
        description: 'Mệnh đề tương phản 1',
        phraseBank: {
          marketing: ['Although our ad spend was relatively small', 'We optimized the campaign extensively. However', 'Although our design team worked very hard'],
          family: ['Although my husband is extremely busy', 'We cleaned the entire house. However', 'Although the smart robot vacuum was quite expensive'],
          ielts: ['Although online degrees are highly accessible', 'Students can access vast research tools. However', 'Although advertisements can irritate modern consumers']
        }
      },
      {
        name: 'Separator / Link',
        description: 'Dấu câu / Liên kết',
        phraseBank: {
          marketing: [',', ','],
          family: [',', ','],
          ielts: [',', ',']
        }
      },
      {
        name: 'Clause 2',
        description: 'Mệnh đề tương phản 2',
        phraseBank: {
          marketing: ['the campaign achieved higher reach', 'the CPC metrics remained extremely high', 'the client rejected the brand proposal'],
          family: ['he still managed the household tasks', 'the dusty attic is still messy', 'it failed to wash the floor satisfactorily'],
          ielts: ['they are rarely valued by traditional employers', 'they still require direct teacher guidance', 'they are essential for promoting free market competition']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'Although our ad spend was relatively small, the campaign achieved higher reach.',
        translationVi: 'Mặc dù ngân sách quảng cáo của chúng tôi tương đối nhỏ, chiến dịch đã đạt được lượng tiếp cận cao hơn.'
      },
      family: {
        text: 'Although my husband is extremely busy, he still managed the household tasks.',
        translationVi: 'Mặc dù chồng tôi vô cùng bận rộn, anh ấy vẫn phụ giúp dọn dẹp nhà cửa.'
      },
      ielts: {
        text: 'Although online degrees are highly accessible, they are rarely valued by traditional employers.',
        translationVi: 'Mặc dù các bằng cấp trực tuyến cực kỳ dễ tiếp cận, chúng hiếm khi được đánh giá cao bởi các nhà tuyển dụng truyền thống.'
      }
    }
  },
  {
    id: 'f24',
    level: 'B1',
    title: 'Reported Update Structure',
    pattern: 'Subject + reported verb (stated/confirmed/reported) + that + Clause',
    explanationVi: 'Dạng câu gián tiếp dùng để thuật lại thông báo, kết luận, hoặc tiến trình công việc từ một nguồn tin.',
    whenToUseVi: 'Dùng khi viết email báo cáo kết quả họp với khách, truyền đạt lời dặn dò của người thân, hoặc trích dẫn các nghiên cứu/báo cáo vĩ mô.',
    grammarNotesVi: 'Sử dụng động từ tường thuật ở quá khứ (stated, confirmed, claimed, reported). Mệnh đề sau "that" lùi thì tương ứng nếu mệnh đề chính nói về quá khứ.',
    commonMistakes: 'Quên lùi thì động từ trong mệnh đề phụ khi truyền đạt thông tin quá khứ (ví dụ: "The manager confirmed that she is happy yesterday" -> đúng phải là "was happy").',
    complexityLabel: 'Tường thuật (Reporting)',
    contextTags: ['Báo cáo', 'Giao tiếp', 'IELTS'],
    skillTags: ['Writing', 'Speaking'],
    slots: [
      {
        name: 'Subject (Source)',
        description: 'Nguồn tin / Chủ từ chính',
        phraseBank: {
          marketing: ['The account director confirmed', 'Our campaign report indicated', 'The media buyer stated'],
          family: ['My spouse explained', 'My daughter promised', 'The neighbors complained'],
          ielts: ['Recent studies proved', 'Educators reported', 'Economic analysts argued']
        }
      },
      {
        name: 'Conjunction',
        description: 'Rằng',
        phraseBank: {
          marketing: ['that'],
          family: ['that'],
          ielts: ['that']
        }
      },
      {
        name: 'Reported Clause',
        description: 'Mệnh đề thông tin (lùi thì)',
        phraseBank: {
          marketing: ['the client approved the layout design', 'the conversion rate grew significantly', 'we spent all search ad budgets'],
          family: ['he would buy organic milk', 'she had cleaned her private bedroom', 'the loud puppy was barking all day'],
          ielts: ['online learning enhanced digital literacy', 'traditional classroom spaces were still essential', 'digital advertising drove global consumption']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'The account director confirmed that the client approved the layout design.',
        translationVi: 'Giám đốc tài khoản đã xác nhận rằng khách hàng đã duyệt thiết kế bố cục.'
      },
      family: {
        text: 'My daughter promised that she had cleaned her private bedroom.',
        translationVi: 'Con gái tôi đã hứa rằng nó đã dọn dẹp sạch phòng ngủ riêng của nó.'
      },
      ielts: {
        text: 'Recent studies proved that online learning enhanced digital literacy.',
        translationVi: 'Các nghiên cứu gần đây đã chứng minh rằng việc học trực tuyến giúp tăng cường khả năng hiểu biết kỹ thuật số.'
      }
    }
  },

  // B2 Formulas (25 to 32)
  {
    id: 'f25',
    level: 'B2',
    title: 'Hedging: tend to / appear to',
    pattern: 'Subject + tend(s) to / appear(s) to + Base Verb (+ Object)',
    explanationVi: 'Kỹ thuật ngôn ngữ giảm tránh (Hedging) giúp ý kiến nói ra bớt mang tính áp đặt phiến diện, tăng tính học thuật và chính xác.',
    whenToUseVi: 'Dùng khi phân tích thói quen khó định lượng của khách hàng, nhận xét về hành vi thường thấy của trẻ em ở nhà, hoặc bảo vệ luận điểm khoa học trong IELTS.',
    grammarNotesVi: '"Tend to" hoặc "appear to" đóng vai trò như động từ bán khuyết thiếu. Người nói tránh dùng các khẳng định tuyệt đối (như is, always, definitely).',
    commonMistakes: 'Dùng khẳng định tuyệt đối khi thông tin chỉ mang tính tương đối (ví dụ trong IELTS: "Online ads always make people buy bad things" -> nên viết "...tend to influence consumers to buy...").',
    complexityLabel: 'Hedging (Giảm tránh)',
    contextTags: ['Khách quan', 'Học thuật', 'Phân tích'],
    skillTags: ['Writing', 'Speaking'],
    slots: [
      {
        name: 'Subject',
        description: 'Đối tượng được nhận định',
        phraseBank: {
          marketing: ['Consumers with high income', 'Aggressive pop-up ads', 'TikTok video audiences'],
          family: ['Young children', 'Smart robotic devices', 'Teenagers'],
          ielts: ['Online shopping platforms', 'People in crowded cities', 'Uncontrolled technology use']
        }
      },
      {
        name: 'Hedging Verb',
        description: 'Động từ giảm tránh',
        phraseBank: {
          marketing: ['tend to ignore', 'appear to prefer', 'tend to share'],
          family: ['tend to mimic', 'appear to save', 'tend to spend'],
          ielts: ['appear to offer', 'tend to experience', 'appears to damage']
        }
      },
      {
        name: 'Target Object / Rest',
        description: 'Đối tượng đích / Thành phần sau',
        phraseBank: {
          marketing: ['standard banner advertisements', 'short, authentic storytelling ad hooks', 'viral branded marketing contests'],
          family: ['their parents\' cleaning habits', 'significant time for busy parents', 'hours in virtual social spaces'],
          ielts: ['lower retail prices than stores', 'higher stress levels daily', 'face-to-face interpersonal skills']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'TikTok audiences appear to prefer short, authentic storytelling hooks.',
        translationVi: 'Khán giả TikTok dường như ưa thích các đoạn mở đầu (hook) kể chuyện ngắn gọn, chân thực.'
      },
      family: {
        text: 'Young children tend to mimic their parents\' cleaning habits.',
        translationVi: 'Trẻ nhỏ có xu hướng bắt chước các thói quen dọn dẹp của cha mẹ chúng.'
      },
      ielts: {
        text: 'People in crowded cities tend to experience higher stress levels daily.',
        translationVi: 'Người dân ở các thành phố đông đúc có xu hướng trải qua mức độ căng thẳng cao hơn hằng ngày.'
      }
    }
  },
  {
    id: 'f26',
    level: 'B2',
    title: 'Cause and Effect',
    pattern: 'Noun Phrase 1 + lead(s) to / result(s) in + Noun Phrase 2',
    explanationVi: 'Mối quan hệ nhân quả trang trọng sử dụng động từ nối thay cho because/so, tạo cảm giác chuyên nghiệp.',
    whenToUseVi: 'Dùng khi trình bày báo cáo tiếp thị cấp quản lý, đúc kết hệ quả của lối sống gia đình, hoặc đưa ra các lập luận học thuật đắt giá.',
    grammarNotesVi: 'Sau "lead to" và "result in" bắt buộc phải là một Danh từ, Cụm danh từ (Noun Phrase) hoặc danh động từ (Verb-ing), không dùng mệnh đề.',
    commonMistakes: 'Dùng mệnh đề sau "lead to" (ví dụ: "Poor strategy leads to we lost budget" -> đúng phải là "leads to a massive loss of budget").',
    complexityLabel: 'Nhân quả nâng cao',
    contextTags: ['Học thuật', 'Báo cáo', 'B2-Core'],
    skillTags: ['Writing'],
    slots: [
      {
        name: 'Cause Noun Phrase',
        description: 'Nguyên nhân (Cụm danh từ)',
        phraseBank: {
          marketing: ['An aggressive budget optimization strategy', 'Consistent creative testing on TikTok', 'Inefficient internal communication'],
          family: ['Sharing household tasks fairly', 'An unorganized bedroom environment', 'Eating home-cooked food regularly'],
          ielts: ['Excessive exposure to digital advertisements', 'Frequent use of private cars', 'The expansion of online academies']
        }
      },
      {
        name: 'Cause Verb',
        description: 'Động từ chỉ kết quả',
        phraseBank: {
          marketing: ['often leads to', 'results in', 'has led to'],
          family: ['generally results in', 'leads to', 'can result in'],
          ielts: ['frequently leads to', 'results in', 'has resulted in']
        }
      },
      {
        name: 'Effect Noun Phrase',
        description: 'Kết quả (Cụm danh từ)',
        phraseBank: {
          marketing: ['a substantial reduction in conversion cost', 'higher campaign performance levels', 'a delayed product launch'],
          family: ['stronger relationship bonds', 'poor sleep patterns for kids', 'improved overall health conditions'],
          ielts: ['unnecessary consumer spending habits', 'severe environmental air pollution', 'better educational equity for rural kids']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'Consistent creative testing on TikTok results in higher campaign performance levels.',
        translationVi: 'Việc thử nghiệm sáng tạo liên tục trên TikTok mang lại các mức hiệu suất chiến dịch cao hơn.'
      },
      family: {
        text: 'Sharing household tasks fairly generally results in stronger relationship bonds.',
        translationVi: 'Chia sẻ công việc nhà một cách công bằng thường giúp các mối quan hệ bền chặt hơn.'
      },
      ielts: {
        text: 'Excessive exposure to digital advertisements frequently leads to unnecessary consumer spending habits.',
        translationVi: 'Việc tiếp xúc quá nhiều với quảng cáo kỹ thuật số thường dẫn đến thói quen tiêu xài không cần thiết của người tiêu dùng.'
      }
    }
  },
  {
    id: 'f27',
    level: 'B2',
    title: 'Concession: despite / whereas',
    pattern: 'Despite + Noun Phrase, Clause / Clause 1, whereas Clause 2',
    explanationVi: 'Sử dụng cấu trúc nhượng bộ/đối lập nâng cao để xử lý các dữ liệu đa chiều, mâu thuẫn.',
    whenToUseVi: 'Dùng khi phân tích KPI đi ngược kỳ vọng, thảo luận những nỗ lực dọn nhà bất chấp mệt mỏi, hoặc viết đoạn văn tương phản so sánh trong IELTS.',
    grammarNotesVi: 'Sau "Despite" hoặc "In spite of" là cụm danh từ hoặc V-ing. "Whereas" kết nối hai mệnh đề song hành tương phản trực diện.',
    commonMistakes: 'Dùng mệnh đề sau despite (ví dụ: "Despite we had small budget, we achieved high reach" -> đúng phải là "Despite our small budget...").',
    complexityLabel: 'Nhượng bộ & Tương phản',
    contextTags: ['Đối chiếu', 'Tương phản', 'B2-Core'],
    skillTags: ['Writing'],
    slots: [
      {
        name: 'Concession / Clause 1',
        description: 'Mệnh đề nhượng bộ hoặc đối lập 1',
        phraseBank: {
          marketing: ['Despite our small creative budget', 'The conversion rate grew by 20%', 'We scaled the search ads campaign'],
          family: ['Despite being exhausted after work', 'My husband cleaned the kitchen', 'The daughter organized her room'],
          ielts: ['Despite strict digital advertising laws', 'Public universities receive huge funds', 'Urban residents prefer driving']
        }
      },
      {
        name: 'Conjunction / Separator',
        description: 'Liên từ',
        phraseBank: {
          marketing: [',', 'whereas', ', whereas'],
          family: [',', 'whereas', ', whereas'],
          ielts: [',', 'whereas', ', whereas']
        }
      },
      {
        name: 'Main Clause / Clause 2',
        description: 'Mệnh đề kết quả hoặc đối lập 2',
        phraseBank: {
          marketing: ['the search campaign achieved higher CTR', 'the overall ad spend remained stable', 'the social ad sets performed poorly'],
          family: ['my sister managed to clean the house', 'my brother ignored his messy desk', 'the son made a massive mess in the yard'],
          ielts: ['pop-up advertisements appear everywhere', 'private online courses struggle to survive', 'rural citizens walk or cycle daily']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'Despite our small creative budget, the search campaign achieved higher CTR.',
        translationVi: 'Mặc dù ngân sách sáng tạo nhỏ, chiến dịch tìm kiếm vẫn đạt tỷ lệ nhấp (CTR) cao hơn.'
      },
      family: {
        text: 'Despite being exhausted after work, my sister managed to clean the house.',
        translationVi: 'Mặc dù kiệt sức sau khi đi làm về, chị tôi vẫn xoay xở dọn dẹp xong nhà cửa.'
      },
      ielts: {
        text: 'Public universities receive huge funds, whereas private online courses struggle to survive.',
        translationVi: 'Các trường đại học công lập nhận được nguồn ngân sách khổng lồ, trong khi các khóa học trực tuyến tư nhân phải chật vật sinh tồn.'
      }
    }
  },
  {
    id: 'f28',
    level: 'B2',
    title: 'Second Conditional',
    pattern: 'If + Subject + Past Simple, Subject + would + Base Verb',
    explanationVi: 'Diễn tả giả định trái ngược hoàn toàn với thực tế ở hiện tại, thể hiện một kịch bản tưởng tượng.',
    whenToUseVi: 'Dùng khi đề xuất hướng đi nếu có tài nguyên vô hạn, mơ ước về cuộc sống gia đình thong thả, hoặc thảo luận giả thuyết trong bài viết IELTS.',
    grammarNotesVi: 'Mệnh đề chứa "If" chia ở thì quá khứ đơn (động từ Be thường dùng là "were" cho tất cả các ngôi). Mệnh đề chính dùng "would + động từ nguyên thể".',
    commonMistakes: 'Dùng hiện tại đơn hoặc would trong mệnh đề If (ví dụ: "If we have more budget, we would hire a creator" -> sai).',
    complexityLabel: 'Câu điều kiện loại 2',
    contextTags: ['Giả tưởng', 'Đề xuất', 'Lập luận'],
    skillTags: ['Writing', 'Speaking'],
    slots: [
      {
        name: 'If Clause',
        description: 'Mệnh đề If (Quá khứ)',
        phraseBank: {
          marketing: ['If we had an unlimited ad budget', 'If the creative team were larger', 'If our target audience responded faster'],
          family: ['If our house were much larger', 'If we had a robotic housekeeper', 'If the kids behaved perfectly all the time'],
          ielts: ['If fossil fuels were completely banned today', 'If online education replaced physical universities', 'If advertising of junk food were prohibited'],
          
        }
      },
      {
        name: 'Comma',
        description: 'Dấu phẩy',
        phraseBank: {
          marketing: [','],
          family: [','],
          ielts: [',']
        }
      },
      {
        name: 'Would Clause',
        description: 'Mệnh đề Would (Nguyên thể)',
        phraseBank: {
          marketing: ['we would hire ten content creators', 'we would deliver multiple ad hooks daily', 'our CTR would improve significantly'],
          family: ['we would build a private library', 'my wife would have more free time', 'I would cook complex meals every day'],
          ielts: ['the environment would recover rapidly', 'social inequality might worsen', 'childhood obesity rates would drop']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'If we had an unlimited ad budget, we would hire ten content creators.',
        translationVi: 'Nếu có ngân sách quảng cáo không giới hạn, chúng tôi sẽ thuê mười nhà sáng tạo nội dung.'
      },
      family: {
        text: 'If our house were much larger, we would build a private library.',
        translationVi: 'Nếu ngôi nhà lớn hơn nhiều, chúng tôi sẽ xây một phòng thư viện riêng.'
      },
      ielts: {
        text: 'If advertising of junk food were prohibited, childhood obesity rates would drop.',
        translationVi: 'Nếu việc quảng cáo đồ ăn nhanh bị cấm hoàn toàn, tỷ lệ béo phì ở trẻ em sẽ giảm xuống.'
      }
    }
  },
  {
    id: 'f29',
    level: 'B2',
    title: 'Recommendation Structures',
    pattern: 'Subject + recommend / suggest + that + Subject + (should) + Base Verb',
    explanationVi: 'Mô tả đề xuất, khuyến nghị trang trọng và chuẩn mực trong giao tiếp công việc hoặc bài nghị luận giải pháp.',
    whenToUseVi: 'Dùng khi trình bày đề xuất tối ưu hóa quảng cáo trước sếp, bàn bạc quy tắc dọn dẹp nhà cửa nghiêm túc, hoặc đề xuất chính sách xã hội trong IELTS.',
    grammarNotesVi: 'Sau "recommend/suggest that", mệnh đề phụ có cấu trúc "Subject + (should) + động từ nguyên thể không chia" (giả định thức).',
    commonMistakes: 'Chia động từ ở mệnh đề phụ sau recommend (ví dụ: "The manager recommends that he writes..." -> đúng phải là "that he write...").',
    complexityLabel: 'Khuyến nghị (Subjunctive)',
    contextTags: ['Khuyến nghị', 'Đề xuất', 'Giải pháp'],
    skillTags: ['Writing', 'Speaking'],
    slots: [
      {
        name: 'Recommending Subject',
        description: 'Chủ ngữ đưa ra đề xuất',
        phraseBank: {
          marketing: ['Our digital strategist suggests that', 'The campaign auditor recommends that', 'The marketing lead suggests that'],
          family: ['I suggest that', 'My husband recommends that', 'The grandmother suggests that'],
          ielts: ['Many educators suggest that', 'Environmentalists recommend that', 'Medical professionals suggest that']
        }
      },
      {
        name: 'Target Subject',
        description: 'Chủ thể nhận đề xuất',
        phraseBank: {
          marketing: ['our media buyer', 'the design team', 'the agency partner'],
          family: ['every child', 'we', 'my brother'],
          ielts: ['the local school board', 'the city council', 'the younger generation']
        }
      },
      {
        name: 'Base Verb (Subjunctive)',
        description: 'Động từ nguyên thể giả định',
        phraseBank: {
          marketing: ['optimize search ad keyword groups', 'recreate the visual ad hooks', 'manage client budget usage closely'],
          family: ['clean their messy toys', 'organize the attic together', 'wash the kitchen window weekly'],
          ielts: ['limit mobile screen hours', 'invest in renewable energy sources', 'adopt healthy eating habits']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'Our digital strategist suggests that our media buyer optimize search ad keyword groups.',
        translationVi: 'Chuyên gia chiến lược số đề xuất rằng nhà phân phối truyền thông nên tối ưu hóa các nhóm từ khóa quảng cáo tìm kiếm.'
      },
      family: {
        text: 'I suggest that every child clean their messy toys.',
        translationVi: 'Tôi đề nghị các con tự dọn dẹp đồ chơi bừa bộn của mình.'
      },
      ielts: {
        text: 'Many educators suggest that the local school board limit mobile screen hours.',
        translationVi: 'Nhiều nhà giáo dục đề xuất ban giám hiệu trường học địa phương giới hạn thời gian sử dụng màn hình điện thoại.'
      }
    }
  },
  {
    id: 'f30',
    level: 'B2',
    title: 'Formal Reporting Structure',
    pattern: 'It is + widely believed / argued / reported + that + Clause',
    explanationVi: 'Sử dụng cấu trúc bị động không ngôi (Impersonal Passive) nhằm đưa ra nhận định khách quan, trung lập.',
    whenToUseVi: 'Dùng khi báo cáo một thực trạng/niềm tin phổ biến trong thị trường, đúc kết quan niệm chung của xã hội về đời sống gia đình, hoặc dẫn dắt vấn đề trong IELTS Writing.',
    grammarNotesVi: 'It is + động từ phân từ 2 chỉ tư duy/phát ngôn (believed, argued, acknowledged, accepted) + that + mệnh đề hoàn chỉnh.',
    commonMistakes: 'Dùng thiếu từ "It" ở đầu câu hoặc dùng sai phân từ 2 (ví dụ: "Is believed that..." -> sai).',
    complexityLabel: 'Bị động không ngôi (Formal)',
    contextTags: ['Dẫn dắt', 'Học thuật', 'B2-Core'],
    skillTags: ['Writing'],
    slots: [
      {
        name: 'Formal Intro',
        description: 'Cụm dẫn dắt trang trọng',
        phraseBank: {
          marketing: ['It is widely believed that', 'It is frequently reported that', 'It is generally accepted that'],
          family: ['It is commonly acknowledged that', 'It is often argued that', 'It is widely believed that'],
          ielts: ['It is highly argued that', 'It is widely believed that', 'It is generally accepted that']
        }
      },
      {
        name: 'Subject of Clause',
        description: 'Chủ ngữ của mệnh đề phụ',
        phraseBank: {
          marketing: ['digital advertising', 'short video content', 'consistent creative testing'],
          family: ['sharing chores fairly', 'a tidy living environment', 'home-cooked food'],
          ielts: ['online universities', 'unregulated advertising campaigns', 'high carbon tax on cars']
        }
      },
      {
        name: 'Verb & Object of Clause',
        description: 'Vị ngữ của mệnh đề phụ',
        phraseBank: {
          marketing: ['dominates modern marketing campaigns', 'drives maximum social CTR metrics', 'results in superior brand trust'],
          family: ['enhances family relationship quality', 'fosters healthy sleep for young kids', 'guarantees better physical development'],
          ielts: ['broaden academic opportunities', 'influence vulnerable children\'s minds', 'reduces urban traffic volume successfully']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'It is widely believed that short video content drives maximum social CTR metrics.',
        translationVi: 'Nhiều người tin rằng nội dung video ngắn sẽ mang lại tỷ lệ nhấp chuột (CTR) tối đa trên mạng xã hội.'
      },
      family: {
        text: 'It is commonly acknowledged that sharing chores fairly enhances family relationship quality.',
        translationVi: 'Mọi người đều thừa nhận rằng việc chia sẻ công bằng việc nhà giúp nâng cao chất lượng mối quan hệ gia đình.'
      },
      ielts: {
        text: 'It is widely believed that online universities broaden academic opportunities.',
        translationVi: 'Người ta tin rằng các trường đại học trực tuyến mở rộng các cơ hội học tập.'
      }
    }
  },
  {
    id: 'f31',
    level: 'B2',
    title: 'Balanced IELTS Opinion Structure',
    pattern: 'While I acknowledge that Clause 1, I strongly believe that Clause 2',
    explanationVi: 'Cấu trúc lập luận cân bằng giúp người viết đạt điểm tối đa ở tiêu chí Task Response trong các bài luận thảo luận hai luồng ý kiến.',
    whenToUseVi: 'Dùng khi muốn dung hòa hai luồng ý kiến mâu thuẫn trong lập luận kinh tế, cân bằng giữa công việc và gia đình, hoặc đưa ra quan điểm cá nhân vững chắc trong IELTS.',
    grammarNotesVi: 'Mệnh đề sau "While I acknowledge..." đóng vai trò nhượng bộ (chấp nhận một phần sự thật), mệnh đề sau "I strongly believe..." là quan điểm nòng cốt của người viết.',
    commonMistakes: 'Thêm "but" giữa hai vế câu (ví dụ: "While I admit that online ads are bad, but I still support them" -> sai cấu trúc phức hợp).',
    complexityLabel: 'Lập luận cân bằng (Balanced)',
    contextTags: ['Lập luận', 'Quan điểm', 'Discussion'],
    skillTags: ['Writing'],
    slots: [
      {
        name: 'Acknowledgment Clause',
        description: 'Mệnh đề thừa nhận (Vế 1)',
        phraseBank: {
          marketing: ['While I acknowledge that search ads demand high budgets', 'While I acknowledge that creative testing takes time', 'While I admit that client feedback can be frustrating'],
          family: ['While I acknowledge that smart vacuums are very costly', 'While I admit that meal preparation requires planning', 'While I acknowledge that working parents are constantly busy'],
          ielts: ['While I acknowledge that digital advertisements irritate consumers', 'While I admit that technology can cause online addiction', 'While I acknowledge that public transport is sometimes delayed']
        }
      },
      {
        name: 'Separator',
        description: 'Dấu ngăn cách',
        phraseBank: {
          marketing: [','],
          family: [','],
          ielts: [',']
        }
      },
      {
        name: 'Strong Belief Clause',
        description: 'Mệnh đề khẳng định niềm tin (Vế 2)',
        phraseBank: {
          marketing: ['I strongly believe that they deliver superior sales conversions', 'I argue that consistent testing minimizes marketing risk', 'I believe that collaborative adjustments improve brand trust'],
          family: ['I believe that they save hours of chore cleanups', 'I strongly argue that home-cooked food is healthier', 'I argue that mutual communication prevents serious domestic stress'],
          ielts: ['I strongly believe that they stimulate healthy economic competition', 'I argue that online libraries improve modern education equity', 'I strongly believe that cars must be heavily restricted in cities']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'While I acknowledge that search ads demand high budgets, I strongly believe that they deliver superior sales conversions.',
        translationVi: 'Mặc dù thừa nhận quảng cáo tìm kiếm đòi hỏi ngân sách lớn, tôi mạnh mẽ tin rằng chúng đem lại hiệu quả chuyển đổi doanh số vượt trội.'
      },
      family: {
        text: 'While I acknowledge that smart vacuums are very costly, I believe that they save hours of chore cleanups.',
        translationVi: 'Mặc dù thừa nhận máy hút bụi thông minh rất đắt đỏ, tôi tin rằng chúng giúp tiết kiệm hàng giờ dọn dẹp nhà cửa.'
      },
      ielts: {
        text: 'While I acknowledge that digital advertisements irritate consumers, I strongly believe that they stimulate healthy economic competition.',
        translationVi: 'Mặc dù thừa nhận quảng cáo kỹ thuật số làm phiền người dùng, tôi mạnh mẽ tin rằng chúng kích thích sự cạnh tranh kinh tế lành mạnh.'
      }
    }
  },
  {
    id: 'f32',
    level: 'B2',
    title: 'Complex Sentence (Reason + Contrast + Result)',
    pattern: 'Since Clause 1, Clause 2; however, Clause 3, resulting in Noun Phrase',
    explanationVi: 'Câu phức hợp ba vế cực kỳ cao cấp, kết hợp đồng thời Nguyên nhân, Tương phản và Hệ quả cuối cùng.',
    whenToUseVi: 'Dùng khi muốn tóm tắt một tiến trình phức tạp nhiều biến động của chiến dịch marketing, giải thích nỗ lực dọn nhà bất chấp rào cản, hoặc chinh phục điểm số cao nhất trong IELTS Writing.',
    grammarNotesVi: 'Phân tích các liên từ: "Since" đứng trước mệnh đề lý do. Dùng dấu chấm phẩy ";" trước liên từ tương phản "however", đi sau bởi dấu phẩy. Vế cuối dùng phân từ hiện tại chỉ kết quả: "resulting in + Cụm danh từ".',
    commonMistakes: 'Sử dụng sai dấu câu chấm phẩy và dấu phẩy, hoặc viết vế cuối thành mệnh đề hoàn chỉnh mà thiếu từ nối (run-on sentence).',
    complexityLabel: 'Phức hợp cực đại (Max Complexity)',
    contextTags: ['Hợp đề', 'Học thuật', 'Báo cáo'],
    skillTags: ['Writing'],
    slots: [
      {
        name: 'Reason Clause (Since)',
        description: 'Mệnh đề lý do (Since)',
        phraseBank: {
          marketing: ['Since the new media buyer arrived', 'Since the creative team designed fresh hooks', 'Since our TikTok metrics decreased'],
          family: ['Since we created a combined chore plan', 'Since I cleaned the dusty attic', 'Since the children stayed at home'],
          ielts: ['Since governments subsidize renewable power', 'Since people buy goods on online platforms', 'Since public spaces offer free computers']
        }
      },
      {
        name: 'Contrast Clause 1',
        description: 'Mệnh đề tương phản 1',
        phraseBank: {
          marketing: ['we analyzed all campaign metrics diligently; however, our ad budget remained small', 'the client approved the layout brief; however, the CPC costs rose', 'we optimized the target keywords; however, conversion rates dropped'],
          family: ['my husband washed the dishes; however, he broke a glass', 'I organized the shelves; however, my sister messed them up', 'the chores were managed collaboratively; however, the puppy created a mess'],
          ielts: ['fossil fuels are still dominant; however, solar invest grows', 'traditional local stores suffer; however, consumers enjoy cheap prices', 'academic literacy grows; however, physical school attendance drops']
        }
      },
      {
        name: 'Result Modifier',
        description: 'Phần bổ trợ chỉ kết quả',
        phraseBank: {
          marketing: [', resulting in a temporary delay', ', resulting in higher conversion rates eventually', ', resulting in a massive budget re-allocation'],
          family: [', resulting in extra work for me', ', resulting in an argument', ', resulting in a noisy domestic environment'],
          ielts: [', resulting in a cleaner environment', ', resulting in high economic efficiency', ', resulting in a critical education crisis']
        }
      }
    ],
    examples: {
      marketing: {
        text: 'Since the new media buyer arrived, we analyzed all campaign metrics diligently; however, our ad budget remained small, resulting in a temporary delay.',
        translationVi: 'Kể từ khi nhà phân phối truyền thông mới đến, chúng tôi đã phân tích kỹ lưỡng tất cả các chỉ số chiến dịch; tuy nhiên, ngân sách quảng cáo của chúng tôi vẫn nhỏ, dẫn đến sự chậm trễ tạm thời.'
      },
      family: {
        text: 'Since we created a combined chore plan, my husband washed the dishes; however, he broke a glass, resulting in extra work for me.',
        translationVi: 'Kể từ khi chúng tôi lập kế hoạch làm việc nhà chung, chồng tôi đã đi rửa bát đĩa; tuy nhiên, anh ấy làm vỡ một cái ly, dẫn đến việc tôi có thêm việc.'
      },
      ielts: {
        text: 'Since governments subsidize renewable power, fossil fuels are still dominant; however, solar invest grows, resulting in a cleaner environment.',
        translationVi: 'Dù các chính phủ trợ cấp năng lượng tái tạo, nhiên liệu hóa thạch vẫn chiếm ưu thế; tuy nhiên, đầu tư vào năng lượng mặt trời vẫn tăng, mang lại một môi trường sạch hơn.'
      }
    }
  }
];

export interface PracticeQuestion {
  id: string;
  context: 'marketing' | 'family' | 'ielts';
  targetFormulaId: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  questionType: 'formula' | 'connector' | 'incorrect' | 'reorder' | 'transform';
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanationVi: string;
  wrongExplanationVi?: string;
}

export interface ErrorItem {
  id: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  context: 'marketing' | 'family' | 'ielts';
  incorrectSentence: string;
  correctedSentence: string;
  explanationVi: string;
  formulaId: string;
  category: string;
  rememberRule: string;
}

export interface ApplyItContext {
  id: string;
  title: string;
  scenarioPrompt: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  requiredFormulaIds: string[];
}

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  { id: 'p1', context: 'marketing', targetFormulaId: 'f1', level: 'A1', questionType: 'formula', prompt: 'Choose the correct formula: The campaign ______.', options: ['is under budget', 'are under budget', 'be under budget'], correctAnswer: 'is under budget', explanationVi: 'Chiến dịch (số ít) cần "is".' },
  { id: 'p2', context: 'marketing', targetFormulaId: 'f2', level: 'A1', questionType: 'connector', prompt: 'The copywriter ______ engaging copy.', options: ['writes', 'write', 'writing'], correctAnswer: 'writes', explanationVi: 'Chủ ngữ số ít cần thêm s/es.' },
  { id: 'p3', context: 'marketing', targetFormulaId: 'f3', level: 'A1', questionType: 'formula', prompt: 'There ______ three active ad sets.', options: ['is', 'are'], correctAnswer: 'are', explanationVi: 'Danh từ số nhiều dùng "are".' },
  { id: 'p4', context: 'marketing', targetFormulaId: 'f5', level: 'A1', questionType: 'transform', prompt: 'We need launch the campaign -> ?', correctAnswer: 'We need to launch the campaign.', explanationVi: 'Cần thêm giới từ "to" sau need.' },
  { id: 'p5', context: 'marketing', targetFormulaId: 'f9', level: 'A2', questionType: 'reorder', prompt: 'planning / Our team / is / the budget / .', correctAnswer: 'Our team is planning the budget.', explanationVi: 'Sắp xếp theo thứ tự S+V-ing+O.' },
  { id: 'p6', context: 'marketing', targetFormulaId: 'f10', level: 'A2', questionType: 'incorrect', prompt: 'Yesterday, we optimize the campaign.', correctAnswer: 'Yesterday, we optimized the campaign.', explanationVi: 'Hành động quá khứ thêm -ed.' },
  { id: 'p7', context: 'marketing', targetFormulaId: 'f11', level: 'A2', questionType: 'formula', prompt: 'We ______ update the dashboard tomorrow.', options: ['will', 'to will', 'wills'], correctAnswer: 'will', explanationVi: 'Sau will dùng động từ nguyên thể.' },
  { id: 'p8', context: 'marketing', targetFormulaId: 'f14', level: 'A2', questionType: 'connector', prompt: 'The new ad is ______ than the old one.', options: ['more effective', 'most effective', 'effectiveness'], correctAnswer: 'more effective', explanationVi: 'So sánh hơn dùng more + adj.' },
  { id: 'p9', context: 'family', targetFormulaId: 'f1', level: 'A1', questionType: 'formula', prompt: 'The dinner ______ ready.', options: ['is', 'are'], correctAnswer: 'is', explanationVi: 'Dinner số ít.' },
  { id: 'p10', context: 'family', targetFormulaId: 'f2', level: 'A1', questionType: 'connector', prompt: 'My wife ______ the kitchen.', options: ['cleans', 'clean', 'cleaning'], correctAnswer: 'cleans', explanationVi: 'Chủ ngữ số ít.' },
  { id: 'p11', context: 'family', targetFormulaId: 'f3', level: 'A1', questionType: 'formula', prompt: 'There ______ some fruit.', options: ['is', 'are'], correctAnswer: 'is', explanationVi: 'Danh từ không đếm được dùng is.' },
  { id: 'p12', context: 'family', targetFormulaId: 'f4', level: 'A1', questionType: 'transform', prompt: 'My son can do the dishes.', correctAnswer: 'My son can do the dishes.', explanationVi: 'Đúng.' },
  { id: 'p13', context: 'family', targetFormulaId: 'f9', level: 'A2', questionType: 'reorder', prompt: 'cleaning / is / my daughter / her bedroom / .', correctAnswer: 'My daughter is cleaning her bedroom.', explanationVi: 'Sắp xếp S+V-ing+O.' },
  { id: 'p14', context: 'family', targetFormulaId: 'f10', level: 'A2', questionType: 'incorrect', prompt: 'We clean the house last Sunday.', correctAnswer: 'We cleaned the house last Sunday.', explanationVi: 'Quá khứ thêm -ed.' },
  { id: 'p15', context: 'family', targetFormulaId: 'f11', level: 'A2', questionType: 'formula', prompt: 'I ______ do the laundry.', options: ['will', 'to will'], correctAnswer: 'will', explanationVi: 'Will + động từ nguyên thể.' },
  { id: 'p16', context: 'family', targetFormulaId: 'f14', level: 'A2', questionType: 'connector', prompt: 'The new vacuum is ______ the old broom.', options: ['quieter than', 'more quieter than'], correctAnswer: 'quieter than', explanationVi: 'Tính từ ngắn thêm -er.' },
  { id: 'p17', context: 'ielts', targetFormulaId: 'f1', level: 'A1', questionType: 'formula', prompt: 'Education ______ essential.', options: ['is', 'are'], correctAnswer: 'is', explanationVi: 'Education không đếm được.' },
  { id: 'p18', context: 'ielts', targetFormulaId: 'f2', level: 'A1', questionType: 'connector', prompt: 'Many citizens ______ libraries.', options: ['prefer', 'prefers'], correctAnswer: 'prefer', explanationVi: 'Citizens số nhiều.' },
  { id: 'p19', context: 'ielts', targetFormulaId: 'f3', level: 'A1', questionType: 'formula', prompt: 'There ______ many benefits.', options: ['is', 'are'], correctAnswer: 'are', explanationVi: 'Danh từ số nhiều.' },
  { id: 'p20', context: 'ielts', targetFormulaId: 'f4', level: 'A1', questionType: 'transform', prompt: 'Students can learn skills.', correctAnswer: 'Students can learn skills.', explanationVi: 'Đúng.' },
  { id: 'p21', context: 'ielts', targetFormulaId: 'f9', level: 'A2', questionType: 'reorder', prompt: 'are / to / Consumers / digital / turning / platforms / .', correctAnswer: 'Consumers are turning to digital platforms.', explanationVi: 'Sắp xếp S+V-ing+O.' },
  { id: 'p22', context: 'ielts', targetFormulaId: 'f10', level: 'A2', questionType: 'incorrect', prompt: 'The government introduce taxes.', correctAnswer: 'The government introduced taxes.', explanationVi: 'Quá khứ.' },
  { id: 'p23', context: 'ielts', targetFormulaId: 'f11', level: 'A2', questionType: 'formula', prompt: 'Automation ______ opportunities.', options: ['will create', 'to will create'], correctAnswer: 'will create', explanationVi: 'Will + v.' },
  { id: 'p24', context: 'ielts', targetFormulaId: 'f14', level: 'A2', questionType: 'connector', prompt: 'Online learning is ______ traditional.', options: ['more flexible than', 'more flexible'], correctAnswer: 'more flexible than', explanationVi: 'Cần có than.' }
];

export const ERROR_CLINIC_ITEMS: ErrorItem[] = [
  { id: 'e1', level: 'A1', context: 'marketing', incorrectSentence: 'The product effective.', correctedSentence: 'The product is effective.', explanationVi: 'Thiếu động từ To Be.', formulaId: 'f1', category: 'missing be', rememberRule: 'Always use To Be for adjectives.' },
  { id: 'e2', level: 'A1', context: 'family', incorrectSentence: 'They cleans the house.', correctedSentence: 'They clean the house.', explanationVi: 'They là số nhiều, không thêm s.', formulaId: 'f2', category: 'S-V mismatch', rememberRule: 'Only He/She/It adds -s/-es.' },
  { id: 'e3', level: 'A1', context: 'ielts', incorrectSentence: 'Does he writes the draft?', correctedSentence: 'Does he write the draft?', explanationVi: 'Đã dùng Does thì động từ chính nguyên thể.', formulaId: 'f6', category: 'wrong Do/Does', rememberRule: 'Does + Verb base form.' },
  { id: 'e4', level: 'A1', context: 'marketing', incorrectSentence: 'To check the links.', correctedSentence: 'Check the links.', explanationVi: 'Câu mệnh lệnh bắt đầu bằng V-base, không có to.', formulaId: 'f8', category: 'incorrect imperative', rememberRule: 'Start command with V-base.' },
  { id: 'e5', level: 'A2', context: 'marketing', incorrectSentence: 'The agency planning the strategy.', correctedSentence: 'The agency is planning the strategy.', explanationVi: 'Thiếu is.', formulaId: 'f9', category: 'incorrect present continuous', rememberRule: 'Sub + be + V-ing.' },
  { id: 'e6', level: 'A2', context: 'family', incorrectSentence: 'Yesterday, we clean the house.', correctedSentence: 'Yesterday, we cleaned the house.', explanationVi: 'Quá khứ phải thêm -ed.', formulaId: 'f10', category: 'wrong past tense', rememberRule: 'Use -ed for past actions.' },
  { id: 'e7', level: 'A2', context: 'ielts', incorrectSentence: 'Technology will to change the world.', correctedSentence: 'Technology will change the world.', explanationVi: 'Không có to sau will.', formulaId: 'f11', category: 'wrong future form', rememberRule: 'Will + V-base.' },
  { id: 'e8', level: 'A2', context: 'marketing', incorrectSentence: 'The ad was effective because high engagement, so we got more leads.', correctedSentence: 'The ad was effective because of high engagement, so we got more leads.', explanationVi: 'Because of + cụm danh từ.', formulaId: 'f15', category: 'because/so misuse', rememberRule: 'Because + Clause; Because of + Noun Phrase.' },
  { id: 'e9', level: 'B1', context: 'marketing', incorrectSentence: 'If we will optimize, we will increase sales.', correctedSentence: 'If we optimize, we will increase sales.', explanationVi: 'Câu điều kiện loại 1: vế if chia hiện tại.', formulaId: 'f26', category: 'will misuse', rememberRule: 'No "will" in if-clause.' },
  { id: 'e10', level: 'B1', context: 'family', incorrectSentence: 'The dishes was washed by him.', correctedSentence: 'The dishes were washed by him.', explanationVi: 'Dishes số nhiều.', formulaId: 'f27', category: 'passive voice word order', rememberRule: 'Check passive subject number.' },
  { id: 'e11', level: 'B1', context: 'ielts', incorrectSentence: 'The book, which I read it, was good.', correctedSentence: 'The book, which I read, was good.', explanationVi: 'Thừa tân ngữ "it".', formulaId: 'f28', category: 'relative clause misuse', rememberRule: 'Relative clause needs no extra object.' },
  { id: 'e12', level: 'B1', context: 'marketing', incorrectSentence: 'However the budget is small, we launch it.', correctedSentence: 'Although the budget is small, we launch it.', explanationVi: 'Although dùng cho mệnh đề chỉ nhượng bộ.', formulaId: 'f29', category: 'although/however misuse', rememberRule: 'Although + Clause, However = ; however, .' },
  { id: 'e13', level: 'B2', context: 'marketing', incorrectSentence: 'This definitely will increase sales.', correctedSentence: 'This might increase sales.', explanationVi: 'Hedging nhẹ nhàng hơn.', formulaId: 'f25', category: 'hedging form misuse', rememberRule: 'Use modals for softening.' },
  { id: 'e14', level: 'B2', context: 'family', incorrectSentence: 'Despite it was raining, we went out.', correctedSentence: 'Although it was raining, we went out.', explanationVi: 'Despite + cụm danh từ.', formulaId: 'f30', category: 'despite/in spite of misuse', rememberRule: 'Despite + Noun Phrase / Although + Clause.' },
  { id: 'e15', level: 'B2', context: 'ielts', incorrectSentence: 'If I had more time, I will study.', correctedSentence: 'If I had more time, I would study.', explanationVi: 'Câu điều kiện loại 2.', formulaId: 'f31', category: 'second conditional misuse', rememberRule: 'If + V-ed, ... would + V-base.' },
  { id: 'e16', level: 'B2', context: 'marketing', incorrectSentence: 'Budget is small, we have no results.', correctedSentence: 'Because the budget is small, we have no results.', explanationVi: 'Thiếu từ nối.', formulaId: 'f32', category: 'weak cause-result', rememberRule: 'Use connectors for structure.' }
];

export const APPLY_IT_CONTEXTS: ApplyItContext[] = [
  { id: 'a1', title: 'Marketing update', scenarioPrompt: 'Write a 3-sentence update on campaign performance.', level: 'B1', requiredFormulaIds: ['f17', 'f26'] },
  { id: 'a2', title: 'Family coordination', scenarioPrompt: 'Write a 3-sentence plan for family chores.', level: 'A2', requiredFormulaIds: ['f16', 'f12'] },
  { id: 'a3', title: 'IELTS opinion', scenarioPrompt: 'Write a 3-sentence opinion on technology.', level: 'B2', requiredFormulaIds: ['f25', 'f31'] }
];

