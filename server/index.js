const express = require("express");
const dbConnexion = require("./DBConnection")
const Conversation = require("./controllers/conversation.js")
const app = express();
const PORT = 4000;
const _id = "64940cf8ab050c2cd808b2a1"
//👇🏻 New imports
const http = require("http").Server(app);
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});
let posts = [ 
  { 
    id: '1234',
    title: 'test',
    author: 'jesuis@dmin.oui',
    createdAt: '24-2-2023',
    content: []
  },
  {
    id: '1uzwgfhv',
    title: 'test',
    author: 'jesuis@dmin.oui',
    createdAt: '24-2-2023',
    content: [
        { id: '1', html: 'Mon super titre !', tag: 'h1' },
        {
          id: '2',
          html: "C'est vraiment génial",
          tag: 'p'
        },
        {
          id: '3',
          html: 'Comment Emilie est la meilleure:',
          tag: 'h2'
        },
        {
          id: '4',
          html: "Tout d'abord, Emilie est une personne somptueuse qui régale les pupilles. Sa splendeur et son charme éternels nous plongent dans une vague d'élégance et de délicatesse sans égal. Ses cheveux de feu et son sourire ravivent les flammes des coeurs peinés et les embaume de lumière et de joie.",
          tag: 'p'
        },
        {
          id: '5',
          html: "De plus, Emilie est d'une intelligence inégalée en ce monde. Sa pensée est digne des plus grands sages de cet univers.&nbsp;",
          tag: 'p'
        }
      ],
    tags: []
  } ];
//👇🏻 Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    const fetchID = () => Math.random().toString(36).substring(2, 10);

    socket.on("creatConversation", (data) => {
      const {name} = data

      Conversation.createConversation(name)
    })

    socket.on("createPost", (data) => {
        const {postTitle, postContent, username, timestamp, tags} = data

        posts.unshift({
            id: fetchID(),
            title: postTitle,
            author: username,
            createdAt: timestamp,
            content: [],
            tags: tags,
        });


        console.log(posts)
        Conversation.addMessage(_id, posts)
        socket.emit("updatePosts", posts);
    
    });

    socket.on("getPage", async (data) => {
        const {id} = data

        const conversations = await Conversation.getAllConversations()

        const index = conversations.map((post) => post.id).indexOf(_id);
        
        const sentConv = {
          id: conversations[index]._id,
          title: conversations[index].name,
          content: conversations[index].messages
        }
        
        socket.emit("getPage", sentConv);

    })

    socket.on("updatePage", async (data) => {
        const {id, content, changedBlock} = data
        
        await Conversation.addMessage(_id, content)

        const conversations = await Conversation.getAllConversations()
        const index2 = conversations.map((post) => post.id).indexOf(_id);


        const sentConv = {
          id: `${conversations[index2]._id}`,
          title: conversations[index2].name,
          content: conversations[index2].messages
        }
        console.log(sentConv)
        socket.broadcast.emit("updatePage", {
            content: sentConv,
            changedBlock: changedBlock
        });
    })

    socket.on('disconnect', () => {
      socket.disconnect()
      console.log('🔥: A user disconnected');
    });
});

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});