export const uploadImageCloudinary = async (uri: string) => {
  const data = new FormData();
  console.log("ENTRANDO A CLOUDINARY");

  data.append("file", {
    uri: uri,
    type: "image/jpeg",
    name: "photo.jpg",
    } as any);

  data.append("upload_preset", "cuartos_app"); // 👈 ESTE ES EL CLAVE

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/diqqxxskv/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const json = await res.json();

  console.log("RESPUESTA CLOUDINARY:", json);

  if (!json.secure_url) {
    throw new Error("Error subiendo imagen");
  }

  return json.secure_url;
};