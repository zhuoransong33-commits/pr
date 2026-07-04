
export type Language = 'zh' | 'en';

export enum Category {
  ALL = 'All',
  VIDEO = 'Videography',
  DESIGN = 'Graphics & UI',
  PHOTO = 'Photography',
  ENVIRONMENT = 'Environment Design',
  ARTICLE = 'Article'
}

export enum ArticleCategory {
  DIT = 'DiT', // 数媒与课程
  LUNA = 'LUNA', // 影像相关
  TALK = '瞎叨be叨', // 杂记
  AFTER8 = 'After8', // 聊艺术
  SERENITY = '山海疗养院' // 游记
}

export interface Article {
  id: string;
  title: string;
  category: ArticleCategory;
  link: string; // WeChat Official Account Link
  coverImage?: string; // Optional, will fallback if not provided
  date?: string;
}

export interface ProjectContent {
  title: string;
  subtitle: string;
  description: string;
  role: string;
  tags: string[];
  awards?: string[];
  concept?: string;
  roleDetail?: string;
}

export interface ProjectCommon {
  category: Category | string;
  image: string; // URL placeholder (Cover/Thumbnail)
  figmaUrl?: string; // Figma File URL
  gallery?: string[]; // Additional images (URLs)
  videoUrl?: string; // URL to .mp4 file
  bilibiliId?: string; // Bilibili Video ID (e.g. BV1xx...)
  externalLink?: string; // External link (e.g. Bilibili, Behance)
  websiteUrl?: string; // Online preview URL
  githubUrl?: string; // GitHub repository URL
  date?: string;
  year?: string;
}

export interface Project {
  id: string;
  common: ProjectCommon;
  zh: ProjectContent;
  en: ProjectContent;
}

export interface ProjectDisplay extends ProjectCommon, ProjectContent {
  id: string;
  bilingualTitle?: {
    zh: string;
    en: string;
  };
}

export interface Experience {
  id: string;
  year: string;
  title: string;
  institution: string;
  description: string;
  type: 'education' | 'work';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface CompetitionGroup {
  level: string;
  awards: string[];
}

export interface HonorsData {
  scholarships: string[];
  titles: string[];
  competitions: CompetitionGroup[];
}
