const fs = require("fs");
const path = require("path");
const {stdout, stdin} = require("process");

const filePath = path.join(__dirname, "text.txt");

stdout.write("Welcome, please write your text...\n\n");

stdin.on("data", data => {
  if (data.toString().trim() === "exit") {
    stdout.write("Changes saved. Goodbye!");
    process.exit();
  } else {
    fs.appendFile(filePath, data, err => {
      if (err)
        throw err;
    });
  }
});

process.on('SIGINT', () => {
  stdout.write("\nChanges saved. Goodbye!");
  process.exit();
});