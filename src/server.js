import express from "express";
import path from "path";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(process.cwd(), "src", "public")));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(process.cwd(), "src/views"));

app.get("/", (req, res) => {
  res.render("websocket");
});

const httpServer = app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});

const socketServer = new Server(httpServer);

const arrayProducts = [];

socketServer.on('connection', (socket)=>{
    console.log(`Usuario conectado: ${socket.id}`);
    
    socket.on('disconnect', ()=>{
        console.log('usuario desconectado');
    });

       
    })

    socketServer.emit('arrayProducts', arrayProducts);

    socket.on('newProd', (prod)=>{
       
        arrayProducts.push(prod)
        
        socketServer.emit('arrayProducts', arrayProducts)
    })
