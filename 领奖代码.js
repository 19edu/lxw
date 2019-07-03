林心旺  15:29:04
function startDraw() {
	var oAwardId = $("#" + divarray[index]).attr("awardId");
	var ajaxTimeoutOne = $.ajax({
		type: "post",
		async: true,
		timeout: 7000,
		dataType: 'json',
		url: adressIp + "ilding2/web/start",
		data: {
			"id": actionId,
			"awardId": oAwardId,
			"MAC": _mac,
			"cModel": _model,
			"cChip": _chip,
			"cUDID": _udid,
			"cOpenId": _openId,
			"cNickName": _nickName,
			"source": _qsource
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "80010") {
				$("#dialogPage").css("display", "block");
				$(".secondDialog").css("display", "none");
				
				$("#dialogDivImg2").attr("src", "images/preheat/firststart.png");
				$("#dialogDiv2").css("display", "block");
				map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
			} else if(data.code == "50048") {
				$("#dialogPage").css("display", "block");
				$(".secondDialog").css("display", "none");
				map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
				//hiddleDialog();
			} else if(data.code == "50023") {
				$("#dialogPage").css("display", "block");
				$(".secondDialog").css("display", "none");
			} else if(data.code == "50100") {
				var _awardId = data.data.awardId;
				var _rememberId = data.data.lotteryAwardRememberId;
				var _userkeyId = data.data.userKeyId;
				var _lotteryActiveId = data.data.activeId;
				var _awardType = data.data.awardTypeId;
				sendPrizes(_awardId, _rememberId, _awardType, _userkeyId, _lotteryActiveId, _qsource);
				$("#dialogPage").css("display", "block");
				$(".secondDialog").css("display", "none");
				
				map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
			}
		},
		error: function() {
			
		},
		complete: function(XMLHttpRequest, status) {
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {
				ajaxTimeoutOne.abort();
			}
		}
	});
}
林心旺  15:29:49
sendPrizes(dataObj1.data[i].awardId, dataObj1.data[i].lotteryAwardRememberId, dataObj1.data[i].awardTypeId, dataObj1.data[i].userKeyId, dataObj1.data[i].activeId, _qsource);
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
		url: adressIp + "4/lotteryerify/receive",
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
				if(oType == "17"){
					selectMyAllowanceNum(2);
				}
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
var enstr = enurl + "activeId=" + _lotteryActiveId + "&rememberId=" + _rememberId + "&userKeyId=" + _userkeyId + "&access_token=" + _accessToken;
                    drawQrcode("entityQrcode", enstr, 190);
//绘制二维码
function drawQrcode(id, url, wh) {
    document.getElementById(id).innerHTML = "";
    var qrcode = new QRCode(document.getElementById(id), {
        width: wh,
        height: wh
    });
    qrcode.makeCode(url);
}
林心旺  15:31:24
getRedPacketsQrcode(_lotteryActiveId, _rememberId, _userkeyId, "redQrcode", 270, 270);
function getRedPacketsQrcode(activityId, rememberId, userKeyId, id, width, height) {
    console.log(rememberId + "--" + userKeyId + "--" + id);
    var ajaxTimeoutFive = $.ajax({
        type: "GET",
        async: true,
        timeout: 7000,
        dataType: 'jsonp',
        jsonp: "callback",
        url: adressIp + "3/lotteryerify/wechat/qrCode",
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
