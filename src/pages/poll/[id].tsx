import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const PollVotePageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery([
    "polls.get-by-id",
    { id: id || "" },
  ]);
  const utils = trpc.useContext();
  const voteMutation = trpc.useMutation(["polls.vote"], {
    onSuccess: () => {
      utils.invalidateQueries(["polls.get-by-id", { id: id || "" }]);
    },
  });
  const vote = (optionId: number) => {
    console.log({ optionId });

    voteMutation.mutate({ optionId, pollId: id });
  };
  if (isLoading || !data) return <div>Loading...</div>;
  const count = data?.options.reduce((p, c) => p + c._count.votes, 0);
  return (
    <div className="flex flex-col w-full gap-4">
      <h3 className="text-2xl text-neutral  font-semibold tracking-[1px]">
        {data.title}
      </h3>
      <div className="flex w-[600px] bg-white p-4 min-h-fit align-top  rounded-md flex-col gap-4">
        {data?.options?.map((option) => {
          return (
            <div
              key={option.id}
              className="flex gap-2 border border-gray-300 items-center rounded-md px-3 py-2 w-full divide-x divide-slate-200"
            >
              <button
                className="btn btn-circle btn-outline btn-sm text-primary"
                onClick={() => {
                  vote(option.id);
                }}
              >
                <i className="ri-heart-fill"></i>
              </button>
              <div className="w-full flex flex-col gap-2 pl-2">
                <div className="w-full flex gap-4 justify-between">
                  <span>{option.label}</span>
                  <span>{`votes ${option._count.votes}`}</span>
                </div>
                <progress
                  className="progress progress-primary w-full transition-all ease-in duration-300"
                  value={((option._count.votes / count) * 100).toFixed(2)}
                  max="100"
                ></progress>
              </div>
            </div>
          );
        })}
      </div>

      <Link href="/poll/new">
        <a className="btn btn-primary btn-outline transition-all ease-in duration-300">
          {" "}
          Create new poll
        </a>
      </Link>
    </div>
  );
};

const PollVotePage: React.FC = () => {
  const { query } = useRouter();
  const id = query.id as string;
  if (!id) {
    return <div>No Id</div>;
  }
  return <PollVotePageContent id={id} />;
};

export default PollVotePage;
