accionProjecet.controller('homeCtrl',function($scope,$mdDialog,commonService){
	var alert;
	var getAllData

	$scope.updateData = function($event,object) {
	 	object.date_of_birth=new Date(object.date_of_birth)
	 	object.is_active=object.is_active==1?true:false;
	    $mdDialog.show({
	    	 parent: angular.element(document.body),
	         targetEvent: $event,
	         templateUrl:'modules/popup/views/commonPopup.html',
	         locals: {
	           userData: object,
	           isAdding:false
	         },
         	controller: DialogController
		  });
	    function DialogController($scope, $mdDialog,userData,isAdding) {
	        $scope.userData = userData;
	        $scope.isAdding=isAdding;
	        $scope.maxDate=new Date('yyyy-MM-dd').toString();
	        $scope.closeDialog = function() {
	          $mdDialog.hide();
	          getAllData();
	        }

	        $scope.addData = function(userData,isAdding) {
	          userData.date_of_birth=new Date(userData.date_of_birth)
	          if(isAdding){
	          	commonService.addNewData(userData).then(function(response){
					getAllData();
					$mdDialog.hide();
				},function(){
					$mdDialog.hide();
				})
	          }	else {
	          	commonService.updateRecord(userData).then(function(response){
					getAllData();
					$mdDialog.hide();
				},function(){
					$mdDialog.hide();
				})
	          }	
	          
	        }
	    }
	}

	function getAllData(){
		commonService.getData().then(function(response){
			$scope.data=response.data;
		})
	}


	getAllData();

	$scope.deleteData=function(ev,id){
		    // Appending dialog to document.body to cover sidenav in docs app
		    var confirm = $mdDialog.confirm()
		          .title('Would you like to delete this record?')
		          .textContent('It will delete it permanantly')
		          .ariaLabel('Lucky day')
		          .targetEvent(ev)
		          .ok('Please do it!')
		          .cancel('Please dont!');

		    $mdDialog.show(confirm).then(function() {
		      commonService.deleteRecord(id).then(function(response){
					getAllData();
				})
		    }, function() {
		    });

		
	}

	$scope.addNewData=function(){
		$mdDialog.show({
	    	 parent: angular.element(document.body),
	         templateUrl:'modules/popup/views/commonPopup.html',
	         locals: {
	           userData:{is_active:false},
	           isAdding:true
	         },
         	controller: DialogController
		  });
	    function DialogController($scope, $mdDialog, userData,isAdding) {
	        $scope.userData = userData;
	        $scope.isAdding=isAdding;
	        $scope.maxDate=new Date().toString();
	        $scope.closeDialog = function() {
	          $mdDialog.hide();
	          getAllData();
	        }

	        $scope.addData = function(userData,isAdding) {
	          userData.date_of_birth=new Date(userData.date_of_birth)
	          if(isAdding){
	          	commonService.addNewData(userData).then(function(response){
					getAllData();
					$mdDialog.hide();
				},function(){
					$mdDialog.hide();
				})
	          }	else {
	          	commonService.updateRecord(userData).then(function(response){
					getAllData();
					$mdDialog.hide();
				},function(){
					$mdDialog.hide();
				})
	          }	
	          
	        }
	     }
		
	}

	$scope.getAge=function (dateString) 
	{
	    var today = new Date();
	    var birthDate = new Date(dateString);
	    var age = today.getFullYear() - birthDate.getFullYear();
	    var m = today.getMonth() - birthDate.getMonth();
	    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
	    {
	        age--;
	    }
	    return age;
	}


})