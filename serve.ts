require("dotenv").config();
const cron = require("node-cron");
import express, { Express } from "express";
import cors from "cors";
import controllers from "./src/controllers";
// External Modules
import API from "./src/apis";
import config from "./src/config";
import ConnectDatabase from "./src/config/database";

// Get router
const router = express.Router();

const app: Express = express();
const port: Number = Number(process.env.HTTP_PORT || 5005);

app.use(
    cors({
        origin: "*",
        methods: ["POST", "GET"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend Load
// app.use(express.static(__dirname + "/build"));
// app.get("/*", function (req: any, res: any) {
//     res.sendFile(__dirname + "/build/index.html", function (err: any) {
//         if (err) {
//             res.status(500).send(err);
//         }
//     });
// });

// API Router
API(router);
app.use("/api", router);

ConnectDatabase(config.mongoURI);


cron.schedule('0 * * * *', () => {
    console.log('running a task every minute');
    controllers.History.create()
});


// cron.schedule('0 0 * * *', () => {
//     console.log('running a task every day');
//     controllers.History.create()
// });

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
