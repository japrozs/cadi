import { GetAllMessagesQuery, Message } from "../generated/graphql";

type returnType = ({ __typename?: "Message" | undefined } & Pick<
    Message,
    "from" | "to" | "msg" | "createdAt"
>)[];

export const parseMessages = (msgs: GetAllMessagesQuery | undefined) => {
    const arr: returnType = [];
    msgs?.getAllMessages?.forEach((msg) => arr.push(msg));
    arr?.sort((a, b) => {
        if (parseInt(a.createdAt) < parseInt(b.createdAt)) {
            return 1;
        } else if (parseInt(a.createdAt) > parseInt(b.createdAt)) {
            return -1;
        } else {
            return 0;
        }
    });

    let names: Record<string, number> = {};
    let list: returnType = [];

    arr?.forEach((arr) => {
        if (names[arr.to] == undefined) {
            names[arr.to] = 1;
            list.push(arr);
        }
    });

    return list;
};
