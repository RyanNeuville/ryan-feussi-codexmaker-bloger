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
  createAt: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  const isALongMessage = (message: string): boolean => {
    return message.length >= 100;
  };

  const cutMessage = (message: string): string => {
    const newMessage: string = message.substring(0, 100) + "...";
    return newMessage;
  };
  const authorImage = post.author
    ? post.author.image
    : "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png";
  return (
    <div
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
      className="flex flex-col div"
    >
      <span className="text-sm md:text-md lg:text-xl xl:text-2xl font-mono font-bold text-gray-800/50">
        TECH
      </span>
      <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-600 mb-2">
        {post.title}
      </h2>
      <div className="flex gap-3">
        <Image
          src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
          alt="user picture"
          width={40}
          height={40}
          className="bg-transparent rounded-full shadow-md"
        ></Image>
        <div className="flex flex-col">
          <span className="font-mono font-bold">{authorName}</span>
        </div>
      </div>
      <div className="mt-4">
        <ReactMarkdown
          children={
            isALongMessage(post.content)
              ? cutMessage(post.content)
              : post.content
          }
        />
      </div>
      <div className="mt-2 text-white">
        <button className="btn btn-info">
          Voir l'article{" "}
          <span className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M479-500Zm1 300q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-6 15-12.5 29T893-444l-63-59q-51-100-144.5-158.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q11 0 21.5-.5T523-283q-4 20-4 41t4 41q-11 1-21.5 1H480Zm0-120q-75 0-127.5-52.5T300-500q0-75 52.5-127.5T480-680q75 0 127.5 52.5T660-500q0 7-.5 13.5T658-473l-62 57q-19 19-34 40.5T537-330q-14 5-28 7.5t-29 2.5Zm0-72q45 0 76.5-31.5T588-500q0-45-31.5-76.5T480-608q-45 0-76.5 31.5T372-500q0 45 31.5 76.5T480-392ZM760-80q-67 0-113.5-47T599-241q0-33 14-63t38-53l109-103 108 103q24 23 37.5 52.5T920-242q0 68-47 115T760-80Zm0-80q33 0 56.5-24t22.5-58q0-17-7.5-32T812-300l-52-50-53 50q-12 11-20 26.5t-7 32.5q0 34 23 57.5t57 23.5Zm0-95Z" />
            </svg>
          </span>
        </button>
      </div>
      <style jsx>{`
        .div {
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
