import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync("usuarios.db");

export const crearTabla = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS cuartos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      precio TEXT,
      descripcion TEXT,
      imagenes TEXT,
      lat REAL,
      lng REAL
    );
  `);
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      correo TEXT,
      password TEXT
    );
  `);
  try { await db.execAsync(`ALTER TABLE cuartos ADD COLUMN descripcion TEXT;`); } catch (e) {}
  try { await db.execAsync(`ALTER TABLE cuartos ADD COLUMN imagenes TEXT;`); } catch (e) {}
  try { await db.execAsync(`ALTER TABLE cuartos ADD COLUMN lat REAL;`); } catch (e) {}
  try { await db.execAsync(`ALTER TABLE cuartos ADD COLUMN lng REAL;`); } catch (e) {}
};

export const insertarCuarto = async (titulo, precio, descripcion, imagenes, lat, lng) => {
  await db.runAsync(
    "INSERT INTO cuartos (titulo, precio, descripcion, imagenes, lat, lng) VALUES (?, ?, ?, ?, ?, ?);",
    [titulo, precio, descripcion, JSON.stringify(imagenes), lat, lng]
  );
};

export const insertarUsuario = async (correo, password) => {
  try {
    await db.runAsync(
      "INSERT INTO usuarios (correo, password) VALUES (?, ?);",
      [correo, password]
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const obtenerCuartos = async () => {
  try {
    const result = await db.getAllAsync("SELECT * FROM cuartos;");
    return result.map(item => ({
      ...item,
      imagenes: item.imagenes ? JSON.parse(item.imagenes) : []
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const validarUsuario = async (correo, password) => {
  const result = await db.getAllAsync(
    "SELECT * FROM usuarios WHERE correo = ? AND password = ?;",
    [correo, password]
  );

  return result.length > 0;
};  