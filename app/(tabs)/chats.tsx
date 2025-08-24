import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import io from "socket.io-client";
import Constants from 'expo-constants';

type Message = {
    _id: string;
    sender: string;
    receiver: string;
    text: string;
    timestamp: string;
};

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL ?? 'http://192.168.1.100:5000';
const socket = io(API_BASE_URL);

export default function ChatScreen() {
    const { receiverId } = useLocalSearchParams<{ receiverId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState("");
    const [userName, setUserName] = useState("Unknown User");
    const flatListRef = useRef<FlatList>(null);
    const router = useRouter();
    const userId = "currentUserId";

    useEffect(() => {
        if (!receiverId) {
            setError("No receiver selected");
            return;
        }

        fetch(`${API_BASE_URL}/api/messages/${userId}/${receiverId}`)
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => {
                console.error("Error fetching messages:", err);
                setError("Failed to load messages");
            });

        socket.on("newMessage", (msg: Message) => {
            if ((msg.sender === userId && msg.receiver === receiverId) || (msg.sender === receiverId && msg.receiver === userId)) {
                setMessages(prev => [...prev, msg]);
                flatListRef.current?.scrollToEnd({ animated: true });
            }
        });

        return () => {
            socket.off("newMessage");
        };
    }, [receiverId, userId]);

    const sendMessage = () => {
        if (!newMessage.trim()) {
            setError("Message cannot be empty");
            return;
        }

        const messageData = {
            sender: userId,
            receiver: receiverId,
            text: newMessage,
            timestamp: new Date().toISOString(),
        };

        socket.emit("sendMessage", messageData);
        setNewMessage("");
        setError("");
    };

    const renderMessage = ({ item }: { item: Message }) => {
        const isSentByCurrentUser = item.sender === userId;
        return (
            <View style={[styles.messageContainer, isSentByCurrentUser ? styles.sentMessage : styles.receivedMessage]}>
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.messageTime}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            {error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>{userName}</Text>
                    </View>
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        keyExtractor={(item) => item._id}
                        renderItem={renderMessage}
                        inverted
                        style={styles.messageList}
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.messageInput}
                            value={newMessage}
                            onChangeText={setNewMessage}
                            placeholder="Type a message..."
                        />
                        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                            <Ionicons name="send" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 10 },
    messageList: { flex: 1, padding: 10 },
    messageContainer: {
        maxWidth: "70%",
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
    },
    sentMessage: {
        backgroundColor: "#DCF8C6",
        alignSelf: "flex-end",
    },
    receivedMessage: {
        backgroundColor: "#E8E8E8",
        alignSelf: "flex-start",
    },
    messageText: { fontSize: 16 },
    messageTime: { fontSize: 12, color: "gray", textAlign: "right" },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    messageInput: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: "#FF8C00",
        padding: 10,
        borderRadius: 20,
        justifyContent: "center",
    },
    error: { textAlign: "center", color: "red", padding: 10 },
});