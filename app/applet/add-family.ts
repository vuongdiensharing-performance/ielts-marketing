import * as fs from 'fs';
const extraVocab = `
  {
    id: 'f_v1',
    word: 'Wake up',
    partOfSpeech: 'verb',
    definition: 'To stop sleeping and open your eyes.',
    vietnameseTranslation: 'Thức dậy',
    exampleSentence: 'I usually wake up at 6 AM.',
    exampleTranslation: 'Tôi thường thức dậy lúc 6 giờ sáng.',
    marketingContext: 'Sử dụng hàng ngày để nói về thói quen.',
    category: 'Daily Routine',
    tags: ['family-life', 'home-routine'],
  }
];

export const SEED_FORMULAS: FormulaItem[] = [`;

const extraFormulas = `
  {
    id: 'f_f1',
    structure: 'I usually + [verb]',
    purpose: 'Describe a regular daily habit.',
    purposeVi: 'Mô tả thói quen hàng ngày.',
    example: 'I usually wake up early.',
    exampleVi: 'Tôi thường thức dậy sớm.',
    usageTip: 'Sử dụng thì hiện tại đơn với các trạng từ chỉ tần suất.',
    category: 'Daily Routine',
    tags: ['family-life', 'home-routine'],
  }
];

export const LESSON_CONTENT: Record<string, LessonStepContent> = {`;

const extraLessons = `
  'a1-f01-l01': {
    context: {
      scenario: 'You are explaining your family\\'s weekday morning routine to a new friend.',
      scenarioVi: 'Bạn đang giải thích thói quen buổi sáng ngày thường của gia đình cho một người bạn mới.',
      role: 'Parent/Spouse',
      roleVi: 'Phụ huynh/Vợ chồng',
      goal: 'Describe your family\\'s normal weekday morning in 4-5 sentences.',
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
      title: 'Friend\\'s Question',
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
      instruction: 'Describe your family\\'s morning routine.',
      instructionVi: 'Mô tả thói quen buổi sáng của gia đình bạn.',
      prompt: 'Describe your family\\'s normal weekday morning in 4-5 sentences.',
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
      words: [{ id: 'f_v1', word: 'Wash the dishes', partOfSpeech: 'verb', definition: 'Clean plates.', vietnameseTranslation: 'Rửa bát', exampleSentence: 'Wash the dishes.', exampleTranslation: 'Rửa bát.', marketingContext: '', category: 'Chores', tags: ['family-life'] }],
      instruction: 'Review chore vocabulary.',
      instructionVi: 'Ôn tập từ vựng việc nhà.'
    },
    formulas: {
      items: [{ id: 'f_f1', structure: 'Can you + verb?', purpose: 'Make a request', purposeVi: 'Đưa ra yêu cầu', example: 'Can you wash the dishes?', exampleVi: 'Bạn rửa bát được không?', usageTip: '', category: 'Requests', tags: ['family-life'] }],
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
      words: [{ id: 'f_v1', word: 'Groceries', partOfSpeech: 'noun', definition: 'Food.', vietnameseTranslation: 'Tạp hóa', exampleSentence: 'Buy groceries.', exampleTranslation: 'Mua tạp hóa.', marketingContext: '', category: 'Shopping', tags: ['family-life'] }],
      instruction: 'Review shopping vocabulary.',
      instructionVi: 'Ôn tập từ vựng mua sắm.'
    },
    formulas: {
      items: [{ id: 'f_f1', structure: 'We need to buy + item', purpose: 'State need', purposeVi: 'Nêu nhu cầu', example: 'We need to buy milk.', exampleVi: 'Chúng ta cần mua sữa.', usageTip: '', category: 'Shopping', tags: ['family-life'] }],
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
      format: 'writing',
      instruction: 'Write your messages.',
      instructionVi: 'Viết tin nhắn của bạn.',
      prompt: 'Write a short shopping list and 3 messages to plan dinner at home.',
      promptVi: 'Viết danh sách mua sắm ngắn và 3 tin nhắn lên kế hoạch bữa tối.',
      placeholder: 'Let\\'s make...',
      sampleAnswer: 'Let\\'s make chicken salad for dinner. We need to buy lettuce, tomatoes, and some chicken breast. I will stop by the supermarket on my way home.',
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
        'Mention today\\'s events',
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
      prompt: 'Provide a family coordination message (5-7 sentences) covering routine, a chore, a request, meal plan, and tomorrow\\'s plan.',
      promptVi: 'Cung cấp tin nhắn phối hợp gia đình (5-7 câu) bao gồm thói quen, việc nhà, yêu cầu giúp đỡ, kế hoạch bữa ăn và kế hoạch ngày mai.',
      placeholder: 'Hi honey...',
      sampleAnswer: 'Tomorrow morning, I will take the kids to school. Can you please do the laundry while I am out? For dinner, let\\'s make spaghetti. We need to buy some pasta sauce on the way home. Tomorrow evening, we should go to bed early.',
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
`;
let code = fs.readFileSync('src/data/seedData.ts', 'utf-8');
code = code.replace(/\];\s*export const SEED_FORMULAS: FormulaItem\[\] = \[/, extraVocab);
code = code.replace(/\];\s*export const LESSON_CONTENT: Record<string, LessonStepContent> = \{/, extraFormulas);
code = code.replace(/};\s*$/, extraLessons);
fs.writeFileSync('src/data/seedData.ts', code);
