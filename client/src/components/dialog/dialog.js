import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import produce from "immer";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.user_id,
    name: props.name,
    description: props.description,
    apelido: props.apelido,
    cpf: props.cpf,
    endereco: props.endereco,
    genero: props.genero,
    telefone: props.telefone,
  });

  const handleChangeValues = (value) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [value.target.id]: value.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditUser = () => {
    Axios.put("http://localhost:3001/edit", {
      id: editValues.user_id,
      name: editValues.name,
      description: editValues.description,
      apelido: editValues.apelido,
      cpf: editValues.cpf,
      endereco: editValues.endereco,
      genero: editValues.genero,
      telefone: editValues.telefone,
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.id == editValues.user_id
            ? {
                id: editValues.user_id,
                name: editValues.name,
                description: editValues.description,
                apelido: editValues.apelido,
                cpf: editValues.cpf,
                endereco: editValues.endereco,
                genero: editValues.genero,
                telefone: editValues.telefone,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeleteUser = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.user_id}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.id != editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="user_id"
            label="id"
            defaultValue={props.id}
            type="number"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            defaultValue={props.name}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Descrição"
            defaultValue={props.description}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="apelido"
            label="Apelido"
            defaultValue={props.apelido}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="cpf"
            label="CPF"
            defaultValue={props.cpf}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="endereco"
            label="Endereço"
            defaultValue={props.endereco}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="genero"
            label="Genero"
            defaultValue={props.genero}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus 
            margin="dense"
            id="telefone"
            label="Telefone"
            defaultValue={props.telefone}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteUser()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditUser()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}