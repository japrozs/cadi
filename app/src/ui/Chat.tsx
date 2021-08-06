import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
    Text,
    Image,
    StyleSheet,
    View,
    Alert,
    TouchableOpacity,
} from "react-native";
import { MainStackParamList } from "../modules/Main/MainNav";
import { timeSince } from "../utils/timeSince";
import { colors } from "./theme";

interface ChatProps {
    username: string;
    imgUrl: string;
    createdAt: string;
    description: string;
    navigation: StackNavigationProp<MainStackParamList, "Main">;
}

const Chat: React.FC<ChatProps> = ({
    description,
    username,
    navigation,
    imgUrl,
    createdAt,
    ...props
}) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("ChatScreen", {
                    username,
                });
            }}
        >
            <View style={styles.view} {...props}>
                <Image
                    style={styles.img}
                    source={{
                        uri: imgUrl,
                    }}
                />
                <View style={styles.user}>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                <Text style={styles.time}>{timeSince(createdAt)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    view: {
        backgroundColor: colors.blackLight,
        padding: 12,
        display: "flex",
        borderBottomColor: colors.borderBlack,
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 999,
    },
    user: {
        paddingLeft: 17,
    },
    username: {
        color: colors.white,
        fontSize: 17,
        fontFamily: "Inter",
        fontWeight: "500",
    },
    description: {
        color: colors.grayLight,
        fontSize: 15,
        fontFamily: "Inter",
        marginTop: 2,
    },
    time: {
        color: colors.grayLight,
        marginLeft: "auto",
        marginRight: 10,
        fontSize: 14,
        fontWeight: "500",
    },
});
export default Chat;
