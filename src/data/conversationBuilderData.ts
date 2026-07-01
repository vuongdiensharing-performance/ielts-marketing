
export interface ResponseFlow {
  id: string;
  title: string;
  explanationVi: string;
  useCasesVi: string;
  structure: string[];
  exampleEn: string;
  exampleVi: string;
}

export interface Scenario {
  id: string;
  mode: 'marketing' | 'family' | 'ielts';
  title: string;
  intent: string;
  prompt: string;
  targetLevel: 'A1' | 'A2' | 'B1' | 'B2';
  flowType: string;
  blockLabels: string[];
  phraseBank: Record<string, string[]>;
  referenceResponse: string;
  referenceTranslationVi: string;
  practicalNoteVi: string;
}

export interface ApplyItCase {
  id: string;
  title: string;
  comparisons: { context: string; exampleEn: string; exampleVi: string; flow: string }[];
}

export interface Challenge {
  id: string;
  scenarioId: string;
  mode: 'marketing' | 'family' | 'ielts';
  title: string;
  intent: string;
  brief: string;
  targetLevel: 'A1' | 'A2' | 'B1' | 'B2';
  flowType: string;
  blockLabels: string[];
  phraseBank: Record<string, string[]>;
  referenceOutline: string[];
  referenceResponse: string;
  instructionsVi: string;
  selfReflection: string[];
}

export const RESPONSE_FLOWS: ResponseFlow[] = [
  {
    id: 'marketing-flow',
    title: 'Marketing & Work Flow',
    explanationVi: 'Sử dụng cấu trúc trực tiếp để đưa ra thông tin quan trọng một cách hiệu quả.',
    useCasesVi: 'Cập nhật tiến độ, báo cáo, thông báo lỗi.',
    structure: ['Context', 'Main update', 'Evidence / Reason', 'Next action'],
    exampleEn: 'Quick update: the campaign is performing below target because the current audience is too broad. I will review the segments and share a revised plan tomorrow.',
    exampleVi: 'Cập nhật nhanh: chiến dịch đang chạy dưới mục tiêu vì tệp khán giả hiện tại quá rộng. Tôi sẽ xem lại các phân khúc và chia sẻ kế hoạch sửa đổi vào ngày mai.'
  },
  {
    id: 'family-flow',
    title: 'Family Life Flow',
    explanationVi: 'Sử dụng cấu trúc nhẹ nhàng để phối hợp công việc gia đình.',
    useCasesVi: 'Phối hợp đón con, kế hoạch cuối tuần, thay đổi lịch trình.',
    structure: ['Request / Situation', 'Reason', 'Suggested plan', 'Check agreement'],
    exampleEn: 'Could you pick up the child today? I have a late meeting, so I may not get home before six. We can prepare dinner together when I arrive.',
    exampleVi: 'Hôm nay bạn có thể đón con giúp mình được không? Mình có cuộc họp muộn nên có thể không về nhà trước sáu giờ. Chúng ta có thể cùng chuẩn bị bữa tối khi mình về.'
  },
  {
    id: 'ielts-flow',
    title: 'IELTS Speaking Flow',
    explanationVi: 'Sử dụng cấu trúc logic để phát triển câu trả lời đầy đủ.',
    useCasesVi: 'Trả lời các câu hỏi về thói quen, ý kiến, mô tả.',
    structure: ['Direct answer / opinion', 'Reason', 'Example', 'Nuance / conclusion'],
    exampleEn: 'I think public transport should be more affordable because it can reduce traffic in large cities. For example, lower ticket prices may encourage more commuters to leave their cars at home.',
    exampleVi: 'Tôi nghĩ phương tiện công cộng nên giá cả phải chăng hơn vì nó có thể giảm ùn tắc giao thông ở các thành phố lớn. Ví dụ, giá vé thấp hơn có thể khuyến khích nhiều người đi làm hơn để xe ở nhà.'
  }
];

export const SCENARIOS: Scenario[] = [
  // Marketing (6)
  { id: 'm1', mode: 'marketing', title: 'Give status update', intent: 'Update team on campaign status', prompt: 'Your manager asks for the campaign progress.', targetLevel: 'B1', flowType: 'marketing-flow', blockLabels: ['Context', 'Main update', 'Reason', 'Next action'], phraseBank: { 'Context': ['Quick update on...', 'Just a heads-up on...'], 'Main update': ['The campaign is running...', 'We have achieved...'], 'Reason': ['because of...', 'due to...'], 'Next action': ['I will send...', 'Expect an update...'] }, referenceResponse: 'Quick update: our lead generation campaign is live. We have hit 80% of our daily target due to strong ad engagement. I will send the full report tomorrow.', referenceTranslationVi: 'Cập nhật nhanh: chiến dịch tạo khách hàng tiềm năng của chúng ta đã lên sóng. Chúng ta đã đạt 80% mục tiêu hàng ngày nhờ tương tác quảng cáo tốt. Tôi sẽ gửi báo cáo đầy đủ vào ngày mai.', practicalNoteVi: 'Đi thẳng vào vấn đề chính trước.' },
  { id: 'm2', mode: 'marketing', title: 'Explain performance issue', intent: 'Report a drop in performance', prompt: 'Your CTR dropped suddenly.', targetLevel: 'B2', flowType: 'marketing-flow', blockLabels: ['Context', 'Main update', 'Reason', 'Next action'], phraseBank: { 'Context': ['I noticed a dip in...', 'Regarding the performance...'], 'Main update': ['The CTR dropped...', 'We are seeing lower...'], 'Reason': ['since we launched...', 'as the creative...'], 'Next action': ['I am looking into...', 'We should adjust...'] }, referenceResponse: 'I noticed a dip in our CTR this morning. It dropped since we launched the new ad variant, likely as the creative is not resonating. I am looking into a new set of hooks.', referenceTranslationVi: 'Tôi nhận thấy tỷ lệ nhấp (CTR) giảm sáng nay. Nó đã giảm kể từ khi chúng ta ra mắt biến thể quảng cáo mới, có khả năng do thiết kế không hấp dẫn. Tôi đang xem xét một bộ tiêu đề (hook) mới.', practicalNoteVi: 'Chủ động đưa ra giải pháp.' },
  { id: 'm3', mode: 'marketing', title: 'Ask for clarification', intent: 'Clarify project brief', prompt: 'The creative brief is vague.', targetLevel: 'A2', flowType: 'marketing-flow', blockLabels: ['Context', 'Main update', 'Reason', 'Next action'], phraseBank: { 'Context': ['Regarding the brief...', 'Just a quick question about...'], 'Main update': ['could you clarify...', 'I am not sure about...'], 'Reason': ['as it seems...', 'to make sure...'], 'Next action': ['Could you send...', 'Please let me know...'] }, referenceResponse: 'Regarding the brief, could you clarify the target audience? It seems broad, and I want to make sure we align. Could you send the persona details?', referenceTranslationVi: 'Về bản tóm tắt, bạn có thể làm rõ đối tượng mục tiêu không? Nó có vẻ rộng, và tôi muốn chắc chắn chúng ta thống nhất. Bạn có thể gửi chi tiết chân dung khách hàng không?', practicalNoteVi: 'Đừng ngần ngại hỏi khi không rõ ràng.' },
  { id: 'm4', mode: 'marketing', title: 'Suggest an improvement', intent: 'Propose campaign optimization', prompt: 'Suggest changing ad budget.', targetLevel: 'B1', flowType: 'marketing-flow', blockLabels: ['Context', 'Main update', 'Reason', 'Next action'], phraseBank: { 'Context': ['I have an idea for...', 'Regarding campaign optimization...'], 'Main update': ['let us shift...', 'we should increase...'], 'Reason': ['since the CPA...', 'because the data shows...'], 'Next action': ['Let me know if...', 'I can prep...'] }, referenceResponse: 'I have an idea for our optimization. Let us shift 20% of the budget to Ad Set B since the CPA is lower there. Let me know if you agree.', referenceTranslationVi: 'Tôi có một ý tưởng cho việc tối ưu hóa của chúng ta. Hãy chuyển 20% ngân sách sang Nhóm quảng cáo B vì CPA ở đó thấp hơn. Cho tôi biết nếu bạn đồng ý.', practicalNoteVi: 'Luôn kèm theo dữ liệu hỗ trợ.' },
  { id: 'm5', mode: 'marketing', title: 'Request support', intent: 'Ask for help from teammate', prompt: 'You need design assets.', targetLevel: 'A2', flowType: 'marketing-flow', blockLabels: ['Context', 'Main update', 'Reason', 'Next action'], phraseBank: { 'Context': ['I need some support on...', 'Quick request for...'], 'Main update': ['could you design...', 'can you help me with...'], 'Reason': ['because we need...', 'to ensure...'], 'Next action': ['Please let me know...', 'Let me know by...'] }, referenceResponse: 'I need some support on the upcoming campaign. Could you design the banner by Thursday because we need to test it early? Please let me know if you have time.', referenceTranslationVi: 'Tôi cần hỗ trợ cho chiến dịch sắp tới. Bạn có thể thiết kế banner trước thứ Năm vì chúng ta cần kiểm tra sớm không? Cho tôi biết nếu bạn có thời gian.', practicalNoteVi: 'Đưa ra hạn chót cụ thể.' },
  { id: 'm6', mode: 'marketing', title: 'Update client', intent: 'Confirm next steps', prompt: 'Client asks for update.', targetLevel: 'B2', flowType: 'marketing-flow', blockLabels: ['Context', 'Main update', 'Reason', 'Next action'], phraseBank: { 'Context': ['Here is the update...', 'Regarding our project...'], 'Main update': ['we have completed...', 'we will proceed with...'], 'Reason': ['based on the results...', 'to ensure...'], 'Next action': ['I will send...', 'Looking forward to...'] }, referenceResponse: 'Here is the update: we have completed the review phase. Based on the results, we will proceed with audience expansion. I will send the final plan by Friday.', referenceTranslationVi: 'Đây là bản cập nhật: chúng ta đã hoàn thành giai đoạn xem xét. Dựa trên kết quả, chúng ta sẽ tiến hành mở rộng đối tượng. Tôi sẽ gửi kế hoạch cuối cùng vào thứ Sáu.', practicalNoteVi: 'Giữ sự chuyên nghiệp.' },
  // Family (6)
  { id: 'f1', mode: 'family', title: 'Help with task', intent: 'Request help', prompt: 'Ask partner to do dishes.', targetLevel: 'A1', flowType: 'family-flow', blockLabels: ['Request', 'Reason', 'Plan', 'Check'], phraseBank: { 'Request': ['Could you please...', 'Can you help with...'], 'Reason': ['because I have...', 'as I am...'], 'Plan': ['I will...', 'Maybe you can...'], 'Check': ['Is that okay?', 'Does that work?'] }, referenceResponse: 'Could you please do the dishes? I have a lot of work to finish. I will fold the clothes while you do that. Is that okay?', referenceTranslationVi: 'Bạn có thể rửa bát giúp mình được không? Mình còn nhiều việc phải hoàn thành. Mình sẽ gấp quần áo trong lúc bạn làm việc đó. Như vậy có được không?', practicalNoteVi: 'Luôn lịch sự.' },
  { id: 'f2', mode: 'family', title: 'Coordinate pickup', intent: 'Pickup child', prompt: 'Ask to pick up child.', targetLevel: 'A2', flowType: 'family-flow', blockLabels: ['Request', 'Reason', 'Plan', 'Check'], phraseBank: { 'Request': ['Could you pick up...', 'Can you go get...'], 'Reason': ['because I am...', 'as I will be...'], 'Plan': ['I will...', 'We can...'], 'Check': ['Does that work?', 'Is it okay?'] }, referenceResponse: 'Could you pick up the child at 5 PM? I am stuck in traffic. I will cook dinner when I get home. Does that work for you?', referenceTranslationVi: 'Bạn có thể đón con lúc 5 giờ chiều được không? Mình bị kẹt xe. Mình sẽ nấu bữa tối khi về đến nhà. Việc đó có ổn không?', practicalNoteVi: 'Rõ ràng về thời gian.' },
  { id: 'f3', mode: 'family', title: 'Suggest weekend plan', intent: 'Propose activity', prompt: 'Suggest a park trip.', targetLevel: 'A2', flowType: 'family-flow', blockLabels: ['Request', 'Reason', 'Plan', 'Check'], phraseBank: { 'Request': ['How about we...', 'Shall we...'], 'Reason': ['since the weather...', 'because we need...'], 'Plan': ['We can...', 'I will...'], 'Check': ['What do you think?', 'Are you up for it?'] }, referenceResponse: 'How about we go to the park this Saturday? Since the weather is nice, it will be fun. We can pack some snacks. What do you think?', referenceTranslationVi: 'Chúng ta đi công viên thứ Bảy này nhé? Vì thời tiết đẹp, sẽ rất vui đấy. Chúng ta có thể chuẩn bị ít đồ ăn nhẹ. Bạn nghĩ sao?', practicalNoteVi: 'Tập trung vào lợi ích chung.' },
  { id: 'f4', mode: 'family', title: 'Schedule change', intent: 'Explain delay', prompt: 'Explain you will be late.', targetLevel: 'B1', flowType: 'family-flow', blockLabels: ['Request', 'Reason', 'Plan', 'Check'], phraseBank: { 'Request': ['Sorry, I will be...', 'I need to change...'], 'Reason': ['as my meeting...', 'because of...'], 'Plan': ['I will be home by...', 'Can you...'], 'Check': ['Is it okay?', 'Does it bother you?'] }, referenceResponse: 'I am sorry, I will be late. My meeting is running over time. I will be home by 7 PM. Can you start without me?', referenceTranslationVi: 'Xin lỗi, mình sẽ về muộn. Cuộc họp của mình bị kéo dài. Mình sẽ về nhà lúc 7 giờ tối. Bạn có thể bắt đầu trước mà không cần mình không?', practicalNoteVi: 'Thẳng thắn.' },
  { id: 'f5', mode: 'family', title: 'Shopping/Meal plan', intent: 'Discuss groceries', prompt: 'Decide what to eat.', targetLevel: 'A2', flowType: 'family-flow', blockLabels: ['Request', 'Reason', 'Plan', 'Check'], phraseBank: { 'Request': ['What should we...', 'Can we plan...'], 'Reason': ['as we are out of...', 'because I want...'], 'Plan': ['I will buy...', 'You can...'], 'Check': ['Does that work?', 'What do you say?'] }, referenceResponse: 'What should we have for dinner? We are out of fresh vegetables. I will buy some after work. Does that work for you?', referenceTranslationVi: 'Tối nay chúng ta ăn gì nhỉ? Chúng ta hết rau tươi rồi. Mình sẽ mua một ít sau khi làm về. Việc đó có ổn không?', practicalNoteVi: 'Thiết thực.' },
  { id: 'f6', mode: 'family', title: 'Resolve disagreement', intent: 'Polite coordination', prompt: 'Disagree on weekend plan.', targetLevel: 'B2', flowType: 'family-flow', blockLabels: ['Request', 'Reason', 'Plan', 'Check'], phraseBank: { 'Request': ['I understand your idea...', 'Perhaps we can...'], 'Reason': ['but I think...', 'although I want...'], 'Plan': ['Maybe we can...', 'I suggest...'], 'Check': ['How does that sound?', 'Are you okay with that?'] }, referenceResponse: 'I understand your idea to go out, but I am quite tired. Perhaps we can stay home this time and go out next week? How does that sound?', referenceTranslationVi: 'Mình hiểu ý kiến đi chơi của bạn, nhưng mình khá mệt. Có lẽ chúng ta có thể ở nhà lần này và đi chơi vào tuần sau? Bạn thấy sao?', practicalNoteVi: 'Lắng nghe và thỏa hiệp.' },
  // IELTS (6)
  { id: 'i1', mode: 'ielts', title: 'Part 1: Daily routine', intent: 'Answer about routine', prompt: 'What is your typical day like?', targetLevel: 'A1', flowType: 'ielts-flow', blockLabels: ['Answer', 'Reason', 'Example', 'Conclusion'], phraseBank: { 'Answer': ['I usually...', 'My day starts with...'], 'Reason': ['because I prefer...', 'as it helps me...'], 'Example': ['For instance...', 'Usually...'], 'Conclusion': ['That is my routine.', 'It keeps me busy.'] }, referenceResponse: 'My day usually starts with a quick run. I prefer morning exercise because it helps me wake up. For instance, I feel more focused at work afterwards. That is my typical routine.', referenceTranslationVi: 'Ngày của tôi thường bắt đầu bằng việc chạy bộ nhanh. Tôi thích tập thể dục buổi sáng vì nó giúp tôi tỉnh táo. Ví dụ, tôi cảm thấy tập trung hơn vào công việc sau đó. Đó là thói quen điển hình của tôi.', practicalNoteVi: 'Sử dụng các trạng từ chỉ tần suất.' },
  { id: 'i2', mode: 'ielts', title: 'Part 1: Work or study', intent: 'Answer about work', prompt: 'What do you do?', targetLevel: 'A2', flowType: 'ielts-flow', blockLabels: ['Answer', 'Reason', 'Example', 'Conclusion'], phraseBank: { 'Answer': ['I am a...', 'I am studying...'], 'Reason': ['because it is...', 'as I find...'], 'Example': ['For example...', 'Like...'], 'Conclusion': ['I find it rewarding.', 'It is challenging.'] }, referenceResponse: 'I am a student majoring in economics. It is challenging because the subjects are difficult. For example, statistics takes a lot of time. I find it very rewarding.', referenceTranslationVi: 'Tôi là sinh viên chuyên ngành kinh tế. Nó rất thách thức vì các môn học khó. Ví dụ, môn thống kê mất rất nhiều thời gian. Tôi thấy nó rất bổ ích.', practicalNoteVi: 'Dùng từ vựng đúng ngữ cảnh.' },
  { id: 'i3', mode: 'ielts', title: 'Part 2: Describe experience', intent: 'Describe useful experience', prompt: 'Describe a useful experience.', targetLevel: 'B1', flowType: 'ielts-flow', blockLabels: ['Answer', 'Reason', 'Example', 'Conclusion'], phraseBank: { 'Answer': ['I would like to talk about...', 'One experience that was...'], 'Reason': ['because it helped me...', 'as I learned...'], 'Example': ['To illustrate...', 'In particular...'], 'Conclusion': ['Overall, it was...', 'Looking back...'] }, referenceResponse: 'I would like to talk about an online course I took. It was useful because it helped me learn new marketing tools. To illustrate, I used these tools for a recent campaign. Overall, it was a great experience.', referenceTranslationVi: 'Tôi muốn nói về một khóa học trực tuyến tôi đã tham gia. Nó hữu ích vì nó giúp tôi học các công cụ marketing mới. Để minh họa, tôi đã sử dụng các công cụ này cho một chiến dịch gần đây. Nhìn chung, đó là một trải nghiệm tuyệt vời.', practicalNoteVi: 'Kể chuyện một cách logic.' },
  { id: 'i4', mode: 'ielts', title: 'Part 2: Describe a person', intent: 'Describe a helper', prompt: 'Describe a helpful person.', targetLevel: 'B1', flowType: 'ielts-flow', blockLabels: ['Answer', 'Reason', 'Example', 'Conclusion'], phraseBank: { 'Answer': ['I would like to talk about...', 'A helpful person I know is...'], 'Reason': ['because they always...', 'as they are...'], 'Example': ['For example...', 'Specifically...'], 'Conclusion': ['I am grateful for...', 'They taught me...'] }, referenceResponse: 'I would like to talk about my mentor. They are very helpful because they always provide clear advice. Specifically, they helped me prepare for a big presentation last month. I am very grateful for their support.', referenceTranslationVi: 'Tôi muốn nói về người hướng dẫn của mình. Họ rất hay giúp đỡ vì họ luôn đưa ra lời khuyên rõ ràng. Cụ thể, họ đã giúp tôi chuẩn bị cho một bài thuyết trình lớn tháng trước. Tôi rất biết ơn sự hỗ trợ của họ.', practicalNoteVi: 'Sử dụng tính từ miêu tả.' },
  { id: 'i5', mode: 'ielts', title: 'Part 3: Give opinion', intent: 'Opinion on transport', prompt: 'Is public transport good?', targetLevel: 'B2', flowType: 'ielts-flow', blockLabels: ['Answer', 'Reason', 'Example', 'Conclusion'], phraseBank: { 'Answer': ['I believe...', 'From my perspective...'], 'Reason': ['since it provides...', 'as it is...'], 'Example': ['For instance...', 'A good example is...'], 'Conclusion': ['In conclusion, it is...', 'This leads to...'] }, referenceResponse: 'I believe public transport is essential for cities. Since it provides an affordable option, it reduces traffic congestion. A good example is the metro system in big cities which transports thousands. In conclusion, it is very beneficial.', referenceTranslationVi: 'Tôi tin rằng phương tiện công cộng là thiết yếu đối với các thành phố. Vì nó cung cấp một lựa chọn phải chăng, nó giảm ùn tắc giao thông. Một ví dụ điển hình là hệ thống tàu điện ngầm ở các thành phố lớn giúp vận chuyển hàng ngàn người. Tóm lại, nó rất có lợi.', practicalNoteVi: 'Đưa ra quan điểm rõ ràng.' },
  { id: 'i6', mode: 'ielts', title: 'Part 3: Compare viewpoints', intent: 'Compare opinions', prompt: 'Compare online vs offline.', targetLevel: 'B2', flowType: 'ielts-flow', blockLabels: ['Answer', 'Reason', 'Example', 'Conclusion'], phraseBank: { 'Answer': ['Some people argue...', 'While some prefer...', 'On the other hand...'], 'Reason': ['because it offers...', 'due to...'], 'Example': ['For example...', 'To be specific...'], 'Conclusion': ['In my view...', 'This suggests that...'] }, referenceResponse: 'While some prefer offline classes for interaction, others argue online classes are more flexible. Online classes are preferred due to convenience. For example, you can learn anywhere. In my view, a mix of both is best.', referenceTranslationVi: 'Trong khi một số người thích các lớp học trực tiếp vì tương tác, những người khác cho rằng các lớp học trực tuyến linh hoạt hơn. Các lớp học trực tuyến được ưa chuộng hơn nhờ sự tiện lợi. Ví dụ, bạn có thể học ở bất cứ đâu. Theo quan điểm của tôi, kết hợp cả hai là tốt nhất.', practicalNoteVi: 'Thể hiện tư duy phản biện.' }
];

export const APPLY_IT_CASES: ApplyItCase[] = [
  { id: 'case1', title: 'Ask for help', comparisons: [
    { context: 'Marketing', exampleEn: 'Could you support me with the design assets?', exampleVi: 'Bạn có thể hỗ trợ tôi với các tài nguyên thiết kế không?', flow: 'Context -> Request -> Reason' },
    { context: 'Family', exampleEn: 'Could you help me with the dishes?', exampleVi: 'Bạn có thể giúp mình rửa bát không?', flow: 'Request -> Reason' },
    { context: 'IELTS', exampleEn: 'It is essential for citizens to support one another for a better society.', exampleVi: 'Việc công dân hỗ trợ lẫn nhau là thiết yếu cho một xã hội tốt hơn.', flow: 'Opinion -> Reason' }
  ] },
  { id: 'case2', title: 'Explain a problem', comparisons: [
    { context: 'Marketing', exampleEn: 'The campaign is underperforming because of low engagement.', exampleVi: 'Chiến dịch đang hoạt động kém hiệu quả do tương tác thấp.', flow: 'Context -> Update -> Reason' },
    { context: 'Family', exampleEn: 'I will be late because I have a schedule conflict.', exampleVi: 'Mình sẽ về muộn vì có xung đột lịch trình.', flow: 'Request -> Reason -> Plan' },
    { context: 'IELTS', exampleEn: 'Pollution is a major issue because it harms public health.', exampleVi: 'Ô nhiễm là một vấn đề lớn vì nó gây hại cho sức khỏe công cộng.', flow: 'Opinion -> Reason -> Example' }
  ] },
  { id: 'case3', title: 'Suggest a solution', comparisons: [
    { context: 'Marketing', exampleEn: 'We should optimize our ad copy to lower the CPA.', exampleVi: 'Chúng ta nên tối ưu hóa nội dung quảng cáo để giảm CPA.', flow: 'Context -> Update -> Next Action' },
    { context: 'Family', exampleEn: 'Maybe we can prepare dinner together.', exampleVi: 'Có lẽ chúng ta có thể chuẩn bị bữa tối cùng nhau.', flow: 'Plan -> Check agreement' },
    { context: 'IELTS', exampleEn: 'I recommend the government should invest in green energy.', exampleVi: 'Tôi khuyến nghị chính phủ nên đầu tư vào năng lượng xanh.', flow: 'Opinion -> Example -> Conclusion' }
  ] }
];

export const CHALLENGES: Challenge[] = SCENARIOS.map((s, index) => {
  const isMarketing = s.mode === 'marketing';
  const isFamily = s.mode === 'family';
  const isIELTS = s.mode === 'ielts';

  let instructionsVi = 'Hãy chuẩn bị câu trả lời của bạn theo các bước.';
  if (isMarketing) instructionsVi = 'Hãy đưa ra cập nhật ngắn gọn và trực tiếp.';
  if (isFamily) instructionsVi = 'Hãy đề nghị một cách lịch sự và đề xuất giải pháp.';
  if (isIELTS) instructionsVi = 'Hãy trả lời rõ ràng và đưa ra ví dụ.';

  let selfReflection = ['Did I complete the selected response flow?'];
  if (isMarketing) selfReflection = ['Did I clearly state my main point?', 'Did I add a reason, detail or example?', 'Did I state a next action?'];
  if (isFamily) selfReflection = ['Did I clearly state my main point?', 'Did I add a reason, detail or example?', 'Did I include a practical request or suggested plan?'];
  if (isIELTS) selfReflection = ['Did I clearly state my main point?', 'Did I add a reason or example?', 'Did I avoid giving only a one-word answer?', 'Did I use an appropriate closing, next action or nuance?'];

  return {
    id: `c${index + 1}`,
    scenarioId: s.id,
    mode: s.mode,
    title: s.title,
    intent: s.intent,
    brief: s.prompt,
    targetLevel: s.targetLevel,
    flowType: s.flowType,
    blockLabels: s.blockLabels,
    phraseBank: s.phraseBank,
    referenceOutline: s.blockLabels,
    referenceResponse: s.referenceResponse,
    instructionsVi,
    selfReflection
  };
});
