import "../styles/globals.css";
import "remixicon/fonts/remixicon.css";
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { AppRouter } from "../backend/routes";
import superjson from "superjson";
import Head from "next/head";
import MainLayout from "@/component/MainLayout";
import { AuthProvider, unProtectedRoutes } from "@/component/AuthContext";
import { useRouter } from "next/router";
import BaseLayout from "@/component/BaseLayout";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { route } = useRouter();
  return (
    <>
      <Head>
        <title>Poll Survey</title>
        <meta name="description" content="Survey solution for your all polls" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col w-screen min-h-screen bg-white">
        {!unProtectedRoutes.includes(route) ? (
          <AuthProvider>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </AuthProvider>
        ) : (
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        )}
      </main>
    </>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      transformer: superjson,
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
