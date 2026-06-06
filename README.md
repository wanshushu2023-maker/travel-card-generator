# Travel Card Generator

中文版 V1，使用 Next.js App Router 和 Tailwind CSS 构建，适合部署到 Vercel。

## 开发

```bash
npm install
npm run dev
```

默认访问地址：

```text
http://127.0.0.1:8080
```

## 多语言预留

- 项目目录、组件、数据文件使用英文命名。
- 城市和国家数据保留 `slug`、`name_zh`、`name_en`。
- 后续可复制 App Router 路由到 `/en`、`/ja`、`/ko`、`/th`、`/vi`。
- 当前版本只渲染中文版。
