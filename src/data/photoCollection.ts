import { Project } from '../../types';

export const PHOTO_COLLECTION_DATA: Project[] = [
  {
    id: 'photo-collection-01',
    common: {
      category: 'photo-collection',
      image: '/works/local/photo-collection/cover.webp',
      pdfUrl: '/works/local/photo-collection/摄影集.pdf',
      year: '2026',
      date: '2026',
    },
    zh: {
      title: '摄影集',
      subtitle: 'PDF 作品集',
      description: '摄影作品集 PDF 预览。',
      role: '摄影 / 编辑 / 排版',
      tags: ['摄影集', 'PDF', '作品集'],
      awards: [],
      concept: '以 PDF 形式整理的摄影作品合集，适合在作品集页面中快速预览。',
      roleDetail: '负责摄影作品整理、内容编排与文件输出。',
    },
    en: {
      title: 'Photo Collection',
      subtitle: 'PDF Portfolio',
      description: 'A PDF preview of the photography collection.',
      role: 'Photography / Editing / Layout',
      tags: ['Photo Collection', 'PDF', 'Portfolio'],
      awards: [],
      concept: 'A curated photography collection presented as a PDF for quick portfolio review.',
      roleDetail: 'Responsible for image selection, layout, and export.',
    },
  },
];
