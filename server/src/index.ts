import "reflect-metadata";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import path from "path";
import { MessageResolver } from "./resolvers/message";
import { Message } from "./entities/Message";

// rerun
const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        database: "cadi",
        username: "postgres",
        password: "postgres",
        logging: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        synchronize: true, // set to false, when wiping the data (i.e. await Post.delete({}); )
        entities: [User, Message],
    });
    conn.runMigrations();
    const app = express();

    const RedisStore = connectRedis(session);
    const redis = new Redis();

    app.use(
        cors({
            origin: "http://localhost:19006",
            credentials: true,
        })
    );
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax",
                secure: __prod__, // cookie only works in https (turn this off if not using https in production)
            },
            saveUninitialized: false,
            secret: "uixerw7923sh28y235sm19s934dh3785sh",
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, MessageResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    app.listen(4000, () => {
        console.log("🚀 Server started on localhost:4000");
    });
};

main().catch((err) => {
    console.error(err);
});
