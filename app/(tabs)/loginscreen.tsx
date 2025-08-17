import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";


export default function LoginScreen ({navigation}:any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("Login with", email, password);
    };

    return(
        <View style={styles.container}>
            <Image source={require("../../assets/images/logo.png")} style={styles.image}></Image>

            <Text style={styles.logo}>TEACHERS CONNECT</Text>
            <Text style={styles.tagline}>Where Teachers Share & Grow</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value="email"
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value="password"
                onChangeText={setEmail}
                secureTextEntry
            />

            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.switchText}>
                    Don't have an account? <Text style={styles.link}>Sign Up</Text>
                </Text>
            </TouchableOpacity>

        </View>

    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff"
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: "contain"
    },
    logo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5
    },
    tagline: {
        fontSize: 14,
        color: "gray",
        marginBottom: 20
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 15
    },
    loginBtn: {
        backgroundColor: "#FF8C00",
        padding: 15,
        borderRadius: 8,
        width: "100%",
        alignItems: "center"
    },
    loginText: {
        color: "#fff",
        fontWeight: "bold"
    },
    switchText: {
        marginTop: 15,
        fontSize: 14
    },
    link: {
        color: "#FF8C00",
        fontWeight: "bold"
    }
});