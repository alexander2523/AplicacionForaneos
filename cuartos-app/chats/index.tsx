import { useRouter } from "expo-router";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { auth, db } from "../firebase/config";

type Chat = {
  id: string;
  users: string[];
  roomId: string;
};

export default function Chats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "chats"),
      where("users", "array-contains", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Chat, "id">),
      }));

      setChats(data);
    });

    return unsubscribe;
  }, []);

  const renderItem = ({ item }: { item: Chat }) => {
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() =>
          router.push(`../chat/${item.roomId}`)
        }
      >
        <Text style={styles.title}>Conversación</Text>
        <Text style={styles.subtitle}>Ir al chat</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No tienes conversaciones
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF2F6",
    padding: 10,
  },

  chatItem: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
  },

  subtitle: {
    color: "#666",
    marginTop: 5,
  },
});