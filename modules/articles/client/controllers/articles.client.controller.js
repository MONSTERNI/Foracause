'use strict';

// Articles controller
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
  function ($scope, $stateParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;

    $scope.onKeyDownResult = "";
    $scope.onKeyUpResult = "";
    $scope.onKeyPressResult = "";

    // Utility functions

    var getKeyboardEventResult = function (keyEvent, keyEventDesc)
    {
      return keyEventDesc + " (keyCode: " + (window.event ? keyEvent.keyCode : keyEvent.which) + ")";
    };

    // Event handlers
    $scope.onKeyDown = function ($event) {
      $scope.onKeyDownResult = getKeyboardEventResult($event, "Key down");
      if($scope.onKeyDownResult=="Key down (keyCode: 27)")
      {
        document.getElementById("normalize").style.height="50px";
      }
    };

    $scope.onKeyUp = function ($event) {
      $scope.onKeyUpResult = getKeyboardEventResult($event, "Key up");
    };

    $scope.onKeyPress = function ($event) {
      $scope.onKeyPressResult = getKeyboardEventResult($event, "Key press");
    };
    // Create new Article
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      // Create new Article object
      var article = new Articles({
        problem: this.problem,
        content: this.content
      });

      // Redirect after save
      article.$save(function (response) {
        $location.path('articles/' + response._id);

        // Clear form fields
        $scope.problem='';
        $scope.content='';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.exp = function () {

      document.getElementById("normalize").style.WebkitTransition="all 0.5s";
      document.getElementById("normalize").style.transition="all 0.5s";
      document.getElementById("normalize").style.height="450px";

    };
       $scope.jack = function () {

      
      document.getElementById("other").style.height="150px";

    };



    // Remove existing Article
    $scope.remove = function (article) {
      if (article) {
        article.$remove();

        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function () {
          $location.path('articles');
        });
      }
    };
    $scope.minimize=function(go)
    {
        if(go==27)
        {
          document.getElementById("normalize").style.height="150px";
        }
    };

    // Update existing Article
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }


      var article = $scope.article;

      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.articles = Articles.query();
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.article = Articles.get({
        articleId: $stateParams.articleId
      });
    };
  }
]);
