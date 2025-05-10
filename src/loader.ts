import { parseXMindToXMindMarkFile } from 'xmindmark/dist/src/lib/xmind-to-xmindmark'

export async function loadFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.addEventListener('error', reject)
    fileReader.addEventListener('abort', reject)
    const suffix = file.name.split('.').slice(-1)[0]
    // support .xmind file
    if (suffix === 'xmind') {
      fileReader.readAsArrayBuffer(file)
      fileReader.addEventListener('loadend', async () => {
        const content = formatXMindMarkFileFromXMind(await parseXMindToXMindMarkFile(fileReader.result as ArrayBuffer));
        if (content) {
          resolve(content)
        } else {
          reject(new Error('Not valid .xmind file.'))
        }
      })
    } else {
      fileReader.readAsText(file)
      fileReader.addEventListener('loadend', () => resolve(fileReader.result as string))
    }
  })
}

export function downloadFile(content: ArrayBuffer | Blob, fileName: string) {
  const downloader = document.createElement('a')
  downloader.style.setProperty('display', 'none')
  document.body.appendChild(downloader)

  const url = content instanceof Blob
    ? URL.createObjectURL(content)
    : URL.createObjectURL(new Blob([content]))

  downloader.href = url
  downloader.download = fileName
  downloader.click()

  // clear
  URL.revokeObjectURL(url)
  document.body.removeChild(downloader)
}

/**
 * Format the content of xmindmark file from xmind
 * 
 * @param content 
 */
function formatXMindMarkFileFromXMind(content?: string): string | null {
  if (!content) {
    return ''
  }
  const lines = content.split('\n')
  let startIndex = 0
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() !== '') {
      startIndex = i
      break
    }
  }
  for (let i = startIndex + 1; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('    ')) {
      lines[i] = line.slice(4)
    }
  }
  return lines.join('\n')
}