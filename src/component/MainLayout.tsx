import Link from "next/link";
import React, { useState } from "react";

import { trpc } from "@/utils/trpc";
import Modal from "./Modal";
import SignIn from "./LoginForm";
const HomeLink = () => {
  return (
    <Link href="/">
      <a>
        <div className="text-primary-500 active:text-primary-600 flex w-28 h-10 transition-colors lg:w-32 tracking-[2px] font-medium text-xl text-purple-700 ">
          <i className="ri-chat-poll-line"></i> <span>POLLSURVY</span>
        </div>
      </a>
    </Link>
  );
};
const MainLayout = ({ children }: { children: any }) => {
  const { data: user, isLoading, error } = trpc.useQuery(["user.auth"]);
  const utils = trpc.useContext();
  const logOutMutation = trpc.useMutation(["user.log-out"], {
    onSuccess: () => {
      utils.invalidateQueries(["user.auth"]);
      utils.invalidateQueries(["polls.get-all"]);
    },
  });
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const handleLogout = () => {
    logOutMutation.mutate();
  };
  const openLoginModal = () => {
    setOpenLoginForm(true);
  };
  //   if (isLoading || !user) {
  //     return <div>Loading</div>;
  //   }
  //   if (error) {
  //     return <div>Error occurred</div>;
  //   }
  return (
    <>
      <div className="relative flex min-h-full flex-col bg-gray-50 lg:flex-row">
        <div className="hidden grow px-4 pt-6 pb-5 lg:block">
          <div className="sticky top-6 float-right w-48 items-start">
            <div className="mb-8 px-3">
              <HomeLink />
            </div>
            {openLoginForm && (
              <SignIn onClose={() => setOpenLoginForm(false)} />
            )}
            <div className="mb-4">
              <Link href="/poll/new">
                <a className="group mb-1 flex items-center space-x-3 whitespace-nowrap rounded-md px-3 py-1 font-medium text-slate-600 transition-colors hover:bg-slate-500/10 hover:text-slate-600 hover:no-underline active:bg-slate-500/20">
                  <i className="ri-pencil-line group-hover:text-primary-500 h-5 opacity-75 group-hover:opacity-100" />
                  <span className="grow text-left">New Poll</span>
                </a>
              </Link>
              <a
                target="_blank"
                href="https://support.rallly.co"
                className="group mb-1 flex items-center space-x-3 whitespace-nowrap rounded-md px-3 py-1 font-medium text-slate-600 transition-colors hover:bg-slate-500/10 hover:text-slate-600 hover:no-underline active:bg-slate-500/20"
                rel="noreferrer"
              >
                <i className="ri-customer-service-2-line group-hover:text-primary-500 h-5 opacity-75 group-hover:opacity-100" />
                <span className="grow text-left">Support</span>
              </a>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="group flex w-full items-center space-x-3 whitespace-nowrap rounded-md px-3 py-1 font-medium text-slate-600 transition-colors hover:bg-slate-500/10 hover:text-slate-600 hover:no-underline active:bg-slate-500/20"
                >
                  <i className="ri-login-box-line group-hover:text-primary-500 h-5 opacity-75 group-hover:opacity-100" />
                  <span className="grow text-left">Logout</span>
                </button>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="group flex w-full items-center space-x-3 whitespace-nowrap rounded-md px-3 py-1 font-medium text-slate-600 transition-colors hover:bg-slate-500/10 hover:text-slate-600 hover:no-underline active:bg-slate-500/20"
                >
                  <i className="ri-login-box-line group-hover:text-primary-500 h-5 opacity-75 group-hover:opacity-100" />
                  <span className="grow text-left">Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="min-w-0 grow">
          <div className="max-w-full pt-12 md:w-[1024px] lg:min-h-[calc(100vh-64px)] lg:pt-6">
            {children}
          </div>
          <div className="flex flex-col items-center space-y-4 px-6 pt-3 pb-6 text-slate-400 lg:h-16 lg:flex-row lg:space-y-0 lg:space-x-6 lg:py-0 lg:px-8 lg:pb-3">
            <div>
              <Link href="/">
                <a className="hover:text-primary-500 text-sm text-slate-400 transition-colors hover:no-underline">
                  <div className="text-primary-500 active:text-primary-600 flex w-20 h-5 transition-colors tracking-[1px] font-medium text-sm text-purple-700 mr-2">
                    <i className="ri-chat-poll-line"></i> <span>POLLSURVY</span>
                  </div>
                </a>
              </Link>
            </div>
            <div className="hidden text-slate-300 lg:block">&bull;</div>
            <div className="flex items-center justify-center space-x-6 md:justify-start">
              {/* <a
                target="_blank"
                href="/"
                className="hover:text-primary-500 text-sm text-slate-400 transition-colors hover:no-underline"
                rel="noreferrer"
              >
                Support
              </a>
              <Link href="/">
                <a className="hover:text-primary-500 text-sm text-slate-400 transition-colors hover:no-underline">
                  Discussions
                </a>
              </Link> */}
              <Link href="/">
                <a className="hover:text-primary-500 text-sm text-slate-400 transition-colors hover:no-underline">
                  Blog
                </a>
              </Link>
              <div className="hidden text-slate-300 lg:block">&bull;</div>
              <div className="flex items-center space-x-6">
                <Link href="https://twitter.com/salindae234">
                  <a className="hover:text-primary-500 text-sm text-slate-400 transition-colors hover:no-underline">
                    <i className="ri-twitter-line h-5 w-5" />
                  </a>
                </Link>
                <Link href="https://github.com/salindae25">
                  <a className="hover:text-primary-500 text-sm text-slate-400 transition-colors hover:no-underline">
                    <i className="ri-github-fill h-5 w-5" />
                  </a>
                </Link>
              </div>
            </div>
            {/* <div className="hidden text-slate-300 lg:block">&bull;</div>
            <Link href="/">
              <a className="hover:bg-primary-500 focus:ring-primary-500 active:bg-primary-600 inline-flex h-8 items-center rounded-full bg-slate-100 pl-2 pr-3 text-sm text-slate-400 transition-colors hover:text-white hover:no-underline focus:ring-2 focus:ring-offset-1">
                <i className="ri-cup-line mr-1 inline-block w-5" />
                <span>Donate</span>
              </a>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
