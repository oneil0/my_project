/*On définit la méthode de l'objet "navigator" à utiliser pour accéder à l'interface de getUserMedia appropriée
Opera --> getUserMedia
Chrome --> webkitGetUserMedia
Firefox --> mozGetUserMedia
*/

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

//on définit la contrainte à utiliser
var constraints = {
	audio : false,
	video: true
};

//on sélectionne notre balise vidéo et on la stock dans une variable
var video = document.querySelector("video");

//fonction callback à appeler en cas de succés
function successCallback(stream) {
	//on active la disponibilité au niveau de la console pour une éventuelle inspection
	window.stream = stream;

	if(window.URL) {
		// cas de chrome : URL.createObjectURL() convertis un flux média en blob URL qu'on affecte à l'élément <video></video>s
		video.src = window.URL.createObjectURL(stream);
	}else {
		// pour firefox et opera on définit la source directement au niveau du flux
		video.src = stream;	
	}

	//on a tout définit , il ne reste plus qu'à lancer la video
	video.play();
}

//fonction callback à appeler en cas d'échec
function errorCallback (stream) {
	console.log(" Erreur au niveau de navigator.getUserMedia : ", error);
}

//Main : on appelle la méthode getUserMedia de l'objet navigator
navigator.getUserMedia(constraints, successCallback, errorCallback);