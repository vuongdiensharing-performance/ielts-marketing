import { Level, Module, Lesson, VocabularyItem, FormulaItem, LessonStepContent, Skill } from '../types';

export const LEVELS: { code: Level; name: string; description: string; unlocked: boolean }[] = [
  {
    code: 'A1',
    name: 'The Survival Marketer',
    description: 'Master essential, direct English phrases to survive in an international agency or brand team.',
    unlocked: true,
  },
  {
    code: 'A2',
    name: 'The Campaign Creator',
    description: 'Learn to write brief-compliant social media copy, build campaign calendars, and report basic metrics.',
    unlocked: false,
  },
  {
    code: 'B1',
    name: 'The Client Partner',
    description: 'Master active listening during client debriefs, structure persuasive emails, and justify tactical ad adjustments.',
    unlocked: false,
  },
  {
    code: 'B2',
    name: 'The Strategic Leader',
    description: 'Present pitch decks, direct creative strategy, negotiate budgets, and handle crisis communication in English.',
    unlocked: false,
  },
];

export const MODULES: Module[] = [
  {
    id: 'a1-m01',
    level: 'A1',
    code: 'A1-M01',
    title: 'Work Identity',
    description: 'Introduce your job role, describe your key responsibilities, and explain who you collaborate with.',
    status: 'locked',
    duration: 60,
    vocabCount: 15,
    skills: ['Speaking', 'Vocabulary'],
    outcome: 'Confidently describe your exact job title, tools, and responsibilities in a quick team intro.',
    outcomeVi: 'Tự tin giới thiệu chức danh công việc, các công cụ sử dụng và trách nhiệm cốt lõi trong buổi giới thiệu nhóm nhanh.',
  },
  {
    id: 'a1-m02',
    level: 'A1',
    code: 'A1-M02',
    title: 'Daily Tasks & Routine',
    description: 'List your repetitive marketing chores, detail daily priorities, and explain schedule constraints.',
    status: 'locked',
    duration: 80,
    vocabCount: 25,
    skills: ['Reading', 'Writing'],
    outcome: 'Outline your daily and weekly to-do lists using clean, direct verbs instead of generic descriptions.',
    outcomeVi: 'Lên đề cương danh sách việc cần làm hàng ngày và hàng tuần bằng các động từ rõ ràng, chuyên nghiệp thay vì diễn đạt chung chung.',
  },
  {
    id: 'a1-m03',
    level: 'A1',
    code: 'A1-M03',
    title: 'Real-Time Work Updates',
    description: 'Update your team about current tasks, completed work, blockers, and next steps.',
    status: 'unlocked',
    duration: 100,
    vocabCount: 40,
    skills: ['Listening', 'Speaking', 'Reading', 'Writing'],
    outcome: 'Structure active, completed, and blocked tasks clearly in both written Slack notes and verbal stand-up reports.',
    outcomeVi: 'Cấu trúc rõ ràng các nhiệm vụ đang làm, đã xong và bị nghẽn trong cả tin nhắn Slack viết và báo cáo họp nhanh (stand-up) nói.',
  },
];

export const LESSONS: Lesson[] = [
  {
    id: 'a1-m03-l01',
    moduleId: 'a1-m03',
    title: 'What Are You Working On Now?',
    mainSkill: 'Speaking',
    secondarySkill: 'Vocabulary',
    duration: 20,
    unlocked: true,
    completed: false,
    description: 'Talk about active, current tasks in the marketing workspace using Present Continuous and marketing verbs.',
  },
  {
    id: 'a1-m03-l02',
    moduleId: 'a1-m03',
    title: 'Completed, Ongoing, and Pending Tasks',
    mainSkill: 'Reading',
    secondarySkill: 'Writing',
    duration: 25,
    unlocked: true,
    completed: false,
    description: 'Interpret digital marketing project boards and organize task categories in weekly status reports.',
  },
  {
    id: 'a1-m03-l03',
    moduleId: 'a1-m03',
    title: 'Ask for Clarification and Support',
    mainSkill: 'Listening',
    secondarySkill: 'Speaking',
    duration: 25,
    unlocked: true,
    completed: false,
    description: 'Listen to brief, vague team requests and ask precise, polite clarification questions to define marketing scopes.',
  },
  {
    id: 'a1-m03-l04',
    moduleId: 'a1-m03',
    title: 'Daily Stand-up Update',
    mainSkill: 'Writing',
    secondarySkill: 'Speaking',
    duration: 30,
    unlocked: true,
    completed: false,
    description: 'Draft and rehearse a standard three-part (PPP) update for daily syncs, detailing progress, plans, and blockers.',
  },
];

export const SEED_VOCABULARY: VocabularyItem[] = [
  {
    id: 'v1',
    word: 'Creative asset',
    partOfSpeech: 'noun',
    definition: 'Any piece of digital content (images, videos, copy, designs) used in a marketing campaign.',
    vietnameseTranslation: 'Ấn phẩm sáng tạo / Tài nguyên thiết kế',
    exampleSentence: "We are uploading the final creative assets to the shared Google Drive folder for the client's approval.",
    exampleTranslation: 'Chúng tôi đang tải các ấn phẩm sáng tạo cuối cùng lên thư mục Google Drive chung để khách hàng phê duyệt.',
    marketingContext: 'Thường dùng trong các buổi họp về ý tưởng thiết kế, trao đổi giữa thiết kế (designer) và quản lý tài khoản (account).',
    category: 'Campaign Assets',
  },
  {
    id: 'v2',
    word: 'Ad copy',
    partOfSpeech: 'noun',
    definition: 'The text portion of an advertisement, designed to persuade and drive the audience to take action.',
    vietnameseTranslation: 'Văn bản quảng cáo / Lời quảng cáo',
    exampleSentence: 'Can you write three variations of the ad copy to test which hook drives more click-throughs?',
    exampleTranslation: 'Bạn có thể viết ba biến thể của văn bản quảng cáo để kiểm tra xem câu tiêu đề nào thu hút nhiều lượt nhấp hơn không?',
    marketingContext: 'Sử dụng hàng ngày bởi Copywriters và Content Creators khi viết bài quảng cáo Facebook, Google, TikTok.',
    category: 'Content Writing',
  },
  {
    id: 'v3',
    word: 'Blocker',
    partOfSpeech: 'noun',
    definition: 'A problem or delay that prevents a project or team member from moving forward with their work.',
    vietnameseTranslation: 'Trở ngại / Điểm nghẽn',
    exampleSentence: 'My main blocker is that I do not have access to the client’s Facebook Business Manager account.',
    exampleTranslation: 'Trở ngại lớn nhất của tôi là tôi chưa có quyền truy cập vào tài khoản Trình quản lý Doanh nghiệp Facebook của khách hàng.',
    marketingContext: 'Từ khóa bắt buộc trong các buổi họp Daily Stand-up (họp nhanh hàng ngày) của các đội ngũ làm việc Agile.',
    category: 'Workplace Sync',
  },
  {
    id: 'v4',
    word: 'Deliverable',
    partOfSpeech: 'noun',
    definition: 'A tangible or intangible object produced as a result of a project, intended to be delivered to a client.',
    vietnameseTranslation: 'Sản phẩm bàn giao',
    exampleSentence: 'The deliverables for this week include one blog article, two reels, and a monthly performance report.',
    exampleTranslation: 'Các sản phẩm bàn giao trong tuần này bao gồm một bài viết blog, hai video reels và một báo cáo hiệu quả hàng tháng.',
    marketingContext: 'Sử dụng khi chốt kế hoạch với khách hàng hoặc bàn giao công việc giữa các phòng ban trong agency.',
    category: 'Project Management',
  },
  {
    id: 'v5',
    word: 'A/B testing',
    partOfSpeech: 'noun',
    definition: 'A method of comparing two versions of a webpage or app against each other to determine which one performs better.',
    vietnameseTranslation: 'Thử nghiệm A/B',
    exampleSentence: 'We are currently running an A/B testing on the landing page CTA buttons to see if red converts better than green.',
    exampleTranslation: 'Chúng tôi hiện đang chạy thử nghiệm A/B trên các nút kêu gọi hành động của trang đích để xem màu đỏ có chuyển đổi tốt hơn màu xanh không.',
    marketingContext: 'Thuật ngữ phổ biến trong tối ưu hóa chuyển đổi, chạy quảng cáo Facebook/Google Ads.',
    category: 'Performance Marketing',
  },
  {
    id: 'v6',
    word: 'Creative brief',
    partOfSpeech: 'noun',
    definition: 'A document outlining the strategy, target audience, goals, and visual expectations for a creative project.',
    vietnameseTranslation: 'Bản yêu cầu sáng tạo / Brief thiết kế',
    exampleSentence: 'Please read the creative brief carefully before drafting the storyboard for the TVC video.',
    exampleTranslation: 'Vui lòng đọc kỹ bản yêu cầu sáng tạo trước khi phác thảo kịch bản hình ảnh cho video quảng cáo TVC.',
    marketingContext: 'Tài liệu nền tảng làm việc giữa phòng Client Service (Account) và phòng Creative.',
    category: 'Campaign Planning',
  },
  {
    id: 'v7',
    word: 'Engagement rate',
    partOfSpeech: 'noun',
    definition: 'A metric that measures the level of interaction (likes, comments, shares, saves) that content receives relative to its reach.',
    vietnameseTranslation: 'Tỷ lệ tương tác',
    exampleSentence: 'The Instagram post had a 5% engagement rate, which is well above our industry benchmark.',
    exampleTranslation: 'Bài viết trên Instagram có tỷ lệ tương tác là 5%, cao hơn nhiều so với tiêu chuẩn chung của ngành.',
    marketingContext: 'Số liệu đo lường phổ biến khi báo cáo hiệu quả mạng xã hội (Social Media Reporting).',
    category: 'Analytics',
  },
  {
    id: 'v8',
    word: 'CTR (Click-Through Rate)',
    partOfSpeech: 'noun',
    definition: 'The percentage of people who click on an advertisement link after viewing it.',
    vietnameseTranslation: 'Tỷ lệ nhấp chuột (CTR)',
    exampleSentence: 'By changing the main visual header, we managed to increase our ad CTR from 1.2% to 2.8%.',
    exampleTranslation: 'Bằng việc thay đổi ảnh biểu ngữ chính, chúng tôi đã thành công trong việc tăng CTR của quảng cáo từ 1.2% lên 2.8%.',
    marketingContext: 'Số liệu sống còn trong Performance Marketing, Google Ads, Facebook Ads và Email Marketing.',
    category: 'Analytics',
  },
  {
    id: 'v9',
    word: 'Optimization',
    partOfSpeech: 'noun',
    definition: 'The process of making a marketing campaign or website as effective and functional as possible.',
    vietnameseTranslation: 'Sự tối ưu hóa',
    exampleSentence: 'We need to perform daily bid optimization on our Google Search campaigns to lower the Cost-Per-Click.',
    exampleTranslation: 'Chúng ta cần thực hiện tối ưu hóa giá thầu hàng ngày trên các chiến dịch tìm kiếm Google để hạ giá mỗi nhấp chuột.',
    marketingContext: 'Hành động điều chỉnh ngân sách, đối tượng, thiết kế để đạt hiệu quả chuyển đổi cao hơn.',
    category: 'Performance Marketing',
  },
  {
    id: 'v10',
    word: 'Landing page pixel',
    partOfSpeech: 'noun',
    definition: 'A piece of code placed on a website to track visitor behavior, conversions, and target audiences for retargeting.',
    vietnameseTranslation: 'Mã theo dõi trang đích (Pixel)',
    exampleSentence: 'I need to check why the landing page pixel is not firing when users submit the signup form.',
    exampleTranslation: 'Tôi cần kiểm tra tại sao mã pixel của trang đích không kích hoạt khi người dùng gửi biểu mẫu đăng ký.',
    marketingContext: 'Từ chuyên ngành kỹ thuật chạy quảng cáo bám đuổi (retargeting) và đo lường chuyển đổi.',
    category: 'Performance Marketing',
  },
];

export const SEED_FORMULAS: FormulaItem[] = [
  {
    id: 'f1',
    structure: "I'm currently working on [Task/Asset] for [Campaign].",
    purpose: 'Report current active task with clear project scope',
    purposeVi: 'Báo cáo công việc hiện tại đang thực hiện kèm theo phạm vi chiến dịch rõ ràng',
    example: "I'm currently working on the TikTok video scripts for the Summer Splash campaign.",
    exampleVi: 'Tôi hiện đang làm các kịch bản video TikTok cho chiến dịch Summer Splash.',
    usageTip: "Sử dụng 'currently' và thì Hiện tại Tiếp diễn giúp sếp hoặc khách hàng biết bạn đang tích cực xử lý việc đó ngay lúc này.",
    category: 'Active Updates',
  },
  {
    id: 'f2',
    structure: "I'm in the middle of [Verb-ing] the [Asset/Task].",
    purpose: 'Explain that you are fully focused on a specific task right now',
    purposeVi: 'Giải thích bạn đang bận tập trung làm dở dang một nhiệm vụ cụ thể ngay lúc này',
    example: "I'm in the middle of exporting the design files for the billboard.",
    exampleVi: 'Tôi đang dở tay xuất các tệp thiết kế cho bảng biển quảng cáo ngoài trời.',
    usageTip: 'Cấu trúc này thích hợp nhất khi ai đó bất ngờ hỏi tiến độ, cho thấy bạn đang trực tiếp bắt tay thực hiện hành động đó.',
    category: 'Active Updates',
  },
  {
    id: 'f3',
    structure: "I've completed [Task/Asset], and I'm now focusing on [Next Task].",
    purpose: 'Show productivity and structured workflow transition',
    purposeVi: 'Thể hiện hiệu suất và sự chuyển giao công việc có tổ chức',
    example: "I've completed the keyword research, and I'm now focusing on drafting the search ad headlines.",
    exampleVi: 'Tôi đã hoàn thành nghiên cứu từ khóa, và hiện đang tập trung soạn thảo các dòng tiêu đề quảng cáo tìm kiếm.',
    usageTip: "Sử dụng thì Hiện tại hoàn thành (I've completed) thể hiện rõ giá trị công việc đã xong trước khi nói đến việc tiếp theo.",
    category: 'Status Transition',
  },
  {
    id: 'f4',
    structure: "[Task/Project] is currently pending/on hold due to [Blocker].",
    purpose: 'Report delays professionally without sounding defensive',
    purposeVi: 'Báo cáo sự chậm trễ một cách chuyên nghiệp, tránh đổ lỗi cá nhân',
    example: 'The landing page layout is currently on hold due to a delay in receiving product photos from the client.',
    exampleVi: 'Bố cục trang đích hiện đang bị tạm dừng do sự chậm trễ nhận ảnh sản phẩm từ phía khách hàng.',
    usageTip: "Cụm 'pending due to' hoặc 'on hold due to' giúp nhấn mạnh lý do khách quan gây nghẽn thay vì đổ lỗi cho nội bộ team.",
    category: 'Reporting Blockers',
  },
  {
    id: 'f5',
    structure: 'Could you please clarify what you mean by [unclear expression]?',
    purpose: 'Politely ask a client or team member to explain vague jargon',
    purposeVi: 'Hỏi lại lịch sự để làm rõ các yêu cầu chung chung, mơ hồ từ khách hàng hoặc đồng nghiệp',
    example: "Could you please clarify what you mean by 'make the visual look more premium'?",
    exampleVi: "Anh/Chị có thể vui lòng làm rõ ý 'làm cho hình ảnh trông cao cấp hơn' là như thế nào không ạ?",
    usageTip: "Giúp tránh việc tự đoán mò yêu cầu thiết kế của khách hàng, 'Could you please clarify' cực kỳ an toàn và lịch sự.",
    category: 'Clarification',
  },
  {
    id: 'f6',
    structure: 'To confirm, are we targeting [audience A] or [audience B] for this phase?',
    purpose: 'Confirm scope options to avoid design and budget waste',
    purposeVi: 'Xác nhận lại lựa chọn phạm vi để tránh lãng phí thiết kế và ngân sách',
    example: 'To confirm, are we targeting Gen Z students or young professionals for this phase?',
    exampleVi: 'Để xác nhận lại, chúng ta đang nhắm mục tiêu học sinh Gen Z hay người trẻ đã đi làm cho giai đoạn này?',
    usageTip: 'Phù hợp khi thảo luận về chân dung khách hàng mục tiêu để tối ưu hóa việc phân phối quảng cáo và viết bài viết.',
    category: 'Clarification',
  },
  {
    id: 'f7',
    structure: 'My main blocker is [Blocker], which is delaying the [Asset/Task].',
    purpose: 'Raise an alarm in team syncs so others can jump in and help',
    purposeVi: 'Nêu vấn đề trong các buổi họp sync của nhóm để người khác có thể hỗ trợ tháo gỡ',
    example: 'My main blocker is the api access key, which is delaying the CRM platform integration.',
    exampleVi: 'Trở ngại lớn nhất của tôi là khóa truy cập API, điều này đang làm chậm tiến độ tích hợp nền tảng CRM.',
    usageTip: 'Công thức vàng giúp sếp hoặc Scrum Master biết chính xác điểm nghẽn để can thiệp hỗ trợ bạn ngay lập tức.',
    category: 'Reporting Blockers',
  },
];

export const LESSON_STEP_CONTENTS: Record<string, LessonStepContent> = {
  'a1-m03-l01': {
    context: {
      scenario: 'Your Marketing Manager pings you on Slack to ask for an immediate status update on the creative assets for the new TikTok summer campaign.',
      scenarioVi: 'Quản lý Marketing nhắn tin trên Slack hỏi bạn về tiến độ thiết kế các ấn phẩm sáng tạo cho chiến dịch hè trên TikTok sắp tới.',
      role: 'Social Media Executive (Chuyên viên Mạng xã hội)',
      roleVi: 'Chịu trách nhiệm viết kịch bản, làm việc với designer và lên lịch bài đăng quảng cáo.',
      goal: 'Respond immediately using Present Continuous to describe what you are actively designing and writing copy for, avoiding generic words.',
      goalVi: 'Phản hồi ngay lập tức sử dụng thì Hiện tại Tiếp diễn để mô tả cụ thể bạn đang thiết kế và viết lời quảng cáo cho ấn phẩm nào.',
      marketingFocus: 'Present Continuous (Hiện tại tiếp diễn) & Marketing Action Verbs (drafting copy, designing visuals, editing hooks).',
    },
    vocabulary: {
      words: [
        SEED_VOCABULARY[0], // Creative asset
        SEED_VOCABULARY[1], // Ad copy
        SEED_VOCABULARY[4], // A/B testing
      ],
      instruction: 'Learn these 3 crucial campaign terms that agency leaders use daily when talking about immediate tasks.',
      instructionVi: 'Học 3 thuật ngữ chiến dịch cốt lõi mà các sếp agency dùng hàng ngày khi thảo luận về công việc đang chạy.',
    },
    formulas: {
      items: [
        SEED_FORMULAS[0], // I'm currently working on...
        SEED_FORMULAS[1], // I'm in the middle of...
      ],
      instruction: 'Use these structural templates to express active progress smoothly and sound organized.',
      instructionVi: 'Sử dụng các cấu trúc mẫu này để diễn tả tiến độ đang làm một cách trôi chảy và chuyên nghiệp.',
    },
    practice: {
      instruction: 'Test your understanding of marketing active updates and Present Continuous structures.',
      instructionVi: 'Kiểm tra mức độ hiểu của bạn về cách cập nhật công việc hiện tại và cấu trúc Hiện tại tiếp diễn.',
      questions: [
        {
          id: 'q1',
          prompt: 'Which sentence is the most professional way to tell your manager you are designing a Facebook banner right now?',
          promptVi: 'Câu nào dưới đây là cách chuyên nghiệp nhất để báo với sếp là bạn đang thiết kế banner Facebook ngay lúc này?',
          options: [
            'I am design Facebook banner now.',
            "I'm currently designing the Facebook banner for our summer campaign.",
            'I designed the Facebook banner yesterday.',
            'I will design banner soon.'
          ],
          correctAnswer: "I'm currently designing the Facebook banner for our summer campaign.",
          explanation: 'Using Present Continuous with "currently" provides a polite, professional, and context-rich update on active work.',
          explanationVi: 'Sử dụng thì Hiện tại Tiếp diễn kết hợp trạng từ "currently" giúp cung cấp thông tin cập nhật công việc đang làm một cách lịch sự, chuyên nghiệp và có ngữ cảnh chiến dịch rõ ràng.'
        },
        {
          id: 'q2',
          prompt: "Fill in the blank: \"I'm in the middle of ______ the copy for the TikTok ad.\"",
          promptVi: 'Điền vào chỗ trống: "I\'m in the middle of ______ the copy for the TikTok ad."',
          options: [
            'write',
            'wrote',
            'writing',
            'written'
          ],
          correctAnswer: 'writing',
          explanation: 'The structure "in the middle of + V-ing" is used to express that you are currently busy doing a specific action.',
          explanationVi: 'Cấu trúc "in the middle of + V-ing" được dùng để diễn tả bạn đang bận rộn thực hiện một hành động cụ thể ở hiện tại.'
        }
      ]
    },
    output: {
      instruction: 'Now, write your real workplace reply! Apply the vocabulary and formulas you just learned.',
      instructionVi: 'Bây giờ, hãy viết câu trả lời thực tế tại công sở! Áp dụng các từ vựng và cấu trúc bạn vừa học.',
      prompt: "Your manager sends this Slack message: 'Hey! Quick check, are you working on the copy variations for the Facebook summer campaign now?' Write a professional reply confirming that you are currently writing the ad copy and checking them against the creative brief.",
      promptVi: "Quản lý gửi tin nhắn Slack: 'Hey! Quick check, are you working on the copy variations for the Facebook summer campaign now?' Hãy viết câu trả lời xác nhận bạn đang soạn văn bản quảng cáo và đối chiếu kỹ với brief thiết kế.",
      placeholder: "e.g., Hi, yes! I'm currently writing the ad copy variations and...",
      sampleAnswer: "Hi! Yes, I'm currently drafting the Facebook ad copy variations and checking them against the creative brief to make sure they align with our goals.",
      pointsToInclude: [
        "Use 'I'm currently working on...' or 'I'm in the middle of...'",
        "Incorporate the vocabulary term 'ad copy' or 'creative brief'",
        "Keep the tone polite, using a brief intro like 'Hi!' or 'Yes, sure!'"
      ]
    }
  },
  'a1-m03-l02': {
    context: {
      scenario: 'You are updating an Asana project board for a multi-channel campaign launch and writing the weekly progress summary for the team email list.',
      scenarioVi: 'Bạn đang cập nhật bảng dự án Asana cho chiến dịch quảng cáo đa kênh và viết báo cáo tiến độ hàng tuần gửi qua email nhóm.',
      role: 'Campaign Coordinator (Điều phối viên Chiến dịch)',
      roleVi: 'Theo dõi tiến độ các đầu việc, sắp xếp ngân sách và hỗ trợ báo cáo cho khách hàng.',
      goal: 'Write a status update email snippet that accurately classifies completed tasks (using Past Simple), active tasks (using Present Continuous), and pending tasks (using "pending" structures).',
      goalVi: 'Viết một email báo cáo tiến độ phân loại chính xác việc đã xong (thì Quá khứ đơn), việc đang làm (Hiện tại tiếp diễn) và việc đang chờ duyệt (cấu trúc pending).',
      marketingFocus: 'Tense consistency for status categorization (Past vs. Present vs. Future/On Hold).'
    },
    vocabulary: {
      words: [
        SEED_VOCABULARY[3], // Deliverable
        SEED_VOCABULARY[2], // Blocker
        SEED_VOCABULARY[8], // Optimization
      ],
      instruction: 'These words are standard vocabulary for status reporting in project management dashboards.',
      instructionVi: 'Những từ này là từ vựng tiêu chuẩn để báo cáo trạng thái trong các bảng quản lý dự án.'
    },
    formulas: {
      items: [
        SEED_FORMULAS[2], // I've completed... and now focusing on...
        SEED_FORMULAS[3], // Project is currently pending/on hold due to...
      ],
      instruction: 'Use these templates to show clear boundaries between what is done, what is ongoing, and what is stuck.',
      instructionVi: 'Sử dụng các mẫu này để phân định rõ ràng giữa việc đã hoàn thành, việc đang làm và việc đang bị tắc nghẽn.'
    },
    practice: {
      instruction: 'Identify correct task states and tense usage for project board updates.',
      instructionVi: 'Nhận biết các trạng thái nhiệm vụ chính xác và cách dùng thì để cập nhật bảng tiến độ dự án.',
      questions: [
        {
          id: 'q1',
          prompt: 'If a task is delayed because you are waiting for the design team to send images, how should you report it?',
          promptVi: 'Nếu một nhiệm vụ bị chậm vì bạn đang chờ đội thiết kế gửi ảnh, bạn nên báo cáo thế nào?',
          options: [
            'The task is completed.',
            'The task is currently pending due to a delay in receiving the design assets.',
            'I am working on the task tomorrow.',
            'The task was finished yesterday.'
          ],
          correctAnswer: 'The task is currently pending due to a delay in receiving the design assets.',
          explanation: '"Pending due to..." is the standard, objective way to report that a task is delayed by external dependencies.',
          explanationVi: '"Pending due to..." là cách tiêu chuẩn và khách quan nhất để báo cáo một nhiệm vụ đang bị chậm do phụ thuộc vào yếu tố bên ngoài.'
        },
        {
          id: 'q2',
          prompt: "Choose the correct past tense form: \"We ______ the Google Search Ads yesterday, and they are now live.\"",
          promptVi: 'Chọn dạng thì quá khứ chính xác: "We ______ the Google Search Ads yesterday, and they are now live."',
          options: [
            'launch',
            'launched',
            'launching',
            'are launching'
          ],
          correctAnswer: 'launched',
          explanation: 'Use Simple Past ("launched") for completed actions in the past with a specific time word like "yesterday".',
          explanationVi: 'Sử dụng thì Quá khứ đơn ("launched") cho hành động đã hoàn tất trong quá khứ đi kèm trạng từ chỉ thời gian cụ thể như "yesterday".'
        }
      ]
    },
    output: {
      instruction: 'Structure your weekly progress update message using the three states of tasks.',
      instructionVi: 'Cấu trúc tin nhắn cập nhật tiến độ tuần của bạn bằng cách kết hợp ba trạng thái của công việc.',
      prompt: "Draft a weekly status update for your team. You completed the monthly ad budget report yesterday, you are currently testing three new Facebook ad sets, and the landing page launch is pending client sign-off.",
      promptVi: "Soạn thảo một cập nhật tuần cho team. Bạn đã làm xong báo cáo ngân sách tháng hôm qua, hiện đang thử nghiệm (testing) 3 nhóm quảng cáo Facebook mới, và việc chạy trang đích (landing page) đang bị hoãn do chờ khách duyệt (client sign-off).",
      placeholder: "Hi team, here is my update. Yesterday, I completed...",
      sampleAnswer: "Hi team, here is my update. Yesterday, I completed the monthly ad budget report. Currently, I am testing three new Facebook ad sets. Note that the landing page launch is on hold pending client sign-off.",
      pointsToInclude: [
        "Use Past Simple for the completed monthly budget report",
        "Use Present Continuous for testing Facebook ad sets",
        "Use 'pending client sign-off' or 'on hold due to client sign-off' for the landing page launch"
      ]
    }
  },
  'a1-m03-l03': {
    context: {
      scenario: 'Your Account Manager forwards you a feedback message from a client. The client wants to "make the campaign banner pop more and feel more interactive" but gives no specific details about colors, layout, or CTA changes.',
      scenarioVi: 'Quản lý khách hàng chuyển tiếp cho bạn phản hồi của client. Khách hàng muốn "làm banner nổi bật hơn (pop more) và tạo cảm giác tương tác hơn" nhưng không nói rõ chi tiết màu sắc hay bố cục.',
      role: 'Social Ads Designer / Content Creator',
      roleVi: 'Thiết kế hình ảnh và dàn dựng nội dung, chịu trách nhiệm sửa đổi thiết kế dựa trên yêu cầu khách hàng.',
      goal: 'Write a polite, precise clarification query to send back to the Account Manager, outlining specific visual alternatives to clarify what the client actually means.',
      goalVi: 'Viết một tin nhắn hỏi lại chuyên nghiệp, lịch sự gửi Account Manager để họ hỏi rõ lại khách hàng, đưa ra các phương án cụ thể để khách lựa chọn.',
      marketingFocus: 'Polite workplace inquiries ("Could you please clarify...?", "To confirm...") and client scoping.'
    },
    vocabulary: {
      words: [
        SEED_VOCABULARY[5], // Creative brief
        SEED_VOCABULARY[6], // Engagement rate
        SEED_VOCABULARY[1], // Ad copy
      ],
      instruction: 'Learn how to refer to creative guidelines when questioning vague feedback.',
      instructionVi: 'Học cách dẫn chiếu tới tài liệu thiết kế gốc khi đặt câu hỏi làm rõ các phản hồi mơ hồ.'
    },
    formulas: {
      items: [
        SEED_FORMULAS[4], // Could you please clarify what you mean by...
        SEED_FORMULAS[5], // To confirm, are we targeting...
      ],
      instruction: 'These formulas prevent wasted design revisions and align everyone onto the exact client vision.',
      instructionVi: 'Các cấu trúc này giúp tránh chỉnh sửa thiết kế vô ích và giúp cả đội ngũ hiểu đúng mong muốn của khách.'
    },
    practice: {
      instruction: 'Select the best clarification approaches to narrow down abstract requests.',
      instructionVi: 'Chọn cách đặt câu hỏi làm rõ tối ưu nhất để cụ thể hóa các yêu cầu trừu tượng.',
      questions: [
        {
          id: 'q1',
          prompt: 'Which of the following is the most professional way to ask for a clearer deadline?',
          promptVi: 'Cách nào dưới đây là lịch sự và chuyên nghiệp nhất để xin sếp xác nhận hạn chót rõ ràng hơn?',
          options: [
            'When do you want this?',
            'Could you please confirm the final deadline for these creative assets?',
            'Give me the time limit.',
            'I need the date now.'
          ],
          correctAnswer: 'Could you please confirm the final deadline for these creative assets?',
          explanation: '"Could you please confirm..." is highly polite, formal, and specific to the work deliverables.',
          explanationVi: '"Could you please confirm..." rất lịch sự, trang trọng và đi thẳng vào sản phẩm bàn giao thiết kế.'
        },
        {
          id: 'q2',
          prompt: "Identify the best option to clarify \"cool visuals\" with a client.",
          promptVi: 'Tìm cách ứng xử khôn khéo nhất để hỏi rõ thế nào là "ảnh nhìn chất/cool" với khách hàng.',
          options: [
            'What is cool visuals?',
            "To ensure we align with your brand, could you share 2-3 reference brands or styles you consider 'cool'?",
            'Cool visuals are very subjective, please choose a style.',
            "I don't understand 'cool'."
          ],
          correctAnswer: "To ensure we align with your brand, could you share 2-3 reference brands or styles you consider 'cool'?",
          explanation: 'Asking for reference brands or style guides is the most collaborative, constructive way to define abstract aesthetic words.',
          explanationVi: 'Hỏi xin thương hiệu tham khảo hoặc hình ảnh mẫu là cách làm việc mang tính xây dựng và thực tế nhất để định nghĩa các từ trừu tượng như "cool/chất".'
        }
      ]
    },
    output: {
      instruction: 'Draft a message to the Account Manager to request a clear scope definition.',
      instructionVi: 'Soạn một tin nhắn gửi Account Manager nhờ họ làm rõ yêu cầu của khách hàng.',
      prompt: "The client asks you to 'make the summer banner pop more.' Write a polite Slack message to your Account Manager (Giang) asking them to clarify if the client wants a brighter color palette or an increased size for the CTA button.",
      promptVi: "Khách hàng yêu cầu 'làm banner nổi bật hơn (pop more)'. Hãy viết tin nhắn Slack lịch sự gửi Account Manager (Giang) nhờ hỏi rõ xem khách muốn đổi tông màu sáng rực rỡ hơn hay muốn phóng to nút CTA.",
      placeholder: "Hi Giang, regarding the client's feedback to make the banner pop...",
      sampleAnswer: "Hi Giang, regarding the client's request to make the summer banner 'pop more', could you please clarify if they mean changing the color palette to be brighter, or increasing the size of the Call-To-Action button? This will help me deliver the exact revised version today.",
      pointsToInclude: [
        "Address Giang politely (e.g., 'Hi Giang,' or 'Dear Giang,')",
        "Use 'could you please clarify if...' or 'to confirm, do they want...'",
        "Present the two specific choices (brighter colors vs. larger CTA button)"
      ]
    }
  },
  'a1-m03-l04': {
    context: {
      scenario: 'You are participating in the daily morning stand-up sync at 9:15 AM with your digital marketing team on Slack/Google Meet. You have a strict time budget (45 seconds) to share your updates.',
      scenarioVi: 'Bạn tham gia cuộc họp nhanh (daily stand-up) lúc 9:15 sáng với nhóm digital marketing trên Slack/Meet. Bạn có đúng 45 giây để trình bày ngắn gọn.',
      role: 'Performance Marketer (Chuyên viên Chạy quảng cáo hiệu số)',
      roleVi: 'Chịu trách nhiệm thiết lập chiến dịch quảng cáo, kiểm tra ngân sách, và báo cáo chỉ số chuyển đổi.',
      goal: 'Deliver a structured 3-part update following the PPP (Progress, Plans, Problems) method: completed report, ongoing budget optimizations, and a blocker regarding TikTok account access.',
      goalVi: 'Trình bày cập nhật 3 phần theo mô hình PPP (Tiến độ, Kế hoạch, Trở ngại): đã xong báo cáo, đang tối ưu ngân sách quảng cáo, và bị kẹt do chưa có quyền truy cập tài khoản TikTok.',
      marketingFocus: 'PPP Agile stand-up structure (Yesterday, Today, Blockers) and marketing metric terminology.'
    },
    vocabulary: {
      words: [
        SEED_VOCABULARY[7], // CTR (Click-Through Rate)
        SEED_VOCABULARY[9], // Landing page pixel
        SEED_VOCABULARY[2], // Blocker
      ],
      instruction: 'Master these specific metrics and technical terms to explain digital campaign setup states.',
      instructionVi: 'Nắm vững các chỉ số quảng cáo và thuật ngữ kỹ thuật này để giải thích trạng thái thiết lập chiến dịch số.'
    },
    formulas: {
      items: [
        SEED_FORMULAS[0], // Yesterday, I completed... Today I'm focusing on...
        SEED_FORMULAS[6], // My main blocker is... which is delaying...
      ],
      instruction: 'Use these formulas to sequence your verbal updates so the team understands your bottlenecks immediately.',
      instructionVi: 'Sử dụng các cấu trúc này để sắp xếp báo cáo nói giúp nhóm nhận biết ngay lập tức điểm nghẽn của bạn.'
    },
    practice: {
      instruction: 'Rehearse the logical structure and clear wording of daily workspace stand-ups.',
      instructionVi: 'Thực hành cấu trúc logic và cách dùng từ rõ ràng trong các buổi họp sync hàng ngày.',
      questions: [
        {
          id: 'q1',
          prompt: 'In a daily stand-up, which of the following represents a clear and helpful "Blocker" statement?',
          promptVi: 'Trong buổi họp stand-up súc tích, câu nào biểu thị một thông báo "Trở ngại" hữu ích nhất?',
          options: [
            'I have some problems with some tools.',
            'My main blocker is that the Facebook tracking pixel is not firing, which is delaying our conversion reports.',
            'I am very busy today with too many emails.',
            'No blockers, everything is bad.'
          ],
          correctAnswer: 'My main blocker is that the Facebook tracking pixel is not firing, which is delaying our conversion reports.',
          explanation: 'A good blocker statement names the exact issue (pixel not firing) and its direct business impact (delaying conversion reports) so the technical team can assist.',
          explanationVi: 'Một thông báo trở ngại tốt chỉ ra chính xác sự cố (pixel không hoạt động) kèm theo ảnh hưởng cụ thể (chậm báo cáo chuyển đổi) để đội kỹ thuật có thể nhảy vào hỗ trợ.'
        },
        {
          id: 'q2',
          prompt: 'Which structure matches the standard daily stand-up flow?',
          promptVi: 'Cấu trúc nào khớp chuẩn nhất với luồng họp nhanh stand-up hàng ngày?',
          options: [
            'Hello -> Introduce my family -> Say goodbye',
            'What I did yesterday -> What I am doing today -> Any blockers I have',
            'Complain about client -> Criticize designs -> Ask for higher salary',
            'Explain marketing history -> Review last year\'s campaign -> Set next year\'s plans'
          ],
          correctAnswer: 'What I did yesterday -> What I am doing today -> Any blockers I have',
          explanation: 'This is the classic PPP (Progress, Plans, Problems) framework. It keeps meetings short, relevant, and actionable.',
          explanationVi: 'Đây là khung sườn PPP kinh điển (Progress - Tiến độ, Plans - Kế hoạch, Problems - Vấn đề). Nó giúp cuộc họp luôn ngắn gọn, tập trung và có giải pháp tháo gỡ.'
        }
      ]
    },
    output: {
      instruction: 'Write your daily update message exactly as you would type it in the team Slack sync channel.',
      instructionVi: 'Viết nội dung báo cáo ngày của bạn chính xác như cách bạn sẽ gửi vào kênh Slack chung của nhóm.',
      prompt: "Draft a Slack stand-up update. You finished the monthly ad report yesterday, you are going to optimize the Instagram campaign budgets today, and your main blocker is that you still do not have access to the client's TikTok Ads Manager.",
      promptVi: "Soạn một cập nhật stand-up trên Slack. Hôm qua bạn đã xong báo cáo quảng cáo tháng (monthly ad report), hôm nay sẽ tối ưu ngân sách Instagram (optimize Instagram budgets), và trở ngại chính là chưa có quyền truy cập tài khoản TikTok Ads của khách (client's TikTok Ads Manager).",
      placeholder: "e.g., Hi team! Yesterday, I completed...",
      sampleAnswer: "Hi team, here is my stand-up update. Yesterday, I completed the monthly ad report. Today, I'm focusing on optimizing the Instagram campaign budgets. My main blocker is lacking access to the client's TikTok Ads Manager, which is delaying our campaign launch setup.",
      pointsToInclude: [
        "Divide into clear sections (Yesterday, Today, Blocker) or write a clean paragraph",
        "Use past tense for 'completed monthly ad report'",
        "Use present continuous or 'focusing on' for 'optimizing Instagram budgets'",
        "Identify 'lacking access to TikTok Ads Manager' as your primary blocker"
      ]
    }
  }
};
