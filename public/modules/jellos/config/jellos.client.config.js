'use strict';

// Configuring the Articles module
angular.module('jellos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Jellos', 'jellos', 'dropdown', '/jellos(/create)?');
		Menus.addSubMenuItem('topbar', 'jellos', 'List Jellos', 'jellos');
		Menus.addSubMenuItem('topbar', 'jellos', 'New Jello', 'jellos/create');
	}
]);