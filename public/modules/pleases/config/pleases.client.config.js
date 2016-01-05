'use strict';

// Configuring the Articles module
angular.module('pleases').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Pleases', 'pleases', 'dropdown', '/pleases(/create)?');
		Menus.addSubMenuItem('topbar', 'pleases', 'List Pleases', 'pleases');
		Menus.addSubMenuItem('topbar', 'pleases', 'New Please', 'pleases/create');
	}
]);