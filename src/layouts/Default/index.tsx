import React from "react"
import DarkModeToggle from '@/components/DarkModeToggle'

type Props = {
  children?: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className="my-24 mx-auto px-6 max-w-screen-lg">
      <DarkModeToggle />
      {children}
    </div>
  )
}

export default DefaultLayout

