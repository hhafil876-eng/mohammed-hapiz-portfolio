# Mobile performance investigation

Each audit used the local production preview, a fresh headless Chrome profile, extensions and background networking disabled, and Lighthouse's default simulated mobile throttling (412 ? 823 CSS pixels, 150 ms RTT and 4? CPU slowdown). Runs were sequential. Browser interaction tests ran separately. The host was shared and CPU speed was not pinned.

| Build and run | Performance | CPU benchmark index | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [baseline 1](baseline-1.json) | 87 | 1732 | 2.8 s | 360 ms | 0.003 |
| [baseline 2](baseline-2.json) | 64 | 735.5 | 2.9 s | 3,580 ms | 0.003 |
| [baseline 3](baseline-3.json) | 62 | 740.5 | 3.2 s | 2,460 ms | 0.003 |
| [optimized 1](optimized-1.json) | 74 | 1512 | 2.8 s | 1,010 ms | 0.003 |
| [optimized 2](optimized-2.json) | 66 | 740.5 | 2.9 s | 2,750 ms | 0.003 |
| [optimized 3](optimized-3.json) | 68 | 741.5 | 2.9 s | 1,700 ms | 0.003 |
| [split 1](split-1.json) | 75 | 1541.5 | 3.2 s | 740 ms | 0.003 |
| [split 2](split-2.json) | 63 | 710 | 3.4 s | 2,330 ms | 0.003 |
| [split 3](split-3.json) | 63 | 747 | 3.4 s | 2,300 ms | 0.003 |

All nine runs scored 100 for Accessibility, Best Practices and SEO. The retained build is **optimized**. The **split** trial deferred initialization with five lazy-loaded section chunks and increased median LCP to 3.4 seconds. The rebuilt retained bundle matched the audited JavaScript and CSS filenames.

## Attribution

In the historical 90/67/70 series, Lighthouse measured CPU benchmark indices of 1891/735/742. Style and layout took 1.50/2.60/2.52 seconds and script evaluation took 0.48/0.74/0.74 seconds. The two slow reports attributed 716 and 734 ms tasks to Framer Motion, including approximately 265 and 275 ms of forced layout while reading scroll geometry. The app bundle accounted for separate 448 and 456 ms tasks. All network requests in these reports were local. Raw historical traces were only saved for the first of those three final runs.

The retained change uses the browser's scroll timeline for the navigation progress bar where supported. Experience timeline measurements attach near the section. Reduced motion keeps the experience line static. The prior implementation subscribed to both document and offscreen target measurements at startup.

The isolated baseline still varied from 62 to 87. Two slow baseline runs each included a task over two seconds that Lighthouse could not attribute to a URL. CPU variability amplifies page costs, but the reports cannot identify a particular competing process. In the retained build's two slow runs, the longest tasks (1154 and 864 ms) were also unattributed. Render and layout work and initial app execution remain. A 64 to 68 median performance improvement and a 2460 to 1700 ms median TBT reduction in this batch do not establish field performance or a repeatable 85+ score.

## Traces

- [Baseline Chrome trace](baseline-1-0.trace.json)
- [Retained build Chrome trace](optimized-1-0.trace.json)
- [Discarded split experiment Chrome trace](split-1-0.trace.json)

## Verification

PASS � Production build, portrait, cursor states, five navigation widths, normal and reduced motion, project filtering, popup focus wrap in both directions, Escape and backdrop dismissal, signal paths, experience timeline and page progress. Keyboard typing and selection passed. The primary regression run logged zero console warnings or errors.

The retained build's three mobile scores are 74, 66 and 68. Median LCP is 2.9 seconds, TBT is 1,700 ms and CLS is 0.003. The performance, LCP and TBT goals remain unmet. Physical mobile devices, field Core Web Vitals and the legacy progress fallback in a browser without CSS scroll timelines were not tested.
Additional checks passed for skills search, back-to-top scrolling, resume PDF retrieval and touch scrolling inside the project dialog under both motion preferences.
