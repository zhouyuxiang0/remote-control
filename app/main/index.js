const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

let win;
app.on("ready", () => {
  win = new BrowserWindow({
    width: 600,
    heigth: 300,
    webPreferences: {
      nodeIntergration: true,
    },
  });
  if (isDev) {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadFile(path.resolve(__dirname, "../renderer/pages/main/index.html"));
  }
});
