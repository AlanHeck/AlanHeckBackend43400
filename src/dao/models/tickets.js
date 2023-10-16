import mongoose from "mongoose";

const ticketsCollection = "tickets";

const ticketsSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },
    ammount: Number,
    purchaser: String,
});

const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema);

export default ticketsModel;