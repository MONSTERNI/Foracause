'use strict';

// Configuring the new module
angular.module('work1s').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Work1s', 'work1s', 'dropdown', '/work1s(/create)?');
		Menus.addSubMenuItem('topbar', 'work1s', 'List Work1s', 'work1s');
		Menus.addSubMenuItem('topbar', 'work1s', 'New Work1', 'work1s/create');
	}
]);
