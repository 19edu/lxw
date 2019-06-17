var _tencentWay = null;
var _user_flag = null;
var _login_type = null;
var _vuserid = null;
var _qqtoken = null;
var _mobile = null;
var needQQ = false;
var _isneedExit = true;//记录圣诞小屋页面是否需要退掉
var _isToastExit = false;//记录做任务toast是否响应返回键

var _actionid = 97; //主活动id
var _testurl0 = "https://restful.skysrt.com";
var _testurl = "https://restful.skysrt.com//light";
var enurl = "https://webapp.skysrt.com/christmas18/address/index.html?";
var awardurl = "https://webapp.skysrt.com/christmas18/myaward/index.html?";


//var _actionid = 89; //主活动id
//var _lotteryid = 90; //抽奖活动id
//var _buyActiveId = 91; //采购活动id
//var _testurl0 = "http://beta.restful.lottery.coocaatv.com";
//var _testurl = "http://beta.restful.lottery.coocaatv.com//light";
//var enurl = "http://beta.webapp.skysrt.com/zy/address/index.html?";
//var awardurl = "http://beta.webapp.skysrt.com/yuanbo/test/XmasNewYear2018/myaward.html?";
//var packlisturl = "http://beta.api.tvshop.coocaa.com/cors/tvCartAPI/packGoodsList";
//var packgoodUrl = "http://beta.api.tvshop.coocaa.com/cors/tvCartAPI/addCartFromAct";
//var goodsCouponUrl = "http://beta.api.tvshop.coocaa.com/cors/tvUsersAPI/goodsCoupon";
//
//var packGoodsObj = [{"goodId": 14823,"goodImg": "images/packid/14823.png","goodName": "QUEENS'MATE面条机"
//}, {"goodId": 14822,"goodImg": "images/packid/14822.png","goodName": "Queens真空破壁机"
//}, {"goodId": 14821,"goodImg": "images/packid/14821.png","goodName": "奥力福鹅绒被"
//}, {"goodId": 14820,"goodImg": "images/packid/14820.png","goodName": "霸王润养精油洗发液"
//}, {"goodId": 14819,"goodImg": "images/packid/14819.png","goodName": "宝家洁自甩水平拖"
//}, {"goodId": 14818,"goodImg": "images/packid/14818.png","goodName": "贝尔莱德便携熨烫机"
//}, {"goodId": 14817,"goodImg": "images/packid/14817.png","goodName": "玻妞擦窗机器人"
//}, {"goodId": 14816,"goodImg": "images/packid/14816.png","goodName": "科莱默智能电饭煲"
//}, {"goodId": 14815,"goodImg": "images/packid/14815.png","goodName": "杜邦智能蒸汽烤箱"
//}, {"goodId": 14814,"goodImg": "images/packid/14814.png","goodName": "法国拉菲波尔多干红"
//}, {"goodId": 14813,"goodImg": "images/packid/14813.png","goodName": "洛比云学习机器人"
//}, {"goodId": 14812,"goodImg": "images/packid/14812.png","goodName": "美国西屋取暖器"
//}, {"goodId": 14811,"goodImg": "images/packid/14811.png","goodName": "诺肯不锈钢浴室柜"
//}, {"goodId": 14810,"goodImg": "images/packid/14810.png","goodName": "蒲尔菲富氢养生水杯"
//}, {"goodId": 14809,"goodImg": "images/packid/14809.png","goodName": "荣事达脱糖养生煲"
//}, {"goodId": 14808,"goodImg": "images/packid/14808.png","goodName": "山水触摸全钢电陶炉"
//}, {"goodId": 14807,"goodImg": "images/packid/14807.png","goodName": "五粮液1918佳酿酒"
//}, {"goodId": 14806,"goodImg": "images/packid/14806.png","goodName": "先锋智能移动地暖"
//}, {"goodId": 14803,"goodImg": "images/packid/14803.png","goodName": "芯启源太空舱按摩椅"
//}, {"goodId": 14800,"goodImg": "images/packid/14800.png","goodName": "新潮流电动清洁机"}];


var _version = "";
var _source = "";
var _mac = "";
var _chip = "";
var _model = "";
var _emmcCID = "";
var _udid = "";
var _cVersion = "";
var _cSize = "";
var _cSdk = "";
var _cBrand = "";
var _cFMode = "Default";
var _appversion = "";
var _accessToken = "";
var _openId = "";
var _nickName = "";

var _rememberId = "";
var _userKeyId = "";
var _loginstatus = null;
var _pgname = "gold";
var userIp = "";
var _remainingNumber = 0; //记录当前剩余铃铛数
var _isLessFivs = 0; //记录黄金屋活动距离结束是否小于5小时
var _elkOver = false; //麋鹿任务是否达到上线
var _packageOver = false; //打包任务是否达到上限
var _taskLogin = false; //是否需要弹登录1
var _bellLogin = false; //是否需要弹登录2
var _koiNum = 0;//记录锦鲤的个数
var goldHouseIsOpen = "1"; //1--未开始   2---已开始   3---已结束
var goldHouseStation = "黄金小屋未开启";
var _startLogin = 0; //记录启登录时的状态 
var _curPackIndex = 0; //记录当前点击的打包商品是第几个
var _curHomeBtn = ""; //记录主页面点击的btn
var t1 = "";
var intervalForCutdown = "";
var _curGoldAwardData = ""; //记录当前黄金屋抽奖
var _province = "";
var _city = "";
var _isStartDraw = "0";
var _gotoPackPage = "0"; //记录进入打包清单页面的路径
var _loginT = "";//登录弹窗的计时器
var _isFirstIn = 0;//记录是否是第一次登录

var startLoginFlag = false;
var changeLoginFlag = false;

var _moreGoodsIdArrTencent = [5, 57, 13230, 17231, 16992];
var _moreGoodsIdArrIqiyi = [1, 57, 13230, 17231, 16992];
var _moreGoodsNameArr = ["影视VIP年卡", "少儿VIP12个月", "欧慕迷你电烤箱", "山水触摸全钢电陶炉", "先锋电暖器"];
var packGoodsObj2 = new Array();
var couponGoodsId = "18129,13230,17231,18076,18073,18075,18074"; //推荐位id
var couponGoodsIdArr = [18129, 13230, 17231, 18076, 18073, 18075, 18074]; //推荐位id
//url传进来的参数：
var _bActivityEnd = false; //活动是否结束，默认进行中。
var flag = false;
var index = 0;
var TextNum2;
var browserVersion = 0;
var cAppVersion = 0;
var activityCenterVersion = 0;
var mallVersion = 0;
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
		console.log("lxw in initialize");
		_pgname = getQueryString("pagename");
		console.log(_pgname);
		if(_pgname == "pack") {
			$("#packGoodsPage").css("display", "block");
			_gotoPackPage = 0;
		} else {
			$("#homePage").css("display", "block");
		}
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
		console.log(_loginstatus + "--" + _accessToken + "--" + _openId);
		onResumeFunc();
	},
	pause: function() {

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
		backButtonFunc();
	},
	triggleButton: function() {
		cordova.require("com.coocaaosapi");
		_appversion = accountVersion;
		listenUserChange();
		getDeviceInfo();
		getLocationInfo();
		buttonInitBefore();
		checkVersion();
		coocaaosapi.getIpInfo(function(msg) {
			userIp = msg.ip;
		}, function() {});
	}
};

app.initialize();

function getLocationInfo() {
	coocaaosapi.getDeviceLocation(function(message) {
		console.log("location " + message.location);
		_province = message.location.split(",")[0];
		_city = message.location.split(",")[1];
		console.log(_province + "--" + _city);
	}, function(error) {
		console.log(error);
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
		_version = message.version;
		_userKeyId = _udid;
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
		url: _testurl0 + "/light/active/tv/source",
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
		if(_loginstatus == "false") {
			if(needQQ){
				if(cAppVersion >= 3190030) {
					_tencentWay = "both";
				} else {
					_tencentWay = "qq";
				}
			}
			_user_flag = 0;
			_accessToken = "";
			_operateTime = 0;
			actionInit();
		} else {
			coocaaosapi.getUserInfo(function(message) {
				exterInfo = message.external_info;
				_openId = message.open_id;
				_mobile = message.mobile;
				console.log(_openId);
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
								if(JSON.stringify(qqinfo[0]) == "{}") {
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
						actionInit();
					}
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
		console.log(_startLogin);
		hasLogin(needQQ, 1);
	});
}
//启登录
function startLogin(needQQ) {
	console.log("lxw " + _tencentWay);
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
		if(_version.replace(/\./g, "") < 550000000 && accountVersion > 4030000) {
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

function buttonInitBefore() {
	$(".homeBtns").unbind("focus").bind("focus", function() {});
	$(".homeBtns").unbind("blur").bind("blur", function() {});
}
function buttonInitAfter() {
	$(".packGoodsItem").unbind("focus").bind("focus", function() {
	});
	$(".packGoodsItem").unbind("blur").bind("blur", function() {
		console.log("打包商品失去焦点");
	});
}
//活动初始化 
function actionInit() {
	var ajaxTimeoutOne = $.ajax({
		type: "POST",
		async: true,
		timeout: 5000,
		dataType: 'json',
		url: _testurl + "/xmas/init",
		data: {
			"id": _actionid,
			"cUDID": _udid,
			"MAC": _mac,
			"cChip": _chip,
			"cModel": _model,
			"cEmmcCID": _emmcCID,
			"cOpenId": _openId,
			"goldActiveId": _lotteryid,
			"initSource": num2,
			"accessToken": _accessToken,
			"cNickName": _nickName
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			var _pagename = getQueryString("pagename");
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
function clearLoginDialog(){
	console.log("8秒未操作");
	clearTimeout(_loginT);
	$("#dialogPage").css("display", "none");
	$("#hasDone").css("display", "none");
	$("#gotoLogin").css("display", "none");
	$(".secondBtns").css("display", "none");
}
//首次送礼物
function firstSendGift() {
	console.log(_mac + "--" + _chip + "--" + _model + "--" + _emmcCID + "--" + _udid);
	console.log(_accessToken + "--" + _openId + "--" + _nickName);
	console.log(_userKeyId);
	var ajaxTimeoutTwo = $.ajax({
		type: "POST",
		async: true,
		timeout: 5000,
		dataType: 'json',
		url: _testurl + "/xmas/add-chance",
		data: {
			"MAC": _mac,
			"cChip": _chip,
			"cModel": _model,
			"cEmmcCID": _emmcCID,
			"cUDID": _udid,
			"accessToken": _accessToken,
			"cOpenId": _openId,
			"cNickName": _nickName,
			"id": _actionid,
			"userKeyId": _userKeyId,
			"chanceSource": "5",
			"subTask": "0"
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == 50001) {
				console.log("该活动不存在");
			} else if(data.code == 50002) {
				console.log("该活动未开始");
			} else if(data.code == 50003) {
				console.log("该活动已结束");
				_bActivityEnd = true;
				goldHouseIsOpen = 3;
				_remainingNumber = 0;
				_elkOver = true;
				_packageOver = true;
				_bellLogin = false;
				_taskLogin = false;
			} else if(data.code == 50100) {
				console.log("该活动进行中+获取数据成功");
				var fAwardId = data.data.rememberModel.awardId;
				var fRememberId = data.data.rememberModel.lotteryRememberId;
				var fUserKeyId = data.data.rememberModel.userKeyId;
				var fAwardTypeId = data.data.rememberModel.awardTypeId;
				var fActiveId = data.data.rememberModel.lotteryActiveId;
				var fAwardName = data.data.rememberModel.awardName;
				var fAwardUrl = data.data.rememberModel.awardUrl;
				var fAwardTime = data.data.rememberModel.awardTime;
				fAwardTime = fAwardTime.substring(0, 10);
				console.log(fAwardUrl);
				if(fAwardTypeId == 7) {
					console.log("获得红包+收下红包");
					$("#firstAwardInfo").html("恭喜获得现金红包");
					$("#redAwardImg").css("display", "block");
					$("#redAwardNum").html(data.data.rememberModel.awardInfo.bonus);
					$("#allRedNum").html(data.data.rememberModel.awardInfo.bonus);
				} else if(fAwardTypeId == 5) {
					$("#firstAwardInfo").html("恭喜获得平台红包");
					$("#couponAwardImg").css("display", "block");
					$("#couponAwardImg").css("background-image", "url(" + fAwardUrl + ")");
				} else if(fAwardTypeId == 2) {
					$("#firstAwardInfo").html("恭喜获得"+fAwardName);
					$("#entityAwardImg").css("display", "block");
					$("#entityAwardImg").css("background-image", "url(" + fAwardUrl + ")");
				}
				map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("close"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
		},
		error: function() {
			console.log("获取失败");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutTwo.abort();　　　　
			}　　
		}
	});
}
function startDrawFunc() {
	console.log("开始抽奖" + _province +"--"+ _city+"--"+_nickName);
	var ajaxTimeoutOne = $.ajax({
		type: "POST",
		async: true,
		timeout: 5000,
		dataType: 'json',
		url: _testurl + "/xmas/lottery",
		data: {
			"id": _actionid,
			"cUDID": _udid,
			"MAC": _mac,
			"cEmmcCID": _emmcCID,
			"cOpenId": _openId,
			"cModel": _model,
			"cChip": _chip,
			"goldActiveId": _lotteryid,
			"province": _province,
			"city": _city,
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
				_bActivityEnd = true;
				goldHouseIsOpen = 3;
				$("#hasEnd").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("hasEndBtn"), "btn-focus", function() {}, function(val) {}, function(obj) {});
				sentLog("draw_award_result", '{"page_name":"黄金小屋抽奖","activity_name":"双旦活动-圣诞小屋","award_result":"抽奖失败","award_type":"-1","award_name":"-1"}');
				_czc.push(['_trackEvent', '双旦活动-圣诞小屋', '黄金小屋抽奖', '抽奖失败+活动已结束', '', '']);
			} else if(data.code == 50042) {
				console.log("该活动已下架");
			} else if(data.code == 50100) {
				console.log("该活动进行中+获取数据成功");
				console.log(data.data.seq);
				_remainingNumber = data.data.remainingNumber;
				_curGoldAwardData = data.data;
				console.log(_remainingNumber);
				$("#bellnum").val("X" + _remainingNumber);
				$("#startDrawBox").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("startDrawBox"), "btn-focus", function() {}, function(val) {}, function(obj) {});
				var _machine = $("#machine").slotMachine({
					active: 0,
					delay: 800,
					complete: function() {
						console.log("hello" + this.active);
						_isStartDraw = 0;
						showThisAwardDialog(_curGoldAwardData);
					}
				});
				_machine.futureActive = data.data.seq - 1;
				_isStartDraw = 1;
				setTimeout(function(){_machine.shuffle(3);}, 1000);
				var _dAwardType = data.data.awardTypeId;
				var _dAwardName = data.data.awardName;
				sentLog("draw_award_result", '{"page_name":"黄金小屋抽奖","activity_name":"双旦活动-圣诞小屋","award_result":"抽奖成功","award_type":"'+_dAwardType+'","award_name":"'+_dAwardName+'"}');
				_czc.push(['_trackEvent', '双旦活动-圣诞小屋', '黄金小屋抽奖', _dAwardType+'-'+_dAwardName, '', '']);
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
function showThisAwardDialog(awardObj) {
	console.log(JSON.stringify(awardObj));
	var _cawardId = awardObj.awardId; //奖品id
	var _cactiveId = awardObj.lotteryActiveId; //奖品活动id
	var _crememberId = awardObj.lotteryRememberId; //奖品记录id
	var _cuserKeyId = awardObj.userKeyId; //抽奖用户的userkeyid
	var _cawardName = awardObj.awardName; //奖品名称
	var _cawardTime = awardObj.awardTime; //奖品名称
	_cawardTime = _cawardTime.substr(0, 10);
	console.log(_cawardName);
	var _cawardUrl = awardObj.awardUrl; //奖品url
	var _cawardTypeId = awardObj.awardTypeId; //奖品类型

	$("#startDrawBox").css("display", "none");
	if(_cawardTypeId == 7) {
		var _margeType = awardObj.margeType; //当奖品为红包时该微信红包是否是合并后的总额度红包
		var _bouns1 = awardObj.awardInfo.bonus; //当奖品为红包时的红包总金额
		if(awardObj.mergeAwardInfo == "" || awardObj.mergeAwardInfo == null) {
			var _bouns2 = _bouns1;
		} else {
			var _bouns2 = awardObj.mergeAwardInfo.bonus; //当奖品为红包时的本次中奖的微信红包额度
		}
		console.log(_margeType + "--" + _bouns1 + "--" + _bouns2);
	}
	if(_cawardTypeId == 16) {
		var _queue = awardObj.queue; //当奖品为锦鲤是锦鲤的编号
	}
	$("#koibtn2").attr("activeId", _cactiveId);
	$("#koibtn2").attr("awardId", _cawardId);
	$("#koibtn2").attr("rememberId", _crememberId);
	$("#koibtn2").attr("userKeyId", _cuserKeyId);
	$("#koibtn2").attr("awardTypeId", _cawardTypeId);
	$("#koibtn2").attr("awardName", _cawardName);
	$("#koibtn2").attr("awardTime", _cawardTime);
	$("#koibtn2").attr("awardUrl", _cawardUrl);

	$(".thisDrawAwardImg").css("display", "none");
	$("#machine").stop(true, true).animate({scrollTop: 0}, {duration: 0,easing: "swing",complete: function() {}});
	console.log(_koiNum);
	if(_cawardTypeId == 2) {
		console.log("抽中实体奖");
		if (_koiNum>1) {
			$("#superKoiInfo").css("display","none");
		} else{
			$("#superKoiInfo").css("display","block");
		}
		$("#koiMouldImg").css("background-image","url(images/dialog/draw_entity.png)");
		$("#getKoiInfo").css("display","block");
		$("#koiAwardName").html(_cawardName);
		$("#getKoi").css("display", "block");
		$("#curAwardInfo").css("display", "none");
		$("#entityImgPart").css("background-image", "url(" + _cawardUrl + ")");
		$("#entityImgShow").css("display", "block");
		$("#couponImgShow").css("display", "none");
		$("#redImgShow").css("display", "none");
		$("#koibtn2 .btnName").html("马上领取");
		map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("koibtn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		var enstr = enurl + "activeId=" + _cactiveId + "&rememberId=" + _crememberId + "&userKeyId=" + _cuserKeyId + "&access_token=" + _accessToken;
		drawQrcode("getDrawEnQrcode", enstr, 180);
		$("#getDrawEnName").html("奖品名称"+_cawardName);
		$("#getDrawEnTime").html("获奖时间"+_cawardTime);
	} else if(_cawardTypeId == 5) {
		console.log("抽中优惠券");
		if (_koiNum>1) {
			$("#superKoiInfo").css("display","none");
		} else{
			$("#superKoiInfo").css("display","block");
		}
		$("#koiMouldImg").css("background-image","url(images/dialog/draw_coupon.png)");
		$("#getKoiInfo").css("display","block");
		$("#koiAwardName").html("平台红包");
		$("#getKoi").css("display", "block");
		$("#curAwardInfo").css("display", "none");
		console.log(_cawardUrl);
		$("#couponImgPart").css("background-image", "url(" + _cawardUrl + ")");
		$("#couponImgShow").css("display", "block");
		$("#entityImgShow").css("display", "none");
		$("#redImgShow").css("display", "none");
		$("#koibtn2 .btnName").html("使用红包");
		map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("koibtn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
	} else if(_cawardTypeId == 7) {
		console.log("抽中红包奖");
		if (_koiNum>1) {
			$("#superKoiInfo").css("display","none");
		} else{
			$("#superKoiInfo").css("display","block");
		}
		$("#koiMouldImg").css("background-image","url(images/dialog/draw_red.png)");
		$("#getKoiInfo").css("display","none");
		$("#getKoi").css("display", "block");
		$("#curAwardInfo").css("display", "block");
		$("#curAwardInfo").html('当前抽奖红包总额<span style="color: #ffe82a;">' + _bouns1 + '</span>元')
		$("#getAwardNum").html(_bouns2);
		$("#koibtn2").attr("awardBouns1", _bouns1);
		$("#koibtn2").attr("awardBouns2", _bouns2);
		$("#redImgShow").css("display", "block");
		$("#entityImgShow").css("display", "none");
		$("#couponImgShow").css("display", "none");
		$("#koibtn2 .btnName").html("收下红包");
		map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("koibtn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		getRedPacketsQrcode(_cactiveId, _crememberId, _cuserKeyId, "getDrawRedQrcode");
		$("#getDrawRedNum").html(_bouns1);
	} else if(_cawardTypeId == 16) {
		console.log("抽中锦鲤");
		$("#koibtn2").attr("awardQueue", _queue);
		$("#getKoi2").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("koi2btn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		var enstr = enurl + "activeId=" + _cactiveId + "&rememberId=" + _crememberId + "&userKeyId=" + _cuserKeyId + "&access_token=" + _accessToken;
		drawQrcode("koiMouldImg2", enstr, 180);
	}
}

function startAndSendLog(num){
	_startLogin = num;
	startLoginFlag = true;
	startLogin(needQQ);
}
//领取优惠券并跳转使用
function sendPrizes(oAwardId, oRememberId, oUserKeyId, oType, oActiveId, oQsource) {
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
		url: _testurl0 + "/v3/lottery/verify/receive",
		data: {
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
					coocaaosapi.startParamAction2(bywhat, byvalue, sources, function(message) {}, function(error) {
						console.log(error);
					});
				} else {
					console.log("未配置");
				}
			} else {
				console.log("优惠券激活失败,需要给出激活失败的提示.");
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
//点击返回
function backButtonFunc() {
	if(document.getElementById("dialogPage").style.display == "block" || document.getElementById("_jrbuyZone").style.display == "block" || document.getElementById("packGoodsPage").style.display == "block" || document.getElementById("rulePage").style.display == "block") {
		if(document.getElementById("dialogPage").style.display == "block") {
			if(document.getElementById("firstLoadRule").style.display == "block") {
				$("#dialogPage").css("display", "block");
				$("#firstLoadRule").css("display", "none");
				$("#firstLoadDraw").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("drawAward1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			}else {
				
			}
		}
		if(document.getElementById("rulePage").style.display == "block") {
			$("#homePage").css("display", "block");
			$("#rulePage").css("display", "none");
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById("activeRule"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
	} else {
		navigator.app.exitApp();
	}
}
//onResume事件
function onResumeFunc() {
	console.log("in onResumeFunc" + _loginstatus);
	if (startLoginFlag&&changeLoginFlag) {
		console.log("登录成功");
		startLoginFlag = false;
		changeLoginFlag = false;
	}else if(startLoginFlag){
		console.log("登录失败");
		startLoginFlag = false;
		changeLoginFlag = false;
	}else{
		console.log("不提交登录日志");
		startLoginFlag = false;
		changeLoginFlag = false;
	}
	if(_startLogin == 1) {
		_startLogin = 0;
	}
	if(document.getElementById("dialogPage").style.display == "block" || document.getElementById("_jrbuyZone").style.display == "block" || document.getElementById("packGoodsPage").style.display == "block" || document.getElementById("rulePage").style.display == "block") {
		console.log("onResumeFunc事件在此页面不初始化");
		
	}else {
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curHomeBtn), "btn-focus", function() {}, function(val) {}, function(obj) {});
		$("#"+_curHomeBtn).trigger("focus");
		actionInit(); //num1是否是第一次初始化,num2哪个页面初始化,num3是否只处理弹窗
	}
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
//获取微信红包二维码
function getRedPacketsQrcode(activityId, rememberId, userKeyId, id) {
	console.log(rememberId + "--" + userKeyId + "--" + id);
	var ajaxTimeoutFive = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: _testurl0 + "/v3/lottery/verify/wechat/qrCode",
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
			"luckyDrawCode": "newYear",
			"channel": "coocaa",
			"type": 23
		},
		success: function(data) {
			console.log(data.code);
			if(data.code == "200") {
				document.getElementById(id).innerHTML = "";
				var str = data.data;
				var qrcode = new QRCode(document.getElementById(id), {
					width: 180,
					height: 180
				});
				qrcode.makeCode(str);
			}
		},
		error: function() {
			console.log("获取失败");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("lxw -------------complete------------------" + status);
			if(status == 'timeout') {
				ajaxTimeoutFive.abort();
			}
		}
	});
}
//加载立即检测版本
function checkVersion() {
    if(activityCenterVersion<103004){
        coocaaosapi.createDownloadTask(
            "https://apk-sky-fs.skysrt.com/uploads/20181209/20181209111030764234.apk",
            "5501D27CF6D0B187C49C6FBD217D59AA",
            "活动中心",
            "com.coocaa.activecenter",
            "26417",
            "http://img.sky.fs.skysrt.com//uploads/20170415/20170415110115834369.png",
            function () {},function () {});
    }
    if(browserVersion<104031){
        coocaaosapi.createDownloadTask(
            "https://apk-sky-fs.skysrt.com/uploads/20181213/20181213190209511926.apk",
            "270A47719CDBAB47EDBC5B1BD8808266",
            "活动浏览器",
            "com.coocaa.app_browser",
            "26423",
            "http://img.sky.fs.skysrt.com//uploads/20170415/20170415110115834369.png",
            function () {},function () {})
    }
}
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
//自定义数据
function sentLog(eventid, datalist) {
	coocaaosapi.notifyJSLogInfo(eventid, datalist, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}

function webBtnClickLog(product_name) {
	var page_type = "";
	var _dateObj = {
		"page_name": "打包清单页面",
		"activity_name": "双旦活动-打包任务页面",
		"button_name": "商品推荐位",
		"product_name": product_name,
		"page_type": page_type
	}
	var _dataString = JSON.stringify(_dateObj);
	console.log(_dataString);
	_czc.push(["_trackEvent", "双旦活动-打包任务页面", product_name, page_type, "", ""]);
	coocaaosapi.notifyJSLogInfo("pack_list_wares_click", _dataString, function(message) {
		console.log(message);
	}, function(error) {
		console.log(error);
	});
}