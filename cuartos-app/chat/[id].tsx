import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase/config";

type Mensaje = {
  id: string;
  text: string;
  senderId: string;
};

export default function Chat() {
  const { id } = useLocalSearchParams(); // id del cuarto

  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Mensaje[]>([]);
  const [text, setText] = useState("");

  const user = auth.currentUser;

  // 🔥 crear o obtener chat
  const initChat = async () => {
    const roomRef = doc(db, "cuartos", id as string);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) return;

    const ownerId = roomSnap.data().userId;

    const newChatId = `${user?.uid}_${ownerId}_${id}`;

    await setDoc(doc(db, "chats", newChatId), {
      users: [user?.uid, ownerId],
      roomId: id,
      createdAt: serverTimestamp(),
    });

    setChatId(newChatId);
  };

  // 🔥 escuchar mensajes en tiempo real
  useEffect(() => {
    initChat();
  }, []);

  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Mensaje, "id">),
      }));

      setMessages(data);
    });

    return unsubscribe;
  }, [chatId]);

  // 🔥 enviar mensaje
  const sendMessage = async () => {
    if (!text.trim() || !chatId) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text,
      senderId: user?.uid,
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  const renderItem = ({ item }: { item: Mensaje }) => {
    const isMe = item.senderId === user?.uid;

    return (
      <View
        style={[
          styles.message,
          isMe ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <Text style={{ color: isMe ? "#FFF" : "#000" }}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Escribe un mensaje..."
        />

        <TouchableOpacity style={styles.boton} onPress={sendMessage}>
          <Text style={{ color: "#FFF" }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF2F6" },

  message: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: "70%",
  },

  myMessage: {
    backgroundColor: "#2E5EAA",
    alignSelf: "flex-end",
  },

  otherMessage: {
    backgroundColor: "#DDD",
    alignSelf: "flex-start",
  },

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#FFF",
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },

  boton: {
    backgroundColor: "#2E5EAA",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
});