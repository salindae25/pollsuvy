import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { useRef } from "react";
interface LoginProps {
  onClose: () => void;
}
const SignIn: React.FC<LoginProps> = ({ onClose }) => {
  const { push } = useRouter();

  const signInMutation = trpc.useMutation(["user.sign-in"], {
    onSuccess: () => {
      // utils.invalidateQueries(["user.auth"]);
      // utils.invalidateQueries(["polls.get-all"]);
      document.location.href = "/";
    },
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = () => {
    if (!inputRef?.current) return;
    const email = inputRef.current.value;
    signInMutation.mutate({ email });
  };
  return (
    <>
      <div className="flex flex-col w-full gap-4 p-4">
        <input
          ref={inputRef}
          type="email"
          name="email"
          className="w-56 h-11 px-2 border border-gray-200 rounded-md"
          placeholder="Type your email"
        />
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-max"
          onClick={onSubmit}
        >
          Sign in
        </button>
      </div>
    </>
  );
};

export default SignIn;
