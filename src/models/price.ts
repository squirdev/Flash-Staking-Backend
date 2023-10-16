/** @format */

import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Basic Schema
const BasicSchema = new Schema({
    ftt: {
        type: Number,
        require: true,
        default: 0,
    },
    flash: {
        type: Number,
        default: 0,
        require: true,
    },
});

export default mongoose.model("price", BasicSchema);
