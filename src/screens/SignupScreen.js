// import * as React from "react";
// import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaViewBase, TextInput, Alert } from "react-native";
import bcrypt from "bcryptjs";

export default function App({ navigation, setIsSignedIn }) {
    const [signupData, setSignupData] = useState({
        username: "",
        password: "",
    });

    const handleUsernameChange = (data) => {
        setSignupData({ ...signupData, username: data });
    };

    const handlePasswordChange = (data) => {
        setSignupData({ ...signupData, password: data });
    };

    const handleSignup = async () => {
        if (!signupData.username || !signupData.password) {
            console.log("complete ur data");
            return;
        }
        if (signupData.username.length < 6) {
            console.log("username must be six characters or bigger");
            return;
        }
        if (signupData.password.length < 6) {
            console.log("password must be six characters or bigger");
            return;
        }
        const usernameExist = JSON.parse(await AsyncStorage.getItem(signupData.username));
        if (usernameExist) {
            console.log("this user already exists");
        } else {
            const hash = bcrypt.hashSync(signupData.password, 12);
            await AsyncStorage.setItem(signupData.username, JSON.stringify(hash));
            AsyncStorage.setItem(
                "loggedinUser",
                JSON.stringify({
                    name: signupData.username,
                    cart: [],
                })
            );
            setIsSignedIn(true);
            // navigation.navigate("Home");
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 10 }}>
                <Text htmlFor="username">Username</Text>
                <TextInput
                    style={styles.input}
                    id="username"
                    type="text"
                    onChangeText={(value) => handleUsernameChange(value)}
                />
            </View>
            <View style={{ marginTop: 10 }}>
                <Text htmlFor="password">Password</Text>
                <TextInput
                    style={styles.input}
                    id="password"
                    type="password"
                    onChangeText={(value) => handlePasswordChange(value)}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => handleSignup()}>
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        justifyContent: "center",
        width: "50%",
        alignSelf: "center",
        height: 50,
    },
    input: {
        borderRadius: 5,
        borderWidth: 5,
    },
    button: {
        backgroundColor: "#000",
        // width: "50%",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
        paddingVertical: 5,
    },
    buttonText: {
        color: "#fff",
    },
});
