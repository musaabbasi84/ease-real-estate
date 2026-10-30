# EASE REAL ESTATE — A World Beyond the Address.

## Run
This is a 100% static frontend project (HTML, CSS, JavaScript, Three.js, GSAP) — no backend, database or API.
Videos and ES modules need an HTTP server (opening index.html via file:// will not work):

    cd ease-real-estate
    python3 -m http.server 8000      # or: npx serve .
    # open http://localhost:8000

Three.js (r160) and GSAP/ScrollTrigger are bundled in `js/vendor/` — no install or internet needed (only Google Fonts load online, with serif/sans fallbacks).

## Structure
- `index.html` — all 10 scenes
- `css/style.css`, `css/responsive.css`
- `js/main.js` boot/loader/reduced-motion · `scene.js` Three.js cloud fly-through · `scroll.js` GSAP ScrollTrigger timeline · `properties.js` sample listings · `interactions.js` nav, sound, modal, form
- `assets/videos`, `assets/images` — compressed copies of your uploads (originals untouched)

## Asset manifest (verified by inspecting frames)
| Original | Used as | Scene |
|---|---|---|
| 12139875 (portrait clouds, golden hour) | opening-clouds.mp4 | 01 |
| 6179863 (aircraft wing above clouds) | aircraft-sky.mp4 | 01 |
| 13601789 (coastal villas, surf) | destination-aerial.mp4 | 02 |
| 8440736 (villa among cypresses, lake) | estate-aerial.mp4 | 03 |
| walter… (modern villa render) | estate-exterior.webp | 04, Garden Villa |
| 16428573 (double-height interior) | interior-walkthrough.mp4 | 05 |
| aalo-lens / obegi-home (living room, bedroom) | living-room.webp, bedroom.webp | 05 |
| 5155248 (pool and sea) | infinity-pool.mp4 | 06 |
| 14502236 (aerial villas with pools) | properties-showcase.mp4 | 08 background |
| marko-sun / harrison-plouzek / artem-artemov | coastal-residence, mountain-residence, city-penthouse .webp | 07, 08 |

Not supplied, so not invented: staircase/dining stills, 3D models (GLB), audio. The only 3D layer is the Three.js cloud field.

## Honest notes
- Scenes 02–06 are scroll-driven crossfades with scale moves between separate clips, not literal 3D camera travel. Only Scene 01's cloud fly-through is real Three.js camera movement.
- Sound toggle unmutes the clips' own audio track (muted by default).
- Listings are labelled sample listings; no prices or real locations.
- The enquiry form is frontend-only: client-side validation plus a demo success message. It sends and stores nothing.
- Clips are trimmed (≤16 s) and re-encoded at ≤1280 px wide (≤1080 for portrait) to keep the site ~14 MB total.

## Deploy (static hosting)
Upload the folder as-is: GitHub Pages (push, enable Pages), Netlify (drag-and-drop the folder) or Vercel (import, no build command, output directory `.`). All paths are relative, so it also works in a sub-path.
