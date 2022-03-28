import React, { useState } from "react"
import { HiOutlineChevronUp, HiOutlineChevronDown } from "react-icons/hi"
import { Link } from "gatsby"
import OutsideClickHandler from "react-outside-click-handler"

import Avatar from "@pitayan/gatsby-theme-pitayan/src/components/Avatar"
import { ImageDataLike } from "gatsby-plugin-image"

type Author = {
  id: string
  name: string
  initial: string
  avatar: {
    normal: ImageDataLike
  }
}

type AuthorProps = {
  data: Author[]
}

const AuthorAvatars: React.FC<AuthorProps> = ({ data }) => {
  const _data = Array.from(data)
  if (_data.length > 3) {
    _data.length = 3
  }

  return (
    <div className="flex overflow-hidden -space-x-3 p-1">
      {_data.map(({ id, initial, avatar: { normal: image } }) => {
        return <Avatar key={id} initial={initial} image={image} />
      })}
    </div>
  )
}

const AuthorNames: React.FC<AuthorProps> = ({ data }) => {
  const str = data.map(({ name }: Author) => name.substr(0, name.indexOf(" ")))

  if (data.length > 3) {
    str.length = 3
    str.push(`+${data.length - 3}`)
  }

  return <span className="self-center site-link">{str.join(", ")}</span>
}

const CoAuthorsList: React.FC<AuthorProps> = ({ data }) => {
  return (
    <ul className="list-none m-0 -m-2 rounded">
      {data.map(({ id, initial, avatar: { normal: image }, name }) => {
        return (
          <li key={id} className="m-0 p-3">
            <Link className="flex space-x-4" to={`/authors/@${id}`}>
              <Avatar initial={initial} image={image} />
              <span className="self-center site-link">{name}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

const PostAuthors: React.FC<AuthorProps> = ({ data }) => {
  if (data.length == 1) {
    return <CoAuthorsList data={data} />
  }

  const [shouldDisplayPanel, setShouldDisplayPanel] = useState(false)
  const handleClick = () => {
    setShouldDisplayPanel(!shouldDisplayPanel)
  }

  return (
    <div className="relative rounded hover:bg-gray-200 dark:hover:bg-gray-800 -mx-3">
      <div
        aria-hidden
        className="flex space-x-2 justify-center p-3 cursor-pointer"
        onClick={handleClick}
        onKeyDown={handleClick}
      >
        <AuthorAvatars data={data} />
        <AuthorNames data={data} />
        <HiOutlineChevronDown size={20} className="self-center" />
      </div>
      {shouldDisplayPanel && (
        <OutsideClickHandler onOutsideClick={handleClick}>
          <div
            aria-hidden
            className={`absolute top-0 left-0 w-full h-full z-50
            ${shouldDisplayPanel ? "block" : "hidden"}
            `}
            onClick={handleClick}
            onKeyDown={handleClick}
          >
            <div className="flex bg-gray-200 dark:bg-gray-800 p-3 rounded justify-between">
              <CoAuthorsList data={data} />
              <HiOutlineChevronUp size={20} className="self-start mt-3" />
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  )
}

export default PostAuthors
