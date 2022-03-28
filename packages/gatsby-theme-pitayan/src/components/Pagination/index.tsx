import React from "react"
import { Link } from "gatsby"

type PaginationProps = {
  pageInfo: {
    currentPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    pageCount: number
  }
  path: string
}

const Pagination: React.FC<PaginationProps> = ({
  pageInfo: { currentPage, hasNextPage, hasPreviousPage, pageCount },
  path,
}) => {
  const itemClass = (i: number) =>
    currentPage == i + 1 ? "pagination-item active" : "pagination-item"
  return (
    <ul className="pagination text-center">
      {hasPreviousPage ? (
        <li className="pagination-item">
          <Link to={`/${path}/${currentPage - 1}`}>Prev</Link>
        </li>
      ) : null}
      {Array.from({ length: pageCount }).map((_, i: number): any => {
        return (
          <li key={i + 1} className={itemClass(i)}>
            <Link to={`/${path}/${i + 1}`}>{i + 1}</Link>
          </li>
        )
      })}
      {hasNextPage ? (
        <li className="pagination-item">
          <Link to={`/${path}/${currentPage + 1}`}>Next</Link>
        </li>
      ) : null}
    </ul>
  )
}

export default Pagination
