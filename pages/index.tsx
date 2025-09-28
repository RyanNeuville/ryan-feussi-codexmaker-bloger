import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";

import Squares from "../components/Squares";
import Galaxy from "../components/Galaxy";
import Grid from "../components/Grid";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  // convertir les Dates en string
  const serializedFeed = feed.map((post) => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
  }));

  return {
    props: { feed: serializedFeed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <div className="mb-20">
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-600 mb-2">
            Publications
          </h1>
          <main>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 items-center justify-center gap-4">
              {props.feed.map((post) => (
                <div key={post.id} className="post rounded-md">
                  <Post post={post} />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
