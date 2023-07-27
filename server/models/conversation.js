const mongoose = require('mongoose');


const conversationSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    name: {type: String, required: true, unique: true},
    messages: {type : Array, required : false },
});


module.exports = mongoose.model('Conversation', conversationSchema);