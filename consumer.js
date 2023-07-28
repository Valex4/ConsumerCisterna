import amqp from "amqplib";
import { createEvent } from "./cisterna.api.js";


const rabbitSettings = {
    protocol: "amqp",
    hostname: "34.235.104.181",
    port: 5672,
    username: "guest",
    password: "guest",
  };
async function connect() {
    const queue = "cisterna"
    try {
        const conn = await amqp.connect(rabbitSettings);
        console.log('Conexión exitosa')
        const channel = await conn.createChannel()
        console.log ("Canal creado exitosamente en consumidor")

        channel.consume(queue, (msn)=> {  
          const contenido =  msn.content.toString();
          console.log("Imprimiendo el contenido: " + contenido  );
          let objetoConsumer = {
            nivel: contenido
          };

          let numero = parseInt(contenido);
          if(numero <=50 || numero ==100){
          console.log("Imprimiendo el objeto nuevo: " );
          console.log(objetoConsumer);

          const objetoRecibido = JSON.parse(contenido);
            console.log(objetoRecibido);

            const response = createEvent(objetoConsumer);
            console.log("Imprimiendo response: ");
            console.log(response); 
            
            channel.ack(msn)
          }else{
            console.log("El valor no es 0 o 100");
          }
         
        })
        

    } catch (error) {
        console.error('Error => ', error)    
    }
}

connect();