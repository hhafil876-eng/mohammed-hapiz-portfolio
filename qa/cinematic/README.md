# Cinematic portfolio QA

Verified the production build locally in Chrome on the existing upgrade branch, starting from `80d6c6f`.

The hero uses the original WebP with an 11.4 KiB silhouette mask derived from the studio photograph. The mask removes the wall and leaves facial features intact. CSS orbits, a feathered base and layered graphite light replace the hero WebGL scene. The portrait appears directly beneath the name on narrow screens.

The cursor uses Framer Motion springs, a five-dot trail and a brief click pulse. Projects, Skills, Experience, Achievements and Contact share the silver and yellow motion treatments. The Electric Yellow Signal Path reveals once at the Projects, Experience and Contact headings. The timeline tracks scroll progress. The tablet header uses the compact menu.

| Result | Verification |
| --- | --- |
| PASS | Production build and browser runtime. Chrome reported zero console errors or uncaught exceptions during the primary run. |
| PASS | Portrait load, head and chin within crop, and document width at 1440, 1024, 768, 390 and 375 CSS pixels. Tablet menu fits. |
| PASS | Default, button, link and project cursor states, click pulse and native text entry pointer. |
| PASS | Hero action scrolls to Projects. AI filter returns DecoSpace and RAPHAEL. Section signal and timeline respond to scroll. |
| PASS | Dialog opening, initial focus, forward and reverse focus wrapping, Escape dismissal, focus restoration and backdrop dismissal. |
| PASS | Emulated touch menu, navigation to Projects and touch scrolling inside the mobile dialog. |
| PASS | Reduced-motion title, native cursor and scroll behavior. Resume download produced a PDF. Empty contact form displays validation errors. |
| PASS | Six project destination URLs returned HTTP 200 across GitHub and Vercel. |
| FAIL | LinkedIn returned HTTP 999 to the automated request. Profile availability is unconfirmed. |
| NOT TESTED | Physical touch devices, Safari, Firefox, screen readers, live contact delivery, frame-rate and Core Web Vitals measurements. |

## Screenshots

| View | Captures |
| --- | --- |
| Hero | [1440px](hero-1440.jpg) · [1024px](hero-1024.jpg) · [768px](hero-768.jpg) · [390px](hero-390.jpg) · [375px](hero-375.jpg) |
| Cursor and dialog | [Default reticle](cursor-default.jpg) · [Project hover](cursor-project.jpg) · [Project dialog](popup.jpg) |
| Sections | [Projects](projects.jpg) · [Skills](skills.jpg) · [Experience](experience.jpg) · [Achievements](achievements.jpg) · [Contact](contact.jpg) |
