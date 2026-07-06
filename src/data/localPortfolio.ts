import { Category } from '../../types';

export interface LocalPortfolioCollection {
  id: string;
  category: Category;
  isPlaceholder?: boolean;
  folderName: string;
  title: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  tags: string[];
  imageCount: number;
  basePath: string;
  coverImage?: string;
  imageNumbers?: number[];
  images?: string[];
  pdfUrl?: string;
}

const imageList = (basePath: string, count: number) =>
  Array.from({ length: count }, (_, index) => `${basePath}/${String(index + 1).padStart(2, '0')}.webp`);

const numberedImageList = (basePath: string, numbers: number[]) =>
  numbers.map((number) => `${basePath}/${String(number).padStart(2, '0')}.webp`);

const numberedPngList = (basePath: string, count: number) =>
  Array.from({ length: count }, (_, index) => `${basePath}/${String(index + 1).padStart(2, '0')}.png`);

export const LOCAL_PORTFOLIO_COLLECTIONS: LocalPortfolioCollection[] = [
  {
    id: 'local-xu',
    category: Category.PHOTO,
    folderName: 'xu',
    title: {
      zh: 'xu',
      en: 'Xu',
    },
    description: {
      zh: '静态摄影作品集，保留原始编排序列。',
      en: 'Static photography set, preserving the arranged source sequence.',
    },
    tags: ['Photography', 'Still Image'],
    imageCount: 18,
    basePath: '/works/local/xu',
  },
  {
    id: 'local-shanshui',
    category: Category.PHOTO,
    folderName: '山水',
    title: {
      zh: '山水',
      en: 'Landscape',
    },
    description: {
      zh: '山水影像素材集，以连续照片堆叠方式浏览。',
      en: 'Landscape visual material presented as an interactive image stack.',
    },
    tags: ['Landscape', 'Visual Sequence'],
    imageCount: 17,
    basePath: '/works/local/shanshui',
  },
  {
    id: 'local-he',
    category: Category.PHOTO,
    folderName: '核',
    title: {
      zh: '核',
      en: 'Core',
    },
    description: {
      zh: '平面 / 交互相关静态作品集。',
      en: 'Static work set for graphic and interaction presentation.',
    },
    tags: ['Graphic', 'Interaction'],
    imageCount: 23,
    basePath: '/works/local/he',
    imageNumbers: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 18, 19, 20, 23, 24, 25, 26, 27, 31, 32],
  },
  {
    id: 'local-architecture',
    category: Category.PHOTO,
    folderName: '建筑',
    title: {
      zh: '建筑',
      en: 'Architecture',
    },
    description: {
      zh: '建筑与环境空间类作品展示。',
      en: 'Architecture and environment design presentation.',
    },
    tags: ['Architecture', 'Environment'],
    imageCount: 4,
    basePath: '/works/local/architecture',
  },
];

export const LOCAL_PHOTOGRAPHY_COLLECTIONS = LOCAL_PORTFOLIO_COLLECTIONS.map((collection) => ({
  ...collection,
  images: collection.imageNumbers
    ? numberedImageList(collection.basePath, collection.imageNumbers)
    : imageList(collection.basePath, collection.imageCount),
}));

export const LOCAL_ENVIRONMENT_COLLECTIONS: Array<LocalPortfolioCollection & { images: string[] }> = [
  {
    id: 'interior-demo',
    category: Category.ENVIRONMENT,
    folderName: '创意办公空间展板',
    title: {
      zh: '创意办公空间展板',
      en: 'Creative Office Space Boards',
    },
    description: {
      zh: '室内设计毕业设计演示与展板整理。',
      en: 'Interior design graduation presentation and board archive.',
    },
    tags: ['Interior', 'Presentation', 'Board'],
    imageCount: 1,
    basePath: '/works/local/interior/demo',
    images: imageList('/works/local/interior/demo', 1),
    pdfUrl: '/works/local/interior/demo/01-demo.pdf',
  },
  {
    id: 'interior-analysis',
    category: Category.ENVIRONMENT,
    folderName: '创意办公空间分析图',
    title: {
      zh: '创意办公空间分析图',
      en: 'Creative Office Space Analysis',
    },
    description: {
      zh: '包含区位、动线、功能、材质、色彩等设计分析图。',
      en: 'Design analysis diagrams including location, circulation, function, material, and color.',
    },
    tags: ['Analysis', 'Diagram', 'Interior'],
    imageCount: 8,
    basePath: '/works/local/interior/analysis',
    images: imageList('/works/local/interior/analysis', 8),
  },
  {
    id: 'interior-renders',
    category: Category.ENVIRONMENT,
    folderName: '创意办公空间效果图',
    title: {
      zh: '创意办公空间效果图',
      en: 'Creative Office Space Renderings',
    },
    description: {
      zh: '前厅、办公室、口播室、制图室等空间效果图整理。',
      en: 'Renderings for lobby, office, recording, and drafting spaces.',
    },
    tags: ['Rendering', 'Space', 'Interior'],
    imageCount: 15,
    basePath: '/works/local/interior/renders',
    images: imageList('/works/local/interior/renders', 15),
  },
  {
    id: 'interior-digital-exhibition',
    category: Category.ENVIRONMENT,
    folderName: '南京爻石博物馆数字展厅',
    title: {
      zh: '南京爻石博物馆数字展厅',
      en: 'Nanjing Yaoshi Museum Digital Exhibition Hall',
    },
    description: {
      zh: '南京爻石博物馆数字展厅空间效果与交互展示整理。',
      en: 'Spatial renderings and interactive presentation materials for the Nanjing Yaoshi Museum digital exhibition hall.',
    },
    tags: ['Digital Exhibition', 'Museum', 'Interior'],
    imageCount: 12,
    basePath: '/works/local/interior/digital-exhibition',
    coverImage: '/works/local/interior/digital-exhibition/cover-yaoshi.png',
    images: numberedPngList('/works/local/interior/digital-exhibition', 12),
  },
];
