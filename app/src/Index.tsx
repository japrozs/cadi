import React from "react";
import {
    NavigationContainer,
    NavigationContainerRef,
} from "@react-navigation/native";
import { useMeQuery } from "./generated/graphql";
import { AuthStack } from "./modules/AuthStack";
import { MainStack } from "./modules/MainStack";
import * as Linking from "expo-linking";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./modules/Auth/Login";
import Main from "./modules/Main/main";

const prefix = Linking.makeUrl("/");

interface IndexProps {}

const linking = {
    prefixes: [prefix],
    config: {
        screens: {
            chat: "chat/:username",
        },
    },
};

const Tab = createBottomTabNavigator();

export const Index: React.FC<IndexProps> = ({}) => {
    const { data, loading } = useMeQuery();
    const routeNameRef = React.useRef<string | undefined>();
    const navigationRef = React.useRef<NavigationContainerRef>(null);

    let body: any = <AuthStack />;
    if (!loading && data && data.me == undefined) {
        body = <AuthStack />;
    } else {
        body = <MainStack />;
    }
    return (
        <NavigationContainer ref={navigationRef} linking={linking}>
            <>{body}</>
        </NavigationContainer>
    );
};
