import { darkTheme, lightTheme } from "./theme"
import { createMapByXMindMark } from "./xmindmark"

export function applyMapTheme(sb: any, isDarkMode: boolean) {
    if (!sb) return

    try {
        const sheetModel = sb.getSheetModel()
        if (!sheetModel) return

        const currentTheme = sheetModel.theme()
        if (!currentTheme) return

        sheetModel.changeTheme(isDarkMode ? darkTheme : lightTheme)
    } catch (error) {
        console.error("Theme application failed:", error)
    }
}

let currentMapInstance: any = null

export function renderMapByString(content: string): Promise<void> {
    const result = document.getElementById("result") as HTMLDivElement
    result.innerHTML = ""

    if (!content) {
        result.innerHTML = ""
        return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
        const model = createMapByXMindMark(content)
        const sb = new Snowbrush.SheetEditor({
            el: result,
            model: new Snowbrush.Model.Sheet(model)
        })

        currentMapInstance = sb

        sb.on("SHEET_CONTENT_LOADED", () => {
            sb.execAction("fitMap")
            const isDarkMode = document.body.classList.contains("dark-mode")
            applyMapTheme(sb, isDarkMode)
            resolve()
        })
        sb.initInnerView()
    })
}

export function updateMapTheme(isDarkMode: boolean) {
    if (currentMapInstance) {
        applyMapTheme(currentMapInstance, isDarkMode)
    }
}

export async function exportMapToImage(
    format: "SVG" | "PNG"
): Promise<string | null> {
    if (!currentMapInstance) return null

    try {
        const isDark = document.body.classList.contains("dark-mode")
        if (!isDark) {
            const result = await currentMapInstance.exportImage({
                format,
                skipFont: false
            })
            return result.data
        }

        const content = globalThis.editor?.getValue() ?? ""
        if (!content) {
            return null
        }

        const tempContainer = document.createElement("div")
        tempContainer.style.position = "absolute"
        tempContainer.style.left = "-9999px"
        tempContainer.style.width = "1000px"
        tempContainer.style.height = "1000px"
        document.body.appendChild(tempContainer)

        const model = createMapByXMindMark(content)
        model.theme = lightTheme

        const exportInstance = new Snowbrush.SheetEditor({
            el: tempContainer,
            model: new Snowbrush.Model.Sheet(model)
        })

        await new Promise<void>((resolve) => {
            exportInstance.on("SHEET_CONTENT_LOADED", async () => {
                resolve()
            })
            exportInstance.initInnerView()
        })

        const data = await exportInstance
            .exportImage({
                format,
                skipFont: false
            })
            .then((res) => res.data)

        document.body.removeChild(tempContainer)

        return data
    } catch (error) {
        console.error(`export ${format} failed:`, error)
        return null
    }
}
