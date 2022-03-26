import React from "react"
import PostPanel from "@/components/PostPanel"

type PostsProps = {
  posts: any
}

const Posts: React.FC<PostsProps> = ({ posts }: PostsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {posts.map((post: any) => {
        return <PostPanel post={post} key={post.id} />
      })}
    </div>
  )
}

const RelatedPosts: React.FC<PostsProps> = ({ posts }: PostsProps) => {
  return <Posts posts={posts} />
}

export default RelatedPosts
