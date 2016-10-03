(function(){
	"use strict";
	
	var app = angular.module('mynotes', ['ionic','NoteStoreModule']);

	app.config(function($stateProvider,$urlRouterProvider){
		$stateProvider.state('list',{
			url:'/list',
			templateUrl:'templates/list.html'
		});
		$stateProvider.state('edit',{
			url:'/edit/:noteId',
			templateUrl:'templates/edit.html',
			controller: 'EditCtrl'
		});
		$stateProvider.state('add',{
			url:'/add',
			templateUrl:'templates/edit.html',
			controller: 'AddCtrl'
		});
		
		$urlRouterProvider.otherwise('/list');
	});
	
	
	
	
	
	app.controller('ListCtrl',function($scope,NoteStore,$state){
		
		$scope.reordering = false;
		
		$scope.notes = NoteStore.list();
		
		$scope.remove = function(noteId){
			NoteStore.remove(noteId);
		}
		
		$scope.move = function(note,fromIndex,toIndex){
			console.log("moving from "+fromIndex+" to "+toIndex+" index");
			NoteStore.move(note,fromIndex,toIndex);
		}
		
		$scope.toogleReorder = function(){
			$scope.reordering = !$scope.reordering;
			console.log("reordering: "+$scope.reordering);
		}
	});
	
	app.controller('EditCtrl',function($scope,$state,NoteStore){
		
		$scope.note = angular.copy(NoteStore.get($state.params.noteId));
		
		
		$scope.saveNote = function(note){
			NoteStore.update($scope.note);
			$state.go('list');
		}
	});
	
	app.controller('AddCtrl',function($scope,$state,NoteStore){
		
		var time = new Date();
		var timestring = time.getTime().toString();
		$scope.note = {
				id: timestring,
				title:'',
				description:''
		}
		
		
		$scope.saveNote = function(){
			NoteStore.create($scope.note);
			$state.go('list');
		}
	});
	
	
	app.run(function($ionicPlatform) {
		$ionicPlatform.ready(function() {
			if(window.cordova && window.cordova.plugins.Keyboard) {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				
				// Don't remove this line unless you know what you are doing. It stops the viewport
				// from snapping when text inputs are focused. Ionic handles this internally for
				// a much nicer keyboard experience.
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	})
	
}());

