import { describe, expect, it } from "vitest"
import { createMapByXMindMark } from "../mindmark"

describe("1.1 - Basic tests for Central Topics", () => {
    it("Only Central Topic", () => {
        const map = createMapByXMindMark(`

only central topic

`)
        expect(map.rootTopic.title).toBe("only central topic")
    })

    it("Indented Central Topic", () => {
        const map = createMapByXMindMark(`

    \tindented central topic

`)
        expect(map.rootTopic.title).toBe("indented central topic")
    })
})

describe("1.2 - Basic tests for Main Topics", () => {
    it("2 Main Topics", () => {
        const map = createMapByXMindMark(`

central topic
- main topic 1
- main topic 2

`)
        expect(map.rootTopic.title).toBe("central topic")
        const attachedMainTopics = map.rootTopic.children.attached
        expect(attachedMainTopics[0].title).toBe("main topic 1")
        expect(attachedMainTopics[1].title).toBe("main topic 2")
    })

    it("2 Main Topics with empty line", () => {
        const map = createMapByXMindMark(`

central topic

- main topic 1

- main topic 2

`)
        expect(map.rootTopic.title).toBe("central topic")
        const attachedMainTopics = map.rootTopic.children.attached
        expect(attachedMainTopics[0].title).toBe("main topic 1")
        expect(attachedMainTopics[1].title).toBe("main topic 2")
    })

    it("2 Main Topics with *", () => {
        const map = createMapByXMindMark(`

central topic

* main topic 1
* main topic 2

`)
        expect(map.rootTopic.title).toBe("central topic")
        const attachedMainTopics = map.rootTopic.children.attached
        expect(attachedMainTopics[0].title).toBe("main topic 1")
        expect(attachedMainTopics[1].title).toBe("main topic 2")
    })

    it("2 Main Topics with different indicator", () => {
        const map = createMapByXMindMark(`

central topic

- main topic 1
* main topic 2

`)
        expect(map.rootTopic.title).toBe("central topic")
        const attachedMainTopics = map.rootTopic.children.attached
        expect(attachedMainTopics[0].title).toBe("main topic 1")
        expect(attachedMainTopics[1].title).toBe("main topic 2")
    })
})

describe("1.3 - Basic tests for more levels of topics", () => {
    it("2 Main Topics with different indicator", () => {
        const map = createMapByXMindMark(`

Central Topic

- Main Topic 1

- Main Topic 2
    * Subtopic 2.1
    * Subtopic 2.2

- Main Topic 3
    * Subtopic 3.1
        - Subtopic 3.1.1
        - Subtopic 3.1.2
    * Subtopic 3.2
        
`)
        const mainTopics = map.rootTopic.children.attached
        expect(mainTopics[0].title).toBe("Main Topic 1")

        expect(mainTopics[1].title).toBe("Main Topic 2")
        let subtopics = mainTopics[1].children.attached
        expect(subtopics[0].title).toBe("Subtopic 2.1")
        expect(subtopics[1].title).toBe("Subtopic 2.2")

        expect(mainTopics[2].title).toBe("Main Topic 3")
        subtopics = mainTopics[2].children.attached
        expect(subtopics[0].title).toBe("Subtopic 3.1")
        expect(subtopics[1].title).toBe("Subtopic 3.2")

        subtopics = subtopics[0].children.attached
        expect(subtopics[0].title).toBe("Subtopic 3.1.1")
        expect(subtopics[1].title).toBe("Subtopic 3.1.2")
    })
})

describe("1.4 - Space trimming tests", () => {
    it("Central topic with leading and trailing spaces", () => {
        const map = createMapByXMindMark(`

    central topic with spaces    

`)
        expect(map.rootTopic.title).toBe("central topic with spaces")
    })

    it("Multiple spaces in central topic", () => {
        const map = createMapByXMindMark(
            `   multiple    spaces    in central    `
        )
        expect(map.rootTopic.title).toBe("multiple    spaces    in central")
    })

    it("Topics with spaces at different levels", () => {
        const map = createMapByXMindMark(`
   Central Topic with spaces   
-    Main Topic 1 with spaces    
-  Main Topic 2 with spaces  
    * Subtopic with leading and trailing spaces    
`)
        expect(map.rootTopic.title).toBe("Central Topic with spaces")

        const mainTopics = map.rootTopic.children.attached
        expect(mainTopics[0].title).toBe("Main Topic 1 with spaces")
        expect(mainTopics[1].title).toBe("Main Topic 2 with spaces")
        expect(mainTopics[1].children.attached[0].title).toBe(
            "Subtopic with leading and trailing spaces"
        )
    })

    it("Topics with only spaces", () => {
        const map = createMapByXMindMark(`
   Central Topic   
-     
-  Main Topic  
    *      
`)
        expect(map.rootTopic.title).toBe("Central Topic")
        expect(map.rootTopic.children.attached[0].title).toBe("")
        expect(map.rootTopic.children.attached[1].title).toBe("Main Topic")
        // TODO should be empty title
        // expect(map.rootTopic.children.attached[1].children.attached[0].title).toBe("")
    })

    it("Central topic with tab and space characters", () => {
        const map = createMapByXMindMark(
            `  \t  Central Topic with tabs and spaces  \t  `
        )
        expect(map.rootTopic.title).toBe("Central Topic with tabs and spaces")
    })
})
