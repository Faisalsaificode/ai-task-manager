import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, require: true },
    role: { type: String, enum:['user','admin'], default:'user' },
    preferences: {
        timezone: { type: String, default: 'Asia/Kolkata' },
        remindersEnabled: { type: Boolean, default: true },
        theme: { type: String, default: 'light'}
    }
},{ timestamps: true });

export default mongoose.model('User', userSchema);