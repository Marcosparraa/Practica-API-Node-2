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

    //post contact
    app.post("/api/contactos", (req, res) => {
        const { name, telefono, email } = req.body; 
        const emailExists = contactos.some(contacto => contacto.email === email);
        if (emailExists) {
            return res.status(400).send("El correo ya está en uso.");
        }
        const nuevoContacto = {
            id: contactos.length + 1, // Asigna un nuevo ID
            name,
            telefono,
            email
        };
        contactos.push(nuevoContacto);
        res.status(201).send(nuevoContacto);
        });
    // delete contacto
    app.delete("/api/contactos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        
        if (!isNaN(id)) {
            const index = contactos.findIndex(x => x.id === id);
            if (index!== -1) {
                contactos.splice(index, 1);
                res.send(`El contacto con ID: ${id} ha sido eliminado.`);
            } else {
                res.status(404).send(`No se encontró el contacto con ID: ${id}`);
            }
        } else {
            res.status(400).send("ID no válido");
        }
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
    
    app.put("/api/contactos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const { name, telefono, email } = req.body;
    
        // Verificar si el contacto existe
        const contacto = contactos.find(x => x.id === id);
        if (!contacto) {
            return res.status(404).send("Contacto no encontrado.");
        }
    
        // Verificar duplicación de correo (excluyendo el contacto actual)
        const emailExists = contactos.some(x => x.email === email && x.id !== id);
        if (emailExists) {
            return res.status(400).send("El correo ya está en uso.");
        }
    
        // Actualizar el contacto
        contacto.name = name;
        contacto.telefono = telefono;
        contacto.email = email;
    
        // Devolver el contacto actualizado
        res.send(contacto);
    });


    app.get("/api/contactos", (req, res) => {
        let resultado = contactos;
    
        // Filtrar por nombre si se proporciona
        if (req.query.name) {
            resultado = resultado.filter(contacto => 
                contacto.name.toLowerCase().includes(req.query.name.toLowerCase())
            );
        }
    
        // Filtrar por correo si se proporciona
        if (req.query.email) {
            resultado = resultado.filter(contacto => 
                contacto.email.toLowerCase() === req.query.email.toLowerCase()
            );
        }
    
        // Si no se encuentran resultados, se puede manejar el caso
        if (resultado.length === 0) {
            return res.status(404).send("No se encontraron contactos que coincidan con los criterios.");
        }
    
        // Devolver los contactos filtrados
        res.send(resultado);
    });
    
    
    const port = process.env.port || 5100;
    
    app.listen(port, () => console.log(`Estoy arriba klk en el port: ${port} ...`))
 
