import React from "react"
import { Link } from "gatsby"
import DarkModeToggle from "@/components/DarkModeToggle"
import URLCopyIconButton from "@/components/URLCopyIconButton"
import SiteIcon from "@/assets/img/SiteIcon.svg"

const TopNav: React.FC<Record<string, unknown>> = () => {
  return (
    <nav className="block flex justify-between content-center">
      <Link to="/" className="flex space-x-4 items-center">
        <SiteIcon width="36" height="36" />
        <b className="font-serif font-extrabold tracking-wide text-2xl hidden md:block">
          Pitayan
        </b>
      </Link>
      <div className="flex space-x-8 text-3xl items-center">
        <URLCopyIconButton />
        <DarkModeToggle />
      </div>
    </nav>
  )
}

export default TopNav
