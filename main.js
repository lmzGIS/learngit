
requirejs.config({
    baseUrl:'../../arcgis-api',
    paths:{
      jquery:                '../node_modules/jquery/dist/jquery',
      handlebars:            '../node_modules/handlebars/dist/handlebars',
      head:                  '../components/head/head',
      map:                   '../components/mapOp/map',
      tree:                  '../components/tree/tree',
      search:                '../components/search/search',
      topTool:               '../components/topTool/topTool',
      mapTool:               '../components/mapTool/mapTool',
      cookie:                '../components/common/cookie',
      pubsubz:               '../components/common/pubsubz',
      IMapOperator:          '../components/mapOp/IMapOperator',
      drawGeoGraphic:        '../components/mapOp/drawGeoGraphic',
      request:               '../components/common/request',
      measure:               '../components/mapOp/measure',
      geoToWKT:              '../components/mapOp/geoToWKT',
      wktToGeometry:         '../components/mapOp/wktToGeometry',
      mapOpFactory:          '../components/mapOp/mapOpFactory',
      arcGISMapOp:           '../components/mapOp/arcGISMapOp',
      openLayerMapOp:        '../components/mapOp/openLayerMapOp',
      paginaton:             '../components/search/paginaton',
      treeRightMenu:         '../components/treeRightMenu/treeRightMenu',
      context:               '../components/treeRightMenu/context'
    },
    deps:[
      '../node_modules/jquery/dist/jquery',
      '../lib/jquery1.10.4-ui',
      '../lib/jquery.nicescroll',
      '../node_modules/bootstrap/dist/js/bootstrap',
      '../lib/md5'
    ],
    shim: {
        '../lib/jquery1.10.4-ui': ['jquery'],
        '../lib/jquery.nicescroll': ['jquery'],
        '../node_modules/bootstrap/dist/js/bootstrap': ['jquery']
    },
     packages: [
          {
            name: 'moment',
            location: 'moment',
            main: 'moment'
          }]
});
 define(["head", "map", "tree", "search", "topTool", "mapTool", "cookie"],
    function (head, map, tree, search, topTool, mapTool,cookie) {
        checkLogin();   
        function checkLogin() {
            var getCookie = cookie.get("token");
            var mydate = new Date();
            cookie.set('timer2', mydate.getTime(), { path: '/' });
            if (getCookie) {
                 init();
            } else {
                window.location.href = "../login/login.html";
            }
        };
        function init() {
            //加载main模块html模板
            $.get("../main/main.txt").success(function (content) {
                $("body").append(content);
                //加载树配置信息
                $.getJSON("../tree/TreeConfig(v2.0node).json", function (result) {
                    //初始化树模块
                    tree.init(result);
                });
                //初始化logo模块
               head.init();
                //..
                map.init();
                search.init();
                topTool.init();
                mapTool.init();
            });
            //加载模块样式
            $("head").append("<link>");
            var css = $("head").children(":last");
            css.attr({
                rel: "stylesheet",
                type: "text/css",
                href: "../main/main.css"
            });
        };
    });