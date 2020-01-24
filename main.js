const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu } = electron;

let mainWindow;

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

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);

});

// create menu template 
const mainMenuTemplate = [ 
    {
        label:'File',
        submenu:[
            {
                label:'Add Item'
            },
            {
                label:'CLear Items'
            },
            {
                label:'Quit',
                click(){
                    app.quit();
                }    
            }
        ]
    }
];