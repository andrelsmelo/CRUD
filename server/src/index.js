require('dotenv/config');
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'treinaweb',
    database: process.env.DB_NAME || 'crud',
})

const app = express();

app.use(cors());
app.use(express.json());

app.post("/user", (req, res)=> {
    const { name, description, apelido, cpf, endereco, genero, telefone, avatar } = req.body;

    let SQL = "INSERT INTO user ( name, description, apelido, cpf, endereco, genero, telefone, avatar ) VALUES ( ?,?,?,?,?,?,? )";

    db.query(SQL, [ name, description, apelido, cpf, endereco, genero, telefone, avatar], (err, result) => {
       if(err) {
            console.log(err);
            return res.status(400).json({ message: 'Erro ao listar um usuario'});
       }
       else res.send(result);
   });
});

app.get("/users", (req, res) => {
    
    let SQL = "SELECT * from user";

    db.query(SQL, (err, result) => {
        if(err) {
            console.log(err);
            return res.status(400).json({ message: 'Erro ao listar usuario'});
        }
        else res.send(result);
    });
});

app.put("/user/:user_id", (req, res) => {
    const { user_id } = req.body;
    const { name, description, apelido, cpf, endereco, genero, telefone, avatar } = req.body;

    let SQL = "UPDATE user SET name = ?, description = ? , apelido = ? , cpf = ? , endereco = ? , genero = ? , telefone = ?, updatedAt = ?, avatar = ? WHERE user_id = ?";

    db.query(SQL, [name, description, apelido, cpf, endereco, genero, telefone,new Date(), avatar, user_id], (err, result) => {
        if(err) {
            console.log(err);
            return res.status(400).json({ message: 'Erro ao atualzar usuario'});
        }
        else res.send(result);
    })
})

app.delete("/user/:user_id", (req,res) => {
    const { user_id } = req.params;

    let SQL = "DELETE FROM user where user_id = ?";

    db.query(SQL, [user_id], (err, result) => {
        if(err) {
            console.log(err);
            return res.status(400).json({ message: 'Erro ao deletar usuario'});
        }
        else res.send(result);
    });
});

app.listen(3001, () => {
    console.log("server rodando");
});



