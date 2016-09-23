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


.controller('PianoCtrl', function($scope, $cordovaVibration) {
  $scope.boton = function(Pboton){
    /*if($scope.responded == 0){
      if($scope.pregunta[$scope.indice].verdad == boton){
        //sonido    
        try{
          window.plugins.NativeAudio.play( 'success' );
        }catch(e){
          alert("Error Sonido success");
        }
        //vibrar
        try{
        // Vibrate 100ms
          $cordovaVibration.vibrate(100);
        } catch(e){
          alert("Error vibrar");
        }
        
      }else{
        //sonido
        try{
          window.plugins.NativeAudio.play( 'fail' );
        }catch(e){
          alert("Error Sonido fail");
        }
        //vibrar
        try{
          $cordovaVibration.vibrate(1000);
          setTimeout(function(){ $cordovaVibration.vibrate(0); }, 100);
          setTimeout(function(){ $cordovaVibration.vibrate(100); }, 200);
        } catch(e){
          alert("Error vibrar");
        }    
        
      }
    }*/
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
        document.getElementById("bt1").style = "border: 2px solid #ffffff";
        sonido = 'genji';
        break;
      case 2:
        document.getElementById("bt2").style = "border: 2px solid #ffffff";
        sonido = 'phara';
        break;
      case 3:
        document.getElementById("bt3").style = "border: 2px solid #ffffff";
        sonido = '76';
        break;
      case 4:
        document.getElementById("bt4").style = "border: 2px solid #ffffff";
        sonido = 'hanzo';
        break;
      case 5:
        document.getElementById("bt5").style = "border: 2px solid #ffffff";
        sonido = 'widow';
        break;
      case 6:
        document.getElementById("bt6").style = "border: 2px solid #ffffff";
        sonido = 'dva';
        break;
      case 7:
        document.getElementById("bt7").style = "border: 2px solid #ffffff";
        sonido = 'zarya';
        break;
      case 8:
        document.getElementById("bt8").style = "border: 2px solid #ffffff";
        sonido = 'mercy';
        break;
      case 9:
        document.getElementById("bt9").style = "border: 2px solid #ffffff";
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

  $scope.nPregunta = function(){
    //CAMBIAR PREGUNTA
    var ind = Math.floor((Math.random() * 3));
    //var oldInd = $scope.indice;
    //NO ELEGIR LA MISMA PREGUNTA EN LA QEU SE ESTÁ
    while(ind == $scope.indice){
      ind = Math.floor((Math.random() * 3)); 
    }
    //NO CAMBIAR PREGUNTA SI NO SE RESPONDIÓ
    if($scope.responded == 1){
      $scope.responded = 0;
      $scope.indice = ind;
    }
    //RESTAURAR COLOR Y TAMAÑO/ELIMINAR FOOTER
    document.getElementById("pregg").className = "card slidein";
    document.getElementById("bt1").className = "button button-block button-stable slidein";
    document.getElementById("bt2").className = "button button-block button-stable slidein";
    document.getElementById("bt3").className = "button button-block button-stable slidein";
    document.getElementById("bt1").style = " ";
    document.getElementById("bt2").style = " ";
    document.getElementById("bt3").style = " ";
    document.getElementById("texto").innerHTML  = "";
    document.getElementById("texto").className = "";
  }
})


/**.controller('PianoCtrl', function($scope, $stateParams) {
})

.controller('ImgCrtl', function($scope, $stateParams) {
})*/

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
