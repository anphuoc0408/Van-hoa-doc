# TODO - LIVE LIKE HER StoryMap

## Mục tiêu
Biến website hiện tại thành cinematic interactive StoryMap đúng spec (6 slide + hero + timeline dots + fly-to/zoom + marker quote popup + toggle nhạc + dark/light + footer).

## Các bước thực hiện
1. [ ] Update `app/layout.tsx`: dùng `ThemeProvider`, chỉnh metadata title/description theo đề bài.
2. [ ] Update `app/page.tsx`: page chính chỉ render Hero + StoryMap cinematic (giữ navigation hiện tại).
3. [ ] Update `components/hero-section.tsx`: làm hero đúng text/CTA + animated line Sa Đéc → Paris → Vietnam + toggle nhạc (nếu gắn ở đây).
4. [ ] Replace hoàn toàn `components/story-map.tsx`: implement 6 slide spec + sticky timeline dots + scroll-triggered fly-to (pseudo SVG zoom/pan) + marker quote popup kiểu handwritten note + loading path + QR/particles ở slide 6.
5. [ ] Update `app/globals.css`: thêm styles paper texture, grain, parallax helpers, handwritten quote.
6. [ ] Lint/build: `pnpm lint` và `pnpm build`; smoke test `pnpm dev`.

