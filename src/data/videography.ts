import { Category, Project } from '../../types';

export const VIDEOGRAPHY_DATA: Project[] = [
  {
    id: 'pojian-graduation-film',
    common: {
      category: Category.VIDEO,
      image: '/works/local/video/pojian-cover.jpg',
      videoUrl: import.meta.env.VITE_POJIAN_VIDEO_URL || (import.meta.env.DEV ? import.meta.env.VITE_DEV_POJIAN_VIDEO_URL : undefined),
      year: '2024',
      date: '2024',
    },
    zh: {
      title: '毕业设计作品《破茧》',
      subtitle: '毕业设计 / 短片',
      description: '以动态影像完成的毕业设计作品，围绕人物状态、空间氛围与叙事节奏展开表达。',
      role: '导演 / 摄影 / 剪辑',
      tags: ['毕业设计', '短片', '剧情影像', '剪辑'],
      awards: [],
      concept: '作品通过人物在现实处境中的行动与情绪变化，呈现“破茧”这一主题下的自我挣扎、转变与重新出发。',
      roleDetail: '负责作品构思、拍摄组织、画面执行、后期剪辑与整体节奏控制。'
    },
    en: {
      title: 'Graduation Film: Breaking Cocoon',
      subtitle: 'Graduation Project / Short Film',
      description: 'A graduation short film exploring character, atmosphere, and narrative rhythm through moving image.',
      role: 'Director / Cinematographer / Editor',
      tags: ['Graduation Project', 'Short Film', 'Narrative', 'Editing'],
      awards: [],
      concept: 'The film uses emotional movement and spatial atmosphere to express the process of struggle, transformation, and departure implied by the title.',
      roleDetail: 'Responsible for concept development, shooting coordination, image execution, editing, and overall pacing.'
    }
  }
];
