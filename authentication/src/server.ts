import createApp from "./app.js"

const server = createApp();

server.listen(3000, ()=>{
    console.log(`server running on url: http://localhost:${3000}`);
});