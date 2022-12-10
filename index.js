import express from "express"
import * as fs from "fs"
import Logger from './Logger/Logger.js';
const Port = process.env.PORT || 4000;
const app = express();
const Home = fs.readFileSync('./view/index.html')
const logger=Logger(import.meta.url)
//routes
app.get('/', (req, res) => {
    logger.info("Logger here");
    logger.error(new Error("Error here"));
    res.setHeader('Content-Type', 'text/html');
    res.send(Home);
})

//server
app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
})