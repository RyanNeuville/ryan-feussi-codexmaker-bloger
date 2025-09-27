import { getProviders, signIn } from "next-auth/react";

type Provider = {
  id: string;
  name: string;
};

type SignInProps = {
  providers: Record<string, Provider>;
};

export default function SignIn({ providers }: SignInProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Se connecter 🔑</h1>

        {Object.values(providers).map((provider) => (
          <div key={(provider as Provider).name} className="mt-4">
            <button
              onClick={() => signIn((provider as Provider).id)}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Se connecter avec {(provider as Provider).name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}