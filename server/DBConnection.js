
const mongoose = require('mongoose');

const uri = "mongodb+srv://CIASIE:4dQG8GuhOeaQNBvG@chats.dxhdt4t.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().then(()=> console.log("reussi")).catch(console.dir);
mongoose.connect(uri)
  .then(() => console.log('connection à mongoDB réussie'))
  .catch(() => console.log('connection à mongoDB échouée'));