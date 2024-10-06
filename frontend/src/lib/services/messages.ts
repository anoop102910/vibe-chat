import { fetcher, useSWRWithParams } from "./util";
import { IMessage } from "@/index";

export const useMessages = () => {
  const { data, isLoading, error, mutate } = useSWRWithParams<IMessage[]>(`/messages`, fetcher);
  return { messages: data, isLoading, error, mutate };
};
