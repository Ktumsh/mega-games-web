const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "data",
    "api",
    "apiStore.json"
  );
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return {
      statusCode: 200,
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Error reading the API file:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error reading the API file" }),
    };
  }
};
