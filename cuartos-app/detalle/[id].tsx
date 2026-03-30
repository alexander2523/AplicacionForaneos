import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { db } from "../firebase/config";

const { width } = Dimensions.get("window");

type Cuarto = {
  id: string;
  titulo: string;
  precio: string;
  descripcion: string;
  imagenes: string[];
  lat: number;
  lng: number;
  userId?: string;
};

export default function Detalle() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [cuarto, setCuarto] = useState<Cuarto | null>(null);

  const getCuarto = async () => {
    try {
      const ref = doc(db, "cuartos", id as string);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setCuarto({
          id: snap.id,
          ...(snap.data() as Omit<Cuarto, "id">),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) getCuarto();
  }, [id]);

  if (!cuarto) {
    return (
      <View style={styles.center}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {/* 🖼️ Carrusel */}
      <FlatList
        data={cuarto.imagenes}
        horizontal
        pagingEnabled
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.content}>
        <Text style={styles.titulo}>{cuarto.titulo}</Text>
        <Text style={styles.precio}>${cuarto.precio}</Text>

        <Text style={styles.descripcion}>{cuarto.descripcion}</Text>

        {/* 🗺️ Mapa */}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: cuarto.lat,
            longitude: cuarto.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: cuarto.lat,
              longitude: cuarto.lng,
            }}
          />
        </MapView>

        {/* 💬 Botón */}
        <TouchableOpacity
  style={styles.boton}
  onPress={() =>
    router.push({
      pathname: "../chat/[id]",
      params: { id: id as string },
    })
  }
>
  <Text style={styles.botonTexto}>Contactar</Text>
</TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: width,
    height: 250,
  },

  content: {
    padding: 15,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
  },

  precio: {
    fontSize: 18,
    color: "#2E5EAA",
    marginVertical: 5,
  },

  descripcion: {
    fontSize: 14,
    color: "#555",
    marginVertical: 10,
  },

  map: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },

  boton: {
    backgroundColor: "#2E5EAA",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  botonTexto: {
    color: "#FFF",
    fontWeight: "bold",
  },
});