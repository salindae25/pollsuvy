import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { KeyboardEventHandler, useCallback, useRef, useState } from "react";
import { trpc } from "../utils/trpc";
const PollCreator: React.FC = () => {
  const utils = trpc.useContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const pollMutation = trpc.useMutation(["polls.create"], {
    onSuccess() {
      utils.invalidateQueries(["polls.get-all"]);
      if (!inputRef?.current) return;
      inputRef.current.value = "";
    },
  });
  return (
    <div className="flex w-full">
      <input
        ref={inputRef}
        type="text"
        className="w-56 px-2"
        onKeyDown={(evt) => {
          if (evt.key == "Enter") {
            pollMutation.mutate({ title: evt.currentTarget.value });
          }
        }}
        placeholder="Type your survey question"
      />
      {/* <button className="px-2 py-1 rounded-md border" onClick={pollSubmit}>
   Submit
 </button> */}
    </div>
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
      <Head>
        <title>Poll Survey</title>
        <meta name="description" content="Survey solution for your all polls" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-screen px-20 min-h-screen flex-col">
        <h3 className="text-bold text-3xl mx-auto">Get opinion via polling</h3>
        <div className="w-full flex flex-col">
          {data.map((poll) => {
            return (
              <Link href={`/poll/${poll.id}`} key={poll.id}>
                <a>
                  <div>{poll.title}</div>
                </a>
              </Link>
            );
          })}
        </div>
        <PollCreator />
      </div>
    </>
  );
};

export default Home;
