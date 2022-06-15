import CreateNewPoll from "@/component/CreateNewPoll";
import { useRouter } from "next/router";

const NewPoll: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col w-full gap-4 ">
        <h3 className="text-2xl font-semibold tracking-[1px]">New Poll</h3>

        <CreateNewPoll
          onSuccess={(id) => {
            router.push(`/poll/${id}`);
          }}
        />
      </div>
    </>
  );
};

export default NewPoll;
