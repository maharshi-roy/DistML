const { app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require('child_process');
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let pythonScript;

function setupIPC () {

	//register state saver function on each redux change
	ipcMain.on('save-state', (event, state) => {
		fs.writeFileSync('src/initialState.json', JSON.stringify(state));
	});

	//set up python script launch and exit
	ipcMain.on('toggle-work', (event, jobStatus) => {
		if (jobStatus) {
			pythonScript = spawn('python', ['src/back-end/syscall/run.py']);
		}
		else
			pythonScript.kill('SIGINT');
	});

}

function cleanUp () {
	var finalState = JSON.parse(fs.readFileSync('src/initialState.json'));

	finalState.jobStatus.working = false;

	fs.writeFileSync('src/initialState.json', JSON.stringify(finalState));

	if (!pythonScript.killed);
	pythonScript.kill('SIGINT');

	win = null;
	pythonScript = null;
}

function createWindow () {
	// Create the browser window.
	win = new BrowserWindow({ 
		width: 800, 
		height: 600, 
		webPreferences: {
			// devTools: false
		} 
	});

	// and load the index.html of the app.
	win.loadURL('http://localhost:8080');

	setupIPC();

	// Emitted when the window is closed.
	win.on('closed', () => cleanUp());
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow();
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.