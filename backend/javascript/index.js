const cors = require("cors");
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const appPort = 3000;
const dbName = "todo-backend";
const dbHost = "localhost";
const dbPort = 27017;

const mongo = {
  db: null,
  async connect() {
    try {
      // Connect to MongoDB
      const client = new MongoClient(`mongodb://${dbHost}:${dbPort}/?poolSize=20&w=majority`, {
        useUnifiedTopology: true,
      });
      await client.connect();
      this.db = client.db(dbName);
      console.log("Server connected to db...");
    } catch (error) {
      console.error(error);
      client.close();
      process.exit(1);
    }
  },
};

const app = express();
// Set Express to parse and send only json
app.use(express.json());
// Enable CORS
app.use(cors());
// Load the frontend UI
app.use(express.static("./static"));

app.get("/todos", async (request, response) => {
  try {
    const results = await mongo.db.collection("todos").find({});
    response.status(200).send(await results.toArray());
  } catch (err) {
    response.status(500).send({
      message: "Documents failed to load.",
    });
  }
});

app.post("/todos", async (request, response) => {
  const document = { ...request.body, ...{ done: false } };
  try {
    const result = await mongo.db.collection("todos").insertOne(document);
    response.status(200).send({ ...document, ...{ _id: result.insertedId } });
  } catch (err) {
    response.status(500).send({
      message: "Document failed to be inserted.",
    });
  }
});

app.put("/todos/:_id", async (request, response) => {
  const { _id } = request.params;
  const { _id: _, ...rest } = request.body; // We use the _id from request param
  try {
    await mongo.db.collection("todos").updateOne(
      { _id: ObjectId(_id) },
      {
        $set: rest,
      }
    );
    response.status(200).send(request.body);
  } catch (err) {
    response.status(404).send({ message: "Document not found." });
  }
});

app.delete("/todos/:_id", async (request, response) => {
  const { _id } = request.params;
  try {
    const results = await mongo.db.collection("todos").deleteOne({
      _id: ObjectId(_id),
    });
    response.status(200).send({ deleted: results.deletedCount }).end();
  } catch (err) {
    response.status(404).send({ message: "Document not found." });
  }
});

app.delete("/todos", async (request, response) => {
  try {
    const results = await mongo.db.collection("todos").deleteMany({
      done: true,
    });
    response.status(200).send({ deleted: results.deletedCount });
  } catch (err) {
    response.status(404).send({ message: "Document not found." });
  }
});

app.listen(appPort, () => {
  console.log(`Server listening to port ${appPort}...`);
  mongo.connect();
});
