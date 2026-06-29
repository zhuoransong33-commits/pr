# LuN3cy 个人作品集网站交接文档

更新时间：2026-06-29  
项目路径：`C:\Users\Acer\Documents\GitHub\LuN3cy`

## 1. 项目目标

这是宋卓冉的个人作品集网站，用于展示个人档案、作品分类、经历、荣誉奖项、技能集、联系方式等内容。当前设计方向是“档案 / 文件夹 / 作品索引”风格，参考过 `wildyriftian.com` 的视觉与交互结构，但内容和结构已根据个人作品集重新定制。

网站当前主要目标：

- 首页：档案式主视觉，滚动时作品文件页逐层堆叠。
- 作品页：四个主要作品分类，以文件夹标签形式呈现。
- 关于页：三层卡片式档案结构，包括技能集、个人档案、经历等内容。
- 后续：接入图片与视频作品，让访问者点击分类/项目后能查看对应作品详情。

## 2. 技术栈

- React 19
- Vite 6
- TypeScript
- Tailwind CSS
- Matter.js：用于页面“重力散落”彩蛋逻辑
- Motion：用于部分动画
- lucide-react：图标

常用命令：

```bash
npm install
npm run dev
npm run build
npm run preview
npx tsc --noEmit
```

本地开发默认端口：

```text
http://localhost:3000
```

Vite 配置文件：

```text
vite.config.ts
```

当前 `base` 已做兼容：

- Vercel 环境：`/`
- GitHub Pages 生产环境：`/LuN3cy/`
- 本地开发：`/`

## 3. 当前部署状态

已部署到 Vercel 私有预览项目：

```text
Project: lun3cy-private-preview
Team/Scope: zhuoransong33-2281s-projects
```

当前私有预览地址：

```text
https://lun3cy-private-preview-lwwntagny-zhuoransong33-2281s-projects.vercel.app
```

已验证：

- 唯一部署 URL 会跳转到 Vercel SSO / Authentication 页面。
- 未登录访问不会直接看到网站内容。
- 曾自动生成的公开别名 `lun3cy-private-preview.vercel.app` 已删除，当前访问为 404。

后续部署建议使用：

```bash
npx.cmd --yes vercel@54.18.2 deploy --skip-domain --scope zhuoransong33-2281s-projects
```

注意：必须加 `--skip-domain`，否则 Vercel 可能自动生成公开 alias，导致网站被未授权访问。

## 4. Git 当前状态

当前工作区有大量未提交修改。不要在没有确认的情况下执行：

```bash
git reset --hard
git checkout -- .
git clean -fd
```

这些操作可能会删除当前已完成的网站修改。

当前有多处文件被修改、删除或新增，包括：

- `App.tsx`
- `components/HeroSection.tsx`
- `components/PortfolioSection.tsx`
- `components/Sidebar.tsx`
- `components/TimelineSection.tsx`
- `src/data/*.ts`
- `types.ts`
- `vite.config.ts`
- `.gitignore`
- `.github/workflows/deploy.yml`

已删除的旧组件包括：

- `components/ElasticSlider.tsx`
- `components/MusicPlayer.tsx`
- `components/SoftCard.tsx`
- `scripts/add-song.cjs`
- `src/data/dev.ts`
- `src/data/music.ts`

这些删除是因为网站已去掉不需要显示的旧模块，例如音乐播放器彩蛋、旧软卡片、旧开发分类等。

## 5. 页面结构

主入口：

```text
App.tsx
```

当前没有使用 React Router，而是通过 `activeTab` 状态切换页面：

- `dashboard`：首页
- `portfolio`：作品页
- `articles`：档案/文章页
- `about`：关于页
- `contact`：联系页

主要组件：

```text
components/Sidebar.tsx
components/HeroSection.tsx
components/PortfolioSection.tsx
components/ArticleSection.tsx
components/TimelineSection.tsx
```

主要数据文件：

```text
src/data/home.ts
src/data/portfolioPage.ts
src/data/projects.ts
src/data/photography.ts
src/data/photography_projects.ts
src/data/videography.ts
src/data/design.ts
src/data/education.ts
src/data/contact.ts
src/data/articles.ts
src/data/navigation.ts
```

类型定义：

```text
types.ts
```

## 6. 首页设计交互

首页的设计方向是“档案式主视觉 + 文件夹式精选作品堆叠”。

用户确认过的核心需求：

- 页面不是普通滚动列表。
- 鼠标滚轮下滑时，下方作品页应该向上堆叠到上一页之上。
- 不希望整体页面像普通网页一样一直往上滚。
- 文件夹标签需要停留在导航栏下方，不要和顶部导航重叠。
- 标签边缘不能有透明渐变条或突兀边界。
- 主视觉文字需要松散一些，不要太拥挤。
- 精品作品需要逐层堆叠，最后一个作品底部可以放动态小箭头提示继续滚动。

相关组件：

```text
components/HeroSection.tsx
components/PortfolioSection.tsx
```

## 7. 作品页设计交互

作品页当前主要分类为四个文件夹标签：

1. 静态摄影
2. 动态影像
3. 平面交互
4. 环境 / 室内设计

用户确认过的需求：

- 不需要“全部”标签。
- 标签需要像文件夹一样从页面底部生长出来。
- 宽屏下可以错落堆叠。
- 平板 / 窄屏 / 手机下要变成整齐堆叠。
- 最下面的标签必须贴近屏幕底边。
- 鼠标移动到标签上时：
  - 当前标签轻微上提。
  - 其他标签整体颜色和文字颜色变淡。
  - 不改变图层顺序。
  - 不遮挡其他标签文字。
- 文字不能被上一层背景挡住。
- 文件夹左上角需要小圆角。
- 数字编号字号不能过小。

相关组件：

```text
components/PortfolioSection.tsx
src/data/projects.ts
src/data/portfolioPage.ts
```

后续点击分类后的目标结构：

- 点击分类标签进入该分类详情页。
- 详情页左侧可显示动态标签 / 小挂件。
- 右侧显示该分类下项目列表。
- 鼠标悬停项目行时，该行展开，显示更多信息，如年份、关键词、预览图。

## 8. 关于页设计交互

关于页参考 `wildyriftian.com/about`，当前目标是三层档案卡片：

1. 技能集
2. 个人档案
3. 经历

用户确认过的交互逻辑：

- 初始状态下三个标签页都靠左对齐。
- 点击某个下层标签时，该标签上面的卡片移动到右侧，只露出一条边，方便再次点击。
- 点击右侧露出的标签时，对应卡片可以回到左侧。
- 点击“经历”区域任何位置时，上面两个卡片都应移到右侧。
- 点击“技能集”或“个人档案”卡片任何区域都应触发对应切换，不应只点击小圆点才有效。
- 不要把卡片做成上下折叠。
- 窄屏下三张卡片也要保持完整打开状态，只是统一宽度，按相同层级逻辑堆叠。
- 黄色技能集卡片不要内部滚动；内容不够放时，直接拉长卡片高度。
- 经历卡片在任何屏幕尺寸下都应比上面两个卡片更高。
- 宽屏下技能集卡片宽度希望约占屏幕一半。
- 每个标签页都应有大标题。
- 标题文字需要完整显示，不能被裁切。
- 顶部“关于 / 我”两个大字需要比之前小约三分之一。

相关组件：

```text
components/TimelineSection.tsx
src/data/education.ts
src/data/contact.ts
```

## 9. 关于页内容

个人档案当前包括：

- 姓名：宋卓冉
- 简介：环境设计本科在读，具备数字媒体艺术与视觉设计基础，熟悉空间规划、视觉表达、影像后期与前端应用开发，正在寻找设计、视觉传播、数字媒体或相关方向实习机会。
- 邮箱：`1404782347@qq.com`
- 微信：`BDAY23330000`
- 电话：`+86 16638843378`
- 所在位置：中国，江苏

注意：这些信息属于个人联系方式。私有预览可以放，公开发布前需要用户再次确认是否要全部展示。

## 10. 技能集内容规划

用户提供过的技能 / 软件能力：

- Premiere
- Photoshop
- Lightroom
- Illustrator
- AI Web 设计
- 手机客户端 UI 设计
- 摄影
- 电商摄影
- 平面摄影
- 摄影暗房技术
- Blender
- 3ds Max
- SketchUp
- Lumion
- UE5
- D5 渲染器
- 阅读
- 文字功底扎实
- AE / After Effects
- 影片调色
- 视频编辑
- AutoCAD
- UI

已确认分类逻辑：

### 平面 / 视觉 / 摄影

- Photoshop
- Lightroom
- Illustrator
- 平面摄影
- 电商摄影
- 摄影
- 摄影暗房技术
- 视觉叙事
- 作品集整理

### 视频 / 后期

- Premiere Pro
- After Effects
- 视频编辑
- 影片调色
- 动态影像基础

### 3D / 空间 / 渲染

- Blender
- 3ds Max
- SketchUp
- Lumion
- Unreal Engine 5
- D5 渲染器
- 空间建模
- 室内 / 环境表现

### UI / Web / 数字界面

- UI 设计
- 手机客户端 UI 设计
- AI Web 设计
- 前端页面实现
- 信息图表与交互表达

### 实操 / 综合能力

- AutoCAD
- 阅读理解
- 文字表达
- 资料整理
- 项目执行

用户要求：内容多时，拉长技能集标签页，不要给该黄色卡片加内部滚动。

## 11. 图片和视频作品接入方案

用户目前大部分图片在百度网盘。

不建议直接用百度网盘作为网页图片/视频外链来源，原因：

- 外链不稳定。
- 可能需要登录或跳转。
- 图片不能保证直接被网页加载。
- 访问速度和权限不可控。

推荐素材组织方式：

```text
public/
  works/
    photography/
      project-01/
        cover.webp
        01.webp
        02.webp
        03.webp

    videography/
      project-01/
        cover.webp
        preview.mp4

    graphic/
      project-01/
        cover.webp
        01.webp
        02.webp

    interior/
      project-01/
        cover.webp
        01.webp
        02.webp
```

建议文件规格：

- 封面图：`webp`，宽度约 1600px。
- 展示图：`webp` 或压缩后的 `jpg`，宽度约 1600–2200px。
- 视频：压缩版 `mp4`，单个尽量控制在几十 MB 内。

如果后续作品素材很多，建议迁移到：

- Vercel Blob
- Cloudinary
- 阿里云 OSS
- 腾讯云 COS

## 12. 本地素材处理建议

建议用户先从百度网盘下载到本地并按以下结构整理：

```text
作品集素材/
  静态摄影/
    项目01_项目名/
      cover.jpg
      01.jpg
      02.jpg

  动态影像/
    项目01_项目名/
      cover.jpg
      preview.mp4

  平面交互/
    项目01_项目名/
      cover.jpg
      01.jpg

  环境室内设计/
    项目01_项目名/
      cover.jpg
      01.jpg
```

后续可由开发者完成：

- 统一文件名。
- 批量压缩图片。
- 转换为 `.webp`。
- 生成项目数据。
- 接入作品分类与详情页。
- 部署新的私有预览。

## 13. 编码与中文注意事项

部分中文文件在 PowerShell 中读取时出现乱码显示，例如：

```text
浣滃搧
绮鹃€夊奖...
```

这可能是终端编码显示问题，也可能是文件内容曾被错误编码保存。继续开发前建议：

- 用 VS Code 打开相关 `src/data/*.ts` 文件。
- 确认右下角编码为 `UTF-8`。
- 浏览器中检查中文是否显示正常。
- 如果网页实际也乱码，需要重新用 UTF-8 修复中文数据。

重点检查文件：

```text
src/data/home.ts
src/data/portfolioPage.ts
src/data/contact.ts
src/data/education.ts
src/data/navigation.ts
```

## 14. 检查与部署流程

每次修改后建议执行：

```bash
npx tsc --noEmit
npm run build
git diff --check
```

部署私有预览：

```bash
npx.cmd --yes vercel@54.18.2 deploy --skip-domain --scope zhuoransong33-2281s-projects
```

部署后必须检查：

1. 新 URL 是否能正常构建。
2. 未登录访问是否跳转 Vercel Auth。
3. 是否误生成公开 alias。

如果误生成公开 alias，需要删除：

```bash
npx.cmd --yes vercel@54.18.2 alias rm <alias-domain> --yes --scope zhuoransong33-2281s-projects
```

## 15. 已知风险 / 后续待处理

### 高优先级

- 当前工作区修改很多，尚未整理成稳定提交。
- Vercel 私有预览需要继续避免公开 alias。
- 个人联系方式上线前需要确认是否公开。
- 作品图片/视频还未正式接入。

### 中优先级

- `package-lock.json` 有较大变动，需确认是否必要。
- 中文数据文件需要确认 UTF-8 编码。
- 作品页分类详情仍需继续完善。
- 关于页三层卡片交互需要持续在宽屏、平板、手机尺寸下测试。

### 低优先级

- Browserslist / baseline-browser-mapping 构建时提示数据较旧，可后续更新。
- GitHub Pages workflow 仍存在，但当前主要使用 Vercel 私有预览。

## 16. 推荐下一步

1. 先把当前版本整理成一次 Git 提交，避免后续修改丢失。
2. 确认中文数据文件是否实际乱码。
3. 整理作品素材文件夹。
4. 先接入每个分类 1–2 个代表作品作为样板。
5. 确认作品详情页结构。
6. 再批量接入剩余图片和视频。
7. 每次重大修改后部署新的 Vercel 私有预览。

