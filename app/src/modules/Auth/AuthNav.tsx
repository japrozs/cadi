import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

export type AuthStackNav<RouteName extends keyof AuthStackParamList> = {
    navigation: StackNavigationProp<AuthStackParamList, RouteName>;
    route: RouteProp<AuthStackParamList, RouteName>;
};
