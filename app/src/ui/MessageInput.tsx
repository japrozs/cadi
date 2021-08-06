import React, { useState } from "react";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { colors, layout } from "./theme";
import { Ionicons } from "@expo/vector-icons";
import { useCreateMessageMutation } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";

interface MessageInputProps {
    from: string;
    to: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({ from, to }) => {
    const [text, setText] = useState("");
    const [createMessage, { loading }] = useCreateMessageMutation();
    const apolloClient = useApolloClient();

    const handleSubmit = async () => {
        const res = await createMessage({
            variables: {
                from,
                to,
                msg: text,
            },
        });

        if (res.data?.createMessage == false) {
            // show an error or something
            return;
        }
        setText("");
        await apolloClient.resetStore();
    };
    return (
        <View style={styles.view}>
            <TextInput
                value={text}
                style={[styles.input]}
                onChangeText={(msg) => setText(msg)}
                placeholder="Send message..."
            />
            <Ionicons
                name="ios-send"
                size={21}
                style={styles.icon}
                onPress={handleSubmit}
                color={text.trim().length == 0 ? colors.grayLight : "#fff"}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        zIndex: 100,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "row",
        backgroundColor: colors.blackLight,
        width: "100%",
        padding: layout.padding,
    },
    input: {
        color: "#fff",
        fontSize: 15,
        width: "87%",
    },
    icon: {
        marginLeft: "auto",
        marginRight: 20,
    },
});
