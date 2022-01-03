import React from 'react'
import { Link } from 'gatsby'

// TODO: fix footer contents
const BottomFooter = () => {
  const year = new Date().getFullYear()
  return <>
    <hr className="border-gray-300" />
    <footer className="pt-24 pb-12">
      <div className="flex flex-wrap">
        <div className="flex flex-col justify-between pr-36">
          <h1 className="font-black">
            Pitayan<br />
            <small className="text-sm text-gray-500 dark:text-gray-400">Inspiring software development stories</small>
          </h1>
        </div>
        <div className="flex flex-wrap justify-between grow">
          <div className="space-y-2 text-base">
            <h5 className="font-bold mb-3">Explore</h5>
            <Link className="site-link block" to="/">home</Link>
            <Link className="site-link block" to="/write-for-us">write for us</Link>
            <Link className="site-link block" to="/editor-pick">editor's pick</Link>
            <Link className="site-link block" to="/posts">posts</Link>
            <Link className="site-link block" to="/categories">categories</Link>
            <Link className="site-link block" to="/authors">authors</Link>
            <Link className="site-link block" to="/about">about</Link>
          </div>
          <div className="space-y-2 text-base">
            <h5 className="font-bold mb-3">Site</h5>
            <Link className="site-link block" to="/sitemap.xml">sitemap</Link>
            <Link className="site-link block" to="/rss.xml">rss</Link>
            <Link className="site-link block" to="/privacy-policy">privacy</Link>
            <Link className="site-link block" to="/terms-and-conditions">terms</Link>
          </div>
          <div className="space-y-2 text-base">
            <h5 className="font-bold mb-3">Follow</h5>
            <Link className="site-link block" to="/subscribe">subscribe</Link>
            <a href="https://twitter.com" className="site-link block" target="_blank">
              twitter
            </a>
            <a href="https://twitter.com" className="site-link block" target="_blank">
              github
            </a>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-500 font-bold dark:text-gray-400 my-8">
        &copy; {year} Pitayan. All rights reserved.
      </div>
    </footer>
  </>
}

export default BottomFooter

