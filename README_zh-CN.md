# MarkXMind

[![License](https://img.shields.io/github/license/jinzcdev/markxmind.svg)](https://github.com/jinzcdev/markxmind/blob/main/LICENSE)
[![English](https://img.shields.io/badge/English-Click_to_view-blue)](README.md)
[![npm](https://img.shields.io/npm/v/@markxmind/markxmind-core.svg)](https://www.npmjs.com/package/@markxmind/markxmind-core)
[![GitHub Stars](https://img.shields.io/github/stars/jinzcdev/markxmind?style=social)](https://github.com/jinzcdev/markxmind)

> **🎉 [@markxmind/markxmind-core](https://www.npmjs.com/package/@markxmind/markxmind-core)** 已发布至 npm，可在任意 Node.js 或浏览器项目中使用：`npm install @markxmind/markxmind-core`。

**MarkXMind** 是一个在线思维导图工具，使用类似 Markdown 的语法（XMindMark）创建 XMind 思维导图，并支持实时预览、导出为多种格式。本项目灵感源于 [Markmap](https://github.com/markmap/markmap) 与 [XMindMark](https://github.com/xmindltd/xmindmark)。

## ✨ 特性

- 🚀 纯文本创建复杂思维导图，使用简单的 XMindMark 语法
- 👀 实时预览渲染效果
- 💾 导出为多种格式：`.xmind`、`.xmindmark`、`.svg`、`.png`
- 📤 导入 `.xmind` 文件并转换为 XMindMark 文本
- 🖥️ 完全在浏览器中运行，无需后端服务
- 🌓 支持亮色/暗色模式

## 🔗 在线使用

[👉 立即体验 MarkXMind](https://markxmind.js.org/)

![MarkXMind 预览](./docs/preview.png)

## 🚀 本地开发

### 前置条件

- Node.js (v18 或以上)
- npm

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/jinzcdev/markxmind.git
cd markxmind
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm run serve
```

4. 打开浏览器访问 `http://localhost:5173`

### 构建项目

```bash
npm run build
```

## 📝 使用方法

### 基本使用

1. 在编辑器中输入 XMindMark 文本
2. 右侧即时预览生成的思维导图
3. 使用底部工具栏导出为不同格式

### XMindMark 语法简介

XMindMark 语法类似 Markdown，使用缩进和特殊符号表示思维导图的层级结构和元素关系。

#### 基础语法示例

```
中心主题

- 主题1
    * 子主题1.1
    * 子主题1.2
- 主题2
    * 子主题2.1
        - 子子主题2.1.1
```

#### 高级语法

- **联系**: 使用 `[数字]` 和 `[^数字]` 创建主题间连接
- **外框**: 使用 `[B]` 或 `[B数字]` 创建外框
- **概要**: 使用 `[S]` 或 `[S数字]` 创建概要
- **超链接**: 使用 `[L:url]` 为主题添加超链接
- **笔记**: 使用 `[N:内容]` 为主题添加文本笔记
- **折叠**: 使用 `[F]` 使主题显示为折叠状态

详细语法请参考:

- [XMindMark 语法指南](./docs/xmindmark-syntax_zh-CN.md)
- [XMindMark 详细规范](./docs/specification_zh-CN.md)

## 🤝 贡献

欢迎贡献代码、报告问题或提出新功能建议！请通过 [GitHub Issues](https://github.com/jinzcdev/markxmind/issues) 和 [Pull Requests](https://github.com/jinzcdev/markxmind/pulls) 参与项目。

## 📄 许可证

[MIT](LICENSE)
