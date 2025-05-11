import { createMapByXMindMark } from './mindmark'
import { describe, expect, it } from 'vitest'

describe('3.1 - Boundary', () => {

    it('Basic Boundary', () => {
        let map = createMapByXMindMark(`

central topic

* topic 1 [B]
* topic 2 [B]

        `)

        let boundary = map.rootTopic.boundaries[0]
        expect(boundary.range).toBe('(0,1)')
    })

    it('Boundary with numbers', () => {
        let map = createMapByXMindMark(`

central topic

* topic 1 [B1]
* topic 2 [B1]

        `)

        let boundary = map.rootTopic.boundaries[0]
        expect(boundary.range).toBe('(0,1)')
    })

    it('Multi Boundaries', () => {
        let map = createMapByXMindMark(`

central topic

* topic 1 [B1]
* topic 2 [B2]

        `)

        let boundary = map.rootTopic.boundaries[0]
        expect(boundary.range).toBe('(0,0)')
        boundary = map.rootTopic.boundaries[1]
        expect(boundary.range).toBe('(1,1)')
    })

})

describe('3.2 - Boundary with Title', () => {

    it('Basic Boundary', () => {
        let map = createMapByXMindMark(`

central topic

* topic 1 [B]
* topic 2 [B]
[B] title 1

        `)

        let boundary = map.rootTopic.boundaries[0]
        expect(boundary.range).toBe('(0,1)')
        expect(boundary.title).toBe('title 1')
    })

    it('Boundary with numbers', () => {
        let map = createMapByXMindMark(`

central topic

* topic 1 [B1]
* topic 2 [B1]
[B1] title 2

        `)

        let boundary = map.rootTopic.boundaries[0]
        expect(boundary.range).toBe('(0,1)')
        expect(boundary.title).toBe('title 2')
    })

    it('Multi Boundaries', () => {
        let map = createMapByXMindMark(`

central topic

* topic 1 [B1]
* topic 2 [B2]
[B2] title 2
[B1] title 1

        `)

        let boundary = map.rootTopic.boundaries[0]
        expect(boundary.range).toBe('(0,0)')
        expect(boundary.title).toBe('title 1')
        boundary = map.rootTopic.boundaries[1]
        expect(boundary.range).toBe('(1,1)')
        expect(boundary.title).toBe('title 2')
    })

    it('Boundaries with subtopics', () => {
        let map = createMapByXMindMark(`

central topic

* topic 1
    * topic 1.1 [B]
    * topic 1.2 [B]
    [B] title 1

        `)

        let topic = map.rootTopic.children.attached[0]
        let boundary = topic.boundaries[0]
        expect(boundary.range).toBe('(0,1)')
        expect(boundary.title).toBe('title 1')
    })

})
