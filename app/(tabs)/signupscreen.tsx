import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Link, router, useRouter } from "expo-router";

export default function SignupScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");    
    const [confirmPassword, setConfirmPassword] = useState("");    
    const [school, setSchool] = useState("");
    const [subject, setSubject] = useState("");
    const [error, setError] =useState("");

    const router = useRouter();

    const handleSignup = async () => {
        console.log("handleSignup called");

        console.log("State values:", { email, password, school, subject });

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!name.trim() || !email.trim() || !password.trim() || !school.trim() || !subject.trim()) {
            setError("All fields are required");
            return;
        }

        const userData = { name, email, password, subject }

        try {
            const response = await fetch("http://192.168.1.100:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            console.log("Response status:", response.status);
            console.log("Response data:", await response.json());
            const data = await response.json();

            if (!response.ok) {
                setError(data.msg || "Signup failed");
                return;
            }

            console.log("Signup successfull", data);
            router.push("/loginscreen");

        } catch (err) {
            console.error(err);
        }
    }

    return(
        <View style={styles.container}>
            <Image source={require("../../assets/images/logo.png")} style={styles.image}></Image>
            
            <Text style={styles.logo}>TEACHERS CONNECT</Text>
            <Text style={styles.tagline}>Where Teachers Share & Grow</Text>

            {error && <Text style={styles.error}>{error}</Text>} {/* Display errors */}

            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName}/>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}/>
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
            <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry/>
            <TextInput style={styles.input} placeholder="School" value={school} onChangeText={setSchool}/>
            <TextInput style={styles.input} placeholder="Subject" value={subject} onChangeText={setSubject}/>

            <TouchableOpacity style={styles.signupBtn} onPress={() => console.log("Touch detected")}>
                <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
            
            <Link href={"/loginscreen"}>
                <TouchableOpacity>
                    <Text style={styles.switchText}>
                        Already have an account? <Text style={styles.link}>Login</Text>
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
    },
    error: {
        color: "red",
        marginBottom: 10
    }
});