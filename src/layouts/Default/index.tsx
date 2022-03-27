import React from "react"
import TopNav from "@/components/TopNav"
import BottomFooter from "@/components/BottomFooter"
import { useCookiePrompt } from "@/hooks"

type Props = {
  children?: React.ReactNode
}

const DefaultLayout: React.FC<Props> = ({ children }: Props) => {
  useCookiePrompt()

  return (
    <div className="my-16 mx-auto px-6 max-w-screen-xl">
      <div className="pb-20">
        <TopNav />
      </div>
      <div>{children}</div>
      <hr className="border-gray-300 mt-12" />
      <div className="pt-12">
        <BottomFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
