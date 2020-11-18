const getMenuFrontEnd = (role = 'USER_ROLE') => {
    const menu = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu: [
            {titulo: 'Inicio',url: '/' },
            {titulo: 'Conductores',url: '/' },
            {titulo: 'Buses',url: '/' },
            {titulo: 'Taller',url: '/' },
            {titulo: 'Rutas',url: '/' },
          ]
        },
    
        {
          titulo: 'Mantenimiento',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            //{titulo: 'Usuario',url: 'usuarios' },
            {titulo: 'Hospitales',url: 'hospitales' },
            {titulo: 'Médicos',url: 'medicos' },
          ]
        },
      ];

      if( role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift( {titulo: 'Usuario',url: 'usuarios'} )
      }

      return menu;
}

module.exports = {
    getMenuFrontEnd 
}