import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function CustomCursor() {
  const layer = useRef(null)
  useEffect(() => {
    const cursor = layer.current
    const root = document.documentElement
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const ring = cursor.querySelector('.ring-anchor')
    const core = cursor.querySelector('.core-anchor')
    const dots = [...cursor.querySelectorAll('.cursor-trail')]
    let x, y, rx, ry, goalX, goalY, frame, lastTrail = 0, next = 0, control
    let mousePresent = false
    const place = (el, a, b) => { el.style.transform = `translate3d(${a}px,${b}px,0)` }
    function hide() {
      cursor.hidden = true
      root.classList.remove('custom-cursor-active')
      cancelAnimationFrame(frame)
      frame = 0
      control?.style.removeProperty('--pull-x')
      control?.style.removeProperty('--pull-y')
      control = null
    }
    function paint() {
      frame = 0
      const ease = reduced.matches ? 1 : .38
      rx += (goalX - rx) * ease
      ry += (goalY - ry) * ease
      place(ring, rx, ry)
      place(core, x, y)
      cursor.hidden = false
      root.classList.add('custom-cursor-active')
      if (Math.abs(rx-goalX)+Math.abs(ry-goalY) > .2) frame = requestAnimationFrame(paint)
    }
    function update(target) {
      if (!target || target.closest('input,textarea,select,[contenteditable=true]')) return hide()
      const item = target.closest('a,button,[role=button],[role=tab]')
      if (item !== control) {
        control?.style.removeProperty('--pull-x')
        control?.style.removeProperty('--pull-y')
        control = item
      }
      const mode = item?.matches('[data-project]') ? 'view' : item?.closest('nav,header') ? 'nav' :
        item?.matches('a') ? 'link' : item ? 'button' : target.closest('img,.portrait-stage') ? 'image' : 'default'
      cursor.dataset.mode = mode
      goalX = x
      goalY = y
      if (mode === 'button' && !reduced.matches) {
        const b = item.getBoundingClientRect()
        const dx = Math.max(-6, Math.min(6,(b.left+b.width/2-x)*.12))
        const dy = Math.max(-5, Math.min(5,(b.top+b.height/2-y)*.12))
        goalX += dx
        goalY += dy
        item.style.setProperty('--pull-x', dx/2+'px')
        item.style.setProperty('--pull-y', dy/2+'px')
      }
      if (cursor.hidden) { rx = goalX; ry = goalY }
      if (!frame) frame = requestAnimationFrame(paint)
    }
    function move(e) {
      mousePresent = e.pointerType === 'mouse'
      if (!mousePresent) return hide()
      x = e.clientX
      y = e.clientY
      update(e.target)
      if (!cursor.hidden && !reduced.matches && e.type === 'pointermove' && e.timeStamp-lastTrail>30) {
        const dot = dots[next++ % dots.length]
        place(dot,x,y)
        dot.getAnimations().forEach(a=>a.cancel())
        dot.animate([{opacity:.85},{opacity:0}],280)
        lastTrail=e.timeStamp
      }
    }
    function scroll() { if (mousePresent) update(document.elementFromPoint(x,y)) }
    function reset() { mousePresent=false; hide() }
    function click(e) {
      move(e)
      if (!mousePresent || reduced.matches || e.target.closest('input,textarea,select,[contenteditable=true]')) return
      const burst = cursor.querySelector('.cursor-burst')
      place(burst,x,y)
      Array.from(burst.children).forEach((el,i)=>{
        el.getAnimations().forEach(a=>a.cancel())
        const end = i ? `rotate(${i*120}deg) translateX(18px) scale(.4)` : 'scale(2)'
        el.animate([{opacity:1,transform:'scale(.45)'},{opacity:0,transform:end}],400)
      })
    }
    const listeners = [[document,'pointermove',move],[document,'pointerover',move],[document,'pointerdown',click],
      [document,'scroll',scroll],[document,'keydown',reset],[root,'pointerleave',reset],[window,'blur',reset]]
    listeners.forEach(([el,event,fn])=>el.addEventListener(event,fn,true))
    return () => { reset(); listeners.forEach(([el,event,fn])=>el.removeEventListener(event,fn,true)) }
  }, [])
  return createPortal(<div ref={layer} hidden aria-hidden="true" className="reactor">
    {Array.from({length:5},(_,i)=><i key={i} className="cursor-trail" />)}
    <div className="ring-anchor"><i className="reticle" /><span>VIEW</span></div>
    <div className="core-anchor"><i className="cursor-core" /></div>
    <div className="cursor-burst"><i className="cursor-pulse" /><i /><i /><i /></div>
  </div>,document.body)
}
