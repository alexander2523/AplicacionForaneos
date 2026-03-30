import { uploadImageCloudinary } from "@/services/cloudinary";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export default function AddRoom() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState<string[]>([]);

  const [marker, setMarker] = useState({
    latitude: 20.5,
    longitude: -100.8,
  });

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) return;

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!resultado.canceled) {
      const nuevas = resultado.assets.map(img => img.uri);
      setImagenes(prev => [...prev, ...nuevas]);
    }
  };

  const seleccionarUbicacion = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
  };

  const handleCreate = async () => {
    try {
      if (!titulo || !precio || !descripcion) {
        alert("Completa todos los campos");
        return;
      }

      if (imagenes.length === 0) {
        alert("Agrega al menos una imagen");
        return;
      }

      const urls: string[] = [];

      for (const img of imagenes) {
      console.log("SUBIENDO IMG:", img);
        const url = await uploadImageCloudinary(img);
        urls.push(url);
      }

      await addDoc(collection(db, "cuartos"), {
        titulo,
        precio,
        descripcion,
        imagenes: urls,
        lat: marker.latitude,
        lng: marker.longitude,
        userId: auth.currentUser?.uid,
        createdAt: Date.now()
      });

      alert("Cuarto creado");

      router.back(); // 👈 regresa a home

    }  catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Agregar Cuarto</Text>

      <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
      <TextInput style={styles.input} placeholder="Precio" value={precio} onChangeText={setPrecio} />
      <TextInput style={styles.input} placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} />

      <Text style={{ marginBottom: 10 }}>Selecciona ubicación:</Text>

      <MapView
        style={styles.mapa}
        initialRegion={{
          latitude: 20.5,
          longitude: -100.8,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={seleccionarUbicacion}
      >
        <Marker coordinate={marker} />
      </MapView>

      <TouchableOpacity style={styles.boton} onPress={seleccionarImagen}>
        <Text style={styles.botonTexto}>Seleccionar Imágenes</Text>
      </TouchableOpacity>

      <ScrollView horizontal>
        {imagenes.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.preview} />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.boton} onPress={handleCreate}>
        <Text style={styles.botonTexto}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#EEF2F6" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },

  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#FFF",
  },

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
    marginBottom: 10,
  },

  botonTexto: { color: "#FFF", fontWeight: "bold" },

  preview: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
});