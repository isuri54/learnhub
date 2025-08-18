import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Link, router } from "expo-router";

export default function SignupScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");    
    const [confirmPassword, setConfirmPassword] = useState("");    
    const [school, setSchool] = useState("");
    const [subject, setSubject] = useState("");

    const handleSignup = () => {
        console.log("Signup with", email, password, school, subject);
    };

    return(
        <View style={styles.container}>
            <Image source={require("../../assets/images/logo.png")} style={styles.image}></Image>
            
            <Text style={styles.logo}>TEACHERS CONNECT</Text>
            <Text style={styles.tagline}>Where Teachers Share & Grow</Text>
        
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}/>
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
            <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry/>
            <TextInput style={styles.input} placeholder="School" value={school} onChangeText={setSchool}/>
            <TextInput style={styles.input} placeholder="Subject" value={subject} onChangeText={setSubject}/>

            <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
                <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
            
            <Link href="/loginscreen" asChild>
                <TouchableOpacity>
                    <Text style={styles.switchText}>
                        Already have an account? <Text style={styles.link}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </Link>
        
        </View>
    );
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
    signupBtn: {
        backgroundColor: "#FF8C00",
        padding: 15,
        borderRadius: 8,
        width: "100%",
        alignItems: "center"
    },
    signupText: {
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