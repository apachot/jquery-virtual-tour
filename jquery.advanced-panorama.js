/* =========================================================
// jquery.advanced-panorama.js
// Author: OpenStudio (Arnault PACHOT)
// Mail: apachot@openstudio.fr
// Web: http://www.openstudio.fr
// Copyright (c) 2008 Arnault Pachot
// licence : GPL
========================================================= */
(function($) {
	$.fn.advancedpanorama = function(options) {
		this.each(function(){ 
			var settings = {
				viewport_width: 600,
				speed: 20000,
				direction: 'left',
				control_display: 'auto',
				start_position: 0
			};
			var panoViewport = $(this);
			var panoContainer = panoViewport.find('.panorama-container');
			var panoImg = panoContainer.find('img');
			var imgTitle = panoImg.attr('title');
			if (!imgTitle)
				imgTitle = panoImg.attr('alt');
			
			var panoImgWidth = parseInt(panoImg.attr('width'));
			var mapId = panoImg.attr('usemap');
			var areaId = 0;
						
			$('map[name='+mapId+']').find('area').each(
				function() {
					switch ($(this).attr("shape").toLowerCase()) {
						case 'rect' : 	
								var areacoord = $(this).attr("coords");
								var areaalt = $(this).attr("alt");
								if (areaalt != '') {
									areaalt = areaalt.replace("'", "&#146;");
									areaalt = areaalt.replace('"', '&quot;');
									
								}
								var areaclass = $(this).attr("class");
								if (areaclass != '')
									areaclass = " "+areaclass;
								var areahref = $(this).attr("href");
								var areacoordArray = coords_fill(areacoord);
								panoContainer.append("<a class='panorama-area area"+areaId+areaclass+"' style='position: absolute; left: "+areacoordArray[0]+"px; top: "+areacoordArray[1]+"px; width: "+(areacoordArray[2]-areacoordArray[0])+"px; height: "+(areacoordArray[3]-areacoordArray[1])+"px;' onmouseover='javascript:area_hover("+areaId+")' onmouseout='javascript:area_out("+areaId+")' href='"+areahref+"' title='"+areaalt+"'>&nbsp;</a>"); 
								panoContainer.append("<a class='panorama-area area"+areaId+areaclass+"' style='position: absolute; left: "+(panoImgWidth+parseInt(areacoordArray[0]))+"px; top: "+areacoordArray[1]+"px; width: "+(areacoordArray[2]-areacoordArray[0])+"px; height: "+(areacoordArray[3]-areacoordArray[1])+"px;' onmouseover='javascript:area_hover("+areaId+")' onmouseout='javascript:area_out("+areaId+")' href='"+areahref+"' title='"+areaalt+"'>&nbsp;</a>"); 
								areaId++;
								break;
						case 'circle' :  break;
						case 'poly' :  break;
					}
				}).remove();	
			panoContainer.find('a.panorama-area').bind('click', function(){
				$(panoContainer).stop();
			});
			if (imgTitle) {
				panoViewport.append("<p class='flipv panorama-title'>"+imgTitle+"</p>");
			}		
			
		});
	};


$(document).ready(function(){
	$(".panorama-viewport").advancedpanorama();
});


})(jQuery);

function coords_fill(mycoords) {
	var position1=0;
	var position2=0;

	var tabresult = new Array();
	while ((position2 = mycoords.indexOf(',', position1)) >= 0) {
		tabresult.push(mycoords.substring(position1, position2));
		position1 = position2+1;
		position2 = position1+1;
	}
	tabresult.push(mycoords.substring(position1));
		
	return tabresult;
}
function area_hover(areaId) {
	$('.area'+areaId).addClass('panorama-area-hover').addClass('area'+areaId+'-hover');
}
function area_out(areaId) {
	$('.area'+areaId).removeClass('panorama-area-hover').removeClass('area'+areaId+'-hover');
}
