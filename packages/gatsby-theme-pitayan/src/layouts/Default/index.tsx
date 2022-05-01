import React from "react"
import TopNav from "@pitayan/gatsby-theme-pitayan/src/components/TopNav"
import BottomFooter from "@pitayan/gatsby-theme-pitayan/src/components/BottomFooter"
import SEO, { SEOProps } from "@pitayan/gatsby-theme-pitayan/src/components/SEO"
import { useCookiePrompt } from "@pitayan/gatsby-theme-pitayan/src/hooks"

type DefaultLayoutProps = React.PropsWithChildren<SEOProps>

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  postDescription,
  pageImage,
  postTitle,
  pageUrl,
  pageTitle,
  timeToRead,
  date,
  authors,
  noIndex,
  children,
}) => {
  useCookiePrompt()

  return (
    <div className="mt-16 mx-auto px-8 md:px-6 max-w-screen-xl">
      <SEO
        postDescription={postDescription}
        pageImage={pageImage}
        postTitle={postTitle}
        pageUrl={pageUrl}
        pageTitle={pageTitle}
        timeToRead={timeToRead}
        date={date}
        authors={authors}
        noIndex={noIndex}
      />
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
