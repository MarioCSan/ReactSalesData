import { useParams } from "react-router-dom";
import { Formulario } from "./Formulario";

const UpdateCliente = () => {

  const { idCliente } = useParams();
console.log(idCliente)
  return (
    <>
    <Formulario idCliente={idCliente}/>

    </>
  );
}

export default UpdateCliente