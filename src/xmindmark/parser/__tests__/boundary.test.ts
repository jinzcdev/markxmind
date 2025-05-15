import { describe, expect, it } from "vitest"
import { createMapByXMindMark } from "../mindmark"

describe("3.1 - Boundary", () => {
    it("Basic Boundary", () => {
        const map = createMapByXMindMark(`

central topic

* topic 1 [B]
* topic 2 [B]

        `)

        const boundary = map.rootTopic.boundaries[0]
        expect(boundary.range).toBe("(0,1)")
    })

    it("Boundary with numbers", () => {
        const map = createMapByXMindMark(`

central topic

* topic 1 [B1]
* topic 2 [B1]

        `)

        const boundary = map.rootTopic.boundaries[0]
        expect(boundary.range).toBe("(0,1)")
    })

    it("Multi Boundaries", () => {
        const map = createMapByXMindMark(`

central topic

* topic 1 [B1]
* topic 2 [B2]

        `)

        let boundary = map.rootTopic.boundaries[0]
        expect(boundary.range).toBe("(0,0)")
        boundary = map.rootTopic.boundaries[1]
        expect(boundary.range).toBe("(1,1)")
    })
})

describe("3.2 - Boundary with Title", () => {
    it("Basic Boundary", () => {
        const map = createMapByXMindMark(`

central topic

* topic 1 [B]
* topic 2 [B]
[B] title 1

        `)

        const boundary = map.rootTopic.boundaries[0]
        expect(boundary.range).toBe("(0,1)")
        expect(boundary.title).toBe("title 1")
    })

    it("Boundary with numbers", () => {
        const map = createMapByXMindMark(`

central topic

* topic 1 [B1]
* topic 2 [B1]
[B1] title 2

        `)

        const boundary = map.rootTopic.boundaries[0]
        expect(boundary.range).toBe("(0,1)")
        expect(boundary.title).toBe("title 2")
    })

    it("Multi Boundaries", () => {
        const map = createMapByXMindMark(`

central topic

* topic 1 [B1]
* topic 2 [B2]
[B2] title 2
[B1] title 1

        `)

        let boundary = map.rootTopic.boundaries[0]
        expect(boundary.range).toBe("(0,0)")
        expect(boundary.title).toBe("title 1")
        boundary = map.rootTopic.boundaries[1]
        expect(boundary.range).toBe("(1,1)")
        expect(boundary.title).toBe("title 2")
    })

    it("Boundaries with subtopics", () => {
        const map = createMapByXMindMark(`

central topic

* topic 1
    * topic 1.1 [B]
    * topic 1.2 [B]
    [B] title 1

        `)

        const topic = map.rootTopic.children.attached[0]
        const boundary = topic.boundaries[0]
        expect(boundary.range).toBe("(0,1)")
        expect(boundary.title).toBe("title 1")
    })
})

describe("3.3 - Boundary with extra spaces", () => {
    it("Boundary title with leading and trailing spaces", () => {
        const map = createMapByXMindMark(`

central topic

* topic 1 [B]
* topic 2 [B]
[B]    boundary title with spaces    

        `)

        const boundary = map.rootTopic.boundaries[0]
        expect(boundary.range).toBe("(0,1)")
        expect(boundary.title).toBe("boundary title with spaces")
    })

    it("Multiple boundaries with spaces", () => {
        const map = createMapByXMindMark(`

central topic

* topic 1 [B1]
* topic 2 [B2]
[B2]   second boundary title   
[B1]     first boundary title     

        `)

        let boundary = map.rootTopic.boundaries[0]
        expect(boundary.range).toBe("(0,0)")
        expect(boundary.title).toBe("first boundary title")

        boundary = map.rootTopic.boundaries[1]
        expect(boundary.range).toBe("(1,1)")
        expect(boundary.title).toBe("second boundary title")
    })

    it("Nested boundaries with spaces", () => {
        const map = createMapByXMindMark(`

central topic

* topic 1
    * topic 1.1 [B]
    * topic 1.2 [B]
    [B]    nested boundary title with spaces    

        `)

        const topic = map.rootTopic.children.attached[0]
        const boundary = topic.boundaries[0]
        expect(boundary.range).toBe("(0,1)")
        expect(boundary.title).toBe("nested boundary title with spaces")
    })
})
