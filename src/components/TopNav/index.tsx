import React from "react"
import { Link } from "gatsby"
import DarkModeToggle from "@/components/DarkModeToggle"
import URLCopyIconButton from "@/components/URLCopyIconButton"
import SiteIcon from "@/assets/img/SiteIcon.svg"
import { RiSearchLine, RiLinksLine } from "react-icons/ri"

const TopNav: React.FC<Record<string, unknown>> = () => {
  return (
    <nav className="block flex justify-between content-center">
      <Link to="/" className="flex space-x-4 items-center">
        <SiteIcon width="40" height="40" />
        <b className="font-serif font-extrabold tracking-wide text-3xl hidden md:block">
          Pitayan
        </b>
      </Link>
      <div className="flex space-x-8 text-3xl">
        <URLCopyIconButton />
        <DarkModeToggle />
      </div>
    </nav>
  )
}

export default TopNav
