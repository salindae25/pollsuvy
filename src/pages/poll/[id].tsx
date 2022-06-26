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
  return (
    <div className="flex flex-col w-full gap-4 ">
      <h3 className="text-2xl font-semibold tracking-[1px]">{data.title}</h3>
      <div className="flex w-[600px] bg-white p-4 min-h-[300px] align-top border border-gray-300 rounded-md flex-col gap-4">
        {data?.options?.map((option) => {
          return (
            <div
              key={option.id}
              className="flex gap-4 border border-gray-300 rounded-md px-3 py-2"
            >
              <button
                onClick={() => {
                  vote(option.id);
                }}
              >
                Vote
              </button>
              <span>{option.label}</span>
              <span>{`count:${option._count.votes}`}</span>
            </div>
          );
        })}
      </div>
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
