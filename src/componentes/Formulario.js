import React ,{useState} from 'react';
import styled from 'styled-components';
import db from '../firebase/firebase.config';
import { collection, addDoc } from "firebase/firestore";

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');

    const onChange = (e) =>{
        switch (e.target.name) {
            case 'nombre':
                setNombre(e.target.value);
            break;  
            case 'correo':
                setEmail(e.target.value);
            break;
            default:
                console.log('No existe el input');
            break;
        }
    }

    const onsubmit = async(e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "contactos"), {
              nombre,
              correo: email
            });
            console.log("Document written with ID: ", docRef.id);

            setNombre('');
            setEmail('');
        }catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return(
        <form action="" onSubmit={onsubmit}>
            <Input 
                type="text"
                name="nombre"
                value ={nombre}
                onChange={(e) => onChange(e)}
                placeholder="Nombre"
            />
            <Input 
                type="email"
                name="correo"
                value ={email}
                onChange={(e) => onChange(e)}
                placeholder="Correo"
            />
            <Boton type="submit">Agregar</Boton>
        </form>)
}

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

const Boton = styled.button`
    padding: 10px 30px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    transition: .3s ease all;
    outline: none;
    background: #C4C4C4;
    color: #fff;
    font-size: 12px;
 
    &:hover {
        background: #3D76E9;
    }
`;

export default Formulario;