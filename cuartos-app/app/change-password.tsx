import { Stack } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ChangePassword() {
  return (
    <>
      <Stack.Screen options={{ title: "Cambiar Contraseña" }} />

      <View style={styles.container}>
        <Text>Contraseña actual</Text>
        <TextInput style={styles.input} secureTextEntry />

        <Text>Nueva contraseña</Text>
        <TextInput style={styles.input} secureTextEntry />

        <Text>Confirmar contraseña</Text>
        <TextInput style={styles.input} secureTextEntry />

        <TouchableOpacity style={styles.boton}>
          <Text style={{ color: "#FFF" }}>Guardar contraseña</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
  },
  boton: {
    backgroundColor: "#2E5EAA",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});