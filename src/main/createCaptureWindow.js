import { ipcMain, BrowserWindow, nativeImage } from "electron";

class CaptureWindow {
    constructor() {
        this.win = new BrowserWindow();
        this.win.loadURL("file://" + __dirname + "/../../captureWindow.html");
    }

    capture(clippingProfile) {
        return new Promise((resolve, reject) => {
            ipcMain.once("REPLY_CAPTURE", (_, {error, dataURL}) => {
                if (error){
                    reject(error);
                } else {
                    resolve(nativeImage.createFromDataURL(dataURL));
                }
            })
            this.win.webContents.send("CAPTURE12", clippingProfile)
        })
    }
    close(){
        this.win.close();
    }
}

function createCaptureWindow() {
    return new CaptureWindow();
}

export default createCaptureWindow;