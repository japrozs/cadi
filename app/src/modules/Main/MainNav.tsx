import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type MainStackParamList = {
    Main: undefined;
    ChatScreen: {
        username: string;
    };
    Search: undefined;
};

export type MainStackNav<RouteName extends keyof MainStackParamList> = {
    navigation: StackNavigationProp<MainStackParamList, RouteName>;
    route: RouteProp<MainStackParamList, RouteName>;
};
