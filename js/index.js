//=============下面是 cordova框架要使用的变量 =============
var accountVersion = "";
var cAppVersion = "";
//=======================================================

//===================下面是普通全局变量 ===================
var _model = "";
var _chip = "";
var _mac = "";
var _emmcCID = "";
var _udid = "";
var _cVersion = "";
var _cSize = "";
var _cSdk = "";
var _cBrand = "";
var _cFMode = "Default";
var _appversion = "";
var _qsource = "yinhe";
var _userKeyId0 = "";
var _openId = null;
var _mobile = null;
var _nickName = null;
var _loginstatus = false;
var _user_flag = null;
var _accessToken = null;
var needQQ = false;
var _tencentWay = "";

var _actionId = 150;	//主活动的id
var _curFocusId = null;
var startLoginFlag = false;
var changeLoginFlag = false;
var hasAllowanceAward = false; //记录是否有津贴
var hasCouponAward = false; //记录是否有神券
var dialogTime = null;

var answerRightFlag = null;		// 视频答题回答正确标志

//var adressIp = "https://restful.skysrt.com";
//var allowanceUrl = "https://jintie.coocaa.com/api/subsidy/v1/query-userSubsidyInfo-byToken"
//var allowanceClientId = "YS_RELEASE";
//var enurl = "https://webapp.skysrt.com/activity618/Address/index.html?";
//var freePageUrl = "https://webapp.skysrt.com/activity618/Relate/free.html?";
//var screenUrl = "https://webapp.skysrt.com/screen/index.html?";
//var mangguoTv = "https://club.mgtv.com/tvos/xcm/index.html";

var adressIp = "http://beta.restful.lottery.coocaatv.com";
var enurl = "http://beta.webapp.skysrt.com/zy/address/index.html?";//实体奖url

var dataObj = {};//我的奖励数据
var _arr1 = new Array(); //红包
var _arr2 = new Array(); //实体将
var _arr3 = new Array(); //优惠券
var _arr4 = new Array(); //实物奖

coocaaApp.bindEvents("menubutton", function() {
    console.log("this menuButton>>>>>>>>>new>>>>>>>>>")
});

coocaaApp.bindEvents("backbuttondown", function() {
    console.log("this backbuttondown>>>>>>>>>new>>>>>>>>>");
    handleBackButtonFunc();
    //navigator.app.exitApp();
});

coocaaApp.bindEvents("homebutton", function() {
    console.log("this homebutton>>>>>>>>>new>>>>>>>>>");
    
    navigator.app.exitApp();
});

coocaaApp.bindEvents("resume", function() {
	console.log("on resume");
	console.log(startLoginFlag);
	console.log(changeLoginFlag);
	if(startLoginFlag && changeLoginFlag){
        console.log("登录成功");
        startLoginFlag = false;
        changeLoginFlag = false;
		if ($("#myAwardPage").css("display") == "block") {
            console.log(_curHomeBtn);
            $("#" + _curHomeBtn).trigger("itemClick");
            if($("#myAwardBox").css("display") == "block"){
            	sentLog("result_event_new", '{"page_name":"登录弹窗","parent_page":"我的奖品页-有奖品","page_type":"登录成功","activity_type":"2019教育暑期活动","activity_name":"2019教育暑期活动","OPEN_ID":"'+_openId+'"}');
        		_czc.push(['_trackEvent', '登录弹窗', '我的奖品页-有奖品', '登录成功', '', '']);
            }else{
            	sentLog("result_event_new", '{"page_name":"登录弹窗","parent_page":"我的奖品页-无奖品","page_type":"登录成功","activity_type":"2019教育暑期活动","activity_name":"2019教育暑期活动","OPEN_ID":"'+_openId+'"}');
        		_czc.push(['_trackEvent', '登录弹窗', '我的奖品页-无奖品', '登录成功', '', '']);
            }
        }else{
        	//TODO:主页面启登录的结果的日志项提交；
        	sentLog("result_event_new", '{"page_name":"登录弹窗","parent_page":"解救冰冻物体后有奖弹窗","page_type":"登录成功","activity_type":"2019教育暑期活动","activity_name":"2019教育暑期活动","OPEN_ID":"'+_openId+'"}');
        	_czc.push(['_trackEvent', '登录弹窗', '解救冰冻物体后有奖弹窗', '登录成功', '', '']);
			
			pageResume();
        }
    }else if (startLoginFlag) {
        console.log("登录失败");
        startLoginFlag = false;
        changeLoginFlag = false;
        if ($("#myAwardPage").css("display") == "block") {
            console.log(_curHomeBtn);
            $("#" + _curHomeBtn).trigger("itemClick");
            if($("#myAwardBox").css("display") == "block"){
            	sentLog("result_event_new", '{"page_name":"登录弹窗","parent_page":"我的奖品页-有奖品","page_type":"登录失败","activity_type":"2019教育暑期活动","activity_name":"2019教育暑期活动","OPEN_ID":"'+_openId+'"}');
        		_czc.push(['_trackEvent', '登录弹窗', '我的奖品页-有奖品', '登录失败', '', '']);
            }else{
            	sentLog("result_event_new", '{"page_name":"登录弹窗","parent_page":"我的奖品页-无奖品","page_type":"登录失败","activity_type":"2019教育暑期活动","activity_name":"2019教育暑期活动","OPEN_ID":"'+_openId+'"}');
        		_czc.push(['_trackEvent', '登录弹窗', '我的奖品页-无奖品', '登录失败', '', '']);
            }
        }else{
        	//TODO:主页面启登录的结果的日志项提交；
        	sentLog("result_event_new", '{"page_name":"登录弹窗","parent_page":"解救冰冻物体后有奖弹窗","page_type":"登录失败","activity_type":"2019教育暑期活动","activity_name":"2019教育暑期活动","OPEN_ID":"'+_openId+'"}');
        	_czc.push(['_trackEvent', '登录弹窗', '解救冰冻物体后有奖弹窗', '登录失败', '', '']);
			
			pageResume();
        }
    }else{
    	pageResume();
    }
});

coocaaApp.bindEvents("pause", function() {
	console.log("on pause");
	autoFillLogData5();
	webDataLog("result_event_new", logdata5);
});

coocaaApp.ready(function() {
    
});

coocaaApp.triggleButton(function() {
    _appversion = accountVersion;
	processUrlParam();
	
    listenUserChange();
    buttonInitBefore();
    getDeviceInfo();
});

function buttonInitBefore() {
	$("#redHasGetBtn").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了继续参与");
		$("#redHasGet").css("display","none");
		$("#dialogPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn2"), "#"+_curFocusId, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#noAwardBox").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了去玩游戏");
		$("#noAwardBox").css("display","none");
		map = new coocaakeymap($(".coocaa_btn2"), "#mainpageButton2", "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#redQrcode").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了红包奖励的二维码");
		$("#redNotGet").css("display","none");
		$("#dialogPage").css("display","none");
		console.log(_curFocusId);
		map = new coocaakeymap($(".coocaa_btn2"), "#"+_curFocusId, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#entityQrcode").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了实物奖励的二维码");
		$("#entityNotGet").css("display","none");
		$("#dialogPage").css("display","none");
		$("#myawardPage").css("display","block");
		console.log(_curFocusId);
		map = new coocaakeymap($(".coocaa_btn2"), "#"+_curFocusId, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#hasGotInfo4").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了实物奖励的领奖地址");
		$("#entityHasGet").css("display","none");
		$("#dialogPage").css("display","none");
		map = new coocaakeymap($(".coocaa_btn2"), "#"+_curFocusId, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#mainpageButton1").unbind("itemClick").bind("itemClick", function() {
		pressGetMoreHammerButton();
	});
	$("#mainpageButton2").unbind("itemClick").bind("itemClick", function() {
		pressIceBreakButton();
	});
	$("#mainpageButton3").unbind("itemClick").bind("itemClick", function() {
		pressMyAwardsButton();
	});
	$("#mainpageButton4").unbind("itemClick").bind("itemClick", function() {
		showRolePage();
	});
	$("#FirstInOKBtn").unbind("itemClick").bind("itemClick", function() {
		pressFirstInOKBtn();
	});
	$("#taskEnter").unbind("itemClick").bind("itemClick", function() {
		gotoDoTask();				// 做任务
	});
	$("#haveGot3HammerBtn1").unbind("itemClick").bind("itemClick", function() {
		// 获取更多锤子
		gotoBuyPackage();
	});
	$("#haveGot3HammerBtn2").unbind("itemClick").bind("itemClick", function() {
		// 随便逛逛
		strollAround();
	});
	$("#gotHammerOKBtn").unbind("itemClick").bind("itemClick", function() {
		// 继续破冰
		disappearGotHammerDialog();
	});
	$("#giveHammerBtn1").unbind("itemClick").bind("itemClick", function() {
		// 去破冰
		disappearGiveHammerDialog();
	});
	$("#giveHammerBtn2").unbind("itemClick").bind("itemClick", function() {
		// 继续寻找锤子 -- 若已完成当前级的所有任务，则显示主界面，未完成的则跳到做任务界面
		findMoreHammer();
	});
	$("#helpOKBtn").unbind("itemClick").bind("itemClick", function() {
		//救援成功按钮按下
		helpOKBtnClick();
	});
	$("#redHasGetBtn").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了继续参与");
		$("#redHasGet").css("display","none");
		$("#redHasGet").css("dialogPage","none");
		navigator.app.exitApp();
	});
	$("#noAwardBox").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了去玩游戏");
		$("#noAwardBox").css("display","none");
		$("#myawardPage").css("display","none");
	});
	$("#redQrcode").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了红包奖励的二维码");
		$("#redNotGet").css("display","none");
		$("#dialogPage").css("display","none");
		$("#myawardPage").css("display","block");
		getMyAwards(_actionId);
	});
	$("#entityQrcode").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了实物奖励的二维码");
		$("#entityNotGet").css("display","none");
		$("#dialogPage").css("display","none");
		$("#myawardPage").css("display","block");
		getMyAwards(_actionId);
	});
	$("#hasGotInfo4").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了实物奖励的领奖地址");
		$("#entityHasGet").css("display","none");
		$("#dialogPage").css("display","none");
		$("#myawardPage").css("display","block");
		console.log(_curFocusId);
		map = new coocaakeymap($(".coocaa_btn2"), "#"+_curFocusId, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#cardBtn1").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了继续玩游戏");
		$("#cardAwardDialog").css("display","none");
		$("#dialogPage").css("display","none");
		$("#myawardPage").css("display","block");
		webPageInit(1);
		map = new coocaakeymap($(".coocaa_btn2"), "#"+_curFocusId, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#rewardAmountNum1").unbind("itemClick").bind("itemClick", function() {
		console.log("确定领取");
		$("#topEnsure").css("display","none");
		$("#topQrcodeBox").css("display","block");
		map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
		
}
function getDeviceInfo() {
	coocaaosapi.getDeviceInfo(function(message) {
		console.log(JSON.stringify(message));
		_model = message.model;
		_chip = message.chip;
		_mac = message.mac;

		if(message.emmcid == "" || message.emmcid == null) {
			_emmcCID = "123456";
		} else {
			_emmcCID = message.emmcid;
		}
		_udid = message.activeid;
		_userKeyId0 = _udid;
		_cVersion = message.version.replace(/\./g, "");
		_cSize = message.panel;
		_cSdk = message.androidsdk;
		_cBrand = message.brand;
		getTvSource(_mac, _chip, _model, _emmcCID, _udid, _cFMode, _cVersion, _cSize, _appversion, _cSdk, _cBrand);
	}, function(error) {
		console.log("获取设备信息出现异常。");
	});
}
//获取视频源
function getTvSource(smac, schip, smodel, semmcid, sudid, sFMode, sTcVersion, sSize, sAppVersion, sSdk, sBrand) {
	console.log(smac + "--" + sudid + "--" + sAppVersion + "--" + sSdk);
	var ajaxTimeout = $.ajax({
		type: "POST",
		async: true,
		timeout: 10000,
		dataType: 'json',
		url: adressIp + "/light/active/tv/source",
		data: {
			"MAC": smac,
			"cChip": schip,
			"cModel": smodel,
			"cEmmcCID": semmcid,
			"cUDID": sudid,
			"cFMode": sFMode,
			"cTcVersion": sTcVersion,
			"cSize": sSize,
			"cAppVersion": sAppVersion,
			"cBrand": sBrand
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == 0) {
				_qsource = data.data.source;
				if(_qsource == "tencent") {
					needQQ = true;
				}
				console.log(_qsource + "--" + needQQ);
			}
		},
		error: function() {
			console.log('获取视频源失败');
			needQQ = true;
		},
		complete: function(XMLHttpRequest, status) {
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　
				ajaxTimeout.abort();　　　　
			}
			hasLogin(needQQ, 0);
		}
	});
}
//判断是否登录
function hasLogin(needQQ, num) {
	coocaaosapi.hasCoocaaUserLogin(function(message) {
		console.log("haslogin " + message.haslogin);
		_loginstatus = message.haslogin;
		console.log(_loginstatus);
		if(_loginstatus == "false") {
			if(needQQ) {
				if(cAppVersion >= 3190030) {
					_tencentWay = "both";
				} else {
					_tencentWay = "qq";
				}
			}
			_user_flag = 0;
			_accessToken = "";
			webPageInit(0);
		} else {
			coocaaosapi.getUserInfo(function(message) {
				console.log(message);
				exterInfo = message.external_info;
				_openId = message.open_id;
				console.log(_openId);
				_mobile = message.mobile;
				_nickName = message.nick_name;
				coocaaosapi.getUserAccessToken(function(message) {
					_accessToken = message.accesstoken;
					console.log(_accessToken);
					if(exterInfo == "[]") {
						exterInfo = '[{}]';
					} else {}
					_user_flag = 1;
					if(needQQ) {
						qqinfo = JSON.parse(exterInfo);
						if(qqinfo.length == 1) {
							if(cAppVersion >= 3190030) {
								if(JSON.stringify(qqinfo[0]) == "{}" || qqinfo[0].external_flag == "jscn") {
									_tencentWay = "both";
								} else {
									_tencentWay = qqinfo[0].external_flag;
								}
							} else {
								_tencentWay = "qq";
							}
							if(qqinfo != "" && qqinfo != null && qqinfo[0].login) {
								_qqtoken = qqinfo[0].external_id;
								if(qqinfo[0].external_flag == "qq") {
									_login_type = 1;
								} else {
									_login_type = 2;
									_vuserid = qqinfo[0].vuserid;
									if(_vuserid == undefined) {
										_vuserid = JSON.parse(qqinfo[0].refreshToken).vuserid
									}
									if(cAppVersion < 3190030) {
										_loginstatus = "false";
									}
								}
							} else {
								_tencentWay = "both";
								_loginstatus = "false";
							}
						} else {
							var needSelectNum = 0;
							for(var b = 0; b < qqinfo.length; b++) {
								needSelectNum = needSelectNum + 1;
								if(qqinfo[b].login && qqinfo[b].external_flag != "jscn") {
									_qqtoken = qqinfo[b].external_id;
									if(qqinfo[b].external_flag == "qq") {
										_login_type = 1;
									} else {
										_login_type = 2;
										_vuserid = qqinfo[b].vuserid;
										if(_vuserid == undefined) {
											_vuserid = JSON.parse(qqinfo[b].refreshToken).vuserid
										}
										if(cAppVersion < 3190030) {
											_loginstatus = "false";
											_tencentWay = "qq";
										}
									}
									break;
								}
								if(needSelectNum == qqinfo.length) {
									_tencentWay = "both";
									_loginstatus = "false";
								}
							}
						}
						
					} else {
						qqinfo = JSON.parse(exterInfo);
						for(var b = 0; b < qqinfo.length; b++) {
							if(qqinfo[b].login) {
								_qqtoken = qqinfo[b].external_id;
								if(qqinfo[b].external_flag == "qq") {
									_login_type = 1;
								} else if(qqinfo[b].external_flag == "weixin") {
									_login_type = 2;
									vuserid = qqinfo[b].vuserid;
									if(vuserid == undefined) {
										vuserid = JSON.parse(qqinfo[b].refreshToken).vuserid
									}
								}
								break;
							} else {
								_qqtoken = "";
							}
						}
					}
					if(num == 0) {
						//0-初始化就判断,1-监听到账户发生变化后判断
						console.log("判断什么时候需要判断是否登录");
					}
					webPageInit(0);
				}, function(error) {
					console.log(error);
				})
			}, function(error) {
				console.log(error);
			});
		}
	}, function(error) {
		console.log(error);
	});
}
//监听账户变化
function listenUserChange() {
	coocaaosapi.addUserChanggedListener(function(message) {
		console.log("监听到账户发生变化");
		changeLoginFlag = true;
		hasLogin(needQQ, 1);
	});
}

function startAndSendLog() {
	startLoginFlag = true;
	startLogin(needQQ);
}

function startLogin(needQQ) {
	console.log("funny+++" + _tencentWay);
	if(needQQ) {
		if(accountVersion > 4030000) {
			if(_tencentWay == "qq") {
				coocaaosapi.startWeixinOrQQ2("LOGIN_QQ", function(message) {
					console.log(message);
				}, function(error) {
					console.log(error);
				});
			} else if(_tencentWay == "weixin") {
				coocaaosapi.startWeixinOrQQ2("LOGIN_WEIXIN", function(message) {
					console.log(message);
				}, function(error) {
					console.log(error);
				});
			} else if(_tencentWay == "both") {
				coocaaosapi.startWeixinOrQQ2("TENCENT", function(message) {
					console.log(message);
				}, function(error) {
					console.log(error);
				});
			}
		} else {
			coocaaosapi.startThirdQQAccount(function(message) {
				console.log(message);
			}, function(error) {
				console.log(error);
			});
		}
	} else {
		if(_cVersion < 550000000 && accountVersion > 4030000) {
			coocaaosapi.startUserSettingAndFinish2(function(message) {
				console.log(message);
			}, function(error) {
				console.log(error);
			});
		} else {
			coocaaosapi.startUserSettingAndFinish(function(message) {
				console.log(message);
			}, function(error) {
				console.log(error);
			});
		}
	}
}

function handleBackButtonFunc() {
	if($("#dialogPage").css("display") == "block") {
		if (checkMainPagePopUpOnBackKey() == false) {
			$("#dialogPage").css("display", "none");
			$("#myawardPage").css("display", "block");
			getMyAwards(_actionId);
		}
	}else if ($("#myawardPage").css("display") == "block") {
		$("#myawardPage").css("display", "none");
		webPageInit(1);
	}
	else if (isRolePageShow()) {		// 如果游戏规则页面显示中
		disappearRolePage();
		webPageInit(1);
	}
	else if (isTasksPageShow()) {		// 如果做任务页面显示中
		disappearTasksPage();
		webPageInit(1);
	}
	else {
		navigator.app.exitApp();
	}
}

function processUrlParam() {
	console.log("processUrlParam() ");
	
	var aid = getUrlParam("actionid");					// 如果URL指定了活动ID，则采用URL中的活动ID
	if (aid != null)
		_actionId = aid;
	//====
	var answerRight = getUrlParam("answerRight");
	if (answerRight != null) {
		answerRightFlag = answerRight;
		console.log("answerRight not null");
	}
	else {
		console.log("answerRight == null");
	}
}

function webPageInit(num){
	console.log(num);
	if(num == 0){
		console.log("初始化页面");
		actionInit(false);
	}else{
		console.log("刷新页面");
		updateMainPage(false);
	}
}
//我的奖品
function getMyAwards(curActionid) {
	console.log(_mac+"--"+_model+"--"+_chip+"--"+_udid+"--"+curActionid);
	var ajaxTimeoutOne = $.ajax({
		type: "get",
		async: true,
		timeout: 10000,
		dataType: 'json',
		url: adressIp + "/building/v2/web/u-award",
		data: {
			"clientType": "web",
			"id": curActionid,
			"cUDID": _udid,
			"MAC": _mac,
			"cModel": _model,
			"cChip": _chip
		},
		success: function(data) {
			console.log(curActionid);
			console.log(JSON.stringify(data));
			dataObj = data;
		},
		error: function() {
			console.log("-----------------------error");
			dataObj = {};
		},
		complete: function(XMLHttpRequest, status) {
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {
				ajaxTimeoutOne.abort();
			}
			dealAfterGetAward(dataObj);
		}
	});
}

function dealAfterGetAward(obj) {
	console.log(JSON.stringify(obj));
	_arr1 = [];//红包
	_arr2 = [];//实体将
	_arr3 = [];//优惠券
	_arr4 = [];//权益体验卡
	if(obj.code == "50100") {
		console.log("获取我的奖励成功");
		if(obj.data == undefined) {
			obj.data = [];
		}
		if(obj.data.length != 0) {
			console.log("有奖品");
			for(var i = 0; i < obj.data.length; i++) {
				var _time = obj.data[i].awardTime;
				_time = _time.substr(0, 10);
				var objItem = {
					"awardName": obj.data[i].awardName,
					"awardTime": _time,
					"awardType": obj.data[i].awardTypeId,
					"awardUrl": obj.data[i].awardUrl,
					"state": obj.data[i].awardExchangeFlag,
					"userkeyId": obj.data[i].userKeyId,
					"awardId": obj.data[i].awardId,
					"rememberId": obj.data[i].lotteryAwardRememberId,
					"lotteryActiveId": obj.data[i].activeId
				}
				if (obj.data[i].awardTypeId == "7") {
                    objItem.redNumber = JSON.parse(obj.data[i].awardInfo).bonus;
                    console.log(objItem.redNumber);
                    _arr1.push(objItem);
                }
                if (obj.data[i].awardTypeId == "2") {
                    if (obj.data[i].awardExchangeFlag == 1) {
                    	console.log(JSON.stringify(obj.data[i]));
                        if (obj.data[i].awardAddressEntity.userProvince == obj.data[i].awardAddressEntity.userCity) {
                            objItem.awardAddress = obj.data[i].awardAddressEntity.userCity + obj.data[i].awardAddressEntity.userArea + obj.data[i].awardAddressEntity.userAddress;
                        } else {
                            objItem.awardAddress = obj.data[i].awardAddressEntity.userProvince + obj.data[i].awardAddressEntity.userCity + obj.data[i].awardAddressEntity.userArea + obj.data[i].awardAddressEntity.userAddress;
                        }
                        objItem.userPhone = obj.data[i].awardAddressEntity.userPhone;
                        objItem.userName = obj.data[i].awardAddressEntity.receiveName;
                        objItem.receiveTime = obj.data[i].awardAddressEntity.receiveTime;
                    }
                    _arr2.push(objItem);
                }
                if (obj.data[i].awardTypeId == "5") {
                	console.log(JSON.parse(obj.data[i].awardInfo));
                	objItem.awardInfo = obj.data[i].awardInfo;
                    _arr3.push(objItem);
                }
                if (obj.data[i].awardTypeId == "1") {
                    objItem.awardInfo = obj.data[i].awardInfo;;
                    _arr4.push(objItem);
                }
			}
		}
	}
	dealAllData(_arr1,_arr2,_arr3,_arr4);
}

function dealAllData(oArr1,oArr2,oArr3,oArr4){
	console.log(JSON.stringify(oArr1));//红包
	console.log(JSON.stringify(oArr2));//实体将
	console.log(JSON.stringify(oArr3));//优惠券
	console.log(JSON.stringify(oArr4));//权益体验卡
	$("#myawardPage").css("display", "block");
	$("#noAwardBox").css("display", "none");
	$("#myAwardBox").css("display","none");
	if (oArr1.length+oArr2.length+oArr3.length+oArr4.length == 0) {
		console.log("没有奖励");
		$("#noAwardBox").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn2"), "#noAwardBox", "btn-focus", function() {}, function(val) {}, function(obj) {});
	}else{
		console.log("有奖励");
		document.getElementById("couponTabs").innerHTML = '';
        document.getElementById("redTabs").innerHTML = '';
        document.getElementById("entityTabs").innerHTML = '';
        document.getElementById("cardTabs").innerHTML = '';
		$("#myAwardBox").css("display","block");
		showMyAward(oArr1,oArr2,oArr3,oArr4);
		console.log(_curFocusId);
		if (_curFocusId==""||_curFocusId==null) {
			$(".myAwards:eq(0)").trigger("focus");
		} else{
			if ($("#"+_curFocusId).length == 0) {
				_curFocusId = "redAwardHasGot";
			}
	    	console.log(_curFocusId);
			$("#"+_curFocusId).trigger("focus");
		}
		map = new coocaakeymap($(".coocaa_btn2"), "#"+_curFocusId, "btn-focus", function() {}, function(val) {}, function(obj) {});
	}
	buttonInitAfter();
}

function showMyAward(arr1,arr2,arr3,arr4){
	$("#myAwardBox").css("display", "block");
	console.log(JSON.stringify(arr1));//红包
	console.log(JSON.stringify(arr2));//实体将
	console.log(JSON.stringify(arr3));//优惠券
	console.log(JSON.stringify(arr4));//权益体验卡
	if (arr1.length != 0) {
		$("#redBox").css("display", "inline-block");
		var _cardRedNum = 0; //记录已领取的红包总额
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i].state == 1) {
            	console.log(toDecimal(arr1[i].redNumber));
            	console.log(typeof(toDecimal(arr1[i].redNumber)));
                _cardRedNum += toDecimal(arr1[i].redNumber);
            } else if (arr1[i].state == 0) {
                var redDivBox = '<div id="redAward'+i+'" awardType="'+arr1[i].awardType+'" awardState="'+arr1[i].state+'" rememberId="'+arr1[i].rememberId+'" awardId="'+arr1[i].awardId+'" userkeyId="'+arr1[i].userkeyId+'" awardName="'+arr1[i].awardName+'" awardTime="'+arr1[i].awardTime+'" redNumber="'+arr1[i].redNumber+'" lotteryActiveId="'+arr1[i].lotteryActiveId+'" class="myAwards redAwardNotGot coocaa_btn2"><div class="myawardsImg myawardsStyle2"><img class="redImg" src="images/award/rednotget.png"/><span class="redNumber">'+arr1[i].redNumber+'</span></div><div class="awardbtns"><img class="myawardsBtn" src="images/award/notget.png"/><img class="myawardsBorder" src="images/award/border.png"/><div class="btnName">待领取</div></div></div>';
                document.getElementById("redTabs").innerHTML += redDivBox;
            }
        }
        console.log(_cardRedNum);
        _cardRedNum = toDecimal(_cardRedNum);
        if (_cardRedNum != 0) {
            var redDivBox2 = '<div id="redAwardHasGot" awardType="7" awardState="1" class="myAwards coocaa_btn2"><div class="myawardsImg myawardsStyle2"><img class="redImg" src="images/award/redhasgot.png"/><span class="redNumber">'+_cardRedNum+'</span></div><div class="awardbtns"><img class="myawardsBtn" src="images/award/hasgot.png"/><img class="myawardsBorder" src="images/award/border.png" /><div class="btnName">已领取</div></div></div>';
            document.getElementById("redTabs").innerHTML += redDivBox2;
            $("#redHasGetNum").html(_cardRedNum);
        }		
	}
	if (arr2.length != 0) {
		$("#entityBox").css("display", "inline-block");
        for (var i = 0; i < arr2.length; i++) {
            if (arr2[i].state == 0) {
            	var entityDivBox = '<div id="entityAward'+i+'" awardType="'+arr2[i].awardType+'" awardState="'+arr2[i].state+'" rememberId="'+arr2[i].rememberId+'" awardId="'+arr2[i].awardId+'" userkeyId="'+arr2[i].userkeyId+'" awardName="'+arr2[i].awardName+'" awardTime="'+arr2[i].awardTime+'" lotteryActiveId="'+arr2[i].lotteryActiveId+'" class="myAwards redAwardNotGot coocaa_btn2"><div class="myawardsImg myawardsStyle2"><img class="entityImg" src="images/award/entitybg.png"/><span class="entityName">'+arr2[i].awardName+'</span></div><div class="awardbtns"><img class="myawardsBtn" src="images/award/notget.png"/><img class="myawardsBorder" src="images/award/border.png"/><div class="btnName">待领取</div></div></div>';
            } else {
            	var entityDivBox = '<div id="entityAward'+i+'" awardType="'+arr2[i].awardType+'" awardState="'+arr2[i].state+'" rememberId="'+arr2[i].rememberId+'" awardId="'+arr2[i].awardId+'" userkeyId="'+arr2[i].userkeyId+'" awardName="'+arr2[i].awardName+'" awardTime="'+arr2[i].awardTime+'" lotteryActiveId="'+arr2[i].lotteryActiveId+'" awardAddress="'+arr2[i].awardAddress+'" userPhone="'+arr2[i].userPhone+'" userName="'+arr2[i].userName+'" receiveTime="'+arr2[i].receiveTime+'" class="myAwards redAwardNotGot coocaa_btn2"><div class="myawardsImg myawardsStyle2"><img class="entityImg" src="images/award/entitybg.png"/><span class="entityName">'+arr2[i].awardName+'</span></div><div class="awardbtns"><img class="myawardsBtn" src="images/award/hasgot.png"/><img class="myawardsBorder" src="images/award/border.png"/><div class="btnName">已领取</div></div></div>';
            }
            document.getElementById("entityTabs").innerHTML += entityDivBox;
        }
	}
	if (arr3.length != 0) {
		console.log("优惠券");
		$("#couponBox").css("display", "inline-block");
        for (var i = 0; i < arr3.length; i++) {
            if(arr3[i].state == 1){
            	var couponDivBox = '<div id="couponAward'+i+'" awardType="'+arr3[i].awardType+'" awardState="'+arr3[i].state+'" rememberId="'+arr3[i].rememberId+'" awardId="'+arr3[i].awardId+'" userkeyId="'+arr3[i].userkeyId+'" awardName="'+arr3[i].awardName+'" awardTime='+arr3[i].awardTime+' lotteryActiveId="'+arr3[i].lotteryActiveId+'"  awardUrl="'+arr3[i].awardUrl+'" awardInfo='+arr3[i].awardInfo+' class="myAwards coocaa_btn2"><div class="myawardsImg myawardsStyle2"><img class="couponImg" src="'+arr3[i].awardUrl+'"/></div><div class="awardbtns hasgotBtn"><img class="myawardsBtn" src="images/award/hasgot.png"/><img class="myawardsBorder" src="images/award/border.png"/><div class="btnName">立即使用</div></div></div>';
            }else{
            	var couponDivBox = '<div id="couponAward'+i+'" awardType="'+arr3[i].awardType+'" awardState="'+arr3[i].state+'" rememberId="'+arr3[i].rememberId+'" awardId="'+arr3[i].awardId+'" userkeyId="'+arr3[i].userkeyId+'" awardName="'+arr3[i].awardName+'" awardTime="'+arr3[i].awardTime+'" lotteryActiveId="'+arr3[i].lotteryActiveId+'"  awardUrl="'+arr3[i].awardUrl+'" class="myAwards coocaa_btn2"><div class="myawardsImg myawardsStyle2"><img class="couponImg" src="'+arr3[i].awardUrl+'"/></div><div class="awardbtns notgetBtn"><img class="myawardsBtn" src="images/award/notget.png"/><img class="myawardsBorder" src="images/award/border.png"/><div class="btnName">待领取</div></div></div>';
            }
            document.getElementById("couponTabs").innerHTML += couponDivBox;
        }
	}
	if (arr4.length != 0) {
		console.log("体验权");
		$("#cardBox").css("display", "inline-block");
        for (var i = 0; i < arr4.length; i++) {
            if(arr4[i].state == 1){
            	var cardDivBox = '<div id="cardAward'+i+'" awardType="'+arr4[i].awardType+'" awardState="'+arr4[i].state+'" rememberId="'+arr4[i].rememberId+'" awardId="'+arr4[i].awardId+'" userkeyId="'+arr4[i].userkeyId+'" awardName="'+arr4[i].awardName+'" awardTime="'+arr3[i].awardTime+'" lotteryActiveId="'+arr4[i].lotteryActiveId+'"  awardUrl="'+arr4[i].awardUrl+'" awardInfo="'+JSON.stringify(arr4[i].awardInfo)+'" class="myAwards coocaa_btn2"><div class="myawardsImg myawardsStyle2"><img class="cardImg" src="'+arr4[i].awardUrl+'"/><span class="cardName">'+arr4[i].awardName+'</span></div><div class="awardbtns"><img class="myawardsBtn" src="images/award/hasgot.png"/><img class="myawardsBorder" src="images/award/border.png"/><div class="btnName">立即体验</div></div></div>';
            }else{
            	var cardDivBox = '<div id="cardAward'+i+'" awardType="'+arr4[i].awardType+'" awardState="'+arr4[i].state+'" rememberId="'+arr4[i].rememberId+'" awardId="'+arr4[i].awardId+'" userkeyId="'+arr4[i].userkeyId+'" awardName="'+arr4[i].awardName+'" awardTime="'+arr3[i].awardTime+'" lotteryActiveId="'+arr4[i].lotteryActiveId+'"  awardUrl="'+arr4[i].awardUrl+'" awardInfo="'+JSON.stringify(arr4[i].awardInfo)+'" class="myAwards coocaa_btn2"><div class="myawardsImg myawardsStyle2"><img class="cardImg" src="'+arr4[i].awardUrl+'"/><span class="cardName">'+arr4[i].awardName+'</span></div><div class="awardbtns"><img class="myawardsBtn" src="images/award/notget.png"/><img class="myawardsBorder" src="images/award/border.png"/><div class="btnName">待领取</div></div></div>';
            }
            document.getElementById("cardTabs").innerHTML += cardDivBox;
        }
	}
	buttonInitAfter();
}
//保留小数
function toDecimal(x) {
    var val = Number(x);
    if(!isNaN(parseFloat(val))) {
        val = val.toFixed(2);//把 Number 四舍五入为指定小数位数的数字。
    }
    val = Number(val);
    return  val;
}
//优惠券的领取并跳转
function sendPrizes(oAwardId, oRememberId, oType, oUserKeyId, oActiveId, oQsource) {
	console.log(oAwardId + "--" + oRememberId + "--" + oUserKeyId + "--" + oType + "--" + oActiveId);
	if(oQsource != "tencent") {
		oQsource = "iqiyi";
	}
	var ajaxTimeoutFive = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: adressIp + "/v4/lottery/verify/receive",
		data: {
			"cUDID": oUserKeyId,
			"activeId": oActiveId,
			"awardId": oAwardId,
			"rememberId": oRememberId,
			"awardTypeId": oType,
			"userKeyId": oUserKeyId,
			"MAC": _mac,
			"cOpenId": _openId,
			"source": oQsource
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") {
				if (oType == "5") {
					var couponDetail = data.data.couponInfo.couponDetail;
					console.log(couponDetail);
					if(couponDetail == 1) { //已配置
						var data_a = data.data.couponInfo.onclickData;
						var packageName = JSON.parse(data_a).packageName;
						var byvalue = JSON.parse(data_a).byvalue;
						var bywhat = JSON.parse(data_a).bywhat;
						var obj = JSON.parse(data_a).param;
						var sources = new Array();
						for(var key in obj) {
							var px = {};
							px[key] = obj[key];
							sources.push(px);
						}
						sources = JSON.stringify(sources);
						console.log(packageName + "--" + byvalue + "--" + bywhat + "--" + sources);
						console.log("跳转使用页面");
						coocaaosapi.startParamAction(bywhat, byvalue, sources, function(message) {}, function(error) {
							console.log(error);
						});
					} else {
						console.log("未配置");
					}
				} else if(oType == "1"){
					var taskId = "";
                	if (_qsource == "tencent") {
                		taskId = "103177";
                	} else{
                		taskId = "103178";
                	}
                	coocaaosapi.startHomeCommonList(taskId,function(){},function(){});
				}
			} else {
				console.log("优惠券/体验券激活失败,需要给出激活失败的提示.");
			}
		},
		error: function() {
			console.log("获取失败");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutFive.abort();　　　　
			}
		}
	});

}
function buttonInitAfter() {
	$("#myawardPage .myAwards").unbind("itemFocus").bind("itemFocus", function() {
		console.log("----myAwards focus----");
		var awardBoxIdArray = ["couponTabs","redTabs","entityTabs","cardTabs"];
        var _index1 = $("#myawardPage .myAwards").index($(this)); //btn是第几个
        var _index2 = $(".awardTabs").index($(this).parent()); //btn所在的盒子是第几个
        var _index3 = $(".awardTabs:visible").index($(this).parent());
        var myScrollTopValue = 0;
        console.log(_index3);
        for (var j=1; j<(_index3+1);j++) {
        	myScrollTopValue += $(".awardTabs:visible")[j-1].offsetHeight;
        }
        console.log(myScrollTopValue);
        var _index4 = $("#"+awardBoxIdArray[_index2]+" .myAwards").index($(this));
        var _curLine = Math.floor(_index4/4);
        var _itemWidth = $("#allowanceTabs .myAwards:eq(0)").outerHeight(true);
        myScrollTopValue += _curLine*_itemWidth;
        console.log(myScrollTopValue);
        $("#myAwardBox").stop(true, true).animate({ scrollTop: myScrollTopValue }, { duration: 0, easing: "swing" });
	});
	
	$(".myAwards").unbind("itemClick").bind("itemClick", function() {
		_curFocusId = $(this).attr("id");
		console.log(_curFocusId)
		var _clickIndex = $(".myAwards").index($(this));
        var _awardId = $(this).attr("awardId");
        var _awardName = $(this).attr("awardName");
        var _awardTime = $(this).attr("awardTime");
        var _awardType = $(this).attr("awardType");
        var _awardUrl = $(this).attr("awardUrl");
        var _awardState = $(this).attr("awardState");
        var _lotteryActiveId = $(this).attr("lotteryActiveId");
        var _rememberId = $(this).attr("rememberId");
        var _userkeyId = $(this).attr("userkeyId");
        
        var _dateObj = {
			"page_name": "弹窗页面",
			"parent_page": "我的奖品页",
			"award_type": "",
			"award_id": _awardId,
			"award_name": _awardName,
			"page_type": "",
			"activity_type": "2019教育暑期活动",
			"activity_name": "2019教育暑期活动",
			"OPEN_ID": _openId
		};
		var _dateObj2 = {
			"page_name": "我的奖品页",
			"button_name": "",
			"page_type": "我的奖品页",
			"activity_type": "2019教育暑期活动",
			"activity_name": "2019教育暑期活动",
			"OPEN_ID": _openId
		};
        console.log(_loginstatus);
        if (_awardType == 7) {
            var _redNumber = $(this).attr("redNumber");
            console.log("点击了红包");
            if (_loginstatus == "false") {
                console.log("点击了红包+启登录");
                startAndSendLog();
            } else {
            	console.log("点击了红包+展示信息");
                $("#dialogPage").css("display", "block");
                $("#dialogPage .secondDialog").css("display","none");
                if (_awardState == 0) {
                    console.log("点击了红包+显示二维码");
                    _dateObj.award_type = "微信红包";
                    _dateObj.page_type = "领取微信红包";
                    webDataLog("web_page_show_new", _dateObj);
                    _dateObj2.button_name = "待领取-微信红包";
                    webDataLog("web_button_clicked_new", _dateObj2);
                    $(".secondDialog").css("display", "none");
                    $("#redNotGet").css("display", "block");
                    $("#redContent span").html(_redNumber);
                    console.log(_lotteryActiveId + "--" + _rememberId + "--" + _userkeyId);
                    document.getElementById("redQrcode").innerHTML="";
                    getRedPacketsQrcode(_lotteryActiveId, _rememberId, _userkeyId, "redQrcode", 270, 270);
                	map = new coocaakeymap($(".coocaa_btn3"), "#redQrcode", "btn-focus", function() {}, function(val) {}, function(obj) {});
                } else {
                    console.log("点击了红包+显示领取信息");
                    _dateObj.award_type = "微信红包";
                    _dateObj.page_type = "查看微信红包";
                    webDataLog("web_page_show_new", _dateObj);
                    _dateObj2.button_name = "已领取-微信红包";
                    webDataLog("web_button_clicked_new", _dateObj2);
                    $(".secondDialog").css("display", "none");
                    $("#redHasGet").css("display", "block");
					$("#redHasGetInfo span").html(_redNumber);
					map = new coocaakeymap($(".coocaa_btn3"), "#redHasGetBtn", "btn-focus", function() {}, function(val) {}, function(obj) {});
                }
            }
        }
      	if (_awardType == 2) {
            if (_loginstatus == "false") {
                console.log("点击了实物奖+启登录");
                startAndSendLog();
            } else {
            	console.log("点击了实物奖+展示奖品");
                $("#dialogPage").css("display", "block");
                if (_awardState == 0) {
                    console.log("点击了实物奖+显示二维码");
                    _dateObj.award_type = "实物奖品";
                    _dateObj.page_type = "领取实体物品";
                    webDataLog("web_page_show_new", _dateObj);
                    _dateObj2.button_name = "待领取-实物奖品";
                    webDataLog("web_button_clicked_new", _dateObj2);
                    $("#entityInfo1").html("奖品名称:&nbsp;&nbsp;" + _awardName);
                    $("#entityInfo2").html("发放时间:&nbsp;&nbsp;" + _awardTime);
                    $(".secondDialog").css("display", "none");
                    $("#entityNotGet").css("display", "block");
                    $("#entityQrcode").css("display", "block");
                    map = new coocaakeymap($(".coocaa_btn3"), "#entityQrcode", "btn-focus", function() {}, function(val) {}, function(obj) {});
                    var enstr = enurl + "activeId=" + _lotteryActiveId + "&rememberId=" + _rememberId + "&userKeyId=" + _userkeyId + "&open_id=" + _openId;
                    drawQrcode("entityQrcode", enstr, 190);
                } else {
                    console.log("点击了实物奖+显示领取信息");
                    _dateObj.award_type = "实物奖品";
                    _dateObj.page_type = "查看实体物品";
                    webDataLog("web_page_show_new", _dateObj);
                    _dateObj2.button_name = "已领取-实物奖品";
                    webDataLog("web_button_clicked_new", _dateObj2);
                    var _awardAddress = $(this).attr("awardAddress");
                    var _userPhone = $(this).attr("userPhone");
                    var _userName = $(this).attr("userName");
                    var _receiveTime = $(this).attr("receiveTime");
                    $(".secondDialog").css("display", "none");
                    $("#entityHasGet").css("display", "block");
                    $("#hasGotInfo1").html("奖品名称:&nbsp;&nbsp;" + _awardName);
                    $("#hasGotInfo2").html("领取时间:&nbsp;&nbsp;" + _receiveTime);
                    $("#hasGotInfo3").html("联系人:&nbsp;&nbsp;" + _userName);
                    $("#hasGotInfo4").html("联系电话:&nbsp;&nbsp;" + _userPhone);
                    $("#hasGotInfo5").html("收货地址:&nbsp;&nbsp;" + _awardAddress);
                	map = new coocaakeymap($(".coocaa_btn3"), "#hasGotInfo4", "btn-focus", function() {}, function(val) {}, function(obj) {});
                }
            }
        }
        if (_awardType == 5){
        	if (_loginstatus == "false") {
                console.log("点击了优惠券奖+启登录");
                startAndSendLog();
            } else {
        		if(_awardState == 0){
                	console.log("未领取的优惠券+领取优惠券");
                	_dateObj2.button_name = "待领取-优惠券";
                    webDataLog("web_button_clicked_new", _dateObj2);
                	sendPrizes(_awardId, _rememberId, _awardType, _userkeyId,_lotteryActiveId, _qsource);
                }else{
                	console.log("已领取的优惠券+跳转指定页面");
                	_dateObj2.button_name = "立即使用-优惠券";
                    webDataLog("web_button_clicked_new", _dateObj2);
                	var _awardInfo = $(this).attr("awardInfo");
                	console.log(_awardInfo);
                	console.log(typeof _awardInfo);
              	 	var couponDetail = JSON.parse(_awardInfo).couponDetail;
					console.log(couponDetail);
					if(couponDetail == 1) { //已配置
						var data_a = JSON.parse(_awardInfo).onclickData;
						var packageName = JSON.parse(data_a).packageName;
						var byvalue = JSON.parse(data_a).byvalue;
						var bywhat = JSON.parse(data_a).bywhat;
						var obj = JSON.parse(data_a).param;
						var sources = new Array();
						for(var key in obj) {
							var px = {};
							px[key] = obj[key];
							sources.push(px);
						}
						sources = JSON.stringify(sources);
						console.log(packageName + "--" + byvalue + "--" + bywhat + "--" + sources);
						console.log("跳转使用页面");
						coocaaosapi.startParamAction(bywhat, byvalue, sources, function(message) {}, function(error) {
							console.log(error);
						});
					} else {
						console.log("未配置");
					}
                }
        	}
        }
        if (_awardType == 1){
        	if (_loginstatus == "false") {
                console.log("点击了体验券+启登录");
                startAndSendLog();
            } else {
        		if(_awardState == 0){
                	console.log("未领取的体验券+领取体验券");
                	_dateObj2.button_name = "待领取-体验券";
                    webDataLog("web_button_clicked_new", _dateObj2);
                	sendPrizes(_awardId, _rememberId, _awardType, _userkeyId,_lotteryActiveId, _qsource);
                }else{
                	console.log("已领取的体验券+跳转指定页面");
                	_dateObj2.button_name = "立即体验-体验券";
                    webDataLog("web_button_clicked_new", _dateObj2);
                	var taskId = "";
                	if (_qsource == "tencent") {
                		taskId = "103177";
                	} else{
                		taskId = "103178";
                	}
                	coocaaosapi.startHomeCommonList(taskId,function(){},function(){});
                }
        	}
        }
	});
}
function getRedPacketsQrcode(activityId, rememberId, userKeyId, id, width, height) {
    console.log(rememberId + "--" + userKeyId + "--" + id);
    var ajaxTimeoutFive = $.ajax({
        type: "GET",
        async: true,
        timeout: 7000,
        dataType: 'jsonp',
        jsonp: "callback",
        url: adressIp + "/v3/lottery/verify/wechat/qrCode",
        data: {
            "activeId": activityId,
            "MAC": _mac,
            "cChip": _chip,
            "cModel": _model,
            "cEmmcCID": _emmcCID,
            "cUDID": _udid,
            "accessToken": _accessToken,
            "cOpenId": _openId,
            "cNickName": _nickName,
            "rememberId": rememberId,
            "userKeyId": userKeyId,
            "luckyDrawCode": "SPEC_MONEY_SHUJIA",
            "channel": "coocaa",
            "type": 28
        },
        success: function(data) {
            console.log(JSON.stringify(data));
            if (data.code == "200") {
                document.getElementById(id).innerHTML = "";
                var str = data.data;
                var qrcode = new QRCode(document.getElementById(id), {
                    width: width,
                    height: height
                });
                qrcode.makeCode(str);
            }
        },
        error: function() {
            console.log("获取失败");
            document.getElementById(id).innerHTML = "获取失败，请稍后重试";
        },
        complete: function(XMLHttpRequest, status) {
            console.log("lxw -------------complete------------------" + status);
            if (status == 'timeout') {
                ajaxTimeoutFive.abort();
            }
        }
    });
}
//绘制二维码
function drawQrcode(id, url, wh) {
    document.getElementById(id).innerHTML = "";
    var qrcode = new QRCode(document.getElementById(id), {
        width: wh,
        height: wh
    });
    qrcode.makeCode(url);
}
//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return decodeURI(r[2], 'utf-8');
	return null; //返回参数值
}

function webDataLog(logname, dateObj) {
	var _dataString = JSON.stringify(dateObj);
	console.log(logname + "--" + _dataString);
	coocaaosapi.notifyJSLogInfo(logname, _dataString, function(message) {console.log(message);}, function(error) {console.log(error);});
}

function sentLog(eventid,datalist) {
    coocaaosapi.notifyJSLogInfo(eventid, datalist, function(message) { console.log(message); }, function(error) { console.log(error); });
}


//==================================================================================================================================
//==================================================================================================================================
//==================================================================================================================================
//==================================================================================================================================
//==================================================================================================================================
//==================================================================================================================================
//==================================================================================================================================
//==================================================================================================================================
//==================================================================================================================================
//==================================================================================================================================
//==================================================================================================================================

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
var newAwardInfo = null;			// 奖品信息(破冰之后获得的)
var ani_status = 1;
var taskLevel = 0;					// 当前任务是第几关，0为都没有解锁，1为第一关已经解锁，2为第二关已经解锁 ...    
var unlockLevel = 0;				// 当前解锁了第几关，0为都没有解锁，1为第一关已经解锁，2为第二关已经解锁 ...
var task0Idx = 0;					// 第一个任务的索引ID
var task1Idx = 0;					// 第二个任务的索引ID
var task2Idx = 0;					// 第三个任务的索引ID

var activityStartTime = 0;			// 

var answerRightUrl = "http://beta.webapp.skysrt.com/lqq/y19edu/index.html?answerRight=1";
var answerErrorUrl = "http://beta.webapp.skysrt.com/lqq/y19edu/index.html";

var logdata1 = {
	"page_name": "",
	"page_state": "",
	"load_duration": "",
	"activity_type": "",
	"activity_name": "",
	"OPEN_ID": ""
};
var logdata2 = {
	"page_name": "",
	"parent_page": "",
	"award_type": "",
	"award_id": "",
	"award_name": "",
	"page_state": "",
	"activity_type": "",
	"activity_name": "",
	"OPEN_ID": ""
};
var logdata3 = {
	"page_name": "",
	"button_name": "",
	"page_type": "",
	"activity_type": "",
	"activity_name": "",
	"OPEN_ID": ""
};
var logdata4 = {
	"page_name": "",
	"button_name": "",
	"parent_page": "",
	"award_type": "",
	"award_id": "",
	"award_name": "",
	"page_type": "",
	"activity_type": "",
	"activity_name": "",
	"OPEN_ID": ""
};
var logdata5 = {
	"page_name": "",
	"page_type": "",
	"activity_type": "",
	"activity_name": "",
	"activity_duration": "",
	"OPEN_ID": ""
};
var logdata6 = {
	"page_name": "",
	"parent_page": "",
	"page_type": "",
	"activity_type": "",
	"activity_name": "",
	"OPEN_ID": ""
};

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

	if (allUsedNumber >= 30) {
		$("#homePage").css("background-image", "url(images/stageclear.jpg)");
		$("#bottomBar").css("display", "none");
		$("#mainpageHammer").css("display", "none");
		$("#showBox").css("display", "none");
		$("#icepeople").css("display", "none");
		$("#mainpageButton1").css("display", "none");
		$("#mainpageButton2").css("display", "none");
		$("#people1").css("display", "none");
		$("#people2").css("display", "none");
		$("#people3").css("display", "none");
		focusOnMainPage("#mainpageButton3");
		return;
	}

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
	$("#honorBlock").css("display", "block");

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
					//getUserTaskList();				// 刷新任务列表  // onresume 又跑会这里了，去
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
	var focusButton;
	if (button == null || button == undefined)
		focusButton = "#mainpageButton2";
	else
		focusButton = button;
	map = new coocaakeymap($(".coocaa_btn"), focusButton, "btn-focus", empty0, empty1, empty1);
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
			console.log(JSON.stringify(data));						// 把初始化接口的json对象打印出来

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
				if (allNumber > 99)
					allNumber = 99;
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

function getHeroHame(level) {
	var name;
	if (level == 0) 
		name = "勇气宝贝";
	else if (level == 1)
		name = "科考达人";
	else if (level == 2)
		name = "环境卫士";
	else if (level == 3)
		name = "破冰宝贝";
	else if (level == 4)
		name = "救援队员";
	else if (level == 5)
		name = "救援专家";
	else if (level == 6)
		name = "机智宝贝";
	else if (level == 7)
		name = "救援队长";
	else if (level == 8)
		name = "超级探险家";
	else if (level >= 9)
		name = "解救佩奇小英雄";
	return name;
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
	
	autoFillLogData3();
	if (allUsedNumber >= 30)
		logdata3.page_type = "活动主页面-全部解救成功";
	else
		logdata3.page_type = "活动主页面-进行中";
	logdata3.button_name = "活动规则";
	webDataLog("web_button_clicked_new", logdata3);
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

function pressGetMoreHammerButton() {
	showTasksPage();
	
	autoFillLogData3();
	logdata3.button_name = "获得更多锤子";
	webDataLog("web_button_clicked_new", logdata3);
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

function refreshTaskIndex() {
	console.log("refreshTaskIndex()");
	// 拥有的锤子数，除以3，得到当前需要做第几关的任务 
	taskLevel = parseInt(allUsedNumber / 3);
	task0Idx = taskLevel * 3 + 0;
	task1Idx = taskLevel * 3 + 1;
	task2Idx = taskLevel * 3 + 2;
	console.log("taskLevel = " + taskLevel + ", task0Idx = " + task0Idx + ", task1Idx = " + task1Idx + ", task2Idx = " + task2Idx);
	
	if (alltasks[task0Idx].remainingNumber == 0 &&
		alltasks[task1Idx].remainingNumber == 0 &&
		alltasks[task2Idx].remainingNumber == 0 )			// 如果当前关卡的任务都做完了，则取下一关
	{
		task0Idx = (taskLevel + 1) * 3 + 0;
		task1Idx = (taskLevel + 1) * 3 + 1;
		task2Idx = (taskLevel + 1) * 3 + 2;
		console.log("refresh next level:  task0Idx = " + task0Idx + ", task1Idx = " + task1Idx + ", task2Idx = " + task2Idx);
	}
	
	if (task0Idx > 29)				// 一共30个任务，不能数组越界
		task0Idx = 29;
	if (task1Idx > 29)
		task1Idx = 29;
	if (task2Idx > 29)
		task2Idx = 29;
}
		
function showTasksPageInt() {
	
	refreshTaskIndex();
	
	var curIdx;
	if (alltasks[task0Idx].remainingNumber != 0)
		curIdx = task0Idx;
	else if (alltasks[task1Idx].remainingNumber != 0)
		curIdx = task1Idx;
	else 
		curIdx = task2Idx;
	console.log("curIdx = " + curIdx);
	
	if (task0Idx == curIdx)
		$("#taskFrameL0").css("display", "block");
	else 
		$("#taskFrameL0").css("display", "none");
		
	if (task1Idx == curIdx)
		$("#taskFrameL1").css("display", "block");
	else 
		$("#taskFrameL1").css("display", "none");
		
	if (task2Idx == curIdx)
		$("#taskFrameL2").css("display", "block");
	else 
		$("#taskFrameL2").css("display", "none");
	
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
	
	autoFillLogData2();
	logdata2.page_state = "任务弹窗";
	webDataLog("web_button_clicked_new", logdata2);
	
}

function disappearTasksPage() {
	$("#tasksPage").css("display", "none");
}

// 去做任务 
function gotoDoTask(){
	
	console.log("gotoDoTask()");
	refreshTaskIndex();
	
	var curIdx;
	if (alltasks[task0Idx].remainingNumber != 0)
		curIdx = task0Idx;
	else if (alltasks[task1Idx].remainingNumber != 0)
		curIdx = task1Idx;
	else 
		curIdx = task2Idx;
	console.log("curIdx = " + curIdx);
	
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
	"param": "{\"videoUrl\":\"\",\"adId\":\"11\"}",
	"problem": "{\"problem\":\"邓伦在《封神演义》中是的角色是？\",\"answerA\":\"杨戬\",\"rightAnswer\":\"B\",\"answerB\":\"狐妖\"}",
	"videoSource": "adId",
	"seq": 0,
	"createTime": "2019-06-25 11:41:24",
	"updateTime": "2019-06-25 11:41:24",
	"version": 0,
	"remainingNumber": 1
}
	;*/
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
		"param": "{\"videoUrl\":\"http://v-play.coocaatv.com/0915/dongwushijie.mp4\",\"adId\":\"\"}",
		"problem": "{\"problem\":\"邓伦在《封神演义》中是的角色是？\",\"answerA\":\"杨戬\",\"rightAnswer\":\"B\",\"answerB\":\"狐妖\"}",
		"videoSource": "cdnURL",
		"seq": 0,
		"createTime": "2019-06-25 11:41:24",
		"updateTime": "2019-06-25 11:41:24",
		"version": 0,
		"remainingNumber": 1
	};
	*/
	console.log("task = " + JSON.stringify(taskinfo));
	
	autoFillLogData4();
	logdata4.button_name = "正在做" + taskinfo.taskName;
	logdata4.page_type = "任务弹窗";
	webDataLog("web_button_clicked_new", logdata4);
	
	var needCheckVersion = true;
	
	var param = taskinfo.param;							// 启动任务的json参数字符串
	var taskType = taskinfo.taskType;					// 任务类型,jump,videoAndAsk,buy,download
	var problem = taskinfo.problem;						// 问答任务时的问题
	var goBackOnclick = taskinfo.goBackOnclick;			//
	var videoSource = taskinfo.videoSource;				// 视频来源

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
	
	var videoAskJump = false;							// 是否视频答题采用直接跳转的方式
	
	if (taskType == "videoAndAsk" && videoSource == "onclick")
		videoAskJump = true;
	
	if (taskType == "jump" || videoAskJump)  // 跳转任务
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
						showAppVerLowDialog("影视");
						return;
					}  else if (pkgname == "com.coocaa.mall") {
						showAppVerLowDialog("优选购物");
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
								showAppVerLowDialog("活动浏览器");
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
				showAppVerLowDialog("活动浏览器");
				return;
			} else {
				// am start -d appx://com.coocaa.videoask?taskParams="11"&videoAskParams="222"
				var taskParamStr;
				if (videoSource == "adId") {
					var paramObj1 = {
						"activeId": parseInt(_actionId),
						"taskId": taskinfo.taskId
					};
					var paramObj2 = {
						"videoUrl": "",
						"adId": JSON.stringify(paramObj1)
					};
					taskParamStr = JSON.stringify(paramObj2);
				}
				else if (videoSource == "cdnURL") {
					taskParamStr = param;
				}
				else if (videoSource == "onclick") {
					// 跳转
				}
				console.log("taskParamStr = " + taskParamStr);
				
				var timestampms = Date.parse(new Date());
				var timestamp = parseInt(timestampms / 1000);			// 当前时间戳(秒)
				var answerRightOnClick = {
					"bywhat" : "action",
					"packageName": "com.coocaa.app_browser",
					"byvalue": "coocaa.intent.action.browser",
					"dowhat": "startActivity",
					"versionCode": "1",
					"params" : {
						"url" : answerRightUrl
					}
				};
				var answerErrorOnClick = {
					"bywhat" : "action",
					"packageName": "com.coocaa.app_browser",
					"byvalue": "coocaa.intent.action.browser",
					"dowhat": "startActivity",
					"versionCode": "1",
					"params" : {
						"url" : answerErrorUrl
					}
				};
				var myProblem = {
					"rightAns": "B",
					"answerA": "答案选项A",
					"answerB": "答案选项B",
					"question": "你选择A还是B",
					"answerErrorClickType": "BACK_REPLAY",
					"answerRightClickType": "CUSTOM",
					"answerRightOnClick": answerRightOnClick,
					"answerErrorOnClick": answerErrorOnClick
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
				
				var dataerParams = {
					"parent_page_name": "任务弹窗",
					"activity_type" : "2019教育暑期活动",
					"activity_name" : "2019教育暑期活动"
				};
				
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
					"dataerParams" : dataerParams
				};
				var videoAskParamStr = JSON.stringify(videoAskParams);
				console.log("videoAskParamStr = " + videoAskParamStr);
				
				appx_url = 'appx://com.coocaa.videoask?taskParams=';
				appx_url += encodeURIComponent(taskParamStr) + '&videoAskParams=';
				appx_url += encodeURIComponent(videoAskParamStr);
				
				console.log("appx_url = " + appx_url);
				
				var cmdParam = {
					"uri": appx_url,
                    "pre_load": false
				};
				var cmdParamStr = JSON.stringify(cmdParam);
				
				setTimeout(function () {
					coocaaosapi.startAppX2(appx_url, "false", function(){}, function(){});
				}, 1);
				
				setTimeout(function () {
					console.log("视频答题，退掉自己");
					navigator.app.exitApp();
				}, 1000);
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
	
	autoFillLogData4();
	logdata4.button_name = "获得更多锤子";
	logdata4.page_type = "当天做任务获得3把锤子后继续做任务提醒弹窗";
	webDataLog("web_button_clicked_new", logdata4);
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
	
	autoFillLogData4();
	logdata4.button_name = "随便逛逛";
	logdata4.page_type = "当天做任务获得3把锤子后继续做任务提醒弹窗";
	webDataLog("web_button_clicked_new", logdata4);
}

function pressMyAwardsButton() {
	//_actionId = getUrlParam("actionid");//主活动的id
	$("#myawardPage").css("display","block");
	getMyAwards(_actionId);
	
	autoFillLogData3();
	logdata3.button_name = "我的奖品";
	if (allUsedNumber >= 30)
		logdata3.page_type = "活动主页面-全部解救成功";
	else
		logdata3.page_type = "活动主页面-进行中";
	webDataLog("web_button_clicked_new", logdata3);
}

function pressFirstInOKBtn(){
	entryType = 0;
	updateMainPage(false);
	
	autoFillLogData4();
	logdata4.button_name = "开始营救";
	logdata4.page_type = "首次进活动";
	webDataLog("web_button_clicked_new", logdata4);
}

var icebreakLastTime = 0;

function pressIceBreakButton() {

	var nowTime = new Date().getTime();
	console.log("" + icebreakLastTime + ", " + nowTime);
	if (nowTime - icebreakLastTime < 3000) {				// 禁止频繁按这个按钮 
		console.log("限制频繁按破冰块按钮");
		return;
	} else {
		icebreakLastTime = new Date().getTime();
		console.log("允许按破冰块按钮");
	}

	icebreak();
	
	autoFillLogData3();
	if (allNumber - allUsedNumber > 0)
		logdata3.button_name = "砸冰块";
	else
		logdata3.button_name = "获得破冰锤";
	webDataLog("web_button_clicked_new", logdata3);
}

// 点击“砸冰块”
function icebreak() {
	//crushIceFunc(null);				// for test
	//return;
	
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
					if (data.data == undefined || data.data == null)
						newAwardInfo = null;
					else
						newAwardInfo = data.data;
					// 执行破冰动效
					crushIceFunc(data);
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
					"width":"340px",
					"height":"340px",
					"left":"850px",
					"top":"380px",
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
						"width":"340px",
						"height":"340px",
						"left":"850px",
						"top":"380px",
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

// 展示抽奖结果
function showDrawResule(obj) {
	console.log("showDrawResule()");
	
	var nowUsedNumber = allUsedNumber + 1;							// 刚用掉了一把锤子，还没有重新从服务器取值，这里手动加上1
	var gate = parseInt(nowUsedNumber / 3);							// 第几关
	var just = nowUsedNumber % 3;									// 是否刚好破完所有冰块
	
	var haveAward = false;											// 有奖品
	var awardName = "";												// 奖品名
	var heroHame = "";												// 英雄称号
	var title = "";													// 成功文案
	var imgFileName = "";											// 人物图像文件名
	
	if (just != 0) {				// 没有完全解救,则直接回到主页面
		actionInit(false);
		return;
	}
	
	if (newAwardInfo == undefined || newAwardInfo == null) {		// 毛奖品都没有
		awardName = "";
	} else {
		if ((newAwardInfo.awardName != undefined && newAwardInfo.awardName != null)) {
			awardName = newAwardInfo.awardName;
			haveAward = true;
		}
		else 
			awardName = "";
	}
	
	if (gate <= 1) {
		title = "跟超级飞侠飞往南极";
		imgFileName = "images/ice/obj03.png";
	}
	else if (gate == 2) {
		title = "跟汪汪队学习救援知识";
		imgFileName = "images/ice/obj13.png";
	}
	else if (gate == 3) {
		title = "解救南极海洋动物-获得3天少儿权益卡";
		imgFileName = "images/ice/obj23.png";
	}
	else if (gate == 4) {
		title = "成功解救猪妈妈！佩奇你在哪里？";
		imgFileName = "images/ice/obj33.png";
	}
	else if (gate == 5) {
		title = "快看，我们得到了破冰船！！！";
		imgFileName = "images/ice/obj43.png";
	}
	else if (gate == 6) {
		title = "哇！我们救出来乔治弟弟和恐龙！<br/> -少儿VIP 100元购买特权";
		imgFileName = "images/ice/obj53.png";
	}
	else if (gate == 7) {
		title = "别着急！加速引擎在这里";
		imgFileName = "images/ice/obj63.png";
	}
	else if (gate == 8) {
		title = "好重的猪爸爸！你该减肥了！！！";
		imgFileName = "images/ice/obj73.png";
	}
	else if (gate == 9) {
		title = "营救佩奇的关键！救援百宝箱";
		imgFileName = "images/ice/obj83.png";
	}
	else if (gate >= 10) {
		title = "你好！小猪佩奇 - 实物奖品" + awardName;
		imgFileName = "images/ice/obj93.png";
	}
	
	heroHame = getHeroHame(gate);
	
	showHelpOKDialog(haveAward, awardName, heroHame, title, imgFileName);
}

function findMoreHammer() {
	console.log("findMoreHammer() ");
	
	$("#giveHammerDialog").css("display", "none");
	$(".secondDialog").css("display", "none");
	$("#dialogPage").css("display", "none");
	
	// 继续寻找锤子 -- 若已完成当前级的所有任务，则显示主界面，未完成的则跳到做任务界面
	if (alltasks == null || alltasks == undefined) {
		//actionInit();
	}
	else  {
		refreshTaskIndex();
		if (alltasks[task0Idx].remainingNumber == 0 && 
			alltasks[task0Idx].remainingNumber == 0 && 
			alltasks[task0Idx].remainingNumber == 0 ) {			// 如果当前关卡的任务都做完了
			//==
		}
		else {
			getUserTaskList();
		}
	}

	// 继续寻找锤子按钮
	autoFillLogData4();
	logdata4.button_name = "继续寻找锤子";
	logdata4.page_type = "购买产品包给锤子";
	webDataLog("web_button_clicked_new", logdata4);
}

function helpOKBtnClick() {
	console.log("helpOKBtnClick() ");
	disappearHelpOKDialog();
	
	//====================
	if (newAwardInfo != null && newAwardInfo != undefined) {
		autoFillLogData3();
		logdata3.button_name = "欣然收下";
		webDataLog("web_button_clicked_new", logdata3);
		//
		autoFillLogData4();
		logdata4.button_name = "欣然收下";
		logdata4.page_type = "解救冰冻物体后有奖";
		logdata4.award_type = newAwardInfo.awardTypeId;
		logdata4.award_id = "" + newAwardInfo.awardId;
		logdata4.award_name = newAwardInfo.awardName;
		if (allUsedNumber + 1 >= 30)
			logdata4.page_type = "最后一关";
		webDataLog("web_button_clicked_new", logdata4);
	}
	else {
		autoFillLogData4();
		logdata4.button_name = "继续破冰";
		logdata4.page_type = "解救冰冻物体后无奖";
		if (allUsedNumber + 1 >= 30)
			logdata4.page_type = "最后一关";
		webDataLog("web_button_clicked_new", logdata4);
	}
	//======================
	
	actionInit(false);
	
	if (newAwardInfo != null && newAwardInfo != undefined) { 			//有奖品
		if(_loginstatus == "false") {
			startAndSendLog();
		}
		else {		// 已经登录的话，直接领取
			getNewAward();
		}
	}
	else {
		actionInit(false);
	}
}

function getNewAward() {
	if (newAwardInfo != null && newAwardInfo != undefined) {
		getAwardAtOnce(
			newAwardInfo.awardId, 
			newAwardInfo.lotteryAwardRememberId, 
			newAwardInfo.awardTypeId, 
			newAwardInfo.userKeyId, 
			newAwardInfo.activeId, 
			_qsource);
	}
}

// 立即领取奖品
function getAwardAtOnce(oAwardId, oRememberId, oType, oUserKeyId, oActiveId, oQsource) {
	console.log("getAwardAtOnce() ");
	
	if(oQsource != "tencent") {
		oQsource = "iqiyi";
	}
	
	console.log("oType = " + oType + ", oAwardId = " + oAwardId + ", oRememberId = " + oRememberId);
	if(oType == "7") { // 红包
		var redNumber = "";
		if (newAwardInfo != null && newAwardInfo != undefined) {
			if (newAwardInfo.awardInfo != null && newAwardInfo.awardInfo != undefined)
				redNumber = newAwardInfo.awardInfo.bonus;
		}
		showRedGet2Dialog(oActiveId, oRememberId, oUserKeyId, redNumber);
	} else if (oType == "2") { // 实物奖品
		var awardName = "";
		var awardTime = "";
		if (newAwardInfo != null && newAwardInfo != undefined) {
			awardName = newAwardInfo.awardName;
			awardTime = newAwardInfo.awardTime
		}
		showEntityGetDialog2(awardName, awardTime, oActiveId, oRememberId, oUserKeyId, _openId);
	}
	else if (oType == "5" || oType == "1") {
		var ajaxTimeoutFive = $.ajax({
			type: "GET",
			async: true,
			timeout: 5000,
			dataType: 'jsonp',
			jsonp: "callback",
			url: adressIp + "/v4/lottery/verify/receive",
			data: {
				"cUDID": oUserKeyId,
				"activeId": oActiveId,
				"awardId": oAwardId,
				"rememberId": oRememberId,
				"awardTypeId": oType,
				"userKeyId": oUserKeyId,
				"MAC": _mac,
				"cOpenId": _openId,
				"source": oQsource
			},
			success: function(data) {
				console.log(JSON.stringify(data));
				if(data.code == "50100") {
					if (oType == "5") {			// 优惠券
						var couponDetail = data.data.couponInfo.couponDetail;
						console.log(couponDetail);
						if(couponDetail == 1) { //已配置
							var data_a = data.data.couponInfo.onclickData;
							var packageName = JSON.parse(data_a).packageName;
							var byvalue = JSON.parse(data_a).byvalue;
							var bywhat = JSON.parse(data_a).bywhat;
							var obj = JSON.parse(data_a).param;
							var sources = new Array();
							for(var key in obj) {
								var px = {};
								px[key] = obj[key];
								sources.push(px);
							}
							sources = JSON.stringify(sources);
							console.log(packageName + "--" + byvalue + "--" + bywhat + "--" + sources);
							console.log("跳转使用页面");
							coocaaosapi.startParamAction(bywhat, byvalue, sources, function(message) {}, function(error) {
								console.log(error);
							});
						} else {
							console.log("未配置");
						}
					} else if(oType == "1"){		// 影视会员直通车
						var taskId = "";
		            	if (_qsource == "tencent") {
		            		taskId = "103177";
		            	} else{
		            		taskId = "103178";
		            	}
		            	coocaaosapi.startHomeCommonList(taskId,function(){},function(){});
					}
				} else {
					console.log("领奖失败");
				}
			},
			error: function() {
				console.log("获取失败");
			},
			complete: function(XMLHttpRequest, status) {　　　　
				console.log("-------------complete------------------" + status);
				if(status == 'timeout') {　　　　　
					ajaxTimeoutFive.abort();　　　　
				}
			}
		});
	}
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
	if($("#helpOKDialog").css("display") == "block") {				// 解救成功的的弹窗
		disappearHelpOKDialog();
		actionInit(false);
		return true;
	}
	if($("#redNotGet_2").css("display") == "block") {				// 扫码领取微信红包的弹窗
		disappearRedGet2Dialog();
		actionInit(false);
		return true;
	}
	if($("#entityGetDialog2").css("display") == "block") {			// 扫码领取实物奖品的弹窗
		disappearEntityGetDialog2();
		actionInit(false);
		return true;
	}
	
	return false;
}

// 所有弹窗消失
function disappearAllDialog() {
	$("#dialogPage").css("display", "none");
	//==================================================
	$(".secondDialog").css("display", "none");
}

// 显示首次进入的弹窗
function showFirstInDialog() {
	$("#dialogPage").css("display", "block");
	$("#firstInDialog").css("display", "block");
	map = new coocaakeymap($(".coocaa_btn3"), "#FirstInOKBtn", "btn-focus", empty0, empty1, empty1);
	
	autoFillLogData2();
	logdata2.page_state = "首次进活动";
	webDataLog("web_button_clicked_new", logdata2);
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
	
	autoFillLogData2();
	logdata2.page_state = "当天做任务获得3把锤子后继续做任务提醒弹窗";
	webDataLog("web_button_clicked_new", logdata2);
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
	
	var text2;
	if (answerRightFlag != null)
		text2 = "好棒！回答正确！恭喜获得";
	else
		text2 = "好棒！任务完成！恭喜获得";
	document.getElementById("gotHammerInfo1").innerHTML = text2;
	
	$("#dialogPage").css("display", "block");
	$("#gotHammerDialog").css("display", "block");
	map = new coocaakeymap($(".coocaa_btn3"), "#gotHammerOKBtn", "btn-focus", empty0, empty1, empty1);
	
	autoFillLogData2();
	logdata2.page_state = "完成任务给锤子";
	webDataLog("web_button_clicked_new", logdata2);
}

function disappearGotHammerDialog() {
	$("#gotHammerDialog").css("display", "none");
	$(".secondDialog").css("display", "none");
	$("#dialogPage").css("display", "none");
	focusOnMainPage(null);
	
	// 继续破冰按钮
	autoFillLogData4();
	logdata4.button_name = "继续破冰";
	logdata4.page_type = "完成任务给锤子";
	webDataLog("web_button_clicked_new", logdata4);
}

function showGiveHammerDialog() {
	var text = "x" + buyNumber;
	document.getElementById("hammerNum2").innerHTML = text;
	$("#dialogPage").css("display", "block");
	$("#giveHammerDialog").css("display", "block");
	map = new coocaakeymap($(".coocaa_btn3"), "#giveHammerBtn1", "btn-focus", empty0, empty1, empty1);
	
	autoFillLogData2();
	logdata2.page_state = "购买产品包给锤子";
	webDataLog("web_button_clicked_new", logdata2);
}

function disappearGiveHammerDialog() {
	$("#giveHammerDialog").css("display", "none");
	$(".secondDialog").css("display", "none");
	$("#dialogPage").css("display", "none");
	focusOnMainPage(null);
	
	// 去破冰按钮
	autoFillLogData4();
	logdata4.button_name = "去破冰";
	logdata4.page_type = "购买产品包给锤子";
	webDataLog("web_button_clicked_new", logdata4);
}

function showHelpOKDialog(haveAward, awardName, heroHame, title, imgFileName) {
	document.getElementById("helpOKInfo1").innerHTML = title;
	
	var text2, buttonText;
	text2 = '恭喜你获得' + '<span class="helpOKInfoHeroName">' + heroHame + '</span>称号';
	if (haveAward)
		text2 += '，及' + '<span class="helpOKInfoHeroName">' + awardName + '</span>';
	document.getElementById("helpOKInfo2").innerHTML = text2;
	
	if (haveAward) 
		buttonText = "欣然收下";
	else
		buttonText = "继续破冰";
	document.getElementById("helpOKDialogButtonText").innerHTML = buttonText;
	
	$("#helpOKImg1").attr("src", imgFileName);
	
	$("#dialogPage").css("display", "block");
	$("#helpOKDialog").css("display", "block");
	map = new coocaakeymap($(".coocaa_btn3"), "#helpOKBtn", "btn-focus", empty0, empty1, empty1);
	
	autoFillLogData2();
	if (haveAward) 
		logdata2.page_state = "解救冰冻物体后有奖";
	else
		logdata2.page_state = "解救冰冻物体后无奖"
	webDataLog("web_button_clicked_new", logdata2);
}

function disappearHelpOKDialog() {
	$("#helpOKDialog").css("display", "none");
	$(".secondDialog").css("display", "none");
	$("#dialogPage").css("display", "none");
	focusOnMainPage(null);
}

function showRedGet2Dialog(lotteryActiveId, rememberId, userkeyId, redNumber) {
	console.log("showRedGet2Dialog() ");
	$("#dialogPage").css("display", "block");
	$("#dialogPage .secondDialog").css("display","none");
	
	console.log("点击了红包+显示二维码");
	////_dateObj.award_type = "微信红包";
	////_dateObj.page_type = "领取微信红包";
	////webDataLog("web_page_show_new", _dateObj);
	////_dateObj2.button_name = "待领取-微信红包";
	////webDataLog("web_button_clicked_new", _dateObj2);
	
	$(".secondDialog").css("display", "none");
	$("#redNotGet_2").css("display", "block");
	$("#redContent_2 span").html(redNumber);
	
	console.log(lotteryActiveId + "--" + rememberId + "--" + userkeyId);
	document.getElementById("redQrcode_2").innerHTML = "";
	// getRedPacketsQrcode(lotteryActiveId, rememberId, userkeyId, "redQrcode_2", 270, 270);
	
	var qrcode = new QRCode(document.getElementById("redQrcode_2"), {
	    width: 270,
	    height: 270
	});
	qrcode.makeCode("http://www.baidu.com");
	
	map = new coocaakeymap($(".coocaa_btn3"), "#redQrcode_2", "btn-focus", empty0, empty1, empty1);
	
}

function disappearRedGet2Dialog() {
	$("#redNotGet_2").css("display", "none");
	$(".secondDialog").css("display", "none");
	$("#dialogPage").css("display", "none");
	focusOnMainPage(null);
}

function showEntityGetDialog2(awardName, awardTime, lotteryActiveId, rememberId, userkeyId, openId) {
	console.log("showEntityGetDialog2() ");
	console.log("直接领取实物奖，显示二维码");
	
	////_dateObj.award_type = "实物奖品";
	//_dateObj.page_type = "领取实体物品";
	//webDataLog("web_page_show_new", _dateObj);
	//_dateObj2.button_name = "待领取-实物奖品";
	//webDataLog("web_button_clicked_new", _dateObj2);
	
	$("#dialogPage").css("display", "block");
	$("#entityInfo1_copy").html("奖品名称:&nbsp;&nbsp;" + awardName);
	$("#entityInfo2_copy").html("发放时间:&nbsp;&nbsp;" + awardTime);
	$(".secondDialog").css("display", "none");
	$("#entityGetDialog2").css("display", "block");
	$("#entityQrcode2").css("display", "block");
	map = new coocaakeymap($(".coocaa_btn3"), "#entityQrcode2", "btn-focus", empty0, empty1, empty1);
	var enstr = enurl + "activeId=" + lotteryActiveId + "&rememberId=" + rememberId 
				+ "&userKeyId=" + userkeyId + "&open_id=" + openId;
	drawQrcode("entityQrcode2", enstr, 190);
}

function disappearEntityGetDialog2() {
	$("#entityGetDialog2").css("display", "none");
	$(".secondDialog").css("display", "none");
	$("#dialogPage").css("display", "none");
	focusOnMainPage(null);
}

function showAppVerLowDialog(appName) {
	console.log("showAppVerLowDialog() ");
	$("#dialogPage").css("display", "block");
	document.getElementById("appVerLowText1").innerHTML = "\"" + appName + "\"应用的版本过低";
	document.getElementById("appVerLowText2").innerHTML = "请在【主页-应用-应用搜索】升级到最新版本";
	$("#appVerLowDialog").css("display", "block");
	map = new coocaakeymap($(".coocaa_btn3"), "#appVerLowBtn1", "btn-focus", empty0, empty1, empty1);
	setTimeout(function () {
		disappearAppVerLowDialog();
	}, 2000);
}

function disappearAppVerLowDialog() {
	$("#entityGetDialog2").css("display", "none");
	$(".secondDialog").css("display", "none");
	$("#dialogPage").css("display", "none");
	map = new coocaakeymap($(".coocaa_btn3"), "#taskEnter", "btn-focus", empty0, empty1, empty1);
}

function autoFillLogData1() {
	logdata1.page_name = "";
	logdata1.page_state = "";
	logdata1.load_duration = "";
	logdata1.activity_type = "2019教育暑期活动";
	logdata1.activity_name = "2019教育暑期活动";
	logdata1.OPEN_ID = _openId;
}

function autoFillLogData2 (){
	logdata2.page_name = "弹窗页面";
	logdata2.parent_page = "活动主页面";
	logdata2.award_type = "";
	logdata2.award_id = "";
	logdata2.award_name = "";
	logdata2.page_state = "";
	logdata2.activity_type = "2019教育暑期活动";
	logdata2.activity_name = "2019教育暑期活动";
	logdata2.OPEN_ID = _openId;
}

function autoFillLogData3() {
	logdata3.page_name = "活动主页面";
	logdata3.page_type = "活动主页面-进行中";
	logdata3.activity_type = "2019教育暑期活动";
	logdata3.activity_name = "2019教育暑期活动";
	logdata3.OPEN_ID = _openId;
}

function autoFillLogData4() {
	logdata4.page_name = "弹窗页面";
	logdata4.button_name = "";
	logdata4.parent_page = "活动主页面";
	logdata4.award_type = "";
	logdata4.award_id = "";
	logdata4.award_name = "";
	logdata4.page_type = "";
	logdata4.activity_type = "2019教育暑期活动";
	logdata4.activity_name = "2019教育暑期活动";
	logdata4.OPEN_ID = _openId;
}

function autoFillLogData5() {
	var activity_duration, nowTime;
	logdata5.page_name = "活动主页面";
	if (allUsedNumber >= 30)
		logdata5.page_type = "全部解救成功";		//活动主页面取值：预热、活动正式期、全部解救成功、活动已结束
	else
		logdata5.page_type = "活动正式期";
	logdata5.activity_type = "2019教育暑期活动";
	logdata5.activity_name = "2019教育暑期活动";
	nowTime = new Date().getTime();
	activity_duration = nowTime - activityStartTime;
	logdata5.activity_duration = "" + activity_duration;
	logdata5.OPEN_ID = _openId;
}
















