/** @format */

import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Basic Schema
const BasicSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    value: {
        type: Number,
        default: 0,
        required: true
    },
});

export default mongoose.model("history", BasicSchema);
