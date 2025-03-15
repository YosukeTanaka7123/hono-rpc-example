import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutationPostPost } from "../querys/posts";

const postFormSchema = z.object({
  userName: z.string(),
  userAge: z.coerce.number(),
});

const usePostForm = () => {
  const postMutation = useMutationPostPost();
  const onSubmit = (formData: z.infer<typeof postFormSchema>) => {
    postMutation.mutate({
      json: { fullname: formData.userName, age: formData.userAge },
    });
  };
  const methods = useForm({ resolver: zodResolver(postFormSchema) });
  return { onSubmit, methods };
};

export const PostForm = () => {
  const { onSubmit, methods } = usePostForm();
  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "8px" }}
    >
      <label style={{ marginLeft: "auto" }}>
        Full Name: <input type="text" {...methods.register("userName")} />
      </label>
      {methods.formState.errors.userName && (
        <p>{methods.formState.errors.userName.message}</p>
      )}
      <label style={{ marginLeft: "auto" }}>
        Age: <input type="text" {...methods.register("userAge")} />
      </label>
      {methods.formState.errors.userAge && (
        <p>{methods.formState.errors.userAge.message}</p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};
