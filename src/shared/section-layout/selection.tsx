import type { FunctionalComponent, StyleValue, VNodeChild } from 'vue'

interface SelectionProps {
  rootClass: string
  render: (() => VNodeChild) | undefined

  leftStyles: StyleValue
  leftClass: any
  leftRender: (() => VNodeChild) | undefined

  rightStyles: StyleValue
  rightClass: any
  rightRender: (() => VNodeChild) | undefined
}

export const Selection: FunctionalComponent<SelectionProps> = ({
  rootClass,
  render,

  leftStyles,
  leftClass,
  leftRender,

  rightStyles,
  rightClass,
  rightRender,
}) => {
  render ||= () => {
    return (
      <>
        <div
          style={leftStyles}
          class={[`${rootClass}__left`, leftClass]}
        >
          {leftRender}
        </div>
        <div
          style={rightStyles}
          class={[`${rootClass}__right`, rightClass]}
        >
          {rightRender}
        </div>
      </>
    )
  }

  return <div>{render}</div>
}

Selection.props = ['rootClass']
