const { MongoClient } = require("mongodb");

// MongoDB URI
const uri = "mongodb://localhost:27017/"; // Default MongoDB URI

// Create a new MongoClient
const client = new MongoClient(uri, {});

async function main() {
  try {
    // Connect to MongoDB
    await client.connect();

    console.log("Connected to MongoDB");

    // Access or create the 'zen_class_db' database
    const database = client.db("zen_class_db");

    // Create collections within the database
    const usersCollection = database.collection("users");
    const codekataCollection = database.collection("codekata");
    const attendanceCollection = database.collection("attendance");
    const topicsCollection = database.collection("topics");
    const tasksCollection = database.collection("tasks");
    const companyDrivesCollection = database.collection("company_drives");
    const mentorsCollection = database.collection("mentors");

    console.log("Collections are ready");

    // Insert a sample document into the 'users' collection
    const newUser = {
      name: "Alice",
      email: "alice@example.com",
      contact: "1234567890",
      date_of_joining: new Date("2023-01-01"),
      status: "active",
    };

    const insertResult = await usersCollection.insertOne(newUser);
    console.log(
      `New user created with the following id: ${insertResult.insertedId}`
    );

    // Insert a sample document into the 'codekata' collection
    const newCodekataEntry = {
      user_id: insertResult.insertedId,
      problems_solved: 10,
      date: new Date("2023-10-01"),
      score: 90,
    };

    const insertCodekataResult = await codekataCollection.insertOne(
      newCodekataEntry
    );
    console.log(
      `New codekata entry created with the following id: ${insertCodekataResult.insertedId}`
    );

    // Perform a query to find the user we just added
    const user = await usersCollection.findOne({
      _id: insertResult.insertedId,
    });
    console.log("Found user:", user);

    // Example of finding all users
    const allUsers = await usersCollection.find().toArray();
    console.log("All users:", allUsers);
  } catch (error) {
    console.error("Error interacting with MongoDB:", error);
  } finally {
    // Close the connection
    await client.close();
    console.log("MongoDB connection closed");
  }
}

main().catch(console.error);
