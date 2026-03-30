import { Stack } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditProfile() {
  return (
    <>
      <Stack.Screen options={{ title: "Editar Perfil" }} />

      <View style={styles.container}>
        <Text>Nombre completo</Text>
        <TextInput style={styles.input} />

        <Text>Correo electrónico</Text>
        <TextInput style={styles.input} />

        <Text>Teléfono</Text>
        <TextInput style={styles.input} />

        <TouchableOpacity style={styles.boton}>
          <Text style={{ color: "#FFF" }}>Guardar Cambios</Text>
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