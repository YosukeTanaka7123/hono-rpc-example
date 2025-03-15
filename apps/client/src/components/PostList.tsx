import { useSuspenseQuery } from "@tanstack/react-query";
import { getPosts, useMutationDeletePost } from "../querys/posts";

const usePostList = () => {
  const { data } = useSuspenseQuery(getPosts());
  const deleteMutation = useMutationDeletePost();
  const onDelete = (id: string) => deleteMutation.mutate({ param: { id } });
  return { data, onDelete };
};

export const PostList = () => {
  const { data, onDelete } = usePostList();
  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((post, index: number) => (
          <tr key={post.id}>
            <td>{index + 1}</td>
            <td>{post.id}</td>
            <td>{post.fullname}</td>
            <td>{post.age}</td>
            <td>
              <button type="button" onClick={() => onDelete(post.id)}>
                DEL
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
