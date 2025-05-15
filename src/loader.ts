import { parseXMindToXMindMarkFile } from "./xmindmark"

export async function loadFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.addEventListener("error", reject)
        fileReader.addEventListener("abort", reject)
        const suffix = file.name.split(".").slice(-1)[0]
        if (suffix === "xmind") {
            fileReader.readAsArrayBuffer(file)
            fileReader.addEventListener("loadend", async () => {
                const content = await parseXMindToXMindMarkFile(
                    fileReader.result as ArrayBuffer
                )
                if (content) {
                    resolve(content)
                } else {
                    reject(new Error("Not valid .xmind file."))
                }
            })
        } else {
            fileReader.readAsText(file)
            fileReader.addEventListener("loadend", () =>
                resolve(fileReader.result as string)
            )
        }
    })
}

export function downloadFile(content: ArrayBuffer | Blob, fileName: string) {
    const downloader = document.createElement("a")
    downloader.style.setProperty("display", "none")
    document.body.appendChild(downloader)

    const url =
        content instanceof Blob
            ? URL.createObjectURL(content)
            : URL.createObjectURL(new Blob([content]))

    downloader.href = url
    downloader.download = fileName
    downloader.click()

    // clear
    URL.revokeObjectURL(url)
    document.body.removeChild(downloader)
}
