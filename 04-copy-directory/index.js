const fs = require("fs");
const path = require("path");

const oldDirPath = path.join(__dirname, "files");
const newDirPath = path.join(__dirname, "files-copy");

fs.promises.rm(newDirPath, {recursive: true, force: true}).then(() => {
  fs.promises.mkdir(newDirPath, {recursive: true})}).then(() => {
  fs.promises.readdir(oldDirPath, {withFileTypes: true}).then(files => {
    files.forEach((file) => {
      if (file.isFile()) {
        fs.copyFile(path.join(oldDirPath, file.name), path.join(newDirPath, file.name), () => {
          console.log(`${file.name} copied successfully`);
        });
      }
    });
  });
});
