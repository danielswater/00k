var app = angular.module('app')

var localProducts;

app.controller('ListController', function($scope, $state){
	
	$scope.loadProducts = function(){
		$scope.products = JSON.parse(localStorage.getItem('products'));
		if($scope.products !== null){
			for(var i = 0; i < $scope.products.length ; i++){				
				$scope.products[i].id = i + 1;								
			}
		}
		localStorage.setItem('products', JSON.stringify($scope.products));
	}

	$scope.loadProducts();

	$scope.deleteProduct = function(id){
		for(var i = 0; i < $scope.products.length; i++){
			if($scope.products[i].id && $scope.products[i].id == id){
				$scope.products.splice(i, 1);
			}
		}
		localProducts = [];
		localStorage.setItem('products', JSON.stringify($scope.products));
		$scope.loadProducts();
	}
})

app.controller('ProductController', function($scope, $stateParams, $filter){

	$scope.products = {};
	$scope.skus = [{label: '---- Select ----'},{id: 1, label: 'ABC'}, {id: 2, label: 'DEF'}, {id: 3, label: 'GHI'}];	
	$scope.products.sku = $scope.skus[0];

	$scope.categories = [{label: '---- Select ----'},{id: 1, label: 'Clothes'}, {id: 2, label: 'Eletronic'}, {id: 3, label: 'Dinner'}];
	$scope.products.category = $scope.categories[0];

	localProducts = localStorage.getItem("products");
	localProducts = JSON.parse(localProducts);

	if(localProducts == null){
		localProducts = [];
	}

	if($stateParams.id){		
		object = $filter('filter')(localProducts, function(d){
			return d.id == $stateParams.id;
		})[0];
		$scope.products = object;
	}

	$scope.saveProducts = function(){

		if($scope.products.id){	
			for(var i = 0; i < localProducts.length; i++){
				if(localProducts[i].id == $scope.products.id){
					localProducts[i] = $scope.products;
				}
			}
			localStorage.setItem('products', JSON.stringify(localProducts));
			$scope.products = {};
			return;
		}

		if(!$scope.products.active){
			$scope.products.active = false;
		}

		localProducts.push($scope.products);
		localStorage.setItem('products', JSON.stringify(localProducts));
		$scope.products = {};

	}

})