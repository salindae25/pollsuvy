import { trpc } from "@/utils/trpc";
import { nanoid } from "nanoid";
import { useRef } from "react";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
} from "react-hook-form";

interface IFormInput {
  title: string;
  description: string;
  options?: {
    name: string;
    value: string;
  }[];
}
const options = [1, 2].map((val, index) => ({
  name: `option.${index}`,
  value: "",
  id: `option${index}`,
}));
const CreateNewPoll = ({ onSuccess }: { onSuccess: (id: string) => void }) => {
  const utils = trpc.useContext();
  const { register, handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues: {
      options: options,
    },
  });
  const { fields, remove } = useFieldArray({
    control,
    name: "options",
    keyName: "id",
  });
  const pollMutation = trpc.useMutation(["polls.create"], {
    onSuccess(data) {
      utils.invalidateQueries(["polls.get-all"]);
      onSuccess(data.id);
      reset();
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { title, description } = data;
    console.log(data);

    // pollMutation.mutate({ title, description });
  };
  console.log({ fields });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[600px] bg-white p-4 min-h-[300px] align-top border border-gray-300 rounded-md flex-col gap-4"
    >
      <div className="flex flex-col w-full gap-1">
        <label>Title</label>
        <input
          {...register("title", { required: true })}
          type="text"
          className="w-full h-11 px-2 border border-gray-200 rounded-md"
          placeholder="Type your survey question"
        />
      </div>
      <div className="flex flex-col w-full gap-1">
        <label>Description</label>
        <textarea
          {...register("description", { required: true })}
          rows={2}
          className="w-full py-2 px-2 border border-gray-200 rounded-md"
          placeholder="Short description about the poll"
        />
      </div>
      <div className="flex flex-col w-full gap-1">
        <label>Options</label>
        {fields.map((field, index) => (
          <div key={field.name} className="flex gap-2">
            <input
              type="text"
              className="w-full h-11 px-2 border border-gray-200 rounded-md"
              {...register(`options.${index}`)}
              name={field.name}
              value={field.value}
              id={`options.${index}`}
              defaultValue={field.value}
            />

            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-auto ml-auto  ">
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
export default CreateNewPoll;
