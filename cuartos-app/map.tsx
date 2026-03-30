import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { db } from "./firebase/config";

export default function MapaScreen() {
  const [cuartos, setCuartos] = useState<any[]>([]);

  useEffect(() => {
    const fetchCuartos = async () => {
      const snapshot = await getDocs(collection(db, "cuartos"));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data())
      }));
      setCuartos(data);
    };

    fetchCuartos();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 19.4326,
          longitude: -99.1332,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {cuartos.map((c) => (
          <Marker
            key={c.id}
            coordinate={{ latitude: c.lat, longitude: c.lng }}
            title={c.titulo}
            description={c.precio}
          />
        ))}
      </MapView>
    </View>
  );
}