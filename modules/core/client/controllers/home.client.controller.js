'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication; 
  
  $scope.alerts=[
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-01.jpg'
  			
  		},
   		{
  			image:'modules/core/client/views/images/2.png'
  			
  		},
   		{
  			image:'modules/core/client/views/images/E_SDG_Icons-03.jpg'
  			
  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-04.jpg'
  			
  		},
  		{
  			image:'modules/core/client/views/images/TGG_Icon_Color_05.png'
  			
  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-06.jpg'
  			
  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-07.jpg'
  			
  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-07.jpg'
  			
  		},
  		{
  			image:'modules/core/client/views/images/9-Industry-Innovation-and-Infrastructure.jpg'
  			
  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-10.jpg'
  			
  		},
  		{
  			image:'modules/core/client/views/images/11-Sustainable-cities-.jpg'
  			
  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-12.jpg'
  			
  		},
  		{
  			image:'modules/core/client/views/images/13-Climate-action.jpg'
  			
  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-07.jpg'
  			
  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-15.jpg'
  			
  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-16.jpg'
  			
  		},
  		
  		
  				

  		
  ];
}
]);
