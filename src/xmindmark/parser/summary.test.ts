import { describe, expect, it } from "vitest"
import { createMapByXMindMark } from "./mindmark"

describe("4.1 - Summary", () => {
    it("Basic Summary", () => {
        const map = createMapByXMindMark(`

central topic

* topic 1 [S]
* topic 2 [S]
[S] summary topic

        `)

        const summaryTopic = map.rootTopic.children.summary[0]
        expect(summaryTopic.title).toBe("summary topic")
        const summary = map.rootTopic.summaries[0]
        expect(summary.range).toBe("(0,1)")
        expect(summary.topicId).toBe(summaryTopic.id)
    })

    it("Summary with numbers", () => {
        const map = createMapByXMindMark(`

central topic

- topic
    * topic 1 [S2]
    * topic 2 [S2]
    [S2] summary topic 2

        `)

        const parent = map.rootTopic.children.attached[0]
        const summaryTopic = parent.children.summary[0]
        expect(summaryTopic.title).toBe("summary topic 2")
        const summary = parent.summaries[0]
        expect(summary.range).toBe("(0,1)")
        expect(summary.topicId).toBe(summaryTopic.id)
    })

    it("Multi Boundaries", () => {
        const map = createMapByXMindMark(`

central topic

* topic 1 [S1]
* topic 2 [S2]
[S2] title 2
[S1] title 1

        `)

        /// S1
        let summaryTopic = map.rootTopic.children.summary[0]
        expect(summaryTopic.title).toBe("title 1")
        let summary = map.rootTopic.summaries[0]
        expect(summary.range).toBe("(0,0)")
        expect(summary.topicId).toBe(summaryTopic.id)

        /// S2
        summaryTopic = map.rootTopic.children.summary[1]
        expect(summaryTopic.title).toBe("title 2")
        summary = map.rootTopic.summaries[1]
        expect(summary.range).toBe("(1,1)")
        expect(summary.topicId).toBe(summaryTopic.id)
    })
})

describe("4.2 - Summary topic has subtopics", () => {
    it("Subtopics", () => {
        const map = createMapByXMindMark(`

central topic

* topic 1 [S]
* topic 2 [S]
[S] summary topic
    - subtopic 1
    - subtopic 2

        `)

        const summaryTopic = map.rootTopic.children.summary[0]
        expect(summaryTopic.title).toBe("summary topic")
        expect(summaryTopic.children.attached[0].title).toBe("subtopic 1")
        expect(summaryTopic.children.attached[1].title).toBe("subtopic 2")

        const summary = map.rootTopic.summaries[0]
        expect(summary.range).toBe("(0,1)")
        expect(summary.topicId).toBe(summaryTopic.id)
    })

    it("SubSubtopics", () => {
        const map = createMapByXMindMark(`
central topic
- subtopic 1[S]
    - subsubtopic 1
[S] summary topic
    - summarySubtopic 1
    - summarySubtopic 2
        `)

        const subtopic1 = map.rootTopic.children.attached[0]
        expect(subtopic1.title).toBe("subtopic 1")

        // Verify subtopic 1's child topic, now there's only one child
        expect(subtopic1.children.attached[0].title).toBe("subsubtopic 1")

        // Verify summary topic
        const summaryTopic = map.rootTopic.children.summary[0]
        expect(summaryTopic.title).toBe("summary topic")

        // Verify child topics under summary topic
        expect(summaryTopic.children.attached[0].title).toBe(
            "summarySubtopic 1"
        )
        expect(summaryTopic.children.attached[1].title).toBe(
            "summarySubtopic 2"
        )

        // Verify summary relationship
        const summary = map.rootTopic.summaries[0]
        expect(summary.range).toBe("(0,0)")
        expect(summary.topicId).toBe(summaryTopic.id)
    })

    it("Subtopics with boundaries", () => {
        const map = createMapByXMindMark(`
central topic
* topic 1 [S]
* topic 2 [S]
[S] summary topic
    - subtopic 1 [B]
    - subtopic 2 [B]
    [B] boundary topic
    `)
        const summaryTopic = map.rootTopic.children.summary[0]
        expect(summaryTopic.title).toBe("summary topic")
        expect(summaryTopic.children.attached[0].title).toBe("subtopic 1 ")
        expect(summaryTopic.children.attached[1].title).toBe("subtopic 2 ")
        const summary = map.rootTopic.summaries[0]
        expect(summary.range).toBe("(0,1)")
        expect(summary.topicId).toBe(summaryTopic.id)
        const boundary = summaryTopic.boundaries[0]
        expect(boundary.range).toBe("(0,1)")
        expect(boundary.title).toBe("boundary topic")
    })
})
