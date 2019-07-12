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

var _actionId = 149;	//主活动的id
var _curFocusId = null;
var startLoginFlag = false;
var changeLoginFlag = false;
var hasAllowanceAward = false; //记录是否有津贴
var hasCouponAward = false; //记录是否有神券
var dialogTime = null;

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
	pageResume();
});

coocaaApp.ready(function() {
    
});

coocaaApp.triggleButton(function() {
    _appversion = accountVersion;
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
		entryType = 0;
		updateMainPage(false);
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

function webPageInit(num){
	console.log(num);
	if(num == 0){
		console.log("初始化页面");
		var _dateObj = {
			"page_name": "我的奖励页面",
			"activity_name": "618活动"
		};
		webDataLog("okr_web_page_show", _dateObj);
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
			"prize_type": "",
			"prize_id": _awardId,
			"prize_name": _awardName,
			"page_type": "",
			"activity_type": "2019教育暑期活动",
			"activity_name": "2019教育暑期活动",
			"open_id": _openId
		};
		var _dateObj2 = {
			"page_name": "我的奖品页",
			"button_name": "",
			"page_type": "我的奖品页",
			"activity_type": "2019教育暑期活动",
			"activity_name": "2019教育暑期活动",
			"open_id": _openId
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
                    _dateObj.prize_type = "微信红包";
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
                    _dateObj.prize_type = "微信红包";
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
                    _dateObj.prize_type = "实物奖品";
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
                    var enstr = enurl + "activeId=" + _lotteryActiveId + "&rememberId=" + _rememberId + "&userKeyId=" + _userkeyId + "&access_token=" + _accessToken;
                    drawQrcode("entityQrcode", enstr, 190);
                } else {
                    console.log("点击了实物奖+显示领取信息");
                    _dateObj.prize_type = "实物奖品";
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
	console.log(logname + "--" + dateObj);
	//coocaaosapi.notifyJSLogInfo(logname, _dataString, function(message) {console.log(message);}, function(error) {console.log(error);});
}
