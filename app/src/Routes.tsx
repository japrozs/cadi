import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStack } from "./modules/MainStack";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useMeQuery } from "./generated/graphql";
import { AuthStack } from "./modules/AuthStack";
import { Index } from "./Index";

interface RoutesProps {}

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    cache: new InMemoryCache(),
});

const Routes: React.FC<RoutesProps> = ({}) => {
    return (
        <ApolloProvider client={client}>
            <Index />
        </ApolloProvider>
    );
};

export default Routes;
