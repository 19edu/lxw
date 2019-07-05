var overNum = 0;					// 剩余抽奖次数
var allNumber = 0;					// 所有获得锤子的个数
var allUsedNumber = 0;				// 已经使用的锤子的个数
var entryType = 0;					// 进入次数  0表示非首次/非每天首次进入 1表示首次进入  2表示每天首次进入
var startDayNum = 1;				// 活动的第几天 从1开始计算
var addNumber = 0;					// 完成任务后，或者购买了产品包之后，增加的锤子数
var taskFinished = false;			// 当天的任务是否完成 (当天最多只能获取3个锤子的任务，不允许再多了)
var sysTime = 1561535614086;		// 当前的系统时间 毫秒数
var userKeyId = "0";				// 用户唯一标识,init接口返回
var lotteryToken = "";				// 抽奖用的token
var alltasks = new Array();			// 任务数组

var curLevel = 5;					// 当前解锁了第几关，0为都没有解锁，1为第一关已经解锁，2为第二关已经解锁 ...    


function empty0() {}
function empty1(value) {}

// 刷新活动数据
function refreshActionData() {
	curLevel = parseInt(allUsedNumber / 3);
}

function updateMainPage()					// 刷新主界面 
{
	console.log("updateMainPage()");
	
	var i;
	var honorBackgroundId;
	
	// 主页背景
	$(".pagesboxes").css("display","block");
	
	// 底部的条栏
	for (i = 0; i < curLevel; i++)
		$("#objimg" + i).css("display", "block");
	for (i = curLevel; i < 10; i++)
		$("#objice" + i).css("display", "block");
		
	// 勋章背景
	honorBackgroundId = curLevel;
	if (honorBackgroundId > 9)
		honorBackgroundId = 9;
	$("#honorBlock").css("background-image", "url(images/honor" + honorBackgroundId + ".png)");

	disappearAllDialog();
	
	if (entryType == 1)				// 如果是用户第一次进入该活动,则弹出提示框，然后退出
	{
		showFirstInDialog();
		return;
	}
	
	
	
	/*
	map = new coocaakeymap($(".coocaa_btn"), 
		$(".level:eq(" + rememberMapFocus + ")"), 
		"btnFocus", 
		function() {}, 
		function(val) {}, 
		function(obj) {}
	);
	*/
   map = new coocaakeymap($(".coocaa_btn"), "#mainpageButton2", "btn-focus", empty0, empty1, empty1);
   
   
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
				if (allNumber > 30)
					allNumber = 0;
				if (data.data.allUsedNumber != undefined && data.data.allUsedNumber != null)
					allUsedNumber = data.data.allUsedNumber;
				if (allUsedNumber > 30)
					allUsedNumber = 0;
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
				if (data.data.userKeyId != undefined && data.data.userKeyId != null)
					userKeyId = data.data.userKeyId;
				if (data.data.token != undefined && data.data.token != null)
					lotteryToken = data.data.token;
				
				// 获取任务列表
				getUserTaskList();
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

// 获取用户任务列表
function getUserTaskList() {
	console.log("getUserTaskList()");
	var ajaxTimeoutOne = $.ajax({
		type: "POST",
		async: true,
		timeout: 5000,
		dataType: 'json',
		url: adressIp + "/building/v2/web/user-task-result-list",
		data: {
			"id": _actionId,
			"userKeyId" : userKeyId,
			"source": _qsource
		},
		success: function(data) {
			//console.log(JSON.stringify(data));
	
			if(data.code == 50001) {
				console.log("该活动不存在");
			} else if(data.code == 50002) {
				console.log("该活动未开始");
			} else if(data.code == 50003) {
				console.log("该活动已结束");
			} else if(data.code == 50042) {
				console.log("该活动已下架");
			} else if(data.code == 50013) {
				console.log("该业务尚未开通此服务");
			} else if(data.code == 50100) {
				console.log("获取任务列表成功");
				if (data.data.tasks != undefined) {
					alltasks = new Array();
					var tasknum, taskidx;
					if (data.data.tasks.length < 30) {
						console.log("任务数量不够，后台配置错误。");
						tasknum = data.data.tasks.length;
					} else {
						tasknum = 30;
					}
					
					for (taskidx = 0; taskidx < tasknum; taskidx++) {
						alltasks[taskidx] = data.data.tasks[taskidx];
						console.log("task" + taskidx + ": " + JSON.stringify(alltasks[taskidx]));
					}
					
				}
				
				refreshActionData();
				updateMainPage();
				//
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


// 游戏规则页面是否在显示
function isRolePageShow() {
	if ($("#gamerole").css("display") == "block")
		return true;
	else
		return false;
}

function showRolePage() {
	$("#gamerole").css("display", "block");
}

function disappearRolePage() {
	$("#gamerole").css("display", "none");
}

// 任务页面是否在显示
function isTasksPageShow() {
	if ($("#tasksPage").css("display") == "block")
		return true;
	else
		return false;
}

function showTasksPage() {
	// 如果当天已经获得了3把锤子，也就是当天任务已经做完，则不能再进入任务界面了，这时，就要弹出提示框
	if (taskFinished) {
		console.log("当天已经获得了3把锤子");
		showHaveGot3Dialog();
	}
	else {
		showTasksPageInt();
	}
}
		
function showTasksPageInt() {
	// 拥有的锤子数，除以3，得到当前需要做第几关的任务
	var gate = parseInt(allNumber / 3);
	var task0Idx = gate * 3 + 0;
	var task1Idx = gate * 3 + 1;
	var task2Idx = gate * 3 + 2;
	console.log("gate = " + gate + ", task0Idx = " + task0Idx + ", task1Idx = " + task1Idx + ", task2Idx = " + task2Idx);
	
	if (task0Idx < alltasks.length) {
		document.getElementById("taskName0").innerHTML = alltasks[task0Idx].taskName;
		document.getElementById('taskimg0').src = alltasks[task0Idx].imgUrl;
	}
	
	if (task1Idx < alltasks.length) {
		document.getElementById("taskName1").innerHTML = alltasks[task1Idx].taskName;
		document.getElementById('taskimg1').src = alltasks[task1Idx].imgUrl;
	}
	
	if (task2Idx < alltasks.length) {
		document.getElementById("taskName2").innerHTML = alltasks[task2Idx].taskName;
		document.getElementById('taskimg2').src = alltasks[task2Idx].imgUrl;
	}
	
	$("#taskimg0").css("display", "block");
	$("#taskimg1").css("display", "block");
	$("#taskimg2").css("display", "block");
	
	if (alltasks[task0Idx].remainingNumber == 0) {			// task已经完成
		document.getElementById("taskState0").innerHTML = "已完成";
		$("#taskgo0").css("display", "none");
		$("#taskdone0").css("display", "block");
		$("#taskHammer0").css("display", "block");
		$("#taskHammerLock0").css("display", "none");
		$("#taskGotText0").css("display", "block");
	}
	else {
		document.getElementById("taskState0").innerHTML = "按“确认”键即可";
		$("#taskgo0").css("display", "block");
		$("#taskdone0").css("display", "none");
		$("#taskHammer0").css("display", "none");
		$("#taskHammerLock0").css("display", "block");
		$("#taskGotText0").css("display", "none");
	}
	
	if (alltasks[task1Idx].remainingNumber == 0) {			// task已经完成
		document.getElementById("taskState1").innerHTML = "已完成";
		$("#taskgo1").css("display", "none");
		$("#taskdone1").css("display", "block");
		$("#taskHammer1").css("display", "block");
		$("#taskHammerLock1").css("display", "none");
		$("#taskGotText1").css("display", "block");
	}
	else {
		document.getElementById("taskState1").innerHTML = "按“确认”键即可";
		$("#taskgo1").css("display", "block");
		$("#taskdone1").css("display", "none");
		$("#taskHammer1").css("display", "none");
		$("#taskHammerLock1").css("display", "block");
		$("#taskGotText1").css("display", "none");
	}
	
	if (alltasks[task2Idx].remainingNumber == 0) {			// task已经完成
		document.getElementById("taskState2").innerHTML = "已完成";
		$("#taskgo2").css("display", "none");
		$("#taskdone2").css("display", "block");
		$("#taskHammer2").css("display", "block");
		$("#taskHammerLock2").css("display", "none");
		$("#taskGotText2").css("display", "block");
	}
	else {
		document.getElementById("taskState2").innerHTML = "按“确认”键即可";
		$("#taskgo2").css("display", "block");
		$("#taskdone2").css("display", "none");
		$("#taskHammer2").css("display", "none");
		$("#taskHammerLock2").css("display", "block");
		$("#taskGotText2").css("display", "none");
	}
	
	$("#tasksPage").css("display", "block");
	
	map = new coocaakeymap($(".coocaa_btn3"), "#taskEnter", "btn-focus", empty0, empty1, empty1);
}

function disappearTasksPage() {
	$("#tasksPage").css("display", "none");
}

// 去做任务 
function gotoDoTask(){
	console.log("gotoDoTask()");
	// 拥有的锤子数，除以3，得到当前需要做第几关的任务
	var gate = parseInt(allNumber / 3);
	var task0Idx = gate * 3 + 0;
	var task1Idx = gate * 3 + 1;
	var task2Idx = gate * 3 + 2;
	var curIdx;
	if (alltasks[task0Idx].remainingNumber != 0)
		curIdx = task0Idx;
	else if (alltasks[task1Idx].remainingNumber != 0)
		curIdx = task1Idx;
	else 
		curIdx = task2Idx;
	console.log("gate = " + gate + ", task0Idx = " + task0Idx + ", task1Idx = " 
				+ task1Idx + ", task2Idx = " + task2Idx + ", curIdx = " + curIdx);
	
	console.log("task = " + JSON.stringify(alltasks[curIdx]));
	
	var needCheckVersion = true;
	
	var param = alltasks[curIdx].param;					// 启动任务的json参数字符串
	var taskType = alltasks[curIdx].taskType;			// 任务类型,jump,videoAndAsk,buy,download
	var problem = alltasks[curIdx].problem;				// 问答任务时的问题
	var goBackOnclick = alltasks[curIdx].goBackOnclick;	//
	var videoSource = alltasks[curIdx].videoSource;		// onclick

	var hasversioncode ="";								// 系统存在APP的版本
	var pkgname = "";
	var bywhat = ""; 
	var byvalue = "";
	var needversioncode = "";
	var param1, param2, param3, param4, param5;
	param1 = param2 = param3 = param4 = param5 = "";
	var str = "[]";										// 附加字符串
	var needAddChance = true;
	
	if (taskType == "jump")								// 跳转任务
	{
		pkgname = JSON.parse(param).packagename || JSON.parse(param).packageName;
		bywhat = JSON.parse(param).bywhat;
		byvalue = JSON.parse(param).byvalue;
		needversioncode = JSON.parse(param).versioncode || JSON.parse(param).versionCode;
	
		var str1 = '{ "pkgList": ["' + pkgname + '"] }';
		coocaaosapi.getAppInfo(str1, function(message) {
			if (JSON.parse(message)[pkgname].status == -1) {
				coocaaosapi.startAppStoreDetail(pkgname, function() {}, function() {});
			} else {
				hasversioncode = JSON.parse(message)[pkgname].versionCode;
				if (bywhat == "activity" || bywhat == "class") {
					param1 = pkgname;
					param2 = byvalue;
				} else if (bywhat == "uri") {
					param1 = pkgname;
					param5 = byvalue
				} else if (bywhat == "pkg") {
					param1 = pkgname;
				} else if (bywhat == "action") {
					param1 = "action";
					param2 = byvalue;
					param3 = pkgname;
				}
				if (JSON.stringify(JSON.parse(param).params) != "{}") {
					str = '[' + JSON.stringify(JSON.parse(param).params).replace(/,/g, "},{") + ']';
				}
				
				if (hasversioncode < needversioncode) {
					if (pkgname == "com.tianci.movieplatform") {
						////showAndHideToast("http://sky.fs.skysrt.com/statics/webvip/webapp/418/main/newtoast/movieupdate.png",3000,"","");
						return;
					
					}  else if (pkgname == "com.coocaa.mall") {
						////showAndHideToast("http://sky.fs.skysrt.com/statics/webvip/webapp/418/main/newtoast/mallupdate.png",3000,"","");
						return;
					}
					console.log("当前版本过低，请前往应用圈搜索进行升级");
				} else {
					if(needCheckVersion){
						var apkVersion = [];
						var apkArry = ["com.coocaa.activecenter","com.coocaa.app_browser","com.coocaa.mall","com.tianci.movieplatform"];
						var app = '{ "pkgList": ["com.coocaa.activecenter","com.coocaa.app_browser","com.coocaa.mall","com.tianci.movieplatform"] }';
						coocaaosapi.getAppInfo(app, function(message) {
							console.log("getAppInfo====" + message);
							for(var i=0; i < 4; i++){
								apkVersion.push(JSON.parse(message)[apkArry[i]].versionCode);
							}
							activityCenterVersion = apkVersion[0];
							browserVersion = apkVersion[1];
							mallVersion = apkVersion[2];
							cAppVersion = apkVersion[3];
							console.log("===activityCenterVersion=="+activityCenterVersion+"===browserVersion=="+browserVersion+"==mallVersion=="+mallVersion+"==cAppVersion=="+cAppVersion);
							if((activityCenterVersion < 103015) || (browserVersion < 104039)) {
								console.log("活动中心或浏览器版本太低，需要后台升级，显示弹窗");
								////showAndHideToast("http://sky.fs.skysrt.com/statics/webvip/webapp/418/main/newtoast/newmokuaijiazai.png",3000);
								return;
							} else {//版本满足需求，才真正执行按键判断:
								console.log("剩余可完成次数: " + alltasks[curIdx].remainingNumber);
								if(alltasks[curIdx].remainingNumber != undefined && alltasks[curIdx].remainingNumber > 0) 
									needAddChance = true;
								else
									needAddChance = false;
									
								if (pkgname == "com.tianci.movieplatform") {
									if(cAppVersion<7020028){
										//lowVersion----自身加机会【仍需判断】
										startLowVersion(needAddChance);
									}else{
										if(needAddChance){
											startNewVersion("false");
										}else{
											// startLowVersion(needAddChance);
											startNewVersion("true");
										}
									}
								}  else if (pkgname == "com.coocaa.mall") {
									if(mallVersion<31100003){
										startLowVersion(needAddChance);
									}else{
										if(needAddChance){
											startNewVersion("false");
										}else{
											// startLowVersion(needAddChance);
											startNewVersion("true");
										}
									}
								}
								
								function startLowVersion(needAddChance) {
									console.log("startLowVersion() " + needAddChance);
									if(needAddChance){
										addChance("1", alltasks[curIdx].taskId, 0);
										////showAndHideToast("http://sky.fs.skysrt.com/statics/webvip/webapp/418/main/newtoast/jijiangtiaozhuan.png",3000);
										needFresh = true;
										needRememberFocus = true;
										rememberBtn = ".mission:eq("+$('.mission').index($(obj))+")";
									}else{
										////showAndHideToast("http://sky.fs.skysrt.com/statics/webvip/webapp/418/main/newtoast/bujiajihui.png",3000);
									}
									setTimeout(function () {
										coocaaosapi.startCommonNormalAction(param1, param2, param3, param4, param5, 
												str, function() { }, function() {});
									}, 100);
								}
								
								function startNewVersion(isFinish) {
									console.log("startNewVersion() isFinish = " + isFinish);
									if(isFinish == "true"){
										////showAndHideToast("http://sky.fs.skysrt.com/statics/webvip/webapp/418/main/newtoast/bujiajihui.png",3000);
									}else{
										////showAndHideToast("http://sky.fs.skysrt.com/statics/webvip/webapp/418/main/newtoast/jijiangtiaozhuan.png",3000);
									}

									str = JSON.parse(str);
									var external = {
										"taskId": alltasks[curIdx].taskId,
										"id": alltasks[curIdx].activeId,
										"userKeyId": userKeyId, 
										"countDownTime": alltasks[curIdx].countdown, 
										"verify_key": new Date().getTime(), 
										"subTask": "0",
										"isFinish": isFinish,
										"jumpBgImgUrl": alltasks[curIdx].jumpBgImgUrl,
										"jumpImgUrl": alltasks[curIdx].jumpImgUrl,
										"jumpRemindImgUrl": alltasks[curIdx].jumpRemindImgUrl,
										"serverUrl": adressIp + "/building"
									};
									var doubleEggs_Active = {"doubleEggs_Active":external};
									str.push(doubleEggs_Active);
									str = JSON.stringify(str);
									setTimeout(function () {
										coocaaosapi.startCommonNormalAction(param1, param2, param3, param4, param5, str, function() { needSentADLog = false; }, function() {});
									}, 100);
								}
							}
						}, function(error) {
							console.log("getAppInfo----error" + JSON.stringify(error));
						});
					}
					else{
						coocaaosapi.startCommonNormalAction(param1, param2, param3, param4, param5, str, function() { needSentADLog = false; }, function() {});
					}
				}
				
			}
		},
		function(error) {
			console.log("getAppInfo error" + JSON.stringify(error));
			coocaaosapi.startAppStoreDetail(pkgname, function() {}, function() {});
		});
	}
	else if (taskType == "videoAndAsk")					// 视频答题任务
	{
		
	}
	
}

//完成任务时，增加机会接口:
function addChance(taskType, taskId, askResult) {
    console.log("taskType:"+taskType+",taskId:"+taskId);
    $.ajax({
        type: "post",
        async: true,
        timeout: 10000,
        url: adressIp+"/building/task/finish-task",
        data: {
            taskId:taskId
            ,activeId:actionId
            ,userKeyId:userKeyId
            ,askResult: askResult
            ,"cOpenId": cOpenId
            ,"cNickName": nick_name
        },//,chanceSource:2,subTask:0,cOpenId:_openId},
        dataType: "json",
        success: function(data) {
            console.log("------------addChanceWhenFinishTask----result-------------"+JSON.stringify(data));
            if(data.code == 50100){
                if(taskType == "1"){
                    //刷新页面状态:
                    getMyTasksList(false);
                }else if(taskType == "0"){
                    showPage(false, false);
                }
            }else if(data.code == 91009){
                console.log("任务已过期");
                if (askResult == 1){ //如果是问答任务，且回答正确，因为任务已过期，所以不显示加机会。
                    $("#interlucationAnswerToastId .interlucationTitleClass").html("恭喜回答正确!");
                }
            }
        },
        error: function(error) {
            console.log("--------访问失败" + JSON.stringify(error));
        }
    });
}

// 购买产品包
function gotoBuyPackage() {
	var param1 = "action";
	var param2 = "coocaa.intent.vip.center";
	var param3 = "com.tianci.movieplatform";
	var str = "[{\"business_type\":\"1\"}, {\"source_id\":\"57\"}]";
		
	setTimeout(function () {
		coocaaosapi.startCommonNormalAction(param1, param2, param3, "", "", 
				str, function() { }, function() {});
	}, 100);
}

// 随便逛逛
function strollAround() {
	var param1 = "action";
	var param2 = "coocaa.intent.action.HOME_COMMON_LIST";
	var param3 = "com.tianci.movieplatform";
	var str;
	if (_qsource == "tencent")
		str = "[{\"id\":\"103177\"}]";
	else
		str = "[{\"id\":\"103178\"}]";
		
	setTimeout(function () {
		coocaaosapi.startCommonNormalAction(param1, param2, param3, "", "", 
				str, function() { }, function() {});
	}, 100);
}

// 点击“砸冰块”
function icebreak() {
	console.log("icebreak() ");
	console.log("allNumber = " + allNumber + ", allUsedNumber = " + allUsedNumber);
	
	var hammerNum = allNumber - allUsedNumber;			// 有效锤子数，等于总获得锤子数，减去已用锤子数
	var urlInterface1 = "/building/v2/web/start";
	
	if (hammerNum >= 1) 	// 如果还有锤子,直接砸冰块
	{
		// 调用抽奖接口进行砸冰块 
		var ajaxTimeoutOne = $.ajax({
			type: "POST",
			async: true,
			timeout: 5000,
			dataType: 'json',
			url: adressIp + urlInterface1,
			data: {
				"id": _actionId,
				"source": _qsource,
				"MAC": _mac
				"cModel": _model,
				"cChip": _chip,
				"token": lotteryToken,
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
					console.log(urlInterface1 + " 获取数据成功");
					
				}
			},
			error: function() {
				console.log(urlInterface1 + " 获取数据失败");
			},
			complete: function(XMLHttpRequest, status) {　　　　
				console.log(urlInterface1 + " complete, status = " + status);
				if(status == 'timeout') {　　　　　
					ajaxTimeoutOne.abort();　　　　
				}
			}
		});
	}
	else {					// 没有锤子了的话，提示去做任务 
		
	}
}

// 所有弹窗消失
function disappearAllDialog() {
	$("#dialogPage").css("display", "none");
	////////////////////////////////////////////////
	 $(".secondDialog").css("display", "none");
}

// 显示首次进入的弹窗
function showFirstInDialog() {
	$("#dialogPage").css("display", "block");
	$("#firstInDialog").css("display", "block");
	map = new coocaakeymap($(".coocaa_btn3"), "#FirstInOKBtn", "btn-focus", empty0, empty1, empty1);
}

// 
function disappearFirstInDialog() {
	$("#firstInDialog").css("display", "none");
}

function showHaveGot3Dialog() {
	$("#dialogPage").css("display", "block");
	$("#haveGot3HammerDialog").css("display", "block");
	map = new coocaakeymap($(".coocaa_btn3"), "#haveGot3HammerBtn2", "btn-focus", empty0, empty1, empty1);
}



