//rafc -atajo ---> crea esto 
import React, { useState }  from 'react'

const PrimerComponente = () => {
   // let nombre = "jhony";
    let web = "jajajsjasd";
    let array = ["a","b","c"];
    
    // const [x, setX] = useState("valorDefecto");  se usa para que cuando se cambie una variable, se actualice dentro de la pagina 
    //nombre --->nombre de la variable
    //setNomnbre es la funcion que se debe llamar para el cambio de variable-->setNombre("New dato")
    //useState("jhony") Valor por defecto de la variable 
    const [nombre, setNombre] = useState("jhony"); 

    // El código e.target.value se refiere al valor actual del elemento del evento (e) que se ha desencadenado en respuesta 
    // a una interacción del usuario (por ejemplo, hacer clic en un botón o ingresar información en un formulario). 
  return (
    <div>
      <p>primer Componente </p>
      <p>Mi nombre es: <strong className={nombre.length >=4 ? 'verde':'roja'}>{nombre}</strong> </p>
      <p>{web}</p>
      <input type='text' onChange={e => setNombre(e.target.value)} placeholder='camviar nombre'/>
      <button onClick={ e => setNombre("JHONY CAMBIOOOOOOO")}>Cambiar nombre</button>
      
      <button onClick={ e => {
        console.log("El valor acual es:::::"+nombre);
      }}>Valor nombre consola</button>
      <ul>
        {
            array.map((array,indice) => {
                return(<li key={indice}>
                    {array}
                </li>);
            })
        }
      </ul>
    </div>
  )
}

export default PrimerComponente
