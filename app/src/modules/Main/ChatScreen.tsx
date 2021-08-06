import React from "react";
import { Dimensions, Text, View, ScrollView } from "react-native";
import {
    useGetAllMessagesQuery,
    useGetMessageQuery,
    useMeQuery,
} from "../../generated/graphql";
import { Message } from "../../ui/Message";
import { MessageInput } from "../../ui/MessageInput";
import { colors } from "../../ui/theme";
import { mergeTexts } from "../../utils/mergeTexts";
import { MainStackNav, MainStackParamList } from "./MainNav";

interface ChatScreenProps {}

const ChatScreen: React.FC<MainStackNav<"ChatScreen">> = ({ route }) => {
    const { data: d, loading: fetching } = useMeQuery();

    const { data, loading } = useGetMessageQuery({
        variables: {
            from: route.params.username,
            to: d?.me?.username ? d?.me?.username : "",
        },
    });

    const texts = mergeTexts(data);
    console.log(texts);
    return (
        <View
            style={{
                height: "100%",
            }}
        >
            <Text
                style={{
                    textAlign: "center",
                    color: colors.grayLight,
                    fontWeight: "500",
                    paddingHorizontal: 20,
                    marginBottom: 30,
                }}
            >
                This is the start of your chatting history with{" "}
                {route.params.username}
            </Text>
            <ScrollView>
                {texts.map((txt, i) => (
                    <Message
                        isLast={i + 1 === texts.length}
                        createdAt={new Date(parseInt(txt.createdAt)).toString()}
                        msg={txt.msg}
                        msgId={txt.id}
                        type={txt.type}
                        key={txt.id}
                    />
                ))}
            </ScrollView>
            <MessageInput
                from={d?.me?.username ? d?.me?.username : ""}
                to={route.params.username}
            />
        </View>
    );
};

export default ChatScreen;
