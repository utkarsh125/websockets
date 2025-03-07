import { createClient } from "redis";
import express from "express";

const app = express();
app.use(express.json());
const client = createClient();

app.post("/submit", async (req, res) => {
  //a user would ideally send
  //problemId
  //userId
  //code
  //language in which the code was written

  const { problemId, userId, code, language } = req.body;

  //push this to a database, in ideal cases ---> Not doing this here though

  try {
    //Push the payload into a Redis queue called submissions
    //from the left (lPush)
    await client.lPush(
      "submission",
      JSON.stringify({
        problemId,
        userId,
        code,
        language,
      })
    );

    res.json({
      message: "Submission received.",
    });
  } catch (error) {

    console.error("Submission not received: ", error);
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to Redis");

    app.listen(3000, () => {
      console.log("Server running @PORT:3000");
    });
  } catch (error) {
    console.error("Error occurred while connecting: ", error);
  }
}

startServer();
