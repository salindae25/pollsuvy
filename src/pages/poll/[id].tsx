import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const PollVotePageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery([
    "polls.get-by-id",
    { id: id || "" },
  ]);
  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <div className="flex flex-col w-full gap-4 ">
      <h3 className="text-2xl font-semibold tracking-[1px]">{data.title}</h3>
      <div className="flex flex-col">
        {data?.options?.map((option) => {
          return <span>{option.label}</span>;
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
