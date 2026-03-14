# @markxmind/markxmind-core

[![License](https://img.shields.io/github/license/jinzcdev/markxmind.svg)](https://github.com/jinzcdev/markxmind/blob/main/LICENSE)
[![English](https://img.shields.io/badge/English-Click_to_view-blue)](./README.md)
[![npm](https://img.shields.io/npm/v/@markxmind/markxmind-core.svg)](https://www.npmjs.com/package/@markxmind/markxmind-core)
[![GitHub Stars](https://img.shields.io/github/stars/jinzcdev/markxmind?style=social)](https://github.com/jinzcdev/markxmind)

MarkXMind 解析核心库 —— 将类 Markdown 语法的文本解析为 XMind 思维导图数据结构。

> 🎉 **在线使用 MarkXMind**
>
> [**MarkXMind**](https://github.com/jinzcdev/markxmind) 是基于本库的在线编辑器：用 XMindMark 语法编写即可生成思维导图，支持实时预览、导出 .xmind / .svg / .png，以及导入已有 XMind 文件。[**立即体验**](https://markxmind.js.org/) →

## ⚙️ 环境要求

- **Node.js** ≥ 18（在 Node 中使用时）。
- 支持 ES Module 或 CommonJS 的打包工具/运行环境。

## 📦 安装

```bash
npm install @markxmind/markxmind-core
```

## 📚 API

| 方法                                                                           | 说明                                                                 |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `createMapByXMindMark(raw?: string)`                                           | 将 XMindMark 文本解析为 `SheetModel`（思维导图单页数据）。           |
| `parseXMindMarkToXMindFile(content: string)`                                   | 将 XMindMark 文本转换为 .xmind 文件（返回 `Promise<ArrayBuffer>`）。 |
| `parseXMindToXMindMarkFile(xmindFile: ArrayBuffer, targetSheetOrder?: number)` | 将 .xmind 文件解析为 XMindMark 文本（返回 `Promise<string>`）。      |

## 💡 使用示例

```typescript
import {
    createMapByXMindMark,
    parseXMindMarkToXMindFile,
    parseXMindToXMindMarkFile,
    type SheetModel
} from "@markxmind/markxmind-core"

// 解析 XMindMark 文本为数据结构
const sheetModel: SheetModel = createMapByXMindMark(`
Central Topic
- Main Topic 1
- Main Topic 2
    - Subtopic 2.1
    - Subtopic 2.2
`)

// 导出为 .xmind 文件
const arrayBuffer = await parseXMindMarkToXMindFile(xmindMarkContent)

// 从 .xmind 文件读取为 XMindMark 文本
const xmindMarkText = await parseXMindToXMindMarkFile(xmindFileBuffer)
```

## 📐 类型导出

```typescript
import type {
    SheetModel,
    TopicModel,
    TopicChildren,
    TopicType,
    BoundaryModel,
    SummaryModel,
    RelationshipModel
} from "@markxmind/markxmind-core"
```

## 🎯 应用场景

- **Web 编辑器**：实时预览 MarkXMind 文本。
- **CLI 工具**：在命令行中转换 .xmind ↔ .xmindmark。

## 📄 许可证

MIT
