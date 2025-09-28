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
        <Link
          href="/"
          className="bold btn btn-ghost btn-circle"
          data-active={isActive("/")}
        >
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
      <div className="left flex gap-2 md:grid">
        <Link href="/" className="btn btn-ghost">
          <span
            className="bold mr-4 font-bold font-mono text-blue-500"
            data-active={isActive("/")}
          >
            <span>codexmaker</span>
          </span>
        </Link>
        <Link
          href="/drafts"
          className="btn btn-active hover:btn-info transition-all fixed bottom-4 right-4"
        >
          <span data-active={isActive("/drafts")} className="font-mono">
            Mes brouillons
          </span>
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
        <p className=" text-sm md:text-md lg:text-lg text-blue-500 font-bold font-mono">
          {session.user?.name}
          {/* ({session.user?.email}) */}
        </p>
        <Link href="/create">
          <button className="btn btn-info">
            <span>Nouveau post</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm120-160v-80h320v80H320Zm0-120v-80h320v80H320Zm0-120v-80h320v80H320Zm360-80v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" />
            </svg>
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

          button {
            border: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav className="navbar bg-base-100/50 shadow-sm mb-20 fixed">
      <div className={"navbar-start"}>{left}</div>
      <div className={"navbar-end"}>{right}</div>
      <style jsx>{`
        nav {
          display: flex;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
