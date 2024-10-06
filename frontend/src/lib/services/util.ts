import api from "@/lib/api";
import useSWR from "swr";
import { mutate } from "swr";
const fetcher = (url: string) => api.get(url).then(res => res.data.data );
const fetcher2 = (url: string) => api.get(url).then(res => res.data);

type Fetcher = (url: string) => Promise<any>;
const useSWRWithParams = <T = any>(url: string, fetchFunction: Fetcher = fetcher, options = {}, cache = true) => {
  return useSWR<T>(url, fetchFunction, {
    revalidateOnFocus: !cache,
    revalidateIfStale: !cache,
    revalidateOnReconnect: !cache,
    ...options,
  });
};
const clearCache = () => mutate(
  () => true,
  undefined,
  { revalidate: false }
)
 
export { fetcher, fetcher2, useSWRWithParams,clearCache };
