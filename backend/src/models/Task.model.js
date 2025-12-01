import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({ date: Date, sent: { type: Boolean, default: false}});


const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    title: { type: String, require: true},
    description: String,
    summary: String,
    status: { type: String, enum: ['todo', 'in-progress','done'], default:'todo'},
    priority: { type: String, enum: ['low','medium','high'], default: 'medium'},
    tags:[String],
    dueDate: Date,
    reminders: [reminderSchema]
}, { timestamps:true});

export default mongoose.model('Task', taskSchema);