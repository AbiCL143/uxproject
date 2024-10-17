import React from "react";
import { useLocation,useNavigate } from "react-router-dom";

function Preguntas(){
    const location = useLocation();
    const navigate = useNavigate();
    const jsonRecibido = location.state?.jsonToSend || [];
    console.log('JSON Recibido:', jsonRecibido);
    return(
        <div>
            <p> Preguntas de criterios </p>
        </div>
    );
};

export default Preguntas;