$scope.currentFile = '';
$scope.jobAd.companyLogo = '';
$scope.setFile = function (element) {
    $scope.currentFile = element.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        $scope.jobAd.companyLogo = event.target.result
        $scope.$apply()
    }
    // when the file is read it triggers the onload event above.
    reader.readAsDataURL(element.files[0]);
};