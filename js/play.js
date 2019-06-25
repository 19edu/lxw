
var _curLevel = 5;				// 当前解锁了第几关，0为都没有解锁，1为第一关已经解锁，2为第二关已经解锁 ...    


function updateMainPage()					// 刷新主界面 
{
	var i;
	// 底部的条栏
	
	for (i = 0; i < _curLevel; i++)
		$("#objimg" + i).css("display", "block");
	for (i = _curLevel; i < 10; i++)
		$("#objice" + i).css("display", "block");
		

	
	//$("#objlck4").removeClass("noshow");
	//$("#objlck4").addClass("show");
	
	/*
	map = new coocaakeymap($(".coocaa_btn"), 
		$(".level:eq(" + rememberMapFocus + ")"), 
		"btnFocus", 
		function() {}, 
		function(val) {}, 
		function(obj) {}
	);
	*/
   map = new coocaakeymap($(".coocaa_btn"), "#mainpageButton2", "btn-focus", function() {}, function(val) {}, function(obj) {});
   
}

