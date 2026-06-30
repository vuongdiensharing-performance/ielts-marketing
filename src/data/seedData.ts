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
    name: 'The Data & Customer Explorer',
    description: 'Learn to interpret marketing dashboards, analyze customer personas, and present performance metrics.',
    unlocked: false,
  },
  {
    code: 'B1',
    name: 'The Strategic Planner',
    description: 'Structure comprehensive campaign strategies, plan marketing channels, and pitch plans to leadership.',
    unlocked: false,
  },
  {
    code: 'B2',
    name: 'The Global Manager',
    description: 'Direct high-stakes global campaigns, negotiate marketing budgets, and manage international communications.',
    unlocked: false,
  },
];

export const MODULES: Module[] = [
  {
    id: 'a1-m01',
    category: 'marketing',
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
    category: 'marketing',
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
    category: 'marketing',
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
  {
    id: 'a1-f01',
    category: 'family-life',
    level: 'A1',
    code: 'A1-F01',
    title: 'Family Routines & Home Tasks',
    description: 'Talk about daily family routines, household tasks, and simple requests at home.',
    status: 'unlocked',
    duration: 100,
    vocabCount: 30,
    skills: ['Listening', 'Speaking', 'Reading', 'Writing'],
    outcome: 'Talk about daily family routines, household tasks, and simple requests at home.',
    outcomeVi: 'Nói về các thói quen sinh hoạt gia đình, công việc nhà và các yêu cầu đơn giản trong gia đình.',
  }
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
  {
    id: 'a1-m03-challenge',
    moduleId: 'a1-m03',
    title: 'MODULE CHALLENGE: Daily Marketing Update',
    mainSkill: 'Speaking',
    secondarySkill: 'Writing',
    duration: 30,
    unlocked: true,
    completed: false,
    description: 'Create a comprehensive end-of-day update covering completed tasks, ongoing work, current results, blockers, and next steps. Complete via audio or written transcript.',
  },
  {
    id: 'a1-f01-l01',
    moduleId: 'a1-f01',
    title: 'My Family and Daily Routine',
    mainSkill: 'Speaking',
    secondarySkill: 'Vocabulary',
    duration: 20,
    unlocked: true,
    completed: false,
    description: 'Describe a normal weekday morning in your family.',
  },
  {
    id: 'a1-f01-l02',
    moduleId: 'a1-f01',
    title: 'Household Tasks and Simple Requests',
    mainSkill: 'Listening',
    secondarySkill: 'Speaking',
    duration: 25,
    unlocked: true,
    completed: false,
    description: 'Ask a family member for help with two household tasks.',
  },
  {
    id: 'a1-f01-l03',
    moduleId: 'a1-f01',
    title: 'Planning Meals and Shopping',
    mainSkill: 'Reading',
    secondarySkill: 'Writing',
    duration: 25,
    unlocked: true,
    completed: false,
    description: 'Read a family chat to plan dinner and make a shopping list.',
  },
  {
    id: 'a1-f01-l04',
    moduleId: 'a1-f01',
    title: 'Evening Family Update',
    mainSkill: 'Writing',
    secondarySkill: 'Speaking',
    duration: 30,
    unlocked: true,
    completed: false,
    description: 'Write and record an evening family update about work, dinner, and tomorrow\'s plan.',
  },
  {
    id: 'a1-f01-challenge',
    moduleId: 'a1-f01',
    title: 'MODULE CHALLENGE: Family Day Coordination',
    mainSkill: 'Writing',
    secondarySkill: 'Speaking',
    duration: 30,
    unlocked: true,
    completed: false,
    description: 'Coordinate a busy weekday involving work, school, meals, and household tasks.',
  }
];

export const SEED_VOCABULARY: VocabularyItem[] = [
  { id: 'm_ads_1', word: 'campaign', partOfSpeech: 'noun', definition: 'A series of organized activities to achieve a marketing goal.', vietnameseTranslation: 'Chiến dịch', exampleSentence: 'I am checking the campaign performance today.', exampleTranslation: 'Tôi đang kiểm tra hiệu quả chiến dịch hôm nay.', marketingContext: 'Sử dụng để quản lý tiến độ chạy quảng cáo.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'kæmˈpeɪn', vowels: ['æ', 'eɪ'], consonants: ['k', 'm', 'p', 'n'], track: 'marketing', level: 'A2', wordStress: 'cam-PAIGN', collocations: ['launch a campaign', 'run a campaign'], topicTags: ['ads', 'performance'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_2', word: 'campaign objective', partOfSpeech: 'noun', definition: 'The goal of a campaign (e.g., awareness, conversion).', vietnameseTranslation: 'Mục tiêu chiến dịch', exampleSentence: 'We must define the campaign objective first.', exampleTranslation: 'Chúng ta phải xác định mục tiêu chiến dịch trước.', marketingContext: 'Thiết lập khi tạo chiến dịch mới.', category: 'Ads & Performance', tags: ['marketing', 'strategy'], ipa: 'kæmˈpeɪn əbˈdʒɛktɪv', vowels: ['æ', 'eɪ', 'ə', 'ə', 'ɛ', 'ɪ'], consonants: ['k', 'm', 'p', 'n', 'b', 'dʒ', 'k', 't', 'v'], track: 'marketing', level: 'B1', wordStress: 'cam-PAIGN ob-JEC-tive', collocations: ['set objective', 'define objective'], topicTags: ['ads', 'strategy'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_3', word: 'campaign budget', partOfSpeech: 'noun', definition: 'The amount allocated for a campaign.', vietnameseTranslation: 'Ngân sách chiến dịch', exampleSentence: 'The campaign budget is limited.', exampleTranslation: 'Ngân sách chiến dịch có hạn.', marketingContext: 'Quản lý chi phí.', category: 'Ads & Performance', tags: ['marketing', 'budget'], ipa: 'kæmˈpeɪn ˈbʌdʒɪt', vowels: ['æ', 'eɪ', 'ʌ', 'ɪ'], consonants: ['k', 'm', 'p', 'n', 'b', 'dʒ', 't'], track: 'marketing', level: 'A1', wordStress: 'cam-PAIGN BUD-get', collocations: ['set budget', 'increase budget'], topicTags: ['ads', 'budget'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_4', word: 'ad account', partOfSpeech: 'noun', definition: 'An account used to run ads.', vietnameseTranslation: 'Tài khoản quảng cáo', exampleSentence: 'The ad account is active.', exampleTranslation: 'Tài khoản quảng cáo đang hoạt động.', marketingContext: 'Quản lý quảng cáo.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'æd əˈkaʊnt', vowels: ['æ', 'ə', 'aʊ'], consonants: ['d', 'k', 'n', 't'], track: 'marketing', level: 'A1', wordStress: 'AD ac-COUNT', collocations: ['create ad account', 'manage ad account'], topicTags: ['ads', 'setup'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_5', word: 'ad set', partOfSpeech: 'noun', definition: 'A group of ads within a campaign.', vietnameseTranslation: 'Nhóm quảng cáo', exampleSentence: 'The ad set targets Gen Z.', exampleTranslation: 'Nhóm quảng cáo nhắm đến Gen Z.', marketingContext: 'Phân loại quảng cáo.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'æd sɛt', vowels: ['æ', 'ɛ'], consonants: ['d', 's', 't'], track: 'marketing', level: 'A1', wordStress: 'AD set', collocations: ['create ad set', 'target ad set'], topicTags: ['ads', 'setup'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_6', word: 'ad creative', partOfSpeech: 'noun', definition: 'The visual/copy content of an ad.', vietnameseTranslation: 'Ấn phẩm quảng cáo', exampleSentence: 'The ad creative is engaging.', exampleTranslation: 'Ấn phẩm quảng cáo rất thu hút.', marketingContext: 'Thiết kế quảng cáo.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'æd kriˈeɪtɪv', vowels: ['æ', 'i', 'eɪ', 'ɪ'], consonants: ['d', 'k', 'r', 't', 'v'], track: 'marketing', level: 'B1', wordStress: 'AD cre-A-tive', collocations: ['test ad creative', 'design ad creative'], topicTags: ['ads', 'creative'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_7', word: 'audience', partOfSpeech: 'noun', definition: 'The people intended to see an ad.', vietnameseTranslation: 'Đối tượng / Khán giả', exampleSentence: 'Define the target audience.', exampleTranslation: 'Xác định đối tượng mục tiêu.', marketingContext: 'Phân khúc khách hàng.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ˈɔːdiəns', vowels: ['ɔː', 'i', 'ə'], consonants: ['d', 'n', 's'], track: 'marketing', level: 'A2', wordStress: 'AU-di-ence', collocations: ['target audience', 'reach audience'], topicTags: ['ads', 'audience'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_8', word: 'target audience', partOfSpeech: 'noun', definition: 'The specific group an ad is intended for.', vietnameseTranslation: 'Đối tượng mục tiêu', exampleSentence: 'The target audience is young professionals.', exampleTranslation: 'Đối tượng mục tiêu là người trẻ chuyên nghiệp.', marketingContext: 'Phân khúc khách hàng.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ˈtɑːrɡɪt ˈɔːdiəns', vowels: ['ɑː', 'ɪ', 'ɔː', 'i', 'ə'], consonants: ['t', 'r', 'ɡ', 'd', 'n', 's'], track: 'marketing', level: 'B1', wordStress: 'TAR-get AU-di-ence', collocations: ['define target audience', 'reach target audience'], topicTags: ['ads', 'audience'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_9', word: 'custom audience', partOfSpeech: 'noun', definition: 'An audience based on existing data.', vietnameseTranslation: 'Đối tượng tùy chỉnh', exampleSentence: 'Use a custom audience for retargeting.', exampleTranslation: 'Sử dụng đối tượng tùy chỉnh để bám đuổi.', marketingContext: 'Phân khúc khách hàng.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ˈkʌstəm ˈɔːdiəns', vowels: ['ʌ', 'ə', 'ɔː', 'i', 'ə'], consonants: ['k', 's', 't', 'm', 'd', 'n', 's'], track: 'marketing', level: 'B2', wordStress: 'CUS-tom AU-di-ence', collocations: ['create custom audience', 'use custom audience'], topicTags: ['ads', 'audience'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_10', word: 'lookalike audience', partOfSpeech: 'noun', definition: 'An audience similar to an existing one.', vietnameseTranslation: 'Đối tượng tương tự', exampleSentence: 'Create a lookalike audience.', exampleTranslation: 'Tạo đối tượng tương tự.', marketingContext: 'Mở rộng đối tượng.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ˈlʊkəlaɪk ˈɔːdiəns', vowels: ['ʊ', 'ə', 'aɪ', 'ɔː', 'i', 'ə'], consonants: ['l', 'k', 'l', 'k', 'd', 'n', 's'], track: 'marketing', level: 'B2', wordStress: 'LOOK-a-like AU-di-ence', collocations: ['create lookalike audience', 'use lookalike audience'], topicTags: ['ads', 'audience'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_11', word: 'retargeting', partOfSpeech: 'noun', definition: 'Showing ads to people who visited your site.', vietnameseTranslation: 'Quảng cáo bám đuổi', exampleSentence: 'Retargeting helps conversion.', exampleTranslation: 'Quảng cáo bám đuổi giúp tăng chuyển đổi.', marketingContext: 'Chiến lược bám đuổi.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'riˈtɑːrɡɪtɪŋ', vowels: ['i', 'ɑː', 'ɪ', 'ɪ'], consonants: ['r', 't', 'r', 'ɡ', 't', 'n'], track: 'marketing', level: 'B2', wordStress: 're-TAR-get-ing', collocations: ['run retargeting', 'optimize retargeting'], topicTags: ['ads', 'retargeting'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_12', word: 'prospecting', partOfSpeech: 'noun', definition: 'Finding new potential customers.', vietnameseTranslation: 'Tìm kiếm khách hàng mới', exampleSentence: 'Prospecting is vital.', exampleTranslation: 'Việc tìm kiếm khách hàng mới rất quan trọng.', marketingContext: 'Giai đoạn đầu phễu.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ˈprɒspektɪŋ', vowels: ['ɒ', 'ɛ', 'ɪ'], consonants: ['p', 'r', 's', 'p', 'k', 't', 'n'], track: 'marketing', level: 'B2', wordStress: 'PROS-pec-ting', collocations: ['focus on prospecting', 'start prospecting'], topicTags: ['ads', 'strategy'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_13', word: 'placement', partOfSpeech: 'noun', definition: 'Where an ad appears.', vietnameseTranslation: 'Vị trí hiển thị', exampleSentence: 'Check ad placement.', exampleTranslation: 'Kiểm tra vị trí hiển thị quảng cáo.', marketingContext: 'Cài đặt quảng cáo.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ˈpleɪsmənt', vowels: ['eɪ', 'ə'], consonants: ['p', 'l', 's', 'm', 'n', 't'], track: 'marketing', level: 'A2', wordStress: 'PLACE-ment', collocations: ['check placement', 'automatic placement'], topicTags: ['ads', 'setup'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_14', word: 'bidding strategy', partOfSpeech: 'noun', definition: 'How you bid for ad placement.', vietnameseTranslation: 'Chiến lược đấu giá', exampleSentence: 'Change the bidding strategy.', exampleTranslation: 'Thay đổi chiến lược đấu giá.', marketingContext: 'Thiết lập đấu giá.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ˈbɪdɪŋ ˈstrætədʒi', vowels: ['ɪ', 'æ', 'ə', 'i'], consonants: ['b', 'd', 'n', 's', 't', 'r', 't', 'dʒ'], track: 'marketing', level: 'B2', wordStress: 'BID-ding STRAT-e-gy', collocations: ['set bidding strategy', 'change bidding strategy'], topicTags: ['ads', 'strategy'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_15', word: 'daily budget', partOfSpeech: 'noun', definition: 'The budget spent per day.', vietnameseTranslation: 'Ngân sách hàng ngày', exampleSentence: 'Set a daily budget.', exampleTranslation: 'Đặt ngân sách hàng ngày.', marketingContext: 'Quản lý ngân sách.', category: 'Ads & Performance', tags: ['marketing', 'budget'], ipa: 'ˈdeɪli ˈbʌdʒɪt', vowels: ['eɪ', 'i', 'ʌ', 'ɪ'], consonants: ['d', 'l', 'b', 'dʒ', 't'], track: 'marketing', level: 'A1', wordStress: 'DAI-ly BUD-get', collocations: ['set daily budget', 'adjust daily budget'], topicTags: ['ads', 'budget'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_16', word: 'lifetime budget', partOfSpeech: 'noun', definition: 'The total budget for a campaign.', vietnameseTranslation: 'Ngân sách trọn đời', exampleSentence: 'Use a lifetime budget.', exampleTranslation: 'Sử dụng ngân sách trọn đời.', marketingContext: 'Quản lý ngân sách.', category: 'Ads & Performance', tags: ['marketing', 'budget'], ipa: 'ˈlaɪftaɪm ˈbʌdʒɪt', vowels: ['aɪ', 'ʌ', 'ɪ'], consonants: ['l', 'f', 't', 'm', 'b', 'dʒ', 't'], track: 'marketing', level: 'B1', wordStress: 'LIFE-time BUD-get', collocations: ['set lifetime budget', 'use lifetime budget'], topicTags: ['ads', 'budget'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_17', word: 'landing page', partOfSpeech: 'noun', definition: 'The page a user lands on after clicking.', vietnameseTranslation: 'Trang đích', exampleSentence: 'Optimize the landing page.', exampleTranslation: 'Tối ưu hóa trang đích.', marketingContext: 'Trang chuyển đổi.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ˈlændɪŋ peɪdʒ', vowels: ['æ', 'ɪ', 'eɪ'], consonants: ['l', 'n', 'd', 'p', 'dʒ'], track: 'marketing', level: 'A2', wordStress: 'LAND-ing page', collocations: ['build landing page', 'optimize landing page'], topicTags: ['ads', 'website'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_18', word: 'conversion', partOfSpeech: 'noun', definition: 'A user taking a desired action.', vietnameseTranslation: 'Chuyển đổi', exampleSentence: 'Track every conversion.', exampleTranslation: 'Theo dõi mọi chuyển đổi.', marketingContext: 'Kết quả quảng cáo.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'kənˈvɜːrʒən', vowels: ['ə', 'ɜː', 'ə'], consonants: ['k', 'n', 'v', 'r', 'ʒ', 'n'], track: 'marketing', level: 'B2', wordStress: 'con-VER-sion', collocations: ['track conversion', 'increase conversion'], topicTags: ['ads', 'performance'], sourceLessonIds: ['A1-M05'] },
  { id: 'm_ads_19', word: 'conversion rate', partOfSpeech: 'noun', definition: 'Percentage of users who convert.', vietnameseTranslation: 'Tỷ lệ chuyển đổi', exampleSentence: 'The conversion rate is low.', exampleTranslation: 'Tỷ lệ chuyển đổi đang thấp.', marketingContext: 'Chỉ số hiệu quả.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'kənˈvɜːrʒən reɪt', vowels: ['ə', 'ɜː', 'ə', 'eɪ'], consonants: ['k', 'n', 'v', 'r', 'ʒ', 'n', 'r', 't'], track: 'marketing', level: 'B2', wordStress: 'con-VER-sion rate', collocations: ['improve conversion rate', 'low conversion rate'], topicTags: ['ads', 'performance'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_20', word: 'pixel', partOfSpeech: 'noun', definition: 'Tracking code for websites.', vietnameseTranslation: 'Mã Pixel', exampleSentence: 'Install the tracking pixel.', exampleTranslation: 'Cài đặt mã pixel theo dõi.', marketingContext: 'Kỹ thuật theo dõi.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ˈpɪksəl', vowels: ['ɪ', 'ə'], consonants: ['p', 'k', 's', 'l'], track: 'marketing', level: 'B1', wordStress: 'PIX-el', collocations: ['install pixel', 'check pixel'], topicTags: ['ads', 'tracking'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_21', word: 'tracking', partOfSpeech: 'noun', definition: 'Monitoring user actions.', vietnameseTranslation: 'Theo dõi / Đo lường', exampleSentence: 'Enable conversion tracking.', exampleTranslation: 'Bật theo dõi chuyển đổi.', marketingContext: 'Kỹ thuật theo dõi.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ˈtrækɪŋ', vowels: ['æ', 'ɪ'], consonants: ['t', 'r', 'k', 'n'], track: 'marketing', level: 'A2', wordStress: 'TRACK-ing', collocations: ['enable tracking', 'check tracking'], topicTags: ['ads', 'tracking'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_22', word: 'event', partOfSpeech: 'noun', definition: 'A specific user action.', vietnameseTranslation: 'Sự kiện (hành động)', exampleSentence: 'Define the conversion event.', exampleTranslation: 'Xác định sự kiện chuyển đổi.', marketingContext: 'Cài đặt theo dõi.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ɪˈvɛnt', vowels: ['ɪ', 'ɛ'], consonants: ['v', 'n', 't'], track: 'marketing', level: 'A2', wordStress: 'e-VENT', collocations: ['track event', 'define event'], topicTags: ['ads', 'tracking'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_23', word: 'lead', partOfSpeech: 'noun', definition: 'A potential customer.', vietnameseTranslation: 'Khách hàng tiềm năng', exampleSentence: 'Generate more leads.', exampleTranslation: 'Tạo thêm khách hàng tiềm năng.', marketingContext: 'Mục tiêu chiến dịch.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'liːd', vowels: ['iː'], consonants: ['l', 'd'], track: 'marketing', level: 'A2', wordStress: 'LEAD', collocations: ['generate leads', 'capture leads'], topicTags: ['ads', 'performance'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_24', word: 'lead form', partOfSpeech: 'noun', definition: 'A form to capture leads.', vietnameseTranslation: 'Biểu mẫu thu thập thông tin', exampleSentence: 'Create a lead form.', exampleTranslation: 'Tạo biểu mẫu thu thập thông tin.', marketingContext: 'Công cụ chuyển đổi.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'liːd fɔːrm', vowels: ['iː', 'ɔː'], consonants: ['l', 'd', 'f', 'r', 'm'], track: 'marketing', level: 'B1', wordStress: 'LEAD form', collocations: ['create lead form', 'optimize lead form'], topicTags: ['ads', 'performance'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_25', word: 'click', partOfSpeech: 'noun', definition: 'A user clicking an ad.', vietnameseTranslation: 'Lượt nhấp chuột', exampleSentence: 'Analyze click data.', exampleTranslation: 'Phân tích dữ liệu lượt nhấp.', marketingContext: 'Chỉ số hiệu quả.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'klɪk', vowels: ['ɪ'], consonants: ['k', 'l', 'k'], track: 'marketing', level: 'A1', wordStress: 'CLICK', collocations: ['generate clicks', 'cost per click'], topicTags: ['ads', 'analytics'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_26', word: 'click-through rate', partOfSpeech: 'noun', definition: 'The ratio of clicks to impressions.', vietnameseTranslation: 'Tỷ lệ nhấp chuột (CTR)', exampleSentence: 'The CTR is 2%.', exampleTranslation: 'Tỷ lệ nhấp là 2%.', marketingContext: 'Chỉ số hiệu quả.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ˈklɪk θruː reɪt', vowels: ['ɪ', 'uː', 'eɪ'], consonants: ['k', 'l', 'k', 'θ', 'r', 'r', 't'], track: 'marketing', level: 'B2', wordStress: 'CLICK-through rate', collocations: ['improve CTR', 'monitor CTR'], topicTags: ['ads', 'analytics'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_27', word: 'cost per click', partOfSpeech: 'noun', definition: 'The cost paid for one click.', vietnameseTranslation: 'Chi phí mỗi lượt nhấp (CPC)', exampleSentence: 'Reduce the CPC.', exampleTranslation: 'Giảm chi phí mỗi lượt nhấp.', marketingContext: 'Đấu giá.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'kɒst pɜːr klɪk', vowels: ['ɒ', 'ɜː', 'ɪ'], consonants: ['k', 's', 't', 'p', 'r', 'k', 'l', 'k'], track: 'marketing', level: 'B1', wordStress: 'COST per CLICK', collocations: ['optimize CPC', 'manage CPC'], topicTags: ['ads', 'analytics'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_28', word: 'cost per mille', partOfSpeech: 'noun', definition: 'Cost per 1,000 impressions.', vietnameseTranslation: 'Chi phí mỗi 1000 lượt hiển thị (CPM)', exampleSentence: 'The CPM is high.', exampleTranslation: 'CPM đang cao.', marketingContext: 'Đấu giá.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'kɒst pɜːr mɪl', vowels: ['ɒ', 'ɜː', 'ɪ'], consonants: ['k', 's', 't', 'p', 'r', 'm', 'l'], track: 'marketing', level: 'B2', wordStress: 'COST per MILLE', collocations: ['monitor CPM', 'lower CPM'], topicTags: ['ads', 'analytics'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_29', word: 'cost per acquisition', partOfSpeech: 'noun', definition: 'Cost to get one customer.', vietnameseTranslation: 'Chi phí mỗi khách hàng mới (CPA)', exampleSentence: 'The CPA is optimal.', exampleTranslation: 'CPA đang tối ưu.', marketingContext: 'Chỉ số chuyển đổi.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'kɒst pɜːr ˌækwɪˈzɪʃən', vowels: ['ɒ', 'ɜː', 'æ', 'ɪ', 'ɪ', 'ə'], consonants: ['k', 's', 't', 'p', 'r', 'k', 'w', 'z', 'n'], track: 'marketing', level: 'B2', wordStress: 'COST per ac-qui-SI-tion', collocations: ['optimize CPA', 'monitor CPA'], topicTags: ['ads', 'analytics'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_30', word: 'return on ad spend', partOfSpeech: 'noun', definition: 'Revenue earned for every dollar spent.', vietnameseTranslation: 'Doanh thu trên chi phí quảng cáo (ROAS)', exampleSentence: 'Aim for a high ROAS.', exampleTranslation: 'Nhắm tới chỉ số ROAS cao.', marketingContext: 'Chỉ số hiệu quả.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'rɪˈtɜːrn ɒn æd spɛnd', vowels: ['ɪ', 'ɜː', 'ɒ', 'æ', 'ɛ'], consonants: ['r', 't', 'r', 'n', 'n', 'd', 's', 'p', 'n', 'd'], track: 'marketing', level: 'B2', wordStress: 're-TURN on AD SPEND', collocations: ['increase ROAS', 'achieve ROAS'], topicTags: ['ads', 'analytics'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_31', word: 'reach', partOfSpeech: 'noun', definition: 'Number of unique people who saw the ad.', vietnameseTranslation: 'Lượt tiếp cận', exampleSentence: 'The reach is extensive.', exampleTranslation: 'Lượt tiếp cận rất lớn.', marketingContext: 'Chỉ số đo lường.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'riːtʃ', vowels: ['iː'], consonants: ['r', 'tʃ'], track: 'marketing', level: 'A2', wordStress: 'REACH', collocations: ['increase reach', 'monitor reach'], topicTags: ['ads', 'analytics'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_32', word: 'impressions', partOfSpeech: 'noun', definition: 'Total number of times an ad is displayed.', vietnameseTranslation: 'Lượt hiển thị', exampleSentence: 'High impressions.', exampleTranslation: 'Lượt hiển thị cao.', marketingContext: 'Chỉ số đo lường.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ɪmˈprɛʃənz', vowels: ['ɪ', 'ɛ', 'ə'], consonants: ['m', 'p', 'r', 'ʃ', 'n', 'z'], track: 'marketing', level: 'A2', wordStress: 'im-PRES-sions', collocations: ['check impressions', 'monitor impressions'], topicTags: ['ads', 'analytics'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_33', word: 'frequency', partOfSpeech: 'noun', definition: 'Average times an ad is shown to one person.', vietnameseTranslation: 'Tần suất', exampleSentence: 'Manage the frequency.', exampleTranslation: 'Quản lý tần suất.', marketingContext: 'Chỉ số đo lường.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ˈfriːkwənsi', vowels: ['iː', 'ə', 'i'], consonants: ['f', 'r', 'k', 'w', 'n', 's'], track: 'marketing', level: 'B1', wordStress: 'FRE-quen-cy', collocations: ['monitor frequency', 'manage frequency'], topicTags: ['ads', 'analytics'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_34', word: 'engagement', partOfSpeech: 'noun', definition: 'Interactions with the ad.', vietnameseTranslation: 'Tương tác', exampleSentence: 'Drive more engagement.', exampleTranslation: 'Tạo thêm tương tác.', marketingContext: 'Chỉ số hiệu quả.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ɪnˈɡeɪdʒmənt', vowels: ['ɪ', 'eɪ', 'ə'], consonants: ['n', 'ɡ', 'dʒ', 'm', 'n', 't'], track: 'marketing', level: 'B1', wordStress: 'en-GAGE-ment', collocations: ['increase engagement', 'measure engagement'], topicTags: ['ads', 'analytics'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_35', word: 'optimization', partOfSpeech: 'noun', definition: 'Adjusting ads for better performance.', vietnameseTranslation: 'Tối ưu hóa', exampleSentence: 'Perform continuous optimization.', exampleTranslation: 'Thực hiện tối ưu hóa liên tục.', marketingContext: 'Hành động điều chỉnh.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ˌɒptɪmaɪˈzeɪʃən', vowels: ['ɒ', 'ɪ', 'aɪ', 'eɪ', 'ə'], consonants: ['p', 't', 'm', 'z', 'ʃ', 'n'], track: 'marketing', level: 'B2', wordStress: 'op-ti-mi-ZA-tion', collocations: ['continuous optimization', 'perform optimization'], topicTags: ['ads', 'performance'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_36', word: 'A/B test', partOfSpeech: 'noun', definition: 'Comparing two versions.', vietnameseTranslation: 'Thử nghiệm A/B', exampleSentence: 'Run an A/B test.', exampleTranslation: 'Chạy một thử nghiệm A/B.', marketingContext: 'Kỹ thuật so sánh.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'eɪ biː tɛst', vowels: ['eɪ', 'iː', 'ɛ'], consonants: ['b', 't', 's', 't'], track: 'marketing', level: 'B1', wordStress: 'A-B TEST', collocations: ['run A/B test', 'analyze A/B test'], topicTags: ['ads', 'performance'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_37', word: 'test variation', partOfSpeech: 'noun', definition: 'One version in a test.', vietnameseTranslation: 'Biến thể thử nghiệm', exampleSentence: 'Analyze the test variation.', exampleTranslation: 'Phân tích biến thể thử nghiệm.', marketingContext: 'Thành phần thử nghiệm.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'tɛst ˌvɛəriˈeɪʃən', vowels: ['ɛ', 'ɛ', 'ə', 'i', 'eɪ', 'ə'], consonants: ['t', 's', 't', 'v', 'r', 'ʃ', 'n'], track: 'marketing', level: 'B1', wordStress: 'test va-ri-A-tion', collocations: ['create test variation', 'compare test variation'], topicTags: ['ads', 'performance'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_38', word: 'scale a campaign', partOfSpeech: 'phrase', definition: 'Increase budget to get more results.', vietnameseTranslation: 'Tăng quy mô chiến dịch', exampleSentence: 'It is time to scale a campaign.', exampleTranslation: 'Đã đến lúc tăng quy mô chiến dịch.', marketingContext: 'Chiến lược tăng trưởng.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'skeɪl ə kæmˈpeɪn', vowels: ['eɪ', 'ə', 'æ', 'eɪ'], consonants: ['s', 'k', 'l', 'k', 'm', 'p', 'n'], track: 'marketing', level: 'B1', wordStress: 'SCALE a cam-PAIGN', collocations: ['scale a campaign effectively', 'when to scale a campaign'], topicTags: ['ads', 'performance'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_39', word: 'pause an ad', partOfSpeech: 'phrase', definition: 'Stop an ad temporarily.', vietnameseTranslation: 'Tạm dừng quảng cáo', exampleSentence: 'Pause an ad if it fails.', exampleTranslation: 'Tạm dừng quảng cáo nếu nó không hiệu quả.', marketingContext: 'Vận hành quảng cáo.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'pɔːz ən æd', vowels: ['ɔː', 'ə', 'æ'], consonants: ['p', 'z', 'n', 'd'], track: 'marketing', level: 'A1', wordStress: 'PAUSE an AD', collocations: ['pause an ad set', 'pause an ad'], topicTags: ['ads', 'performance'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_40', word: 'launch a campaign', partOfSpeech: 'phrase', definition: 'Start a new campaign.', vietnameseTranslation: 'Khởi chạy chiến dịch', exampleSentence: 'Launch a campaign today.', exampleTranslation: 'Khởi chạy chiến dịch hôm nay.', marketingContext: 'Vận hành quảng cáo.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'lɔːntʃ ə kæmˈpeɪn', vowels: ['ɔː', 'ə', 'æ', 'eɪ'], consonants: ['l', 'n', 'tʃ', 'k', 'm', 'p', 'n'], track: 'marketing', level: 'A2', wordStress: 'LAUNCH a cam-PAIGN', collocations: ['launch a campaign successfully', 'ready to launch a campaign'], topicTags: ['ads', 'performance'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_41', word: 'performance report', partOfSpeech: 'noun', definition: 'Document showing campaign results.', vietnameseTranslation: 'Báo cáo hiệu quả', exampleSentence: 'Generate a performance report.', exampleTranslation: 'Tạo một báo cáo hiệu quả.', marketingContext: 'Báo cáo số liệu.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'pərˈfɔːrməns rɪˈpɔːrt', vowels: ['ə', 'ɔː', 'ə', 'ɪ', 'ɔː'], consonants: ['p', 'r', 'f', 'r', 'm', 'n', 's', 'r', 'p', 'r', 't'], track: 'marketing', level: 'B1', wordStress: 'per-FOR-mance re-PORT', collocations: ['generate performance report', 'analyze performance report'], topicTags: ['ads', 'analytics'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_42', word: 'cost per lead', partOfSpeech: 'noun', definition: 'Cost to get one lead.', vietnameseTranslation: 'Chi phí mỗi khách hàng tiềm năng (CPL)', exampleSentence: 'Monitor the CPL.', exampleTranslation: 'Theo dõi chỉ số CPL.', marketingContext: 'Chỉ số chuyển đổi.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'kɒst pɜːr liːd', vowels: ['ɒ', 'ɜː', 'iː'], consonants: ['k', 's', 't', 'p', 'r', 'l', 'd'], track: 'marketing', level: 'B1', wordStress: 'COST per LEAD', collocations: ['lower CPL', 'monitor CPL'], topicTags: ['ads', 'analytics'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_43', word: 'attribution', partOfSpeech: 'noun', definition: 'Assigning conversion credit.', vietnameseTranslation: 'Sự phân bổ (ghi nhận)', exampleSentence: 'Understand attribution.', exampleTranslation: 'Hiểu về sự phân bổ.', marketingContext: 'Đo lường chuyển đổi.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ˌætrɪˈbjuːʃən', vowels: ['æ', 'ɪ', 'uː', 'ə'], consonants: ['t', 'r', 'b', 'ʃ', 'n'], track: 'marketing', level: 'B2', wordStress: 'at-tri-BU-tion', collocations: ['attribution model', 'check attribution'], topicTags: ['ads', 'analytics'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_44', word: 'funnel', partOfSpeech: 'noun', definition: 'Stages of customer journey.', vietnameseTranslation: 'Phễu', exampleSentence: 'Optimize the funnel.', exampleTranslation: 'Tối ưu hóa phễu.', marketingContext: 'Chiến lược khách hàng.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'ˈfʌnəl', vowels: ['ʌ', 'ə'], consonants: ['f', 'n', 'l'], track: 'marketing', level: 'B1', wordStress: 'FUN-nel', collocations: ['top of funnel', 'bottom of funnel'], topicTags: ['ads', 'strategy'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_ads_45', word: 'remarketing', partOfSpeech: 'noun', definition: 'Re-engaging past users.', vietnameseTranslation: 'Tiếp thị lại', exampleSentence: 'Start remarketing.', exampleTranslation: 'Bắt đầu tiếp thị lại.', marketingContext: 'Chiến lược bám đuổi.', category: 'Ads & Performance', tags: ['marketing', 'ads'], ipa: 'riˈmɑːrkɪtɪŋ', vowels: ['i', 'ɑː', 'ɪ', 'ɪ'], consonants: ['r', 'm', 'r', 'k', 't', 'n'], track: 'marketing', level: 'B2', wordStress: 're-MAR-ket-ing', collocations: ['run remarketing', 'remarketing strategy'], topicTags: ['ads', 'retargeting'], sourceLessonIds: ['A1-M03'] },
  { id: 'm_cs_1', word: 'content', partOfSpeech: 'noun', definition: 'Information or material produced for an audience.', vietnameseTranslation: 'Nội dung', exampleSentence: 'Create engaging content.', exampleTranslation: 'Tạo nội dung hấp dẫn.', marketingContext: 'Tổng thể nội dung.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/ˈkɑntɛnt/', vowels: ['ɒ', 'ɛ'], consonants: ['k', 'n', 't', 'n', 't'], track: 'marketing', level: 'A1', wordStress: 'CON-tent', collocations: ['create content', 'content strategy'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'content', vietnameseMeaning: 'Nội dung', topic: 'Content & Social', marketingExample: 'Create engaging content.', familyLifeExample: 'The content of the book.' },
  { id: 'm_cs_2', word: 'content plan', partOfSpeech: 'noun', definition: 'A strategy for content creation.', vietnameseTranslation: 'Kế hoạch nội dung', exampleSentence: 'Follow the content plan.', exampleTranslation: 'Tuân theo kế hoạch nội dung.', marketingContext: 'Chiến lược nội dung.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/ˈkɑntɛnt plæn/', vowels: ['ɒ', 'ɛ', 'æ'], consonants: ['k', 'n', 't', 'n', 't', 'p', 'l', 'n'], track: 'marketing', level: 'A2', wordStress: 'CON-tent plan', collocations: ['create content plan', 'follow content plan'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'content plan', vietnameseMeaning: 'Kế hoạch nội dung', topic: 'Content & Social', marketingExample: 'Follow the content plan.', familyLifeExample: 'We made a plan for the weekend.' },
  { id: 'm_cs_3', word: 'content calendar', partOfSpeech: 'noun', definition: 'A schedule of content publishing.', vietnameseTranslation: 'Lịch nội dung', exampleSentence: 'Update the content calendar.', exampleTranslation: 'Cập nhật lịch nội dung.', marketingContext: 'Lịch xuất bản.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/ˈkɑntɛnt ˈkæləndər/', vowels: ['ɒ', 'ɛ', 'æ', 'ɪ', 'ə'], consonants: ['k', 'n', 't', 'n', 't', 'k', 'l', 'n', 'd', 'r'], track: 'marketing', level: 'A2', wordStress: 'CON-tent CAL-en-dar', collocations: ['update content calendar', 'plan content calendar'], topicTags: ['content-social', 'social-media'], sourceLessonIds: [], keyword: 'content calendar', vietnameseMeaning: 'Lịch nội dung', topic: 'Content & Social', marketingExample: 'Update the content calendar.', familyLifeExample: 'Check the family calendar.' },
  { id: 'm_cs_4', word: 'content pillar', partOfSpeech: 'noun', definition: 'A main theme for content.', vietnameseTranslation: 'Chủ đề chính nội dung', exampleSentence: 'Define content pillars.', exampleTranslation: 'Xác định các chủ đề chính.', marketingContext: 'Định hướng nội dung.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/ˈkɑntɛnt ˈpɪlər/', vowels: ['ɒ', 'ɛ', 'ɪ', 'ə'], consonants: ['k', 'n', 't', 'n', 't', 'p', 'l', 'r'], track: 'marketing', level: 'B1', wordStress: 'CON-tent PIL-lar', collocations: ['define content pillar', 'use content pillar'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'content pillar', vietnameseMeaning: 'Chủ đề chính nội dung', topic: 'Content & Social', marketingExample: 'Define content pillars.', familyLifeExample: 'Family values are our pillars.' },
  { id: 'm_cs_5', word: 'content brief', partOfSpeech: 'noun', definition: 'Instructions for content creators.', vietnameseTranslation: 'Bản hướng dẫn nội dung', exampleSentence: 'Read the content brief.', exampleTranslation: 'Đọc bản hướng dẫn nội dung.', marketingContext: 'Yêu cầu thực thi.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/ˈkɑntɛnt brif/', vowels: ['ɒ', 'ɛ', 'iː'], consonants: ['k', 'n', 't', 'n', 't', 'b', 'r', 'f'], track: 'marketing', level: 'B1', wordStress: 'CON-tent brief', collocations: ['write content brief', 'review content brief'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'content brief', vietnameseMeaning: 'Bản hướng dẫn nội dung', topic: 'Content & Social', marketingExample: 'Read the content brief.', familyLifeExample: 'The instructions are brief.' },
  { id: 'm_cs_6', word: 'creative brief', partOfSpeech: 'noun', definition: 'Instructions for designers/creative.', vietnameseTranslation: 'Bản hướng dẫn sáng tạo', exampleSentence: 'Submit the creative brief.', exampleTranslation: 'Gửi bản hướng dẫn sáng tạo.', marketingContext: 'Yêu cầu thực thi.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/kriˈeɪtɪv brif/', vowels: ['i', 'eɪ', 'ɪ', 'iː'], consonants: ['k', 'r', 't', 'v', 'b', 'r', 'f'], track: 'marketing', level: 'B1', wordStress: 'cre-A-tive brief', collocations: ['write creative brief', 'review creative brief'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'creative brief', vietnameseMeaning: 'Bản hướng dẫn sáng tạo', topic: 'Content & Social', marketingExample: 'Submit the creative brief.', familyLifeExample: 'Keep it creative.' },
  { id: 'm_cs_7', word: 'content angle', partOfSpeech: 'noun', definition: 'A unique perspective for content.', vietnameseTranslation: 'Góc tiếp cận nội dung', exampleSentence: 'Find a new content angle.', exampleTranslation: 'Tìm một góc tiếp cận mới.', marketingContext: 'Ý tưởng sáng tạo.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/ˈkɑntɛnt ˈæŋɡəl/', vowels: ['ɒ', 'ɛ', 'æ'], consonants: ['k', 'n', 't', 'n', 't', 'n', 'ɡ', 'l'], track: 'marketing', level: 'B1', wordStress: 'CON-tent AN-gle', collocations: ['find content angle', 'unique content angle'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'content angle', vietnameseMeaning: 'Góc tiếp cận nội dung', topic: 'Content & Social', marketingExample: 'Find a new content angle.', familyLifeExample: 'See it from another angle.' },
  { id: 'm_cs_8', word: 'key message', partOfSpeech: 'noun', definition: 'The core point of content.', vietnameseTranslation: 'Thông điệp chính', exampleSentence: 'Define the key message.', exampleTranslation: 'Xác định thông điệp chính.', marketingContext: 'Thông điệp truyền thông.', category: 'Content & Social', tags: ['content-social', 'copywriting'], ipa: '/ki ˈmɛsɪdʒ/', vowels: ['iː', 'ɛ', 'ɪ'], consonants: ['k', 'm', 's', 'dʒ'], track: 'marketing', level: 'A2', wordStress: 'key MES-sage', collocations: ['define key message', 'deliver key message'], topicTags: ['content-social', 'copywriting'], sourceLessonIds: [], keyword: 'key message', vietnameseMeaning: 'Thông điệp chính', topic: 'Content & Social', marketingExample: 'Define the key message.', familyLifeExample: 'The message is clear.' },
  { id: 'm_cs_9', word: 'target insight', partOfSpeech: 'noun', definition: 'A deep understanding of the user.', vietnameseTranslation: 'Thấu hiểu khách hàng', exampleSentence: 'Apply the target insight.', exampleTranslation: 'Áp dụng sự thấu hiểu khách hàng.', marketingContext: 'Nghiên cứu hành vi.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/ˈtɑrgɪt ˈɪnsaɪt/', vowels: ['ɑː', 'ɪ', 'ɪ', 'aɪ'], consonants: ['t', 'r', 'ɡ', 't', 'n', 's', 't'], track: 'marketing', level: 'B2', wordStress: 'TAR-get IN-sight', collocations: ['find target insight', 'apply target insight'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'target insight', vietnameseMeaning: 'Thấu hiểu khách hàng', topic: 'Content & Social', marketingExample: 'Apply the target insight.', familyLifeExample: 'Parents have insight into their kids.' },
  { id: 'm_cs_10', word: 'hook', partOfSpeech: 'noun', definition: 'A strong opening to grab attention.', vietnameseTranslation: 'Câu dẫn / Móc câu', exampleSentence: 'Write a strong hook.', exampleTranslation: 'Viết một câu dẫn mạnh mẽ.', marketingContext: 'Gây chú ý.', category: 'Content & Social', tags: ['content-social', 'social-media'], ipa: '/hʊk/', vowels: ['ʊ'], consonants: ['h', 'k'], track: 'marketing', level: 'A2', wordStress: 'HOOK', collocations: ['write hook', 'test hook'], topicTags: ['content-social', 'social-media'], sourceLessonIds: [], keyword: 'hook', vietnameseMeaning: 'Câu dẫn', topic: 'Content & Social', marketingExample: 'Write a strong hook.', familyLifeExample: 'Hang it on the hook.' },
  { id: 'm_cs_11', word: 'headline', partOfSpeech: 'noun', definition: 'The main title of content.', vietnameseTranslation: 'Tiêu đề', exampleSentence: 'Write a catchy headline.', exampleTranslation: 'Viết một tiêu đề bắt mắt.', marketingContext: 'Tiêu đề nội dung.', category: 'Content & Social', tags: ['content-social', 'copywriting'], ipa: '/ˈhɛdlaɪn/', vowels: ['ɛ', 'aɪ'], consonants: ['h', 'd', 'l', 'n'], track: 'marketing', level: 'A1', wordStress: 'HEAD-line', collocations: ['write headline', 'optimize headline'], topicTags: ['content-social', 'copywriting'], sourceLessonIds: [], keyword: 'headline', vietnameseMeaning: 'Tiêu đề', topic: 'Content & Social', marketingExample: 'Write a catchy headline.', familyLifeExample: 'The news headline is shocking.' },
  { id: 'm_cs_12', word: 'caption', partOfSpeech: 'noun', definition: 'The text under a post.', vietnameseTranslation: 'Chú thích / Nội dung bài đăng', exampleSentence: 'Write a long caption.', exampleTranslation: 'Viết một chú thích dài.', marketingContext: 'Nội dung bài đăng.', category: 'Content & Social', tags: ['content-social', 'social-media'], ipa: '/ˈkæpʃən/', vowels: ['æ', 'ə'], consonants: ['k', 'p', 'ʃ', 'n'], track: 'marketing', level: 'A1', wordStress: 'CAP-tion', collocations: ['write caption', 'engaging caption'], topicTags: ['content-social', 'social-media'], sourceLessonIds: [], keyword: 'caption', vietnameseMeaning: 'Chú thích', topic: 'Content & Social', marketingExample: 'Write a long caption.', familyLifeExample: 'Add a caption to the photo.' },
  { id: 'm_cs_13', word: 'call to action', partOfSpeech: 'phrase', definition: 'Encouraging user to take action.', vietnameseTranslation: 'Kêu gọi hành động', exampleSentence: 'Add a clear call to action.', exampleTranslation: 'Thêm một câu kêu gọi hành động rõ ràng.', marketingContext: 'Kết thúc bài đăng.', category: 'Content & Social', tags: ['content-social', 'copywriting'], ipa: '/ˌkɔl tə ˈækʃən/', vowels: ['ɔː', 'uː', 'æ', 'ə'], consonants: ['k', 'l', 't', 'k', 'ʃ', 'n'], track: 'marketing', level: 'A2', wordStress: 'CALL to AC-tion', collocations: ['add CTA', 'clear CTA'], topicTags: ['content-social', 'copywriting'], sourceLessonIds: [], keyword: 'call to action', vietnameseMeaning: 'Kêu gọi hành động', topic: 'Content & Social', marketingExample: 'Add a clear call to action.', familyLifeExample: 'My call to action is for the kids to clean up.' },
  { id: 'm_cs_14', word: 'ad copy', partOfSpeech: 'noun', definition: 'The text written for ads.', vietnameseTranslation: 'Nội dung quảng cáo', exampleSentence: 'Test the ad copy.', exampleTranslation: 'Kiểm tra nội dung quảng cáo.', marketingContext: 'Viết nội dung.', category: 'Content & Social', tags: ['content-social', 'copywriting'], ipa: '/æd ˈkɑpi/', vowels: ['æ', 'ɒ', 'i'], consonants: ['d', 'k', 'p'], track: 'marketing', level: 'A2', wordStress: 'AD COP-y', collocations: ['write ad copy', 'optimize ad copy'], topicTags: ['content-social', 'copywriting'], sourceLessonIds: [], keyword: 'ad copy', vietnameseMeaning: 'Nội dung quảng cáo', topic: 'Content & Social', marketingExample: 'Test the ad copy.', familyLifeExample: 'Write a copy of the key.' },
  { id: 'm_cs_15', word: 'copywriting', partOfSpeech: 'noun', definition: 'The art of writing persuasive text.', vietnameseTranslation: 'Viết nội dung quảng cáo', exampleSentence: 'Study copywriting.', exampleTranslation: 'Học về viết nội dung quảng cáo.', marketingContext: 'Viết nội dung.', category: 'Content & Social', tags: ['content-social', 'copywriting'], ipa: '/ˈkɑpiraɪtɪŋ/', vowels: ['ɒ', 'i', 'aɪ', 'ɪ'], consonants: ['k', 'p', 'r', 't', 'n'], track: 'marketing', level: 'B1', wordStress: 'COP-y-wri-ting', collocations: ['learn copywriting', 'improve copywriting'], topicTags: ['content-social', 'copywriting'], sourceLessonIds: [], keyword: 'copywriting', vietnameseMeaning: 'Viết nội dung quảng cáo', topic: 'Content & Social', marketingExample: 'Study copywriting.', familyLifeExample: 'He is good at copywriting.' },
  { id: 'm_cs_16', word: 'visual', partOfSpeech: 'noun', definition: 'Images or videos for content.', vietnameseTranslation: 'Hình ảnh / Video', exampleSentence: 'The visual is sharp.', exampleTranslation: 'Hình ảnh rất sắc nét.', marketingContext: 'Thiết kế sáng tạo.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/ˈvɪʒuəl/', vowels: ['ɪ', 'u', 'ə'], consonants: ['v', 'ʒ', 'l'], track: 'marketing', level: 'A2', wordStress: 'VIS-u-al', collocations: ['create visual', 'sharp visual'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'visual', vietnameseMeaning: 'Hình ảnh', topic: 'Content & Social', marketingExample: 'The visual is sharp.', familyLifeExample: 'The visual appeal of the room.' },
  { id: 'm_cs_17', word: 'visual concept', partOfSpeech: 'noun', definition: 'The idea behind the design.', vietnameseTranslation: 'Ý tưởng hình ảnh', exampleSentence: 'Discuss the visual concept.', exampleTranslation: 'Thảo luận về ý tưởng hình ảnh.', marketingContext: 'Thiết kế sáng tạo.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/ˈvɪʒuəl ˈkɑnsɛpt/', vowels: ['ɪ', 'u', 'ə', 'ɒ', 'ɛ'], consonants: ['v', 'ʒ', 'l', 'k', 'n', 's', 'p', 't'], track: 'marketing', level: 'B1', wordStress: 'VIS-u-al CON-cept', collocations: ['develop visual concept', 'review visual concept'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'visual concept', vietnameseMeaning: 'Ý tưởng hình ảnh', topic: 'Content & Social', marketingExample: 'Discuss the visual concept.', familyLifeExample: 'Concept of the new house.' },
  { id: 'm_cs_18', word: 'creative asset', partOfSpeech: 'noun', definition: 'Any content element.', vietnameseTranslation: 'Ấn phẩm sáng tạo', exampleSentence: 'Organize creative assets.', exampleTranslation: 'Sắp xếp các ấn phẩm sáng tạo.', marketingContext: 'Quản lý tài nguyên.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/kriˈeɪtɪv ˈæsɛt/', vowels: ['i', 'eɪ', 'ɪ', 'æ', 'ɛ'], consonants: ['k', 'r', 't', 'v', 's', 't'], track: 'marketing', level: 'A2', wordStress: 'cre-A-tive AS-set', collocations: ['manage creative asset', 'deliver creative asset'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'creative asset', vietnameseMeaning: 'Ấn phẩm sáng tạo', topic: 'Content & Social', marketingExample: 'Organize creative assets.', familyLifeExample: 'Assets of the company.' },
  { id: 'm_cs_19', word: 'design file', partOfSpeech: 'noun', definition: 'The source file for a design.', vietnameseTranslation: 'File thiết kế', exampleSentence: 'Where is the design file?', exampleTranslation: 'File thiết kế ở đâu?', marketingContext: 'Thiết kế sáng tạo.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/dɪˈzaɪn faɪl/', vowels: ['ɪ', 'aɪ', 'aɪ'], consonants: ['d', 'z', 'n', 'f', 'l'], track: 'marketing', level: 'A2', wordStress: 'de-SIGN file', collocations: ['send design file', 'open design file'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'design file', vietnameseMeaning: 'File thiết kế', topic: 'Content & Social', marketingExample: 'Where is the design file?', familyLifeExample: 'Design of the kitchen.' },
  { id: 'm_cs_20', word: 'thumbnail', partOfSpeech: 'noun', definition: 'A small preview image.', vietnameseTranslation: 'Ảnh thu nhỏ', exampleSentence: 'Make a better thumbnail.', exampleTranslation: 'Làm ảnh thu nhỏ tốt hơn.', marketingContext: 'Sáng tạo.', category: 'Content & Social', tags: ['content-social', 'social-media'], ipa: '/ˈθʌmˌneɪl/', vowels: ['ʌ', 'eɪ'], consonants: ['θ', 'm', 'b', 'n', 'l'], track: 'marketing', level: 'A1', wordStress: 'THUMB-nail', collocations: ['design thumbnail', 'eye-catching thumbnail'], topicTags: ['content-social', 'social-media'], sourceLessonIds: [], keyword: 'thumbnail', vietnameseMeaning: 'Ảnh thu nhỏ', topic: 'Content & Social', marketingExample: 'Make a better thumbnail.', familyLifeExample: 'The thumbnail is small.' },
  { id: 'm_cs_21', word: 'carousel post', partOfSpeech: 'noun', definition: 'Multiple images in one post.', vietnameseTranslation: 'Bài đăng dạng xoay (album)', exampleSentence: 'Create a carousel post.', exampleTranslation: 'Tạo một bài đăng dạng xoay.', marketingContext: 'Định dạng nội dung.', category: 'Content & Social', tags: ['content-social', 'social-media'], ipa: '/ˈkærəˌsɛl poʊst/', vowels: ['æ', 'ə', 'ɛ', 'oʊ'], consonants: ['k', 'r', 's', 'l', 'p', 's', 't'], track: 'marketing', level: 'A2', wordStress: 'CAR-ou-sel post', collocations: ['create carousel', 'post carousel'], topicTags: ['content-social', 'social-media'], sourceLessonIds: [], keyword: 'carousel post', vietnameseMeaning: 'Bài đăng dạng xoay', topic: 'Content & Social', marketingExample: 'Create a carousel post.', familyLifeExample: 'Riding a carousel.' },
  { id: 'm_cs_22', word: 'short-form video', partOfSpeech: 'noun', definition: 'Brief video content.', vietnameseTranslation: 'Video dạng ngắn', exampleSentence: 'Produce a short-form video.', exampleTranslation: 'Sản xuất video dạng ngắn.', marketingContext: 'Định dạng nội dung.', category: 'Content & Social', tags: ['content-social', 'social-media'], ipa: '/ˈʃɔrt fɔrm ˈvɪdioʊ/', vowels: ['ɔː', 'ɔː', 'ɪ', 'i', 'oʊ'], consonants: ['ʃ', 'r', 't', 'f', 'r', 'm', 'v', 'd'], track: 'marketing', level: 'A2', wordStress: 'SHORT-form VID-eo', collocations: ['create short-form video', 'edit short-form video'], topicTags: ['content-social', 'social-media'], sourceLessonIds: [], keyword: 'short-form video', vietnameseMeaning: 'Video dạng ngắn', topic: 'Content & Social', marketingExample: 'Produce a short-form video.', familyLifeExample: 'Watch a short video.' },
  { id: 'm_cs_23', word: 'talking-head video', partOfSpeech: 'noun', definition: 'Person speaking to camera.', vietnameseTranslation: 'Video nói chuyện trực diện', exampleSentence: 'Record a talking-head video.', exampleTranslation: 'Quay video nói chuyện trực diện.', marketingContext: 'Định dạng nội dung.', category: 'Content & Social', tags: ['content-social', 'social-media'], ipa: '/ˈtɔkɪŋ hɛd ˈvɪdioʊ/', vowels: ['ɔː', 'ɪ', 'ɛ', 'ɪ', 'i', 'oʊ'], consonants: ['t', 'k', 'n', 'h', 'd', 'v', 'd'], track: 'marketing', level: 'B1', wordStress: 'TALK-ing-head VID-eo', collocations: ['record talking-head', 'script talking-head'], topicTags: ['content-social', 'social-media'], sourceLessonIds: [], keyword: 'talking-head video', vietnameseMeaning: 'Video nói chuyện trực diện', topic: 'Content & Social', marketingExample: 'Record a talking-head video.', familyLifeExample: 'Talking head on TV.' },
  { id: 'm_cs_24', word: 'testimonial', partOfSpeech: 'noun', definition: 'Customer feedback.', vietnameseTranslation: 'Lời chứng thực', exampleSentence: 'Feature a customer testimonial.', exampleTranslation: 'Đưa lời chứng thực khách hàng vào.', marketingContext: 'Xây dựng lòng tin.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/ˌtɛstəˈmoʊniəl/', vowels: ['ɛ', 'ɪ', 'oʊ', 'i', 'ə'], consonants: ['t', 's', 't', 'm', 'n', 'l'], track: 'marketing', level: 'B2', wordStress: 'tes-ti-MO-ni-al', collocations: ['collect testimonial', 'feature testimonial'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'testimonial', vietnameseMeaning: 'Lời chứng thực', topic: 'Content & Social', marketingExample: 'Feature a customer testimonial.', familyLifeExample: 'Give a testimonial.' },
  { id: 'm_cs_25', word: 'user-generated content', partOfSpeech: 'noun', definition: 'Content created by customers.', vietnameseTranslation: 'Nội dung do người dùng tạo (UGC)', exampleSentence: 'Encourage user-generated content.', exampleTranslation: 'Khuyến khích tạo nội dung từ người dùng.', marketingContext: 'Chiến lược cộng đồng.', category: 'Content & Social', tags: ['content-social', 'social-media'], ipa: '/ˈju zər ˈdʒɛnəreɪtɪd ˈkɑntɛnt/', vowels: ['uː', 'ə', 'ɛ', 'ə', 'eɪ', 'ɪ', 'ɒ', 'ɛ'], consonants: ['j', 'z', 'r', 'dʒ', 'n', 'r', 't', 'd', 'k', 'n', 't', 'n', 't'], track: 'marketing', level: 'B2', wordStress: 'U-ser GEN-er-a-ted CON-tent', collocations: ['leverage UGC', 'encourage UGC'], topicTags: ['content-social', 'social-media'], sourceLessonIds: [], keyword: 'user-generated content', vietnameseMeaning: 'Nội dung do người dùng tạo', topic: 'Content & Social', marketingExample: 'Encourage user-generated content.', familyLifeExample: 'User content is great.' },
  { id: 'm_cs_26', word: 'social media post', partOfSpeech: 'noun', definition: 'Content shared on social media.', vietnameseTranslation: 'Bài đăng mạng xã hội', exampleSentence: 'Schedule the social media post.', exampleTranslation: 'Lên lịch bài đăng mạng xã hội.', marketingContext: 'Hoạt động hàng ngày.', category: 'Content & Social', tags: ['content-social', 'social-media'], ipa: '/ˈsoʊʃəl ˈmidiə poʊst/', vowels: ['oʊ', 'ə', 'iː', 'i', 'ə', 'oʊ'], consonants: ['s', 'ʃ', 'l', 'm', 'd', 'p', 's', 't'], track: 'marketing', level: 'A1', wordStress: 'SO-cial ME-dia post', collocations: ['create post', 'schedule post'], topicTags: ['content-social', 'social-media'], sourceLessonIds: [], keyword: 'social media post', vietnameseMeaning: 'Bài đăng mạng xã hội', topic: 'Content & Social', marketingExample: 'Schedule the social media post.', familyLifeExample: 'Post a family photo.' },
  { id: 'm_cs_27', word: 'engagement post', partOfSpeech: 'noun', definition: 'Post to drive interaction.', vietnameseTranslation: 'Bài đăng tương tác', exampleSentence: 'Create an engagement post.', exampleTranslation: 'Tạo một bài đăng tương tác.', marketingContext: 'Chiến lược tương tác.', category: 'Content & Social', tags: ['content-social', 'social-media'], ipa: '/ɪnˈɡeɪdʒmənt poʊst/', vowels: ['ɪ', 'eɪ', 'ə', 'oʊ'], consonants: ['n', 'ɡ', 'dʒ', 'm', 'n', 't', 'p', 's', 't'], track: 'marketing', level: 'B1', wordStress: 'en-GAGE-ment post', collocations: ['create engagement post', 'high engagement post'], topicTags: ['content-social', 'social-media'], sourceLessonIds: [], keyword: 'engagement post', vietnameseMeaning: 'Bài đăng tương tác', topic: 'Content & Social', marketingExample: 'Create an engagement post.', familyLifeExample: 'Engaging with family.' },
  { id: 'm_cs_28', word: 'organic reach', partOfSpeech: 'noun', definition: 'Reach without paying for ads.', vietnameseTranslation: 'Tiếp cận tự nhiên', exampleSentence: 'Improve organic reach.', exampleTranslation: 'Cải thiện tiếp cận tự nhiên.', marketingContext: 'Chỉ số đo lường.', category: 'Content & Social', tags: ['content-social', 'social-media'], ipa: '/ɔrˈɡænɪk ritʃ/', vowels: ['ɔː', 'æ', 'ɪ', 'iː'], consonants: ['r', 'ɡ', 'n', 'k', 'r', 'tʃ'], track: 'marketing', level: 'B1', wordStress: 'or-GAN-ic REACH', collocations: ['increase organic reach', 'monitor organic reach'], topicTags: ['content-social', 'social-media'], sourceLessonIds: [], keyword: 'organic reach', vietnameseMeaning: 'Tiếp cận tự nhiên', topic: 'Content & Social', marketingExample: 'Improve organic reach.', familyLifeExample: 'Reach for the stars.' },
  { id: 'm_cs_29', word: 'content format', partOfSpeech: 'noun', definition: 'Structure of the content.', vietnameseTranslation: 'Định dạng nội dung', exampleSentence: 'Choose the content format.', exampleTranslation: 'Chọn định dạng nội dung.', marketingContext: 'Định dạng.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/ˈkɑntɛnt ˈfɔrmæt/', vowels: ['ɒ', 'ɛ', 'ɔː', 'æ'], consonants: ['k', 'n', 't', 'n', 't', 'f', 'r', 'm', 't'], track: 'marketing', level: 'A2', wordStress: 'CON-tent FOR-mat', collocations: ['choose format', 'optimize format'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'content format', vietnameseMeaning: 'Định dạng nội dung', topic: 'Content & Social', marketingExample: 'Choose the content format.', familyLifeExample: 'Format the document.' },
  { id: 'm_cs_30', word: 'storytelling', partOfSpeech: 'noun', definition: 'Using narrative in marketing.', vietnameseTranslation: 'Kể chuyện (trong marketing)', exampleSentence: 'Master brand storytelling.', exampleTranslation: 'Làm chủ nghệ thuật kể chuyện thương hiệu.', marketingContext: 'Chiến lược sáng tạo.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/ˈstɔritɛlɪŋ/', vowels: ['ɔː', 'i', 'ɛ', 'ɪ'], consonants: ['s', 't', 'r', 't', 'l', 'n'], track: 'marketing', level: 'B2', wordStress: 'STO-ry-tel-ling', collocations: ['brand storytelling', 'marketing storytelling'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'storytelling', vietnameseMeaning: 'Kể chuyện', topic: 'Content & Social', marketingExample: 'Master brand storytelling.', familyLifeExample: 'Family storytelling.' },
  { id: 'm_cs_31', word: 'brand voice', partOfSpeech: 'noun', definition: 'Unique personality of the brand.', vietnameseTranslation: 'Giọng điệu thương hiệu', exampleSentence: 'Maintain the brand voice.', exampleTranslation: 'Duy trì giọng điệu thương hiệu.', marketingContext: 'Định hướng thương hiệu.', category: 'Content & Social', tags: ['content-social', 'copywriting'], ipa: '/brænd vɔɪs/', vowels: ['æ', 'ɔɪ'], consonants: ['b', 'r', 'n', 'd', 'v', 's'], track: 'marketing', level: 'B1', wordStress: 'BRAND voice', collocations: ['define brand voice', 'maintain brand voice'], topicTags: ['content-social', 'copywriting'], sourceLessonIds: [], keyword: 'brand voice', vietnameseMeaning: 'Giọng điệu thương hiệu', topic: 'Content & Social', marketingExample: 'Maintain the brand voice.', familyLifeExample: 'Listen to the brand voice.' },
  { id: 'm_cs_32', word: 'tone of voice', partOfSpeech: 'noun', definition: 'The emotion conveyed in text.', vietnameseTranslation: 'Giọng điệu truyền đạt', exampleSentence: 'Adjust the tone of voice.', exampleTranslation: 'Điều chỉnh giọng điệu truyền đạt.', marketingContext: 'Định hướng nội dung.', category: 'Content & Social', tags: ['content-social', 'copywriting'], ipa: '/toʊn əv vɔɪs/', vowels: ['oʊ', 'ə', 'ɔɪ'], consonants: ['t', 'n', 'v', 's'], track: 'marketing', level: 'B2', wordStress: 'TONE of voice', collocations: ['set tone of voice', 'adjust tone of voice'], topicTags: ['content-social', 'copywriting'], sourceLessonIds: [], keyword: 'tone of voice', vietnameseMeaning: 'Giọng điệu truyền đạt', topic: 'Content & Social', marketingExample: 'Adjust the tone of voice.', familyLifeExample: 'Tone of voice in a conversation.' },
  { id: 'm_cs_33', word: 'script', partOfSpeech: 'noun', definition: 'The written words for a video.', vietnameseTranslation: 'Kịch bản', exampleSentence: 'Write the video script.', exampleTranslation: 'Viết kịch bản video.', marketingContext: 'Sản xuất nội dung.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/skrɪpt/', vowels: ['ɪ'], consonants: ['s', 'k', 'r', 'p', 't'], track: 'marketing', level: 'A2', wordStress: 'SCRIPT', collocations: ['write script', 'edit script'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'script', vietnameseMeaning: 'Kịch bản', topic: 'Content & Social', marketingExample: 'Write the video script.', familyLifeExample: 'Write a script for the play.' },
  { id: 'm_cs_34', word: 'storyboard', partOfSpeech: 'noun', definition: 'Visual plan for a video.', vietnameseTranslation: 'Bảng phân cảnh', exampleSentence: 'Prepare the storyboard.', exampleTranslation: 'Chuẩn bị bảng phân cảnh.', marketingContext: 'Sản xuất nội dung.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/ˈstɔriˌbɔrd/', vowels: ['ɔː', 'i', 'ɔː'], consonants: ['s', 't', 'r', 'b', 'r', 'd'], track: 'marketing', level: 'B1', wordStress: 'STO-ry-board', collocations: ['create storyboard', 'follow storyboard'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'storyboard', vietnameseMeaning: 'Bảng phân cảnh', topic: 'Content & Social', marketingExample: 'Prepare the storyboard.', familyLifeExample: 'Draw a storyboard for the story.' },
  { id: 'm_cs_35', word: 'video editing', partOfSpeech: 'noun', definition: 'Processing raw video.', vietnameseTranslation: 'Chỉnh sửa video', exampleSentence: 'Start video editing.', exampleTranslation: 'Bắt đầu chỉnh sửa video.', marketingContext: 'Sản xuất nội dung.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/ˈvɪdioʊ ˈɛdɪtɪŋ/', vowels: ['ɪ', 'i', 'oʊ', 'ɛ', 'ɪ', 'ɪ'], consonants: ['v', 'd', 'd', 't', 'n'], track: 'marketing', level: 'A2', wordStress: 'VID-eo ED-i-ting', collocations: ['start video editing', 'manage video editing'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'video editing', vietnameseMeaning: 'Chỉnh sửa video', topic: 'Content & Social', marketingExample: 'Start video editing.', familyLifeExample: 'Editing home movies.' },
  { id: 'm_cs_36', word: 'revision', partOfSpeech: 'noun', definition: 'Changes made to content.', vietnameseTranslation: 'Sửa đổi / Chỉnh sửa', exampleSentence: 'Send a revision request.', exampleTranslation: 'Gửi yêu cầu chỉnh sửa.', marketingContext: 'Quy trình làm việc.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/riˈvɪʒən/', vowels: ['ɪ', 'ɪ', 'ə'], consonants: ['r', 'v', 'ʒ', 'n'], track: 'marketing', level: 'A2', wordStress: 're-VI-sion', collocations: ['request revision', 'make revision'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'revision', vietnameseMeaning: 'Chỉnh sửa', topic: 'Content & Social', marketingExample: 'Send a revision request.', familyLifeExample: 'Study for revision.' },
  { id: 'm_cs_37', word: 'feedback', partOfSpeech: 'noun', definition: 'Comments on work done.', vietnameseTranslation: 'Phản hồi / Góp ý', exampleSentence: 'The feedback is helpful.', exampleTranslation: 'Phản hồi rất hữu ích.', marketingContext: 'Quy trình làm việc.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/ˈfidbæk/', vowels: ['iː', 'æ'], consonants: ['f', 'd', 'b', 'k'], track: 'marketing', level: 'A1', wordStress: 'FEED-back', collocations: ['give feedback', 'receive feedback'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'feedback', vietnameseMeaning: 'Phản hồi', topic: 'Content & Social', marketingExample: 'The feedback is helpful.', familyLifeExample: 'Family feedback on dinner.' },
  { id: 'm_cs_38', word: 'approve a creative', partOfSpeech: 'phrase', definition: 'Confirm design is okay.', vietnameseTranslation: 'Phê duyệt ấn phẩm sáng tạo', exampleSentence: 'Please approve a creative.', exampleTranslation: 'Vui lòng phê duyệt ấn phẩm sáng tạo.', marketingContext: 'Quy trình làm việc.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/əˈpruv ə kriˈeɪtɪv/', vowels: ['ə', 'uː', 'ə', 'i', 'eɪ', 'ɪ'], consonants: ['p', 'r', 'v', 'k', 'r', 't', 'v'], track: 'marketing', level: 'B1', wordStress: 'ap-PROVE a cre-A-tive', collocations: ['need to approve', 'approve a creative quickly'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'approve a creative', vietnameseMeaning: 'Phê duyệt ấn phẩm sáng tạo', topic: 'Content & Social', marketingExample: 'Please approve a creative.', familyLifeExample: 'Approve the family trip.' },
  { id: 'm_cs_39', word: 'publish a post', partOfSpeech: 'phrase', definition: 'Go live with content.', vietnameseTranslation: 'Đăng bài', exampleSentence: 'Publish a post now.', exampleTranslation: 'Đăng bài ngay bây giờ.', marketingContext: 'Vận hành nội dung.', category: 'Content & Social', tags: ['content-social', 'social-media'], ipa: '/ˈpʌblɪʃ ə poʊst/', vowels: ['ʌ', 'ɪ', 'ə', 'oʊ'], consonants: ['p', 'b', 'l', 'ʃ', 'p', 's', 't'], track: 'marketing', level: 'A1', wordStress: 'PUB-lish a post', collocations: ['publish a post today', 'ready to publish a post'], topicTags: ['content-social', 'social-media'], sourceLessonIds: [], keyword: 'publish a post', vietnameseMeaning: 'Đăng bài', topic: 'Content & Social', marketingExample: 'Publish a post now.', familyLifeExample: 'Publish the family newsletter.' },
  { id: 'm_cs_40', word: 'content performance', partOfSpeech: 'noun', definition: 'How well content is doing.', vietnameseTranslation: 'Hiệu quả nội dung', exampleSentence: 'Analyze content performance.', exampleTranslation: 'Phân tích hiệu quả nội dung.', marketingContext: 'Đo lường.', category: 'Content & Social', tags: ['content-social', 'creative'], ipa: '/ˈkɑntɛnt pərˈfɔrməns/', vowels: ['ɒ', 'ɛ', 'ə', 'ɔː', 'ə'], consonants: ['k', 'n', 't', 'n', 't', 'p', 'r', 'f', 'r', 'm', 'n', 's'], track: 'marketing', level: 'B2', wordStress: 'CON-tent per-FOR-mance', collocations: ['monitor content performance', 'analyze content performance'], topicTags: ['content-social', 'creative'], sourceLessonIds: [], keyword: 'content performance', vietnameseMeaning: 'Hiệu quả nội dung', topic: 'Content & Social', marketingExample: 'Analyze content performance.', familyLifeExample: 'Analyze the student performance.' }
];

export const SEED_FORMULAS: FormulaItem[] = [
  {
    id: 'f_f1',
    structure: 'I usually + [verb]',
    purpose: 'Describe a regular daily habit.',
    purposeVi: 'Mô tả thói quen hàng ngày.',
    example: 'I usually wake up at 6 AM.',
    exampleVi: 'Tôi thường thức dậy lúc 6 giờ sáng.',
    usageTip: 'Sử dụng thì hiện tại đơn với các trạng từ chỉ tần suất.',
    category: 'Daily Routine',
    tags: ['family-life', 'home-routine'],
  },
  {
    id: 'f_f4',
    structure: 'Every morning, we + [verb]',
    purpose: 'Describe routine actions with family.',
    purposeVi: 'Mô tả thói quen cùng gia đình.',
    example: 'Every morning, we prepare breakfast.',
    exampleVi: 'Mỗi sáng, chúng tôi chuẩn bị bữa sáng.',
    usageTip: 'Dùng để nhấn mạnh thời gian và hành động cùng nhau.',
    category: 'Daily Routine',
    tags: ['family-life', 'meals'],
  },
  {
    id: 'f_f5',
    structure: 'My wife / husband usually + [verb]',
    purpose: 'Describe a family member\'s habit.',
    purposeVi: 'Mô tả thói quen của người thân.',
    example: 'My husband usually picks up the kids.',
    exampleVi: 'Chồng tôi thường đón con.',
    usageTip: 'Dùng thì hiện tại đơn với ngôi thứ 3 số ít.',
    category: 'Daily Routine',
    tags: ['family-life', 'parenting'],
  },
  {
    id: 'f_f2',
    structure: 'Can you + [verb]?',
    purpose: 'Ask someone to do a household task.',
    purposeVi: 'Yêu cầu ai đó làm việc nhà.',
    example: 'Can you wash the dishes?',
    exampleVi: 'Bạn có thể rửa bát được không?',
    usageTip: 'Cách yêu cầu thông thường, thân mật trong gia đình.',
    category: 'Household Tasks',
    tags: ['family-life', 'parenting'],
  },
  {
    id: 'f_f6',
    structure: 'Could you please + [verb]?',
    purpose: 'Ask someone politely to do a task.',
    purposeVi: 'Yêu cầu lịch sự.',
    example: 'Could you please take out the trash?',
    exampleVi: 'Bạn có thể vui lòng đổ rác được không?',
    usageTip: 'Cách yêu cầu lịch sự hơn.',
    category: 'Household Tasks',
    tags: ['family-life', 'home-routine'],
  },
  {
    id: 'f_f7',
    structure: 'I will + [verb]',
    purpose: 'State a future intention.',
    purposeVi: 'Nêu ý định tương lai.',
    example: 'I will cook dinner.',
    exampleVi: 'Tôi sẽ nấu bữa tối.',
    usageTip: 'Dùng để hứa hoặc quyết định làm việc gì đó.',
    category: 'Household Tasks',
    tags: ['family-life', 'home-routine'],
  },
  {
    id: 'f_f8',
    structure: 'I need to + [verb]',
    purpose: 'State a requirement.',
    purposeVi: 'Nêu nhu cầu.',
    example: 'I need to clean the room.',
    exampleVi: 'Tôi cần dọn phòng.',
    usageTip: 'Dùng để nói về nghĩa vụ hoặc nhu cầu.',
    category: 'Household Tasks',
    tags: ['family-life', 'home-routine'],
  },
  {
    id: 'f_f3',
    structure: 'We need to buy + [item]',
    purpose: 'State a shopping requirement.',
    purposeVi: 'Nêu nhu cầu mua sắm.',
    example: 'We need to buy milk.',
    exampleVi: 'Chúng ta cần mua sữa.',
    usageTip: 'Dùng khi lên kế hoạch đi chợ.',
    category: 'Shopping',
    tags: ['family-life', 'meals'],
  },
  {
    id: 'f_f9',
    structure: 'Do we have any + [item]?',
    purpose: 'Check inventory.',
    purposeVi: 'Kiểm tra hàng hóa còn không.',
    example: 'Do we have any vegetables?',
    exampleVi: 'Chúng ta còn rau củ không?',
    usageTip: 'Dùng khi kiểm tra tủ lạnh hoặc kệ đồ.',
    category: 'Shopping',
    tags: ['family-life', 'meals'],
  },
  {
    id: 'f_f10',
    structure: 'Let’s make + [meal]',
    purpose: 'Suggest a plan.',
    purposeVi: 'Gợi ý kế hoạch.',
    example: 'Let\'s make salad.',
    exampleVi: 'Hãy làm món salad đi.',
    usageTip: 'Dùng để gợi ý hành động cùng nhau.',
    category: 'Shopping',
    tags: ['family-life', 'meals'],
  },
  {
    id: 'f_f11',
    structure: 'I think we should + [verb]',
    purpose: 'Suggest an idea.',
    purposeVi: 'Gợi ý ý tưởng.',
    example: 'I think we should buy fruit.',
    exampleVi: 'Tôi nghĩ chúng ta nên mua trái cây.',
    usageTip: 'Dùng để đưa ra ý kiến nhẹ nhàng.',
    category: 'Shopping',
    tags: ['family-life', 'meals'],
  },
  {
    id: 'f_f12',
    structure: 'Today, I + [verb-ed]',
    purpose: 'Report past actions.',
    purposeVi: 'Báo cáo hành động đã xong.',
    example: 'Today, I cooked dinner.',
    exampleVi: 'Hôm nay, tôi đã nấu bữa tối.',
    usageTip: 'Dùng thì quá khứ đơn.',
    category: 'Daily Routine',
    tags: ['family-life', 'home-routine'],
  },
  {
    id: 'f_f13',
    structure: 'The kids + [verb-ed]',
    purpose: 'Report children\'s actions.',
    purposeVi: 'Báo cáo hành động của trẻ.',
    example: 'The kids went to school.',
    exampleVi: 'Các con đã đến trường.',
    usageTip: 'Dùng thì quá khứ đơn.',
    category: 'Daily Routine',
    tags: ['family-life', 'parenting'],
  },
  {
    id: 'f_f14',
    structure: 'We still need to + [verb]',
    purpose: 'Identify remaining tasks.',
    purposeVi: 'Xác định việc còn lại.',
    example: 'We still need to do laundry.',
    exampleVi: 'Chúng ta vẫn cần giặt quần áo.',
    usageTip: 'Dùng để nhắc nhở việc chưa xong.',
    category: 'Daily Routine',
    tags: ['family-life', 'home-routine'],
  },
  {
    id: 'f_f15',
    structure: 'Tomorrow, we should + [verb]',
    purpose: 'Plan future tasks.',
    purposeVi: 'Lên kế hoạch tương lai.',
    example: 'Tomorrow, we should go shopping.',
    exampleVi: 'Ngày mai, chúng ta nên đi mua sắm.',
    usageTip: 'Dùng để gợi ý kế hoạch cho ngày mai.',
    category: 'Daily Routine',
    tags: ['family-life', 'home-routine'],
  },
  {
    id: 'f1',
    structure: "I'm currently working on [Task/Asset] for [Campaign].",
    purpose: 'Report current active task with clear project scope',
    purposeVi: 'Báo cáo công việc hiện tại đang thực hiện kèm theo phạm vi chiến dịch rõ ràng',
    example: "I'm currently working on the TikTok video scripts for the Summer Splash campaign.",
    exampleVi: 'Tôi hiện đang làm các kịch bản video TikTok cho chiến dịch Summer Splash.',
    usageTip: "Sử dụng 'currently' và thì Hiện tại Tiếp diễn giúp sếp hoặc khách hàng biết bạn đang tích cực xử lý việc đó ngay lúc này.",
    category: 'Active Updates',
  tags: ['marketing'],
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
  tags: ['marketing'],
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
  tags: ['marketing'],
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
  tags: ['marketing'],
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
  tags: ['marketing'],
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
  tags: ['marketing'],
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
  tags: ['marketing'],
  },
];

export const LESSON_STEP_CONTENTS: Record<string, LessonStepContent> = {
  'a1-m03-l01': {
    context: {
      scenario: 'Your Marketing Manager pings you on Slack to ask for an immediate status update on the creative assets for the new TikTok summer campaign.',
      scenarioVi: 'Quản lý Marketing nhắn tin trên Slack hỏi bạn về tiến độ viết và thiết kế các phương án nội dung cho chiến dịch hè trên TikTok sắp tới.',
      role: 'Social Media Executive (Chuyên viên Mạng xã hội)',
      roleVi: 'Chịu trách nhiệm viết kịch bản, làm việc với designer và lên lịch bài đăng quảng cáo.',
      goal: 'Respond immediately using Present Continuous to describe what you are actively designing and writing copy for, avoiding generic words.',
      goalVi: 'Phản hồi ngay lập tức sử dụng thì Hiện tại Tiếp diễn để mô tả cụ thể bạn đang thiết kế và viết lời quảng cáo cho ấn phẩm nào.',
      marketingFocus: 'Present Continuous (Hiện tại tiếp diễn) & Marketing Action Verbs (drafting copy, designing visuals, editing hooks).',
    },
    vocabulary: {
      words: [
        SEED_VOCABULARY[10], // checking the campaign
        SEED_VOCABULARY[11], // writing a content brief
        SEED_VOCABULARY[12], // testing new creatives
        SEED_VOCABULARY[13], // reviewing performance data
        SEED_VOCABULARY[14], // waiting for the design file
      ],
      instruction: 'Learn these 5 crucial campaign phrases that agency leaders and performance teams use daily.',
      instructionVi: 'Học 5 cụm từ chiến dịch cốt lõi mà các sếp agency và đội ngũ tối ưu hóa hiệu quả sử dụng hàng ngày.',
    },
    formulas: {
      items: [
        SEED_FORMULAS[0], // I'm currently working on...
        SEED_FORMULAS[1], // I'm in the middle of...
      ],
      instruction: 'Use these structural templates to express active progress smoothly and sound organized.',
      instructionVi: 'Sử dụng các cấu trúc mẫu này để diễn tả tiến độ đang làm một cách trôi chảy và chuyên nghiệp.',
      breakdown: {
        structure: "I am + verb-ing + object.",
        detail: "Use this formula to explain exactly what work is active and in progress right now. It shows ownership, immediacy, and professional focus.",
        detailVi: "Sử dụng cấu trúc này để giải thích chính xác công việc nào đang được xử lý tích cực ngay lúc này. Cấu trúc này thể hiện sự chủ động, tính khẩn trương và sự tập trung chuyên nghiệp."
      },
      examples: [
        { english: "I am checking the campaign on TikTok Ads Manager.", vietnamese: "Tôi đang kiểm tra chiến dịch trên Trình quản lý quảng cáo TikTok.", context: "Media buying update" },
        { english: "We are writing a content brief for the TikTok influencer campaign.", vietnamese: "Chúng tôi đang viết bản yêu cầu nội dung cho chiến dịch influencer TikTok.", context: "Content team progress" },
        { english: "I am currently testing new creatives to find the best-performing video hook.", vietnamese: "Tôi hiện đang thử nghiệm các sản phẩm sáng tạo mới để tìm đoạn video thu hút hiệu quả nhất.", context: "Performance optimization" },
        { english: "I am waiting for the design file from our graphic designer before publishing the posts.", vietnamese: "Tôi đang chờ tệp thiết kế từ chuyên viên thiết kế đồ họa của chúng tôi trước khi đăng bài.", context: "Project status update" }
      ],
      mistakes: [
        {
          incorrect: "I checking the campaign.",
          correct: "I am checking the campaign.",
          errorType: "Missing Auxiliary Verb 'to be'",
          why: "The continuous form (-ing) ALWAYS requires the helping verb 'am/is/are' before it.",
          whyVi: "Thiếu động từ to be. Thể tiếp diễn (verb-ing) LUÔN đòi hỏi trợ động từ 'to be' (am/is/are) đi trước."
        },
        {
          incorrect: "I am check the campaign.",
          correct: "I am checking the campaign.",
          errorType: "Incorrect Verb Form",
          why: "After 'to be' (am), the main action verb must be in the progressive '-ing' form to express ongoing activity.",
          whyVi: "Sai dạng động từ. Sau 'to be' (am), động từ hành động chính phải ở dạng đuôi '-ing' để diễn tả hoạt động đang diễn ra."
        },
        {
          incorrect: "I am checking campaign.",
          correct: "I am checking the campaign.",
          errorType: "Missing Article",
          why: "Singular countable nouns like 'campaign' in professional marketing contexts need a determiner/article like 'the' or 'our'.",
          whyVi: "Thiếu mạo từ. Các danh từ đếm được số ít như 'campaign' trong ngữ cảnh tiếp thị chuyên nghiệp cần có từ xác định như 'the' hoặc 'our'."
        }
      ],
      sentenceBuilder: {
        subjects: ["I", "We", "The creative team", "The media buyer"],
        auxVerbs: ["am", "are", "is"],
        verbs: ["checking", "writing", "testing", "reviewing", "waiting for"],
        objects: ["the TikTok campaign", "a content brief", "new creatives", "performance data", "the design file"]
      }
    },
    input: {
      type: 'Reading',
      title: 'Slack Message from Marketing Manager (Hieu)',
      instruction: 'Read the urgent conversation on Slack from your Marketing Manager. Identify key requirements.',
      instructionVi: 'Đọc cuộc hội thoại khẩn cấp trên Slack từ Quản lý Marketing của bạn. Hãy nhận diện các yêu cầu cốt lõi.',
      material: "Hieu (Marketing Manager): 'Hey! Quick check, are you working on the copy variations for the TikTok summer campaign now? The client is asking for a preview.'\nYou: (Need to confirm that you are currently writing the ad copy and checking them against the creative brief.)",
      materialVi: "Hieu (Marketing Manager): 'Này! Kiểm tra nhanh chút, em có đang làm các phương án viết lời quảng cáo cho chiến dịch hè TikTok không? Khách hàng đang đòi xem trước.'\nBạn: (Cần xác nhận bạn đang viết nháp ad copy và kiểm tra kỹ đối chiếu với bản brief sáng tạo.)",
      conversations: [
        { sender: "Hieu (Marketing Manager)", message: "Hey! Quick check, are you working on the copy variations for the TikTok summer campaign now? The client is asking for a preview of the copy drafts.", messageVi: "Này! Kiểm tra nhanh chút, em đang làm các phương án viết lời quảng cáo cho chiến dịch hè TikTok không? Khách hàng đang đòi xem trước bản nháp copy đấy.", time: "10:14 AM" },
        { sender: "You (Social Media Exec)", message: "[Preparing reply... You need to confirm you are drafting them and checking against the brief.]", messageVi: "[Đang chuẩn bị trả lời... Bạn cần xác nhận mình đang viết nháp và đối chiếu với bản brief sáng tạo.]", time: "10:15 AM" }
      ],
      comprehensions: [
        {
          id: 'l01-comp1',
          prompt: "What task is actively happening now according to the conversation?",
          promptVi: "Công việc nào đang tích cực diễn ra ngay lúc này theo cuộc hội thoại?",
          options: [
            "Drafting the ad copy variations",
            "Editing video hooks",
            "Designing visual assets",
            "Negotiating influencer pricing"
          ],
          correctAnswer: "Drafting the ad copy variations",
          explanation: "The conversation says you need to write copy variations for the TikTok campaign.",
          explanationVi: "Cuộc đối thoại nói rằng bạn cần viết các phương án nội dung quảng cáo (copy variations) cho chiến dịch TikTok."
        },
        {
          id: 'l01-comp2',
          prompt: "What campaign channel is being discussed?",
          promptVi: "Kênh chiến dịch nào đang được thảo luận ở đây?",
          options: [
            "Facebook Ads",
            "Google Search Ads",
            "TikTok summer campaign",
            "Instagram Reels"
          ],
          correctAnswer: "TikTok summer campaign",
          explanation: "The manager asks: 'are you working on the copy variations for the TikTok summer campaign now?'",
          explanationVi: "Sếp hỏi rõ: 'em có đang làm các phương án viết lời quảng cáo cho chiến dịch hè TikTok không?'"
        },
        {
          id: 'l01-comp3',
          prompt: "What is the marketer actively checking their drafts against?",
          promptVi: "Người làm marketing đang chủ động kiểm tra bản nháp của họ đối chiếu với tài liệu nào?",
          options: [
            "The client's website",
            "Yesterday's budget spreadsheet",
            "The creative brief",
            "A competitor's TikTok account"
          ],
          correctAnswer: "The creative brief",
          explanation: "You need to confirm you are drafting copy variations and checking them against the creative brief.",
          explanationVi: "Bạn cần xác nhận rằng mình đang soạn thảo nội dung quảng cáo và kiểm tra kỹ đối chiếu với bản brief sáng tạo."
        }
      ]
    },
    practice: {
      instruction: 'Test your understanding of marketing active updates and Present Continuous structures.',
      instructionVi: 'Kiểm tra mức độ hiểu của bạn về cách cập nhật công việc hiện tại và cấu trúc Hiện tại tiếp diễn.',
      questions: [
        {
          id: 'l01-p1',
          type: 'reorder',
          prompt: "Reorder the words to form a correct marketing status update:",
          promptVi: "Sắp xếp các từ để tạo thành câu cập nhật trạng thái tiếp thị chính xác:",
          correctAnswer: "I am currently testing new creatives",
          reorderWords: ["testing", "currently", "I", "creatives", "am", "new"],
          explanation: "The correct structure is Subject (I) + auxiliary verb (am) + adverb (currently) + action verb-ing (testing) + object (new creatives).",
          explanationVi: "Cấu trúc đúng là Chủ ngữ (I) + trợ động từ (am) + trạng từ (currently) + động từ đuôi -ing (testing) + tân ngữ (new creatives)."
        },
        {
          id: 'l01-p2',
          type: 'fill_blank',
          prompt: "Select the correct form to complete the progress update: \"I am ________ a content brief for the TikTok summer campaign.\"",
          promptVi: "Chọn dạng đúng để hoàn thành câu cập nhật tiến độ: \"I am ________ a content brief for the TikTok summer campaign.\"",
          options: ["write", "wrote", "writing", "written"],
          correctAnswer: "writing",
          explanation: "Present continuous structure 'am + writing' represents an action in progress right now.",
          explanationVi: "Cấu trúc thì Hiện tại tiếp diễn 'am + writing' (đang viết) thể hiện một hành động đang thực hiện ngay lúc này."
        },
        {
          id: 'l01-p3',
          type: 'multiple_choice',
          prompt: "Which of the following is a grammatically CORRECT marketing status update?",
          promptVi: "Câu nào dưới đây là cập nhật trạng thái tiếp thị chính xác về mặt ngữ pháp?",
          options: [
            "I checking the campaign.",
            "I am check the campaign.",
            "I am checking the campaign.",
            "I am checking campaign."
          ],
          correctAnswer: "I am checking the campaign.",
          explanation: "This contains both the auxiliary verb 'am', the verb-ing form 'checking', and the required article 'the' before 'campaign'.",
          explanationVi: "Câu này chứa cả trợ động từ 'am', dạng động từ đuôi -ing 'checking', và mạo từ cần thiết 'the' trước danh từ 'campaign'."
        },
        {
          id: 'l01-p4',
          type: 'matching',
          prompt: "Match the English professional phrases to their Vietnamese meanings:",
          promptVi: "Ghép các cụm từ tiếng Anh chuyên ngành với nghĩa tiếng Việt tương ứng:",
          matchingPairs: [
            { english: "reviewing performance data", vietnamese: "đánh giá số liệu hiệu quả chiến dịch" },
            { english: "waiting for the design file", vietnamese: "đang chờ tệp thiết kế" },
            { english: "writing a content brief", vietnamese: "đang viết bản brief nội dung" }
          ],
          correctAnswer: "MATCH_ALL",
          explanation: "Reviewing performance data = đánh giá số liệu hiệu năng. Waiting for the design file = đang chờ tệp thiết kế. Writing a content brief = đang viết bản brief nội dung.",
          explanationVi: "Đây là các cụm từ vựng cốt lõi dùng để cập nhật tiến độ công việc hàng ngày trong marketing."
        }
      ]
    },
    output: {
      format: 'speaking',
      instruction: 'Now, write your real workplace reply! Apply the vocabulary and formulas you just learned.',
      instructionVi: 'Bây giờ, hãy viết câu trả lời thực tế tại công sở! Áp dụng các từ vựng và cấu trúc bạn vừa học.',
      prompt: "Reply to your manager in 3–4 sentences. Explain what you are working on, what is ready, and what you are waiting for.",
      promptVi: "Trả lời quản lý của bạn trong 3-4 câu. Giải thích bạn đang làm gì, cái gì đã xong, và bạn đang chờ cái gì.",
      placeholder: "e.g., Hi, yes! I'm currently drafting the TikTok ad copy variations. I have already completed...",
      sampleAnswer: "Hi! Yes, I'm currently drafting the TikTok ad copy variations. The key video script drafts are already completed and ready. I am just waiting for the design file from the creative team so that I can check the layouts before we share the final preview with the client.",
      pointsToInclude: [
        "Mention you are drafting the ad copy or checking against the creative brief",
        "State what is ready (such as the key copy directions)",
        "Explain that you are waiting for the design file from the creative team to check layouts"
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
      instructionVi: 'Sử dụng các mẫu này để phân định rõ ràng giữa việc đã hoàn thành, việc đang làm và việc đang bị tắc nghẽn.',
    },
    input: {
      type: 'Reading',
      title: 'Multi-Channel Campaign Board (Asana)',
      instruction: 'Examine the current status column cards on the marketing project board to report progress accurately.',
      instructionVi: 'Nghiên cứu các thẻ trạng thái hiện tại trên bảng dự án marketing để viết báo cáo tiến độ chuẩn xác.',
      material: "Weekly Status board for Summer Launch Campaign. Columns display tasks completed yesterday, ongoing today, and blocked items pending client sign-off.",
      materialVi: "Bảng trạng thái tuần của chiến dịch hè. Các cột hiển thị việc đã hoàn thành hôm qua, đang chạy hôm nay, và các việc bị kẹt chờ duyệt.",
      boardColumns: [
        {
          name: "Yesterday (Completed)",
          tasks: [
            { title: "Monthly ad budget report", status: "Completed", statusVi: "Đã hoàn thành" },
            { title: "Finalize visual brief", status: "Completed", statusVi: "Đã hoàn thành" }
          ]
        },
        {
          name: "Today (Ongoing)",
          tasks: [
            { title: "Test 3 new Facebook ad sets", status: "In Progress", statusVi: "Đang thực hiện" },
            { title: "Keyword optimization", status: "In Progress", statusVi: "Đang thực hiện" }
          ]
        },
        {
          name: "On Hold (Pending)",
          tasks: [
            { title: "Landing page launch", status: "Pending client sign-off", statusVi: "Chờ khách duyệt" }
          ]
        }
      ]
    },
    practice: {
      instruction: 'Identify correct task states and tense usage for project board updates.',
      instructionVi: 'Nhận biết các trạng thái nhiệm vụ chính xác và cách dùng thì để cập nhật bảng tiến độ dự án.',
      questions: [
        {
          id: 'q1',
          prompt: 'Based on the Asana board, what is the current status of the landing page launch?',
          promptVi: 'Dựa trên bảng Asana, trạng thái hiện tại của việc ra mắt landing page là gì?',
          options: [
            'Completed',
            'In Progress',
            'Pending client sign-off',
            'Cancelled'
          ],
          correctAnswer: 'Pending client sign-off',
          explanation: 'The landing page is in the "On Hold (Pending)" column, waiting for the client to approve it.',
          explanationVi: 'Trang landing page nằm ở cột "On Hold (Pending)", chờ khách hàng phê duyệt.'
        },
        {
          id: 'q2',
          prompt: 'If you are currently testing new Facebook ad sets, which category does this task belong to?',
          promptVi: 'Nếu bạn hiện đang kiểm tra các nhóm quảng cáo Facebook mới, nhiệm vụ này thuộc danh mục nào?',
          options: [
            'Yesterday (Completed)',
            'Today (Ongoing)',
            'On Hold (Pending)',
            'Backlog'
          ],
          correctAnswer: 'Today (Ongoing)',
          explanation: 'Tasks that you are actively working on right now belong in the "Ongoing" category (Present Continuous tense).',
          explanationVi: 'Các nhiệm vụ bạn đang chủ động làm ngay lúc này thuộc danh mục "Ongoing" (đang diễn ra, dùng thì Hiện tại tiếp diễn).'
        },
        {
          id: 'q3',
          prompt: 'Fill in the blank: "We _____ the final visual brief yesterday."',
          promptVi: 'Điền vào chỗ trống: "We _____ the final visual brief yesterday."',
          options: [
            'complete',
            'completed',
            'are completing',
            'have complete'
          ],
          correctAnswer: 'completed',
          explanation: 'Use Simple Past ("completed") for actions finished in the past with a specific time like "yesterday".',
          explanationVi: 'Sử dụng thì Quá khứ đơn ("completed") cho hành động đã xong trong quá khứ đi kèm thời gian cụ thể như "yesterday".'
        },
        {
          id: 'q4',
          prompt: 'Choose the correctly ordered sentence to report a blocked task:',
          promptVi: 'Chọn câu được sắp xếp đúng trật tự để báo cáo một nhiệm vụ bị nghẽn:',
          options: [
            'Pending the launch is client sign-off due to.',
            'The landing page launch is pending due to client sign-off.',
            'Client sign-off is landing page launch pending.',
            'The launch landing page pending due to client sign-off is.'
          ],
          correctAnswer: 'The landing page launch is pending due to client sign-off.',
          explanation: 'The correct structure is [Task] is pending due to [Reason].',
          explanationVi: 'Cấu trúc chính xác là [Nhiệm vụ] is pending due to [Lý do].'
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
      instructionVi: 'Các cấu trúc này giúp tránh chỉnh sửa thiết kế vô ích và giúp cả đội ngũ hiểu đúng mong muốn của khách.',
    },
    input: {
      type: 'Listening',
      title: 'Voice Memo & Slack Feedback from Account Manager (Giang)',
      instruction: 'Listen to the briefing from Giang, and compare it with the client email below.',
      instructionVi: 'Nghe Giang giải thích cuộc họp nhanh của team, và so sánh với email gốc của khách hàng ở dưới.',
      material: "Subject: RE: Banner Designs for Lotte Summer Fest\n\nHi team, thanks for sending the summer banners. They look okay, but they don't 'pop' enough. Can you make them feel more interactive and eye-catching? We need to launch ASAP.",
      materialVi: "Tiêu đề: RE: Thiết kế Banner cho Lotte Summer Fest\n\nChào team, cảm ơn team đã gửi thiết kế banner hè. Nhìn cũng được, nhưng chưa 'nổi bật' (pop) lắm. Team làm cho nó tạo cảm giác tương tác và bắt mắt hơn được không? Chúng tôi cần chạy gấp.",
      conversations: [
        { sender: "Giang (Account Manager)", message: "Hey! I just saw the client's email about the summer banners. They said they don't 'pop' enough and want them to feel more interactive.", messageVi: "Này! Mình vừa xem email của khách hàng về banner mùa hè. Họ bảo nó chưa đủ 'nổi bật' và muốn cảm giác tương tác nhiều hơn.", time: "9:05 AM" },
        { sender: "You (Designer)", message: "I see. But 'make it pop' is very subjective. Do they want brighter colors or bigger CTA buttons?", messageVi: "Mình hiểu rồi. Nhưng 'nổi bật' thì rất cảm tính. Họ muốn màu sắc sáng hơn hay nút kêu gọi hành động to hơn?", time: "9:06 AM" },
        { sender: "Giang (Account Manager)", message: "I'm not exactly sure. We need to figure this out fast because the campaign deadline is this Friday.", messageVi: "Mình không chắc lắm. Mình cần phải giải quyết việc này nhanh vì hạn chót chiến dịch là thứ Sáu tuần này.", time: "9:07 AM" },
        { sender: "You (Designer)", message: "Could you please clarify what they mean? Propose those two options. If we just guess, we might need multiple revisions and miss the deadline.", messageVi: "Bạn có thể vui lòng làm rõ ý họ là gì không? Hãy đề xuất hai lựa chọn đó. Nếu mình chỉ đoán, có thể phải sửa nhiều lần và lỡ hạn chót mất.", time: "9:08 AM" }
      ],
      comprehensions: [
        {
          id: 'l03-comp1',
          prompt: "Based on the dialogue, why is it important to clarify the feedback quickly?",
          promptVi: "Dựa vào đoạn hội thoại, tại sao việc làm rõ phản hồi nhanh chóng lại quan trọng?",
          options: [
            "Because the designer is going on vacation",
            "Because the campaign deadline is this Friday",
            "Because the client wants a new creative brief",
            "Because the Account Manager doesn't like the colors"
          ],
          correctAnswer: "Because the campaign deadline is this Friday",
          explanation: "Giang says they need to figure it out fast because the campaign deadline is this Friday.",
          explanationVi: "Giang nói rằng họ cần giải quyết việc này nhanh vì hạn chót của chiến dịch là thứ Sáu tuần này."
        }
      ]
    },
    practice: {
      instruction: 'Select the best clarification approaches to narrow down abstract requests.',
      instructionVi: 'Chọn cách đặt câu hỏi làm rõ tối ưu nhất để cụ thể hóa các yêu cầu trừu tượng.',
      questions: [
        {
          id: 'l03-p1',
          type: 'multiple_choice',
          prompt: "What is the designer asking the Account Manager to clarify based on the audio and client email?",
          promptVi: "Nhà thiết kế đang yêu cầu Account Manager làm rõ điều gì dựa vào âm thanh và email khách hàng?",
          options: [
            "Whether to change the color palette or the CTA button size to 'make it pop'",
            "Whether to cancel the campaign completely due to budget issues",
            "Whether to write a completely new blog post",
            "Whether to delay the deadline by two weeks"
          ],
          correctAnswer: "Whether to change the color palette or the CTA button size to 'make it pop'",
          explanation: "Providing specific options (changing the color palette vs. increasing CTA button size) is the standard professional way to clarify vague design terms.",
          explanationVi: "Đưa ra hai lựa chọn cụ thể (đổi tông màu sáng rực rỡ hơn hay phóng to nút CTA) là cách chuyên nghiệp chuẩn để làm rõ những từ nhận xét mơ hồ."
        },
        {
          id: 'l03-p2',
          type: 'fill_blank',
          prompt: "Listen to the audio dialogue. Fill in the missing professional keyword: \"Could you please ________ what the client means by interactive?\"",
          promptVi: "Nghe lại đoạn âm thanh. Điền từ chuyên ngành còn thiếu: \"Could you please ________ what the client means by interactive?\"",
          options: ["clarify", "clarified", "clarifying", "clarifies"],
          correctAnswer: "clarify",
          explanation: "The modal phrase 'Could you please + bare infinitive' is used to make a polite, direct request in the workplace.",
          explanationVi: "Cấu trúc lịch sự 'Could you please + động từ nguyên thể' dùng để đưa ra yêu cầu lịch sự tại công sở."
        },
        {
          id: 'l03-p3',
          type: 'matching',
          prompt: "Match the professional clarification phrases to their Vietnamese meanings:",
          promptVi: "Ghép các cụm từ làm rõ chuyên nghiệp với nghĩa tiếng Việt tương ứng:",
          matchingPairs: [
            { english: "Could you please clarify...?", vietnamese: "Anh/Chị vui lòng làm rõ...?" },
            { english: "To confirm, are we...?", vietnamese: "Để xác nhận lại, có phải chúng ta...?" },
            { english: "make it pop", vietnamese: "làm cho nổi bật/bắt mắt" }
          ],
          correctAnswer: "MATCH_ALL",
          explanation: "Using polite scoping phrases ensures precise design alignment and avoids wasted design cycles.",
          explanationVi: "Sử dụng các cấu trúc hỏi lịch sự giúp cả đội thống nhất tiến độ, tránh thiết kế sai hướng làm mất thời gian sửa chữa."
        }
      ]
    },
    output: {
      format: 'speaking',
      instruction: 'Draft a message to the Account Manager to request a clear scope definition.',
      instructionVi: 'Soạn một tin nhắn gửi Account Manager nhờ họ làm rõ yêu cầu của khách hàng.',
      prompt: "Ask the Account Manager to clarify the client feedback and confirm the deadline.",
      promptVi: "Yêu cầu Account Manager làm rõ phản hồi của khách hàng và xác nhận hạn chót.",
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
      instructionVi: 'Sử dụng các cấu trúc này để sắp xếp báo cáo nói giúp nhóm nhận biết ngay lập tức điểm nghẽn của bạn.',
    },
    input: {
      type: 'Listening',
      title: 'Team Morning Sync Transcript',
      instruction: 'Listen to and read how your team members structure their updates during daily Stand-ups.',
      instructionVi: 'Nghe và đọc cách đồng nghiệp sắp xếp phần báo cáo của họ trong buổi họp nhanh hàng ngày.',
      material: "Teammates Lan and Nam presenting their daily updates using the Progress, Plans, Blockers (PPP) method.",
      materialVi: "Lan và Nam trình bày báo cáo ngày theo phương pháp Tiến độ, Kế hoạch, Trở ngại (PPP).",
      conversations: [
        { sender: "Lan (Content Planner)", message: "Yesterday, I finalized the content calendar for June. Today, I am working with the designer on Instagram visual templates. I have no blockers.", messageVi: "Hôm qua, mình đã chốt lịch nội dung cho tháng 6. Hôm nay, mình đang phối hợp với designer để làm mẫu ảnh Instagram. Mình không gặp trở ngại gì.", time: "9:15 AM" },
        { sender: "Nam (Developer)", message: "Yesterday, I completed the landing page tracking pixel integration. Today, I'm focusing on testing conversion event triggers. My main blocker is slow mobile loading speed.", messageVi: "Hôm qua, mình đã tích hợp xong pixel theo dõi của landing page. Hôm nay, mình đang tập trung test các sự kiện chuyển đổi. Trở ngại chính là tốc độ tải trang trên di động còn chậm.", time: "9:16 AM" }
      ]
    },
    practice: {
      instruction: 'Rehearse the logical structure and clear wording of daily workspace stand-ups.',
      instructionVi: 'Thực hành cấu trúc logic và cách dùng từ rõ ràng trong các buổi họp sync hàng ngày.',
      questions: [
        {
          id: 'q1',
          prompt: 'Read the statement: "I am focusing on testing conversion event triggers." Which part of the stand-up does this belong to?',
          promptVi: 'Đọc câu sau: "I am focusing on testing conversion event triggers." Phần này thuộc về phần nào của báo cáo stand-up?',
          options: [
            'Yesterday (Completed)',
            'Today (Ongoing)',
            'Blocker (Problem)',
            'Next Step'
          ],
          correctAnswer: 'Today (Ongoing)',
          explanation: '"I am focusing on" indicates a current, ongoing task for today.',
          explanationVi: '"I am focusing on" (Tôi đang tập trung vào) chỉ ra một nhiệm vụ đang diễn ra trong ngày hôm nay.'
        },
        {
          id: 'q2',
          prompt: 'Fill in the blanks: "Yesterday, I ___ the content calendar. Today, I ___ with the designer."',
          promptVi: 'Điền vào chỗ trống: "Yesterday, I ___ the content calendar. Today, I ___ with the designer."',
          options: [
            'finalize / worked',
            'finalized / am working',
            'finalizing / work',
            'finalized / worked'
          ],
          correctAnswer: 'finalized / am working',
          explanation: 'Use Simple Past for yesterday ("finalized") and Present Continuous for today ("am working").',
          explanationVi: 'Dùng Quá khứ đơn cho việc hôm qua ("finalized") và Hiện tại tiếp diễn cho việc hôm nay ("am working").'
        },
        {
          id: 'q3',
          prompt: 'Choose the correctly ordered stand-up update:',
          promptVi: 'Chọn báo cáo stand-up được sắp xếp đúng trật tự:',
          options: [
            'Completed I yesterday the report. Am I today testing ads.',
            'Yesterday, I completed the report. Today, I am testing ads.',
            'Today I testing ads, completed the report yesterday I.',
            'The report completed yesterday I. Testing ads today am I.'
          ],
          correctAnswer: 'Yesterday, I completed the report. Today, I am testing ads.',
          explanation: 'The standard English sentence structure is Subject + Verb + Object. "Yesterday, I completed the report..." follows this correctly.',
          explanationVi: 'Cấu trúc câu tiếng Anh chuẩn là Chủ ngữ + Động từ + Tân ngữ. "Yesterday, I completed the report..." tuân theo đúng cấu trúc này.'
        },
        {
          id: 'q4',
          prompt: 'Which of the following is the most professional way to state a blocker?',
          promptVi: 'Cách nào dưới đây là cách chuyên nghiệp nhất để trình bày một trở ngại?',
          options: [
            'I can\'t work because I don\'t have TikTok access.',
            'My main blocker is lacking access to the TikTok Ads Manager, which is delaying the launch.',
            'Give me TikTok access now, I am blocked.',
            'TikTok is broken.'
          ],
          correctAnswer: 'My main blocker is lacking access to the TikTok Ads Manager, which is delaying the launch.',
          explanation: 'A professional blocker states the specific issue objectively and explains its impact (delaying the launch).',
          explanationVi: 'Một trở ngại chuyên nghiệp nêu rõ vấn đề cụ thể một cách khách quan và giải thích tác động của nó (làm chậm tiến độ ra mắt).'
        }
      ]
    },
    output: {
      format: 'speaking',
      instruction: 'Give your daily update message exactly as you would speak it in the team sync.',
      instructionVi: 'Đọc nội dung báo cáo ngày của bạn chính xác như cách bạn sẽ nói trong cuộc họp nhóm.',
      prompt: "Give a 30–45 second daily stand-up update using:\nYesterday, I...\nToday, I am...\nThe current result is...\nI need help with...\nMy next step is...",
      promptVi: "Thực hiện báo cáo nhanh 30-45 giây sử dụng:\nHôm qua, tôi...\nHôm nay, tôi đang...\nKết quả hiện tại là...\nTôi cần hỗ trợ với...\nBước tiếp theo của tôi là...",
      placeholder: "e.g., Hi team! Yesterday, I...",
      sampleAnswer: "Hi team, here is my stand-up update. Yesterday, I completed the monthly ad report. Today, I'm focusing on optimizing the Instagram campaign budgets. My main blocker is lacking access to the client's TikTok Ads Manager, which is delaying our campaign launch setup.",
      pointsToInclude: [
        "Divide into clear sections (Yesterday, Today, Blocker) or write a clean paragraph",
        "Use past tense for 'completed monthly ad report'",
        "Use present continuous or 'focusing on' for 'optimizing Instagram budgets'",
        "Identify 'lacking access to TikTok Ads Manager' as your primary blocker"
      ]
    }
  },
  'a1-m03-challenge': {
    context: {
      scenario: 'You are a performance marketer. Your manager needs an end-of-day update on the TikTok summer campaign.',
      scenarioVi: 'Bạn là chuyên viên quảng cáo (performance marketer). Quản lý của bạn cần một báo cáo cuối ngày về chiến dịch TikTok mùa hè.',
      role: 'Performance Marketer (Chuyên viên Chạy quảng cáo hiệu số)',
      roleVi: 'Chịu trách nhiệm thiết lập chiến dịch, kiểm tra ngân sách, và báo cáo tiến độ cuối ngày.',
      goal: 'Create both a written Slack update and a recorded update for your manager.',
      goalVi: 'Tạo cả báo cáo viết trên Slack và báo cáo ghi âm gửi cho quản lý.',
      marketingFocus: 'Comprehensive daily reporting using past, present continuous, and blockers.'
    },
    vocabulary: {
      words: [
        SEED_VOCABULARY[7], // CTR
        SEED_VOCABULARY[8], // Optimization
        SEED_VOCABULARY[2], // Blocker
      ],
      instruction: 'Review these key terms for campaign updates.',
      instructionVi: 'Ôn tập các thuật ngữ quan trọng này để cập nhật chiến dịch.'
    },
    formulas: {
      items: [
        SEED_FORMULAS[0], // Yesterday... Today...
        SEED_FORMULAS[2], // I've completed... and now focusing on...
        SEED_FORMULAS[3], // Project is pending...
      ],
      instruction: 'Combine these formulas to create a complete and professional status report.',
      instructionVi: 'Kết hợp các cấu trúc này để tạo một báo cáo trạng thái hoàn chỉnh và chuyên nghiệp.',
    },
    input: {
      type: 'Reading',
      title: 'Manager\'s Request',
      instruction: 'Read your manager\'s message and prepare your response.',
      instructionVi: 'Đọc tin nhắn của quản lý và chuẩn bị câu trả lời.',
      material: "Manager (Slack): 'Hi team, please drop your end-of-day updates for the TikTok Summer Campaign here. Make sure to include what's done, what you're working on, any current results, and if you have any blockers.'",
      materialVi: "Quản lý (Slack): 'Chào team, vui lòng để lại báo cáo cuối ngày cho chiến dịch TikTok mùa hè tại đây. Nhớ bao gồm việc đã làm xong, việc đang làm, kết quả hiện tại, và có trở ngại gì không.'",
    },
    practice: {
      instruction: 'Self-check before you create your final update.',
      instructionVi: 'Tự kiểm tra trước khi tạo báo cáo cuối cùng.',
      questions: [
        {
          id: 'q1',
          prompt: 'To successfully complete this challenge, your update MUST include:',
          promptVi: 'Để hoàn thành thử thách này, báo cáo của bạn BẮT BUỘC phải bao gồm:',
          options: [
            'Only what you completed today.',
            'Completed tasks, ongoing work, results, and blockers.',
            'A complaint about the design team.',
            'A request for a day off.'
          ],
          correctAnswer: 'Completed tasks, ongoing work, results, and blockers.',
          explanation: 'A comprehensive update covers all aspects of your progress and any help you need.',
          explanationVi: 'Một báo cáo toàn diện bao gồm mọi khía cạnh tiến độ của bạn và bất kỳ sự trợ giúp nào bạn cần.'
        }
      ]
    },
    output: {
      format: 'speaking',
      instruction: 'Create your final update. Record a 30-45 second audio OR write a 4-6 sentence transcript.',
      instructionVi: 'Tạo báo cáo cuối cùng. Ghi âm 30-45 giây HOẶC viết một transcript dài 4-6 câu.',
      prompt: "Provide an end-of-day update for the TikTok Summer Campaign. Include:\n- What you completed\n- What you are working on now\n- One current result\n- One blocker or support request\n- Next step",
      promptVi: "Cung cấp báo cáo cuối ngày cho chiến dịch TikTok mùa hè. Bao gồm:\n- Việc đã hoàn thành\n- Việc đang làm\n- Một kết quả hiện tại\n- Một trở ngại hoặc yêu cầu hỗ trợ\n- Bước tiếp theo",
      placeholder: "Hi Manager, here is my end-of-day update for the TikTok campaign...",
      sampleAnswer: "Hi Manager, here is my end-of-day update. I have completed the TikTok ad copy variations. Currently, I am testing the new video creatives. Initial results show a strong CTR of 2.5%. My main blocker is waiting for the client to approve the final budget. My next step is to launch the remaining ad sets tomorrow once approved.",
      pointsToInclude: [
        "State completed tasks clearly (e.g., 'I have completed...')",
        "State ongoing tasks (e.g., 'Currently, I am...')",
        "Mention a result (e.g., 'Initial results show...')",
        "Identify a blocker (e.g., 'My main blocker is...')",
        "Provide next steps"
      ]
    }
  },
  'a1-f01-l01': {
    context: {
      scenario: "You are explaining your family's weekday morning routine to a new friend.",
      scenarioVi: 'Bạn đang giải thích thói quen buổi sáng ngày thường của gia đình cho một người bạn mới.',
      role: 'Parent/Spouse',
      roleVi: 'Phụ huynh/Vợ chồng',
      goal: "Describe your family's normal weekday morning in 4-5 sentences.",
      goalVi: 'Mô tả buổi sáng ngày thường của gia đình bạn trong 4-5 câu.',
      marketingFocus: 'Family routines using Present Simple.'
    },
    vocabulary: {
      words: [{ id: 'f_v1', word: 'Wake up', partOfSpeech: 'verb', definition: 'To stop sleeping.', vietnameseTranslation: 'Thức dậy', exampleSentence: 'I wake up early.', exampleTranslation: 'Tôi dậy sớm.', marketingContext: '', category: 'Routine', tags: ['family-life'] }],
      instruction: 'Review these daily routine words.',
      instructionVi: 'Ôn tập từ vựng về thói quen hàng ngày.'
    },
    formulas: {
      items: [{ id: 'f_f1', structure: 'I usually + verb', purpose: 'Describe habit', purposeVi: 'Mô tả thói quen', example: 'I usually wake up early.', exampleVi: 'Tôi thường dậy sớm.', usageTip: '', category: 'Routine', tags: ['family-life'] }],
      instruction: 'Use these formulas to describe routines.',
      instructionVi: 'Sử dụng các cấu trúc này để mô tả thói quen.'
    },
    input: {
      type: 'Reading',
      title: "Friend's Question",
      instruction: 'Read what your friend asks.',
      instructionVi: 'Đọc câu hỏi của bạn bè.',
      material: '"How busy are your mornings? What do you usually do before work?"',
      materialVi: '"Buổi sáng của bạn bận rộn như thế nào? Bạn thường làm gì trước khi đi làm?"'
    },
    practice: {
      instruction: 'Answer the question.',
      instructionVi: 'Trả lời câu hỏi.',
      questions: [
        {
          id: 'q1',
          prompt: 'Which verb correctly completes: "I _____ up at 6 AM"?',
          promptVi: 'Động từ nào hoàn thành đúng: "I _____ up at 6 AM"?',
          options: ['wake', 'waking', 'woke', 'waken'],
          correctAnswer: 'wake',
          explanation: 'Use base verb for present simple.',
          explanationVi: 'Dùng động từ nguyên thể cho thì hiện tại đơn.'
        }
      ]
    },
    output: {
      format: 'speaking',
      instruction: "Describe your family's morning routine.",
      instructionVi: 'Mô tả thói quen buổi sáng của gia đình bạn.',
      prompt: "Describe your family's normal weekday morning in 4-5 sentences.",
      promptVi: 'Mô tả buổi sáng ngày thường của gia đình bạn trong 4-5 câu.',
      placeholder: 'Every morning, I usually...',
      sampleAnswer: 'Every morning, I usually wake up at 6 AM. I prepare breakfast for the family. My husband gets the kids dressed. Then, we take the children to school before going to work.',
      pointsToInclude: [
        'State your wake up time.',
        'Mention breakfast preparation.',
        'Mention getting ready.',
        'Mention going to school or work.'
      ]
    }
  },
  'a1-f01-l02': {
    context: {
      scenario: 'You need help with chores after work.',
      scenarioVi: 'Bạn cần giúp đỡ việc nhà sau giờ làm.',
      role: 'Parent/Spouse',
      roleVi: 'Phụ huynh/Vợ chồng',
      goal: 'Ask a family member for help with two household tasks.',
      goalVi: 'Nhờ người nhà giúp hai việc nhà.',
      marketingFocus: 'Requests and chores.'
    },
    vocabulary: {
      words: [{ id: 'f_v2', word: 'Wash the dishes', partOfSpeech: 'verb', definition: 'Clean plates.', vietnameseTranslation: 'Rửa bát', exampleSentence: 'Wash the dishes.', exampleTranslation: 'Rửa bát.', marketingContext: '', category: 'Chores', tags: ['family-life'] }],
      instruction: 'Review chore vocabulary.',
      instructionVi: 'Ôn tập từ vựng việc nhà.'
    },
    formulas: {
      items: [{ id: 'f_f2', structure: 'Can you + verb?', purpose: 'Make a request', purposeVi: 'Đưa ra yêu cầu', example: 'Can you wash the dishes?', exampleVi: 'Bạn rửa bát được không?', usageTip: '', category: 'Requests', tags: ['family-life'] }],
      instruction: 'Review request formulas.',
      instructionVi: 'Ôn tập cấu trúc yêu cầu.'
    },
    input: {
      type: 'Listening',
      title: 'Family Chat',
      instruction: 'Listen to the coordination.',
      instructionVi: 'Nghe cuộc thảo luận.',
      material: 'Hey, I will cook dinner tonight. Can you wash the dishes and take out the trash?',
      materialVi: 'Này, tối nay em sẽ nấu ăn. Anh rửa bát và đổ rác giúp em nhé?'
    },
    practice: {
      instruction: 'Answer the question.',
      instructionVi: 'Trả lời câu hỏi.',
      questions: [
        {
          id: 'q1',
          prompt: 'What task is requested?',
          promptVi: 'Việc nào được yêu cầu?',
          options: ['Wash the dishes', 'Cook dinner', 'Go shopping', 'Clean the room'],
          correctAnswer: 'Wash the dishes',
          explanation: 'The speaker asks "Can you wash the dishes?".',
          explanationVi: 'Người nói yêu cầu "Can you wash the dishes?".'
        }
      ]
    },
    output: {
      format: 'speaking',
      instruction: 'Make requests.',
      instructionVi: 'Đưa ra yêu cầu.',
      prompt: 'Ask a family member for help with two household tasks.',
      promptVi: 'Nhờ người nhà giúp hai việc nhà.',
      placeholder: 'Can you...',
      sampleAnswer: 'I am really tired today. Can you please wash the dishes and take out the trash?',
      pointsToInclude: [
        'Use "Can you..."',
        'Mention two tasks'
      ]
    }
  },
  'a1-f01-l03': {
    context: {
      scenario: 'You are planning dinner and need groceries.',
      scenarioVi: 'Bạn đang lên kế hoạch bữa tối và cần mua đồ.',
      role: 'Parent/Spouse',
      roleVi: 'Phụ huynh/Vợ chồng',
      goal: 'Write a short shopping list and 3 messages to plan dinner at home.',
      goalVi: 'Viết danh sách mua sắm ngắn và 3 tin nhắn lên kế hoạch bữa tối.',
      marketingFocus: 'Planning meals.'
    },
    vocabulary: {
      words: [{ id: 'f_v3', word: 'Groceries', partOfSpeech: 'noun', definition: 'Food.', vietnameseTranslation: 'Tạp hóa', exampleSentence: 'Buy groceries.', exampleTranslation: 'Mua tạp hóa.', marketingContext: '', category: 'Shopping', tags: ['family-life'] }],
      instruction: 'Review shopping vocabulary.',
      instructionVi: 'Ôn tập từ vựng mua sắm.'
    },
    formulas: {
      items: [{ id: 'f_f3', structure: 'We need to buy + item', purpose: 'State need', purposeVi: 'Nêu nhu cầu', example: 'We need to buy milk.', exampleVi: 'Chúng ta cần mua sữa.', usageTip: '', category: 'Shopping', tags: ['family-life'] }],
      instruction: 'Review planning formulas.',
      instructionVi: 'Ôn tập cấu trúc lên kế hoạch.'
    },
    input: {
      type: 'Reading',
      title: 'Dinner Chat',
      instruction: 'Read the chat.',
      instructionVi: 'Đọc tin nhắn.',
      material: '"What should we have for dinner? We are out of vegetables."',
      materialVi: '"Tối nay ăn gì nhỉ? Nhà hết rau rồi."'
    },
    practice: {
      instruction: 'Answer the question.',
      instructionVi: 'Trả lời câu hỏi.',
      questions: [
        {
          id: 'q1',
          prompt: 'What are they out of?',
          promptVi: 'Họ hết món gì?',
          options: ['Vegetables', 'Meat', 'Rice', 'Milk'],
          correctAnswer: 'Vegetables',
          explanation: 'The message says "We are out of vegetables."',
          explanationVi: 'Tin nhắn viết "We are out of vegetables."'
        }
      ]
    },
    output: {
      format: 'text',
      instruction: 'Write your messages.',
      instructionVi: 'Viết tin nhắn của bạn.',
      prompt: 'Write a short shopping list and 3 messages to plan dinner at home.',
      promptVi: 'Viết danh sách mua sắm ngắn và 3 tin nhắn lên kế hoạch bữa tối.',
      placeholder: "Let's make...",
      sampleAnswer: "Let's make chicken salad for dinner. We need to buy lettuce, tomatoes, and some chicken breast. I will stop by the supermarket on my way home.",
      pointsToInclude: [
        'Suggest a meal',
        'State what to buy',
        'Offer to go shopping'
      ]
    }
  },
  'a1-f01-l04': {
    context: {
      scenario: 'You are sharing an evening update with your family.',
      scenarioVi: 'Bạn đang chia sẻ cập nhật buổi tối với gia đình.',
      role: 'Parent/Spouse',
      roleVi: 'Phụ huynh/Vợ chồng',
      goal: 'Write a 4-6 sentence evening family update.',
      goalVi: 'Viết một cập nhật buổi tối dài 4-6 câu.',
      marketingFocus: 'Evening updates.'
    },
    vocabulary: {
      words: [{ id: 'f_v1', word: 'Wake up', partOfSpeech: 'verb', definition: 'To stop sleeping.', vietnameseTranslation: 'Thức dậy', exampleSentence: 'I wake up early.', exampleTranslation: 'Tôi dậy sớm.', marketingContext: '', category: 'Routine', tags: ['family-life'] }],
      instruction: 'Review vocabulary.',
      instructionVi: 'Ôn tập từ vựng.'
    },
    formulas: {
      items: [{ id: 'f_f1', structure: 'Today, I...', purpose: 'State past action', purposeVi: 'Nêu hành động đã qua', example: 'Today, I worked hard.', exampleVi: 'Hôm nay, tôi đã làm việc chăm chỉ.', usageTip: '', category: 'Updates', tags: ['family-life'] }],
      instruction: 'Review formulas.',
      instructionVi: 'Ôn tập cấu trúc.'
    },
    input: {
      type: 'Reading',
      title: 'Evening Sync',
      instruction: 'Read the context.',
      instructionVi: 'Đọc ngữ cảnh.',
      material: 'It is 8 PM. Time to catch up on the day and plan for tomorrow.',
      materialVi: 'Bây giờ là 8 giờ tối. Đã đến lúc xem lại một ngày và lên kế hoạch cho ngày mai.'
    },
    practice: {
      instruction: 'Answer the question.',
      instructionVi: 'Trả lời câu hỏi.',
      questions: [
        {
          id: 'q1',
          prompt: 'What is the purpose of this update?',
          promptVi: 'Mục đích của báo cáo này là gì?',
          options: ['Plan tomorrow', 'Go to sleep', 'Watch TV', 'Eat dinner'],
          correctAnswer: 'Plan tomorrow',
          explanation: 'It is to catch up and plan.',
          explanationVi: 'Để cập nhật tình hình và lên kế hoạch.'
        }
      ]
    },
    output: {
      format: 'speaking',
      instruction: 'Provide your update.',
      instructionVi: 'Cung cấp cập nhật của bạn.',
      prompt: 'Write a 4-6 sentence evening family update.',
      promptVi: 'Viết một cập nhật buổi tối dài 4-6 câu.',
      placeholder: 'Today, I...',
      sampleAnswer: 'Today, I had a very busy day at work. The kids finished their homework early. We still need to pack their bags for school. Tomorrow, we should wake up a bit earlier to avoid traffic.',
      pointsToInclude: [
        "Mention today's events",
        'Mention kids',
        'Mention what is left to do',
        'Plan for tomorrow'
      ]
    }
  },
  'a1-f01-challenge': {
    context: {
      scenario: 'Coordinate a busy weekday involving work, school, meals, and household tasks.',
      scenarioVi: 'Phối hợp một ngày trong tuần bận rộn bao gồm công việc, trường học, bữa ăn và việc nhà.',
      role: 'Parent/Spouse',
      roleVi: 'Phụ huynh/Vợ chồng',
      goal: 'Submit a written message (5-7 sentences) and an audio recording coordinating the day.',
      goalVi: 'Gửi một tin nhắn viết (5-7 câu) và một đoạn ghi âm phối hợp ngày.',
      marketingFocus: 'Comprehensive family coordination.'
    },
    vocabulary: {
      words: [{ id: 'f_v1', word: 'Wake up', partOfSpeech: 'verb', definition: 'To stop sleeping.', vietnameseTranslation: 'Thức dậy', exampleSentence: 'I wake up early.', exampleTranslation: 'Tôi dậy sớm.', marketingContext: '', category: 'Routine', tags: ['family-life'] }],
      instruction: 'Review all family vocabulary.',
      instructionVi: 'Ôn tập toàn bộ từ vựng gia đình.'
    },
    formulas: {
      items: [{ id: 'f_f1', structure: 'I usually + verb', purpose: 'Describe habit', purposeVi: 'Mô tả thói quen', example: 'I usually wake up early.', exampleVi: 'Tôi thường dậy sớm.', usageTip: '', category: 'Routine', tags: ['family-life'] }],
      instruction: 'Review all family formulas.',
      instructionVi: 'Ôn tập toàn bộ cấu trúc gia đình.'
    },
    input: {
      type: 'Reading',
      title: 'Busy Day Ahead',
      instruction: 'Read the situation.',
      instructionVi: 'Đọc tình huống.',
      material: 'Tomorrow is going to be very busy. You need to align with your partner on responsibilities.',
      materialVi: 'Ngày mai sẽ rất bận rộn. Bạn cần thống nhất trách nhiệm với bạn đời.'
    },
    practice: {
      instruction: 'Prepare for the challenge.',
      instructionVi: 'Chuẩn bị cho thử thách.',
      questions: [
        {
          id: 'q1',
          prompt: 'What must be included?',
          promptVi: 'Phải bao gồm những gì?',
          options: ['Routine, task, request, meal, plan', 'Only routine', 'Only meals', 'Nothing'],
          correctAnswer: 'Routine, task, request, meal, plan',
          explanation: 'It is a comprehensive update.',
          explanationVi: 'Đó là một bản cập nhật toàn diện.'
        }
      ]
    },
    output: {
      format: 'speaking',
      instruction: 'Record or write your update.',
      instructionVi: 'Ghi âm hoặc viết cập nhật của bạn.',
      prompt: "Provide a family coordination message (5-7 sentences) covering routine, a chore, a request, meal plan, and tomorrow's plan.",
      promptVi: 'Cung cấp tin nhắn phối hợp gia đình (5-7 câu) bao gồm thói quen, việc nhà, yêu cầu giúp đỡ, kế hoạch bữa ăn và kế hoạch ngày mai.',
      placeholder: 'Hi honey...',
      sampleAnswer: "Tomorrow morning, I will take the kids to school. Can you please do the laundry while I am out? For dinner, let's make spaghetti. We need to buy some pasta sauce on the way home. Tomorrow evening, we should go to bed early.",
      pointsToInclude: [
        'Routine',
        'Household task',
        'Request for help',
        'Meal or shopping plan',
        'Next-day plan'
      ]
    }
  }
};
