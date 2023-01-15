import React, { memo, useRef, useLayoutEffect, forwardRef } from "react"

const Content: React.FC<any> = forwardRef(({
  items,
  levels,
  lvlRef,
}, ref) => {
  if (lvlRef.current < levels) {
    lvlRef.current++
  } else {
    return <></>
  }

  return (
    <ul ref={ref} className="list-none">
      {items.map((data, index) => {
        return (
          <li className="mt-2" key={index}>
            <a className="site-link" href={data.url}>{data.title}</a>
            {data.items && <Content items={data.items} levels={levels} lvlRef={lvlRef} />}
          </li>
        )
      })}
    </ul>
  )
})

// NOTE: Currently by default, table-of-contents displays 1 level of headings H1 considering performance
const TableOfContents: React.FC<any> = ({
  className = "",
  title = "Table of Contents",
  levels = 2,
  items,
}, articleRef) => {
  const lvlRef = useRef(0)
  const listRef = useRef(null)
  const nodesMap = new Map<HTMLElement, {
    prev: HTMLElement,
    next: HTMLElement,
    bottom?: number
  }>()

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const listHeadingNode = nodesMap.get(entry.target)
        if (entry.intersectionRatio <= 0) {
          if (entry.boundingClientRect.bottom <= 0) {
            listHeadingNode.bottom = entry.boundingClientRect.bottom
            listHeadingNode.prev.classList.remove('active')
            listHeadingNode.next.classList.add('active')
          }
        }

        if (entry.intersectionRatio > 0) {
          if (entry.boundingClientRect.bottom > 0 && listHeadingNode.bottom < 0) {
            listHeadingNode.bottom = entry.boundingClientRect.bottom
            listHeadingNode.next.classList.remove('active')
            listHeadingNode.prev.classList.add('active')
          }
        }
      })
    })

    if (listRef.current) {
      const tocHeadingNodes = listRef.current.querySelectorAll(`a[href]`)

      if (!tocHeadingNodes) {
        return
      }

      tocHeadingNodes.forEach((node, idx) => {
        const url = node.getAttribute('href')
        const articleAnchorNode = articleRef.current.querySelector(`a[href="${url}"]`)

        if (!articleAnchorNode) {
          return
        }

        const previousElementToHeading = articleAnchorNode.parentElement.previousElementSibling ?? articleAnchorNode.parentElement;

        nodesMap.set(previousElementToHeading, {
          prev: tocHeadingNodes[Math.max(idx - 1, 0)],
          next: tocHeadingNodes[idx],
        })

        observer.observe(previousElementToHeading)

      })
    }
  }, [])

  return (
    <div className={`table-of-contents ${className}`}>
      <h5>{title}</h5>
      <Content ref={listRef} items={items} levels={levels} lvlRef={lvlRef} />
    </div>
  )
}

export default memo(forwardRef(TableOfContents))
