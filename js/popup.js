window._organizzy = {
    getVersion: function() {return 'chrome-0.5.2'},
    getStartUpPage: function () {return null;},
    login: function(){},
    logout: function(){},
    getBaseServer: function(){
        return 'https://organizzy.org/m'
    }
};
var serverBase = _organizzy.getBaseServer();

require.config({
    baseUrl: 'js',
    waitSeconds: 30,

    paths: {
        app: serverBase + '/assets/app'
    }
});

require(['require', 'jquery'], function(require, $) {
    $('head').append('<link rel="stylesheet" href="' + serverBase + '/assets/style.css">');
    var logoSize = "";
    var w = document.body.clientWidth;
    if (w <= 240)
        logoSize = "-ldpi";
    else if (w <= 480)
        logoSize = "-mdpi";
    $('#logo').attr('src', 'images/logo' + logoSize + '.png');

    var nTry = 3;
    require.onError = function (err) {
        console.log(err.requireType);
        if (err.requireType === 'timeout') {
            if (--nTry > 0)
                loadApp(require);
            else {
                alert('Network error');
                navigator.app.exitApp();
            }
        }

        throw err;
    };

    function loadApp(require) {
        require(['app'], function(app){
            window.O = app;
           app.main.init(serverBase);
        });
    }

    loadApp(require);
});


