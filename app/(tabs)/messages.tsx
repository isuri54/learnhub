import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import io from "socket.io-client";
import Constants from 'expo-constants';

type Message = {
    _id: string;
    sender: string;
    text: string;
    timestamp: string;
};

type User = {
    _id: string;
    name: string;
    avatar: string;
    lastMessage?: string;
    lastSeen?: string;
}

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL ?? 'http://192.168.1.100:5000';
const socket = io(API_BASE_URL);

export default function MessagesScreen() {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/users`)
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.error("Error fetching users:", err));

        socket.on("newMessage", (msg: Message) => {
            setUsers(prev =>
                prev.map(user =>
                    user._id === msg.sender
                    ? {...user, lastMessage: msg.text, lastSeen: new Date(msg.timestamp).toLocaleTimeString()}
                    : user
                )
            );
        });

        return () => {
            socket.off("newMessage");
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <Ionicons name="search" size={20} color="gray"/>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <FlatList
                data={users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.chatItem}>
                        <Image source={{uri: item.avatar}} style={styles.avatar}/>
                        <View style={{flex:1}}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.lastMessage}>{item.lastMessage || "No messages yet"}</Text>
                        </View>
                        <Text style={styles.time}>{item.lastSeen || ""}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchInput: { marginLeft: 10, flex: 1 },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  name: { fontWeight: "bold", fontSize: 16 },
  lastMessage: { color: "gray", fontSize: 14 },
  time: { color: "gray", fontSize: 12 },
});