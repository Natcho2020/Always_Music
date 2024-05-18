const { Pool } = require('pg');

const config = {

    database: process.env.DATABASE,
    host: process.env.HOST,
    user: process.env.USERDB,
    password: process.env.PASSWORD,
    port: process.env.PORT
}
const pool = new Pool(config)

//1. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.

const insertEstudiante = async () => {
    const text = 'INSERT INTO estudiantes (nombre, rut , curso , nivel) VALUES ($1, $2, $3,$4) RETURNING *';
    const value = [process.argv[3], process.argv[4], process.argv[5], Number(process.argv[6])]
    console.log("Estudiante " + value[1] + " agregado con éxito");
    const result = await pool.query(text, value);
}

//2. Crear una función asíncrona para obtener por consola el registro de un estudiante
//por medio de su rut. (2 puntos)

const selectEstudiante = async () => {
    const text = 'SELECT * FROM estudiantes WHERE rut = $1'
    const values = [process.argv[3]]
    const result = await pool.query(text, values)
    console.log(result.rows);
}
//3. Crear una función asíncrona para obtener por consola todos los estudiantes
//registrados. (2 puntos)
const selectEstudiantes = async () => {
    const text = 'SELECT * FROM estudiantes'
    const result = await pool.query(text)
    console.log(result.rows);
}
//4. Crear una función asíncrona para actualizar los datos de un estudiante en la base de
//datos. (2 puntos)

const updateEstudiante = async () => {

    const text = 'UPDATE estudiantes SET nombre = $2 , curso = $3 , nivel = $4 WHERE rut = $1'
    const value = [process.argv[4], process.argv[3], process.argv[5], process.argv[6]]
    const result = await pool.query(text, value)

    console.log("Estudiante " + value[1] + " editado con éxito");
}

//5. Crear una función asíncrona para eliminar el registro de un estudiante de la base de
//datos. (2 puntos)

const deleteEstudiante = async () => {

    const text = 'DELETE FROM estudiantes WHERE rut = $1'
    const value = [process.argv[3]]
    const result = await pool.query(text, value)

    console.log("Registro de Estudiante con rut " + value + " Eliminado con Exito ")
}

//Menu de comandos
const inpt = process.argv[2];
switch (inpt) {
    case 'nuevo':
        insertEstudiante();
        break;
    case 'rut':
        selectEstudiante()
        break;
    case 'consulta':
        selectEstudiantes()
        break;
    case 'editar':
        updateEstudiante();
        break;
    case 'eliminar':
        deleteEstudiante();
        break;
    default:
        break;
}
