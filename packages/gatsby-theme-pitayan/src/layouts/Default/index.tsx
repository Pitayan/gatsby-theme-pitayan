import React from "react"
import TopNav from "@pitayan/gatsby-theme-pitayan/src/components/TopNav"
import BottomFooter from "@pitayan/gatsby-theme-pitayan/src/components/BottomFooter"
import SubscriptionPanel from "@pitayan/gatsby-theme-pitayan/src/components/SubscriptionPanel"
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
    <div className="my-16">
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

      <TopNav className="pb-20 px-6 md:px-8 max-w-screen-xl mx-auto" />

      <div className="px-6 md:px-8 max-w-screen-xl mx-auto">{children}</div>

      <SubscriptionPanel className="p-8 text-center mx-auto bg-gray-50 border border-solid border-gray-100 dark:bg-gray-800 dark:border-gray-800" />

      <BottomFooter className="pt-16 px-6 md:px-8 max-w-screen-xl mx-auto" />
    </div>
  )
}

export default DefaultLayout
