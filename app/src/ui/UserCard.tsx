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
    description: string;
    navigation: StackNavigationProp<MainStackParamList, "Search">;
}

const UserCard: React.FC<ChatProps> = ({
    description,
    username,
    navigation,
    imgUrl,
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
});
export default UserCard;
