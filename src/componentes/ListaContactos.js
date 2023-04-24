import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { collection, onSnapshot } from "firebase/firestore";
import db from '../firebase/firebase.config';
import Contacto from './Contacto';

const ListaContactos = () => {
    const [contactos, setContactos] = useState([]);
    // const getData = async() => await getDocs(collection(db, "contactos"));
    // getData().then(res => {
    //     let array = [];
    //     res.forEach((doc) => {
    //         array.push({...doc.data(), id : doc.id});
    //     });
    //     setContactos(array);
    // });
    useEffect(() => {
        try{
            onSnapshot(collection(db, "contactos"), (snap) => {
                let array = [];
                snap.forEach((doc) => {
                    array.push({...doc.data(), id : doc.id});
                });
                setContactos(array);
            },
            (error) => {
                console.log(error);
            });
        }catch(error){
            console.log(error);
        }
    }, []);


    return (
        contactos.length > 0 &&
        <ContenedorContactos>
            {contactos.map(({id, nombre, correo}) =>{
                return (
                    <Contacto
                        key = {id}
                        id={id}
                        nombre={nombre}
                        correo={correo}
                    ></Contacto>
                )
            })}
        </ContenedorContactos>
    );
}
const ContenedorContactos = styled.div`
    margin-top: 40px;
`;

export default ListaContactos;