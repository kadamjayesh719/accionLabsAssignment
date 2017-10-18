accionProjecet.service('commonService',function($http){
		//var commonUrl='http://192.168.1.14:4000';
		 var commonUrl=''

		this.getData=function(){
			return $http({
					  method: 'GET',
					  url: commonUrl+'/getrecords'
					}).then(function successCallback(response) {
						return response.data;
					}, function errorCallback(response) {
					    return response.data;
					});
		}

		this.addNewData=function(data){
			return $http({
					  method: 'POST',
					  url: commonUrl+'/addrecord',
					  data:data
					}).then(function successCallback(response) {
						return response.data;
					}, function errorCallback(response) {
					    return response.data;
					});
		}

		this.updateRecord=function(data){
			return $http({
					  method: 'PUT',
					  url: commonUrl+'/updaterecord',
					  data:data
					}).then(function successCallback(response) {
						return response.data;
					}, function errorCallback(response) {
					    return response.data;
					});
		}

		this.deleteRecord=function(data){
			return $http({
					  method: 'DELETE',
					  url: commonUrl+'/deleterecord',
					  data:{
					  	'id':data
					  },
					  headers:{
					  	'Content-Type': 'application/json; charset=utf-8'
					  }
					}).then(function successCallback(response) {
						return response.data;
					}, function errorCallback(response) {
					    return response.data;
					});
		}
})	
