import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStackParamList } from "./Main/MainNav";
import Main from "./Main/main";
import { colors } from "../ui/theme";
import { Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useMeQuery } from "../generated/graphql";
import { StyleSheet } from "react-native";
import Chat from "../ui/Chat";
import ChatScreen from "./Main/ChatScreen";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Search } from "./Main/Search";

interface MainTabStackProps {}

const Stack = createStackNavigator<MainStackParamList>();

export const MainStack: React.FC<MainTabStackProps> = ({}) => {
    const { data } = useMeQuery();
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: colors.blackDark,
                },
            }}
            initialRouteName="Main"
        >
            <Stack.Screen
                name="Main"
                options={({ navigation }) => ({
                    headerTitle: "Messages",
                    headerTintColor: "#fff",
                    headerBackground: () => "",
                    headerTitleStyle: {
                        alignSelf: "center",
                    },
                    headerLeft: () => (
                        <Ionicons
                            name="md-settings-sharp"
                            size={21}
                            style={{ marginLeft: 20 }}
                            color="#fff"
                        />
                    ),
                    headerRight: () => (
                        <AntDesign
                            name="plus"
                            size={21}
                            style={{ marginRight: 20 }}
                            color="#fff"
                            onPress={() => {
                                navigation.navigate("Search");
                            }}
                        />
                    ),
                })}
                component={Main}
            />
            <Stack.Screen
                name="ChatScreen"
                options={({ route }) => ({
                    headerTitle: "@" + route.params.username,
                    headerTintColor: "#fff",
                    headerBackground: () => "",
                    headerTitleStyle: {
                        alignSelf: "center",
                        marginRight: "61px",
                    },
                })}
                component={ChatScreen}
            />
            <Stack.Screen
                name="Search"
                options={({ route }) => ({
                    headerTitle: "Search",
                    headerTintColor: "#fff",
                    headerBackground: () => "",
                    headerTitleStyle: {
                        alignSelf: "center",
                        marginRight: "61px",
                    },
                })}
                component={Search}
            />
        </Stack.Navigator>
    );
};
