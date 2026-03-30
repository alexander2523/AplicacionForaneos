import AsyncStorage from "@react-native-async-storage/async-storage";


export const obtenerSesion = async () => {
  const data = await AsyncStorage.getItem("usuario");
  return data ? JSON.parse(data) : null;
};

export const cerrarSesion = async () => {
  await AsyncStorage.removeItem("usuario");
};