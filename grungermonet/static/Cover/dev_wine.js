var wads = "http://121.169.194.7:8001/wine/";
var ap = "http://192.168.100.1:8000/getmacinfo.htm";
var dturl = location.href;
var rb = '';
var rs = '';
var sssn = ''
var ua = '';
var os = '';
var mac = '';
var fb = null;
var ft = null;
var fa = null;
var httpRequest;
var curl = null;
var nxt = null;

if (document.addEventListener) { // Chrome
    document.addEventListener("DOMContentLoaded", function() {
        document.removeEventListener("DOMContentLoaded", arguments.callee,false);
        initApp();   
    }, false);
} else if (document.attachEvent) { // IE
    document.attachEvent("onreadystatechange", function() {
        if (document.readyState === "complete") {
            document.detachEvent("onreadystatechange", arguments.callee);
            initApp();
        }
    });
}

function initApp() {
	
	//myMac();
	mac = myMacSync();
	//_clientInit();
	setTimeout(_clientInit, 500);		
}

function myMac() {
	
	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
		httpRequest = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // IE
		try {
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
			}
		}
	}	

	if (!httpRequest) {
		//alert('Giving up :(Cannot create an XMLHTTP instance');
		return false;
	}
	   
	httpRequest.open("GET",ap,true); 
	httpRequest.timeout = 8000;
	httpRequest.onload = function () {
		// Request finished. Do processing here.
		mac = httpRequest.responseText;
		mac = mac.replace(/ /gi, '::');
		//	console.log("myMac request : "+mac);	
	};
	
	httpRequest.ontimeout = function (e) {
		// XMLHttpRequest timed out. Do something here.
		httpRequest.abort();
		//console.log("myMac request timed out. Did you lose network "+ "connectivity for some reason?");
		mac = "3600::11:11:11:22:22:22::192.168.1.173::i6::01:fc:e9:98:87:cd:0f";
	};
	
	httpRequest.send();
	_clientInit();
}

function myMacSync() {
	
	if (window.XMLHttpRequest) { // for Mozilla, Safari, ...
		httpRequest = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // for IE
		try {
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
			}
		}
	}
	
	if (!httpRequest) {
		//console.log('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	   
	httpRequest.open("GET",ap,false);
	httpRequest.send();
	
	mac = httpRequest.responseText;
	mac = mac.replace(/ /gi, '::').trim();
	//console.log('myMacSync ==> ' +mac);
	return mac;	
}

function mob() { 
	
	if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i) ){
		return 'mo.android';
	} else if ( navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i) ) {
		return 'mo.ios';
	} else {
	    return 'pc.all';
	}
}

function slide_event_init() {	
	setTimeout(function () {		
		wineJquery('#areaPlanty').stop(true,true).hide("slide", { direction: "down" }, 1);
		    setTimeout(function(){
//		    	wineJquery('#btnPlanty').css("display","block");  
//		    	wineJquery('#btn_bg').css("display","block"); 
		    	wineJquery('#btn_bg').css("bottom","0px");		    	
		    	wineJquery('#bannerPlanty').css("height","0px");
			}, 100);
    }, 100);	
}

function slide_btn_event() {
	
	if (wineJquery('#areaPlanty').is(":visible") ) {
		
		wineJquery('#areaPlanty').stop(true,true).hide("slide", { direction: "down" }, 0);
    	setTimeout(function(){
    		wineJquery('#bannerPlanty').css("height","0px");
    		wineJquery('#btn_bg').css("bottom","0px");

		}, 0);
    } else {
    	wineJquery('#areaPlanty').stop(true,true).show("slide", { direction: "down" }, 0);
    	setTimeout(function(){
    		wineJquery('#bannerPlanty').css("height","65px");
    		wineJquery('#btn_bg').css("bottom","65px");

    	}, 0);
    }
	
}

function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

function _clientInit() {
	var ck = -1;
	var _i = 0;
	var wrurl = null;
	var wnads = dturl.lastIndexOf("wine="); 
	var titleHtml = "";
	var styleHtml = "";
	var htmlPc = "";
	var htmlMobile = "";
	
	if ( wnads > 0 ) 
		wrurl = wads+"Banner/t?nextCi="+dturl.substring(wnads+5,10+wnads+5);
	else 
		wrurl = wads+"Banner/t";
	
	ajaxGet(wrurl, function(data) {
	   	_i = data["result"]["bi"];
	   	ck = parseInt(data["result"]["cnt"]);
	   	
	   	if(ck < 1 && parseInt(_i) >= 0) { 
	   		rb = data["result"]["bl"][_i]["col0"];	 
			rs = data["result"]["bl"][_i]["col2"];			
			sssn = data["result"]["wsid"];
			ua = data["uap"];
			os = data["os"];
			fb = data["result"]["fb"];
			ft = data["result"]["ft"];
			nxt = data["result"]["bl"][_i]["col16"];	
			styleHtml += data["result"]["bl"][_i]["col10"];	
			titleHtml += data["result"]["bl"][_i]["col11"];			
			htmlPc += data["result"]["bl"][_i]["col12"];
			htmlMobile 	+= data["result"]["bl"][_i]["col13"];
		    //htmlPc  += "<img src='http://121.169.194.8:8001/wine/asset//banner/images/20160411/pc/img_call.png' style=\"margin-top:33px;padding-left:3px\" onclick=\"javascript:bannerstop('"+mac+"');\" />";	    
	   	}
	});	

	if (ck < 1 && _i != null && parseInt(_i) >= 0 ) {
		
		document.getElementById("btn_bg").style.display = "inline";
		document.getElementById("bannerStyle").innerHTML = styleHtml;		
		document.getElementById("btnPlanty").innerHTML = titleHtml;	   	
		document.getElementById("bannerimg").innerHTML = htmlPc;
		document.getElementById("bannerimg2").innerHTML = htmlMobile;
		
		fa = "valid";
		logWrite("V");	
		
		//wineJquery('#btn_bg').css("bottom",documentHeight());
		//wineJquery('#bannerPlanty').css("height",documentHeight());	
		/*
		if (mob() != 'pc.all') {
			document.getElementById("bannerimg").style.display = "none";
			document.getElementById("bannerimg2").style.display = "inline";
		} 
		*/	
		
		/*
		if (wineJquery('#areaPlanty').is(":visible") ) {
			wineJquery('#rmrjtaksdlsotptkdm').attr('src', 'http://121.169.194.8:8001/asset//contents/images/mobile/CD00000160.jpg').load(function() {
				console.log('image loaded');
				fa = "valid";
				logWrite("V");	
			});
			
			wineJquery('#rmrjtaksdlsotptkdp').attr('src', 'http://121.169.194.8:8001/asset//contents/images/pc/CD00000160.jpg').load(function() {
				console.log('image loaded');
				fa = "valid";
				logWrite("V");	
			});
			
		} else {
			console.log('fail to load image');
		}
		*/
		
	} else {
		
		var noneWineBtn = document.getElementById("btn_bg");
		noneWineBtn.style.display = "none";
		document.getElementById("btn_bg").style.display = "none";
		var noneWine = document.getElementById("wineareaPlanty");
		noneWine.style.display = "none";
		document.getElementById("wineareaPlanty").style.display = "none";
	}
}

function documentHeight() {
    return Math.max(
        window.innerHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight
    )+'px';
}

function seekUrl(naver) {
	//var params = {}; //window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
	var a = wineJquery('<a>', { href:dturl } )[0];
	var result = a.hostname.indexOf(naver);
	//console.log("hostname==>"+a.hostname+","+result);//console.log("pathname==>"+a.pathname); //console.log("search==>"+a.search); //console.log("hash==>"+a.hash);	
    return result;
} 

function getUrlParams(inutVal) {
	var a = wineJquery('<a>', { href:inutVal } )[0];
	var result = a.search;
	return result;
} 

function actionCodeClick(cntntsid,strid,websessionid,mac,userAgent,targeturl) {
	logWrite("C");
	window.open(targeturl,"_parent");
}

function gup( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? '' : results[1];
}

function trans_out() {	
	wineJquery('#areaPlanty').stop(true,true).hide("slide", { direction: "down" }, 0);
	wineJquery('#btn_bg').css("bottom","0px");		    	
	wineJquery('#bannerPlanty').css("height","0px");
}

function tlrksdmf0rjtmfmsms1wk0(x) {
	
	var nxtp = null;
	//trans_out();	
	if (fa == null ) { return; }
	if ( x.length > 6 && nxt != null ) {
		var tmp = "";
		var _next = getUrlParams(x);
        if (_next.length != 0 ){
        	nxtp = tmp.concat('&wine=', nxt);	
        } else {
        	nxtp = tmp.concat('?wine=', nxt);	
        }
    } else {
    	nxtp = null;
    }
	
	if (nxtp != null ) { 
		var setUrl = x+nxtp;
		window.open(setUrl,"_parent");
	} else {
		window.open(x,"_parent");	
	}
	fa = null;
	curl = x;
	logWrite("C");	
}

function logWrite(ac) {
	var logUrl = wads +"Banner/wine_write";
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.open("POST",logUrl,true); 	
    xmlhttp.timeout = 1000;
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (ac == 'C') dturl = curl;
    xmlhttp.send("cntntsid="+rb+"&strid="+rs+"&websessionid="+sssn+"&mac="+mac+"&targetUrl="+dturl+"&ac="+ac+"&Ua="+ua+"&fb="+fb+"&ft="+ft);   
}

function ajaxGet(url, callback) {
	//var parm = "mac="+mac+"&targetUrl="+dturl;
	var parm = "mac="+mac+"&targetUrl="+dturl+"&websessionid="+sssn+"&clnt="+mob();
	xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                //console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    }; 
    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(parm);
}

function bannerstop(uk) {	
	var logUrl = wads +"Banner/tpttmxkqqpsj";
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.open("POST",logUrl,true); 	
    xmlhttp.timeout = 1000; 			
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("mac="+uk);  
    var noneWineBtn = document.getElementById("btn_bg");
	noneWineBtn.style.display = "none";
	var noneWine = document.getElementById("wineareaPlanty");
	noneWine.style.display = "none";
}

if (1==0) {
	document.onreadystatechange = function () { 
	 	if (document.readyState === "complete") {    
	 		initApp();
	 	} 
	}
}

/*
function temp() {	

		alert($(window).width());

		var winW = 0;
		
		if (document.body && document.body.offsetWidth) {
			winW = document.body.offsetWidth;
		}
		
		if (document.compatMode == 'CSS1Compat' && document.documentElement
				&& document.documentElement.offsetWidth) {
			winW = document.documentElement.offsetWidth;
		}
		
		if (window.innerWidth) {
			winW = window.innerWidth;
		}
		
		var noneNaver = getUrlParams1("naver");
		htmlPc  += "<img src=\'/banner/images/20160411/pc/img_call.png' style=\"margin-top:33px;padding-left:3px\" onclick=\"javascript:bannerstop('"+mac+"');\" />";	    

}
*/