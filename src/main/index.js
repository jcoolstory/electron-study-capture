import { app, screen, BrowserWindow, shell } from "electron";
import trimDesktop from "./trimDesktop";
import createFileManager from "./createFileManager";
import createCaptureWindow from "./createCaptureWindow";

let captureWindow;

function captureAndOpenItem() {
    const fileManager = createFileManager();
    return trimDesktop()
        .then(captureWindow.capture.bind(captureWindow))
        .then(img => {
            const createdFilename = fileManager.writeImage(app.getPath("temp"),img);

            return createdFilename;
        })
        .then(shell.openItem.bind(shell))
        .then(()=>{
            if (process.platform !== "darwin") {
                app.quit();
            }
        })
}

app.on("ready", ()=> {
    // trimDesktop().then(({sourceDisplay, trimmedBounds}) => {
    //     console.log(sourceDisplay,trimmedBounds);
    // })    
    captureWindow = createCaptureWindow();
    captureAndOpenItem();
});
