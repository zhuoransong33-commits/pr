import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { HOME_DATA } from '../src/data/home';
import { CONTACT_DATA } from '../src/data/contact';
import { Language, Category } from '../types';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
  onCategorySelect: (category: Category) => void;
  language: Language;
}

interface ArchiveFolder {
  id: string;
  index: string;
  title: string;
  year: string;
  type: string;
  description: string;
  tags: string[];
  category: Category | null;
  color: string;
  textColor: string;
  image: string;
}

const folderImages = {
  photo: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80',
  video: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1800&q=80',
  graphic: 'https://www.figma.com/file/hslZfU850zu8tJ6P1Y6fbC/thumbnail',
  interior: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1800&q=80',
  bbq: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1800&q=80',
};

const zhFolders: ArchiveFolder[] = [
  {
    id: 'photo',
    index: '01',
    title: '摄影',
    year: '2021—2026',
    type: '静态影像作品',
    description: '以旅行、城市、人物和日常观察为线索，整理持续积累的静态影像档案。',
    tags: ['纪实摄影', '旅行影像', '视觉观察', '个人档案'],
    category: Category.PHOTO,
    color: '#f2f2f0',
    textColor: '#171717',
    image: folderImages.photo,
  },
  {
    id: 'video',
    index: '02',
    title: '摄像',
    year: '2022—2026',
    type: '动态影像作品',
    description: '围绕短片、剪辑、运动镜头和叙事节奏建立的动态影像作品索引。',
    tags: ['短片', '剪辑', '运动镜头', '叙事影像'],
    category: Category.VIDEO,
    color: '#ffe629',
    textColor: '#171717',
    image: folderImages.video,
  },
  {
    id: 'graphic',
    index: '03',
    title: '平面交互',
    year: '2023—2026',
    type: '视觉设计 / UI 作品',
    description: '包含品牌视觉、信息图表、界面设计和个人视觉系统的平面交互作品。',
    tags: ['品牌视觉', '信息图表', 'UI 设计', 'Figma'],
    category: Category.DESIGN,
    color: '#d9d9d6',
    textColor: '#171717',
    image: folderImages.graphic,
  },
  {
    id: 'interior',
    index: '04',
    title: '环境 / 室内设计',
    year: '2021—2026',
    type: '专业方向作品',
    description: '从空间概念、室内表达、材料与模型呈现中整理出的环境设计方向。',
    tags: ['空间设计', '室内设计', '环境设计', '模型表达'],
    category: Category.ENVIRONMENT,
    color: '#141414',
    textColor: '#f6f2e8',
    image: folderImages.interior,
  },
  {
    id: 'bbq',
    index: '05',
    title: '东北地摊烧烤',
    year: '隐藏技能',
    type: '公司团建限定项目',
    description: '非正式作品栏目。点击后提示解锁条件，保留作为个人站的小彩蛋。',
    tags: ['炭火', '蘸料', '氛围组', '可解锁'],
    category: null,
    color: '#ff6b2c',
    textColor: '#171717',
    image: folderImages.bbq,
  },
];

const enFolders: ArchiveFolder[] = zhFolders.map((folder) => {
  const overrides: Record<string, Partial<ArchiveFolder>> = {
    photo: {
      title: 'Photography',
      type: 'Still Image Works',
      description: 'A growing archive of still images built from travel, cities, people, and daily observations.',
      tags: ['Documentary', 'Travel', 'Observation', 'Archive'],
    },
    video: {
      title: 'Videography',
      type: 'Motion Image Works',
      description: 'A motion-image index covering short films, editing, camera movement, and visual rhythm.',
      tags: ['Film', 'Editing', 'Motion', 'Narrative'],
    },
    graphic: {
      title: 'Graphic & UI',
      type: 'Visual / Interface Works',
      description: 'Graphic and interactive works across branding, infographics, UI, and personal visual systems.',
      tags: ['Branding', 'Infographic', 'UI', 'Figma'],
    },
    interior: {
      title: 'Environment / Interior',
      type: 'Field of Study',
      description: 'Environmental design works organized around spatial concepts, interiors, materials, and models.',
      tags: ['Space', 'Interior', 'Environment', 'Model'],
    },
    bbq: {
      title: 'Northeast BBQ',
      year: 'Hidden Skill',
      type: 'Company Team-building Only',
      description: 'A small personal easter egg. Click to reveal the unlock condition.',
      tags: ['Charcoal', 'Sauce', 'Vibe', 'Unlockable'],
    },
  };

  return { ...folder, ...overrides[folder.id] };
});

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
let heroWheelGate: { direction: 1 | -1; index: number; time: number } | null = null;
let heroWheelCooldown = 0;

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onCategorySelect, language }) => {
  const content = HOME_DATA[language];
  const contactContent = CONTACT_DATA[language];
  const folders = language === 'zh' ? zhFolders : enFolders;
  const [showToast, setShowToast] = useState(false);
  const [landingProgress, setLandingProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const folderDockTop = 'clamp(7.5rem, 10vw, 8.75rem)';

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      if (!heroRef.current) return;

      const top = heroRef.current.getBoundingClientRect().top + window.scrollY;
      const progress = (window.scrollY - top) / Math.max(window.innerHeight, 1);
      setLandingProgress(clamp(progress, 0, 1));
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const root = heroRef.current;
      if (!root || Math.abs(event.deltaY) < 18) return;

      const folders = [...root.querySelectorAll('[data-hero-folder]')] as HTMLElement[];
      if (folders.length === 0) return;
      const dockTop = Number.parseFloat(window.getComputedStyle(folders[0]).top || '0');
      const rootTop = root.getBoundingClientRect().top + window.scrollY;
      const getFolderSnapTop = (folder: HTMLElement) => rootTop + folder.offsetTop - dockTop;
      const direction: 1 | -1 = event.deltaY > 0 ? 1 : -1;
      const snapTops = folders.map(getFolderSnapTop);
      const currentY = window.scrollY;
      const closestIndex = snapTops.reduce((bestIndex, snapTop, index) => {
        return Math.abs(snapTop - currentY) < Math.abs(snapTops[bestIndex] - currentY) ? index : bestIndex;
      }, 0);
      const closestDistance = Math.abs(snapTops[closestIndex] - currentY);
      const isInStackRange = currentY >= snapTops[0] - window.innerHeight * 0.22
        && currentY <= snapTops[snapTops.length - 1] + window.innerHeight * 0.7;

      if (!isInStackRange) return;

      const now = window.performance.now();
      if (now < heroWheelCooldown) {
        event.preventDefault();
        return;
      }

      const pendingGate = heroWheelGate;
      const isPendingSecondWheel = pendingGate && pendingGate.direction === direction && now - pendingGate.time < 1800;
      if (isPendingSecondWheel) {
        const targetIndex = pendingGate.index + direction;
        if (targetIndex >= 0 && targetIndex < snapTops.length) {
          event.preventDefault();
          heroWheelGate = null;
          heroWheelCooldown = now + 520;
          window.setTimeout(() => {
            window.scrollTo({
              top: snapTops[targetIndex],
              behavior: 'smooth',
            });
          }, 80);
          return;
        }
      }

      if (closestDistance > 4) {
        event.preventDefault();
        heroWheelGate = null;
        heroWheelCooldown = now + 380;
        window.setTimeout(() => {
          window.scrollTo({
            top: snapTops[closestIndex],
            behavior: 'smooth',
          });
        }, 80);
        return;
      }

      const settledIndex = closestIndex;
      const hasNextFolder = direction > 0
        ? settledIndex < folders.length - 1
        : settledIndex > 0;
      if (!hasNextFolder) {
        heroWheelGate = null;
        return;
      }

      const gate = heroWheelGate;
      const isSecondWheel = gate && gate.direction === direction && gate.index === settledIndex && now - gate.time < 1800;

      if (!isSecondWheel) {
        event.preventDefault();
        heroWheelGate = { direction, index: settledIndex, time: now };
        return;
      }

      heroWheelGate = null;
      heroWheelCooldown = now + 520;
      event.preventDefault();
      window.setTimeout(() => {
        window.scrollTo({
          top: snapTops[settledIndex + direction],
          behavior: 'smooth',
        });
      }, 80);
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleFolderClick = (category: Category | null) => {
    if (category) {
      onCategorySelect(category);
      return;
    }

    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2000);
  };

  const landingShift = landingProgress * -12;
  const landingOpacity = clamp(1 - landingProgress * 1.15, 0, 1);

  return (
    <div
      ref={heroRef}
      data-hero-root
      className="relative left-1/2 w-screen -mt-40 bg-[#121212] text-white animate-fade-in overflow-visible"
      style={{ marginLeft: '-50vw' }}
    >
      <section className="relative bg-[#121212]">
        <section
          className="sticky top-0 z-0 h-screen overflow-hidden bg-[#121212] px-5 md:px-10 lg:px-[4vw] pt-48 md:pt-56 lg:pt-[19vh] pb-16"
          style={{
            transform: `translate3d(0, ${landingShift}vh, 0)`,
            opacity: landingOpacity,
          }}
        >
          <div className="max-w-6xl">
            <p className="font-mono text-xs md:text-sm uppercase tracking-[0.32em] text-white/50 mb-9 md:mb-12">
              {language === 'zh' ? '个人作品档案 / 滚动索引' : 'Personal Work Archive / Scroll Index'}
            </p>
            <h1 className="text-[18vw] md:text-[12vw] lg:text-[8.8vw] leading-[0.82] font-black tracking-[-0.08em] uppercase">
              Zhuoran<br />Song
            </h1>
            <p className="mt-12 md:mt-16 max-w-3xl text-xl md:text-3xl leading-snug text-white/72 font-medium">
              {content.intro.split('|').join(' ')}
            </p>
          </div>
        </section>

        {folders.map((folder, index) => {
          const tabLeft = `calc(${index} * clamp(3.15rem, 14vw, 15.4rem))`;
          const isLast = index === folders.length - 1;

          return (
            <article
              key={folder.id}
              data-hero-folder
              className="sticky overflow-hidden flex flex-col"
              style={{
                top: folderDockTop,
                height: `calc(100vh - ${folderDockTop})`,
                zIndex: 20 + index,
                color: folder.textColor,
              }}
            >
              <button
                onClick={() => handleFolderClick(folder.category)}
                className="relative z-20 h-12 w-[clamp(10.5rem,26vw,28.75rem)] px-4 md:px-8 flex shrink-0 items-center font-mono text-xs md:text-sm border-r border-black/15"
                style={{
                  left: tabLeft,
                  backgroundColor: folder.color,
                  color: folder.textColor,
                  clipPath: 'polygon(0 0, calc(100% - 36px) 0, 100% 100%, 0 100%)',
                }}
              >
                {language === 'zh' ? '精选作品' : 'Featured Work'}&nbsp;&nbsp;{folder.index}
              </button>

              <div
                className="-mt-px flex-1 min-h-0 overflow-hidden"
                style={{
                  backgroundColor: folder.color,
                  color: folder.textColor,
                }}
              >
                <div className="relative h-full flex flex-col">
                  <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(12rem,0.34fr)] gap-5 md:gap-8 px-5 md:px-10 lg:px-[4vw] pt-7 md:pt-9 pb-5 md:pb-6 border-b border-dotted border-black/50 shrink-0">
                    <div>
                      <h2 className="text-[13vw] md:text-[7vw] lg:text-[4.6vw] leading-none tracking-[-0.06em] font-serif font-normal">
                        {folder.title}
                      </h2>
                    </div>

                    <div className="font-mono text-sm md:text-base leading-relaxed">
                      <p>{folder.year}</p>
                      <p>{folder.type}</p>
                      <div className="mt-6 md:mt-8 h-6 bg-black/10" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-[minmax(13rem,0.26fr)_minmax(0,1fr)] xl:grid-cols-[minmax(14rem,0.25fr)_minmax(0,0.57fr)_minmax(14rem,0.22fr)] gap-5 md:gap-8 px-5 md:px-10 lg:px-[4vw] py-6 md:py-8 flex-1 min-h-0">
                    <div className="font-mono text-xs md:text-sm uppercase leading-loose lg:max-w-[34ch] overflow-hidden">
                      <p>{folder.description}</p>
                      <button
                        onClick={() => handleFolderClick(folder.category)}
                        className="mt-7 md:mt-8 text-base hover:underline underline-offset-4"
                      >
                        {folder.category
                          ? language === 'zh' ? '查看项目 →' : 'View Project →'
                          : language === 'zh' ? '解锁项目 →' : 'Unlock →'}
                      </button>
                    </div>

                    <button
                      onClick={() => handleFolderClick(folder.category)}
                      className="block w-full min-w-0 min-h-[220px] lg:min-h-0 h-full text-left overflow-hidden bg-black/10"
                    >
                      <div className="h-full min-h-[220px] overflow-hidden">
                        <img
                          src={folder.image}
                          alt={folder.title}
                          className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </button>

                    <div className="hidden xl:flex flex-col gap-6 min-w-0">
                      <div className="flex overflow-hidden bg-black/10 py-2 font-mono text-xs md:text-sm whitespace-nowrap">
                        <div className="animate-[marquee_18s_linear_infinite] flex gap-10 pr-10">
                          {[...folder.tags, ...folder.tags, ...folder.tags].map((tag, tagIndex) => (
                            <span key={`${tag}-${tagIndex}`}>{tag}</span>
                          ))}
                        </div>
                      </div>

                      <div className="flex-1 min-h-[10rem] bg-[repeating-linear-gradient(135deg,rgba(0,0,0,0.08)_0,rgba(0,0,0,0.08)_1px,transparent_1px,transparent_12px)]" />

                      <button
                        onClick={() => onNavigate('contact')}
                        className="self-start font-mono text-xs uppercase tracking-[0.2em] border border-current px-4 py-3 hover:bg-black hover:text-white transition-colors"
                      >
                        {contactContent.contactLabel}
                      </button>
                    </div>
                  </div>

                  {isLast && (
                    <div className="absolute z-20 bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 font-mono text-xs uppercase tracking-[0.26em] pointer-events-none rounded-full bg-black/80 text-white px-5 py-3 shadow-2xl">
                      <span>{language === 'zh' ? '继续滚动' : 'Keep Scrolling'}</span>
                      <span className="text-3xl leading-none animate-bounce">↓</span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {showToast && createPortal(
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full shadow-2xl z-[100] animate-fade-in font-bold text-xl">
          {language === 'zh' ? '公司团建可解锁此操作' : 'Available for company team-building events'}
        </div>,
        document.body
      )}
    </div>
  );
};
