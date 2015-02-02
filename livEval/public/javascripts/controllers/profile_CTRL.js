(function() {
	var AdminDashboard = angular.module('AdminDashboard', []);

	AdminDashboard.controller('ProfileCTRL', function($scope,$http){
		$scope.range = function(min, max, step){
		    step = step || 1;
		    var input = [];
		    for (var i = min; i <= max; i += step) input.push(i);
		    return input;
		  };
		  $scope.UpdUser = {};

		$scope.RenderUsersList = function(response) {
			$scope.Userslist = response;
		};
		$scope.RenderStudentsList = function(response) {
			$scope.etudiantList = response;
		};

		$scope.createUser = function() {
			$http.post('/users/createUser', $scope.newUser)
			.success(function(response) {
				$scope.AllUsers();
				$scope.created = true;
				$scope.newUser = {};
			});
		};
		$scope.updateUser = function() {
			console.log($scope.UpdUser);
		};
		
		$scope.AllUsers = function() {
			$http.get('/users/UsersList')
			.success($scope.RenderUsersList);
		};

		$scope.RemoveUser = function(id) {
			$http.delete('/users/deleteUser/'+id)
			.success($scope.AllUsers());
		};

		$scope.StudentUsers = function() {
			$http.get('/users/StudentsList')
			.success($scope.RenderStudentsList)
		};
		$scope.ProfAddStudent = function(id) {
			$http.post('/users/AddStudent')
			.success($scope.StudentUsers());
		}; 

		$scope.StudentUsers();
		$scope.AllUsers();
	});

})();			