import {
    addRelationship,
    addSingleBoundary,
    addSingleSummary,
    addTopic,
    createMap,
    setTheme
} from "./mindmap"

const topicRE = /^(\s*)[-*]\s+/
const numberRE = /\[(\d+)\]/
const relationshipRE = /\[\^(\d+)\](\(([^)]*)\))?/
const boundaryRE = /\[(B\d*)\]/i
const boundaryTitleRE = /^(\s*)\[(B\d*)\]/i
const summaryRE = /\[(S\d*)\]/i
const summaryTopicRE = /^(\s*)\[(S\d*)\]/i
const rangeRE = /\((\d+),(\d+)\)/

function addLine(line: string, status: any) {
    if (summaryTopicRE.test(line)) {
        const match = line.match(summaryTopicRE)!
        const indent = match[1].replace(/\t/g, "    ").length
        const name = match[2]
        line = line.replace(summaryTopicRE, "").trim()

        const currentLevel = status.levels.find((l) => l.indent == indent)

        const topicId = currentLevel.parent.summaries.find(
            (b) => b.name == name
        ).topicId
        const topicObject =
            currentLevel.parent.children.summary.find((t) => t.id == topicId) ||
            {}
        topicObject.title = line

        /// process [1]
        while (numberRE.test(line)) {
            const number = line.match(numberRE)![1]
            line = line.replace(numberRE, "")
            topicObject.title = line
            status.numberedTopics[number] = topicObject
        }

        /// process [^1]
        while (relationshipRE.test(line)) {
            const match = line.match(relationshipRE)!
            const target = match[1]
            const title = match[3]
            line = line.replace(relationshipRE, "")
            topicObject.title = line
            status.relationships[target] = { source: topicObject, title }
        }

        if (topicObject.title) {
            topicObject.title = topicObject.title
                .replace(/\\\[/g, "[")
                .replace(/\\\]/g, "]")
                .trim()
        }

        status.lastTopic = topicObject

        // Update levels array, setting summary topic as new parent topic level
        // Use appropriate indentation level to ensure subsequent subtopics can correctly identify their parent
        const summaryLevel = {
            parent: topicObject,
            indent: indent + 4, // Reserve indentation level for subtopics
            boundaries: [],
            summaries: []
        }

        // Add new level or replace existing level with same indentation
        const existingLevelIndex = status.levels.findIndex(
            (l) => l.indent === indent + 4
        )
        if (existingLevelIndex >= 0) {
            status.levels[existingLevelIndex] = summaryLevel
        } else {
            status.levels.push(summaryLevel)
        }

        return
    }

    if (boundaryTitleRE.test(line)) {
        const match = line.match(boundaryTitleRE)!
        const indent = match[1].replace(/\t/g, "    ").length
        const name = match[2]
        const title = line.replace(boundaryTitleRE, "").trim()

        const currentLevel = status.levels.find((l) => l.indent == indent)

        currentLevel.parent.boundaries.find((b) => b.name == name).title =
            title.trim()

        return
    }

    if (topicRE.test(line)) {
        let topicObject, parentObject
        const indent = line.match(topicRE)![1].replace(/\t/g, "    ").length
        line = line.replace(topicRE, "")

        const currentLevelIndex = status.levels.findIndex(
            (l) => l.indent == indent
        )
        if (currentLevelIndex >= 0) {
            /// find your level
            parentObject = status.levels[currentLevelIndex].parent
            status.levels = status.levels.slice(0, currentLevelIndex + 1)
        } else {
            /// new sub level
            const lastLevel = status.levels[status.levels.length - 1]
            if (lastLevel.indent > indent) throw "Indentation error."

            parentObject = status.lastTopic
            status.levels.push({
                parent: parentObject,
                indent,
                boundaries: [],
                summaries: []
            })
        }

        status.lastTopic = topicObject = addTopic(parentObject, line.trim(), {
            boundaries: [],
            summaries: []
        })

        /// process [1]
        while (numberRE.test(line)) {
            const number = line.match(numberRE)![1]
            line = line.replace(numberRE, "")
            topicObject.title = line
            status.numberedTopics[number] = topicObject
        }

        /// process [^1]
        while (relationshipRE.test(line)) {
            const match = line.match(relationshipRE)!
            const target = match[1]
            const title = match[3]
            line = line.replace(relationshipRE, "")
            topicObject.title = line
            status.relationships[target] = { source: topicObject, title }
        }

        /// process [B]
        while (boundaryRE.test(line)) {
            const name = line.match(boundaryRE)![1]
            line = line.replace(boundaryRE, "")
            topicObject.title = line

            const boundaryExists = parentObject.boundaries
                ?.filter((b) => b.name == name)
                .some((b) => {
                    const index =
                        parentObject.children.attached.indexOf(topicObject)

                    const match = b.range.match(rangeRE),
                        start = parseInt(match[1]),
                        end = parseInt(match[2])

                    if (index == end + 1) {
                        /// extend boundary's range
                        b.range = `(${start},${index})`
                        return true
                    }
                    return false
                })

            if (!boundaryExists) {
                addSingleBoundary(parentObject, topicObject, { name })
            }
        }

        /// process [S]
        while (summaryRE.test(line)) {
            const name = line.match(summaryRE)![1]
            line = line.replace(summaryRE, "")
            topicObject.title = line

            const summaryExists = parentObject.summaries
                ?.filter((b) => b.name == name)
                .some((b) => {
                    const index =
                        parentObject.children.attached.indexOf(topicObject)

                    const match = b.range.match(rangeRE),
                        start = parseInt(match[1]),
                        end = parseInt(match[2])

                    if (index == end + 1) {
                        /// extend summary's range
                        b.range = `(${start},${index})`
                        return true
                    }
                    return false
                })

            if (!summaryExists) {
                addSingleSummary(parentObject, topicObject, { name })
            }
        }

        if (topicObject.title) {
            topicObject.title = topicObject.title
                .replace(/\\\[/g, "[")
                .replace(/\\\]/g, "]")
                .trim()
        }
    }
}

export function createMapByXMindMark(raw = "Central Topic"): any {
    const lines = raw.trim().split("\n")

    /// The First Line must be Central Topic

    const map = createMap(lines.shift()?.trim())
    map.rootTopic.boundaries = []
    map.rootTopic.summaries = []

    const status: any = {
        levels: [
            {
                parent: map.rootTopic,
                indent: 0,
                boundaries: [],
                summaries: []
            }
        ],
        lastTopic: undefined,
        numberedTopics: {},
        relationships: {}
    }

    // Process the rest lines
    lines
        .filter((line) => line.trim() !== "")
        .forEach((line) => addLine(line, status))

    // Create Relationships
    ;(Object.entries(status.relationships) as any).forEach(
        ([number, { source, title }]) => {
            if (!status.numberedTopics[number])
                throw `No topic [${number}] for creating a relationship.`
            addRelationship(map, source, status.numberedTopics[number], {
                title
            })
        }
    )

    setTheme(map)
    return map
}
