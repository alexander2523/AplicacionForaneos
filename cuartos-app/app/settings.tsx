import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, Stack } from "expo-router";

export default function Settings() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: "Configuración" }} />

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.opcion}
          onPress={() => router.push("/edit-profile")}
        >
          <Text>Editar perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.opcion}
          onPress={() => router.push("/change-password")}
        >
          <Text>Cambiar contraseña</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.logout}>
          <Text style={{ color: "#FFF" }}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF2F6" },
  opcion: {
    backgroundColor: "#FFF",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#DDD",
  },
  logout: {
    backgroundColor: "red",
    padding: 15,
    marginTop: "auto",
    alignItems: "center",
  },
});