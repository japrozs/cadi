import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackParamList } from "./Auth/AuthNav";
import Main from "./Main/main";
import { colors } from "../ui/theme";
import { Text } from "react-native";
import Login from "./Auth/Login";
import { AntDesign } from "@expo/vector-icons";
import { Register } from "./Auth/Register";

interface AuthTabStackProps {}

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack: React.FC<AuthTabStackProps> = ({}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: colors.blackDark,
                },
            }}
            initialRouteName="Login"
        >
            <Stack.Screen
                options={{
                    headerTitle: "Login",
                    headerTintColor: colors.white,
                    headerBackground: () => "",
                    headerTitleStyle: {
                        alignSelf: "center",
                    },
                }}
                name="Login"
                component={Login}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Register",
                    headerTintColor: colors.white,
                    headerBackground: () => "",
                    headerTitleStyle: {
                        alignSelf: "center",
                    },
                }}
                name="Register"
                component={Register}
            />
        </Stack.Navigator>
    );
};
