import React, { useMemo, useState } from 'react';
import { EDUCATION_DATA } from '../src/data/education';
import { CONTACT_DATA } from '../src/data/contact';
import { Language } from '../types';

interface TimelineSectionProps {
  language: Language;
}

type AboutLayer = 'profile' | 'skillsets' | 'experiences';
type FloatingCardId = 'skillsets' | 'profile';

const padIndex = (index: number) => String(index + 1).padStart(2, '0');

const splitAward = (award: string) => {
  const [rank, contest] = award.split('|').map((item) => item.trim());
  return contest ? { rank, contest } : { rank: '', contest: award };
};

export const TimelineSection: React.FC<TimelineSectionProps> = ({ language }) => {
  const [activeLayer, setActiveLayer] = useState<AboutLayer>('profile');

  const content = EDUCATION_DATA[language];
  const contact = CONTACT_DATA[language];
  const workItems = content.experiences.filter((item) => item.type === 'work');
  const educationItems = content.experiences.filter((item) => item.type === 'education');

  const labels = {
    zh: {
      about: '关于',
      me: '我',
      detail: 'DETAILS',
      profile: '个人档案',
      skillsets: '技能集',
      experiences: '经历',
      education: '教育',
      achievements: '荣誉与奖项',
      press: '联系索引',
      year: '时间',
      company: '单位 / 学校',
      position: '方向 / 职位',
      projectTitle: '条目',
      preview: '备注',
      contact: '联系方式',
      location: '所在位置',
      email: '邮箱',
      wechat: '微信',
      phone: '电话',
      resume: '简历',
      softwares: '软件工具',
      languages: '语言',
      back: '点击侧边标签可切换卡片',
    },
    en: {
      about: 'About',
      me: 'me',
      detail: 'DETAILS',
      profile: 'Profile',
      skillsets: 'Skillsets',
      experiences: 'Experiences',
      education: 'Education',
      achievements: 'Achievements',
      press: 'Contact Index',
      year: 'Year',
      company: 'Company / School',
      position: 'Position / Focus',
      projectTitle: 'Project title',
      preview: 'Preview',
      contact: 'Contact',
      location: 'Location',
      email: 'Email',
      wechat: 'WeChat',
      phone: 'Phone',
      resume: 'Resume',
      softwares: 'Softwares',
      languages: 'Languages',
      back: 'Click side tabs to switch panels',
    },
  }[language];

  const skillsets =
    language === 'zh'
      ? ['01  静态摄影', '02  动态影像', '03  平面交互', '04  环境 / 室内设计', '05  视觉叙事', '06  3D 建模', '07  前端页面实现', '08  作品集整理']
      : ['01  Photography', '02  Motion Image', '03  Graphic & UI', '04  Environment / Interior', '05  Visual Storytelling', '06  3D Modeling', '07  Front-end Pages', '08  Portfolio Editing'];

  const skillGroups =
    language === 'zh'
      ? [
          {
            title: '平面 / 视觉设计 / 摄影类',
            items: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe Lightroom', 'Figma', 'AI Web 设计', 'UI 设计', '手机客户端 UI 设计', '摄影', '平面摄影', '电商摄影', '摄影暗房技术', '作品集排版 / 整理'],
          },
          {
            title: '视频 / 动态影像类',
            items: ['Adobe Premiere Pro', 'Adobe After Effects', '影片调色', '视频编辑', '动态影像剪辑', '影像后期'],
          },
          {
            title: '3D / 空间表现类',
            items: ['Blender', '3ds Max', 'SketchUp', 'Lumion', 'Unreal Engine 5', 'D5 Render'],
          },
          {
            title: '环境 / 室内 / 工程实操类',
            items: ['AutoCAD', '空间规划', '室内设计表达', '环境设计方案表达', '建模与渲染表现'],
          },
          {
            title: '综合能力 / 内容能力类',
            items: ['阅读能力', '文字功底扎实', '视觉传播', '信息整理', '前端页面实现'],
          },
        ]
      : [
          {
            title: 'Graphic / Visual Design / Photography',
            items: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe Lightroom', 'Figma', 'AI Web Design', 'UI Design', 'Mobile UI Design', 'Photography', 'Commercial Photography', 'Darkroom Technique', 'Portfolio Layout'],
          },
          {
            title: 'Video / Motion Image',
            items: ['Adobe Premiere Pro', 'Adobe After Effects', 'Color Grading', 'Video Editing', 'Motion Image Editing', 'Post-production'],
          },
          {
            title: '3D / Spatial Visualization',
            items: ['Blender', '3ds Max', 'SketchUp', 'Lumion', 'Unreal Engine 5', 'D5 Render'],
          },
          {
            title: 'Environment / Interior / Technical',
            items: ['AutoCAD', 'Spatial Planning', 'Interior Design Presentation', 'Environmental Design Presentation', 'Modeling & Rendering'],
          },
          {
            title: 'General / Content',
            items: ['Reading', 'Writing', 'Visual Communication', 'Information Organization', 'Front-end Page Implementation'],
          },
        ];
  const languages = language === 'zh' ? ['中文 / 母语', 'English / 日常阅读与基础沟通'] : ['Chinese / Native', 'English / Reading & basic communication'];

  const achievementRows = useMemo(() => {
    const scholarships = content.honors.scholarships.map((item, index) => ({
      year: index === 0 ? '2023' : '2024',
      name: item,
      organizer: language === 'zh' ? '奖学金 / 项目奖金' : 'Scholarship / Project Award',
    }));

    const titles = content.honors.titles.map((item) => ({
      year: '2021–2026',
      name: item,
      organizer: language === 'zh' ? '校园 / 社区 / 课程' : 'Campus / Community / Course',
    }));

    const competitions = content.honors.competitions.flatMap((group) =>
      group.awards.map((award) => {
        const { rank, contest } = splitAward(award);
        return {
          year: group.level,
          name: contest || award,
          organizer: rank || group.level,
        };
      }),
    );

    return [...scholarships, ...titles, ...competitions];
  }, [content.honors, language]);

  return (
    <section className="about-archive-page relative w-full overflow-x-hidden bg-[#f7f7f5] text-[#1f1f1f] dark:bg-black dark:text-white">
      <div className="relative z-10 px-4 md:px-8 pt-8 md:pt-10">
        <div className="grid min-h-[20svh] md:min-h-[18svh] grid-cols-[1fr_auto] md:grid-cols-[1fr_1fr_1fr] items-start gap-6">
          <h1 className="font-serif text-[clamp(3.2rem,8vw,8rem)] leading-[0.78] tracking-[-0.08em]">
            {labels.about}
          </h1>
          <h1 className="font-serif text-[clamp(3.2rem,8vw,8rem)] leading-[0.78] tracking-[-0.08em] text-[#d7d7d4] dark:text-white/18 md:text-center">
            {labels.me}
          </h1>
          <p className="hidden max-w-sm justify-self-end pt-4 font-mono text-xs uppercase leading-relaxed tracking-[0.16em] text-black/45 dark:text-white/45 md:block">
            {labels.back}
          </p>
        </div>
      </div>

      <FloatingCards
        activeLayer={activeLayer}
        labels={labels}
        skillsets={skillsets}
        skillGroups={skillGroups}
        skillGroupTitle={language === 'zh' ? '分类能力 / 软件工具' : 'Skill Categories / Tools'}
        languages={languages}
        contactRows={[
          [labels.email, contact.email],
          [labels.wechat, contact.socials.wechat],
          [labels.phone, contact.socials.phone],
          [labels.location, contact.locationValue],
        ]}
        profileText={content.about}
        profileHeading={language === 'zh' ? '宋卓冉' : 'Zhuoran Song'}
        onLayerSelect={setActiveLayer}
      />

      <ArchiveDocument
        labels={labels}
        onLayerSelect={setActiveLayer}
        workItems={workItems}
        educationItems={educationItems}
        achievementRows={achievementRows}
        contactRows={[
          [labels.email, contact.email],
          [labels.wechat, contact.socials.wechat],
          [labels.phone, contact.socials.phone],
          [labels.location, contact.locationValue],
          [labels.resume, language === 'zh' ? '可按需提供' : 'Available on request'],
        ]}
      />

      <AboutFooter contactRows={[[labels.email, contact.email], [labels.wechat, contact.socials.wechat], [labels.phone, contact.socials.phone], [labels.resume, language === 'zh' ? '可按需提供' : 'Available on request']]} />
    </section>
  );
};

const FloatingCards = ({
  activeLayer,
  labels,
  skillsets,
  skillGroups,
  skillGroupTitle,
  languages,
  contactRows,
  profileText,
  profileHeading,
  onLayerSelect,
}: {
  activeLayer: AboutLayer;
  labels: Record<string, string>;
  skillsets: string[];
  skillGroups: Array<{ title: string; items: string[] }>;
  skillGroupTitle: string;
  languages: string[];
  contactRows: [string, string][];
  profileText: string;
  profileHeading: string;
  onLayerSelect: (panel: AboutLayer) => void;
}) => {
  const cards: Array<{
    id: FloatingCardId;
    index: string;
    title: string;
    heading: string;
    tone: 'yellow' | 'white';
    cardWidth: string;
    cardMinHeight: string;
    stack: React.CSSProperties;
    sliverTop: string;
    z: number;
    children: React.ReactNode;
  }> = [
    {
      id: 'skillsets',
      index: '01',
      title: labels.skillsets,
      heading: labels.skillsets,
      tone: 'yellow',
      cardWidth: '50vw',
      cardMinHeight: 'min(72svh, 43rem)',
      stack: { left: '0rem', top: 'clamp(1rem, 7vw, 4.5rem)' },
      sliverTop: 'clamp(1rem, 7vw, 4.5rem)',
      z: 34,
      children: (
        <>
          <SkillsetList items={skillsets} />
          <SkillGroupGrid title={skillGroupTitle} groups={skillGroups} />
          <MiniGrid title={labels.languages} items={languages} />
        </>
      ),
    },
    {
      id: 'profile',
      index: '02',
      title: labels.profile,
      heading: profileHeading,
      tone: 'white',
      cardWidth: 'min(70rem, 72vw)',
      cardMinHeight: 'min(58svh, 36rem)',
      stack: { left: '0rem', top: 'clamp(10rem, 18vw, 16rem)' },
      sliverTop: 'clamp(10rem, 18vw, 16rem)',
      z: 38,
      children: <ProfileContent profileText={profileText} contactRows={contactRows} />,
    },
  ];

  const isHidden = (id: FloatingCardId) => activeLayer === 'experiences' || (activeLayer === 'skillsets' && id === 'profile');
  const selectLayer = (id: FloatingCardId): AboutLayer => (id === 'skillsets' ? 'skillsets' : 'profile');

  return (
    <div className="pointer-events-none absolute inset-x-0 top-[clamp(18rem,42svh,30rem)] z-30 h-[52rem] overflow-visible md:top-[clamp(17rem,30svh,24rem)]">
      <button
        type="button"
        aria-label={labels.experiences}
        onClick={() => onLayerSelect('experiences')}
        className="pointer-events-auto absolute inset-x-0 top-[clamp(9rem,18vw,15rem)] z-[32] h-[34rem] bg-transparent outline-none xl:hidden"
      />
      {cards.map((card) => {
        const hiddenAsSliver = isHidden(card.id);
        const toneClass =
          card.tone === 'yellow'
            ? 'bg-[#ffe327] text-black'
            : 'bg-[#f5f5f2] text-black';

        const style: React.CSSProperties = {
          ['--desktop-card-width' as string]: card.cardWidth,
          ['--card-min-height' as string]: card.cardMinHeight,
          ...(hiddenAsSliver
            ? { left: 'calc(100vw - 3.25rem)', top: card.sliverTop, overflow: 'hidden' }
            : card.stack),
          zIndex: hiddenAsSliver ? (card.id === 'profile' ? 46 : 45) : card.z,
          opacity: hiddenAsSliver ? 0.96 : 1,
          pointerEvents: hiddenAsSliver ? 'none' : 'auto',
        };

        return (
          <div
            key={card.id}
            data-about-card={card.id}
            role={hiddenAsSliver ? undefined : 'button'}
            tabIndex={hiddenAsSliver ? -1 : 0}
            aria-label={card.title}
            onClick={hiddenAsSliver ? undefined : () => onLayerSelect(selectLayer(card.id))}
            onKeyDown={(event) => {
              if (!hiddenAsSliver && (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                onLayerSelect(selectLayer(card.id));
              }
            }}
            className={`group absolute w-[calc(100vw_-_0.5rem)] min-h-[var(--card-min-height)] rounded-tl-md border border-dotted border-black/35 text-left shadow-[0_18px_55px_rgba(0,0,0,0.08)] outline-none transition-[left,top,opacity,filter,transform] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] xl:w-[min(var(--desktop-card-width),calc(100vw_-_4rem))] ${toneClass} ${hiddenAsSliver ? '' : 'cursor-pointer hover:-translate-y-2'}`}
            style={style}
          >
            <PageGutter tone={card.tone === 'yellow' ? 'yellow' : 'white'} />
            <SelectionCardHeader index={card.index} title={card.title} />
            <CornerMarks />
            <h2 className="ml-8 overflow-visible whitespace-nowrap px-5 pb-4 pt-5 font-serif text-[clamp(2.9rem,5.2vw,5.8rem)] leading-none tracking-[-0.065em] text-[#242424] md:px-7">
              {card.heading}
            </h2>
            <div className="ml-8 p-5 md:p-7">
              {card.children}
            </div>
          </div>
        );
      })}
      {cards.map((card) => {
        if (!isHidden(card.id)) return null;
        const hasBothSlivers = activeLayer === 'experiences';
        const sliverHitHeight =
          hasBothSlivers && card.id === 'skillsets'
            ? '7.5rem'
            : card.cardMinHeight;

        return (
          <button
            key={`${card.id}-sliver`}
            type="button"
            data-about-sliver={card.id}
            aria-label={card.title}
            onClick={() => onLayerSelect(selectLayer(card.id))}
            className="pointer-events-auto absolute w-[3.25rem] bg-transparent outline-none"
            style={{
              left: 'calc(100vw - 3.25rem)',
              top: card.sliverTop,
              height: sliverHitHeight,
              zIndex: card.id === 'profile' ? 70 : 69,
            }}
          />
        );
      })}
    </div>
  );
};

const ArchiveDocument = ({
  labels,
  onLayerSelect,
  workItems,
  educationItems,
  achievementRows,
  contactRows,
}: {
  labels: Record<string, string>;
  onLayerSelect: (panel: AboutLayer) => void;
  workItems: Array<{ id: string; year: string; institution: string; title: string; description: string }>;
  educationItems: Array<{ id: string; year: string; institution: string; title: string; description: string }>;
  achievementRows: Array<{ year: string; name: string; organizer: string }>;
  contactRows: [string, string][];
}) => (
  <div className="relative z-0 px-0 pb-0" onClick={() => onLayerSelect('experiences')}>
    <div className="relative mx-0 w-[calc(100vw_-_0.5rem)] max-w-none overflow-hidden rounded-tl-md border border-dotted border-black/40 bg-[#f7f7f5] transition-transform duration-300 hover:-translate-y-1 dark:border-white/30 dark:bg-black">
      <PageGutter tone="white" />
      <div className="ml-8 grid grid-cols-1 xl:grid-cols-[23vw_minmax(0,1fr)]">
        <aside className="hidden min-h-[70rem] border-r border-dotted border-black/35 px-4 py-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-black/45 dark:border-white/25 dark:text-white/45 xl:block">
          <div className="sticky top-28 flex h-[calc(100svh-8rem)] flex-col justify-between">
            <span>{labels.about}</span>
            <span>{labels.detail}</span>
          </div>
        </aside>

        <main className="min-w-0">
          <ArchiveTable title={labels.experiences} headers={[labels.year, labels.company, labels.position]} onTitleClick={() => onLayerSelect('experiences')}>
            {workItems.map((item) => (
              <React.Fragment key={item.id}>
                <TableRow cells={[item.year, item.institution, item.title]} description={item.description} />
              </React.Fragment>
            ))}
          </ArchiveTable>

          <ArchiveTable title={labels.education} headers={[labels.year, labels.company, labels.position]}>
            {educationItems.map((item) => (
              <React.Fragment key={item.id}>
                <TableRow cells={[item.year, item.institution, item.title]} description={item.description} />
              </React.Fragment>
            ))}
          </ArchiveTable>

          <ArchiveTable title={labels.achievements} headers={[labels.year, labels.projectTitle, labels.preview]}>
            {achievementRows.map((item, index) => (
              <React.Fragment key={`${item.name}-${index}`}>
                <TableRow cells={[item.year, item.name, item.organizer]} />
              </React.Fragment>
            ))}
          </ArchiveTable>

          <ArchiveTable title={labels.press} headers={[labels.contact, labels.projectTitle, labels.preview]}>
            {contactRows.map(([key, value], index) => (
              <React.Fragment key={key}>
                <TableRow cells={[padIndex(index), key, value]} />
              </React.Fragment>
            ))}
          </ArchiveTable>
        </main>
      </div>
    </div>
  </div>
);

const ArchiveTable = ({ title, headers, children, onTitleClick }: { title: string; headers: string[]; children: React.ReactNode; onTitleClick?: () => void }) => (
  <section className="border-b border-dotted border-black/40 dark:border-white/30">
    {onTitleClick ? (
      <button
        type="button"
        onClick={onTitleClick}
        className="block w-full px-4 py-4 text-left font-sans text-[clamp(0.95rem,1.1vw,1.15rem)] font-semibold leading-[1.35] tracking-[-0.01em] text-[#2a2a2a] outline-none transition-colors hover:text-black dark:text-white md:px-5"
      >
        {title}
      </button>
    ) : (
      <h2 className="px-4 py-4 font-sans text-[clamp(0.95rem,1.1vw,1.15rem)] font-semibold leading-[1.35] tracking-[-0.01em] text-[#2a2a2a] dark:text-white md:px-5">
        {title}
      </h2>
    )}
    <div className="grid grid-cols-3 border-y border-dotted border-black/35 dark:border-white/25">
      {headers.map((header) => (
        <div key={header} className="px-4 py-3 font-sans text-[0.82rem] font-semibold uppercase leading-relaxed tracking-[0.08em] text-black/72 dark:text-white/65 md:px-5 md:text-[0.95rem]">
          {header}
        </div>
      ))}
    </div>
    {children}
  </section>
);

const TableRow = ({ cells, description }: { cells: string[]; description?: string }) => (
  <article className="grid grid-cols-1 border-b border-dotted border-black/35 transition-colors hover:bg-black/[0.035] dark:border-white/25 dark:hover:bg-white/[0.06] md:grid-cols-3">
    {cells.map((cell, index) => (
      <div key={`${cell}-${index}`} className="min-w-0 px-4 md:px-5 py-4 md:py-5">
        <p className={index === 1 ? 'font-sans text-[clamp(1.02rem,1.35vw,1.5rem)] font-medium leading-[1.35] tracking-[-0.015em]' : 'font-sans text-[0.82rem] md:text-[0.95rem] uppercase leading-relaxed tracking-[0.04em] text-black/70 dark:text-white/65'}>
          {cell}
        </p>
        {description && index === 1 && <p className="mt-4 hidden max-w-xl text-sm leading-relaxed text-black/58 dark:text-white/55 xl:block">{description}</p>}
      </div>
    ))}
  </article>
);

const SelectionCardHeader = ({ index, title, hint, size = 'compact' }: { index: string; title: string; hint?: string; size?: 'compact' | 'mobile' }) => (
  <div
    className={`relative ml-8 flex items-center border-b border-dotted border-black/35 px-5 font-mono uppercase ${
      size === 'mobile'
        ? 'h-12 text-[0.9rem] tracking-[0.1em] sm:text-base sm:tracking-[0.12em]'
        : 'h-8 text-[0.68rem] tracking-[0.16em]'
    }`}
  >
    <span className={size === 'mobile' ? 'mr-4' : 'mr-5'}>{index}</span>
    <span className="flex-1 text-center">{title}</span>
    {hint && <span className="ml-4 hidden text-black/70 sm:inline">{hint}</span>}
  </div>
);

const PageGutter = ({ tone }: { tone: 'yellow' | 'white' }) => (
  <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 border-r border-dotted border-black/35">
    <span className={`absolute left-1/2 top-3 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-black/20 ${tone === 'yellow' ? 'bg-[#f7d800]' : 'bg-[#f7f7f5]'}`} />
    <span className={`absolute left-1/2 top-[35%] h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-black/20 ${tone === 'yellow' ? 'bg-[#f7d800]' : 'bg-[#f7f7f5]'}`} />
    <span className={`absolute left-1/2 bottom-5 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-black/20 ${tone === 'yellow' ? 'bg-[#f7d800]' : 'bg-[#f7f7f5]'}`} />
  </div>
);

const CornerMarks = () => (
  <>
    <span className="absolute left-2 top-2 z-20 h-1.5 w-1.5 bg-black" />
    <span className="absolute right-2 top-2 z-20 h-1.5 w-1.5 bg-black" />
    <span className="absolute bottom-2 left-2 z-20 h-1.5 w-1.5 bg-black" />
    <span className="absolute bottom-2 right-2 z-20 h-1.5 w-1.5 bg-black" />
  </>
);

const SkillsetList = ({ items }: { items: string[] }) => (
  <div className="border-y border-dotted border-black/35">
    {items.map((item) => (
      <p key={item} className="border-b last:border-b-0 border-dotted border-black/25 py-2.5 font-serif text-[clamp(1.45rem,2.35vw,3rem)] leading-[1.18] tracking-[-0.045em]">
        {item}
      </p>
    ))}
  </div>
);

const ProfileContent = ({ profileText, contactRows }: { profileText: string; contactRows: [string, string][] }) => (
  <div className="grid gap-5 md:grid-cols-[13rem_minmax(0,1fr)]">
    <div className="aspect-[4/5] bg-[linear-gradient(135deg,#d6d6d2,#f5f5f2_48%,#bfc3c6)] p-4">
      <div className="flex h-full items-end border border-dotted border-black/30 p-3 font-mono text-xs uppercase tracking-[0.18em] text-black/55">
        ZHUORAN SONG
      </div>
    </div>
    <div>
      <p className="font-sans text-[clamp(0.96rem,1.28vw,1.48rem)] font-normal leading-[1.55] tracking-[-0.01em] text-black/78">
        {profileText}
      </p>
      <div className="mt-16 border-t border-dotted border-black/35">
        {contactRows.map(([key, value]) => (
          <div key={key} className="grid grid-cols-[8rem_minmax(0,1fr)] border-b border-dotted border-black/25 py-3">
            <span className="font-sans text-[0.95rem] font-semibold tracking-[-0.01em]">{key}</span>
            <span className="font-sans text-[0.86rem] uppercase leading-relaxed tracking-[0.04em] text-black/68">{value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SkillGroupGrid = ({ title, groups }: { title: string; groups: Array<{ title: string; items: string[] }> }) => (
  <div className="mt-5 border-y border-dotted border-black/35">
    <p className="border-b border-dotted border-black/35 py-2 text-center font-sans text-xs uppercase tracking-[0.14em] text-black/55">
      {title}
    </p>
    {groups.map((group) => (
      <section key={group.title} className="grid border-b border-dotted border-black/25 last:border-b-0 md:grid-cols-[11rem_minmax(0,1fr)]">
        <h3 className="border-b border-dotted border-black/25 px-3 py-3 font-sans text-[0.78rem] font-medium uppercase leading-relaxed tracking-[0.08em] text-black/72 md:border-b-0 md:border-r">
          {group.title}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3">
          {group.items.map((item) => (
            <p key={`${group.title}-${item}`} className="border-b border-r border-dotted border-black/20 px-3 py-2.5 font-sans text-sm uppercase leading-relaxed tracking-[0.04em] text-black/68 last:border-b-0">
              {item}
            </p>
          ))}
        </div>
      </section>
    ))}
  </div>
);

const MiniGrid = ({ title, items }: { title: string; items: string[] }) => (
  <div className="mt-5">
    <p className="border-y border-dotted border-black/35 py-2 text-center font-sans text-xs uppercase tracking-[0.14em] text-black/55">{title}</p>
    <div className="grid grid-cols-2">
      {items.map((item) => (
        <p key={item} className="border-b border-r border-dotted border-black/25 px-3 py-2.5 font-sans text-sm uppercase leading-relaxed tracking-[0.04em] text-black/68">
          {item}
        </p>
      ))}
    </div>
  </div>
);

const AboutFooter = ({ contactRows }: { contactRows: [string, string][] }) => (
  <footer className="relative z-0 bg-[#1f1f1f] px-4 md:px-8 py-12 md:py-20 text-white overflow-hidden">
    <div className="mx-auto grid max-w-[112rem] grid-cols-2 gap-6 md:grid-cols-4">
      {contactRows.map(([key, value]) => (
        <div key={key}>
          <p className="font-sans text-[0.86rem] font-semibold uppercase tracking-[0.08em] text-white/70">{key}</p>
          <p className="mt-2 font-sans text-[0.78rem] uppercase leading-relaxed tracking-[0.05em] text-white/72">{value}</p>
        </div>
      ))}
    </div>
    <p className="mt-14 whitespace-nowrap font-serif text-[17vw] leading-[0.74] tracking-[-0.09em] text-white/18">
      ZHUORANSONGWORKS
    </p>
  </footer>
);
