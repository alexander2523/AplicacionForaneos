import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase/config";

export default function RegisterScreen() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mensaje, setMensaje] = useState("");

  const registrar = async () => {
  try {
    await createUserWithEmailAndPassword(auth, correo, password);
    alert("Usuario registrado");
  } catch (error: any) {
    console.log("ERROR FIREBASE:", error);
    alert(error.message);
  }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crear cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirmar}
        onChangeText={setConfirmar}
      />

      <TouchableOpacity style={styles.boton} onPress={registrar}>
        <Text style={styles.botonTexto}>Registrarse</Text>
      </TouchableOpacity>

      <Text style={styles.mensaje}>{mensaje}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#EEF2F6",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#1C1C1C",
  },
  input: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  boton: {
    backgroundColor: "#2E5EAA",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  botonTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  mensaje: {
    marginTop: 15,
    textAlign: "center",
    color: "#C62828",
  },
});