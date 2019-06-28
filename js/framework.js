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

/*
var app = {
	canonical_uri: function(src, base_path) {
		var root_page = /^[^?#]*\//.exec(location.href)[0],
			root_domain = /^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],
			absolute_regex = /^\w+\:\/\//;
		if(/^\/\/\/?/.test(src)) {
			src = location.protocol + src;
		} else if(!absolute_regex.test(src) && src.charAt(0) != "/") {
			src = (base_path || "") + src;
		}
		return absolute_regex.test(src) ? src : ((src.charAt(0) == "/" ? root_domain : root_page) + src);
	},
	rel_html_imgpath: function(iconurl) {
		return app.canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1'));
	},
	initialize: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener("backbutton", this.handleBackButton, false);
		document.addEventListener("backbuttondown", this.handleBackButtonDown, false);
		document.addEventListener('resume', this.onResume, false);
		document.addEventListener("pause", this.pause, false);
	},
	handleBackButton: function() {
		console.log("lxw Back Button Pressed!");
	},
	onResume: function() {
		console.log("--------------------->Page onResume!");
		console.log(startLoginFlag + "--" + changeLoginFlag);
		if(startLoginFlag && changeLoginFlag) {
			console.log("登录成功");
			startLoginFlag = false;
			changeLoginFlag = false;
			console.log(_curFocusId);
			$("#" + _curFocusId).trigger("itemClick");
		} else if(startLoginFlag) {
			console.log("登录失败");
			startLoginFlag = false;
			changeLoginFlag = false;
		}
	},
	pause: function() {
		console.log("--------------------->Page onPause!");
	},
	onDeviceReady: function() {
		console.log("onDeviceReady");
		app.receivedEvent("deviceready");
		app.triggleButton();
	},
	receivedEvent: function(id) {
		console.log("=============>" + id);
	},
	handleBackButtonDown: function() {
		handleBackButtonFunc();
	},
	triggleButton: function() {
		cordova.require("com.coocaaosapi");
		_appversion = accountVersion;
		listenUserChange();
		buttonInitBefore();
		getDeviceInfo();
	}
};
app.initialize();
*/

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
		showTasksPage();
	});
	$("#mainpageButton3").unbind("itemClick").bind("itemClick", function() {
		//_actionId = getUrlParam("actionid");//主活动的id
		$("#myawardPage").css("display","block");
		getMyAwards(_actionId);
	});
	$("#mainpageButton4").unbind("itemClick").bind("itemClick", function() {
		showRolePage();
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
		$("#dialogPage").css("display", "none");
		$("#myawardPage").css("display", "block");
		webPageInit(1);
		console.log(_curFocusId);
		map = new coocaakeymap($(".coocaa_btn2"), "#"+_curFocusId, "btn-focus", function() {}, function(val) {}, function(obj) {});
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
		summerVacationActionInit();
	}else{
		console.log("刷新页面");
		updateMainPage();
	}
}
//我的奖品
function getMyAwards(curActionid) {
	console.log(_mac+"--"+_model+"--"+_emmcCID+"--"+_udid+"--"+curActionid);
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
                	objItem.bonus = JSON.parse(obj.data[i].awardInfo).bonus;
                    _arr3.push(objItem);
                }
                if (obj.data[i].awardTypeId == "1") {
                    objItem.awardInfo = JSON.parse(obj.data[i].awardInfo)[0];
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
	}else{
		console.log("有奖励");
		document.getElementById("couponTabs").innerHTML = '';
        document.getElementById("redTabs").innerHTML = '';
        document.getElementById("entityTabs").innerHTML = '';
        document.getElementById("cardTabs").innerHTML = '';
		$("#myAwardBox").css("display","block");
		showMyAward(_arr1,_arr2,_arr3,_arr4);
	}
	buttonInitAfter();
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
                var redDiv = document.createElement("div");
                redDiv.setAttribute('id', 'redAward' + i);
                redDiv.setAttribute('awardType', arr1[i].awardType);
                redDiv.setAttribute('awardState', arr1[i].state);
                redDiv.setAttribute('rememberId', arr1[i].rememberId);
                redDiv.setAttribute('awardId', arr1[i].awardId);
                redDiv.setAttribute('userkeyId', arr1[i].userkeyId);
                redDiv.setAttribute('awardName', arr1[i].awardName);
                redDiv.setAttribute('awardTime', arr1[i].awardTime);
                redDiv.setAttribute('redNumber', arr1[i].redNumber);
                redDiv.setAttribute('lotteryActiveId', arr1[i].lotteryActiveId);
                redDiv.setAttribute('class', 'myAwards redAwardNotGot coocaa_btn2');
                
                redDiv.innerHTML = '<div class="myawardsImg myawardsStyle2 entity"><img class="redImg" src=""/></div><div class="awardbtns"><img class="myawardsBtn" src="images/award/notget.png"/><img class="myawardsBorder" src="images/award/border.png"/><div class="btnName">待领取</div></div>';
                $("#redTabs").append(redDiv);
            }
        }
        console.log(_cardRedNum);
        _cardRedNum = toDecimal(_cardRedNum);
        if (_cardRedNum != 0) {
            var redDiv = document.createElement("div");
            redDiv.setAttribute('id', 'redAwardHasGot');
            redDiv.setAttribute('awardType', 7);
            redDiv.setAttribute('awardState', 1);
            redDiv.setAttribute('class', 'myAwards coocaa_btn2');
            redDiv.innerHTML = '<div class="myawardsImg myawardsStyle2 entity"><img class="redImg" src=""/></div><div class="awardbtns"><img class="myawardsBtn" src="images/award/notget.png"/><img class="myawardsBorder" src="images/award/border.png"/><div class="btnName">已领取</div></div>';
            $("#redTabs").append(redDiv);
            $("#redHasGetNum").html(_cardRedNum);
        }		
	}
	if (arr2.length != 0) {
		$("#entityBox").css("display", "inline-block");
        for (var i = 0; i < arr2.length; i++) {
            var entityDiv = document.createElement("div");
            entityDiv.setAttribute('id', 'entityAward' + i);
            entityDiv.setAttribute('awardState', arr2[i].state);
            entityDiv.setAttribute('awardId', arr2[i].awardId);
            entityDiv.setAttribute('awardType', arr2[i].awardType);
            entityDiv.setAttribute('rememberId', arr2[i].rememberId);
            entityDiv.setAttribute('userkeyId', arr2[i].userkeyId);
            entityDiv.setAttribute('awardName', arr2[i].awardName);
            entityDiv.setAttribute('awardTime', arr2[i].awardTime);
            entityDiv.setAttribute('lotteryActiveId', arr2[i].lotteryActiveId);
            entityDiv.setAttribute('class', 'myAwards coocaa_btn2');
			
            if (arr2[i].state == 0) {
            	entityDiv.innerHTML = '<div class="myawardsImg myawardsStyle2 entity"><img class="couponImg" src=""/></div><div class="awardbtns notgetBtn"><img class="myawardsBtn" src="images/award/notget.png"/><img class="myawardsBorder" src="images/award/border.png"/><div class="btnName">待领取</div></div>';
            } else {
                entityDiv.setAttribute('awardAddress', arr2[i].awardAddress);
                entityDiv.setAttribute('userPhone', arr2[i].userPhone);
                entityDiv.setAttribute('userName', arr2[i].userName);
                entityDiv.setAttribute('receiveTime', arr2[i].receiveTime);
                entityDiv.innerHTML = '<div class="myawardsImg myawardsStyle2 entity"><img class="couponImg" src=""/></div><div class="awardbtns hasgotBtn"><img class="myawardsBtn" src="images/award/hasgot.png"/><img class="myawardsBorder" src="images/award/border.png"/><div class="btnName">已领取</div></div>';
            }
            $("#entityTabs").append(entityDiv);
        }
	}
	if (arr3.length != 0) {
		console.log("优惠券");
		$("#couponBox").css("display", "inline-block");
        for (var i = 0; i < arr3.length; i++) {
            var couponDiv = document.createElement("div");
            couponDiv.setAttribute('id', 'couponAward' + i);
            couponDiv.setAttribute('awardType', arr3[i].awardType);
            couponDiv.setAttribute('awardState', arr3[i].state);
            couponDiv.setAttribute('awardId', arr3[i].awardId);
            couponDiv.setAttribute('rememberId', arr3[i].rememberId);
            couponDiv.setAttribute('userkeyId', arr3[i].userkeyId);
            couponDiv.setAttribute('awardName', arr3[i].awardName);
            couponDiv.setAttribute('awardTime', arr3[i].awardTime);
            couponDiv.setAttribute('awardUrl', arr3[i].awardUrl);
            couponDiv.setAttribute('lotteryActiveId', arr3[i].lotteryActiveId);
            couponDiv.setAttribute('class', 'myAwards coocaa_btn2');
            if(arr3[i].state == 1){
            	couponDiv.setAttribute('awardInfo', JSON.stringify(arr3[i].awardInfo));
            	couponDiv.innerHTML = '<div class="myawardsImg myawardsStyle2 entity"><img class="couponImg" src=""/></div><div class="awardbtns hasgotBtn"><img class="myawardsBtn" src="images/award/hasgot.png"/><img class="myawardsBorder" src="images/award/border.png"/><div class="btnName">去使用</div></div>';
            }else{
            	couponDiv.innerHTML = '<div class="myawardsImg myawardsStyle2 entity"><img class="couponImg" src=""/></div><div class="awardbtns notgetBtn"><img class="myawardsBtn" src="images/award/notget.png"/><img class="myawardsBorder" src="images/award/border.png"/><div class="btnName">待领取</div></div>';
            }
            $("#couponTabs").append(couponDiv);
        }
	}
	if (arr4.length != 0) {
		console.log("体验权");
		$("#cardBox").css("display", "inline-block");
        for (var i = 0; i < arr4.length; i++) {
            var cardDiv = document.createElement("div");
            cardDiv.setAttribute('id', 'cardAward' + i);
            cardDiv.setAttribute('awardType', arr4[i].awardType);
            cardDiv.setAttribute('awardState', arr4[i].state);
            cardDiv.setAttribute('awardId', arr4[i].awardId);
            cardDiv.setAttribute('rememberId', arr4[i].rememberId);
            cardDiv.setAttribute('userkeyId', arr4[i].userkeyId);
            cardDiv.setAttribute('awardName', arr4[i].awardName);
            cardDiv.setAttribute('awardTime', arr4[i].awardTime);
            cardDiv.setAttribute('awardUrl', arr4[i].awardUrl);
            cardDiv.setAttribute('lotteryActiveId', arr4[i].lotteryActiveId);
            cardDiv.setAttribute('class', 'myAwards coocaa_btn2');
            if(arr4[i].state == 1){
            	cardDiv.innerHTML = '<div class="myawardsImg myawardsStyle2 entity"><img class="couponImg" src=""/></div><div class="awardbtns hasgotBtn"><img class="myawardsBtn" src="images/award/hasgot.png"/><img class="myawardsBorder" src="images/award/border.png"/><div class="btnName">去使用</div></div>';
            }else{
            	cardDiv.innerHTML = '<div class="myawardsImg myawardsStyle2 entity"><img class="couponImg" src=""/></div><div class="awardbtns notgetBtn"><img class="myawardsBtn" src="images/award/notget.png"/><img class="myawardsBorder" src="images/award/border.png"/><div class="btnName">待领取</div></div>';
            }
            $("#cardTabs").append(cardDiv);
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
//领取优惠券并跳转津贴页面
function sendPrizes(oAwardId, oRememberId, oType, oUserKeyId, oActiveId, oQsource) {
	console.log(oAwardId + "--" + oRememberId + "--" + oUserKeyId + "--" + oType + "--" + oActiveId);
	if(oQsource != "tencent") {
		oQsource = "iqiyi";
	}
	console.log(oQsource);
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
				console.log("领取成功"+oType);
				if(oType == "3"){
					console.log(JSON.stringify(data));
					showTheCardInfo(data.data.cardInfo[0]);
				}
				if(oType == "21"||oType == "5"){
					webPageInit(1);
				}
			} else {
				console.log("领取失败");
				dialogInfo(oType);
			}
		},
		error: function() {
			console.log("领取失败");
			dialogInfo(oType);
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
        console.log(_loginstatus);
        var _dateObj = {
			"page_name": "我的奖励页面",
			"activity_name": "618活动",
			"button_name": ""
		};
		var _dateObj2 = {
			"page_name": "我的奖励奖品点击弹窗",
			"page_type": "activityWindow",
			"activity_name": "618活动",
			"award_type": "",
			"award_name": _awardName,
		};
        if (_awardType == 17) {
            if (_loginstatus == "false") {
                console.log("点击了购物津贴+启登录");
                startAndSendLog();
            } else {
                console.log("点击了购物津贴+跳转页面");
                _dateObj.button_name="津贴";
                webDataLog("okr_web_button_click", _dateObj);
                coocaaosapi.startAppShopZone3("235", function() {}, function() {});
            }
        }
        if (_awardType == 7) {
            var _redNumber = $(this).attr("redNumber");
            console.log("点击了红包");
            if (_loginstatus == "false") {
                console.log("点击了红包+启登录");
                startAndSendLog();
            } else {
            	console.log("点击了红包+展示信息");
            	_dateObj.button_name="现金红包";
            	webDataLog("okr_web_button_click", _dateObj);
            	_dateObj2.award_type="现金红包";
                webDataLog("okr_web_page_show", _dateObj2);
                $("#dialogPage").css("display", "block");
                $("#dialogPage .secondDialog").css("display","none");
                if (_awardState == 0) {
                    console.log("点击了红包+显示二维码");
                    $(".secondDialog").css("display", "none");
                    $("#redNotGet").css("display", "block");
                    $("#redContent span").html(_redNumber);
                    console.log(_lotteryActiveId + "--" + _rememberId + "--" + _userkeyId);
                    document.getElementById("redQrcode").innerHTML="";
                    getRedPacketsQrcode(_lotteryActiveId, _rememberId, _userkeyId, "redQrcode", 270, 270);
                	map = new coocaakeymap($(".coocaa_btn3"), "#redQrcode", "btn-focus", function() {}, function(val) {}, function(obj) {});
                } else {
                    console.log("点击了红包+显示领取信息");
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
            	_dateObj.button_name="实物奖励";
            	webDataLog("okr_web_button_click", _dateObj);
            	_dateObj2.award_type="实物奖励";
                webDataLog("okr_web_page_show", _dateObj2);
                $("#dialogPage").css("display", "block");
                if (_awardState == 0) {
                    console.log("点击了实物奖+显示二维码");
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
            	var oName = $(this).attr("couponName");
            	console.log(oName);
        		console.log("点击了免单券奖+领取奖励+跳转免单页面");
        		_dateObj.button_name="免单券";
        		_dateObj2.award_type="免单券";
        		var _bonus = $(this).attr("bonus");
        		console.log(_bonus);
        		if(_awardState == 0){
                	console.log("未领取的免单券+领取免单券");
                	sendPrizes(_awardId, _rememberId, _awardType, _userkeyId,_lotteryActiveId, _qsource);
                }else{
                	var _curUrl =  freePageUrl +"actionid="+actionId2+"&money="+_bonus;
        			coocaaosapi.startNewBrowser2(_curUrl, function() {}, function() {});
                }
            	webDataLog("okr_web_button_click", _dateObj);
            	webDataLog("okr_web_page_show", _dateObj2);
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
            "luckyDrawCode": "19618act",
            "channel": "coocaa",
            "type": 27
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
