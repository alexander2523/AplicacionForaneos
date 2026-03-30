import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../firebase/config";

type Cuarto = {
  id: string;
  titulo: string;
  precio: string;
  descripcion: string;
  imagenes: string[];
  lat: number;
  lng: number;
};

export default function Home() {
  const [cuartos, setCuartos] = useState<Cuarto[]>([]);
  const router = useRouter();

  const getCuartos = async () => {
    const snapshot = await getDocs(collection(db, "cuartos"));

    const data: Cuarto[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Cuarto, "id">)
    }));

    setCuartos(data);
  };

  useEffect(() => {
    getCuartos();
  }, []);

  const renderItem = ({ item }: { item: Cuarto }) => (
    <TouchableOpacity
  style={styles.card}
  onPress={() =>
    router.push({
      pathname: "../detalle/[id]",
      params: { id: item.id },
    })
  }
>
  <Image
    source={{ uri: item.imagenes[0] }}
    style={styles.image}
  />

  <View style={styles.info}>
    <Text style={styles.titulo}>{item.titulo}</Text>
    <Text style={styles.precio}>${item.precio}</Text>
  </View>
</TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cuartos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
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

  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 180,
  },

  info: {
    padding: 10,
  },

  titulo: {
    fontSize: 16,
    fontWeight: "bold",
  },

  precio: {
    fontSize: 14,
    color: "#2E5EAA",
    marginTop: 5,
  },
});