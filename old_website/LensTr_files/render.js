function fireNetSeerTrigger() {
    window.netseer_fire_on_trigger = null;    
    netseerMainFunction(window);
}

function netseerMainFunction (lw) {
	var netseer_ap = "netseer_cookie_matching netseer_carrier_id netseer_lat netseer_long netseer_country netseer_city netseer_zip netseer_region netseer_dma netseer_device_type netseer_platform netseer_handset_id netseer_connection netseer_device_id netseer_site_id netseer_app_id netseer_ext_channel netseer_aud_segment netseer_demo netseer_inv_type netseer_req_id netseer_ext_script netseer_seller_id".split(" ");
	var netseer_ap_keys = "caid lat long cntr city zip rgn metro dvtype plf hsid cnn dvid stid appid extch extaseg demo invtype".split(" ");
	var netseer_ap_encoded = "netseer_site_name netseer_app_name".split(" ");
	var netseer_ap_encoded_keys = "stname appname".split(" ");
	
	var isDOMLoaded = false;
	//var cacheBuster = new Date().getTime();
	var cacheBuster = new Date().getHours();
    var exchanges = [10,11,16,18,27];
    var exchange_counter = 0;
    
    function loadNextPixel() {
        var pixel = new Image();
        if (exchange_counter + 1 < exchanges.length) {
            pixel.onload = loadNextPixel;
			pixel.onerror = loadNextPixel;
			pixel.onabort = loadNextPixel;
        }
        var cookie_status = '';
        if(lw.netseer_cookie){
        	cookie_status = '&cookie=0';
        }
        pixel.src = getProtocol(window)+'cmi.netseer.com/redirect?ex=' + exchanges[exchange_counter++] + '&t=' + cacheBuster + cookie_status;
    }
	
	function whichBrowser() {
		var agt=navigator.userAgent.toLowerCase();
		if (agt.indexOf("opera") != -1) return 'Opera';
		if (agt.indexOf("staroffice") != -1) return 'Star Office';
		if (agt.indexOf("webtv") != -1) return 'WebTV';
		if (agt.indexOf("beonex") != -1) return 'Beonex';
		if (agt.indexOf("chimera") != -1) return 'Chimera';
		if (agt.indexOf("netpositive") != -1) return 'NetPositive';
		if (agt.indexOf("phoenix") != -1) return 'Phoenix';
		if (agt.indexOf("firefox") != -1) return 'Firefox';
		if (agt.indexOf("safari") != -1) return 'Safari';
		if (agt.indexOf("skipstone") != -1) return 'SkipStone';
		if (agt.indexOf("msie") != -1) return 'Internet Explorer';
		if (agt.indexOf("netscape") != -1) return 'Netscape';
		if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
		if (agt.indexOf('\/') != -1) {
		if (agt.substr(0,agt.indexOf('\/')) != 'mozilla') {
		return navigator.userAgent.substr(0,agt.indexOf('\/'));}
		else return 'Netscape';} else if (agt.indexOf(' ') != -1)
		return navigator.userAgent.substr(0,agt.indexOf(' '));
		else return navigator.userAgent;
	}
	
	function generateUserId() {
		var userId = "usr";
		for(var i=0;i<16;i++){
			var randomnumber=Math.floor(Math.random()*16);
			userId  = userId + randomnumber.toString(16);
		}
		return userId;
	}
	
	function checkForSafariCookie(){				
		var browser = whichBrowser();
		var cookieName = "netseer_v3_vi";
		var userId = readCookie(cookieName);
		var ret = null;
		if( whichBrowser() == "Safari"){
			if(userId == null) {
				var date = new Date();
				userId = "0:"+generateUserId()+":"+date.getTime();
				createCookie(cookieName, userId, 1000);
			} 
			ret = userId.replace(/"/g,'');
		}
		
		return ret;
		
	}
	
	function isCookieBlocked(){
		// var cookieBlocked=(navigator.cookieEnabled)? false: true;
		//if not IE4+ nor NS6+
		// if (typeof navigator.cookieEnabled=="undefined" && !cookieBlocked){ 
		    var testCookie ="testcookie";
			document.cookie = testCookie;
			cookieBlocked=(document.cookie.indexOf(testCookie)!=-1)? false : true;
			document.cookie = testCookie + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		//}		
		return cookieBlocked;
	}
	
/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
 
var Base64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		output = Base64._utf8_decode(output);
 
		return output;
 
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
}

    function createCookie(name, value, days) {
        var expires = "";
        if (days) {
        	var exdate=new Date();
        	exdate.setDate(exdate.getDate() + days);        	
            expires = "; expires=" + exdate.toUTCString();
        }
        //document.cookie = name + "=" + value + expires +"; domain=.ns-cdn.com"+ "; path=/";
        document.cookie = name + "=" + value + expires +"; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }
	
	function removeParamFromURL(URL,param)
		{
			URL = String(URL);
			var regex = new RegExp( "\\?" + param + "=[^&]*&?", "gi");
			URL = URL.replace(regex,'?');
			regex = new RegExp( "\\&" + param + "=[^&]*&?", "gi");
			URL = URL.replace(regex,'&');
			URL = URL.replace(/(\?|&)$/,'');
			regex = null;
			return URL;
		}
 
	function addParamToURL(URL,param,value)
		{
			URL = removeParamFromURL(URL,param);
			URL = URL + '&' + param + '=' + value
			if (!(/\?/.test(URL))) URL = URL.replace(/&/,'?');
			return URL;
		}

    function eraseCookie(name) {
        createCookie(name, "", -1);
    }

    function getQuerystring(key, url, default_, seperator) {
        if (default_ == null) {
            default_ = "";
        }

        if (seperator == null) {
            seperator = "&";
        }

        key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?" + seperator + "]" + key + "=([^" + seperator + "#]*)");
        var qs = regex.exec(url);
        if (qs == null) {
            return default_;
        } else {
            return qs[1];
        }
    }

    function getProtocol(a) {
        if ((a && a["location"] && a["location"].protocol && a["location"].protocol["toString"]().toLowerCase() == "https:") || (a.netseer_enforce_protocol && a.netseer_enforce_protocol == "https")) return "https://";
        return "http://";
    }
    
    function getHost(a) {
    	if (a && a["location"] && a["location"].host) return a["location"].host["toString"]();
    	else return "cl.netseer.com";
    }

    function getServerEndPoint(a) {
    	var requestProtocol = getProtocol(a);
    	if(a.netseer_embed_style && a.netseer_embed_style=='inline'){
    		return "";
    	}
    	if(a.netseer_endpoint){
        	if(a.netseer_endpoint =='contextlinks.netseer.com'){
        		a.netseer_endpoint = 'cl.netseer.com';
        	} else if(a.netseer_endpoint =='staging.netseer.com'){
        		a.netseer_endpoint = 'media.netseer.com';
        	}
        	
        } else if(a && a.netseer_task=='px'){        	
        	a.netseer_endpoint = 'pixel.netseer.com';
        } else { 
        	a.netseer_endpoint = 'cl.netseer.com';
        }
        
        return requestProtocol + a.netseer_endpoint;
    }

    function getLocationForYahoo(url) {
        var vars = url.href.split("$,");
        return vars[vars.length - 1];
    }

    function RemoveHTML(strText) {
        var regEx = /<[^>]*>/g;
        return strText.replace(regEx, "");
    }

    function check(b) {
        return b != null ? "\"" + b + "\"" : "\"\"";
    }

    function encodeUrl(b) {
        if (b) {
            try {
                if (typeof encodeURIComponent == "function") {
                    return encodeURIComponent(b);
                } else {
                    return escape(b);
                }
            } catch (e) {
                return "";
            }
        } else {
            return b;
        }
    }

    function decodeUrl(b,replacePlus) {
        if (b) {
        	if(replacePlus){
        		b = b.replace(/\+/g," "); 
        	}
            try {
                if (typeof decodeURIComponent == "function") {
                    return decodeURIComponent(b);
                } else {
                    return unescape(b);
                }
            } catch (e) {
                return "";
            }
        } else {
            return b;
        }
    }

    function addToUrl(b, a) {
        if (a) {
        	var seperator = "&";
        	if(lw.netseer_global_fparam && lw.netseer_global_fparam  == "true") seperator = ""; 
            lw.netseer_ad_url += seperator + b + "=" + a;
            lw.netseer_global_fparam  = "false";
        }
    }

    function addParam(b, a) {
        if (a) {
            lw.netseer_page_params += "&" + b + "=" + a;
        }
    }
    
    function addExtParam(a) {
        if (a) {
            lw.netseer_page_params += "&" + a;
        }
    }

    function addToUrlNoKey(a) {
        if (a) {
            lw.netseer_ad_url += "&" + a;
        }
    }

    function addEncodedUrl(b, a) {
        if (a) {
            addToUrl(b, encodeUrl(a));
        }
    }

    function setColor(b, a, d) {
        if (a && typeof a == "object") {
            a = a[d % a.length];
        }
        addToUrl("color_" + b, a);
    }

    function checkClient(b) {
        b = b.toLowerCase();
        if (b.substring(0, 3) != "ca-") {
            b = "ca-" + b;
        }
        return b;
    }

    function decode64(input) {

        var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            return "invalid base64 url";
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;
    }
    
    function setToNull(b) {
        var a = null;
        
        b.netseer_global_fparam = a;
        b.netseer_query = a;
        b.netseer_ad_frameborder = a;
        b.netseer_ad_format = a;
        b.netseer_page_url = a;
        b.netseer_output_format = a;
        b.netseer_language = a;
        b.netseer_gl = a;
        b.netseer_country = a;
        b.netseer_region = a;
        b.netseer_city = a;
        b.netseer_hints = a;
        b.netseer_safe = a;
        b.netseer_encoding = a;
        b.netseer_ad_output = a;
        b.netseer_max_num_ads = a;
        b.netseer_ad_channel = a;
        b.netseer_contents = a;        
        b.netseer_adtest = a;
        b.netseer_kw_type = a;
        b.netseer_kw = a;
        b.netseer_num_radlinks = a;
        b.netseer_max_radlink_len = a;
        b.netseer_rl_filtering = a;
        b.netseer_rl_mode = a;
        b.netseer_rt = a;
        b.netseer_ad_type = a;
        b.netseer_image_size = a;        
        b.netseer_skip = a;
        b.netseer_page_location = a;
        b.netseer_referrer_url = a;
        b.netseer_ad_region = a;
        b.netseer_ad_section = a;
        b.netseer_bid = a;
        b.netseer_cpa_choice = a;
        b.netseer_cust_age = a;
        b.netseer_cust_gender = a;
        b.netseer_cust_interests = a;
        b.netseer_cust_id = a;
        b.netseer_cust_job = a;
        b.netseer_cust_u_url = a;
        b.netseer_sim = a;
        b.netseer_color_bilboard = a;
        b.netseer_banner_id = a;
        b.netseer_network_id = a;
        b.netseer_tracking_url = a;
        b.netseer_tracking_url_encoded = a;
        b.netseer_page_url_key = a;
        b.netseer_search_current_url = a;
        b.netseer_page_params = a;
        b.netseer_page_url_base64 = a;
        b.netseer_landing_page_type = a;
        b.netseer_background_color = a;
        b.netseer_click_target = a;
        b.netseer_pixel_param1 = a;
        b.netseer_pixel_param2 = a;
        b.netseer_pixel_param3 = a;
        b.netseer_pixel_id = a;
        b.netseer_tag_id = a;
        b.netseer_client_id = a;
        b.netseer_task = a;
        b.netseer_creative_id = a;        
        b.netseer_auction_id = a;
        b.netseer_slot_index = a;        
        b.netseer_imp_type = a;
        b.netseer_ext_vid = a;
        b.netseer_advs = a;
        b.netseer_taglink_id = a;
        b.netseer_segment = a;
        b.netseer_iframe_buster = a;
        b.netseer_search_param = a;
        b.netseer_recirculation_sites = a;
        b.netseer_fire_on_trigger = a;
		b.netseer_redundant_params = a;
		b.netseer_url_pattern = a;
        b.netseer_theme_id = a;
        b.netseer_imp_src = a;        
        b.netseer_endpoint = a;
        b.netseer_ad_height=a;
        b.netseer_ad_width=a;
        b.netseer_page_url_key=a;    
        b.netseer_debug=a;
        b.netseer_pixel_cpa=a;
        b.netseer_search_term = a;
        b.netseer_visitor_cookie = a;
        b.netseer_cookie = a;
        b.netseer_hints = a;
        b.netseer_bing_formcode = a ;
        b.netseer_embed_external_pixels = a;
        b.netseer_referrer_search_term = a;
        b.netseer_referrer_domain = a;
        b.netseer_concept_group_id = a;
        b.netseer_ext_params = a;
        b.netseer_url_suffix = a;
        b.netseer_embed_style = a;
        b.netseer_append = a;
        b.netseer_pilot_id = a;
        b.netseer_rule_id = a;
        b.netseer_enforce_protocol = a;
        b.netseer_lead_params = a;
        b.netseer_ip = a;
        b.netseer_num_ads = a;
        b.netseer_ad_position = a;
        b.netseer_cpc = a;
        b.netseer_user_tgid = a;
        b.netseer_page_tgid = a;
        b.netseer_user_cgid = a;
        b.netseer_page_cgid = a;
        b.netseer_image_size = a;
        b.netseer_image_forced = a;
        b.netseer_cookie_matching = a;
        b.netseer_req_id = a;
        b.netseer_ext_script = a;
        b.netseer_seller_id = a;
    	for ( var c = 0; c < netseer_ap.length; c++)
    		b[netseer_ap[c]] = a;
    	for ( var c = 0; c < netseer_ap_encoded.length; c++)
    		b[netseer_ap_encoded[c]] = a;
    }

    function makeOutput(netseer_task, netseer_ad_height, netseer_ad_width, netseer_iframe_buster, d, divId,netseer_cookie,netseer_imp_src,pixelId,netseerEndPoint,netseerCookieMatching) {
    	var cacheBuster = Math.random();
        d = d.substring(0, 2083);
        d = d.replace(/%\w?$/, "");
        if(d!=null){
        	d = d+"&t="+cacheBuster;
        }
        var outputCode;
        var finalUrl;
        if (netseer_task == 'lp') {
        	finalUrl = check(d);
        	outputCode = "<iframe  id=\"netseer_landingpage_frame\"  name=\"netseer_landingpage_frame\" width=" + check(netseer_ad_width) + " height=" + check(netseer_ad_height) + " src=" + check(d) + " frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" vspace=\"0\" hspace=\"0\" allowtransparency=\"true\" scrolling=\"no\"></iframe>";
		 document.getElementById(divId).innerHTML=outputCode;
//            document.write(outputCode);
          

        } else if (netseer_task == 'ad') {

            if (netseer_iframe_buster) {
                var destUrl = netseer_iframe_buster + "?forward_url=" + encodeUrl(d) + "&height=" + netseer_ad_height + "&width=" + netseer_ad_width;
                finalUrl = check(destUrl);
                outputCode = "<iframe name=\"netseer_ads_frame\" width=" + check(netseer_ad_width) + " height=" + check(netseer_ad_height) + " src=" + check(destUrl) + " frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" vspace=\"0\" hspace=\"0\" allowtransparency=\"true\" scrolling=\"no\"></iframe>"; 
                document.getElementById(divId).innerHTML = outputCode;
//                document.write(outputCode);
          
            } else {
            	finalUrl = check(d);
            	outputCode = "<iframe name=\"netseer_ads_frame\" width=" + check(netseer_ad_width) + " height=" + check(netseer_ad_height) + " src=" + check(d) + " frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" vspace=\"0\" hspace=\"0\" allowtransparency=\"true\" scrolling=\"no\"></iframe>";            	
            	if(lw.netseer_append){
            		var nodeToAppend = document.getElementById(lw.netseer_append);
            		if(nodeToAppend){
            			nodeToAppend.innerHTML = nodeToAppend.innerHTML + outputCode;
            		}
            	} else {
//	            	document.open();
            		document.getElementById(divId).innerHTML = outputCode;
//	            	document.write(outputCode);
//	            	document.close();
            	}
            }
            // running cookie matching for all impressions
            var isCookieMatched = readCookie('netseer_cm');
            
            if(netseerCookieMatching!='false' && isCookieMatched!='done' && !netseer_cookie && netseer_imp_src != '10'){
            	loadNextPixel();
            	if(netseer_imp_src != '11' && netseer_imp_src != '12' && netseer_imp_src != '13' && netseer_imp_src != '14' && netseer_imp_src != '15' && netseer_imp_src != '16' && netseer_imp_src != '17' && netseer_imp_src != '18' && netseer_imp_src != '20' && 	netseer_imp_src != '21' && 	netseer_imp_src != '27'){
                	createCookie('netseer_cm', 'done', 15);
                }
            }
            
            
        } else if (netseer_task == 'px') {        	
        	 bindReady(function () {loadPixel(d,pixelId,netseerEndPoint,divId);});        	
        }
    }
    
    function bindReady(handler){

    	var called = false;

    	function ready() { 
    		if (called) return;
    		called = true;
    		handler();
    	}

    	if (window.addEventListener){
            window.addEventListener('load', ready, false);
    	} else {
    	if ( document.addEventListener ) { // native event
    		document.addEventListener( "DOMContentLoaded", ready, false );
    	} else if ( document.attachEvent ) {  // IE

    		try {
    			var isFrame = window.frameElement != null;
    		} catch(e) {}

    		// IE, the document is not inside a frame
    		if ( document.documentElement.doScroll && !isFrame ) {
    			function tryScroll(){
    				if (called) return;
    				try {
    					document.documentElement.doScroll("left");
    					ready();
    				} catch(e) {
    					setTimeout(tryScroll, 10);
    				}
    			}
    			tryScroll();
    		}

    		// IE, the document is inside a frame
    		document.attachEvent("onreadystatechange", function(){
    			if ( document.readyState === "complete" ) {
    				ready();
    			}
    		});
    	}

    	}
    	/*
    	// Old browsers
        if (window.addEventListener)
            window.addEventListener('load', ready, false);
        else if (window.attachEvent)
            window.attachEvent('onload', ready);
        else {
    		var fn = window.onload; // very old browser, copy old onload
    		window.onload = function() { // replace by new onload and call the old one
    			fn && fn();
    			ready();
    		};
        }
        */
        
    }

    
    function doLoad() {
        alert( "The load event is executing" );
     }

    function loadPixel(d,pixelId,netseerEndPoint,divId){
    	var pixel = new Image();            
        pixel.onload = loadNextPixel;
        pixel.onabort = loadNextPixel;
        pixel.onerror = loadNextPixel;
        pixel.src = d;
        embedPixel(pixelId,netseerEndPoint,divId);
    }
    
    /*
    function embedPixel(pixelId){
    		var pixelUrl = getServerEndPoint(window) + "/dsatserving2/servlet/pixel?pxid=" + pixelId;
    		document.write('<scr'+'ipt type="text/javascript" src="'+pixelUrl+'"> </scr'+'ipt>');
    }
    */
    function embedPixel(pixelId,netseerEndPoint,divId){
    	var pixelUrl = netseerEndPoint + "/dsatserving2/servlet/pixel?pxid=" + pixelId;
    	var outputCode = "<iframe name=\"nspx\" width=0 height=0 src=" + check(pixelUrl) + " frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" vspace=\"0\" hspace=\"0\" allowtransparency=\"true\" scrolling=\"no\"></iframe>";
    	document.getElementById(divId).innerHTML = outputCode;
    }
    
	
	function checkForRedundantParams(a){
		if(a.netseer_redundant_params){
			var parts = a.netseer_redundant_params.split(",");
			 for (var i = 0; i < parts.length; i++) {
				var currentUrl = a.netseer_page_url;
				a.netseer_page_url = removeParamFromURL(currentUrl,parts[i]);
			 }
		}
	}
	
	function getRealPart(a){
		if(a.netseer_url_pattern){
			var regex = new RegExp(a.netseer_url_pattern,"gi");
			var matches = regex.exec(a.netseer_page_url);
			if(matches!=null){
				a.netseer_page_url = decodeUrl(matches[1]);
			}
		}
	}

    function Main(lw) {
        var b = null,
            a = lw,
            d = document,
            g = new Date,
            e = g.getTime(),
            j = a.netseer_ad_format,
            src = d.location;
        
        a.netseer_page_params = "";
        a.netseer_global_fparam = "true";

		checkForRedundantParams(a);
		getRealPart(a);		
        if (a.netseer_task == "lp") {

            a.netseer_ad_url = getServerEndPoint(a) + "/dsatserving2/servlet/search?";
            // this part is done to make sure many to one mapping of tag to
            // landing page counts toward the referral tag
            var queryString = a.location.search.substring(1);
            if (queryString) {
                queryString = queryString.replace("tlid=", "tlidr=");
            }
            var TagLinkIdRef = getQuerystring("tlid", queryString, null, null);
            addToUrl("tlid", a.netseer_taglink_id);
            addToUrlNoKey(queryString);
            addEncodedUrl("url", a.netseer_page_url);
        } else if (a.netseer_task == "ad") {
            // these parameters are used for ads
            a.netseer_ad_url = getServerEndPoint(a) + "/dsatserving2/servlet/BannerServer?";
            addToUrl("tagid", a.netseer_tag_id);
            addToUrl("tlid", a.netseer_taglink_id);        
            addToUrl("cid", a.netseer_creative_id);
            addToUrl("cptgid",a.netseer_concept_group_id);
            addToUrl("plid",a.netseer_pilot_id);
            addToUrl("rlid",a.netseer_rule_id);
            addToUrl("utgid",a.netseer_user_tgid);
            addToUrl("ptgid",a.netseer_page_tgid);
            addToUrl("ucgid",a.netseer_user_cgid);
            addToUrl("pcgid",a.netseer_page_cgid);
            
            if (a.netseer_iframe_buster == null || a.netseer_iframe_buster == "") {
                addEncodedUrl("url", a.netseer_page_url);
            }
            addToUrl("q", a.netseer_query);
            
        } else if (a.netseer_task == "px") {
        		
            a.netseer_ad_url = getServerEndPoint(a) + "/dsatserving2/servlet/log?";

            //if (getQuerystring("cid", a.netseer_page_url, "") == "") {
            //    addToUrl("tagid", a.netseer_tag_id);
            //}

            addToUrl("tagid", a.netseer_tag_id);
            addToUrl("tlid", a.netseer_taglink_id);
            
            addToUrl("pxid", a.netseer_pixel_id);
            if(!a.netseer_log_type){
            	a.netseer_log_type = "ltpx";
            }
            addToUrl("nlt", a.netseer_log_type);
            // addToUrl("cookie", a.netseer_user_id);
            addToUrl("cid", a.netseer_creative_id);

            addToUrl("q", a.netseer_query);
            addEncodedUrl("url", a.netseer_page_url);
            addEncodedUrl("pxp1", a.netseer_pixel_param1);
            addEncodedUrl("pxp2", a.netseer_pixel_param2);
            addEncodedUrl("pxp3", a.netseer_pixel_param3);
            addEncodedUrl("pxcpa", a.netseer_pixel_cpa);
            // addToUrlNoKey(a.location.search.substring(1));
           
            /*
            if(a.netseer_embed_external_pixels) {
            	embedPixel(a.netseer_pixel_id);
            }
            */
        }
        
       	for ( var c = 0; c < netseer_ap.length; c++) {
			if (a[netseer_ap[c]] != null)
				addToUrl(netseer_ap_keys[c], a[netseer_ap[c]]);
       	}
       	for ( var c = 0; c < netseer_ap_encoded.length; c++) {
			if (a[netseer_ap_encoded[c]] != null)
				addEncodedUrl(netseer_ap_encoded_keys[c], a[netseer_ap_encoded[c]]);
       	}

        if (a.netseer_segment) {
            addParam('segment', a.netseer_segment);
        }

        if (a.netseer_recirculation_sites) {
            addParam('sites', a.netseer_recirculation_sites);
        }
        
        if (a.netseer_bing_formcode) {
            addParam('bingformc', a.netseer_bing_formcode);
        }
        
        if (a.netseer_ext_params) {
            addExtParam(a.netseer_ext_params);
        }
        
        addEncodedUrl("params", a.netseer_page_params);
        addEncodedUrl("nslp", decodeUrl(a.netseer_lead_params));

        
        addToUrl("pp", a.netseer_pcpm);
        addToUrl("bp", a.netseer_bcpm);
        addToUrl("auid", a.netseer_auction_id);
        addToUrl("sidx", a.netseer_slot_index);
        addToUrl("evid", a.netseer_ext_vid);        
        if(a.netseer_cookie){
        	addToUrl("cookie", '0');
        }
        
        addToUrl("impt", a.netseer_imp_type);
        addToUrl("advs", a.netseer_advs);
        addEncodedUrl("sep", a.netseer_search_param);
        addEncodedUrl("set", decodeUrl(a.netseer_search_term,true));
        addEncodedUrl("trurl", decodeUrl(a.netseer_tracking_url));
        
        addEncodedUrl("rfs", decodeUrl(a.netseer_referrer_search_term,true));
        addEncodedUrl("rfd", a.netseer_referrer_domain);
        
        addToUrl("thid", a.netseer_theme_id);
        addToUrl("imps", a.netseer_imp_src);
        addToUrl("adh", a.netseer_ad_height);
        addToUrl("adw", a.netseer_ad_width);
        addToUrl("frd", a.netseer_first_request_date);
        addToUrl("ip", a.netseer_ip);
        addToUrl("cnads", a.netseer_num_ads);
        addToUrl("adpos", a.netseer_ad_position);
        addToUrl("cpc", a.netseer_cpc);
        addToUrl("cimg", a.netseer_image_size);
        addToUrl("cimgfrc", a.netseer_image_forced);
        addToUrl("refid",a.netseer_req_id);
        addToUrl("exsid",a.netseer_seller_id);
        
        addEncodedUrl("hints", a.netseer_hints);
        addEncodedUrl("extsct", decodeUrl(a.netseer_ext_script));
        

        makeOutput(a.netseer_task, a.netseer_ad_height, a.netseer_ad_width, a.netseer_iframe_buster, a.netseer_ad_url, lw.netseer_append_location,a.netseer_cookie,a.netseer_imp_src,a.netseer_pixel_id,getServerEndPoint(a),a.netseer_cookie_matching);
        
        setToNull(a);

    }

/*
    function onLoadCallBack() {
        makeOutput(window, document, window.netseer_ad_url);
        setToNull(window);
    }
*/

    function getLocation(a, b) {

        var url_key = b.netseer_page_url_key;

        if (url_key == null) {
        	try{
                return b.top.location.href;
       	 	}catch(err){
                return b.location.href;
       	 	}
        } else {

            var parts = url_key.split(",");
            var seperator = "&";

            if (parts.length > 3) {
                seperator = parts[3];
            }
            var url = decodeUrl(getQuerystring(parts[0], b.location, null, seperator));
            if (parts.length > 1) {
                url = parts[1] + url;
            }
            if (parts.length > 2) {
                url = url + parts[2];
            }
            return url;
        }
    }

    function markLoaded(){
		isDOMLoaded = true;
	}
    
    function getSearchTerm(referrerUrl){
    	
    	var query = null;
    	
    	if(isSubStr('.google.',referrerUrl)){
    		query = getQuerystring('q', referrerUrl, null);	
    	}
    	
    	else if(isSubStr('.bing.',referrerUrl)){
    		query =  getQuerystring('q', referrerUrl, null);	
    	}
    	
    	else if(isSubStr('.yahoo.',referrerUrl)){
    		var p = getQuerystring('p', referrerUrl, null); 
    		if(p) { 
    			query = p;
    		} else {
    			var q = getQuerystring('q', referrerUrl, null); 
    			if(q) query = q;
    		}
    	}
    	
    	/*
    	if(isSubStr('.aol.',referrerUrl)){
    		return getQuerystring('q', referrerUrl, null);	
    	}
    	
    	if(isSubStr('.ask.',referrerUrl)){
    		return getQuerystring('q', referrerUrl, null);	
    	}
    	    	
    	if(isSubStr('.hotbot.',referrerUrl)){
    		return getQuerystring('query', referrerUrl, null);	
    	}
    	
    	if(isSubStr('gigablast.',referrerUrl)){
    		return getQuerystring('q', referrerUrl, null);	
    	}
    	
    	if(isSubStr('.lycos.',referrerUrl)){
    		return getQuerystring('query', referrerUrl, null);	
    	}
    	
    	if(isSubStr('.dmoz.',referrerUrl)){
    		return getQuerystring('q', referrerUrl, null);	
    	}
    	
    	if(isSubStr('.yippy.',referrerUrl)){
    		return getQuerystring('query', referrerUrl, null);	
    	}
    	
    	if(isSubStr('dogpile.',referrerUrl)){
    		var regex = new RegExp("/Web/(.*)/");
        	var q = regex.exec(referrerUrl);
        	return q;
    	}
    	
    	if(isSubStr('.infospace.',referrerUrl)){
    		var regex = new RegExp("/Web/(.*)/");
        	var q = regex.exec(referrerUrl);
        	return q;
    	}
    	*/
    	if(query){
    		query = query.replace(/\+/g,' ');
    	}
        
    	return query;
    }
    
    function isSubStr(needle,haystack){
    	if(haystack && needle){
    		return haystack.indexOf(needle) != -1; 
    	} else {
    		return false;
    	}
    }
    
    function Init(lw) {
    	
        var b = lw,
            a = document,
            d = a.location,
            g = a.referrer,
            e = null;
        
        if(b.netseer_first_request_date == e){
        	b.netseer_first_request_date = new Date().getTime();
        }
        
      //Keep track of when the document has been loaded
    	/*
    	if(a.addEventListener)
    		a.addEventListener('DOMContentLoaded', markLoaded, false);
    	if(b.addEventListener)
    		b.addEventListener('load', markLoaded, false);
    	if(b.attachEvent)
    		b.attachEvent('onload', markLoaded);
    	 */
    	
        // b.netseer_org_error_handler = b.onerror;
        // b.onerror = callMain;
        b.netseer_search_current_url = d;
        if(g){
        	b.netseer_referrer_url = g;
        	b.netseer_referrer_domain = g.split('/')[2];
        	b.netseer_referrer_search_term = getSearchTerm(g);
        } else {
        	b.netseer_referrer_url = "";
        }
        
        //createCookie("netseer_v3_ref", Base64.encode(b.netseer_referrer_url),1000);
        b.netseer_cookie = isCookieBlocked();
        
            if (b.netseer_page_url == e) {
                b.netseer_page_url = getLocation(a, b);
                b.netseer_last_modified_time = Date.parse(a.lastModified) / 1000;        
            } else {
                b.netseer_page_location = d;
                b.netseer_page_url = decodeUrl(b.netseer_page_url);
            }
            
            if(b.netseer_url_suffix){
        		b.netseer_page_url = b.netseer_page_url + b.netseer_url_suffix;
        	}
    }
    
    if(lw.netseer_fire_on_trigger){
    	return;
    }
        	
    Init(lw);
    Main(lw);
        
};



//netseerMainFunction();
