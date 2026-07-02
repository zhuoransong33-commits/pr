import { Category } from '../../types';

export interface LocalPortfolioCollection {
  id: string;
  category: Category;
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
  images?: string[];
}

const imageList = (basePath: string, count: number) =>
  Array.from({ length: count }, (_, index) => `${basePath}/${String(index + 1).padStart(2, '0')}.webp`);

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
    imageCount: 32,
    basePath: '/works/local/he',
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
  images: imageList(collection.basePath, collection.imageCount),
}));
