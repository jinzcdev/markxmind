import { describe, expect, it } from "vitest"
import { parseXMindToXMindMarkFile } from "../../lib/xmind-to-xmindmark"
import { parseXMindMarkToXMindFile } from "../../lib/xmindmark-to-xmind"
import { createMapByXMindMark } from "../mindmark"

describe("XMindMark Parser Extensions", () => {
    it("should support hyperlinks in topics", () => {
        const xmindMark = `Central Topic
- Topic with Hyperlink [L:https://example.com]`

        const map = createMapByXMindMark(xmindMark)
        const topic = map.rootTopic.children.attached[0]

        expect(topic.title).toBe("Topic with Hyperlink")
        expect(topic.href).toBe("https://example.com")
    })

    it("should support notes in topics", () => {
        const xmindMark = `Central Topic
- Topic with Note [N:This is a note content]`

        const map = createMapByXMindMark(xmindMark)
        const topic = map.rootTopic.children.attached[0]

        expect(topic.title).toBe("Topic with Note")
        expect(topic.notes.plain.content).toBe("This is a note content")
        expect(topic.notes.realHTML.content).toBe(
            "<p>This is a note content</p>"
        )
    })

    it("should support folded topics", () => {
        const xmindMark = `Central Topic
- Folded Topic [F]
  - Child Topic`

        const map = createMapByXMindMark(xmindMark)
        const topic = map.rootTopic.children.attached[0]

        expect(topic.title).toBe("Folded Topic")
        expect(topic.branch).toBe("folded")
    })

    it("should support combining multiple features", () => {
        const xmindMark = `Central Topic
- Combined Topic [L:https://example.com] [N:Important note] [F]`

        const map = createMapByXMindMark(xmindMark)
        const topic = map.rootTopic.children.attached[0]

        expect(topic.title).toBe("Combined Topic")
        expect(topic.href).toBe("https://example.com")
        expect(topic.notes.plain.content).toBe("Important note")
        expect(topic.branch).toBe("folded")
    })

    it("bidirectional conversion: XMindMark -> XMind -> XMindMark", async () => {
        // This simulates the conversion process, since we can't directly get the XMind file, this is just a conceptual test
        const original = `Central Topic
- Topic with Hyperlink [L:https://example.com]
- Topic with Note [N:This is a note]
- Folded Topic [F]
  - Child topic`

        // Create an XMind object with our added features
        const xmindObj = createMapByXMindMark(original)

        // Simulate converting the XMind object back to XMindMark format
        // We can't directly call parseXMindToXMindMarkFile because it needs an ArrayBuffer
        // This is just a conceptual test
        const topic1 = xmindObj.rootTopic.children.attached[0]
        const topic2 = xmindObj.rootTopic.children.attached[1]
        const topic3 = xmindObj.rootTopic.children.attached[2]

        expect(topic1.href).toBe("https://example.com")
        expect(topic2.notes.plain.content).toBe("This is a note")
        expect(topic3.branch).toBe("folded")

        const arrayBuffer = await parseXMindMarkToXMindFile(original)

        await parseXMindToXMindMarkFile(arrayBuffer).then((content) => {
            const parsedMap = createMapByXMindMark(content)
            expect(parsedMap.rootTopic.title).toBe("Central Topic")
            expect(parsedMap.rootTopic.children.attached[0].title).toBe(
                "Topic with Hyperlink"
            )
            expect(parsedMap.rootTopic.children.attached[1].title).toBe(
                "Topic with Note"
            )
            expect(parsedMap.rootTopic.children.attached[2].title).toBe(
                "Folded Topic"
            )
        })
    })
})

describe("Root Topic Extensions", () => {
    it("should support hyperlinks in root topic", () => {
        const xmindMark = `Central Topic [L:https://example.com]
- Child Topic`

        const map = createMapByXMindMark(xmindMark)

        expect(map.rootTopic.title).toBe("Central Topic")
        expect(map.rootTopic.href).toBe("https://example.com")
    })

    it("should support notes in root topic", () => {
        const xmindMark = `Central Topic [N:Root note content]
- Child Topic`

        const map = createMapByXMindMark(xmindMark)

        expect(map.rootTopic.title).toBe("Central Topic")
        expect(map.rootTopic.notes.plain.content).toBe("Root note content")
        expect(map.rootTopic.notes.realHTML.content).toBe(
            "<p>Root note content</p>"
        )
    })

    it("should support folded root topic", () => {
        const xmindMark = `Central Topic [F]
- Child Topic`

        const map = createMapByXMindMark(xmindMark)

        expect(map.rootTopic.title).toBe("Central Topic")
        expect(map.rootTopic.branch).toBe("folded")
    })

    it("should support combining multiple features in root topic", () => {
        const xmindMark = `Central Topic [L:https://example.com] [N:Root note] [F]
- Child Topic`

        const map = createMapByXMindMark(xmindMark)

        expect(map.rootTopic.title).toBe("Central Topic")
        expect(map.rootTopic.href).toBe("https://example.com")
        expect(map.rootTopic.notes.plain.content).toBe("Root note")
        expect(map.rootTopic.branch).toBe("folded")
    })
})
