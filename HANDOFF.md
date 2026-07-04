# LuN3cy Portfolio Handoff

Updated: 2026-07-05
Project path: `C:\Users\Acer\Documents\GitHub\LuN3cy`
Local preview: `http://127.0.0.1:3000/`

## Current Goal

This is Zhuoran Song's personal portfolio site for interview and private preview use. The current work has focused on the `作品` page, especially:

- Static photography archive and film-strip previews.
- Three-level static photography browsing flow.
- Environment / interior design image insertion and preview behavior.
- Dynamic video metadata and cover image insertion.
- Archive category cards and responsive behavior.

## Tech Stack

- React 19
- Vite 6
- TypeScript
- Tailwind CSS
- lucide-react

Useful commands:

```powershell
npm.cmd run dev
npx.cmd tsc --noEmit
npm.cmd run build
```

The latest checks passed:

```powershell
npx.cmd tsc --noEmit
npm.cmd run build
```

## Important Files

- `components/PortfolioSection.tsx`
  Main work area for archive cards, category detail pages, photo stack viewer, film-strip preview, local collection detail pages, and lightbox behavior.

- `src/data/localPortfolio.ts`
  Local static photography and environment/interior collections.

- `src/data/videography.ts`
  Dynamic video project metadata and cover image path.

- `types.ts`
  Project type additions, including optional `year` and `date`.

- `public/works/local/film/`
  Film leader assets for the static photography preview.

- `public/works/local/interior/`
  Interior/environment design images and demo PDF.

- `public/works/local/video/`
  Video cover images generated from the local video file.

## Current Git State Notes

There are intentional uncommitted changes and deleted files. Do not run destructive cleanup without user confirmation:

```powershell
git reset --hard
git checkout -- .
git clean -fd
```

Known intentional deletes in `public/works/local/he`:

- `04.webp`
- `14.webp`
- `15.webp`
- `17.webp`
- `21.webp`
- `22.webp`
- `28.webp`
- `29.webp`
- `30.webp`

These were removed because they were duplicate or unwanted images. The data file now references only the remaining numbered images.

## Archive Categories

The `作品` archive page currently has six category cards:

1. `静态摄影`
2. `摄影集`
3. `动态影像`
4. `平面交互`
5. `环境 / 室内设计`
6. `东北地摊烧烤`

Important behavior:

- `东北地摊烧烤` must not navigate into a second-level page.
- Clicking it should only show the small message: `公司团建可解锁此操作`.
- The guard exists in `PortfolioSection.tsx`; do not remove it while refactoring.

## Static Photography

Static photography is stored in `LOCAL_PHOTOGRAPHY_COLLECTIONS` in `src/data/localPortfolio.ts`.

Current collections:

- `01 / xu`: 18 images, continuous numbering.
- `02 / 山水`: 17 images, continuous numbering.
- `03 / 核`: 23 images, non-continuous numbering.
- `04 / 建筑`: 4 images, continuous numbering.

The `03 / 核` collection now uses explicit `imageNumbers`:

```ts
[1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 18, 19, 20, 23, 24, 25, 26, 27, 31, 32]
```

Reason: the folder no longer contains every file from `01.webp` to `32.webp`.

### Static Photography Second-Level Page

The second-level static photography page uses `FilmNegativePreview` in `components/PortfolioSection.tsx`.

Current film-strip behavior:

- Film rows slide in from right to left.
- Rows load only when they enter the viewport.
- Rows already visible when the page opens load immediately.
- Film leader and photo strip move together as one row.
- Photos do not animate separately; they appear with the strip.
- Photo gaps are currently `0.24rem`.
- The right side has an extended black strip fill to avoid grey/white edge gaps at unusual browser widths.

Current relevant CSS details:

- `.film-negative-preview`
- `.film-negative-strip`
- `.film-negative-leader`
- `.film-negative-frames`
- `.film-negative-frame`

The film leader image currently used:

```text
public/works/local/film/film-leader-solid.png
```

The older source/reference file may still exist:

```text
public/works/local/film/film-leader.png
```

The solid leader is black. Holes are drawn with CSS so they match the photo strip hole size and spacing.

### Static Photography Hover Text

In unusual screen widths, the hover metadata text used to overlap the film strip. It has been changed for `isPhotoArchive` to single-column text:

- image count
- tags
- description

Do not reintroduce the old two-column `sm:grid-cols-[10rem_minmax(0,1fr)]` layout for static photography unless the film strip layout is redesigned.

## Static Photography Third-Level Page

Opening a static collection leads to the photo preview page.

Behavior:

- If the collection has multiple images, image order is randomized each time the project opens.
- The photo stack supports mouse drag left/right to flip.
- Clicking the current photo opens a fullscreen black lightbox.
- The lightbox is rendered with `createPortal(..., document.body)` to avoid being covered by left-side layout elements.
- The stack adapts to horizontal and vertical photos.

## Environment / Interior Design

Environment/interior data is in `LOCAL_ENVIRONMENT_COLLECTIONS`.

Current collections:

- `01演示`: one image, no stack viewer.
- `分析图`: 8 images, random order on open.
- `效果图`: 15 images, random order on open.

Assets:

```text
public/works/local/interior/demo/01.webp
public/works/local/interior/demo/01-demo.pdf
public/works/local/interior/analysis/*.webp
public/works/local/interior/renders/*.webp
```

`01演示` uses `SingleImagePreview` with a flush presentation. It should not show a stacked-photo interaction because it only has one image.

Important display details for `01演示`:

- Second-level list preview should crop/show only the upper board preview area.
- Third-level detail should show the whole board image proportionally without a white framed card.
- Clicking the image opens fullscreen preview.

## Dynamic Video

Dynamic video metadata is in `src/data/videography.ts`.

Current project:

- `毕业设计作品《破茧》`
- year/date: `2024`
- cover: `/works/local/video/pojian-cover.jpg`

Generated video cover assets are in:

```text
public/works/local/video/
```

The actual local video file was not copied into `public` because it is large and the user does not want videos publicly visible.

Recommendation for future video hosting:

- Use private/unlisted controlled access if the site will be used in interviews.
- Avoid putting large private videos directly in a public repo or public static deploy.

## Responsive / Layout Notes

The site is highly visual and several interactions are sensitive to unusual viewport sizes.

Recently fixed issues:

- Static photography title sizes on narrow screens.
- Static photography second-level text layout.
- Film strip not reaching the right edge at unusual widths.
- Film leader color, hole spacing, and entry animation.
- Fullscreen photo lightbox being covered by side layout.
- Environment design single-image fullscreen preview.

When making responsive changes, test at least:

- Desktop full width.
- Medium/narrow desktop window around 840 px wide.
- Tablet-like widths.
- Phone-like widths.

## Current Known Fragility

1. Some Chinese strings in `src/data/localPortfolio.ts` appear mojibake from earlier encoding issues.
   The visible UI may still be acceptable because some labels are driven by current data or previously fixed display paths, but this file should eventually be cleaned with proper UTF-8 Chinese text.

2. `FilmNegativePreview` uses CSS injected inside the component.
   This is convenient but makes responsive debugging harder. If future changes grow larger, consider moving the film-strip styles into a CSS file or dedicated component stylesheet.

3. The film strip intentionally overflows/extends to the right edge.
   Be careful with parent `overflow-hidden`; it can reintroduce clipped strips or visible edge gaps.

4. The working tree contains generated assets and deleted duplicate photos.
   Confirm with the user before committing, cleaning, or restoring assets.

## Verification Checklist

After future edits, run:

```powershell
npx.cmd tsc --noEmit
npm.cmd run build
```

Manual browser checks:

- Open `http://127.0.0.1:3000/`.
- Go to `作品`.
- Open `静态摄影`.
- Check `01 / xu`, `02 / 山水`, `03 / 核`, `04 / 建筑` film strips.
- Hover rows and confirm text does not overlap the film.
- Confirm no missing images in `03 / 核`.
- Open a static collection and test drag flipping plus fullscreen click.
- Open `环境 / 室内设计`, test `01演示`, `分析图`, `效果图`.
- Open `动态影像`, confirm `2024` and cover image display.

## Most Recent Completed Changes

- Fixed static photography hover metadata layout at unusual screen widths.
- Updated `03 / 核` image count and non-continuous image paths after deleted duplicate files.
- Adjusted film strip edge fill to reduce white/grey gaps at unusual widths.
- Made film strip photos load in sync with the strip instead of delayed one-by-one.
- Added black solid film leader and CSS-drawn sprocket holes.

