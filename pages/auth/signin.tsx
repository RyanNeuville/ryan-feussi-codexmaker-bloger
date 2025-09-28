import { getProviders, signIn } from "next-auth/react";
import { Github } from "lucide-react";
import Layout from "../../components/Layout";

type Provider = {
  id: string;
  name: string;
};

type SignInProps = {
  providers: Record<string, Provider>;
};

export default function SignIn({ providers }: SignInProps) {
  return (
    <Layout>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
        <div className="w-full max-w-md rounded-2xl bg-white/90 p-8 shadow-xl backdrop-blur">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 98 96"
              className="h-14 w-14 text-gray-800"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M48.85 0C21.84 0 0 22 0 49.17c0 21.75 13.89 40.16 33.18 46.68 2.43.46 3.32-1.07 3.32-2.38 0-1.18-.05-5.1-.07-9.27-13.49 2.98-16.34-5.8-16.34-5.8-2.21-5.63-5.4-7.13-5.4-7.13-4.42-3.05.34-2.99.34-2.99 4.89.34 7.47 5.05 7.47 5.05 4.34 7.55 11.38 5.37 14.16 4.1.44-3.16 1.7-5.37 3.09-6.6-10.77-1.25-22.08-5.42-22.08-24.13 0-5.33 1.88-9.69 4.97-13.1-.5-1.24-2.16-6.27.47-13.07 0 0 4.07-1.32 13.34 5.01a46.3 46.3 0 0 1 12.14-1.65c4.12.02 8.27.56 12.14 1.65 9.26-6.33 13.32-5.01 13.32-5.01 2.65 6.8 1 11.83.5 13.07 3.1 3.41 4.97 7.77 4.97 13.1 0 18.77-11.33 22.87-22.13 24.08 1.75 1.55 3.29 4.6 3.29 9.27 0 6.7-.06 12.11-.06 13.76 0 1.32.87 2.86 3.34 2.38C84.12 89.3 98 70.92 98 49.17 98 22 76.15 0 48.85 0z"
              />
            </svg>
          </div>

          <h1 className="mb-6 text-center text-2xl font-semibold text-gray-900">
            Bienvenue 👋
          </h1>

          {Object.values(providers).map((provider) => (
            <div key={(provider as Provider).name} className="mt-4">
              <button
                onClick={() => signIn((provider as Provider).id)}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gray-900 px-4 py-3 text-white transition hover:bg-gray-800"
              >
                <Github className="h-5 w-5" />
                <span>Continuer avec {(provider as Provider).name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
