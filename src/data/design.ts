import { Project } from '../../types';

const DESIGN_DATA_ALL: Project[] = [
  {
    id: 'd1',
    common: {
      category: 'Graphics & UI',
      image: 'https://www.figma.com/file/cRFVFLypB290MP6ImMgiPd/thumbnail?ver=thumbnails/86fca228-9e5a-4b50-bc1e-8bb31f33edb9',
      figmaUrl: 'https://www.figma.com/design/cRFVFLypB290MP6ImMgiPd/%E5%A4%A7%E5%B9%BF%E8%B5%9B-%7C-%E5%8D%B3%E6%97%B6%E8%AE%BE%E8%AE%A1-%E5%BE%81%E8%BE%B0%C2%B7HMI%E6%99%BA%E8%83%BD%E5%BA%A7%E8%88%B1%E8%AE%BE%E8%AE%A1?node-id=55-2&t=7dPgyLMJDD32pFp4-1', 
      gallery: [
        'https://picsum.photos/800/600?random=11',
        'https://picsum.photos/800/600?random=12',
        'https://picsum.photos/800/600?random=13'
      ]
    },
    zh: {
      title: '视觉设计系统 | 征辰 HMI 设计',
      subtitle: 'UI/UX 设计',
      description: '新能源汽车的人机交互界面设计。采用玻璃拟态和柔和渐变的“视觉减重”系统。',
      role: 'UI 设计师',
      tags: ['汽车', 'HMI', 'Figma'],
      awards: ["课程设计优秀作品"],
      concept: "参考了很多车载HMI的设计，我决定设计一款“视觉减重”的系统：信息更加明确，配色更清新，提升驾驶者的舒适感。我参考了很多风格，比如扁平化。但我认为，在汽车这种强调即时与准确反馈的环境，交互系统视觉上需要一个强反馈感的设计。于是毛玻璃与轻拟物化成为了我的最终选择。",
      roleDetail: "独立完成从中控大屏到仪表盘的整套UI绘制与交互逻辑设计。"
    },
    en: {
      title: 'HMI | Pilgrimage HMI System',
      subtitle: 'UI/UX Design',
      description: 'HMI design for New Energy Vehicles (NEV). A "Visual Weight Reduction" system featuring glassmorphism and soft gradients.',
      role: 'UI Designer',
      tags: ['Automotive', 'HMI', 'Figma'],
      awards: ["Course Design Excellence Award"],
      concept: "I designed a 'Visual Weight Reduction' system: clearer information, fresher colors, improving driver comfort. I believed that in a car environment emphasizing immediate feedback, the interface needed strong visual feedback. Thus, glassmorphism and light skeuomorphism became my choice.",
      roleDetail: "Independently completed the entire UI drawing and interaction logic from the central screen to the dashboard."
    }
  },
  {
    id: 'd2',
    common: {
      category: 'Graphics & UI',
      image: 'https://www.figma.com/file/NDxB7Lh3WxAbSuCTJj2DU1/thumbnail?ver=thumbnails/ab422914-1f7c-4e2c-84d9-da1cbd5a49c5',
      figmaUrl: 'https://www.figma.com/design/NDxB7Lh3WxAbSuCTJj2DU1/MY-BRAND-%7C-%E5%85%AC%E4%BC%97%E5%8F%B7%E7%89%A9%E6%96%99%E8%AE%BE%E8%AE%A1%EF%BC%9A%E5%B1%B1%E6%B5%B7%E7%96%97%E5%85%BB%E9%99%A2?node-id=0-1&t=WQZ4agZJUDV7xMFW-1'
    },
    zh: {
      title: '视觉设计系统 | 山海疗养院',
      subtitle: '品牌 & VI',
      description: '本人公众号旅游类频道的视觉识别系统。',
      role: '品牌设计师',
      tags: ['品牌', 'VI', '旅游'],
      awards: ["无"],
      concept: "我自己旅游时，不断地思考：什么才是最能代表旅游的视觉元素？是山川湖海，还是熙攘人群？我发现，路标是人们感知环境地理的重要元素。通过参考不同地区的路标设计，我设计了一套为旅游频道打造的视觉方案。",
      roleDetail: "负责Logo设计、辅助图形开发以及导视系统的应用延展。"
    },
    en: {
      title: 'Serenity Vista',
      subtitle: 'Branding & VI',
      description: 'VI | Visual identity system for my personal travel channel.',
      role: 'Brand Designer',
      tags: ['Branding', 'VI', 'Travel'],
      awards: ["None"],
      concept: "I constantly thought: what visual element best represents tourism? I found that road signs are key for people to perceive their environment. Referencing road sign designs from different regions, I designed a visual scheme tailored for a tourism channel.",
      roleDetail: "Logo design, auxiliary graphic development, and wayfinding system application."
    }
  },
  {
    id: 'd3',
    common: {
      category: 'Graphics & UI',
      image: 'https://www.figma.com/file/z3UFyuPdEXd6hjG9CN1Ax2/thumbnail?ver=thumbnails/21d64c42-da89-494b-82f1-f64107525fd6',
      figmaUrl: 'https://www.figma.com/design/z3UFyuPdEXd6hjG9CN1Ax2/%E5%B9%B3%E9%9D%A2-%7C-%E6%9C%88%E5%85%89%E7%96%97%E5%85%BB%E9%99%A2?node-id=0-1&t=BQlZwjpSjHFDooFz-1'
    },
    zh: {
      title: '信息图表 | 月光疗养院',
      subtitle: '信息可视化',
      description: '关于青年睡眠不足（“熬夜”）的信息图表。2.5D 插画风格。',
      role: '视觉设计师',
      tags: ['信息图表', '2.5D', '数据'],
      awards: ["中南赛区三等奖"],
      concept: "起初我想采取扁平化的设计，但信息可视化如果都是扁平化，视觉表现跟数据便会风格重复，从而观众视觉疲劳。于是最后我采取了2.5D + 描边的方案，给作品增加了深度。使用低饱和互补色，红色作为强调色。",
      roleDetail: "数据收集、文案梳理、插画绘制及排版。"
    },
    en: {
      title: 'Infographic | Moonlight Nursing',
      subtitle: 'Information Visualization',
      description: 'Infographic regarding youth sleep deprivation ("Staying up late"). 2.5D illustration style.',
      role: 'Visual Designer',
      tags: ['Infographic', '2.5D', 'Data'],
      awards: ["3rd Prize (Central South Region)"],
      concept: "Initially, I considered a flat design, but if data viz is too flat, it conflicts with the data itself visually. To avoid visual fatigue, I adopted a 2.5D + outline scheme to add depth, using low-saturation complementary colors with red as an accent.",
      roleDetail: "Data collection, copywriting, illustration, and layout."
    }
  },
  {
    id: 'd4',
    common: {
      category: 'Graphics & UI',
      image: 'https://www.figma.com/file/M9L3zEuJBRhj41JuXrOEO5/thumbnail',
      figmaUrl: 'https://www.figma.com/design/M9L3zEuJBRhj41JuXrOEO5/%E8%AE%A1%E8%AE%BE-%7C-%E6%95%B0%E5%AD%97%E7%9F%AD%E7%89%87?node-id=0-1&t=GjOH16Ga485SW7OC-1'
    },
    zh: {
      title: '视觉设计系统 | 圆方之比',
      subtitle: '视觉设计系统',
      description: '《圆方之比，天地之合》的完整视觉设计系统，包括视频内元素设计、后续相关PPT。',
      role: '视觉设计师',
      tags: ['品牌', '视频视觉', 'Figma'],
      awards: ["无"],
      concept: "仿古牛皮纸设计，新中式设计风格。",
      roleDetail: "视觉概念定义、图形系统开发及延展设计。"
    },
    en: {
      title: 'Circle & Square System',
      subtitle: 'Visual Design System',
      description: 'The complete visual design system for 《圆方之比，天地之合》, including in-video element design and subsequent related PPT materials.',
      role: 'Visual Designer',
      tags: ['Branding', 'Video Visual', 'Figma'],
      awards: ["None"],
      concept: "Antique kraft paper design, new Chinese-style design.",
      roleDetail: "Visual concept definition, graphic system development, and extension design."
    }
  },
  {
    id: 'd5',
    common: {
      category: 'Graphics & UI',
      image: 'https://www.figma.com/file/hslZfU850zu8tJ6P1Y6fbC/thumbnail',
      figmaUrl: 'https://www.figma.com/design/hslZfU850zu8tJ6P1Y6fbC/%E6%AF%95%E8%AE%BE-%7C-%E8%AE%A1%E9%87%8F%E7%94%B5%E5%BD%B1%E5%AD%A6%E5%8F%AF%E8%A7%86%E5%8C%96?node-id=0-1&t=BT0hFhRYsmFehU60-1'
    },
    zh: {
      title: '本科毕设 | 基于计量电影学的影片信息图表设计',
      subtitle: '视觉设计系统',
      description: '基于计量电影学（Cinemetrics）的信息图表设计项目，主要是对电影进行内容上的数据分析可视化。',
      role: '全包',
      tags: ['信息图表', '视计量电影学', 'Figma'],
      awards: ["无"],
      concept: "模拟荧幕的暗调设计风格以及霓虹高饱和提示色设计。",
      roleDetail: "啥都干啊，这可是我的毕设。"
    },
    en: {
      title: 'Infographic Design for Movie Information | Undergraduate Thesis',
      subtitle: 'Visual Design System',
      description: 'The infographic design project based on Cinemetrics, which mainly focuses on the content analysis and visualization of movies.',
      role: 'ALL',
      tags: ['Infographic', 'Cinemetrics', 'Figma'],
      awards: ["None"],
      concept: "Antique kraft paper design, new Chinese-style design.",
      roleDetail: "Cover everything."
    }
  }
];

// These projects are intentionally hidden from the portfolio grid.
const HIDDEN_DESIGN_PROJECT_IDS = new Set(['d1', 'd2', 'd3', 'd4']);

export const DESIGN_DATA: Project[] = DESIGN_DATA_ALL.filter(
  ({ id }) => !HIDDEN_DESIGN_PROJECT_IDS.has(id)
);
