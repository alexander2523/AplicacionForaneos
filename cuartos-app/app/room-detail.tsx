import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function RoomDetail() {
  const router = useRouter();

  const { titulo, precio, descripcion, imagenes, lat, lng } = useLocalSearchParams();

  const imgs = imagenes ? JSON.parse(imagenes as string) : [];

  return (
    <View style={styles.container}>
      
      <FlatList
        data={imgs}
        horizontal
        pagingEnabled
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.imagen} />
        )}
      />

      <View style={styles.info}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.precio}>{precio}</Text>
        <Text style={styles.descripcion}>{descripcion}</Text>

        <MapView
          style={styles.mapa}
          initialRegion={{
            latitude: Number(lat),
            longitude: Number(lng),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: Number(lat),
              longitude: Number(lng),
            }}
          />
        </MapView>

        <TouchableOpacity
          style={styles.boton}
          onPress={() =>
            router.push({
              pathname: "/chat",
              params: { titulo },
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
  container: { flex: 1, backgroundColor: "#EEF2F6" },

  imagen: { width: 350, height: 250, marginRight: 10 },

  info: { padding: 20 },

  titulo: { fontSize: 22, fontWeight: "bold" },
  precio: { fontSize: 18, color: "#2E5EAA" },
  descripcion: { marginVertical: 10 },

  mapa: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },

  boton: {
    backgroundColor: "#2E5EAA",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  botonTexto: { color: "#FFF" },
});