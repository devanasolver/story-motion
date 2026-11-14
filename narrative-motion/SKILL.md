---
name: narrative-motion
description: Direct, edit, and code videos in the Narrative Motion style using Remotion, React/TypeScript, FFmpeg, and live or AI A-roll. Use whenever the user mentions Narrative Motion, wants to edit a talking-head video with a right-side cutout PiP box and dark or light architectural grid canvas, asks for 4-frame camera-to-canvas morphs, or wants a code-driven explainer video with editorial serif plus mint-emerald typography and -15.8 LUFS zero-BGM audio.
---
# narrative-motion

Build and edit high-retention, code-driven explainer videos in the exact Narrative Motion house style. This skill combines a continuous talking-head master track with a deterministic Remotion/React canvas (`assets/kit.tsx` and `references/style_spec.json`), 4-frame spatial morphs, a 4-font editorial hierarchy, and a hyper-dry `-15.8 LUFS` zero-music audio pipeline.

## When to Use

- The user asks to edit or produce a long-form (16:9) or short-form (9:16) video in the Narrative Motion style.
- The user wants their talking-head A-roll to morph smoothly between full-screen, asymmetric split-screen, and a pinned right-side cutout window while code-driven diagrams animate on a dark-green or paper-light architectural grid.
- The user wants an AI coding agent (Claude Code, Codex, Antigravity) to generate Remotion scenes, FFmpeg silence-cutting scripts, live lighting setups, or AI B-roll prompts matching the exact production settings.

## Steps

### 1. Pre-Edit Audio & Breath-Cutting Pipeline (FFmpeg + Python)

Before building visual scenes, process the raw A-roll audio and video track so all Remotion frame indices lock to the final master timeline:

1. **Strip Inhalations & Micro-Pauses**:
   Use FFmpeg or Python silence detection with a `-42 dBFS` threshold to trim breath pauses down to `50ms - 90ms` (`70ms` median, or `2 - 3 frames` at `30 fps`) within sentences, and leave exactly `133.3ms` (`4 frames = JOIN_FRAMES`) at major section transitions.

2. **Apply the Hyper-Dry Vocal Chain**:
   Process the voice track to hit `-15.8 LUFS` integrated loudness, `-3.5 dBFS` true peak, and a tight `1.8 LU` loudness range (`-16.7` to `-14.9 LUFS`):

   - High-pass filter at `85 Hz` (`18 dB/oct`) to remove plosives and rumble.
   - Cut `-2.5 dB` at `280 Hz` (boxiness), boost `+2.0 dB` shelf at `4.5 kHz` (presence), and de-ess at `6.8 kHz`.
   - Compress at `4:1` (`5ms` attack, `60ms` release, `~6 dB` gain reduction) into a brickwall true-peak limiter at `-3.5 dBFS`.

3. **Enforce Zero Background Music**:
   Keep the background music bus at `0%` (`-63.7 dBFS` noise floor during speech gaps). Do not add lo-fi beats or synth beds; rhythmic momentum comes entirely from tight breath cuts and visual motion snaps.

4. **Layer Subliminal UI Foley (12-18 dB Below Voice)**:
   Place only quiet, tactile UI sound effects on visual transitions:

   - **4-Frame Camera Morph / Theme Wipe**: Low-pass air whoosh centered at `450 Hz`, `140ms` duration, peaking at `-28.0 dBFS`.
   - **Card Pop-In / Checkmark Badge**: Muted mechanical tactile tick centered at `1800 Hz`, `45ms` duration, peaking at `-30.0 dBFS`.
   - **Typewriter Reveal / SVG Line Draw**: Subtle paper brush or keystroke at `3200 Hz`, `30ms` duration, peaking at `-34.0 dBFS`.

### 2. Lock In the 1920x1080 Remotion Coordinate System (`assets/kit.tsx`)

Import or copy `assets/kit.tsx` into the Remotion project to enforce the exact pixel geometry at `30 fps`:

- **Outer Viewport Bezel**: Whenever canvas or split-screen modes are active, wrap the `1920x1080` frame in a `20px` solid `#060808` border with a `20px` inner border-radius (inner viewport `x: 20..1900, y: 20..1060`). Disable the bezel on full-bleed A-roll shots (`k = 0`).
- **Architectural Grid Canvas**: Fill the stage with `#16221C` (Dark Mode) or `#F2F4EE` (Light Mode) and overlay a `40px x 40px` CSS linear-gradient grid (`1px` stroke in `rgba(242, 244, 238, 0.045)` for dark mode or `rgba(22, 34, 28, 0.055)` for light mode) with a `20px` minor sub-grid.
- **Right Cutout Speaker Window (`BOX`)**: Pin the presenter cutout at `x: 1657, y: 368, w: 223, h: 344, r: 20` (center `[1768.5, 540.0]`), cropping the 16:9 camera footage around `FACE = [937, 330]` using `CROP = {cx: 0.488, top: 0.02, hf: 0.82}` and applying `boxShadow(k)`.
- **Left Graphics Stage (`PLANE` & `SAFE`)**: Place all diagrams, cards, and flowcharts inside `PLANE = {x: 60, w: 1557, h: 1080, centre: 121}`, keeping text and badges strictly inside `SAFE = {x0: 96, x1: 1824, y0: 54, y1: 1026}` and left of `ZONE_X = 1617`.

### 3. Apply the 4-Font Hierarchy & Semantic Color Tokens

Never use heavy black-stroked meme captions. Combine these four font roles and semantic tokens:

- **1. Editorial Serif (`Instrument Serif` or `Newsreader`, `48px - 64px`, `-0.02em` tracking, `1.08` line-height)**:
  Use for stage headlines, step titles (`Step 1`), and hook captions. Set base words in off-white `#F2F4EE` and highlight 1 to 2 pivot words per headline in *Italic* mint-emerald `#7AE6A8` (or coral-red `#E86B60` for negative warnings).
- **2. Geometric UI Sans (`Inter` or `Geist Sans`, `18px - 28px`, `-0.01em` tracking, `1.35` line-height)**:
  Use for card headings (`28px SemiBold`), bullet items (`22px Medium`), body descriptions (`18px Regular`), and bottom source attributions (`13px` in `#8FA196`).
- **3. Technical Monospace (`JetBrains Mono`, `14px - 15px`, `+0.08em` tracking)**:
  Place a `14px` uppercase monospace kicker (`IN THIS VIDEO`, `STEP 3`) `12px` above major serif titles in `#8FA196` or `#7AE6A8`. Also use for syntax-highlighted code cards (`#131A16` body, `#1A2820` header) and lower-third typewriter pills with a blinking `8x20px` `#7AE6A8` block cursor.
- **4. 5x7 LED Dot-Matrix (`56px - 84px`, `4px` dots, `2px` gap)**:
  Use for hero metric callouts (`1,500+ VIDEOS`, `3 FREE TOOLS`, `95-98%`) in `#7AE6A8` with inactive dots at `rgba(122, 230, 168, 0.12)`.

### 4. Choreograph Layout Alternation & Motion Physics

Alternate across the 5 spatial layout archetypes so no static screen holds longer than `2.5 seconds` (target a major state shift every `3.9s` and a micro-animation every `1.2s - 2.2s` synced to spoken nouns/verbs):

1. **Full-Bleed A-Roll (`~18%` of runtime, max hold `7.0s`)**:
   Use for the opening 4-second hook, emotional pivots, and the final 30-second guarantee/outro. Use subtle `1.0x -> 1.06x` punch-ins anchored at `FACE = [937, 330]` to hide jump cuts.
2. **4-Frame Camera-to-Box Morph (`JOIN_FRAMES = 4`, `133.3ms`)**:
   When transitioning from A-roll to canvas mode (`CANVAS_PIP_RIGHT`, `~48%` of runtime), interpolate container `[x, y, w, h, r]` from `[0, 0, 1920, 1080, 0]` to `[1657, 368, 223, 344, 20]` over exactly `4 frames` using `easeOutCubic`.
3. **Asymmetric Split Panels (`~25%` of runtime, `5 frames / 167ms` slide)**:
   Slide the camera container to cover the right `65%` (`x: 680..1900`) while a dark-green grid column (`x: 20..680`) lists stacked bullets on the left, or keep the speaker on the left (`x: 20..980`) while a `2x2` bento grid of brand cards animates on the right (`x: 980..1900`).
4. **Card & Connector Choreography**:
   - **Step A (Frames 0-6)**: Render a `1.5px` dashed mint placeholder slot (`rgba(122, 230, 168, 0.35)`, `r = 16px`).
   - **Step B (Frames 6-14)**: Pop in the solid card (`#1A2720`, `1px` border `rgba(242, 244, 238, 0.08)`, shadow `0 18px 44px rgba(0,0,0,0.42)`) scaling `0.96 -> 1.0` with `cubic-bezier(0.22, 1, 0.36, 1)`.
   - **Step C (Frames 14-26)**: Draw a `1.5px` `#7AE6A8` curved SVG bezier arrow (`stroke-dashoffset: 100% -> 0%` over `12 frames`) to the next card or node.
5. **78-Degree Diagonal Light/Dark Wipe (`14 frames / 467ms`)**:
   When contrasting two modes or before/after states, sweep a `78-degree` angled polygon `clip-path` across the stage to toggle between `#16221C` (Dark Mode) and `#F2F4EE` (Light Mode).

### 5. Adapt for 9:16 Vertical Short-Form (Reels, Shorts, TikTok)

When targeting `1080x1920` vertical output (`VERTICAL_9_16` in `assets/kit.tsx`):

- **Bottom Cutout Window**: Pin the speaker window at the bottom (`x: 120..960, y: 1280..1720, r: 28px`) with the top of the speaker's head roto-masked `40px` above the top card border for depth.
- **Full-Screen Graphic Takeover**: When complex diagrams need more vertical room, slide the bottom speaker window down off-screen (`y -> 1920` over `8 frames`) so graphics expand across the full canvas.
- **Strict Platform Safe Zone**: Keep all text, cards, and badges inside `x: 90..920, y: 140..1520` so nothing is covered by right-side engagement buttons (`x: 920..1080`) or bottom profile/caption overlays (`y: 1520..1920`).

### 6. Match the Studio Lighting or Generate Synthetic A-Roll

When shooting live A-roll or prompting an AI video generator (Google Flow, Veo, Seedance) for presenter footage:

- **Optics & Framing**: `35mm - 50mm` lens at `f/1.8 - f/2.2`, locked eye-level tripod, chest-up medium close-up with eyes at `y = 330px`.
- **3-Point Lighting + Coral Practical**:
  - **Key Light**: `5400K` diffused octabox at `35 deg` camera-right, `25 deg` elevation (`64.2% IRE` lit cheek `#DD958E`, `72.0% IRE` forehead `#E4AD9F`).
  - **Fill Side**: Passive bounce camera-left for a `1.28:1` luma ratio (`50.1% IRE` shadow cheek `#A3776D`).
  - **Background Practical**: Warm coral-red RGB tube light (`#E05A47`) behind a right-side snake plant (`#A07677` wall wash at `49.8% IRE`), balanced by dark green palm foliage on the left (`#1B2C20`, `15.5% IRE`) and a muted abstract painting in the center (`#656F6A`, `42.6% IRE`).
- **AI Presenter & UI Prompts**: Load `references/style_spec.json` (`ai_generation_prompts`) for ready-to-run image and video generation prompts.

## Gotchas

- **Never Use Slow Cross-Dissolves on Camera Morphs**: A 15-to-30 frame dissolve between full-screen A-roll and the right PiP box looks sluggish and amateur. Keep `JOIN_FRAMES = 4` (`133.3ms`) so the transition lands within a single syllable gap.
- **Never Let Cards Cross `ZONE_X = 1617`**: Any graphic extending past `x = 1617px` will collide with the drop shadow of the right-side speaker cutout (`BOX.x = 1657`).
- **Avoid Over-Loud SFX or Music Beds**: Adding background music or loud `-6 dBFS` whooshes ruins the clean, high-trust editorial authority of this style. Keep BGM at `0%` and cap all UI foley between `-28 dBFS` and `-34 dBFS`.
