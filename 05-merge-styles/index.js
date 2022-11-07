const fs = require("fs");
const path = require("path");

const stylesDirPath = path.join(__dirname, "styles");
const distDirPath = path.join(__dirname, "project-dist", "bundle.css");

fs.createWriteStream(distDirPath);
fs.promises.readdir(stylesDirPath, {withFileTypes: true}).then(files => {
  files.forEach((file) => {
    if (file.isFile() && path.extname(file.name) === ".css") {
      fs.readFile(path.join(stylesDirPath, file.name), 'utf-8', (err, data) => {
        if (err) throw err;
        else {
          fs.appendFile(distDirPath, data, (err) => {
            if (err) throw err;
          });
        }
      });
    }
  })
})