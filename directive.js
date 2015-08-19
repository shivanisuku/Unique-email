/**
 * Created by ssukumaran on 6/22/2015.
 */
formApp.directive('checkEmail', ['dataService', function (dataService) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.bind('blur', function (e) {
                if (!ngModel || !element.val()) return;
                var keyProperty = scope.$eval(attrs.checkEmail);
                var currentValue = element.val();
                dataService.checkUniqueValue( currentValue)
                    .then(function (unique) {

                        scope.guid=unique.data.guid;


                        //Ensure value that being checked hasn't changed
                        //since the Ajax call was made
                        if (currentValue == element.val()) {
                            ngModel.$setValidity('checkEmail', !unique.data.subscribed);
                        }
                    }, function () {
                        //Probably want a more robust way to handle an error
                        //For this demo we'll set unique to true though
                        ngModel.$setValidity('checkEmail', true);
                    });
            });
            element.bind('focus',function(e)
            {
                scope.sign_up_form.email.$setValidity('checkEmail', true);

            })
        }
    }
}]);
