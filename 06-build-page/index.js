const fs = require("fs");
const path = require("path");


fs.promises.rm(path.join(__dirname, "project-dist"), {recursive: true, force: true})
  .then(() => fs.promises.mkdir(path.join(__dirname, "project-dist", "assets"), {recursive: true})
    .then(() => copyAssets())
    .then(() => createCss())
    .then(() => createHtml()))


function copyAssets() {
  fs.promises.readdir(path.join(__dirname, "assets"), {withFileTypes: true}).then((folders) => {
    folders.forEach((folder) => {
      if (folder.isDirectory()) {
        fs.promises.mkdir(path.join(__dirname, "project-dist", "assets", folder.name), {recursive: true}).then(() => {
          fs.promises.readdir(path.join(__dirname, "assets", folder.name), {withFileTypes: true}).then((files) => {
            files.forEach((file) => {
              if (file.isFile()) {
                let src = path.join(__dirname, "assets", folder.name, file.name);
                let dest = path.join(__dirname, "project-dist", "assets", folder.name, file.name);
                fs.copyFile(src, dest, (err) => {
                  if (err) {
                    throw err
                  }
                })
              }
            })
          })
        })
      }
    })
  })
}

function createCss() {
  fs.createWriteStream(path.join(__dirname, "project-dist", "style.css"));
  fs.promises.readdir(path.join(__dirname, "styles"), {withFileTypes: true}).then(files => {
    files.forEach((file) => {
      if (file.isFile() && path.extname(file.name) === ".css") {
        fs.readFile(path.join(path.join(__dirname, "styles"), file.name), "utf-8", (err, data) => {
          if (err) throw err;
          else {
            fs.appendFile(path.join(__dirname, "project-dist", "style.css"), data, (err) => {
              if (err) throw err;
            })
          }
        })
      }
    })
  })
}

async function createHtml() {
  let htmlText = await fs.promises.readFile(path.join(__dirname, "template.html"), "utf-8");
  fs.readdir(path.join(__dirname, "components"), {withFileTypes: true}, (err, files) => {
    files.forEach(file => {
      if (file.isFile() && path.extname(file.name) === ".html") {
        fs.createReadStream(path.join(__dirname, "components", file.name), {encoding: "utf-8"}).on("data", data => {
          htmlText = htmlText.replace(`{{${file.name.replace(path.extname(file.name), "")}}}`, data);
          fs.writeFile(path.join(__dirname, "project-dist", "index.html"), htmlText, (err) => {
              if (err) throw err;
            }
          )
        })
      }
    })
  })
}