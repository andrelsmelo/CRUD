const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "treinaweb",
    database: "crud"
})

app.use(cors());
app.use(express.json());

app.post("/register", (req, res)=> {
    const { name } = req.body;
    const { description } = req.body;
    const { apelido } = req.body;
    const { cpf } = req.body;
    const { endereco } = req.body;
    const { genero } = req.body;
    const { telefone } = req.body;

    let SQL = "INSERT INTO user ( name, description, apelido, cpf, endereco, genero, telefone ) VALUES ( ?,?,?,?,?,?,? )";

    db.query(SQL, [ name, description, apelido, cpf, endereco, genero, telefone], (err, result) => {
       if(err) console.log(err);
       else res.send(result);
   });
});

app.get("/getUsers", (req, res) => {
    
    let SQL = "SELECT * from user";

    db.query(SQL, (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
});
//app.get('/', (req, res) =>{
//    
//    let SQL = "INSERT INTO user ( name, description, apelido, cpf, endereco, genero, telefone ) VALUES ('André Lucas Soares De Melo', '', 'Drezio', '10256000964', 'Tv Itarare 147', 'M', '41987815525' )";
//
//    db.query(SQL, (err, result)=> {
//        console.log(err);'      '
//    })
//});

app.put("/edit", (req, res) => {
    const { user_id } = req.body;
    const { name } = req.body;
    const { description } = req.body;
    const { apelido } = req.body;
    const { cpf } = req.body;
    const { endereco } = req.body;
    const { genero } = req.body;
    const { telefone } = req.body;

    let SQL = "UPDATE user SET name = ?, description = ? , apelido = ? , cpf = ? , endereco = ? , genero = ? , telefone = ?, updatedAt = ? WHERE user_id = ?";

    console.log(user_id);

    db.query(SQL, [name, description, apelido, cpf, endereco, genero, telefone,new Date(), user_id], (err, result) => {
        if(err) console.log(err)
        else res.send(result);
    })
})

app.delete("/delete/:user_id", (req,res) => {
    const { user_id } = req.params;

    let SQL = "DELETE FROM user where user_id = ?";

    db.query(SQL, [user_id], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});

app.listen(3001, () => {
    console.log("server rodando");
});



