import { MongoClient, ServerApiVersion } from "mongodb";

class MongoDBClient {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(
      "mongodb+srv://kanon3747:root@cluster0.yw5wzq3.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp" ||
        "",
      {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      }
    );
  }

  async connect() {
    try {
      await this.client.connect();
      await this.ping();
      console.log("Successfully connected to MongoDB!");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  }

  async ping() {
    try {
      await this.client.db("admin").command({ ping: 1 });
      console.log("Pinged the MongoDB deployment.");
    } catch (error) {
      console.error("MongoDB ping error:", error);
    }
  }

  async close() {
    await this.client.close();
    console.log("MongoDB connection closed.");
  }
}

export default MongoDBClient;
