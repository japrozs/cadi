import React from "react";
import Modal from "react-native-modal";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { timeSince } from "../utils/timeSince";
import { colors, layout } from "./theme";
import { useState } from "react";

interface MessageProps {
    type: string;
    msg: string;
    msgId: number;
    createdAt: string;
    isLast: boolean;
}

export const Message: React.FC<MessageProps> = ({
    type,
    msg,
    msgId: key,
    createdAt,
    isLast,
}) => {
    const [isModalVisible, setisModalVisible] = useState(false);

    return (
        <TouchableOpacity
            onLongPress={
                type === "sent" ? () => setisModalVisible(true) : () => {}
            }
        >
            <View>
                <View
                    style={[
                        styles.viewStyles,
                        type === "sent"
                            ? styles.sentStyles
                            : styles.receivedStyles,
                    ]}
                >
                    <Text style={styles.msg}>{msg}</Text>
                </View>
                <Text
                    style={[
                        styles.time,
                        type === "sent"
                            ? styles.sentTimeStyles
                            : styles.receivedTimeStyles,
                    ]}
                >
                    {timeSince(createdAt)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    viewStyles: {
        display: "flex",
        backgroundColor: colors.blackLight,
        marginTop: 5,
        maxWidth:
            parseInt((Dimensions.get("window").width * 0.44).toString()) + "px",
        padding: layout.padding,
        borderRadius: layout.borderRadius,
    },
    sentStyles: {
        marginLeft: "auto",
        marginRight: layout.margin,
    },
    receivedStyles: {
        marginLeft: layout.margin,
    },

    msg: {
        color: "#fff",
        fontWeight: "500",
    },
    time: {
        color: colors.grayLight,
        marginTop: 10,
        marginBottom: 6,
    },
    sentTimeStyles: {
        marginLeft: "auto",
        marginRight: layout.margin,
    },
    receivedTimeStyles: {
        marginLeft: layout.margin + 10,
    },
});
