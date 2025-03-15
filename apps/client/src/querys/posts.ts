import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { hc } from "hono/client";
import type { InferRequestType } from "hono/client";
import type { AppType } from "server/src";

const client = hc<AppType>("http://localhost:8787/");
const QUERY_KEY_POSTS = "posts";

export const getPosts = () =>
  queryOptions({
    queryKey: [QUERY_KEY_POSTS],
    queryFn: async () => (await client.posts.$get()).json(),
  });

export const useMutationPostPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (arg: InferRequestType<typeof client.posts.$post>) =>
      client.posts.$post(arg),

    onSuccess: async (data) => {
      // キャッシュデータに返却値を登録する
      const response = await data.json();
      queryClient.setQueryData([QUERY_KEY_POSTS, response.id], response);
      // リストを再取得する
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_POSTS],
        exact: true,
      });
    },
  });
};

export const getPost = (id: string) => {
  queryOptions({
    queryKey: [QUERY_KEY_POSTS, id],
    queryFn: () => client.posts[":id"].$get({ param: { id } }),
  });
};

export const useMutationPutPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (arg: InferRequestType<(typeof client.posts)[":id"]["$put"]>) =>
      client.posts[":id"].$put(arg),

    onSuccess: async (data) => {
      // キャッシュデータに返却値を登録する
      const response = await data.json();
      queryClient.setQueryData([QUERY_KEY_POSTS, response.id], response);
      // リストを再取得する
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_POSTS],
        exact: true,
      });
    },
  });
};

export const useMutationDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      arg: InferRequestType<(typeof client.posts)[":id"]["$delete"]>,
    ) => client.posts[":id"].$delete(arg),

    onSuccess: async (_, variables) => {
      // キャッシュデータを削除する
      queryClient.removeQueries({
        queryKey: [QUERY_KEY_POSTS, variables.param.id],
        exact: true,
      });
      // リストを再取得する
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_POSTS],
        exact: true,
      });
    },
  });
};
