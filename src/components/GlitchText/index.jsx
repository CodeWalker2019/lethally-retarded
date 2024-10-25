import classNames from 'classnames'

import style from './style.module.scss'

export default function GlitchText({ className, children }) {
  return (
    <div style={{ zIndex: 16766127 }} className={classNames(style.glitch, className)}>
      <line className={style.line}>{children}</line>
      <line className={style.line}>{children}</line>
      <line className={style.line}>{children}</line>
      <line className={style.line}>{children}</line>
      <line className={style.line}>{children}</line>
      <line className={style.line}>{children}</line>
      <line className={style.line}>{children}</line>
      <line className={style.line}>{children}</line>
      <line className={style.line}>{children}</line>
      <line className={style.line}>{children}</line>
    </div>
  )
}