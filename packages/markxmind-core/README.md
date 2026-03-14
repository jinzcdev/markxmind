# @markxmind/markxmind-core

[![License](https://img.shields.io/github/license/jinzcdev/markxmind.svg)](https://github.com/jinzcdev/markxmind/blob/main/LICENSE)
[![中文文档](https://img.shields.io/badge/中文文档-点击查看-blue)](./README_zh-CN.md)
[![npm](https://img.shields.io/npm/v/@markxmind/markxmind-core.svg)](https://www.npmjs.com/package/@markxmind/markxmind-core)
[![GitHub Stars](https://img.shields.io/github/stars/jinzcdev/markxmind?style=social)](https://github.com/jinzcdev/markxmind)

MarkXMind parser — turn Markdown-like text into XMind mind map data.

> 🎉 **Use MarkXMind online**
>
> [**MarkXMind**](https://github.com/jinzcdev/markxmind) is an online editor that builds mind maps from XMindMark syntax. It offers real-time preview, export to .xmind / .svg / .png, and import of existing XMind files. [**Try it now**](https://markxmind.js.org/) →

## ⚙️ Requirements

- **Node.js** ≥ 18 (when used in Node).
- **Bundlers / runtimes** that support ES modules and/or CommonJS (package ships both).

## 📦 Install

```bash
npm install @markxmind/markxmind-core
```

## 📚 API

| Function                                                                       | Description                                                          |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `createMapByXMindMark(raw?: string)`                                           | Parse XMindMark text into a `SheetModel` (XMind sheet data).         |
| `parseXMindMarkToXMindFile(content: string)`                                   | Convert XMindMark text to a `.xmind` file (`Promise<ArrayBuffer>`).  |
| `parseXMindToXMindMarkFile(xmindFile: ArrayBuffer, targetSheetOrder?: number)` | Parse a `.xmind` file and return XMindMark text (`Promise<string>`). |

## 💡 Usage

```typescript
import {
    createMapByXMindMark,
    parseXMindMarkToXMindFile,
    parseXMindToXMindMarkFile,
    type SheetModel
} from "@markxmind/markxmind-core"

// Parse XMindMark text into a data structure
const sheetModel: SheetModel = createMapByXMindMark(`
Central Topic
- Main Topic 1
- Main Topic 2
    - Subtopic 2.1
    - Subtopic 2.2
`)

// Export as .xmind file
const arrayBuffer = await parseXMindMarkToXMindFile(xmindMarkContent)

// Read .xmind file as XMindMark text
const xmindMarkText = await parseXMindToXMindMarkFile(xmindFileBuffer)
```

## 📐 Type exports

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

## 🎯 Use cases

- **Web editors** — Live preview of MarkXMind text.
- **CLI tools** — Convert between `.xmind` and `.xmindmark` on the command line.

## 📄 License

MIT
