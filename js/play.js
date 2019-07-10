var overNum = 0;					// 剩余抽奖次数
var allNumber = 0;					// 所有获得锤子的个数
var allUsedNumber = 0;				// 已经使用的锤子的个数
var entryType = 0;					// 进入次数  0表示非首次/非每天首次进入 1表示首次进入  2表示每天首次进入
var startDayNum = 1;				// 活动的第几天 从1开始计算
var addNumber = 0;					// 完成任务后，增加的锤子数
var buyNumber = 0;					// 购买了产品包之后，增加的锤子数
var taskFinished = false;			// 当天的任务是否完成 (当天最多只能获取3个锤子的任务，不允许再多了)
var sysTime = 1561535614086;		// 当前的系统时间 毫秒数
var userKeyId = "0";				// 用户唯一标识,init接口返回
var lotteryToken = "";				// 抽奖用的token
var alltasks = new Array();			// 任务数组
var ani_status = 1;
var taskLevel = 5;					// 当前任务是第几关，0为都没有解锁，1为第一关已经解锁，2为第二关已经解锁 ...    
var unlockLevel = 5;				// 当前解锁了第几关，0为都没有解锁，1为第一关已经解锁，2为第二关已经解锁 ...


function empty0() {}
function empty1(value) {}

function pageResume() {
	actionInit(true);
}

// 刷新活动数据
function refreshActionData() {
	curLevel = parseInt(allUsedNumber / 3);
}

function updateMainPage(resumeFlag)						// 刷新主界面 
{
	console.log("updateMainPage() " + resumeFlag);
	
	var i;
	var honorBackgroundId;
	
	taskLevel = parseInt(allUsedNumber / 3);			// 当前任务是第几关
	unlockLevel = parseInt(allUsedNumber / 3);			// 当前解锁了第几关(救出了第几个人物)
	
	// 主页背景
	$(".pagesboxes").css("display","block");
	
	// 底部的条栏
	$(".objimg").css("display", "none");
	$(".objice").css("display", "none");
	for (i = 0; i < unlockLevel; i++)
		$("#objimg" + i).css("display", "block");
	for (i = unlockLevel; i < 10; i++)
		$("#objice" + i).css("display", "block");
		
	// 被救出的人物
	if (unlockLevel >= 4)
		$("#people1").css("display", "block");
	else
		$("#people1").css("display", "none");
		
	if (unlockLevel >= 6)
		$("#people2").css("display", "block");
	else
		$("#people2").css("display", "none");
		
	if (unlockLevel >= 8)
		$("#people3").css("display", "block");
	else
		$("#people3").css("display", "none");
		
	// 砸冰块按钮文字
	var num = allNumber - allUsedNumber;
	var button2Text = "";
	if (num <= 0) {
		button2Text = "获得破冰锤";
	} else {
		button2Text = "砸冰块x" + num;
	}
	document.getElementById("mainbutton2").innerHTML = button2Text;
	
	// 勋章背景
	honorBackgroundId = unlockLevel;
	if (honorBackgroundId > 9)
		honorBackgroundId = 9;
	$("#honorBlock").css("background-image", "url(images/honor" + honorBackgroundId + ".png)");

	// 被救人物（冰冻人物）
	var imgfilename = "images/ice/obj";
	var id1 = allUsedNumber % 3;
	imgfilename += unlockLevel;
	imgfilename += id1;
	imgfilename += ".png";
	console.log("cur people = " + imgfilename);
	$("#peopleimg").attr("src", imgfilename);
	
	//
	disappearAllDialog();
	
	// 如果之前是在做任务的页面
	if (resumeFlag) {
		if(isTasksPageShow()) {					// 如果之前做任务的页面在显示中
			if (taskFinished) {					// 当天的任务已经完成，不允许再做任务了
				disappearTasksPage();
				focusOnMainPage(null);
			}
			else {
				if (addNumber > 0 || buyNumber > 0) {	// 如果获得了锤子，则做任务的页面消失
					disappearTasksPage();
					focusOnMainPage(null);
				}
				else {
					getUserTaskList();				// 刷新任务列表
					return;
				}
			}
		}
	}
	
	if (entryType == 1)				// 如果是用户第一次进入该活动,则弹出提示框，然后退出
	{
		showFirstInDialog();
		return;
	}
	
	if (addNumber > 0) 
	{
		showGotHammerDialog();
		return;
	}
	
	if (buyNumber > 0 ) 
	{
		showGiveHammerDialog();
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
   
   focusOnMainPage(null);
   
   
}

function focusOnMainPage(button) {
	map = new coocaakeymap($(".coocaa_btn"), "#mainpageButton2", "btn-focus", empty0, empty1, empty1);
}

//暑假活动初始化 
function actionInit(resumeFlag) {
	console.log("actionInit()");
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
				console.log(JSON.stringify(data));
				if (data.data.overNum != undefined && data.data.overNum != null)
					overNum = data.data.overNum;
				if (data.data.allNumber != undefined && data.data.allNumber != null)
					allNumber = data.data.allNumber;
				if (allNumber > 30)
					allNumber = 30;
				if (data.data.allUsedNumber != undefined && data.data.allUsedNumber != null)
					allUsedNumber = data.data.allUsedNumber;
				if (allUsedNumber > 30)
					allUsedNumber = 30;
				if (data.data.entryType != undefined && data.data.entryType != null)
					entryType = data.data.entryType;
				if (data.data.startDayNum != undefined && data.data.startDayNum != null)
					startDayNum = data.data.startDayNum;
				if (data.data.addNumber != undefined && data.data.addNumber != null)
					addNumber = data.data.addNumber; 
				if (data.data.buyNumber != undefined && data.data.buyNumber != null)
					buyNumber = data.data.buyNumber;
				if (data.data.taskFinished != undefined && data.data.taskFinished != null)
					taskFinished = data.data.taskFinished;
				//taskFinished = false;				// for test
				if (data.data.sysTime != undefined && data.data.sysTime != null)
					sysTime = data.data.sysTime;
				if (data.data.userKeyId != undefined && data.data.userKeyId != null)
					userKeyId = data.data.userKeyId;
				if (data.data.token != undefined && data.data.token != null)
					lotteryToken = data.data.token;
				
				updateMainPage(resumeFlag);				// 显示主页面 
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
				
				showTasksPageInt();
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
		getUserTaskList();
		//showTasksPageInt();
	}
}
		
function showTasksPageInt() {
	// 拥有的锤子数，除以3，得到当前需要做第几关的任务
	var taskLevel = parseInt(allUsedNumber / 3);
	var task0Idx = taskLevel * 3 + 0;
	var task1Idx = taskLevel * 3 + 1;
	var task2Idx = taskLevel * 3 + 2;
	console.log("taskLevel = " + taskLevel + ", task0Idx = " + task0Idx + ", task1Idx = " + task1Idx + ", task2Idx = " + task2Idx);
	
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
	var taskLevel = parseInt(allUsedNumber / 3);
	var task0Idx = taskLevel * 3 + 0;
	var task1Idx = taskLevel * 3 + 1;
	var task2Idx = taskLevel * 3 + 2;
	var curIdx;
	if (alltasks[task0Idx].remainingNumber != 0)
		curIdx = task0Idx;
	else if (alltasks[task1Idx].remainingNumber != 0)
		curIdx = task1Idx;
	else 
		curIdx = task2Idx;
	console.log("taskLevel = " + taskLevel + ", task0Idx = " + task0Idx + ", task1Idx = " 
				+ task1Idx + ", task2Idx = " + task2Idx + ", curIdx = " + curIdx);
	
	var taskinfo = alltasks[curIdx];
	/*
	{
	"taskId": 4124,
	"activeId": 149,
	"taskName": "广告类视频答题任务",
	"taskType": "videoAndAsk",
	"imgUrl": "http://172.20.155.51/uploads/img/20190610/20190610142953610849.png",
	"maxNumber": 1,
	"addNumber": 1,
	"timeType": "allTime",
	"timeKey": "2019-06-11",
	"source": "all",
	"countdown": 12,
	"jumpBgImgUrl": "http://172.20.155.51/uploads/20190522/20190522102148830555.webp",
	"jumpImgUrl": "http://172.20.155.51/uploads/img/20190522/20190522102155090027.png",
	"jumpRemindImgUrl": "http://172.20.155.51/uploads/img/20190522/20190522102208290060.png",
	"askRightUrl": "http://172.20.155.51/uploads/img/20190522/20190522102220534206.png",
	"askErrorUrl": "http://172.20.155.51/uploads/img/20190522/20190522102226356700.png",
	"goBackOnclick": "{\"packageName\":\"com.coocaa.app_browser\",\"versionCode\":\"1\",\"dowhat\":\"startActivity\",\"bywhat\":\"action\",\"byvalue\":\"appx.intent.launcher.Start\",\"params\":{\"uri\":\"appx://com.coocaa.appx.x618/main?activityId=145&isDebug=true\"}}",
	"remark": "",
	"state": 0,
	"param": "{\"videoUrl\":\"http://all.vod.17ugo.com/vod/kukai1/U-酷开/优购物/厨具/厨具20180829/544135-韩国原装进口福库电压力饭煲U/u.m3u8\",\"adId\":\"\"}",
	"problem": "{\"problem\":\"邓伦在《封神演义》中是的角色是？\",\"answerA\":\"杨戬\",\"rightAnswer\":\"B\",\"answerB\":\"狐妖\"}",
	"videoSource": "adId",
	"seq": 0,
	"createTime": "2019-06-25 11:41:24",
	"updateTime": "2019-06-25 11:41:24",
	"version": 0,
	"remainingNumber": 1
}
	;*/
	console.log("task = " + JSON.stringify(taskinfo));
	
	var needCheckVersion = true;
	
	var param = taskinfo.param;							// 启动任务的json参数字符串
	var taskType = taskinfo.taskType;					// 任务类型,jump,videoAndAsk,buy,download
	var problem = taskinfo.problem;						// 问答任务时的问题
	var goBackOnclick = taskinfo.goBackOnclick;			//
	var videoSource = taskinfo.videoSource;				// onclick

	var hasversioncode ="";								// 系统存在APP的版本
	var pkgname = "";
	var bywhat = ""; 
	var byvalue = "";
	var needversioncode = "";
	var param1, param2, param3, param4, param5;
	param1 = param2 = param3 = param4 = param5 = "";
	var str = "[]";										// 附加字符串
	var needAddChance = true;
	var appx_url = "";
	
	if (taskType == "jump")								// 跳转任务
	{
			pkgname = JSON.parse(param).packagename || JSON.parse(param).packageName;
			bywhat = JSON.parse(param).bywhat;
			byvalue = JSON.parse(param).byvalue;
			needversioncode = JSON.parse(param).versioncode || JSON.parse(param).versionCode;
	
		var pkglist_s = '{ "pkgList": ["' + pkgname + '"] }';
		
		coocaaosapi.getAppInfo(pkglist_s, function(message) {
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
							if((activityCenterVersion < 103015) || (browserVersion < 200000)) {
								console.log("活动中心或浏览器版本太低，需要后台升级，显示弹窗");
								////showAndHideToast("http://sky.fs.skysrt.com/statics/webvip/webapp/418/main/newtoast/newmokuaijiazai.png",3000);
								return;
							} else {//版本满足需求，才真正执行按键判断:
								console.log("剩余可完成次数: " + taskinfo.remainingNumber);
								if(taskinfo.remainingNumber != undefined && taskinfo.remainingNumber > 0) 
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
										addChance("1", taskinfo.taskId, 0);
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
										"taskId": taskinfo.taskId,
										"id": taskinfo.activeId,
										"userKeyId": userKeyId, 
										"countDownTime": taskinfo.countdown, 
										"verify_key": new Date().getTime(), 
										"subTask": "0",
										"isFinish": isFinish,
										"jumpBgImgUrl": taskinfo.jumpBgImgUrl,
										"jumpImgUrl": taskinfo.jumpImgUrl,
										"jumpRemindImgUrl": taskinfo.jumpRemindImgUrl,
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
		pkgname = "com.coocaa.app_browser";		
		var pkglist_s = '{ "pkgList": ["' + pkgname + '"] }';
		coocaaosapi.getAppInfo(pkglist_s, function(message) {
			var appmsg = JSON.parse(message);
			var browserVersion = appmsg[pkgname].versionCode;
			if (browserVersion < 200000) {
				console.log("活动中心或浏览器版本太低，需要后台升级，显示弹窗");
				////showAndHideToast("http://sky.fs.skysrt.com/statics/webvip/webapp/418/main/newtoast/newmokuaijiazai.png",3000);
				return;
			} else {
				// am start -d appx://com.coocaa.videoask?taskParams="11"&videoAskParams="222"
				var taskParamsStr = JSON.stringify(param);				// 任务的参数 
				var timestampms = Date.parse(new Date());
				var timestamp = parseInt(timestampms / 1000);			// 当前时间戳(秒)
				var myProblem = {
					"rightAns": "B",
					"answerA": "答案选项A",
					"answerB": "答案选项B",
					"question": "你选择A还是B"
				};
				
				var serverProblem = JSON.parse(taskinfo.problem);
				
				if (serverProblem != undefined && serverProblem != null) {
					if (serverProblem.problem != undefined && serverProblem.problem != null)
						myProblem.question = serverProblem.problem;
					if (serverProblem.answerA != undefined && serverProblem.answerA != null)
						myProblem.answerA = serverProblem.answerA;
					if (serverProblem.answerB != undefined && serverProblem.answerB != null)
						myProblem.answerB = serverProblem.answerB;
					if (serverProblem.rightAnswer != undefined && serverProblem.rightAnswer != null)
						myProblem.rightAns = serverProblem.rightAnswer;
				}
				
				console.log("myProblem = " + JSON.stringify(myProblem));
				
				var videoAskParams = {
					"countDownTime" : taskinfo.countdown,
					"verify_key" : timestamp,
					"isFinish" : false,
					"serverUrl" : adressIp + "/building/v2/app/",
					"id" : taskinfo.activeId,
					"jumpImgUrl" : taskinfo.jumpImgUrl,
					"jumpBgImgUrl" : taskinfo.jumpBgImgUrl,
					"taskId" : taskinfo.taskId,
					"jumpRemindImgUrl" : taskinfo.jumpRemindImgUrl,
					"userKeyId" : userKeyId,
					"needExitDialog" : "true",
					"problem" : myProblem,
					"dataerParams" : {}
				};
				var videoAskParamStr = JSON.stringify(videoAskParams);
				var taskParamStr = taskinfo.param;
				
				appx_url = 'appx://com.coocaa.videoask?taskParams=';
				appx_url += taskParamStr + '&videoAskParams=';
				appx_url += videoAskParamStr;
				
				console.log("appx_url = " + appx_url);
				
				var cmdParam = {
					"uri": appx_url,
                    "pre_load": false
				};
				var cmdParamStr = JSON.stringify(cmdParam);
				
				setTimeout(function () {
					coocaaosapi.startAppX2(appx_url, "false", function(){}, function(){});
				}, 100);
			}
		}, function(error) {
			console.log("getAppInfo error: " + JSON.stringify(error));
		});

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
		disappearHaveGot3Dialog();
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
		disappearHaveGot3Dialog();
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
				"MAC": _mac,
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
					// 执行破冰动效
						crushIceFunc(data);
					// 如果没有奖品
					if (data.data == undefined || data.data == null)
					{
						// 执行破冰动效
						
						//
						return;
					}
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
		showTasksPage();
	}
}
function crushIceFunc(obj){
	console.log("-------2-------");
	var ctop = $("#mainpageHammer").position().top - 35;
	var cleft = $("#mainpageHammer").position().left + 50;
	//1.锤子抬起的动作
	$("#mainpageHammer").animate({
		"top": ctop + "px",
		"left": cleft + "px"
	}, 500, function() {
		//2.锤子抬起达到最顶点的动作
		$("#mainpageHammer").css({
			"-webkit-transform-origin": "200px 150px",
			"-moz-transform-origin": "200px 150px",
			"-o-transform-origin": "200px 150px",
			"-webkit-transform": "rotate(55deg)",
			"-moz-transform": "rotate(55deg)",
			"-o-transform": "rotate(55deg)",
			"transform": "rotate(55deg)",
			"-webkit-transition": "all 0.4s ease",
			"-moz-transition": "all 0.4s ease",
			"-o-transition": "all 0.4s ease",
			"transition": "all 0.4s ease"
		});
		setTimeout(function(){
			//3.锤子落下的动作
			$("#mainpageHammer").css({
				"width":"190px",
				"height":"207px",
				"left":"1180px",
				"top":"340px",
				"-webkit-transform": "rotate(-20deg)",
				"-moz-transform": "rotate(-20deg)",
				"-o-transform": "rotate(-20deg)",
				"transform": "rotate(-20deg)",
				"-webkit-transition": "all 0.4s ease",
				"-moz-transition": "all 0.4s ease",
				"-o-transition": "all 0.4s ease",
				"transition": "all 0.4s ease"
			});
			setTimeout(function(){
				//4.锤子落下到达最低点
				$("#mainpageHammer").css({
					"width":"190px",
					"height":"207px",
					"left":"1230px",
					"top":"360px",
					"-webkit-transform": "rotate(0deg)",
					"-moz-transform": "rotate(0deg)",
					"-o-transform": "rotate(0deg)",
					"transform": "rotate(0deg)",
					"-webkit-transition": "all 0.4s ease",
					"-moz-transition": "all 0.4s ease",
					"-o-transition": "all 0.4s ease",
					"transition": "all 0.4s ease"									
				});
				//5.金蛋破碎
				console.log("金蛋破碎");
				var imgfilename = "images/ice/obj";
				var id1 = allUsedNumber % 3;
				imgfilename += unlockLevel;
				imgfilename += (id1 + 1);
				imgfilename += ".png";
				console.log("new people = " + imgfilename);
				$("#peopleimg").attr("src", imgfilename);
				$("#icepeople").css({
					"width":"500px",
					"height":"500px",
					"left":"768px",
					"top":"322px",
					"-webkit-transform": "rotate(-5deg)",
					"-moz-transform": "rotate(-5deg)",
					"-o-transform": "rotate(-5deg)",
					"transform": "rotate(-5deg)",
					"-webkit-transition": "all 0.3s ease",
					"-moz-transition": "all 0.3s ease",
					"-o-transition": "all 0.3s ease",
					"transition": "all 0.3s ease"									
				});
				setTimeout(function(){
					$("#icepeople").css({
						"width":"500px",
						"height":"500px",
						"left":"768px",
						"top":"322px",
						"-webkit-transform": "rotate(0deg)",
						"-moz-transform": "rotate(0deg)",
						"-o-transform": "rotate(0deg)",
						"transform": "rotate(0deg)",
						"-webkit-transition": "all 0.3s ease",
						"-moz-transition": "all 0.3s ease",
						"-o-transition": "all 0.3s ease",
						"transition": "all 0.3s ease"									
					});
				}, 300);
				//6.冰块碎裂
				console.log("冰块碎掉的动效");
				$("#showBox").css("display","block");
				console.log(ani_status);
				if(ani_status == 1) {
					$("#showBox").attr("class","box box1");
					ani_status = 2;
				} else {
					$("#showBox").attr("class","box box2");
					ani_status = 1;
				}
				setTimeout(function(){
					$("#showBox").css("display","none");
					showDrawResule(obj);
				}, 750);
			},400);
		},400);
	});
}
function showDrawResule(obj){
	console.log("展示抽奖结果"+obj);
	
	// TO-DO ： 展示抽奖结果
	
	
	actionInit(false);
}

function findMoreHammer() {
	console.log("findMoreHammer() ");
}

// 按Back键的时候,检查主页面的弹窗是否弹出
function checkMainPagePopUpOnBackKey() {
	if($("#firstInDialog").css("display") == "block") {				// 首次进入的弹窗
		disappearFirstInDialog();
		return true;
	}
	if($("#gotHammerDialog").css("display") == "block") {			// 获得锤子的弹窗
		disappearGotHammerDialog();
		return true;
	}
	if($("#giveHammerDialog").css("display") == "block") {			// 赠送锤子的弹窗
		disappearGiveHammerDialog();
		return true;
	}
	if($("#haveGot3HammerDialog").css("display") == "block") {		// 当天已经获得3把锤子的弹窗
		disappearHaveGot3Dialog();
		return true;
	}
	
	return false;
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
	$(".secondDialog").css("display", "none");
	$("#dialogPage").css("display", "none");
	focusOnMainPage(null);
}

function showHaveGot3Dialog() {
	$("#dialogPage").css("display", "block");
	$("#haveGot3HammerDialog").css("display", "block");
	map = new coocaakeymap($(".coocaa_btn3"), "#haveGot3HammerBtn2", "btn-focus", empty0, empty1, empty1);
}

function disappearHaveGot3Dialog() {
	$("#haveGot3HammerDialog").css("display", "none");
	$(".secondDialog").css("display", "none");
	$("#dialogPage").css("display", "none");
	focusOnMainPage(null);
}

function showGotHammerDialog() {
	var text = "x" + addNumber;
	document.getElementById("hammerNum1").innerHTML = text;
	$("#dialogPage").css("display", "block");
	$("#gotHammerDialog").css("display", "block");
	map = new coocaakeymap($(".coocaa_btn3"), "#gotHammerOKBtn", "btn-focus", empty0, empty1, empty1);
}

function disappearGotHammerDialog() {
	$("#gotHammerDialog").css("display", "none");
	$(".secondDialog").css("display", "none");
	$("#dialogPage").css("display", "none");
	focusOnMainPage(null);
}

function showGiveHammerDialog() {
	var text = "x" + buyNumber;
	document.getElementById("hammerNum2").innerHTML = text;
	$("#dialogPage").css("display", "block");
	$("#giveHammerDialog").css("display", "block");
	map = new coocaakeymap($(".coocaa_btn3"), "#giveHammerBtn1", "btn-focus", empty0, empty1, empty1);
}

function disappearGiveHammerDialog() {
	$("#giveHammerDialog").css("display", "none");
	$(".secondDialog").css("display", "none");
	$("#dialogPage").css("display", "none");
	focusOnMainPage(null);
}





















