import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
    image: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  const authorImage = "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <span className="text-sm md:text-md lg:text-xl xl:text-2xl font-mono font-bold text-gray-800/50">TECH</span>
      <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-600 mb-2">{post.title}</h2>
      <div>
        <Image src={authorImage} alt="user picture" width={40} height={20}></Image>
      </div>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
