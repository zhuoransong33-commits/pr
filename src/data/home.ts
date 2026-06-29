import { Language, Category } from '../../types';

export interface HeroItem {
  text: string;
  annotation: string;
  category: Category | null;
}

export interface HomeContent {
  heroItems: HeroItem[];
  intro: string;
  selectedWorks: string;
  years: string;
}

export const HOME_DATA: Record<Language, HomeContent> = {
  zh: {
    heroItems: [
      { text: "摄影摄像", annotation: "（作品积累较多）", category: Category.VIDEO }, // category is kept as VIDEO but UI will split
      { text: "平面交互", annotation: "（兴趣所在）", category: Category.DESIGN },
      { text: "环境室内设计", annotation: "（专业方向）", category: Category.ENVIRONMENT },
      { text: "东北地摊烧烤", annotation: "（已出师）", category: null }
    ],
    intro: "从未失去探索明天的勇气，始终保持对世界的好奇。",
    selectedWorks: "精选作品",
    years: "[ 2021 — 2026 ]"
  },
  en: {
    heroItems: [
      { text: "Photography & Videography", annotation: "(Extensive Portfolio)", category: Category.VIDEO },
      { text: "Graphic & UI", annotation: "(The Passion)", category: Category.DESIGN },
      { text: "Environment & Interior", annotation: "(Field of Study)", category: Category.ENVIRONMENT },
      { text: "BBQ", annotation: "(Master Level1)", category: null }
    ],
    intro: "Never lose the courage to explore tomorrow, always maintain curiosity about the world.",
    selectedWorks: "Selected Works",
    years: "[ 2021 — 2026 ]"
  }
};
