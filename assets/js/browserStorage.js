var Cookies = (function() {

    return {
        setItem: createCookie,
        getItem: getCookie,
        removeItem: removeCookie
    };

    function getCookieDomain() {
        return /^(?:[^\.]+)(.*)/.exec(window.location.hostname)[1];
    }

    function createCookie(name, value, options) {
        options = options || {};

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var secs = options.expires;
            var t = new Date();
            t.setTime(t.getTime() + (secs * 1000));
            options.expires = t;
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(name), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '; path=/',
            options.domain ? '; domain=' + options.domain : '; domain=' + getCookieDomain(),
            options.secure ? '; Secure' : ''
        ].join(''));
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i=0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

    function removeCookie(name, options) {
        createCookie(name, null, options);
    }
}());

var Storage = (function () {
    var local = storage();

    function supportLocalStorage() {
        var isStorageSupported = false;
        if (typeof window.localStorage !== 'undefined') {
            try {
                window.localStorage.setItem('test', 1);
                window.localStorage.removeItem('test');
                isStorageSupported = true;
            }
            catch (error) {
                isStorageSupported = false;
            }

        }
        return isStorageSupported;
    }

    function storage() {
        var factory = {
            set: setStorage,
            get: getStorage,
            remove: removeStorage,
            init: init
        };

        var webStorage = {};

        var isLocalStorageSupported = supportLocalStorage();

        var localStorageSrv = {
            setItem: function(key, value) {
                if (!isLocalStorageSupported){
                    console.error('Local storage is not supported!');
                    return;
                }
                window.localStorage.setItem(key, value);
            },
            getItem: function(key) {
                if (!isLocalStorageSupported){
                    console.error('Local storage is not supported!');
                    return;
                }
                return window.localStorage.getItem(key);
            },
            removeItem: function(key, value) {
                if (!isLocalStorageSupported){
                    console.error('Local storage is not supported!');
                    return;
                }
                window.localStorage.removeItem(key);
            }
        };

        function setKey(key) {
            return key;
        }


        function init() {
            if (supportLocalStorage()) {
                webStorage = localStorageSrv;
            }
            else {
                webStorage = Cookies;
            }
        }

        function setStorage(key, value) {
            key = setKey(key);
            webStorage.setItem(key, value, {raw: true});
        }

        function getStorage(key) {
            key = setKey(key);
            return webStorage.getItem(key);
        }

        function removeStorage(key) {
            key = setKey(key);
            webStorage.removeItem(key);
        }

        init();

        return factory;
    }

    return {
        local : local
    };
}());
