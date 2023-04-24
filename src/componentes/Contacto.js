import React, {useState} from 'react';
import styled from 'styled-components';
import db from './../firebase/firebase.config';
import { doc, updateDoc, deleteDoc  } from "firebase/firestore";

const Contacto = ({id, nombre, correo}) => {
    const [editTask, setEditTask] = useState(false);
    const [newName, setNewName] = useState(nombre);
    const [newEmail, setNewEmail] = useState(correo);


    const actualizarContacto = async(e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, 'contactos', id), {
                nombre: newName,
                correo: newEmail
            });
            setEditTask(false);
        } catch (error) {
            console.log(error);
        }
    }

    const borrarContacto = async() => {
        try {
            await deleteDoc(doc(db, 'contactos', id));
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <ContenedorContacto>
            {
                editTask ? 
                    <form action="" onSubmit={actualizarContacto}>
                        <Input 
                            type="text"
                            name="correo"
                            value={newName}
                            onChange={(e) => {setNewName(e.target.value)}}
                        />
                        <Input 
                            type="email"
                            name="correo"
                            value={newEmail}
                            onChange={(e) => {setNewEmail(e.target.value)}}
                        />

                        <Boton type="submit">Actualizar</Boton>
                    </form>
                :
                <>
                    <Nombre> {nombre} </Nombre>
                    <Correo> {correo} </Correo>
                    <Boton onClick={() => {setEditTask(!editTask)}}>Actualizar</Boton>
                    <Boton onClick={() => {borrarContacto()}}>Borrar</Boton>
                </>
            }
        </ContenedorContacto>
    );
}

const ContenedorContacto = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid rgba(0,0,0,.2);
`;

const Nombre = styled.p`
    font-weight: bold;
`;
 
const Correo = styled.p`
    font-style: italic;
    color: #6B6B6B;
    margin: 5px 0;
`;
 
const Boton = styled.button`
    padding: 5px 20px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    margin: 0px 2px;
    margin-bottom: 10px;
    transition: .3s ease all;
    outline: none;
    background: #C4C4C4;
    color: #fff;
    font-size: 12px;
 
    &:hover {
        background: #3D76E9;
    }
`;
 
const Input = styled.input`
    padding: 10px;
    border: 2px solid rgba(0,0,0,.2);
    border-radius: 3px;
    width: 100%;
    margin-bottom: 10px;
    transition: .2s ease all;
    outline: none;
    text-align: center;
    
    &:focus {
        border: 2px solid #3D76E9;
    }
`;

export default Contacto;