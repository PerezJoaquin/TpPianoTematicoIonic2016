angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //TRAER USUARIOS
    $scope.usuarios = [];
    var messagesRef = new Firebase('https://mifirebase-2c106.firebaseio.com/trivia/usuarios/');
    messagesRef.on('value', function (snapshot) { 
      var message = snapshot.val();
      for(var index in message) { 
         if (message.hasOwnProperty(index)) {
             var attr = message[index];
             $scope.usuarios.push(attr);
         }
      }
    });
})

.controller('Login', function($scope, $rootScope) {
  $scope.doLogin = function() {
    var usu = document.getElementById("usuario").value.toLowerCase();
    console.log(usu);
    $scope.loged = 0;
    $scope.usuarios.forEach(function(item, index) {
      console.log(item);
      if(item.nombre == usu && $scope.loged == 0){
        $scope.loged = 1;
      }
    });
    if($scope.loged == 1){
      $scope.logusu = usu;
      document.getElementById("LogedUsu").className = "card";
      document.getElementById("LogedUsu").innerHTML  = "<center><h4>Usuario Actual: " + usu + "</h4></center>";
      $rootScope.Loged = 1;
      $rootScope.LogedUsu = usu;
      console.log($rootScope);
    }else{
      alert("Usuario incorrecto. Intente otra vez");
    }
  };
})

.controller('CargarTrivia', function($scope) {
  
})


.controller('PianoCtrl', function($scope, $cordovaVibration, $cordovaFile) {
  $scope.ini = 0;
  $scope.boton = function(Pboton){
    if($scope.ini == 0){ 
      $scope.secuencia = [];
      $scope.ini = 1;
    }
    $scope.secuencia.push(Pboton);
    console.log($scope.secuencia);
    
    //OUTLINE EN BOTON PRESIONADO
    document.getElementById("bt1").style = " ";
    document.getElementById("bt2").style = " ";
    document.getElementById("bt3").style = " ";
    document.getElementById("bt4").style = " ";
    document.getElementById("bt5").style = " ";
    document.getElementById("bt6").style = " ";
    document.getElementById("bt7").style = " ";
    document.getElementById("bt8").style = " ";
    document.getElementById("bt9").style = " ";
    var sonido;
    switch(Pboton){
      case 1:
        document.getElementById("bt1").style = "border: 2px solid #e60000;";
        sonido = 'genji';
        break;
      case 2:
        document.getElementById("bt2").style = "border: 2px solid #e60000;";
        sonido = 'phara';
        break;
      case 3:
        document.getElementById("bt3").style = "border: 2px solid #e60000;";
        sonido = '76';
        break;
      case 4:
        document.getElementById("bt4").style = "border: 2px solid #e60000;";
        sonido = 'hanzo';
        break;
      case 5:
        document.getElementById("bt5").style = "border: 2px solid #e60000;";
        sonido = 'widow';
        break;
      case 6:
        document.getElementById("bt6").style = "border: 2px solid #e60000;";
        sonido = 'dva';
        break;
      case 7:
        document.getElementById("bt7").style = "border: 2px solid #e60000;";
        sonido = 'zarya';
        break;
      case 8:
        document.getElementById("bt8").style = "border: 2px solid #e60000;";
        sonido = 'mercy';
        break;
      case 9:
        document.getElementById("bt9").style = "border: 2px solid #e60000;";
        sonido = 'zenyatta';
        break;
    }
    //SONIDO Y VIBRACION
    try{
      window.plugins.NativeAudio.play(sonido);
    }catch(e){
      console.log("Error Sonido " + sonido);
    }
    try{
      $cordovaVibration.vibrate(100);
    } catch(e){
      console.log("Error vibrar");
    }
    //GUARDAR ARCHIVO  
  }

  $scope.guarSec = function(){
    try{
      var secuencia = $scope.secuencia.toString();
      $cordovaFile.writeFile(cordova.file.dataDirectory, "secuencia.txt", secuencia, true)
      .then(function (success) {
        //alert("creado y escrito");
        alert(secuencia);
        $scope.ini = 0;
      }, function (error) {
        alert("error escritura");
      });
    }catch(e){
      console.log("No es dispositivo movil. No se escribió archivo");
    }
  
  }

  $scope.repSec = function(){
    /*$scope.secuencia.forEach(function(item, index){
      console.log(item);
    });*/
    $cordovaFile.readAsText(cordova.file.dataDirectory, "secuencia.txt")
    .then(function (success) {
      //alert(JSON.stringify(leido.$$state));
      alert(success);
      var secArray = success.split(',');
      secArray.forEach(function(item, index){
        var sonido;
        //setTimeout(function () {
          switch(item){
            case 1:
              document.getElementById("bt1").style = "border: 2px solid #e60000;";
              sonido = 'genji';
              break;
            case 2:
              document.getElementById("bt2").style = "border: 2px solid #e60000;";
              sonido = 'phara';
              break;
            case 3:
              document.getElementById("bt3").style = "border: 2px solid #e60000;";
              sonido = '76';
              break;
            case 4:
              document.getElementById("bt4").style = "border: 2px solid #e60000;";
              sonido = 'hanzo';
              break;
            case 5:
              document.getElementById("bt5").style = "border: 2px solid #e60000;";
              sonido = 'widow';
              break;
            case 6:
              document.getElementById("bt6").style = "border: 2px solid #e60000;";
              sonido = 'dva';
              break;
            case 7:
              document.getElementById("bt7").style = "border: 2px solid #e60000;";
              sonido = 'zarya';
              break;
            case 8:
              document.getElementById("bt8").style = "border: 2px solid #e60000;";
              sonido = 'mercy';
              break;
            case 9:
              document.getElementById("bt9").style = "border: 2px solid #e60000;";
              sonido = 'zenyatta';
              break;
          }
          try{
            window.plugins.NativeAudio.play(sonido);
          }catch(e){
            console.log("Error Sonido " + sonido);
          }
          try{
            $cordovaVibration.vibrate(100);
          } catch(e){
            console.log("Error vibrar");
          }
       // }, 4000);
      });
    }, function (error) {
      alert("Error lectura");
    });
  }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
