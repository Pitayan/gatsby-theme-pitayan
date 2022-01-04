import React from "react"
import TopNav from "@/components/TopNav"
import BottomFooter from "@/components/BottomFooter"

type Props = {
  children?: React.ReactNode
}

const DefaultLayout: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className="my-16 mx-auto px-6 max-w-screen-xl">
      <TopNav />
      <div className="py-20">{children}</div>
      <BottomFooter />
    </div>
  )
}

export default DefaultLayout
