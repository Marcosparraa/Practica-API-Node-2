// Crear un API utilizando NodeJs con la que pueda manejar una agenda telefonica, se debera crear lo siguientes endpoint:

//  /api/contacts

// agregar los siguientes methods
// obtener todos los contactos
// get
// obtener un contacto en especifico
// get (hint: necesitas un params :id)
// si el param id llega undefined responder con un 404 Not Found
// si el param id no es un number devover un 400 bad request
// nota: para este ejercicios se utilizara un array para almacenar los contactos

// datos del contacto:
// nombre completo
// telefono
// correo

const express = require("express");

const app = express();

app.use(express.json());


const contactos = [
    {id: 1, name: "Marcos Parra", telefono: 8494885449, email: "marcosparraa@gmail.com"}, 
    {id: 2, name: "Victor Moya", telefono: 8095445500, email: "victorm007@gmail.com"},
    {id: 3, name: "Elsa Alvarez", telefono: 8095605500, email: "Elsa005@gmail.com"},
    {id: 4, name: "Juan Parra", telefono: 8292715868, email: "marcosparraa@gmail.com"},
]

// obtener todos los contactos
    app.get("/", (req, res) => {
        res.send("node js api")
    });

    app.get("/api/contactos", (req, res) => {
        res.send(contactos);
    });

    // obtener un contacto en especifico
    app.get("/api/contactos/:id", (req, res) => {
        const contacto = contactos.find (x => x.id === parseInt (req.params.id));
        if (!contacto) return res.status(404).send(`No existe el contacto: ${req. res}`);
        else res.send(contacto); 
    });

    // si el param id llega undefined responder con un 404 Not Found
    app.get("/api/contactos/:id", (req, res) => {
        const id = req.params.id;
        
        if (id === undefined || id.trim() === "") {
            return res.status(404).send('ID no proporcionado o es inválido');
        }
    
        const contacto = contactos.find(x => x.id === parseInt(id));
    
        if (!contacto) {
            return res.status(404).send(`No existe el contacto con ID: ${id}`);
        }
    
        res.send(contacto);
    });
    


    const port = process.env.port || 5100;
    
    app.listen(port, () => console.log(`Estoy arriba klk en el port: ${port} ...`))
 
