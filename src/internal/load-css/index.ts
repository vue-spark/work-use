import { getCurrentInstance } from 'vue'

const cssMap = new WeakMap<any, string>()

export function loadCSS(): void {
  const componentOptions = getCurrentInstance()?.proxy?.$options
  if (
    !componentOptions ||
    cssMap.has(componentOptions) ||
    !componentOptions.__cKitStaticCSS
  ) {
    return
  }

  const style = resolveStyleElement()
  style.textContent += `${componentOptions.__cKitStaticCSS}\n`
  cssMap.set(componentOptions, componentOptions.__cKitStaticCSS)
}

function resolveStyleElement(id = 'cKit_loadCSS_style'): HTMLStyleElement {
  let style = document.getElementById(id) as HTMLStyleElement | null
  if (!style) {
    style = document.createElement('style')
    style.id = id
    document.head.appendChild(style)
  }
  return style
}
