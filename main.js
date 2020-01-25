const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function(){

    // create new window
    mainWindow = new BrowserWindow({});
    // load html file in window
    mainWindow.loadURL(url.format({
        pathname : path.join(__dirname, 'mainWindow.html'),
        protocol:'file:',
        slashes: true

    }));
    // Quit app when closed 
    mainWindow.on('close', function(){
        app.quit();
    })

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);

});

//Handle craete Add window 
function craeteAddWindow(){
    // create new window
    addWindow = new BrowserWindow({
        width: 300,
        height:200,
        title:'List whatever you want'
    });
    // load html file in window
    addWindow.loadURL(url.format({
        pathname : path.join(__dirname, 'addWindow.html'),
        protocol:'file:',
        slashes: true

    }));
    // Garbage collection handle 
    addWindow.on('close', function(){
        addWindow= null ; 
    });
}

// create menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:'Add Item',
                click(){
                    craeteAddWindow();

                    
                }
            },
            {
                label:'Clear Items'
            },
            {
                label:'Quit',
                accelerator: process.platform == 'darwin' ? 'command+Q' :
                 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

//If mac, add empty object to menu 
if(process.platform =='darwin'){
    mainMenuTemplate.unshift({});
}