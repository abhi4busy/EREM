
function ajaxCallStart(){
    $.mobile.loading('show', {
    text: 'foo',
    textVisible: true,
    theme: 'a',
    html: "<div class='newloading'><div class='loadingtable'><div class='loadingcell'><div class='loadingbox'><img src='images/loading.svg' /></div></div></div></div>"
  });
    

}

function ajaxCallStop(){
	  $.mobile.loading( "hide" );
}

function isEmpty(value){
	  return (value == null || value.length === 0);
}



function callRestGet(url, callbackFunctionSuccess, callbackFunctionFailure,
		asynch) {
	ajaxCallStart();
	if (isEmpty(asynch)) {
		asynch = true;
	}

	$.ajax({
		type : 'GET',		
		url : url,
		async : asynch,
		complete : function(result, textStatus) {
			if (result.status === 200) {
				if (callbackFunctionSuccess != null) {
					callbackFunctionSuccess(result);
				}
			} else {
				if (callbackFunctionFailure != null) {
					callbackFunctionFailure(result, textStatus);
				} else {
					var errorContainer = $('div#retrievalFailure');
					defaultFormErrorHandler(result, errorContainer);
				}
			}
		ajaxCallStop();
		}
	});
}



function defaultFormErrorHandler(result, errorContainer,formEle) {
	var errorInfo = {};
	var template = $('#genericErrorTpl').html();

	message = "Internal server error, Please try again.";
	errorInfo['message'] = message;
		
	var html = Mustache.to_html(template, errorInfo);
	if (!errorContainer) {
		errorContainer = $('div#error');
	}
	$(errorContainer).html(html);
	$(errorContainer).show();
}


function displayFormSuccess(message) {
	var html = '<ul><li>' + message + '</li></ul>';
	$('#formSuccess').html(html);
}

function setupArticalDetail(){
var url='http://www.eremnews.com/syndication/mobile/politics.json';


document.addEventListener("offline", onOffline, false);

function onOffline() {
	$('body').find('div#offline').show()
	return false;
}
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
	);
}
function articalDetails(data) {
var articles=new Array();
var articleData=new Array();

$.each(data.articles, function( index, article ) {
				var id='article'+index;
				var next=parseInt(index)+1;
				var prv=parseInt(index)-1;
				var idPrv='article'+prv;
				var idNext='article'+next;
				var menuId='menu'+index;
				if(index <5){
				var customObject={'image':article.image,'title':article.title,'id':id,'idNext':idNext,'idPrv':idPrv};
				articles.push(customObject);
				}else{
				var pubDate = new Date(article.published);
				var date = pubDate.getFullYear()+'-'+pubDate.getMonth()+'-'+pubDate.getDate()+' '+pubDate.getHours()+':'+pubDate.getMinutes()+':'+pubDate.getSeconds();
				var customObject={'image':article.image,'title':article.title,'summary':article.summary,'date':date,'id':id};
				articleData.push(customObject);
				}
				article['id']=id;
				article['idNext']=idNext;
				article['menuId']=menuId;
				article['idPrv']=idPrv;
		});
		var articleSliderData={'articles':articles};
		var articleListData={'articles':articleData};
				var sliderTemplate = $('#sliderDivTmp').html();
				var html = Mustache.to_html(sliderTemplate,articleSliderData);
				$('#sliderDiv').html(html);
				
				var articleListTemplate = $('#articleDivTmp').html();
				var articleListHtml = Mustache.to_html(articleListTemplate,articleListData);
				$('#content').html(articleListHtml);
				
				var pageDivTemplate = $('#pageDivTmp').html();
				var articleListHtml = Mustache.to_html(pageDivTemplate,data);
				$('body').append(articleListHtml);
				
				$.mobile.defaultPageTransition = "fade";
				//var swiper = new Swiper('.swiper-container');
			(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=279430378757286";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
var swiper = new Swiper('.swiper-container', {
	pagination: '.swiper-pagination',
	paginationClickable: true,
});		


$('body').on("click", "#articalDetails", function(event) {
		var currentId=$(this).data('id');
		var currentDiv=$('body').find('input#currentDiv').val();
		$('body').find('div#'+currentDiv).css('display','none');
		$('body').find("div#"+currentId).css('display','block');
		$('body').find('input#currentDiv').val("7");
		window.scrollTo(500, 0);
		currentDiv=currentId;
	});
	
}


function setupSportsDetails(){
var url='http://www.eremnews.com/syndication/mobile/sports.json';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
	);
}

function setupEconomyDetails(){
var url='http://www.eremnews.com/syndication/mobile/business.json';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
	);
}

function setupArtandcultureDetails(){
var url='http://www.eremnews.com/syndication/mobile/arts-culture.json';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
	);
}



function setupLifestyleDetails(){
var url='http://www.eremnews.com/syndication/mobile/lifestyle.json';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
	);

}

function setupScienceTechnologyDetails(){
var url='http://www.eremnews.com/syndication/mobile/science-technology.json';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
	);
}

function setupEntertainmentDetails(){
var url='http://www.eremnews.com/syndication/mobile/entertainment.json';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
	);
}

function setupMultimediaDetails(){
var url='http://www.eremnews.com/syndication/mobile/multimedia.json';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
	);
}
