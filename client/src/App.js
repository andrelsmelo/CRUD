import React, { useState, useEffect } from "react";
import './App.css';
import Axios from "axios";
import Card from "./components/cards/cards"; 

function App() {
  const [values, setValues] = useState();
  const [listUsers, setListUsers] = useState();

  console.log(listUsers);

  const handleChangeValues = (value) => {
    setValues(prevValue=>({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  }

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      description: values.description,
      apelido: values.apelido,
      cpf: values.cpf,
      endereco: values.endereco,
      genero: values.genero,
      telefone: values.telefone,
      avatar: values.avatar,
    }).then(()=> {
      setListUsers([
        ...listUsers,
        {
          name: values.name,
          description: values.description,
          apelido: values.apelido,
          cpf: values.cpf,
          endereco: values.endereco,
          genero: values.genero,
          telefone: values.telefone,
          avatar: values.avatar,
        }
      ]);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListUsers(response.data);
    });
  }, []);

  return (
    <div className="app--container">
      <div className="register--container">
        <h1 className="register--title">Usuarios</h1>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          className="register--input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          className="register--input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="apelido"
          placeholder="Apelido"
          className="register--input"
          onChange={handleChangeValues}
        />
        <input
          type="number"
          name="cpf"
          placeholder="CPF"
          className="register--input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          className="register--input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="genero"
          placeholder="Genero"
          className="register--input"
          onChange={handleChangeValues}
        />
        <input
          type="number"
          name="telefone"
          placeholder="Telefone"
          className="register--input"
          onChange={handleChangeValues}
        />
        <input
          type="file"
          name="avatar"
          placeholder="Avatar"
          className="register--input"
          onChange={handleChangeValues}
        />
        <button
          className="register--button"
          onClick={() => handleClickButton()}
          >
            Cadastrar
          </button>
      </div>
      {console.log(listUsers)}
      {typeof listUsers !== "undefined" &&
        listUsers.map((value) => {
          return (
          <Card
            key={value.user_id}
            listCard={listUsers}
            setListCard={setListUsers}
            user_id={value.user_id}
            name={value.name}
            cpf={value.cpf}
            endereco={value.endereco}
            telefone={value.telefone}
            description={value.description}
            apelido={value.apelido}
            genero={value.genero}
            avatar={value.avatar}
          ></Card>
          );
        })

      }
    </div>
  );
}

export default App;
