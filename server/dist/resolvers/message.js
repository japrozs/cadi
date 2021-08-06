"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResolver = void 0;
const Message_1 = require("../entities/Message");
const isAuth_1 = require("../middleware/isAuth");
const type_graphql_1 = require("type-graphql");
const type_graphql_2 = require("type-graphql");
const User_1 = require("../entities/User");
let MsgResponse = class MsgResponse {
};
__decorate([
    type_graphql_2.Field(() => [Message_1.Message], { nullable: true }),
    __metadata("design:type", Array)
], MsgResponse.prototype, "sent", void 0);
__decorate([
    type_graphql_2.Field(() => [Message_1.Message], { nullable: true }),
    __metadata("design:type", Array)
], MsgResponse.prototype, "received", void 0);
MsgResponse = __decorate([
    type_graphql_1.ObjectType()
], MsgResponse);
let MessageResolver = class MessageResolver {
    async createMessage(from, to, msg) {
        await Message_1.Message.create({ from, to, msg }).save();
        return true;
    }
    async getMessages(from, to) {
        const fromMsgs = await Message_1.Message.find({
            where: { from, to },
            order: {
                createdAt: "DESC",
            },
        });
        const toMsgs = await Message_1.Message.find({
            where: { from: to, to: from },
            order: {
                createdAt: "DESC",
            },
        });
        return { sent: fromMsgs, received: toMsgs };
    }
    async getAllMessages(from) {
        const fromMsgs = await Message_1.Message.find({
            where: { from },
            order: {
                createdAt: "DESC",
            },
        });
        return fromMsgs;
    }
    async deleteMessage(id, { req }) {
        const userId = req.session.userId;
        const u = await User_1.User.findOne(userId);
        const m = await Message_1.Message.findOne(id);
        if ((u === null || u === void 0 ? void 0 : u.username) != (m === null || m === void 0 ? void 0 : m.from)) {
            return false;
        }
        await Message_1.Message.delete(id);
        return true;
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("from")),
    __param(1, type_graphql_1.Arg("to")),
    __param(2, type_graphql_1.Arg("msg")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "createMessage", null);
__decorate([
    type_graphql_1.Query(() => MsgResponse),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("from")), __param(1, type_graphql_1.Arg("to")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getMessages", null);
__decorate([
    type_graphql_1.Query(() => [Message_1.Message], { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("from")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getAllMessages", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "deleteMessage", null);
MessageResolver = __decorate([
    type_graphql_1.Resolver()
], MessageResolver);
exports.MessageResolver = MessageResolver;
//# sourceMappingURL=message.js.map