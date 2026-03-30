import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { crearTabla } from "../../database/database";
import { auth } from "../../firebase/config";


export default function Index() {
   const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const router = useRouter();

  useEffect(() => {
    crearTabla();
  }, []);

  const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, correo, password);
    router.replace("/home");
  }catch (error: any) {
    console.log("ERROR FIREBASE:", error);
    alert(error.message);
  }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cuartos para Foráneos</Text>

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

      <TouchableOpacity style={styles.boton} onPress={login}>
        <Text style={styles.botonTexto}>Iniciar sesión</Text>
      </TouchableOpacity>

      <Text style={styles.mensaje}>{mensaje}</Text>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.link}>
          ¿No tienes cuenta? Regístrate
        </Text>
      </TouchableOpacity>
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
  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#2E5EAA",
    fontWeight: "bold",
  },
});