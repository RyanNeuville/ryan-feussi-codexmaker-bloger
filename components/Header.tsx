import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  const { data: session, status } = useSession();
  let left = (
    <div className="left">
      <Link href="/" className="bold" data-active={isActive("/")}>
        <span>codexmaker</span>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        span {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .left span[data-active="true"] {
          color: gray;
        }

        span + span {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right: React.ReactNode = null;

  if (status === "loading") {
    left = (
      <div className="left">
        <Link href="/" className="bold btn btn-ghost btn-circle" data-active={isActive("/")}>
          <span>codexmaker</span>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          span {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left span[data-active="true"] {
            color: gray;
          }

          span + span {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin" data-active={isActive("/signup")}>
          <span className="btn btn-primary">Log in</span>
        </Link>
        <style jsx>{`
          span {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          span + span {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right span {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left flex gap-2">
        <Link href="/" className="btn btn-ghost">
          <span className="bold mr-4 font-bold font-mono text-blue-500" data-active={isActive("/")}>
            <span>codexmaker</span>
          </span>
          
        </Link>
        <Link href="/drafts" className="btn btn-active hover:btn-info transition-all">
          <span data-active={isActive("/drafts")} className="font-mono">Mes brouillons</span>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          span {
            text-decoration: none;
            display: inline-block;
          }

          span + span {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );

    right = (
      <div className="right">
        <p className=" text-sm md:text-md lg:text-lg text-white font-mono">
          {session.user?.name} 
          {/* ({session.user?.email}) */}
        </p>
        <Link href="/create">
          <button>
            <span className="btn btn-info">New post</span>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <span className="btn btn-error mx-2">Log out</span>
        </button>
        <style jsx>{`
          span {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          span + span {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right span {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav className="navbar bg-base-100/50 shadow-sm mb-20 fixed">
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
