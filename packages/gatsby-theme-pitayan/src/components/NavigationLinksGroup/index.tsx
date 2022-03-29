import React from "react"
import Navigationlink from "@pitayan/gatsby-theme-pitayan/src/components/NavigationLink"

type NavigationLinksData = {
  internal: boolean
  name: string
  url: string
  group: string
}

type NavigationLinksGroupProps = {
  group: string
  data: NavigationLinksData[]
  className?: string
}

const NavigationLinksGroup: React.FC<NavigationLinksGroupProps> = ({
  group,
  data,
  className,
}) => {
  if (!data.length) return null

  return <>
    {data.map(({
      internal,
      url,
      name,
      group: _group,
    }) =>
      _group.includes(group)
        ? <Navigationlink key={url} name={name} to={url} internal={internal} className={`site-link block ${className}`} />
        : null
    )}
  </>
}

export default NavigationLinksGroup
