import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API_BASE_URL } from "@env";

type Post = {
    _id: string;
    author: string;
    content: string;
    likes: number;
    comments: number;
};

export default function HomeScreen() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState("");

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/posts`)
        .then(res => res.json())
        .then(data => setPosts(data))
        .catch(err => console.error("Error fetching posts:", err));
    }, []);

    const handlePost = async () => {
        if (!newPost.trim()) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/posts`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ author: "Rosco", content: newPost })
            });
            const data = await res.json();
            setPosts([data, ...posts]);
            setNewPost("");
        } catch (err) {
            console.error("Error posting:", err);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.newPostBox}>
                <TextInput
                style={styles.input}
                placeholder="Share something with your fellow teachers..."
                value={newPost}
                onChangeText={setNewPost}
                />
                <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
                    <Ionicons name="send" size={20} color="white"/>
                </TouchableOpacity>
            </View>

            <FlatList
                data={posts}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <View style={styles.postCard}>
                        <Text style={styles.author}>{item.author}</Text>
                        <Text style={styles.content}>{item.content}</Text>
                        <View style={styles.actions}>
                            <Text>❤️ {item.likes}</Text>
                            <Text>💬 {item.comments}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  newPostBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
  postBtn: {
    marginLeft: 10,
    backgroundColor: "#FF8C00",
    padding: 10,
    borderRadius: 50,
  },
  postCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  author: { fontWeight: "bold", marginBottom: 5 },
  content: { marginBottom: 10 },
  actions: { flexDirection: "row", justifyContent: "space-between" },
});