
import { Request, Response, NextFunction } from "express";
import controllers from "../controllers";

const stakingHistory = async (req: Request, res: Response) => {
    try {
        let data = await controllers.History.find("");
        console.log("history_data", data)
        res.status(200).json({ data });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

export default {
    stakingHistory,
};
