import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Button,
    Pressable,
} from "react-native";
import { AuthStackNav } from "./AuthNav";
import { Formik } from "formik";
import { useLoginMutation } from "../../generated/graphql";
import { errorToMap } from "../../utils/errorToMap";
import { colors } from "../../ui/theme";
import { isEmpty } from "../../utils/isEmpty";
import { MainStackNav } from "../Main/MainNav";
import { useApolloClient } from "@apollo/client";

interface ErrorProps {
    usernameOrEmail?: string;
    password?: string;
}

const Login: React.FC<AuthStackNav<"Login">> = ({ navigation }) => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<ErrorProps>({});
    const [login, { loading }] = useLoginMutation();
    const apolloClient = useApolloClient();

    const handleSubmit = async () => {
        const response = await login({
            variables: {
                usernameOrEmail,
                password,
            },
        });
        if (response.data?.login.errors) {
            return setErrors(errorToMap(response.data?.login.errors));
        }
        await apolloClient.resetStore();
    };

    return (
        <View style={styles.view}>
            <Text style={styles.label}>Username</Text>
            <TextInput
                value={usernameOrEmail}
                onChangeText={(t) => setUsernameOrEmail(t)}
                style={[
                    styles.input,
                    {
                        borderColor: errors.hasOwnProperty("usernameOrEmail")
                            ? colors.errorRed
                            : colors.grayLight,
                    },
                ]}
                placeholder="Username or email"
            />
            {errors.hasOwnProperty("usernameOrEmail") ? (
                <Text style={styles.error}>{errors.usernameOrEmail}</Text>
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
                onPress={() => {}}
                disabled={loading || isEmpty(usernameOrEmail, password)}
            >
                <Text
                    style={{
                        color: colors.white,
                        fontWeight: "600",
                        fontSize: 17,
                    }}
                >
                    Log In
                </Text>
            </Pressable>
            <Text style={styles.create}>
                Don't have an account?{" "}
                <Text
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                    style={{ color: colors.white, fontWeight: "500" }}
                >
                    Create one
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

export default Login;
