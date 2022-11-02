import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
    name: 'string',
    userId: 'string'
})

export default mongoose.model("Player", PlayerSchema)