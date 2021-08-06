import { GetUsersQuery } from "../generated/graphql";

export const searchUser = (query: string, data: GetUsersQuery) => {
    const arr = data?.getUsers?.filter((user) =>
        user.username.trim().includes(query.trim().toLowerCase())
    );
    return arr;
};
