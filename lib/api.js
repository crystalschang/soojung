var instToken="10963451.443a6a0.8d20f76d12634d69867a736f692dd52c";


$(document).ready(function () {
  initialize();
});

function initialize(){
	getInstImages();
	//getRumgrImages();
}

function getInstImages() {
	var instUrl="https://api.instagram.com/v1/users/self/media/recent?access_token="+instToken;
	$.ajax({
		url: instUrl,
		dataType: 'jsonp',
		success: function(data) {
			showInstImages(data.data);
		}
	});
}

function showInstImages(results) {
	var instagramHtml="";

	for(var i=0; i<9; i++) {
		var result = results[i];
		var thumbnailUrl = result.images.thumbnail.url;
		var randomNum=Math.max(Math.floor(Math.random()*11),1)*500;
		instagramHtml+='<a href="'+result.link+'" target="_new"><img class="instaPic" src="'+thumbnailUrl+'" onload="$(this).fadeIn('+randomNum+');"/></a>';
		if((i+1)%3==0 && i>0) { instagramHtml += '<br>'; }
	}
	$('#instagramFeed').html(instagramHtml);
}

function getRumgrImages() {
	var rumgrUrl="http://api.rumgr.com/users/crystal/items";
	$.ajax({
		url: rumgrUrl,
		dataType: 'jsonp',
		success: function(data) {
			showRumgrImages(data.rows);
		}
	});
}

function showRumgrImages(results) {
	var rumgrHtml="";

	for(var i=0; i<10; i++) {
		var result = results[i];
		var imgs = result.images;

		for(var j=0; j<imgs.length; j++) {
			var img = imgs[i];
			if(img.type=='thumbnail'){
			var randomNum=Math.max(Math.floor(Math.random()*11),1)*500;
			rumgrHtml+='<a href="'+img.url+'" target="_new"><img class="instaPic" src="'+img.url+'" onload="$(this).fadeIn('+randomNum+');"/></a>';
			}
		}
	}
	$('#rumgrFeed').html(rumgrHtml);
}
