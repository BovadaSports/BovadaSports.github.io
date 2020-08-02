(function saveReferralFromQueryString(querystring) {

function getQueryVariable(variable)
{
       var query = querystring.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(undefined);
}

var referral = getQueryVariable("myafftoken") || getQueryVariable("referral");
var extcmpid = getQueryVariable("extcmpid");

if (referral != undefined) {
    Storage.local.set("REFERRAL_AFFILIATE", referral);
    Storage.local.set("REFERRAL_AFFILIATE_TIMESTAMP", String(Date.now()));
}

if (extcmpid != undefined) {
    Storage.local.set("SHARING_METHOD", extcmpid);
}

} (window.location.search));
