import React, { memo } from "react"
import { Link } from "gatsby"

type NavigationLinkProps = {
  className?: string
  internal: boolean
  name: string
  to: string
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  className,
  internal = true,
  name,
  to,
}) => {

  return internal
    ? <Link to={to} className={className}>{name}</Link>
    : <a href={to} className={className} target="_blank" rel="noreferrer">{name}</a>
}

export default memo(NavigationLink)
