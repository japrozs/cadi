import React from "react";
import { Text, View, ScrollView } from "react-native";
import {
    useGetAllMessagesQuery,
    useGetUserQuery,
    useMeQuery,
} from "../../generated/graphql";
import Chat from "../../ui/Chat";
import { parseMessages } from "../../utils/parseMessages";
import { MainStackNav } from "./MainNav";

const Main: React.FC<MainStackNav<"Main">> = ({ navigation }) => {
    const { data, loading } = useMeQuery({});
    const { data: msgs } = useGetAllMessagesQuery({
        variables: {
            from: data?.me ? data?.me?.username : "",
        },
    });
    const messages = parseMessages(msgs);
    return (
        <ScrollView>
            {messages ? (
                messages.map((msg) => (
                    <Chat
                        navigation={navigation}
                        username={msg.to}
                        createdAt={new Date(parseInt(msg.createdAt)).toString()}
                        imgUrl={
                            "https://avatars.githubusercontent.com/u/57936?v=4"
                        }
                        description={msg.msg}
                    />
                ))
            ) : (
                <View></View>
            )}
        </ScrollView>
    );
};

export default Main;
