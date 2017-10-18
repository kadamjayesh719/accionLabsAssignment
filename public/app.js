var accionProjecet = angular.module('accionProjecet', ['ui.router','ngMaterial','datatables','720kb.datepicker']);

    accionProjecet.config(['$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
             
            $urlRouterProvider.otherwise("/home");
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl :'modules/home/home.html',
                    controller: 'homeCtrl'
                })
                

        }]);