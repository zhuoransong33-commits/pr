import { Language, Experience, HonorsData } from '../../types';

export interface EducationPageContent {
  title: string;
  about: string;
  openToWork: string;
  viewHonorsLabel: string;
  honorsTitle: string;
  competitionsTitle: string;
  scholarshipsLabel: string;
  titlesLabel: string;
  experiences: Experience[];
  honors: HonorsData;
}

export const EDUCATION_DATA: Record<Language, EducationPageContent> = {
  zh: {
    title: '关于我',
    about: '环境设计本科在读，具备数字媒体艺术与视觉设计基础，熟悉空间规划、视觉表达、影像后期与前端应用开发。正在寻找设计、视觉传播、数字媒体或相关方向的实习机会。',
    openToWork: '正在寻找实习机会',
    viewHonorsLabel: '查看荣誉与奖项',
    honorsTitle: '荣誉与奖项',
    competitionsTitle: '竞赛奖项',
    scholarshipsLabel: '奖学金',
    titlesLabel: '荣誉称号',
    experiences: [
      {
        id: 'edu-1',
        year: '2024.08 - 2026.07',
        title: '环境设计 | 本科',
        institution: '南通理工学院',
        description: '主修环境设计专业，系统学习室内空间规划、材料工艺、照明设计及 3D 建模等课程，专业排名前 10%。掌握 AutoCAD、SketchUp、3ds Max 等设计软件，具备方案设计、施工图深化等能力。',
        type: 'education',
      },
      {
        id: 'edu-2',
        year: '2021.09 - 2024.06',
        title: '数字媒体艺术设计 | 大专',
        institution: '南京工业职业技术大学',
        description: '主修数字媒体艺术设计，学习数字创意、影视后期、视觉设计与数字艺术工具，熟悉 Photoshop、Premiere、Blender、UE 等软件。专业排名前 5%，多次参与虚拟现实内容竞赛设计、数字场馆建模等实训课程，并获得优异成绩。',
        type: 'education',
      },
      {
        id: 'work-1',
        year: '2025.06 - 至今',
        title: '影视后期剪辑师 | 影视传媒',
        institution: '洛阳江湖影视',
        description: '负责影视剧素材粗剪、精剪及调色工作，独立完成 4 部短剧单集时长 3-5 分钟的后期剪辑流程，能够较好把控节奏与镜头衔接；多次协助主管审核项目成片并提交，协助处理多机位素材整理与特效包装，配合团队完成季度项目交付。',
        type: 'work',
      },
      {
        id: 'work-2',
        year: '2020.07 - 2020.09',
        title: '摄影助理（灯光造型方向） | 摄影服务',
        institution: '洛阳夕木摄影工作室',
        description: '协助摄影师完成电商产品、写真及婚纱摄影的灯光布置与现场调试，操作柔光箱、LED 补光灯等设备。通过光比控制与角度调整优化人像质感，助力成片客户满意；参与写真套餐拍摄流程跟进，协助整理拍摄素材并配合后期筛选。',
        type: 'work',
      },
    ],
    honors: {
      scholarships: [
        '2023 年国家励志奖学金',
        '南京奇石馆校企合作空间设计竞赛｜项目奖金 10,000 元',
      ],
      titles: [
        '摄影社团社长',
        '广志路社区美好小店宣传拍摄志愿项目｜优秀志愿者',
        '数字媒体艺术设计专业实训课程｜全优成绩',
      ],
      competitions: [
        {
          level: '国家级',
          awards: [
            '三等奖 | 中国好创意摄影',
            '三等奖 | 国际雪雕大赛',
          ],
        },
        {
          level: '省级',
          awards: [
            '优秀奖 | 巨鲨杯江苏省大学生摄影',
            '二等奖 | 第二届网络文化节摄影',
          ],
        },
        {
          level: '校级 / 项目',
          awards: [
            '二等奖 | 南京奇石馆校企合作空间设计竞赛（教师组）',
          ],
        },
      ],
    },
  },
  en: {
    title: 'About',
    about: 'An environmental design undergraduate with a background in digital media art, visual design, spatial planning, video post-production, and front-end application building. Currently seeking internship opportunities in design, visual communication, digital media, or related fields.',
    openToWork: 'Open to Internship Opportunities',
    viewHonorsLabel: 'View Honors & Awards',
    honorsTitle: 'Honors & Awards',
    competitionsTitle: 'Competition Awards',
    scholarshipsLabel: 'Scholarships',
    titlesLabel: 'Honorary Titles',
    experiences: [
      {
        id: 'edu-1',
        year: '2024.08 - 2026.07',
        title: 'Environmental Design | Bachelor',
        institution: 'Nantong Institute of Technology',
        description: 'Studying environmental design, including interior spatial planning, material techniques, lighting design, and 3D modeling. Ranked in the top 10% of the major. Skilled in AutoCAD, SketchUp, and 3ds Max, with experience in concept design and construction drawing development.',
        type: 'education',
      },
      {
        id: 'edu-2',
        year: '2021.09 - 2024.06',
        title: 'Digital Media Art Design | Associate Degree',
        institution: 'Nanjing Vocational University of Industry Technology',
        description: 'Studied digital media art design, digital creativity, video post-production, visual design, and digital art tools. Familiar with Photoshop, Premiere, Blender, and Unreal Engine. Ranked in the top 5% and participated in VR content design and digital venue modeling projects.',
        type: 'education',
      },
      {
        id: 'work-1',
        year: '2025.06 - Present',
        title: 'Video Post-production Editor | Film & Media',
        institution: 'Luoyang Jianghu Film & Media',
        description: 'Responsible for rough cuts, fine cuts, and color grading. Independently completed post-production workflows for four short drama episodes, each 3-5 minutes long, with attention to pacing and shot continuity. Assisted supervisors with project review, multi-camera material organization, and effects packaging.',
        type: 'work',
      },
      {
        id: 'work-2',
        year: '2020.07 - 2020.09',
        title: 'Photography Assistant | Lighting & Styling',
        institution: 'Luoyang Ximu Photography Studio',
        description: 'Assisted photographers with lighting setup and on-site adjustments for e-commerce products, portraits, and wedding photography. Operated softboxes and LED lights, improved portrait texture through light ratio and angle adjustments, and supported shooting workflow, material organization, and post-production selection.',
        type: 'work',
      },
    ],
    honors: {
      scholarships: [
        '2023 National Encouragement Scholarship',
        'Nanjing Ornamental Stone Gallery University–Enterprise Spatial Design Competition | RMB 10,000 Project Award',
      ],
      titles: [
        'President of the Photography Club',
        'Guangzhi Road Community Small Business Promotion Project | Outstanding Volunteer',
        'Digital Media Art Design Practical Courses | Excellent Results in All Courses',
      ],
      competitions: [
        {
          level: 'National',
          awards: [
            'Third Prize | China Creative Photography Competition',
            'Third Prize | International Snow Sculpture Competition',
          ],
        },
        {
          level: 'Provincial',
          awards: [
            'Excellence Award | Jusha Cup Jiangsu College Student Photography Competition',
            'Second Prize | 2nd Online Culture Festival Photography Competition',
          ],
        },
        {
          level: 'University / Project',
          awards: [
            'Second Prize | Nanjing Ornamental Stone Gallery University–Enterprise Spatial Design Competition (Faculty Division)',
          ],
        },
      ],
    },
  },
};
