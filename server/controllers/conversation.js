const Conversation = require('../models/conversation.js')

exports.getAllConversations = async () =>{
    const convs = await Conversation.find({})
    .then(docs => {
        console.log("find")
        return docs
    }).catch(err => console.log(err));
       
    return convs;
};


exports.createConversation = (name) =>{
    const conv = new Conversation({
        name: name,
        messages: [],
    });
    conv.save()
}


exports.addMessage = async (conversationID, message) => {
    await Conversation.updateOne({_id:conversationID}, {$set: {messages:message}})
    .then((e) => console.log("updated"))
    .catch(err => console.log(err))

}