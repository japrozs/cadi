import { useApolloClient } from "@apollo/client";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Pressable, View } from "react-native";
import { Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useRegisterMutation } from "../../generated/graphql";
import { colors } from "../../ui/theme";
import { errorToMap } from "../../utils/errorToMap";
import { isEmpty } from "../../utils/isEmpty";
import { AuthStackNav } from "./AuthNav";

interface ErrorProps {
    username?: string;
    email?: string;
    password?: string;
}

export const Register: React.FC<AuthStackNav<"Register">> = ({
    navigation,
}) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<ErrorProps>({});
    const [register, { loading }] = useRegisterMutation();
    const apolloClient = useApolloClient();

    const handleSubmit = async () => {
        const res = await register({
            variables: {
                options: {
                    email,
                    username,
                    password,
                },
            },
        });
        if (res.data?.register.errors) {
            return setErrors(errorToMap(res.data?.register.errors));
        }

        navigation.navigate("Login");
        await apolloClient.resetStore();
    };

    return (
        <View style={styles.view}>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={[
                    styles.input,
                    {
                        borderColor: errors.hasOwnProperty("username")
                            ? colors.errorRed
                            : colors.grayLight,
                    },
                ]}
                placeholder="Username"
                value={username}
                onChangeText={(t) => setUsername(t)}
            />
            {errors.hasOwnProperty("username") ? (
                <Text style={styles.error}>{errors.username}</Text>
            ) : (
                <></>
            )}
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={[
                    styles.input,
                    {
                        borderColor: errors.hasOwnProperty("email")
                            ? colors.errorRed
                            : colors.grayLight,
                    },
                ]}
                placeholder="Email"
                value={email}
                onChangeText={(t) => setEmail(t)}
            />
            {errors.hasOwnProperty("email") ? (
                <Text style={styles.error}>{errors.email}</Text>
            ) : (
                <></>
            )}
            <Text style={styles.label}>Password</Text>
            <TextInput
                secureTextEntry={true}
                style={[
                    styles.input,
                    {
                        borderColor: errors.hasOwnProperty("password")
                            ? colors.errorRed
                            : colors.grayLight,
                    },
                ]}
                placeholder="Password"
                value={password}
                onChangeText={(t) => setPassword(t)}
            />
            {errors.hasOwnProperty("password") ? (
                <Text style={styles.error}>{errors.password}</Text>
            ) : (
                <></>
            )}
            <Pressable
                onPressIn={handleSubmit}
                style={styles.button}
                onPress={() => handleSubmit}
                disabled={loading || isEmpty(email, username, password)}
            >
                <Text
                    style={{
                        color: colors.white,
                        fontWeight: "600",
                        fontSize: 17,
                    }}
                >
                    Sign up
                </Text>
            </Pressable>
            <Text style={styles.create}>
                Already have an account ?{" "}
                <Text
                    onPress={() => {
                        navigation.navigate("Login");
                    }}
                    style={{ color: colors.white, fontWeight: "500" }}
                >
                    Log In
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 11,
        fontSize: 16,
        borderRadius: 5,
        width: 350,
        marginVertical: 7,
        color: colors.white,
        fontWeight: "500",
    },
    label: {
        color: colors.white,
        fontSize: 17,
        fontWeight: "500",
        marginTop: 10,
    },
    view: {
        alignSelf: "center",
        padding: 20,
    },
    button: {
        padding: 10,
        marginTop: 20,
        backgroundColor: colors.grayDark,
        borderRadius: 5,
        textAlign: "center",
    },
    error: {
        color: colors.errorRed,
    },
    create: {
        color: colors.grayLight,
        marginTop: 18,
        fontSize: 15,
    },
});
