import { GetMessageQuery } from "../generated/graphql";

interface MsgArray {
    type: string;
    id: number;
    msg: string;
    createdAt: string;
}

export const mergeTexts = (data: GetMessageQuery | undefined) => {
    let arr: MsgArray[] = [];
    data?.getMessages.sent?.forEach(({ id, msg, createdAt }) => {
        arr.push({
            type: "received",
            id,
            msg,
            createdAt,
        });
    });

    data?.getMessages.received?.forEach(({ id, msg, createdAt }) => {
        arr.push({
            type: "sent",
            id,
            msg,
            createdAt,
        });
    });

    arr.sort((a, b) => {
        if (parseInt(a.createdAt) < parseInt(b.createdAt)) {
            return -1;
        } else if (parseInt(a.createdAt) > parseInt(b.createdAt)) {
            return 1;
        } else {
            return 0;
        }
    });

    return arr;
};
