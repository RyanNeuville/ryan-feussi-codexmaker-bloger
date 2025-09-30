import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === post.author?.email;

  let title = post.title;
  if (!post.published) {
    title = `${title} (Brouillons)`;
  }

  return (
    <Layout>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-600 mb-2">
          {title}
        </h2>
        <p>
          <span className="font-mono font-bold">Auteur: </span>{" "}
          <span className="text-sm font-bold text-gray-600">
            {post?.author?.name || "Unknown author"}
          </span>
        </p>
        <br />
        <ReactMarkdown>{post.content}</ReactMarkdown>

        {!post.published && userHasValidSession && postBelongsToUser && (
          <button
            className="btn btn-info mr-4"
            onClick={() => publishPost(post.id)}
          >
            Publier
          </button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <button
            className="btn btn-error my-4"
            onClick={() => deletePost(post.id)}
          >
            Supprimer
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Post;
