const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "secret-folder");

fs.promises.readdir(dirPath, {withFileTypes: true}).then(files => {
  files.forEach(file => {
    if (file.isFile()) {
      fs.stat(path.join(dirPath, file.name), (err, stats) => {
        if (err) throw err;
        let fileName = file.name;
        let fileExt = path.extname(fileName);
        let fileSize = stats.size;
        console.log(`${fileName.replace(fileExt, "")} - ${fileExt.replace(".", "")} - ${(fileSize / 1000).toFixed(3)} kb`)
      });
    }
  })
});