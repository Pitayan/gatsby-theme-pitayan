import React from "react"
import { Link } from "gatsby"

type NavigationLinkProps = {
  className?: string
  internal: boolean
  to: string
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  className,
  internal = true,
  to,
  children
}) => {

  return internal
    ? <Link to={to} className={className}>{children}</Link>
    : <a href={to} className={className} target="_blank" rel="noreferrer">{children}</a>
}

export default NavigationLink
