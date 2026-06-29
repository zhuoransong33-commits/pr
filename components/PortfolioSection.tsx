
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, CATEGORY_LABELS } from '../constants';
import { Category, Language, ProjectDisplay } from '../types';
import { PHOTOGRAPHY_GALLERY } from '../src/data/photography';
import { ArrowUpRight, X, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

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
  { id: Category.VIDEO, index: '02', zh: '动态影像', en: 'Videography', color: '#d8d8d6' },
  { id: Category.DESIGN, index: '03', zh: '平面交互', en: 'Graphic & UI', color: '#eeeeec' },
  { id: Category.ENVIRONMENT, index: '04', zh: '环境 / 室内设计', en: 'Environment / Interior', color: '#b7b7b5' },
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
  hoveredArchive,
  setHoveredArchive,
}: {
  language: Language;
  filter: string;
  setFilter: (category: string) => void;
  onOpenCategory: (category: string) => void;
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

    <div className="archive-folder-stage absolute inset-x-0 bottom-0 hidden lg:block h-[clamp(21rem,40svh,28rem)]">
      {ARCHIVE_FOLDERS.map((cat, index) => {
        const label = language === 'zh' ? cat.zh : cat.en;
        const isHovered = hoveredArchive === cat.id;
        const isDimmed = hoveredArchive !== null && hoveredArchive !== cat.id;
        const layout = {
          [Category.PHOTO]: { left: '0%', width: '50%', top: '0%', bottom: 'auto', height: '50%', zIndex: 20, delay: '160ms' },
          [Category.VIDEO]: { left: '50%', width: '50%', top: '0%', bottom: 'auto', height: '50%', zIndex: 20, delay: '220ms' },
          [Category.DESIGN]: { left: '0%', width: '52%', top: 'calc(50% - 2.55rem)', bottom: 'auto', height: 'calc(50% + 2.55rem)', zIndex: 34, delay: '40ms' },
          [Category.ENVIRONMENT]: { left: '38%', width: '62%', top: 'calc(50% - 2.55rem)', bottom: 'auto', height: 'calc(50% + 2.55rem)', zIndex: 36, delay: '90ms' },
        }[cat.id];

        return (
          <button
            key={cat.id}
            onClick={() => {
              setFilter(cat.id);
              onOpenCategory(cat.id);
            }}
            onMouseEnter={() => setHoveredArchive(cat.id)}
            onFocus={() => setHoveredArchive(cat.id)}
            onBlur={() => setHoveredArchive(null)}
            className="archive-folder-card group absolute overflow-visible text-left px-[clamp(1.5rem,2.4vw,3rem)] pt-[clamp(1.05rem,1.6vw,1.6rem)] pb-6 transition-[transform,background-color,color,filter] duration-300 ease-out will-change-transform"
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
              clipPath: 'polygon(0 0, 47% 0, calc(47% + 2.35rem) 2.35rem, 100% 2.35rem, 100% 100%, 0 100%)',
              animation: `archiveFolderRise 620ms cubic-bezier(0.16, 1, 0.3, 1) ${layout.delay} both`,
            }}
          >
            <span className="archive-folder-index block font-mono mb-3">{cat.index}</span>
            <span className="block max-w-[95%] font-serif text-[clamp(2.85rem,4.75vw,5.95rem)] leading-[0.95] tracking-[-0.06em] break-keep">
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
          [Category.VIDEO]: '220ms',
          [Category.DESIGN]: '140ms',
          [Category.ENVIRONMENT]: '60ms',
        }[cat.id];

        return (
          <button
            key={cat.id}
            onClick={() => {
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
  const rows = getArchiveProjects(projects, category);
  const title = language === 'zh' ? folder.zh : folder.en;

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
            <h2 className="font-serif text-[18vw] md:text-[8vw] lg:text-[6vw] leading-[0.82] tracking-[-0.06em]">
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
  
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Sync with external filter if provided
  useEffect(() => {
    if (externalFilter) {
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

  // Get Categories in preferred order
  const currentProjects = PROJECTS[language];
  const preferredOrder = [
    Category.PHOTO,
    Category.VIDEO,
    Category.DESIGN,
    Category.ENVIRONMENT
  ];
  
  // Keep every discipline visible even when its project list is still empty.
  const categories = archiveLayout ? preferredOrder : ['All', ...preferredOrder];

  const filteredProjects = filter === 'All'
    ? currentProjects 
    : currentProjects.filter(p => p.category === filter);

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

  if (archiveLayout && activeArchiveCategory) {
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
          onOpenCategory={setActiveArchiveCategory}
          hoveredArchive={hoveredArchive}
          setHoveredArchive={setHoveredArchive}
        />
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
          onOpenCategory={setActiveArchiveCategory}
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
