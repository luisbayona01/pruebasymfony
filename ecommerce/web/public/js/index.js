var app = angular.module("myApp", [], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
})
var urlglobal = "http://localhost:8000"

app.controller("myCtrl", function ($scope, $http) {

    $scope.categorys = function () {
        var url = urlglobal + "/showcategories";
        $http.get(url)
                .then(function (response) {

                    $scope.category = response.data;
                    angular.element(document).ready(function () {
                        dTable = $('#user_table')
                        dTable.DataTable();

                    });
                });

    }
    $('#codigo').on('input', function (e) {
        if (!/^[a-z0-9áéíóúüñ]*$/i.test(this.value)) {
            alert('solo se permiten letras y o numeros ')
            this.value = this.value.replace(/[^ a-z0-9áéíóúüñ]+/ig, "");
        }
    })




    $scope.RegisterCategory = function () {
   
        if ($("#Nombre").val().length < 2) {
            alert('el nombre debe  contener almenos dos caracteres')
            return false
        }
        if ($("#codigo").val() == "") {
            alert('el  campo codigo es requerido')
            return false
        }
        if ($("#Nombre").val() == "") {
            alert('el campo nombre es requerido')
            return false
        }
        if ($("#description").val() == "") {
            alert('el campo description es requerido')
            return false
        }
        var url = urlglobal + "/savecategory";
        var parametros = $("#registercategory").serialize();
        $http({
            method: 'POST',
            url: url,
            data: parametros,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            // set the headers so angular passing info as form data (not request payload)
        }).success(function (response) {
            alert(response);

            $("#registercategory")[0].reset();
            location.reload();
        })



    }
    $scope.updatecategory = function (id) {
//alert(id);

        var url = urlglobal + "/showedit";
        var parametros = $.param({'id': id});
        $http({
            method: 'POST',
            url: url,
            data: parametros,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            // set the headers so angular passing info as form data (not request payload)
        }).success(function (response) {
            $("#myModal2").modal();
            $("#contend").html(response);
            $("#codigoedit").on('input', function (e) {
                if (!/^[a-z0-9áéíóúüñ]*$/i.test(this.value)) {
                    alert('solo se permiten letras y o numeros ')
                    this.value = this.value.replace(/[^ a-z0-9áéíóúüñ]+/ig, "");
                }
            })

        })


    }

    $scope.Updatecategorys = function () {
        if ($("#NombreE").val().length < 2) {
            alert('el nombre debe  contener almenos dos caracteres')
            return false
        }
        if ($("#codigoedit").val() == "") {
            alert('el  campo codigo es requerido')
            return false
        }

        if ($("#descriptionE").val() == "") {
            alert('el campo description es requerido')
            return false
        }
        var url = urlglobal + "/updatecategory";
        var parametros = $("#editcategory").serialize();
        $http({
            method: 'POST',
            url: url,
            data: parametros,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            // set the headers so angular passing info as form data (not request payload)
        }).success(function (response) {
            alert(response);
            location.reload();
            //$("#registercategory")[0].reset();
            //$scope.categorys();   
        })



    }

    $scope.deletecategory = function (id) {
        var txt;
        var url = urlglobal + "/deletecategory";
        var r = confirm(" desea eliminar el registro!");
        if (r == true) {
            var parametros = $.param({"id": id});
        } else {
            txt = "";
            return false;
        }
        $http({
            method: 'POST',
            url: url,
            data: parametros, //this.formData,  // pass in data as strings
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            // set the headers so angular passing info as form data (not request payload)
        }).success(function (response) {
            alert(response);

            //$("#registercategory")[0].reset();
            location.reload();
        })



    }

    $scope.categorysactive = function () {

        var url = urlglobal + "/showactivecategory";
        $http.get(url)
                .then(function (response) {
                    //console.log(response.data) 
                    $scope.activecategory = response.data;
                    //console.log($scope.activecategory)
                });


    }
    $scope.products = function () {
        var url = urlglobal + "/show";
        $http.get(url)
                .then(function (response) {

                    $scope.product = response.data;
                    angular.element(document).ready(function () {
                        dTable = $('#products')
                        dTable.DataTable();

                    });
                });

    }

    $('#Pcodigo').on('input', function (e) {
        if (!/^[a-z0-9áéíóúüñ]*$/i.test(this.value)) {
            alert('solo se permiten letras y o numeros ')
            this.value = this.value.replace(/[^ a-z0-9áéíóúüñ]+/ig, "");
        }
    })
    
     //$("#Pprice")
     $('#Pprice').on('input', function (e) {
        if (!/^[ 0-9]*$/i.test(this.value)) {
        alert(" solo se permiten numeros ")
        this.value = this.value.replace(/[^ 0-9]+/ig,"");
    } 
    })
    $scope.Registerproducto = function () {
   
        if ($("#PNombre").val().length < 4) {
            alert('el nombre debe  contener almenos cuatro caracteres')
            return false
        }
        if ($("#Pcodigo").val().length < 4) {

            alert("campo")
            return false
        }
        if (document.getElementById("Pcodigo").value.length > 10) {

            alert("campo2")
            return false
        }


        if ($("#Pcodigo").val() == "") {
            alert("campo codigo  es requerido")
            return false
        }
        if ($("#PNombre").val() == "") {
            alert("campo nombre requerido")
            return false
        }
        if ($("#Pdescripcion").val() == "") {
            alert("campo  descripcion requerido")
            return false
        }
        if ($("#Pmarca").val() == "") {
            alert("campo  marca requerido")
            return false
        }
        if ($("#category").val() == "") {
            alert("campo categoria requerido")
            return false
        }
        if ($("#Pprice").val() == "") {
            alert("campo  precio requerido")
            return false
        }
      var url = urlglobal + "/registerproduct";
        var parametros = $("#registerproduct").serialize();
        $http({
            method: 'POST',
            url: url,
            data: parametros,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            // set the headers so angular passing info as form data (not request payload)
        }).success(function (response) {
            alert(response);

            $("#registerproduct")[0].reset();
            location.reload();
        })
    }
    
   $scope.updateproductos = function (id) {
//alert(id);

        var url = urlglobal + "/showupdate";
        var parametros = $.param({'id': id});
        $http({
            method: 'POST',
            url: url,
            data: parametros,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            // set the headers so angular passing info as form data (not request payload)
        }).success(function (response) {
            $("#myModal2").modal();
            $("#contend").html(response);
            $("#codigoE").on('input', function (e) {
                if (!/^[a-z0-9áéíóúüñ]*$/i.test(this.value)) {
                    alert('solo se permiten letras y o numeros ')
                    this.value = this.value.replace(/[^ a-z0-9áéíóúüñ]+/ig, "");
                }
            })
        $('#PpriceE').on('input', function (e) {
        if (!/^[ 0-9]*$/i.test(this.value)) {
        alert(" solo se permiten numeros ")
        this.value = this.value.replace(/[^ 0-9]+/ig,"");
    } 
    }) 
           
        })


    } 
    
    $scope.UpdateP=function(){
        if ($("#NombreE").val().length < 4) {
            alert('el nombre debe  contener almenos cuatro caracteres')
            return false
        }
        if ($("#codigoE").val().length < 4) {

            alert("campo")
            return false
        }
        if (document.getElementById("codigoE").value.length > 10) {

            alert("campo2")
            return false
        }


        if ($("#codigoE").val() == "") {
            alert("campo codigo  es requerido")
            return false
        }
        if ($("#NombreE").val() == "") {
            alert("campo nombre requerido")
            return false
        }
        if ($("#descripcionE").val() == "") {
            alert("campo  descripcion requerido")
            return false
        }
        if ($("#PmarcaE").val() == "") {
            alert("campo  marca requerido")
            return false
        }
        
        if ($("#PpriceE").val() == "") {
            alert("campo  precio requerido")
            return false
        }
      var url = urlglobal + "/Updateproducts";
        var parametros = $("#editproducts").serialize();
        $http({
            method: 'POST',
            url: url,
            data: parametros,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            // set the headers so angular passing info as form data (not request payload)
        }).success(function (response) {
            alert(response);

            $("#editproducts")[0].reset();
           location.reload();
        })
        
    }
    
     $scope.deleteproductos = function (id) {
        var txt;
        var url = urlglobal + "/deleteproducts";
        var r = confirm(" desea eliminar el registro!");
        if (r == true) {
            var parametros = $.param({"id": id});
        } else {
            txt = "";
            return false;
        }
        $http({
            method: 'POST',
            url: url,
            data: parametros, //this.formData,  // pass in data as strings
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            // set the headers so angular passing info as form data (not request payload)
        }).success(function (response) {
            alert(response);

            //$("#registercategory")[0].reset();
            location.reload();
        })



    }
    
    
    $scope.products();
    $scope.categorys();
    $scope.categorysactive();
})