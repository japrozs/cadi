import React from "react";
import { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { useGetUsersQuery, useMeQuery } from "../../generated/graphql";
import { colors, layout } from "../../ui/theme";
import UserCard from "../../ui/UserCard";
import { searchUser } from "../../utils/searchUser";
import { MainStackNav } from "./MainNav";

interface SearchProps {}

export const Search: React.FC<MainStackNav<"Search">> = ({ navigation }) => {
    const { data: d } = useMeQuery();
    const [searchQuery, setSearchQuery] = useState("");
    const { data, loading } = useGetUsersQuery();
    return (
        <View style={styles.view}>
            <TextInput
                value={searchQuery}
                style={[styles.input]}
                onChangeText={(sq) => setSearchQuery(sq)}
                placeholder="Search"
            />
            {data !== undefined && searchQuery.trim().length !== 0 ? (
                searchUser(searchQuery, data)?.map((user) => (
                    <>
                        {user.username !== d?.me?.username && (
                            <UserCard
                                description={user.description}
                                imgUrl={user.imgUrl}
                                username={user.username}
                                key={user.id}
                                navigation={navigation}
                            />
                        )}
                    </>
                ))
            ) : (
                <View></View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        zIndex: 100,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.blackLight,
        width: "100%",
        padding: layout.padding,
    },
    input: {
        color: "#fff",
        fontSize: 15,
        width: "100%",
    },
});
