'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication; 
    $scope.autoload=function()
    {
      document.getElementById("bleh").style.opacity="1";
    }
    $scope.myfunction=function(go)
    {
      document.getElementById(go).style.opacity="1";
    }
     $scope.myfunc=function(go)
    {
      document.getElementById(go).style.opacity="0";
    }
    $scope.alerts=[
    {
  			image:'modules/core/client/views/images/E_SDG_Icons-01.jpg',
        texty:"WORKING",
        idy:"blur"
        
  			
  		},
   		{
  			image:'modules/core/client/views/images/2.png',
        texty:"WORKING",
        idy:"blur1"
        

  			
  		},
   		{
  			image:'modules/core/client/views/images/E_SDG_Icons-03.jpg',
        texty:"WORKING",
        idy:"blur2"

  			
  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-04.jpg',
  			texty:"WORKING",
        idy:"blur3"

  		},
  		{
  			image:'modules/core/client/views/images/TGG_Icon_Color_05.png',
  			texty:"WORKING",
        idy:"blur4"

  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-06.jpg',
  			texty:"WORKING",
        idy:"blur5"

  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-07.jpg',
  			texty:"WORKING",
        idy:"blur6"

  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-07.jpg',
  			texty:"WORKING",
        idy:"blur7"

  		},
  		{
  			image:'modules/core/client/views/images/9-Industry-Innovation-and-Infrastructure.jpg',
  			texty:"WORKING",
        idy:"blur8"

  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-10.jpg',
  			texty:"WORKING",
        idy:"blur9"

  		},
  		{
  			image:'modules/core/client/views/images/11-Sustainable-cities-.jpg',
  			texty:"WORKING",
        idy:"blur10"

  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-12.jpg',
  			texty:"WORKING",
        idy:"blur11"

  		},
  		{
  			image:'modules/core/client/views/images/13-Climate-action.jpg',
  			texty:"WORKING",
        idy:"blur12"

  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-07.jpg',
  			texty:"WORKING",
        idy:"blur13"

  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-15.jpg',
  			texty:"WORKING",
        idy:"blur14"

  		},
  		{
  			image:'modules/core/client/views/images/E_SDG_Icons-16.jpg',
  			texty:"WORKING",
        idy:"blur15"

  		},
  		
  		
  		
  				

  		
    ];
  }
 
]);

