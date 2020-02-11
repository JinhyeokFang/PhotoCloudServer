import { Schema, model, Model } from 'mongoose';

const userSchema: Schema = new Schema({
    username: String,
    password: String,
    photos: Array
});

export default model("user", userSchema);