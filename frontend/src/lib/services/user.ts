import { fetcher, useSWRWithParams } from "./util";
import { IUser } from "@/index";
interface UserParams {
  id?: string;
  search?: string;
}

const filterUser = (users: IUser[], params: UserParams) => {
  return users.filter(user => 
    (!params.id || user._id === params.id) &&
    (!params.search || user.name.includes(params.search))
  );
};

export const useUsers = (params: UserParams) => {
  const { data, error, isLoading, mutate } = useSWRWithParams<IUser[]>("/users", fetcher);
  const filteredUsers = data ? filterUser(data, params) : [];
  return { users: filteredUsers, error, isLoading, mutate };
};
