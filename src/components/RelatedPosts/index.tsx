import React from "react"
import PostPanel from "@/components/PostPanel"

type PostsProps = {
  posts: any
}

const Posts: React.FC<PostsProps> = ({ posts }: PostsProps) => {
  return (
    <div className="grid relative grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {posts.map(({ node }) => {
        return <PostPanel post={node} key={node.id} />
      })}
    </div>
  )
}

const RelatedPosts: React.FC<PostsProps> = ({ posts }: PostsProps) => {
  return <Posts posts={posts} />
}

export default RelatedPosts
