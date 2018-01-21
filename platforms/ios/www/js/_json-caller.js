
function ajaxCallStart(){
	$('body').plainOverlay('show',{
		
		 progress: function() { return $('<img src="images/ajax-loader.GIF" alt="Loading icon" style="padding-left:186px;"/>'); }
		
	});
}

function ajaxCallStop(){
	$('body').plainOverlay('hide');
}

function isEmpty(value){
	  return (value == null || value.length === 0);
}



function callRestGet(url, callbackFunctionSuccess, callbackFunctionFailure,
		asynch) {
	$.mobile.loading("show");
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
		$.mobile.loading("hide");
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
				var customObject={'image':article.image,'title':article.title,'id':id,'id':id};
				articles.push(customObject);
				}else{
				var customObject={'image':article.image,'title':article.title,'id':id};
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
				
				$.mobile.defaultPageTransition = "slide";
			var swiper = new Swiper('.swiper-container');
			



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