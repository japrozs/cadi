import { Message } from "../entities/Message";
import { isAuth } from "../middleware/isAuth";
import {
    Arg,
    Ctx,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { Field } from "type-graphql";
import { Context } from "src/types";
import { User } from "../entities/User";

@ObjectType()
class MsgResponse {
    @Field(() => [Message], { nullable: true })
    sent?: Message[];

    @Field(() => [Message], { nullable: true })
    received?: Message[];
}

@Resolver()
export class MessageResolver {
    @Mutation(() => Boolean, { nullable: true })
    @UseMiddleware(isAuth)
    async createMessage(
        @Arg("from") from: string,
        @Arg("to") to: string,
        @Arg("msg") msg: string
    ) {
        await Message.create({ from, to, msg }).save();
        return true;
    }

    @Query(() => MsgResponse)
    @UseMiddleware(isAuth)
    async getMessages(@Arg("from") from: string, @Arg("to") to: string) {
        const fromMsgs = await Message.find({
            where: { from, to },
            order: {
                createdAt: "DESC",
            },
        });
        const toMsgs = await Message.find({
            where: { from: to, to: from },
            order: {
                createdAt: "DESC",
            },
        });
        return { sent: fromMsgs, received: toMsgs };
    }

    @Query(() => [Message], { nullable: true })
    @UseMiddleware(isAuth)
    async getAllMessages(@Arg("from") from: string) {
        const fromMsgs = await Message.find({
            where: { from },
            order: {
                createdAt: "DESC",
            },
        });
        return fromMsgs;
    }

    @Mutation(() => Boolean, { nullable: true })
    @UseMiddleware(isAuth)
    async deleteMessage(@Arg("id") id: number, @Ctx() { req }: Context) {
        const userId = req.session.userId;
        const u = await User.findOne(userId);
        const m = await Message.findOne(id);

        if (u?.username != m?.from) {
            return false;
        }

        await Message.delete(id);
        return true;
    }
}
