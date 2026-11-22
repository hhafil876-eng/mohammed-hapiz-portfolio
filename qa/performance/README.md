# Portfolio performance verification

The baseline was the working tree at `854ee6d`, including the existing cursor and hero edits. The final audits used the production preview at 127.0.0.1:4189, Lighthouse 13.6.0 and headless Chrome 157. Each profile ran three times sequentially with simulated throttling, default storage reset and the same four audit categories. Desktop used the desktop preset. Mobile used Lighthouse defaults.

| Profile | Performance | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: |
| [Reported desktop baseline](../lighthouse/desktop.json) | 76 | 0.9 s | 490 ms | 0 |
| Final desktop median | 100 | 0.6 s | 10 ms | 0 |
| [Reported mobile baseline](../lighthouse/mobile.json) | 69 | 3.3 s | 1,150 ms | 0.003 |
| Final mobile median | 70 | 3.1 s | 1,000 ms | 0.003 |

Accessibility, Best Practices and SEO scored 100 in every final run. Mobile results varied substantially. The second mobile audit warned about slow host CPU. Mobile missed its median performance, LCP and TBT goals.

- Desktop runs scored [100](final-desktop-1.json), [94](final-desktop-2.json) and [100](final-desktop-3.json).
- Mobile runs scored [90](final-mobile-1.json), [67](final-mobile-2.json) and [70](final-mobile-3.json).
- The [fresh baseline](before-mobile.json) scored 65 on mobile. In the [baseline Chrome trace](before-mobile-0.trace.json), the largest layout took 402 ms over 2,046 objects. In the [first final mobile trace](final-mobile-1-0.trace.json), it took 88 ms over 210 objects. These are paired observations from individual runs.
- Files beginning with `after-` measure the intermediate version with portrait preloading and section containment, before the font and project layout changes.

The production page now discovers the portrait in HTML, serves its three existing Latin font families locally and skips rendering distant sections while keeping their content in the document. Project layout measurement starts as the section approaches. Three.js was absent from the production request list. Lighthouse identified roughly 22 KiB of Framer Motion unused during initial load. Later navigation and filter transitions use the library. No startup trace attributed a long task to cursor movement.

Chrome verified the portrait, cursor states, project filtering, popup opening and Escape dismissal, signal path, timeline, mobile section navigation, keyboard text selection and five navigation widths. Normal motion and reduced motion were both exercised. The final interaction run reported zero console errors or warnings. Physical-device performance and field Core Web Vitals remain unmeasured.
