const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
require("dotenv").config();
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/errorr-handler");

//middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/elections", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(
        `Server is listening on port ${port}...\n http://localhost:${port}/`
      )
    );
  } catch (err) {
    console.log(err);
  }
};

start();
