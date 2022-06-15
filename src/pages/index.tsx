import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { KeyboardEventHandler, useCallback, useRef, useState } from "react";
import { trpc } from "../utils/trpc";

const AuthNav: React.FC = () => {
  const utils = trpc.useContext();
  const userCreate = trpc.useMutation(["user.create"], {
    onSuccess: () => {
      utils.invalidateQueries(["polls.get-all"]);
      utils.invalidateQueries(["user.auth"]);
    },
  });
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <form
        className="flex flex-col w-full"
        onSubmit={(evt) => {
          evt.preventDefault();
          userCreate.mutate({
            email: evt.target?.email.value,
            name: evt.target?.name.value,
          });
        }}
      >
        <div className="flex w-full">
          <input
            ref={inputRef}
            type="email"
            name="email"
            className="w-56 px-2"
            placeholder="Type your email"
          />
          <input
            ref={inputRef}
            type="text"
            name="name"
            className="w-56 px-2"
            placeholder="Type your name"
          />
          <button className="px-2 py-1 rounded-md border" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
const Home: NextPage = () => {
  const { data, isLoading, error } = trpc.useQuery(["polls.get-all"]);

  if (isLoading || !data) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error occurred</div>;
  }
  return (
    <>
      <div className="flex flex-col w-full gap-4 ">
        <h3 className="text-2xl font-semibold tracking-[1px]">Dashboard</h3>
        <div className="w-[600px] flex flex-col gap-4">
          {data?.length !== 0 ? (
            data.map((poll) => {
              return (
                <Link href={`/poll/${poll.id}`} key={poll.id}>
                  <a className="flex px-4 py-2 bg-white border border-gray-200 rounded-md flex-col gap-2 hover:bg-slate-100 active:bg-slate-200">
                    <div className="flex w-full items-center">
                      <div>{poll.title}</div>
                      <div className="text-gray-500 text-sm ml-auto">
                        {poll.createdAt.toLocaleDateString("en", {
                          dateStyle: "medium",
                        })}
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {poll.description || ""}
                    </span>
                  </a>
                </Link>
              );
            })
          ) : (
            <Link href="/poll/new">
              <a className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-max">
                <i className="ri-add-circle-line h-5 w-5" />{" "}
                <span>Create a new poll</span>
              </a>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
