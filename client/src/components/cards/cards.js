import React from "react";
import "./card.css";
import FormDialog from "../dialog/dialog";

export default function Card(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickCard = () => {
        setOpen(true);
    };

    return (
    <>
        <FormDialog
            open={open}
            setOpen={setOpen}
            id={props.id}
            name={props.name}
            description={props.description}
            apelido={props.apelido}
            cpf={props.cpf}
            endereco={props.endereco}
            genero={props.genero}
            telefone={props.telefone}
            listCard={props.listCard}
            setListCard={props.setListCard}
        />
        <div className="card--container" onClick={() =>
        handleClickCard()}>
            <h1 className="card--title">{props.name}</h1>
            <p className="card--description">{props.description}</p>
            <p className="card--apelido">{props.apelido}</p>
            <p className="card--cpf">{props.cpf}</p>
            <p className="card--endereco">{props.endereco}</p>
            <p className="card--genero">{props.genero}</p>
            <p className="card--telefone">{props.telefone}</p>
        </div>
    </>
    );
};