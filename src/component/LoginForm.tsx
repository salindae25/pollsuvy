import { trpc } from "@/utils/trpc";
import { useRef } from "react";
import Modal from "./Modal";
interface LoginProps {
  onClose: () => void;
}
const SignIn: React.FC<LoginProps> = ({ onClose }) => {
  const utils = trpc.useContext();
  const signInMutation = trpc.useMutation(["user.sign-in"], {
    onSuccess: () => {
      utils.invalidateQueries(["user.auth"]);
      utils.invalidateQueries(["polls.get-all"]);
      onClose();
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
      <Modal title="Sign in" onOk={onSubmit} onCancel={onClose} okText="Submit">
        <div className="flex w-full">
          <input
            ref={inputRef}
            type="email"
            name="email"
            className="w-56 px-2"
            placeholder="Type your email"
          />
        </div>
      </Modal>
    </>
  );
};

export default SignIn;
