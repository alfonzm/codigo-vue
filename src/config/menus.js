import MenuEvents from '@/menuEvents'
import MenuIds from '@/menuIds'

export default (app, win) => {
  const send = (event, payload) => {
    win.webContents.send(event, payload)
  }

  const menus = [
    {
      label: app.name,
      submenu: [
        { role: 'about' },
        { role: 'quit' },
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'New Note',
          accelerator: 'CmdOrCtrl+N',
          click: () => { send(MenuEvents.NEW_NOTE) },
        },
        {
          label: 'New Folder',
          accelerator: 'Shift+CmdOrCtrl+N',
          click: () => { send(MenuEvents.NEW_FOLDER) },
        },
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        {
          label: 'Find',
          submenu: [
            {
              label: 'Find Note',
              accelerator: 'Cmd+Shift+F',
              click: () => { send(MenuEvents.FIND_NOTE) },
            },
          ]
        },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' },
      ]
    },

    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { type: 'separator' },
        {
          label: 'Toggle Sidebar',
          id: MenuIds.TOGGLE_SIDEBAR,
          accelerator: 'CmdOrCtrl+\\',
          click: () => { send(MenuEvents.TOGGLE_SIDEBAR) },
        },
        {
          label: 'Toggle Preview',
          id: MenuIds.TOGGLE_PREVIEW,
          accelerator: 'Shift+CmdOrCtrl+P',
          click: () => { send(MenuEvents.TOGGLE_PREVIEW) },
        },
        {
          label: 'Toggle Editor',
          id: MenuIds.TOGGLE_EDITOR,
          accelerator: 'Shift+CmdOrCtrl+E',
          click: () => { send(MenuEvents.TOGGLE_EDITOR) },
        },
        // {
        //   label: 'Toggle Toolbar',
        //   id: MenuIds.TOGGLE_TOOLBAR,
        //   accelerator: 'Shift+CmdOrCtrl+T',
        //   click: () => { send(MenuEvents.TOGGLE_TOOLBAR) },
        // },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
      ]
    },

    {
      role: 'help',
      submenu: [
        { label: 'Learn More' },
      ]
    }
  ]

  if(process.env.NODE_ENV !== 'production') {
    menus.push({
      label: 'Develop',
      submenu: [
        {
          role: 'toggledevtools'
        },
      ]
    })
  }

  return menus
}