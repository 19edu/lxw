var overNum = 0;					// 剩余抽奖次数
var allNumber = 0;					// 所有获得锤子的个数
var allUsedNumber = 0;				// 已经使用的锤子的个数
var entryType = 1;					// 进入次数  0表示非首次/非每天首次进入 1表示首次进入  2表示每天首次进入
var startDayNum = 1;				// 活动的第几天 从1开始计算
var addNumber = 0;					// 完成任务后，或者购买了产品包之后，增加的锤子数
var taskFinished = false;			// 当天的任务是否完成 (当天最多只能获取3个锤子的任务，不允许再多了)
var sysTime = 1561535614086;		// 当前的系统时间 毫秒数
		
var curLevel = 5;					// 当前解锁了第几关，0为都没有解锁，1为第一关已经解锁，2为第二关已经解锁 ...    

// 刷新活动数据
function refreshActionData() {
	curLevel = parseInt(allUsedNumber / 3);
}

function updateMainPage()					// 刷新主界面 
{
	var i;
	$(".pagesboxes").css("display","block");
	
	// 底部的条栏
	
	for (i = 0; i < curLevel; i++)
		$("#objimg" + i).css("display", "block");
	for (i = curLevel; i < 10; i++)
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



//暑假活动初始化 
function summerVacationActionInit() {
	console.log("summerVacationActionInit()");
	var ajaxTimeoutOne = $.ajax({
		type: "POST",
		async: true,
		timeout: 5000,
		dataType: 'json',
		url: adressIp + "/building/v2/web/init",
		data: {
			"id": _actionId,
			"source": _qsource,
			"MAC": _mac,
			"cModel": _model,
			"cChip": _chip,
			"cUDID": _udid,
			"cOpenId": _openId,
			"cNickName": _nickName
		},
		success: function(data) {
			console.log(JSON.stringify(data));

			if(data.code == 50001) {
				console.log("该活动不存在");
			} else if(data.code == 50002) {
				console.log("该活动未开始");
			} else if(data.code == 50003) {
				console.log("该活动已结束");
			} else if(data.code == 50042) {
				console.log("该活动已下架");
			} else if(data.code == 50100) {
				console.log("该活动进行中+获取数据成功");
				if (data.data.overNum != undefined && data.data.overNum != null)
					overNum = data.data.overNum;
				if (data.data.allNumber != undefined && data.data.allNumber != null)
					allNumber = data.data.allNumber;
				if (data.data.allUsedNumber != undefined && data.data.allUsedNumber != null)
					allUsedNumber = data.data.allUsedNumber;
				if (data.data.entryType != undefined && data.data.entryType != null)
					entryType = data.data.entryType;
				if (data.data.startDayNum != undefined && data.data.startDayNum != null)
					startDayNum = data.data.startDayNum;
				if (data.data.addNumber != undefined && data.data.addNumber != null)
					addNumber = data.data.addNumber;
				if (data.data.taskFinished != undefined && data.data.taskFinished != null)
					taskFinished = data.data.taskFinished;
				if (data.data.sysTime != undefined && data.data.sysTime != null)
					sysTime = data.data.sysTime;
				refreshActionData();
				updateMainPage();
			}
		},
		error: function() {
			console.log("获取失败");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutOne.abort();　　　　
			}
		}
	});
}


