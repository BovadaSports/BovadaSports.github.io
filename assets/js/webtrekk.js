if (window && window.config && !window._tiConfig) {
    window.wts = window.wts || [];

    var webtrekkUri = window.config["site.config.webtrekk.uri"];
    if (webtrekkUri && webtrekkUri.length > 0) {
        window._tiConfig = window._tiConfig || {};
        webtrekkUri = webtrekkUri[0].replace("{{url}}", encodeURIComponent(window.location.href));
    } else {
        webtrekkUri = "/assets/js/vendor/webtrekk-tiLoader.min.js";
    }
    (function(d, u) {
        var e = d.getElementsByTagName("script")[0];
        var a = d.createElement("script");
        a.async = !0;
        a.src =  u;
        e.parentNode.insertBefore(a, e)
    }
    )(document, webtrekkUri);
}


(function trackNavigationFromMicrosite() {

    function refreshContextValues() {
        if (window.wts) {
            var lang = Cookies.getItem("LANG");
            var customerId = Storage.local.get("customerId") || "false";
            var siteName = config.brandCode;
            var path = window.location.pathname;
            var contentId = siteName + path.replace(/\//g, ":");

            window.wts.push(["customerId", customerId]);
            window.wts.push(["contentId", contentId]);
            window.wts.push(["site_name", siteName]);
            window.wts.push(["page_language", lang]);
        }
    }

    function trackNavigation() {
        refreshContextValues();
        if (window.wts) {
            window.wts.push(["cp776", document.title]);
            window.wts.push(["send", "pageupdate"]);
        }
    }

    trackNavigation();

} ());
