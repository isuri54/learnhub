import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

type Group = {
  _id: string;
  name: string;
  lastActivity?: string;
};

const GroupsScreen = () => {
    const [ groups, setGroups ] = useState<Group[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const res = await axios.get("http://10.0.2.2:5000/api/groups?userId=USER_ID");
            setGroups(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateGroup = () => {
        router.push("/");
    };

    const renderGroup = ({ item }: { item: Group }) => (
        <TouchableOpacity style={styles.groupCard}>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text style={styles.groupLastAct}>{item.lastActivity || "No activity yet"}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Groups</Text>

            <FlatList
                data = {groups}
                keyExtractor={(item) => item._id}
                renderItem={renderGroup}
                ListEmptyComponent={<Text style={styles.emptyText}>No groups found</Text>}
            />

            <TouchableOpacity style={styles.createBtn} onPress={handleCreateGroup}>
                <Text style={styles.createBtnText}>Create Group</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20, 
    backgroundColor: "#fff"     
  },
  header: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 10 
  },
  createBtn: {
    backgroundColor: "#1E3A8A",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  createBtnText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  groupCard: {
    padding: 15,
    backgroundColor: "#F1F5F9",
    marginBottom: 10,
    borderRadius: 12,
  },
  groupName: { 
    fontSize: 18, 
    fontWeight: "600" 
  },
  groupLastAct: { 
    fontSize: 14, 
    color: "#555" 
  },
  emptyText: { 
    textAlign: "center", 
    color: "#888", 
    marginTop: 20 
  },
});

export default GroupsScreen;