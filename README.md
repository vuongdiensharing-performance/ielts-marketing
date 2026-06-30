# Marketing English Lab

> Không phải một app học từ vựng đơn lẻ. Đây là workspace luyện **English for Marketing** và **Family Life English** theo ngữ cảnh công việc, cuộc họp, báo cáo, quảng cáo và đời sống hằng ngày.

[Open in Google AI Studio](https://ai.studio/apps/1583f73d-0547-4dc6-b4f4-6fafdf1d20f4)

## Mục tiêu sản phẩm

Marketing English Lab được xây cho người làm Marketing Việt Nam muốn dùng tiếng Anh trong công việc thật — không chỉ học nghĩa của từ.

Người học có thể luyện theo tình huống như:

- cập nhật tiến độ công việc và stand-up
- trao đổi campaign, creative, ads, metrics và báo cáo hiệu suất
- viết câu trả lời cho team/client
- phát âm từ vựng, cụm từ và câu mẫu
- thực hành giao tiếp Family Life: lịch sinh hoạt, việc nhà, ăn uống, chăm con và điều phối gia đình

## Những gì đang có

| Khu vực | Chức năng chính |
| --- | --- |
| Dashboard | Theo dõi tiến độ học, hoạt động và lối vào lesson hiện tại |
| Roadmap | Lộ trình Marketing English A1–B2 theo cấp độ và module |
| Skill Labs | Luyện Listening, Speaking, Reading, Writing theo ngữ cảnh |
| Lesson Workspace | Quy trình học 8 bước: Context → Vocabulary → Formula → Input → Guided Practice → Output → Feedback → Recap |
| Vocabulary | Tra cứu thuật ngữ, IPA, nghĩa Việt, chủ đề, ví dụ, bookmark, drawer chi tiết và phát âm |
| Structure | IPA, công thức câu, word transformation và Conversation Builder |
| Review | Ôn lại vocabulary / formula đã lưu |
| Analytics | Theo dõi hoạt động học và tiến độ |
| Voice Settings | Chọn voice đọc tiếng Anh/Việt, nghe thử và điều chỉnh tốc độ |
| Speaking Recorder | Ghi âm bằng trình duyệt, phát lại, xoá, ghi lại và lưu audio local-first |

## Nội dung học

### 1. Marketing English Roadmap

Lộ trình chính đi từ A1 đến B2:

- **A1 — The Survival Marketer**: giao tiếp nền tảng trong công việc Marketing.
- **A2 — The Data & Customer Explorer**: đọc số liệu, khách hàng và hành vi.
- **B1 — The Strategic Planner**: lập kế hoạch, trình bày ý tưởng và phối hợp team.
- **B2 — The Global Manager**: điều phối, báo cáo và trao đổi chiến lược ở cấp độ cao hơn.

Module nền tảng hiện có: **A1-M03 — Real-Time Work Updates**.

### 2. Family Life Practice

Family Life là practice track tách biệt với Marketing Roadmap, tập trung vào giao tiếp gia đình thực tế:

- daily routine và family schedule
- household tasks
- meals và shopping
- parenting và school
- requests và family coordination

Module nền tảng: **A1-F01 — Family Routines & Home Tasks**.

### 3. Vocabulary Library

Vocabulary Library hỗ trợ:

- search theo keyword, nghĩa Việt, IPA, collocations, topic và example
- filter theo track, chủ đề, level, bookmark và trạng thái có IPA
- phân trang linh hoạt **20 / 50 từ mỗi trang**
- table desktop 4 cột: `Keyword | Phiên âm | Chủ đề | Câu ví dụ`
- mobile card layout tối ưu thao tác
- bookmark và phát âm ngay tại hàng từ vựng
- detail drawer để xem định nghĩa, phonemes, stress, collocations và examples

Hiện data Marketing đang bao phủ các nhóm Ads & Performance, Content & Creative, Metrics & Reporting, Customer & Funnel, Strategy & Planning, Team & Client Communication. Family Life vocabulary tiếp tục được mở rộng theo pack riêng.

## Voice & Audio Notes

- English content ưu tiên **Google US English**, sau đó là Google UK English Female/Male khi thiết bị hỗ trợ.
- Linh chỉ dùng cho Vietnamese helper text, không dùng để đọc English vocabulary hay English examples.
- Voice availability phụ thuộc vào các giọng đã cài trong Chrome/macOS.
- Microphone có thể bị chặn trong AI Studio embedded preview iframe. Hãy mở app ở tab standalone / deployed HTTPS URL để kiểm tra recorder thật.

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Lucide React
- Web Speech API / SpeechSynthesis
- MediaRecorder + IndexedDB cho audio local-first
- Google GenAI SDK cho các tính năng AI khi được cấu hình

## Cấu trúc dự án

```text
src/
├── components/             # Views, drawers, recorder và UI modules
├── data/                   # Lesson seed data, vocabulary packs, audio helpers
├── hooks/                  # Shared hooks, gồm speech handling
├── App.tsx                 # App shell và state orchestration
├── types.ts                # Shared TypeScript contracts
├── index.css               # Global styles
└── main.tsx                # React entry point
```

Các file data quan trọng:

```text
src/data/seedData.ts              # Seed content nền tảng
src/data/vocabularyPack1C.ts      # Marketing Vocabulary Pack 1C
src/data/audioDB.ts               # IndexedDB helpers cho audio blobs
src/components/VocabularyView.tsx # Vocabulary filters, voice controls, pagination
```

## Chạy local

### Yêu cầu

- Node.js 20+ khuyến nghị
- npm

### Cài đặt

```bash
npm install
cp .env.example .env.local
npm run dev
```

Mặc định Vite chạy tại `http://localhost:3000`.

### Environment variables

```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
APP_URL="http://localhost:3000"
```

`GEMINI_API_KEY` chỉ cần khi chạy các luồng thực sự gọi Gemini API. Các phần local-first như Vocabulary, Review, UI navigation và browser speech fallback không nên phụ thuộc vào key này.

## Quality Checks

```bash
npm run lint
npm run build
npm run preview
```

- `npm run lint`: chạy TypeScript check qua `tsc --noEmit`.
- `npm run build`: build production bằng Vite.
- `npm run preview`: preview bản build local.

## Quy ước làm việc với GitHub

Để giữ `main` ổn định:

1. Tạo branch theo mục đích: `feat/...`, `fix/...`, `docs/...`.
2. Chỉ thay đổi đúng phạm vi task.
3. Mở Pull Request về `main`.
4. Smoke-test Preview trước khi merge nếu thay đổi UI, storage, recorder, speech hoặc vocabulary integration.
5. Không refactor storage/migration khi task không yêu cầu.

## Trạng thái phát triển

- [x] Marketing learning workspace foundation
- [x] Family Life practice track foundation
- [x] Vocabulary desktop/mobile library
- [x] Marketing Vocabulary Pack 1C + pagination
- [x] Voice Settings và browser speech fallback
- [x] Local-first browser audio recorder
- [ ] Family Life Vocabulary Pack 1
- [ ] Mở rộng Marketing vocabulary packs
- [ ] AI feedback production integration

## License

Marketing English Lab là dự án **proprietary / source-available**, không phải open source. Xem chi tiết tại [LICENSE](LICENSE).

Không sao chép, tái sử dụng, chỉnh sửa, phân phối hoặc thương mại hóa source code, nội dung học, vocabulary packs, giao diện hoặc thương hiệu khi chưa có chấp thuận bằng văn bản từ chủ sở hữu.
