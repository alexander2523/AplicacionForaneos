import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ChatScreen() {
  const { titulo } = useLocalSearchParams();

  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState<string[]>([]);

  const enviarMensaje = () => {
    if (!mensaje.trim()) return;

    setMensajes([...mensajes, mensaje]);
    setMensaje("");
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>Chat sobre: {titulo}</Text>

      <FlatList
        data={mensajes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.mensaje}>
            <Text>{item}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={mensaje}
          onChangeText={setMensaje}
        />

        <TouchableOpacity style={styles.boton} onPress={enviarMensaje}>
          <Text style={styles.botonTexto}>Enviar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF2F6",
    padding: 10,
  },

  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  mensaje: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },

  inputContainer: {
    flexDirection: "row",
    marginTop: 10,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFF",
  },

  boton: {
    backgroundColor: "#2E5EAA",
    padding: 10,
    borderRadius: 10,
    marginLeft: 5,
  },

  botonTexto: {
    color: "#FFF",
  },
});