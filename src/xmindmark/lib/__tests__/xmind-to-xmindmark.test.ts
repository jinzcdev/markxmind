import JSZip from "jszip"
import { beforeEach, describe, expect, it } from "vitest"
import { parseXMindToXMindMarkFile } from "../xmind-to-xmindmark"
import { expectedOutputXMindMark, inputJSON } from "./xmind-to-xmindmark.sample"

let sampleFile: ArrayBuffer

describe("XMindMark: form .xmind file", () => {
    beforeEach(async () => {
        const zip = new JSZip()
        sampleFile = await zip
            .file("content.json", JSON.stringify(inputJSON))
            .generateAsync({ type: "arraybuffer", compression: "STORE" })
    })

    it("can convert .xmind file to XMindMark content", async () => {
        const output = await parseXMindToXMindMarkFile(sampleFile)
        expect(output).equal(expectedOutputXMindMark)
    })
})
