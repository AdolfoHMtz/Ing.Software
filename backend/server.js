const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "aperro"
}
)

app.post('/aperro', (req, res) => {
    console.log("Datos recibidos para registro:", req.body); // Verifica qué datos llegan al servidor
  
    const sql = "INSERT INTO usuarios (`name`, `edad`, `tipo_sangre`, `alergias`, `correo`, `contraseña`) VALUES (?, ?, ?, ?, ?, ?)";
    
    // Define la variable 'values' para los parámetros
    const values = [
        req.body.name,
        req.body.edad,
        req.body.tipo_sangre,
        req.body.alergias,
        req.body.correo,
        req.body.contraseña,
    ];

    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Error al registrar el usuario:", err); // Muestra errores en la consola del servidor
        return res.json({ message: "Error al registrar el usuario" });
      }
      return res.json(data);
    });
});



  app.post('/api/login', (req, res) => {
    console.log("Datos recibidos para login:", req.body); // Verifica qué datos llegan al servidor
  
    const sql = "SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?";;
    const values = [req.body.correo, req.body.contraseña];
  
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Error en el inicio de sesión:", err); // Muestra errores en la consola del servidor
        return res.status(500).json({ message: "Error al iniciar sesión" });
      }
      if (data.length > 0) {
        return res.status(200).json({ message: "Inicio de sesión exitoso", usuario: data[0] });
      } else {
        return res.status(401).json({ message: "Correo o contraseña incorrectos" });
      }
    });
  });


app.listen(8081,()=>{
console.log("listening");
}
)