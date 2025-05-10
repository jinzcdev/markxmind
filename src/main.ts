import { parseXMindMarkToXMindFile } from 'xmindmark'
import { downloadFile, loadFileAsText } from './loader'
import { renderMapByString, updateMapTheme, exportMapToImage } from './map'

let openedFileName: string = ''

function initRenderEngine() {
  const result = document.getElementById('result') as HTMLDivElement
  const convert = document.getElementById('convert') as HTMLDivElement

  result.classList.add('loading')
  convert.classList.add('loading')

  window.addEventListener('load', () => {
    result.classList.remove('loading')
    convert.classList.remove('loading')

    const existContent = globalThis.editor?.getValue() ?? ''
    if (existContent.length > 0) {
      renderMapByString(existContent)
    }
  })
}

function initEditor() {
  const input = document.getElementById('input') as HTMLDivElement
  input.classList.add('loading')

  window.addEventListener('load', () => {
    const isDarkMode = document.body.classList.contains('dark-mode');

    globalThis.editor = globalThis.monaco.editor.create(input, {
      language: 'markdown',
      wordWrap: 'off',
      minimap: { enabled: false },
      fontSize: 16,
      // hide gutter aside line number
      lineNumbers: 'on',
      lineDecorationsWidth: 6,
      lineNumbersMinChars: 0,
      folding: false,
      // hide vertical line of ruler
      overviewRulerBorder: false,
      theme: isDarkMode ? 'vs-dark' : 'vs'
    })

    input.classList.remove('loading')
  })
}

function initResizer() {
  const content = document.getElementById('content') as HTMLDivElement
  const resultContainer = document.getElementById('result-container') as HTMLDivElement
  const resizer = document.getElementById('resizer') as HTMLDivElement

  let isResizing = false;
  let initialX: number;
  let initialContentWidth: number;
  let initialResultWidth: number;

  resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    initialX = e.clientX;
    initialContentWidth = content.getBoundingClientRect().width;
    initialResultWidth = resultContainer.getBoundingClientRect().width;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e: MouseEvent) {
    if (!isResizing) return;

    const deltaX = e.clientX - initialX;
    const totalWidth = initialContentWidth + initialResultWidth;
    const newContentWidth = Math.max(200, Math.min(initialContentWidth + deltaX, totalWidth - 300));
    const newResultWidth = totalWidth - newContentWidth;

    const contentRatio = newContentWidth / totalWidth;
    const resultRatio = newResultWidth / totalWidth;

    content.style.flex = `${contentRatio}`;
    resultContainer.style.flex = `${resultRatio}`;

    if (globalThis.editor) {
      globalThis.editor.layout();
    }
  }

  function onMouseUp() {
    isResizing = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (globalThis.editor) {
      globalThis.editor.layout();
    }
  }

  window.addEventListener('resize', () => {
    if (globalThis.editor) {
      globalThis.editor.layout();
    }
  });
}

function initThemeToggle() {
  const modeToggle = document.getElementById('mode-toggle') as HTMLDivElement;

  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  if (isDarkMode) {
    document.body.classList.add('dark-mode');

    if (globalThis.editor && globalThis.monaco) {
      globalThis.monaco.editor.setTheme('vs-dark');
    }
  }

  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    localStorage.setItem('darkMode', isDark ? 'true' : 'false');

    if (globalThis.editor && globalThis.monaco) {
      globalThis.monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs');
    }

    updateMapTheme(isDark);

    if (globalThis.editor) {
      globalThis.editor.layout();
    }
  });
}

function getFirstNonEmptyLine(content: string): string {
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.length > 0) {
      return trimmedLine;
    }
  }
  return 'untitled';
}

function initView() {
  const fileSelect = document.getElementById('file-select') as HTMLInputElement
  const input = document.getElementById('input') as HTMLDivElement
  const convertToXMind = document.getElementById('convert-xmind') as HTMLDivElement
  const convertToXMindMark = document.getElementById('convert-xmindmark') as HTMLDivElement
  const convertToSVG = document.getElementById('convert-svg') as HTMLDivElement
  const convertToPNG = document.getElementById('convert-png') as HTMLDivElement

  let timeoutToken: ReturnType<typeof setTimeout>
  let isComposing = false

  input.addEventListener('compositionstart', () => {
    isComposing = true
  })

  input.addEventListener('compositionend', () => {
    isComposing = false
    clearTimeout(timeoutToken)
    timeoutToken = setTimeout(() => {
      const content = globalThis.editor?.getValue() ?? ''
      renderMapByString(content)
    }, 500)
  })

  input.addEventListener('keydown', () => {
    if (isComposing) return

    clearTimeout(timeoutToken)
    timeoutToken = setTimeout(() => {
      const content = globalThis.editor?.getValue() ?? ''
      renderMapByString(content)
    }, 500)
  })

  fileSelect.addEventListener('input', async () => {
    const file = fileSelect.files?.[0]
    if (file) {
      openedFileName = file.name.split('.')[0]
      input.classList.add('loading')

      const result = await loadFileAsText(file)
      globalThis.editor.setValue(result)
      renderMapByString(result)
      input.classList.remove('loading')
      fileSelect.files = null
    }
  })

  convertToXMind.addEventListener('click', async () => {
    const content = globalThis.editor?.getValue() ?? ''
    const arrayBuffer = await parseXMindMarkToXMindFile(content)
    const downloadFileName = openedFileName.length > 0 ? openedFileName : getFirstNonEmptyLine(content)
    downloadFile(arrayBuffer, `${downloadFileName}.xmind`)
  })

  convertToXMindMark.addEventListener('click', () => {
    const content = globalThis.editor?.getValue() ?? ''
    if (content.length > 0) {
      const downloadFileName = openedFileName.length > 0 ? openedFileName : getFirstNonEmptyLine(content)
      const blob = new Blob([content], { type: 'text/plain' })
      downloadFile(blob, `${downloadFileName}.xmindmark.md`)
    }
  })

  convertToSVG.addEventListener('click', async () => {
    const content = globalThis.editor?.getValue() ?? '';
    if (content.length > 0) {
      const svgData = await exportMapToImage('SVG');
      if (svgData) {
        const downloadFileName = openedFileName.length > 0 ? openedFileName : getFirstNonEmptyLine(content);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        downloadFile(blob, `${downloadFileName}.svg`);
      }
    }
  });

  convertToPNG.addEventListener('click', async () => {
    const content = globalThis.editor?.getValue() ?? '';
    if (content.length > 0) {
      const pngData = await exportMapToImage('PNG');
      if (pngData) {
        const downloadFileName = openedFileName.length > 0 ? openedFileName : getFirstNonEmptyLine(content);
        // PNG: base64 format
        const response = await fetch(pngData);
        const blob = await response.blob();
        downloadFile(blob, `${downloadFileName}.png`);
      }
    }
  });
}

function main() {
  initEditor()
  initRenderEngine()
  initResizer()
  initThemeToggle()
  initView()
}

main()