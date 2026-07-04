
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, CATEGORY_LABELS } from '../constants';
import { Category, Language, ProjectDisplay } from '../types';
import { PHOTOGRAPHY_GALLERY } from '../src/data/photography';
import { LOCAL_ENVIRONMENT_COLLECTIONS, LOCAL_PHOTOGRAPHY_COLLECTIONS, LocalPortfolioCollection } from '../src/data/localPortfolio';
import { ArrowUpRight, X, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const BBQ_CATEGORY = 'bbq';
const PHOTO_COLLECTION_CATEGORY = 'photo-collection';

interface PortfolioSectionProps {
  language: Language;
  externalFilter?: string; // Controlled by parent if needed
  archiveLayout?: boolean;
}

const GalleryImage = ({ src, alt, onClick }: { src: string, alt: string, onClick: (e: React.MouseEvent) => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className="aspect-square overflow-hidden cursor-zoom-in relative group rounded-lg shadow-sm hover:shadow-md will-change-transform transform-gpu"
      onClick={onClick}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center z-10">
             <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 will-change-transform transform-gpu backface-hidden ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
        onLoad={() => setIsLoaded(true)}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 z-20"></div>
    </div>
  );
};

const ARCHIVE_CATEGORIES = [
  {
    id: Category.PHOTO,
    index: '01',
    zh: '静态摄影',
    en: 'Photography',
    color: '#ffe629',
    offset: 'lg:translate-y-0',
  },
  {
    id: Category.VIDEO,
    index: '02',
    zh: '动态影像',
    en: 'Videography',
    color: '#d8d8d6',
    offset: 'lg:translate-y-10',
  },
  {
    id: Category.DESIGN,
    index: '03',
    zh: '平面交互',
    en: 'Graphic & UI',
    color: '#eeeeec',
    offset: 'lg:-translate-y-10',
  },
  {
    id: Category.ENVIRONMENT,
    index: '04',
    zh: '环境 / 室内设计',
    en: 'Environment / Interior',
    color: '#b7b7b5',
    offset: 'lg:translate-y-0',
  },
];

const ARCHIVE_FOLDERS = [
  { id: Category.PHOTO, index: '01', zh: '静态摄影', en: 'Photography', color: '#ffe629' },
  { id: PHOTO_COLLECTION_CATEGORY, index: '02', zh: '摄影集', en: 'Photo Collection', color: '#f2f2f0' },
  { id: Category.VIDEO, index: '03', zh: '动态影像', en: 'Videography', color: '#d8d8d6' },
  { id: Category.DESIGN, index: '04', zh: '平面交互', en: 'Graphic & UI', color: '#eeeeec' },
  { id: Category.ENVIRONMENT, index: '05', zh: '环境 / 室内设计', en: 'Environment / Interior', color: '#b7b7b5' },
  { id: BBQ_CATEGORY, index: '06', zh: '东北地摊烧烤', en: 'Northeast BBQ', color: '#ff6b2c' },
];

const ARCHIVE_CARD_LAYOUT: Record<string, { left: string; width: string; bottom: string; zIndex: number; delay: string }> = {
  [Category.PHOTO]: { left: '0%', width: '50%', bottom: '42%', zIndex: 20, delay: '260ms' },
  [Category.VIDEO]: { left: '50%', width: '50%', bottom: '42%', zIndex: 20, delay: '320ms' },
  [Category.DESIGN]: { left: '0%', width: '51%', bottom: '22%', zIndex: 34, delay: '40ms' },
  [Category.ENVIRONMENT]: { left: '38%', width: '62%', bottom: '5%', zIndex: 36, delay: '110ms' },
};

const ArchiveCategoryTabs = ({
  language,
  filter,
  setFilter,
  onOpenCategory,
  onLockedCategory,
  hoveredArchive,
  setHoveredArchive,
}: {
  language: Language;
  filter: string;
  setFilter: (category: string) => void;
  onOpenCategory: (category: string) => void;
  onLockedCategory: () => void;
  hoveredArchive: string | null;
  setHoveredArchive: React.Dispatch<React.SetStateAction<string | null>>;
}) => (
  <div
    className="archive-tabs-root relative left-1/2 w-screen -translate-x-1/2 mb-0 min-h-[calc(100svh-22rem)] overflow-visible"
    onMouseLeave={() => setHoveredArchive(null)}
  >
    <div className="absolute left-[2vw] right-[2vw] top-0 flex justify-between font-mono text-xs md:text-sm uppercase tracking-[0.16em] text-black/70 dark:text-white/60 pointer-events-none">
      <span>{language === 'zh' ? '作品' : 'Works'}</span>
      <span className="font-serif text-5xl md:text-7xl normal-case tracking-[-0.05em] text-black/12 dark:text-white/12">
        Archive
      </span>
    </div>

    <div className="archive-folder-stage absolute inset-x-0 bottom-0 hidden lg:block h-[clamp(28rem,56svh,38rem)]">
      {ARCHIVE_FOLDERS.map((cat, index) => {
        const label = language === 'zh' ? cat.zh : cat.en;
        const isHovered = hoveredArchive === cat.id;
        const isDimmed = hoveredArchive !== null && hoveredArchive !== cat.id;
        const layout = {
          [Category.PHOTO]: { left: '0%', width: '50%', top: '0%', bottom: 'auto', height: '44%', zIndex: 41, delay: '260ms' },
          [PHOTO_COLLECTION_CATEGORY]: { left: '50%', width: '50%', top: '0%', bottom: 'auto', height: '44%', zIndex: 42, delay: '300ms' },
          [Category.VIDEO]: { left: '0%', width: '50%', top: '27.5%', bottom: 'auto', height: '44%', zIndex: 51, delay: '180ms' },
          [Category.DESIGN]: { left: '50%', width: '50%', top: '27.5%', bottom: 'auto', height: '44%', zIndex: 52, delay: '220ms' },
          [Category.ENVIRONMENT]: { left: '0%', width: '50%', top: '55%', bottom: 'auto', height: '45%', zIndex: 61, delay: '80ms' },
          [BBQ_CATEGORY]: { left: '50%', width: '50%', top: '55%', bottom: 'auto', height: '45%', zIndex: 62, delay: '120ms' },
        }[cat.id];

        return (
          <button
            key={cat.id}
            onClick={() => {
              if (cat.id === BBQ_CATEGORY) {
                onLockedCategory();
                return;
              }
              setFilter(cat.id);
              onOpenCategory(cat.id);
            }}
            onMouseEnter={() => setHoveredArchive(cat.id)}
            onFocus={() => setHoveredArchive(cat.id)}
            onBlur={() => setHoveredArchive(null)}
            className="archive-folder-card group absolute block overflow-visible text-left px-[clamp(1.5rem,2.4vw,3rem)] pt-[clamp(0.2rem,0.55vw,0.55rem)] pb-6 transition-[transform,background-color,color,filter] duration-300 ease-out will-change-transform"
            style={{
              left: layout.left,
              width: layout.width,
              top: layout.top,
              bottom: layout.bottom,
              height: layout.height,
              zIndex: layout.zIndex,
              backgroundColor: isDimmed ? '#f4f4f2' : cat.color,
              color: isDimmed ? 'rgba(24, 24, 24, 0.16)' : '#181818',
              filter: isDimmed ? 'grayscale(1) saturate(0) brightness(1.05)' : 'none',
              transform: isHovered ? 'translate3d(0, -0.35rem, 0)' : 'translate3d(0, 0, 0)',
              clipPath: 'polygon(0 0, 47% 0, calc(47% + 2.15rem) 2.15rem, 100% 2.15rem, 100% 100%, 0 100%)',
              animation: `archiveFolderRise 620ms cubic-bezier(0.16, 1, 0.3, 1) ${layout.delay} both`,
            }}
          >
            <span className="archive-folder-index relative -top-5 block font-mono mb-2">{cat.index}</span>
            <span className="relative -top-5 block max-w-[95%] font-serif text-[clamp(2rem,3.25vw,4.45rem)] leading-[0.92] tracking-[-0.045em] break-keep">
              {label}
            </span>
          </button>
        );
      })}
    </div>

    <div className="archive-folder-stage archive-folder-stage--responsive absolute inset-x-0 bottom-0 lg:hidden">
      {ARCHIVE_FOLDERS.map((cat, index) => {
        const label = language === 'zh' ? cat.zh : cat.en;
        const isHovered = hoveredArchive === cat.id;
        const isDimmed = hoveredArchive !== null && hoveredArchive !== cat.id;
        const riseDelay = {
          [Category.PHOTO]: '300ms',
          [PHOTO_COLLECTION_CATEGORY]: '260ms',
          [Category.VIDEO]: '220ms',
          [Category.DESIGN]: '140ms',
          [Category.ENVIRONMENT]: '80ms',
          [BBQ_CATEGORY]: '20ms',
        }[cat.id];

        return (
          <button
            key={cat.id}
            onClick={() => {
              if (cat.id === BBQ_CATEGORY) {
                onLockedCategory();
                return;
              }
              setFilter(cat.id);
              onOpenCategory(cat.id);
            }}
            onMouseEnter={() => setHoveredArchive(cat.id)}
            onFocus={() => setHoveredArchive(cat.id)}
            onBlur={() => setHoveredArchive(null)}
            className="archive-folder-card archive-folder-card--responsive group relative overflow-visible text-left transition-[transform,background-color,color,filter] duration-300 ease-out will-change-transform"
            style={{
              zIndex: index + 20,
              backgroundColor: isDimmed ? '#f4f4f2' : cat.color,
              color: isDimmed ? 'rgba(24, 24, 24, 0.16)' : '#181818',
              filter: isDimmed ? 'grayscale(1) saturate(0) brightness(1.05)' : 'none',
              transform: isHovered ? 'translate3d(0, -0.25rem, 0)' : 'translate3d(0, 0, 0)',
              animation: `archiveFolderRise 560ms cubic-bezier(0.16, 1, 0.3, 1) ${riseDelay} both`,
            }}
          >
            <span className="archive-folder-index archive-folder-index--responsive block font-mono">{cat.index}</span>
            <span className="archive-folder-title block max-w-[94%] whitespace-nowrap font-serif leading-[0.94] tracking-[-0.06em]">
              {label}
            </span>
          </button>
        );
      })}
    </div>

    <style>{`
      @keyframes archiveFolderRise {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .archive-tabs-root {
        height: max(21rem, calc(100svh - clamp(15.75rem, 31vw, 17.6rem)));
        min-height: 21rem;
      }

      .archive-folder-card {
        border-top-left-radius: 0.45rem;
      }

      .archive-folder-index {
        font-size: clamp(1rem, 1.05vw, 1.28rem);
        line-height: 1;
        letter-spacing: -0.035em;
        position: relative;
        z-index: 3;
      }

      .archive-folder-stage--responsive {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        overflow: hidden;
        bottom: 0;
      }

      .archive-folder-card--responsive {
        --folder-tab-depth: 1.8rem;
        --folder-tab-start: 52%;
        width: calc(100% + 8rem);
        max-width: none;
        min-height: clamp(7.9rem, 17svh, 8.6rem);
        flex: 0 0 auto;
        padding: clamp(0.9rem, 2.8vw, 1.25rem) clamp(1.25rem, 4vw, 2rem) clamp(0.95rem, 3vw, 1.35rem);
        margin-top: calc(var(--folder-tab-depth) * -1 - 2px);
        clip-path: polygon(0 0, var(--folder-tab-start) 0, calc(var(--folder-tab-start) + var(--folder-tab-depth)) var(--folder-tab-depth), 100% var(--folder-tab-depth), 100% 100%, 0 100%);
      }

      .archive-folder-card--responsive .archive-folder-index--responsive {
        position: absolute;
        left: clamp(1.25rem, 4vw, 2rem);
        top: clamp(0.85rem, 2.4vw, 1.15rem);
        font-size: clamp(0.82rem, 2.25vw, 1.05rem);
      }

      .archive-folder-card--responsive:first-child {
        margin-top: 0;
      }

      .archive-folder-card--responsive:nth-child(1) {
        --folder-tab-start: 50%;
      }

      .archive-folder-card--responsive:nth-child(2) {
        --folder-tab-start: 56%;
      }

      .archive-folder-card--responsive:nth-child(3) {
        --folder-tab-start: 48%;
      }

      .archive-folder-card--responsive:nth-child(4) {
        --folder-tab-start: 54%;
      }

      .archive-folder-card--responsive:nth-child(5) {
        --folder-tab-start: 46%;
      }

      .archive-folder-card--responsive:nth-child(6) {
        --folder-tab-start: 58%;
      }

      .archive-folder-title {
        position: relative;
        z-index: 2;
        padding-top: clamp(2.05rem, 6.6vw, 2.7rem);
        font-size: clamp(2rem, 7.45vw, 3rem);
      }

      @media (max-width: 420px) {
        .archive-folder-card--responsive {
          --folder-tab-depth: 1.5rem;
          width: calc(100% + 4rem);
          min-height: 6.9rem;
        }

        .archive-folder-title {
          padding-top: 2.1rem;
          font-size: clamp(1.85rem, 8.4vw, 2.55rem);
        }
      }

      @media (min-width: 421px) and (max-width: 639px) {
        .archive-tabs-root {
          height: max(20rem, calc(100svh - 14.9rem));
        }
      }

      @media (min-width: 640px) and (max-width: 1023px) {
        .archive-folder-card--responsive {
          --folder-tab-depth: 2.05rem;
          min-height: clamp(8.9rem, 19svh, 9.8rem);
          width: calc(100% + 10rem);
          padding-left: clamp(1.7rem, 4vw, 2.6rem);
        }

        .archive-folder-card--responsive .archive-folder-index--responsive {
          left: clamp(1.7rem, 4vw, 2.6rem);
          top: clamp(1rem, 2vw, 1.25rem);
          font-size: clamp(0.92rem, 1.75vw, 1.1rem);
        }

        .archive-folder-title {
          padding-top: clamp(2.4rem, 5vw, 2.9rem);
          font-size: clamp(2.75rem, 5.7vw, 3.25rem);
        }
      }

      @media (min-width: 640px) and (max-width: 819px) {
        .archive-tabs-root {
          height: max(20rem, calc(100svh - 16.95rem));
        }
      }

      @media (max-height: 720px) and (max-width: 1023px) {
        .archive-tabs-root {
          height: max(19rem, calc(100svh - clamp(14.4rem, 30vw, 16.8rem)));
          min-height: 19rem;
        }

        .archive-folder-card--responsive {
          min-height: clamp(6.9rem, 16svh, 8.2rem);
        }

        .archive-folder-title {
          padding-top: clamp(2rem, 5.4vw, 2.55rem);
          font-size: clamp(1.95rem, 7vw, 3rem);
        }
      }

      @media (min-width: 1024px) {
        .archive-tabs-root {
          height: max(22rem, calc(100svh - clamp(18rem, 24vw, 19.2rem)));
        }

        .archive-folder-stage--responsive {
          display: none !important;
        }
      }
    `}</style>
  </div>
);

const getArchiveFolder = (category: string) =>
  ARCHIVE_FOLDERS.find((folder) => folder.id === category) || ARCHIVE_FOLDERS[0];

const getArchiveProjects = (projects: any[], category: string) => {
  const matched = projects.filter((project) => project.category === category);

  if (matched.length > 0) return matched;

  const folder = getArchiveFolder(category);
  return [
    {
      id: `${category}-placeholder-1`,
      title: `${folder.zh}项目 01`,
      subtitle: 'Archive Item',
      description: '项目内容整理中，后续会补充完整作品说明与预览。',
      image: '',
      tags: ['Archive', 'WIP'],
    },
    {
      id: `${category}-placeholder-2`,
      title: `${folder.zh}项目 02`,
      subtitle: 'Archive Item',
      description: '该分类已保留入口，作品整理完成后会加入详情。',
      image: '',
      tags: ['Portfolio', 'Coming Soon'],
    },
  ];
};

const shuffleImages = (images: string[]) => {
  const next = [...images];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
};

const SingleImagePreview = ({
  image,
  title,
  presentation = 'framed',
}: {
  image: string;
  title: string;
  presentation?: 'framed' | 'flush';
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFlush = presentation === 'flush';

  return (
    <>
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        className={isFlush
          ? 'w-full max-w-none cursor-zoom-in border border-white/80 bg-transparent p-px shadow-none'
          : 'w-full max-w-[min(86vw,62rem)] cursor-zoom-in rounded-[1.35rem] border border-white/90 bg-[#f8f7f2] p-2 shadow-[0_2.2rem_5rem_rgba(0,0,0,0.22)]'}
        aria-label={`Open ${title}`}
      >
        <img
          src={image}
          alt={title}
          loading="eager"
          decoding="async"
          draggable={false}
          className={isFlush
            ? 'block h-auto w-full object-contain'
            : 'block max-h-[58svh] w-full rounded-[1rem] object-contain'}
        />
      </button>

      {isExpanded && createPortal(
        <div
          className="fixed inset-0 z-[240] flex cursor-zoom-out items-center justify-center bg-black p-[clamp(1rem,4vw,4rem)]"
          onClick={() => setIsExpanded(false)}
        >
          <button
            type="button"
            className="fixed right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            onClick={(event) => {
              event.stopPropagation();
              setIsExpanded(false);
            }}
            aria-label="Close enlarged image"
          >
            <X size={28} />
          </button>
          <img
            src={image}
            alt={title}
            draggable={false}
            className="max-h-full max-w-full rounded-[0.8rem] object-contain shadow-[0_2rem_7rem_rgba(0,0,0,0.5)]"
            onClick={(event) => event.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </>
  );
};

const PhotoStackViewer = ({
  images,
  title,
}: {
  images: string[];
  title: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [imageAspects, setImageAspects] = useState<Record<number, number>>({});

  const goPrev = () => setActiveIndex((current) => Math.max(0, current - 1));
  const goNext = () => setActiveIndex((current) => Math.min(images.length - 1, current + 1));
  const currentAspect = imageAspects[activeIndex] || 0.78;
  const stageWidth = currentAspect >= 1
    ? 'min(82vw, 54rem)'
    : 'min(74vw, 36rem)';

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart === null) return;
    const distance = event.clientX - dragStart;
    setDragStart(null);
    setDragDelta(0);

    if (Math.abs(distance) < 8) {
      setExpandedIndex(activeIndex);
      return;
    }
    if (distance > 56) goPrev();
    if (distance < -56) goNext();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="flex min-h-[32rem] items-center justify-center border border-dotted border-black/40 text-sm font-mono uppercase tracking-[0.14em] text-black/45">
        No images
      </div>
    );
  }

  const visibleIndexes = images
    .map((_, index) => index)
    .filter((index) => Math.abs(index - activeIndex) <= 4);

  return (
    <div className="photo-stack-shell">
      <div
        className="photo-stack-stage"
        style={{
          width: stageWidth,
          aspectRatio: String(currentAspect),
        }}
        onPointerDown={(event) => {
          setDragStart(event.clientX);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (dragStart === null) return;
          setDragDelta(event.clientX - dragStart);
        }}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          setDragStart(null);
          setDragDelta(0);
        }}
      >
        {visibleIndexes.map((index) => {
          const offset = index - activeIndex;
          const isCurrent = offset === 0;
          const absOffset = Math.abs(offset);
          const activeDragOffset = isCurrent && dragStart !== null ? dragDelta / 16 : 0;
          const translateX = offset < 0
            ? Math.max(offset * 2.7, -8.4)
            : Math.min(offset * 2.7, 8.4);
          const translateY = offset < 0
            ? Math.min(absOffset * 1.05, 3.2)
            : Math.min(absOffset * 1.05, 3.2);
          const scale = Math.max(0.84, 1 - absOffset * 0.055);
          const rotate = offset < 0
            ? Math.max(offset * 1.25, -4.5)
            : Math.min(offset * 1.25, 4.5);

          return (
            <button
              key={images[index]}
              type="button"
              aria-label={`${title} ${index + 1}`}
              onClick={() => {
                if (isCurrent) return;
                if (index < activeIndex) goPrev();
                if (index > activeIndex) goNext();
              }}
              className={`photo-stack-card ${isCurrent ? 'is-current' : ''} ${offset < 0 ? 'is-past' : 'is-next'}`}
              style={{
                zIndex: 100 - Math.abs(offset) + (offset < 0 ? 0 : 12),
                opacity: isCurrent ? 1 : Math.max(0.2, 0.86 - absOffset * 0.13),
                transform: `translate3d(${translateX + activeDragOffset}rem, ${translateY}rem, 0) rotate(${rotate + activeDragOffset * 0.35}deg) scale(${scale})`,
              }}
            >
              <img
                src={images[index]}
                alt={`${title} ${index + 1}`}
                loading={absOffset <= 1 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                onLoad={(event) => {
                  const image = event.currentTarget;
                  if (!image.naturalWidth || !image.naturalHeight) return;
                  setImageAspects((current) => ({
                    ...current,
                    [index]: image.naturalWidth / image.naturalHeight,
                  }));
                }}
              />
              {isCurrent && <span className="photo-stack-zoom-hit" />}
              {!isCurrent && <span className="photo-stack-tint" />}
            </button>
          );
        })}
      </div>

      <div className="photo-stack-controls">
        <button type="button" onClick={goPrev} disabled={activeIndex === 0} aria-label="Previous image">
          <ChevronLeft size={18} />
        </button>
        <span>{String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
        <button type="button" onClick={goNext} disabled={activeIndex === images.length - 1} aria-label="Next image">
          <ChevronRight size={18} />
        </button>
      </div>

      {expandedIndex !== null && createPortal(
        <div className="photo-stack-lightbox" onClick={() => setExpandedIndex(null)}>
          <button
            type="button"
            className="photo-stack-lightbox-close"
            onClick={(event) => {
              event.stopPropagation();
              setExpandedIndex(null);
            }}
            aria-label="Close enlarged image"
          >
            <X size={28} />
          </button>
          <img
            src={images[expandedIndex]}
            alt={`${title} ${expandedIndex + 1}`}
            draggable={false}
            onClick={(event) => event.stopPropagation()}
          />
        </div>,
        document.body
      )}

      <style>{`
        .photo-stack-shell {
          position: relative;
          display: grid;
          justify-items: center;
          gap: 1.4rem;
          width: 100%;
        }

        .photo-stack-stage {
          position: relative;
          max-height: min(52svh, 38rem);
          min-height: min(42svh, 25rem);
          touch-action: none;
          cursor: grab;
          user-select: none;
          transition: width 420ms cubic-bezier(0.16, 1, 0.3, 1), aspect-ratio 420ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .photo-stack-stage:active {
          cursor: grabbing;
        }

        .photo-stack-card {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 1.45rem;
          border: 1px solid rgba(255, 255, 255, 0.86);
          background: #f8f7f2;
          padding: clamp(0.42rem, 1vw, 0.72rem);
          box-shadow: 0 2.2rem 5rem rgba(0, 0, 0, 0.26);
          transform-origin: center center;
          transition: transform 520ms cubic-bezier(0.16, 1, 0.3, 1), opacity 360ms ease, filter 360ms ease;
        }

        .photo-stack-card.is-past,
        .photo-stack-card.is-next {
          filter: brightness(0.86) saturate(1.08) hue-rotate(12deg);
        }

        .photo-stack-card.is-current {
          filter: none;
        }

        .photo-stack-card img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
          border-radius: calc(1.45rem - clamp(0.42rem, 1vw, 0.72rem));
        }

        .photo-stack-zoom-hit {
          position: absolute;
          inset: 0;
          cursor: zoom-in;
        }

        .photo-stack-tint {
          position: absolute;
          inset: clamp(0.42rem, 1vw, 0.72rem);
          border-radius: calc(1.45rem - clamp(0.42rem, 1vw, 0.72rem));
          background: linear-gradient(90deg, rgba(0, 28, 32, 0.08), rgba(0, 145, 132, 0.32));
          pointer-events: none;
        }

        .photo-stack-controls {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          padding: 0.55rem 0.65rem;
          border: 1px solid rgba(23, 23, 23, 0.24);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.38);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-size: 0.78rem;
          letter-spacing: 0.1em;
        }

        .photo-stack-controls button {
          display: inline-grid;
          place-items: center;
          width: 2.1rem;
          height: 2.1rem;
          border-radius: 999px;
          background: #171717;
          color: white;
          transition: opacity 180ms ease, transform 180ms ease;
        }

        .photo-stack-controls button:hover:not(:disabled) {
          transform: translateY(-1px);
        }

        .photo-stack-controls button:disabled {
          opacity: 0.25;
          cursor: not-allowed;
        }

        .photo-stack-lightbox {
          position: fixed;
          inset: 0;
          z-index: 240;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1rem, 4vw, 4rem);
          background: rgba(0, 0, 0, 0.88);
          cursor: zoom-out;
        }

        .photo-stack-lightbox img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 0.8rem;
          box-shadow: 0 2rem 7rem rgba(0, 0, 0, 0.5);
        }

        .photo-stack-lightbox-close {
          position: fixed;
          top: 1.2rem;
          right: 1.2rem;
          display: grid;
          place-items: center;
          width: 3rem;
          height: 3rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          color: white;
        }

        @media (max-width: 767px) {
          .photo-stack-stage {
            max-width: 84vw;
            max-height: 46svh;
            min-height: 18rem;
          }

          .photo-stack-card {
            border-radius: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
};

const FilmNegativePreview = ({
  images,
  title,
}: {
  images: string[];
  title: string;
}) => {
  const frames = images.slice(0, 18);
  const strips = [frames.slice(0, 9), frames.slice(9, 18)].filter((strip) => strip.length > 0);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoadFrames, setShouldLoadFrames] = useState(false);

  useEffect(() => {
    const element = previewRef.current;
    if (!element || shouldLoadFrames) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoadFrames(true);
        observer.disconnect();
      },
      { threshold: 0.18 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoadFrames]);

  return (
    <div ref={previewRef} className={`film-negative-preview ${shouldLoadFrames ? 'is-loaded' : ''}`} aria-label={`${title} film preview`}>
      {strips.map((strip, stripIndex) => (
        <div
          className="film-negative-strip"
          key={`${title}-${stripIndex}`}
          style={{ animationDelay: `${stripIndex * 120}ms` }}
        >
          <div className="film-negative-leader">
            <img src="/works/local/film/film-leader-solid.png" alt="" draggable={false} />
          </div>
          <div className="film-negative-frames">
            {shouldLoadFrames
              ? strip.map((image, index) => (
                <div
                  className="film-negative-frame"
                  key={image}
                >
                  <img
                    src={image}
                    alt={`${title} preview ${stripIndex * 4 + index + 1}`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>
              ))
              : strip.map((_, index) => (
                <div
                  className="film-negative-frame is-empty"
                  key={`${title}-${stripIndex}-${index}-empty`}
                  style={{ animationDelay: `${index * 90}ms` }}
                />
              ))}
          </div>
        </div>
      ))}

      <style>{`
        .film-negative-preview {
          display: grid;
          gap: 0.45rem;
          width: max(34rem, calc(100vw - 2rem));
          min-height: 8rem;
          padding: 0.42rem 0 0.42rem 0.42rem;
          background: transparent;
          border: 0;
          border-right: 0;
        }

        .film-negative-strip {
          --film-strip-height: clamp(4.64rem, 6.7vw, 6.75rem);
          --film-hole-w: 0.34rem;
          --film-hole-gap: 0.42rem;
          --film-hole-h: 0.3rem;
          --film-hole-offset-y: 0.22rem;
          position: relative;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: 0;
          overflow: visible;
          background: transparent;
          padding: 0;
          padding-right: 0;
          transform: translateX(34%);
          opacity: 0;
        }

        .film-negative-preview.is-loaded .film-negative-strip {
          animation: film-strip-enter 1120ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .film-negative-strip::selection {
          background: transparent;
        }

        .film-negative-strip > * {
          position: relative;
          z-index: 1;
        }

        .film-negative-preview::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.22) 46%,
            rgba(255,255,255,0.42) 50%,
            rgba(255,255,255,0.18) 54%,
            transparent 100%
          );
          transform: translateX(-120%);
          animation: film-loading-scan 1.45s cubic-bezier(0.16, 1, 0.3, 1) 160ms both;
          mix-blend-mode: screen;
        }

        .film-negative-preview.is-loaded::after {
          animation-duration: 2.25s;
        }

        .film-negative-preview {
          position: relative;
          overflow: hidden;
        }

        .film-negative-leader {
          width: calc(var(--film-strip-height) * 1.187);
          height: var(--film-strip-height);
          aspect-ratio: 426 / 359;
          align-self: start;
          margin: 0 -0.12rem 0 0;
          overflow: visible;
          z-index: 3;
        }

        .film-negative-leader::before,
        .film-negative-leader::after {
          content: "";
          position: absolute;
          height: var(--film-hole-h);
          background: repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.94) 0 var(--film-hole-w),
            transparent var(--film-hole-w) calc(var(--film-hole-w) + var(--film-hole-gap))
          );
          opacity: 0.96;
          z-index: 2;
        }

        .film-negative-leader::before {
          left: 0.38rem;
          right: 0.22rem;
          top: var(--film-hole-offset-y);
        }

        .film-negative-leader::after {
          right: 0.28rem;
          bottom: var(--film-hole-offset-y);
          width: calc(var(--film-hole-w) * 2 + var(--film-hole-gap));
        }

        .film-negative-leader img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: fill;
          object-position: left center;
          user-select: none;
          pointer-events: none;
        }

        .film-negative-frames {
          position: relative;
          display: flex;
          flex: 1 1 auto;
          gap: 0.24rem;
          height: var(--film-strip-height);
          min-height: var(--film-strip-height);
          overflow: hidden;
          background: #050505;
          padding: 0.58rem 0;
          padding-right: 0;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.1),
            100vw 0 0 #050505;
        }

        .film-negative-frames::before,
        .film-negative-frames::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: var(--film-hole-h);
          background: repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.94) 0 var(--film-hole-w),
            transparent var(--film-hole-w) calc(var(--film-hole-w) + var(--film-hole-gap))
          );
          opacity: 0.96;
          z-index: 2;
        }

        .film-negative-frames::before {
          top: var(--film-hole-offset-y);
        }

        .film-negative-frames::after {
          bottom: var(--film-hole-offset-y);
        }

        .film-negative-strip::selection {
          background: transparent;
        }

        .film-negative-strip::marker {
          content: "";
        }

        .film-negative-frame {
          flex: 0 0 clamp(6.2rem, 9.4vw, 10.8rem);
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #111;
          border: 1px solid rgba(255,255,255,0.22);
          border-left: 0;
          opacity: 1;
          transform: none;
        }

        .film-negative-frame.is-empty {
          opacity: 1;
          transform: none;
          animation: film-empty-pulse 1.6s ease-in-out infinite alternate;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0)),
            #121212;
          border-color: rgba(255,255,255,0.14);
        }

        .film-negative-frame img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: contrast(1.08) saturate(0.95);
        }

        @keyframes film-strip-enter {
          0% {
            transform: translateX(34%);
            opacity: 0;
          }

          62% {
            opacity: 1;
          }

          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes film-loading-scan {
          0% {
            transform: translateX(-120%);
            opacity: 0;
          }

          24% {
            opacity: 0.72;
          }

          100% {
            transform: translateX(120%);
            opacity: 0;
          }
        }

        @keyframes film-loading-dot {
          from {
            opacity: 0.28;
            transform: translateY(0);
          }

          to {
            opacity: 1;
            transform: translateY(-1px);
          }
        }

        @keyframes film-empty-pulse {
          from {
            background-color: #0d0d0d;
          }

          to {
            background-color: #181818;
          }
        }

        @media (max-width: 767px) {
          .film-negative-preview {
            padding: 0.5rem;
          }

          .film-negative-strip {
            grid-template-columns: auto minmax(0, 1fr);
            padding-left: 0;
            padding-right: 0;
          }

          .film-negative-leader {
            width: calc(var(--film-strip-height) * 1.187);
          }

          .film-negative-preview {
            width: calc(100vw - 1rem);
          }

          .film-negative-frame {
            flex-basis: clamp(5.2rem, 28vw, 7rem);
          }
        }
      `}</style>
    </div>
  );
};

const CategoryArchiveDetail = ({
  language,
  category,
  projects,
  onBack,
  onProjectSelect,
}: {
  language: Language;
  category: string;
  projects: any[];
  onBack: () => void;
  onProjectSelect: (project: ProjectDisplay) => void;
}) => {
  const folder = getArchiveFolder(category);
  const localCollection: null | (LocalPortfolioCollection & { images: string[] }) = null;
  const rows = getArchiveProjects(projects, category);
  const title = language === 'zh' ? folder.zh : folder.en;
  const localTitle = localCollection?.title[language] || title;
  const localDescription = localCollection?.description[language] || '';
  const [activePhotoCollection, setActivePhotoCollection] = useState<(LocalPortfolioCollection & { images: string[] }) | null>(null);
  const localArchiveCollections = category === Category.PHOTO
    ? LOCAL_PHOTOGRAPHY_COLLECTIONS
    : category === Category.ENVIRONMENT
      ? LOCAL_ENVIRONMENT_COLLECTIONS
      : null;

  if (localArchiveCollections) {
    const previewTitle = activePhotoCollection?.title[language] || title;
    const previewDescription = activePhotoCollection?.description[language] || '';
    const isInteriorDemo = activePhotoCollection?.id === 'interior-demo';
    const isPhotoArchive = category === Category.PHOTO;
    const projectLabel = category === Category.PHOTO
      ? (language === 'zh' ? '摄影项目' : 'Photography Projects')
      : (language === 'zh' ? '室内 / 环境设计项目' : 'Interior / Environment Projects');

    return (
      <section className="relative w-full -mt-6 md:-mt-10 min-h-[calc(100svh-6rem)] bg-white dark:bg-black text-black dark:text-white animate-fade-in">
        <button
          onClick={() => {
            if (activePhotoCollection) {
              setActivePhotoCollection(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
              return;
            }
            onBack();
          }}
          className="absolute left-5 md:left-8 top-6 md:top-8 z-20 font-mono text-xs md:text-sm uppercase tracking-[0.14em] hover:translate-x-[-4px] transition-transform"
        >
          ← {activePhotoCollection
            ? (language === 'zh' ? `返回${title}` : `Back to ${title}`)
            : (language === 'zh' ? '返回所有作品' : 'See All Works')}
        </button>

        <div className="grid grid-cols-1 xl:grid-cols-[24vw_minmax(0,1fr)] min-h-[calc(100svh-6rem)]">
          <aside className="relative hidden xl:block">
            <div className="absolute left-1/2 top-[24%] h-[27rem] w-[8rem] -translate-x-1/2 rotate-[-18deg] rounded-[1.6rem] border border-black/10 bg-gradient-to-b from-white/95 to-slate-200/30 shadow-2xl opacity-80">
              <div className="absolute left-1/2 top-[-2.4rem] h-20 w-20 -translate-x-1/2 rounded-full border-[10px] border-slate-300/60 bg-white/60" />
              <div className="absolute inset-4 rounded-[1rem] border border-white/80 bg-white/20" />
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rotate-90 font-serif text-6xl tracking-[-0.08em] text-slate-500/70">
                {folder.index}
              </div>
              <div className="absolute left-3 top-6 rotate-90 origin-left font-mono text-xs uppercase tracking-[0.2em] text-slate-500/80 whitespace-nowrap">
                {title} / Works
              </div>
            </div>
          </aside>

          <div
            className="relative mt-20 xl:mt-0 min-h-[calc(100svh-6rem)] bg-[#d8d8d6] text-[#171717] shadow-[0_-18px_40px_rgba(0,0,0,0.12)]"
            style={{ clipPath: 'polygon(0 0, 31% 0, 34% 3.25rem, 100% 3.25rem, 100% 100%, 0 100%)' }}
          >
            <header className="px-5 md:px-8 pt-6 md:pt-8 pb-5 md:pb-6">
              <p className="font-mono text-sm mb-6">{folder.index}</p>
              <h2 className="font-serif text-[clamp(3rem,12vw,5.25rem)] md:text-[8vw] lg:text-[6vw] leading-[0.88] md:leading-[0.82] tracking-[-0.04em] md:tracking-[-0.06em] break-words">
                {title}
              </h2>
            </header>

            {activePhotoCollection ? (
              <div className="grid grid-cols-1 gap-4 md:gap-5 px-5 md:px-8 pb-6 md:pb-8">
                <div className="grid grid-cols-[minmax(8.5rem,0.82fr)_minmax(0,1.35fr)] sm:grid-cols-[minmax(13rem,0.82fr)_minmax(0,1.35fr)] gap-4 md:gap-8 border-y border-dotted border-black/55 py-4 md:py-5">
                  <div>
                  <p className="font-mono text-[0.66rem] md:text-sm uppercase tracking-[0.14em] text-black/55 mb-3 md:mb-5">
                    {activePhotoCollection.folderName} / {activePhotoCollection.imageCount} images
                  </p>
                  <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-[-0.05em]">
                    {previewTitle}
                  </h3>
                  </div>

                  <div className="pt-5 sm:pt-7 md:pt-8">
                  <p className="max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-black/70">
                    {previewDescription}
                  </p>
                  <div className="mt-4 md:mt-5 flex flex-wrap gap-2">
                    {activePhotoCollection.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-black/20 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-black/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 md:mt-6 font-mono text-[0.64rem] md:text-xs uppercase tracking-[0.12em] text-black/45">
                    {activePhotoCollection.images.length === 1
                      ? (language === 'zh'
                        ? '点击图片可放大查看。'
                        : 'Click the image to enlarge.')
                      : (language === 'zh'
                        ? '按住照片左右拖动并松开即可翻页；点击当前照片可放大查看。'
                        : 'Hold and drag left or right to flip. Click the current image to enlarge.')}
                  </p>
                  </div>
                </div>

                <div className="flex min-h-0 items-center justify-center overflow-visible py-2 md:py-3">
                  {activePhotoCollection.images.length === 1 ? (
                    <SingleImagePreview
                      image={activePhotoCollection.images[0]}
                      title={previewTitle}
                      presentation={isInteriorDemo ? 'flush' : 'framed'}
                    />
                  ) : (
                    <PhotoStackViewer images={activePhotoCollection.images} title={previewTitle} />
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_34vw] px-5 md:px-8 py-4 border-y border-dotted border-black/55 font-mono text-xs md:text-sm uppercase tracking-[0.08em]">
                  <span>{projectLabel}</span>
                  <span className="hidden md:block">{language === 'zh' ? '预览' : 'Preview'}</span>
                </div>

                <div>
                  {localArchiveCollections.map((project, index) => {
                    const projectTitle = project.title[language];
                    const projectDescription = project.description[language];
                    const coverImage = project.images[0];
                    const isDemoCover = project.id === 'interior-demo';

                    return (
                      <button
                        key={project.id}
                        onClick={() => {
                          setActivePhotoCollection({
                            ...project,
                            images: project.images.length > 1 ? shuffleImages(project.images) : project.images,
                          });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={isPhotoArchive
                          ? 'group w-full text-left grid grid-cols-1 md:grid-cols-[minmax(0,0.52fr)_minmax(30rem,50vw)] gap-4 md:gap-7 px-5 md:px-8 py-5 md:py-6 min-h-[11rem] md:min-h-[12rem] border-b border-dotted border-black/55 transition-colors duration-300 overflow-visible'
                          : 'group w-full text-left grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_32vw] md:hover:grid-cols-[minmax(0,0.82fr)_42vw] gap-4 md:gap-8 px-5 md:px-8 py-5 md:py-6 min-h-[8.5rem] md:min-h-[10rem] hover:min-h-[18rem] border-b border-dotted border-black/55 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden'}
                      >
                        <div className="flex flex-col justify-between gap-8 min-w-0">
                          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight tracking-[-0.04em]">
                            {String(index + 1).padStart(2, '0')} / {projectTitle}
                          </h3>

                          <div className={isPhotoArchive
                            ? 'grid grid-cols-1 gap-2 font-mono text-xs uppercase tracking-[0.08em] opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-48 transition-all duration-500'
                            : 'grid grid-cols-1 sm:grid-cols-[10rem_minmax(0,1fr)] gap-4 font-mono text-xs md:text-sm uppercase tracking-[0.08em] opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500'}
                          >
                            <span>{project.imageCount} images</span>
                            <span className="leading-relaxed">{project.tags.join(' / ')}</span>
                            <p className={isPhotoArchive
                              ? 'normal-case tracking-normal text-sm line-clamp-3 opacity-70'
                              : 'sm:col-span-2 normal-case tracking-normal text-sm md:text-base line-clamp-2 opacity-70'}
                            >
                              {projectDescription}
                            </p>
                          </div>
                        </div>

                        {isPhotoArchive ? (
                          <FilmNegativePreview images={project.images} title={projectTitle} />
                        ) : (
                          <div className={isDemoCover
                            ? 'relative h-36 md:h-48 lg:h-56 min-h-0 self-start overflow-hidden bg-black'
                            : 'relative h-28 md:h-full min-h-[7rem] overflow-hidden bg-black'}
                          >
                            <img
                              src={coverImage}
                              alt={projectTitle}
                              loading="lazy"
                              decoding="async"
                              className={isDemoCover
                                ? 'h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
                                : 'h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'}
                            />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (localCollection) {
    return (
      <section className="relative w-full -mt-6 md:-mt-10 min-h-[calc(100svh-6rem)] bg-white dark:bg-black text-black dark:text-white animate-fade-in">
        <button
          onClick={onBack}
          className="absolute left-5 md:left-8 top-6 md:top-8 z-20 font-mono text-xs md:text-sm uppercase tracking-[0.14em] hover:translate-x-[-4px] transition-transform"
        >
          ← {language === 'zh' ? '返回所有作品' : 'See All Works'}
        </button>

        <div className="grid grid-cols-1 xl:grid-cols-[24vw_minmax(0,1fr)] min-h-[calc(100svh-6rem)]">
          <aside className="relative hidden xl:block">
            <div className="absolute left-1/2 top-[24%] h-[27rem] w-[8rem] -translate-x-1/2 rotate-[-18deg] rounded-[1.6rem] border border-black/10 bg-gradient-to-b from-white/95 to-slate-200/30 shadow-2xl opacity-80">
              <div className="absolute left-1/2 top-[-2.4rem] h-20 w-20 -translate-x-1/2 rounded-full border-[10px] border-slate-300/60 bg-white/60" />
              <div className="absolute inset-4 rounded-[1rem] border border-white/80 bg-white/20" />
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rotate-90 font-serif text-6xl tracking-[-0.08em] text-slate-500/70">
                {folder.index}
              </div>
              <div className="absolute left-3 top-6 rotate-90 origin-left font-mono text-xs uppercase tracking-[0.2em] text-slate-500/80 whitespace-nowrap">
                {title} / Works
              </div>
            </div>
          </aside>

          <div
            className="relative mt-20 xl:mt-0 min-h-[calc(100svh-6rem)] bg-[#d8d8d6] text-[#171717] shadow-[0_-18px_40px_rgba(0,0,0,0.12)]"
            style={{ clipPath: 'polygon(0 0, 31% 0, 34% 3.25rem, 100% 3.25rem, 100% 100%, 0 100%)' }}
          >
            <header className="px-5 md:px-8 pt-6 md:pt-8 pb-5 md:pb-6">
              <p className="font-mono text-sm mb-6">{folder.index}</p>
              <h2 className="font-serif text-[clamp(3rem,12vw,5.25rem)] md:text-[8vw] lg:text-[6vw] leading-[0.88] md:leading-[0.82] tracking-[-0.04em] md:tracking-[-0.06em] break-words">
                {title}
              </h2>
            </header>

            <div className="grid grid-cols-1 2xl:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] gap-8 md:gap-12 px-5 md:px-8 pb-10 md:pb-14">
              <div className="border-y border-dotted border-black/55 py-5 md:py-7">
                <p className="font-mono text-xs md:text-sm uppercase tracking-[0.14em] text-black/55 mb-6">
                  {localCollection.folderName} / {localCollection.imageCount} images
                </p>
                <h3 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-[-0.05em] mb-6">
                  {localTitle}
                </h3>
                <p className="max-w-xl text-base md:text-lg leading-relaxed text-black/70">
                  {localDescription}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {localCollection.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/20 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-black/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-10 font-mono text-xs uppercase tracking-[0.12em] text-black/45">
                  {language === 'zh'
                    ? '点击右侧照片、滚轮或拖动可翻页。上一张会停在左侧。'
                    : 'Click, wheel, drag, or use arrow keys. Viewed images stay on the left.'}
                </p>
              </div>

              <div className="flex min-h-[32rem] items-center justify-center overflow-visible py-4 md:py-8">
                <PhotoStackViewer images={localCollection.images} title={localTitle} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full -mt-6 md:-mt-10 min-h-[calc(100svh-6rem)] bg-white dark:bg-black text-black dark:text-white animate-fade-in">
      <button
        onClick={onBack}
        className="absolute left-5 md:left-8 top-6 md:top-8 z-20 font-mono text-xs md:text-sm uppercase tracking-[0.14em] hover:translate-x-[-4px] transition-transform"
      >
        ← {language === 'zh' ? '返回所有作品' : 'See All Works'}
      </button>

      <div className="grid grid-cols-1 xl:grid-cols-[24vw_minmax(0,1fr)] min-h-[calc(100svh-6rem)]">
        <aside className="relative hidden xl:block">
          <div className="absolute left-1/2 top-[24%] h-[27rem] w-[8rem] -translate-x-1/2 rotate-[-18deg] rounded-[1.6rem] border border-black/10 bg-gradient-to-b from-white/95 to-slate-200/30 shadow-2xl opacity-80">
            <div className="absolute left-1/2 top-[-2.4rem] h-20 w-20 -translate-x-1/2 rounded-full border-[10px] border-slate-300/60 bg-white/60" />
            <div className="absolute inset-4 rounded-[1rem] border border-white/80 bg-white/20" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rotate-90 font-serif text-6xl tracking-[-0.08em] text-slate-500/70">
              {folder.index}
            </div>
            <div className="absolute left-3 top-6 rotate-90 origin-left font-mono text-xs uppercase tracking-[0.2em] text-slate-500/80 whitespace-nowrap">
              {title} / Works
            </div>
          </div>
        </aside>

        <div
          className="relative mt-20 xl:mt-0 min-h-[calc(100svh-6rem)] bg-[#d8d8d6] text-[#171717] shadow-[0_-18px_40px_rgba(0,0,0,0.12)]"
          style={{ clipPath: 'polygon(0 0, 31% 0, 34% 3.25rem, 100% 3.25rem, 100% 100%, 0 100%)' }}
        >
          <header className="px-5 md:px-8 pt-6 md:pt-8 pb-5 md:pb-6">
            <p className="font-mono text-sm mb-6">{folder.index}</p>
            <h2 className="font-serif text-[clamp(3rem,12vw,5.25rem)] md:text-[8vw] lg:text-[6vw] leading-[0.88] md:leading-[0.82] tracking-[-0.04em] md:tracking-[-0.06em] break-words">
              {title}
            </h2>
          </header>

          <div className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_34vw] px-5 md:px-8 py-4 border-y border-dotted border-black/55 font-mono text-xs md:text-sm uppercase tracking-[0.08em]">
            <span>{language === 'zh' ? '项目标题' : 'Project Title'}</span>
            <span className="hidden md:block">{language === 'zh' ? '预览' : 'Preview'}</span>
          </div>

          <div>
            {rows.map((project, index) => {
              const year = project.date || project.year || (index % 2 === 0 ? '2026' : '2025');
              const tags = Array.isArray(project.tags) ? project.tags.slice(0, 4) : [];
              const image = project.image || project.coverImage || '';
              const canOpen = !String(project.id).includes('placeholder');

              return (
                <button
                  key={project.id}
                  onClick={() => canOpen && onProjectSelect(project as ProjectDisplay)}
                  className="group w-full text-left grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_32vw] md:hover:grid-cols-[minmax(0,0.82fr)_42vw] gap-4 md:gap-8 px-5 md:px-8 py-5 md:py-6 min-h-[8.5rem] md:min-h-[10rem] hover:min-h-[18rem] border-b border-dotted border-black/55 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
                >
                  <div className="flex flex-col justify-between gap-8 min-w-0">
                    <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight tracking-[-0.04em]">
                      {project.title}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-[10rem_minmax(0,1fr)] gap-4 font-mono text-xs md:text-sm uppercase tracking-[0.08em] opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500">
                      <span>{year}</span>
                      <span className="leading-relaxed">
                        {tags.length > 0 ? tags.join(' / ') : (language === 'zh' ? '关键词整理中' : 'Tags Pending')}
                      </span>
                      <p className="sm:col-span-2 normal-case tracking-normal text-sm md:text-base line-clamp-2 opacity-70">
                        {project.description || project.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="relative h-28 md:h-full min-h-[7rem] overflow-hidden bg-black">
                    {image ? (
                      <img
                        src={image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-[repeating-linear-gradient(135deg,#111_0,#111_10px,#222_10px,#222_20px)]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ language, externalFilter, archiveLayout = false }) => {
  const [filter, setFilter] = useState<string>(archiveLayout ? Category.PHOTO : 'All');
  const [hoveredArchive, setHoveredArchive] = useState<string | null>(null);
  const [activeArchiveCategory, setActiveArchiveCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectDisplay | null>(null);
  const [displayProject, setDisplayProject] = useState<ProjectDisplay | null>(null);
  const [isModalRendered, setIsModalRendered] = useState(false);
  const [showArchiveToast, setShowArchiveToast] = useState(false);
  
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Sync with external filter if provided
  useEffect(() => {
    if (externalFilter) {
      if (archiveLayout && externalFilter === BBQ_CATEGORY) {
        setFilter(Category.PHOTO);
        setActiveArchiveCategory(null);
        return;
      }

      setFilter(archiveLayout && externalFilter === 'All' ? Category.PHOTO : externalFilter);
      if (archiveLayout && externalFilter === 'All') {
        setActiveArchiveCategory(null);
      }
      if (archiveLayout && externalFilter !== 'All') {
        setActiveArchiveCategory(externalFilter);
      }
    }
  }, [externalFilter, archiveLayout]);

  useEffect(() => {
    if (archiveLayout && filter === 'All') {
      setFilter(Category.PHOTO);
    }
  }, [archiveLayout, filter]);

  useEffect(() => {
    if (archiveLayout && activeArchiveCategory === BBQ_CATEGORY) {
      setActiveArchiveCategory(null);
      setFilter(Category.PHOTO);
      setShowArchiveToast(true);
      window.setTimeout(() => setShowArchiveToast(false), 2000);
    }
  }, [archiveLayout, activeArchiveCategory]);

  useEffect(() => {
    if (archiveLayout && activeArchiveCategory) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [archiveLayout, activeArchiveCategory]);

  // Get Categories in preferred order
  const currentProjects = PROJECTS[language];
  const preferredOrder = [
    Category.PHOTO,
    Category.VIDEO,
    Category.DESIGN,
    Category.ENVIRONMENT
  ];
  const archiveOrder = [
    Category.PHOTO,
    PHOTO_COLLECTION_CATEGORY,
    Category.VIDEO,
    Category.DESIGN,
    Category.ENVIRONMENT,
    BBQ_CATEGORY
  ];
  
  // Keep every discipline visible even when its project list is still empty.
  const categories = archiveLayout ? archiveOrder : ['All', ...preferredOrder];

  const filteredProjects = filter === 'All'
    ? currentProjects 
    : currentProjects.filter(p => p.category === filter);

  const handleLockedArchiveCategory = () => {
    setActiveArchiveCategory(null);
    setFilter(archiveLayout ? Category.PHOTO : 'All');
    setShowArchiveToast(true);
    window.setTimeout(() => setShowArchiveToast(false), 2000);
  };

  const handleOpenArchiveCategory = (category: string) => {
    if (category === BBQ_CATEGORY) {
      handleLockedArchiveCategory();
      return;
    }

    setActiveArchiveCategory(category);
  };

  // Handle Modal Render State for Animation
  useEffect(() => {
    if (selectedProject) {
      setDisplayProject(selectedProject);
      setIsModalRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const timer = setTimeout(() => {
        setIsModalRendered(false);
        setDisplayProject(null);
        setLightboxIndex(null); // Close lightbox when modal closes
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedProject]);

  // Derived Gallery for Lightbox
  const currentGallery = displayProject 
    ? (displayProject.gallery || PHOTOGRAPHY_GALLERY[displayProject.id] || []) 
    : [];

  // Lightbox Navigation
  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null && currentGallery.length > 0) {
      setLightboxIndex((prev) => (prev! - 1 + currentGallery.length) % currentGallery.length);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null && currentGallery.length > 0) {
      setLightboxIndex((prev) => (prev! + 1) % currentGallery.length);
    }
  };

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setLightboxIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, currentGallery.length]);

  // Swipe Handlers
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  const canRenderArchiveDetail = archiveLayout && activeArchiveCategory && activeArchiveCategory !== BBQ_CATEGORY;

  if (canRenderArchiveDetail) {
    return (
      <div className="relative left-1/2 w-screen -translate-x-1/2 pb-20">
        <CategoryArchiveDetail
          language={language}
          category={activeArchiveCategory}
          projects={currentProjects as any[]}
          onBack={() => setActiveArchiveCategory(null)}
          onProjectSelect={setSelectedProject}
        />

        {isModalRendered && createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <div className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${selectedProject ? 'opacity-100' : 'opacity-0'}`} onClick={() => setSelectedProject(null)} />
            {displayProject && (
              <div className={`relative bg-white dark:bg-[#111] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl transition-all duration-300 ${selectedProject ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-50 p-3 bg-black/10 dark:bg-white/10 rounded-full hover:rotate-90 transition-transform">
                  <X size={28} />
                </button>
                <div className="p-8 md:p-12">
                  <h2 className="text-4xl md:text-6xl font-black mb-4 text-black dark:text-white">{(displayProject as any).title}</h2>
                  <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">{(displayProject as any).description}</p>
                </div>
              </div>
            )}
          </div>,
          document.body
        )}
      </div>
    );
  }

  if (archiveLayout) {
    return (
      <div className="w-full max-w-[96vw] mx-auto pb-0">
        <ArchiveCategoryTabs
          language={language}
          filter={filter}
          setFilter={setFilter}
          onOpenCategory={handleOpenArchiveCategory}
          onLockedCategory={handleLockedArchiveCategory}
          hoveredArchive={hoveredArchive}
          setHoveredArchive={setHoveredArchive}
        />
        {showArchiveToast && createPortal(
          <div className="fixed bottom-10 left-1/2 z-[100] -translate-x-1/2 rounded-full bg-black px-8 py-4 text-xl font-bold text-white shadow-2xl animate-fade-in dark:bg-white dark:text-black">
            {language === 'zh' ? '公司团建可解锁此操作' : 'Available for company team-building events'}
          </div>,
          document.body
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-[96vw] mx-auto pb-20">
      
      {archiveLayout ? (
        <>
        <ArchiveCategoryTabs
          language={language}
          filter={filter}
          setFilter={setFilter}
          onOpenCategory={handleOpenArchiveCategory}
          onLockedCategory={handleLockedArchiveCategory}
          hoveredArchive={hoveredArchive}
          setHoveredArchive={setHoveredArchive}
        />
        <div className="hidden" aria-hidden="true">
          <div className="absolute inset-x-0 top-0 flex justify-between font-mono text-xs md:text-sm uppercase tracking-[0.16em] text-black/70 dark:text-white/60">
            <span>{language === 'zh' ? '作品' : 'Works'}</span>
            <span className="font-serif text-5xl md:text-7xl normal-case tracking-[-0.05em] text-black/12 dark:text-white/12">
              Archive
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0">
            {ARCHIVE_CATEGORIES.map((cat) => {
              const active = filter === cat.id;
              const label = language === 'zh' ? cat.zh : cat.en;

              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`group relative min-h-[9.5rem] md:min-h-[11rem] lg:min-h-[12rem] text-left px-8 md:px-10 pt-7 pb-8 transition-all duration-300 hover:-translate-y-2 ${cat.offset} ${
                    active ? 'z-20 shadow-[0_-16px_40px_rgba(0,0,0,0.16)]' : 'z-10 opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: active ? cat.color : cat.color,
                    color: '#181818',
                    clipPath: 'polygon(0 0, calc(100% - 2.2rem) 0, 100% 2.2rem, 100% 100%, 0 100%)',
                  }}
                >
                  <span className="block font-mono text-sm mb-4">{cat.index}</span>
                  <span className="block font-serif text-[3.8rem] md:text-[5.2rem] lg:text-[6vw] leading-[0.82] tracking-[-0.06em]">
                    {label}
                  </span>
                  <span className={`absolute left-8 right-8 bottom-5 h-[3px] bg-black transition-transform duration-300 origin-left ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>
        </>
      ) : (
        <div className="flex flex-wrap gap-4 md:gap-8 mb-12 md:mb-16 border-b-2 border-black dark:border-white pb-4 md:pb-8 sticky top-20 md:top-24 bg-white/95 dark:bg-black/95 backdrop-blur-sm z-30 pt-4 transition-colors duration-300 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`
                text-lg md:text-2xl font-bold transition-colors duration-200 whitespace-nowrap
                ${filter === cat
                  ? 'text-black dark:text-white underline decoration-4 underline-offset-8 decoration-black dark:decoration-white'
                  : 'text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white'}
              `}
            >
              {CATEGORY_LABELS[language][cat] || cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className={`grid grid-cols-1 ${
        filter === 'All'
          ? 'md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12'
          : 'md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16'
      }`}>
        {filteredProjects.length === 0 && (
          <div className="col-span-full min-h-[320px] border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2rem] flex flex-col items-center justify-center text-center px-8">
            <p className="text-3xl md:text-5xl font-black text-black dark:text-white mb-4">
              {language === 'zh' ? '内容整理中' : 'Work in progress'}
            </p>
            <p className="text-base md:text-xl text-gray-400 font-medium">
              {language === 'zh'
                ? '栏目已经保留，作品会在整理完成后陆续加入。'
                : 'This section is ready. Projects will be added as they are prepared.'}
            </p>
          </div>
        )}
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="group cursor-pointer flex flex-col h-full transform-gpu"
            onClick={() => setSelectedProject(project)}
          >
            <>
                  {/* Image container */}
                  <div className="w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800 mb-6 overflow-hidden rounded-2xl relative shadow-none border border-transparent transition-all duration-500 group-hover:shadow-2xl dark:group-hover:shadow-none dark:group-hover:border-white/20 transform-gpu">
                    {project.image && !project.image.includes('picsum') ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                        />
                    ) : project.bilibiliId ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors duration-300">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-[#FF6699] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                   <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1"><path d="M8 5v14l11-7z"/></svg>
                                </div>
                                <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Video Preview</span>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 p-8 text-center">
                            <div>
                                <h4 className={`${filter === 'All' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} font-black text-gray-400 dark:text-gray-600 mb-2 leading-tight`}>
                                    {project.title}<br/>
                                    <span className="text-lg md:text-xl font-normal opacity-70">{project.subtitle}</span>
                                </h4>
                                <p className="text-xs font-mono text-gray-400 mt-4 uppercase tracking-widest border border-gray-300 dark:border-gray-700 rounded-full px-3 py-1 inline-block">
                                    {language === 'zh' ? '预览部署中...' : 'Preview Deploying...'}
                                </p>
                            </div>
                        </div>
                    )}
                    
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white dark:bg-black dark:text-white px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg shadow-sm border border-transparent dark:border-white/10">
                      {CATEGORY_LABELS[language][project.category] || project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex justify-between items-start border-b-2 border-gray-100 dark:border-gray-800 pb-6 group-hover:border-black dark:group-hover:border-white transition-colors duration-300 mt-auto">
                    <div className="pr-4 md:pr-8">
                        <h3 className={`${filter === 'All' ? 'text-xl md:text-2xl' : 'text-2xl md:text-4xl'} font-black text-black dark:text-white mb-2 md:mb-3 group-hover:text-gray-800 dark:group-hover:text-gray-200 leading-tight transition-colors`}>
                          {project.title}
                        </h3>
                      <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed font-medium transition-colors">
                        {project.description}
                      </p>
                    </div>
                    <div className="bg-black dark:bg-white text-white dark:text-black p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shrink-0">
                       <ArrowUpRight size={24} className="md:w-7 md:h-7" />
                    </div>
                  </div>

                  {/* Tags */}
                  {project.category !== Category.PHOTO && (
                    <div className="mt-4 flex flex-wrap gap-2 md:gap-3">
                       {project.tags.map(tag => (
                         <span key={tag} className="text-[10px] md:text-xs font-bold font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider border border-gray-200 dark:border-gray-800 px-2 py-1 rounded-md">#{tag}</span>
                       ))}
                    </div>
                  )}
            </>

          </div>
        ))}
      </div>

      {/* PROJECT DETAIL MODAL */}
      {isModalRendered && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
           {/* Lightbox Overlay */}
           {lightboxIndex !== null && (
             <div 
               className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 md:p-12 animate-[fadeIn_0.3s_ease-out_forwards]"
               onClick={() => setLightboxIndex(null)}
               onTouchStart={onTouchStart}
               onTouchMove={onTouchMove}
               onTouchEnd={onTouchEnd}
             >
                <div 
                  className="relative max-w-full max-h-full w-full h-full flex items-center justify-center animate-message-pop"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img 
                    src={currentGallery[lightboxIndex]} 
                    alt="Full View" 
                    className="max-w-full max-h-full object-contain shadow-2xl rounded-lg select-none"
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />
                  
                  {/* Close Button */}
                  <button 
                    className="absolute top-4 right-4 md:top-0 md:right-0 md:-mt-12 md:-mr-12 text-white/50 hover:text-white transition-colors p-2"
                    onClick={() => setLightboxIndex(null)}
                  >
                    <X size={32} />
                  </button>

                  {/* Navigation Buttons */}
                  {currentGallery.length > 1 && (
                    <>
                      <button 
                        className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/40 rounded-full md:bg-transparent"
                        onClick={handlePrev}
                      >
                        <ChevronLeft size={48} />
                      </button>
                      <button 
                        className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/40 rounded-full md:bg-transparent"
                        onClick={handleNext}
                      >
                        <ChevronRight size={48} />
                      </button>
                    </>
                  )}
                  
                  {/* Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 font-mono text-sm bg-black/50 px-3 py-1 rounded-full">
                    {lightboxIndex + 1} / {currentGallery.length}
                  </div>
                </div>
             </div>
           )}

           {/* Backdrop - Use solid color opacity instead of blur for performance */}
           <div 
             className={`absolute inset-0 bg-black/80 ${selectedProject ? 'animate-[fadeIn_0.3s_ease-out_forwards]' : 'animate-fade-out'}`}
             onClick={() => setSelectedProject(null)}
           ></div>

           {/* Modal Content - Removed backdrop-blur-2xl to fix lag */}
           <div className={`
             relative w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar
             bg-white dark:bg-gray-900 
             rounded-[2rem] shadow-2xl border border-white/20 dark:border-white/10
             flex flex-col
             ${selectedProject ? 'animate-message-pop' : 'animate-message-pop-out'}
           `}>
             
             {displayProject && (
               <>
                 {/* Close Button */}
                 <button 
                   onClick={() => setSelectedProject(null)}
                   className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 rounded-full bg-white/50 dark:bg-black/50 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                 >
                   <X size={24} className="text-black dark:text-white" />
                 </button>

                 {displayProject.category === Category.PHOTO ? (
                    // SPECIAL PHOTO LAYOUT
                    <div className="p-6 md:p-12 flex flex-col items-center min-h-full">
                        <h2 className="text-3xl md:text-5xl font-black text-black dark:text-white mb-4 text-center">
                            {displayProject.title}
                        </h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl text-center mb-12 font-medium">
                            {displayProject.description}
                        </p>
                        
                        {(() => {
                            const gallery = displayProject.gallery || PHOTOGRAPHY_GALLERY[displayProject.id];
                            return gallery && gallery.length > 0 ? (
                                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                                    {gallery.map((item, idx) => (
                                        <React.Fragment key={idx}>
                                            <GalleryImage
                                                src={item}
                                                alt={`${displayProject.title} ${idx + 1}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setLightboxIndex(idx);
                                                }}
                                            />
                                        </React.Fragment>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 w-full border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2rem]">
                                    <p className="text-gray-400 font-mono">No images found in local folder.</p>
                                </div>
                            );
                        })()}
                    </div>
                 ) : (
                    // DEFAULT LAYOUT FOR OTHER CATEGORIES
                    <>
                     {/* Hero Media (Video, Bilibili, Figma or Image) */}
                     <div className={`
                        w-full bg-gray-200 dark:bg-gray-800 relative group-modal-media shrink-0
                        ${(displayProject.figmaUrl || displayProject.websiteUrl) ? 'h-[60vh] md:h-[80vh]' : 
                          (displayProject.videoUrl || displayProject.bilibiliId) ? 'aspect-video' : 
                          'h-[30vh] md:h-[50vh]'}
                     `}>
                        {displayProject.videoUrl ? (
                           <video 
                              src={displayProject.videoUrl} 
                              controls 
                              className="w-full h-full object-contain bg-black"
                              poster={displayProject.image}
                           />
                        ) : displayProject.bilibiliId ? (
                           // Bilibili Player with Click-to-Load Optimization
                           <div className="w-full h-full bg-black relative group">
                                <iframe
                                    src={`https://player.bilibili.com/player.html?bvid=${displayProject.bilibiliId}&page=1&high_quality=1&danmaku=0&autoplay=0`}
                                    className="w-full h-full relative z-10"
                                    scrolling="no"
                                    frameBorder="0"
                                    allowFullScreen
                                    sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-presentation"
                                ></iframe>
                           </div>
                        ) : displayProject.figmaUrl ? (
                           <iframe
                             src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(displayProject.figmaUrl)}`}
                             className="w-full h-full border-none"
                             allowFullScreen
                           ></iframe>
                        ) : displayProject.websiteUrl ? (
                           <iframe
                             src={displayProject.websiteUrl}
                             className="w-full h-full border-none bg-white"
                             title={displayProject.title}
                             allowFullScreen
                           ></iframe>
                        ) : (
                           <>
                              {displayProject.image && !displayProject.image.includes('picsum') ? (
                                  <img 
                                    src={displayProject.image} 
                                    alt={displayProject.title} 
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover" 
                                  />
                              ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-800">
                                      <div className="text-center">
                                          <h2 className="text-4xl font-black text-black/20 dark:text-white/20 mb-2">{displayProject.title}</h2>
                                          <p className="text-xl font-bold text-black/20 dark:text-white/20 uppercase tracking-widest">
                                              {language === 'zh' ? '预览部署中...' : 'Preview Deploying...'}
                                          </p>
                                      </div>
                                  </div>
                              )}
                              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                           </>
                        )}
                     </div>

                     <div className="p-6 md:p-12">
                       {/* Header */}
                       <div className="mb-8 md:mb-12">
                         <div className="flex items-center gap-3 mb-4">
                           <span className="px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black text-sm font-bold uppercase rounded-md">
                             {CATEGORY_LABELS[language][displayProject.category] || displayProject.category}
                           </span>
                           <span className="text-gray-500 font-mono text-sm uppercase font-bold tracking-widest">{displayProject.subtitle}</span>
                         </div>
                         <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-6 leading-tight">
                           {displayProject.title}
                         </h2>
                         <p className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
                           {displayProject.description}
                         </p>
                       </div>

                       <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 mb-8 md:mb-12"></div>

                       {/* Grid Info */}
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                         
                         {/* Left Col: Concept - Thinner Line */}
                         {displayProject.concept && (
                             <div className="space-y-8">
                                <h3 className="text-2xl font-black uppercase tracking-wide text-black dark:text-white border-l-4 border-black dark:border-white pl-6">
                                  {language === 'zh' ? '设计意图 / 创意陈述' : 'Concept / Statement'}
                                </h3>
                                <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                                   {displayProject.concept}
                                </p>
                             </div>
                         )}

                         {/* Right Col: Details */}
                         <div className="space-y-10">
                            {/* Awards - Aligned Star */}
                            {displayProject.awards && displayProject.awards.length > 0 && (
                                <div className="space-y-4">
                                  <h4 className="text-base font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider">
                                    {language === 'zh' ? '获奖情况' : 'Awards & Recognition'}
                                  </h4>
                                  <ul className="space-y-3">
                                        {displayProject.awards.map((award, i) => {
                                          const isNone = award === "暂无获奖" || award === "无" || award === "None";
                                          return (
                                            <li key={i} className={`flex items-baseline font-bold text-xl ${isNone ? 'text-gray-400 dark:text-gray-500' : 'text-black dark:text-white'}`}>
                                              <span className={`mr-3 text-lg flex-shrink-0 ${isNone ? 'text-gray-300 dark:text-gray-600' : 'text-yellow-500'}`}>★</span> 
                                              <span>{award}</span>
                                            </li>
                                          );
                                        })}
                                  </ul>
                                </div>
                            )}

                            {/* Role, Tags, Links - Flex Row */}
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                {/* Role */}
                                <div className="space-y-4 flex-1 min-w-[200px]">
                                    <h4 className="text-base font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider">
                                        {language === 'zh' ? '分工与职责' : 'Role & Responsibility'}
                                    </h4>
                                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                        <span className="font-bold text-black dark:text-white block mb-1 text-lg">{displayProject.role}</span>
                                        {displayProject.roleDetail}
                                    </p>
                                </div>

                                {/* Tags */}
                                <div className="space-y-4 flex-1 min-w-[200px]">
                                    <h4 className="text-base font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {displayProject.tags.map(tag => (
                                            <span key={tag} className="text-xs font-bold font-mono text-gray-500 border border-gray-300 dark:border-gray-700 px-3 py-1.5 rounded-lg">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Links */}
                                {(displayProject.githubUrl || displayProject.websiteUrl) && (
                                    <div className="space-y-4 flex-1 min-w-[200px]">
                                        <h4 className="text-base font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider">
                                            {language === 'zh' ? '相关链接' : 'Links'}
                                        </h4>
                                        <div className="flex flex-wrap gap-4">
                                            {displayProject.githubUrl && (
                                                <a href={displayProject.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                                    <Github size={18} />
                                                    <span className="font-bold underline decoration-2 underline-offset-4 text-sm">GitHub</span>
                                                </a>
                                            )}
                                            {displayProject.websiteUrl && (
                                                <a href={displayProject.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                                    <ExternalLink size={18} />
                                                    <span className="font-bold underline decoration-2 underline-offset-4 text-sm">Demo</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                         </div>

                       </div>

                     </div>
                   </>
                 )}
               </>
             )}
           </div>
        </div>,
        document.body
      )}

    </div>
  );
};
