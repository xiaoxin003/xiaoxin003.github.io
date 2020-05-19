/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/2020/04/09/node-README/index.html","139e0979e1df73fd27033b076fc68bce"],["/2020/04/09/node-http/index.html","e131ef23fd15852c6e02b6159798c802"],["/2020/04/09/node-start/index.html","8f2a84f540d2094efaf1cc5010e3ca42"],["/2020/04/09/node-文件操作/index.html","895890039f44c90d81cb9b9601163597"],["/2020/04/10/node-Apache目录列表(模板引擎)/index.html","a6284dc5d2428b5d29a743b8b4e6a5a9"],["/2020/04/10/node-Node中使用模板引擎/index.html","cd1d2382aacbf52871f26a4d7ede8f4f"],["/2020/04/10/node-处理网站中的静态资源/index.html","ef43eee1c50980350798b6c725934181"],["/2020/04/10/node-处理表单get提交/index.html","e066c338f3f02d28d94b4f129b420096"],["/2020/04/11/js-基本语法+数据类型+运算符/index.html","fa1adda06c5cba656cfdaeb58bc43e32"],["/2020/04/11/node-Express/index.html","024ca8797f71c3970f489b1419177bbe"],["/2020/04/11/node-模块系统/index.html","f1ab4b63c75279a08a2fc8d7ac10faf8"],["/2020/04/13/ts-README/index.html","0300a658e522743bd2b361dcb5939a34"],["/2020/04/13/ts-变量与数据类型/index.html","2751fac8bff0906650b55d0cdc87bf94"],["/2020/04/14/node-MongoDB/index.html","6752e3283aef5946f44f028f2935c9e4"],["/2020/04/14/node-mySql/index.html","5d0faef15c4da77e6988ab1862609985"],["/2020/04/15/node-综合案例/index.html","c407a8dac2eb306157915a5fa362557e"],["/2020/04/16/vue-README/index.html","75e2857652ba69918ac8978e993b5ab1"],["/2020/04/20/vue-Vue单文件组件/index.html","877f390be6ccd3640ab33ad074ac1012"],["/2020/04/20/vue-模块化相关规范/index.html","5d9c5bfb73b487e1c05c1d240f753523"],["/2020/04/20/vue-脚手架/index.html","1a578a47ea189c83f82d210b78bc5981"],["/2020/04/20/webpack-README/index.html","7eb48f793c572d949c1dc918c9c36d1a"],["/2020/04/21/vue-vue3.0/index.html","5a83dc0c86548f43a7380949767a0447"],["/2020/04/21/vue-基本用法/index.html","eb5682c45c0b048e6d4b02ba6b4487e9"],["/2020/04/23/js-BOM模型/index.html","dc0c4a5f44176ffae4a5edf100d29bd7"],["/2020/04/23/js-DOM模型/index.html","71ed2095bd19a36c105222aea943b837"],["/2020/04/23/js-导论/index.html","61ce4fd58f47c157478b3d3ce45b76a1"],["/2020/04/23/js-异步操作/index.html","21ec8405683daef6594b91f9dd32cd72"],["/2020/04/23/js-标准库/index.html","d646adc1e85f8cedad321ba6eedc9b57"],["/2020/04/23/js-面向对象编程/index.html","1012b4e03634feb617ea768c915ce359"],["/2020/04/24/js-语法专题/index.html","f6c8b6565901260cc90fbb811e9aeeb9"],["/2020/05/06/js-事件/index.html","ac4feddbb7de25246fc0b2484f4ab416"],["/2020/05/06/js-附录：网页元素接口/index.html","1865157ae8f05f72a5e5cafd6e9d50ff"],["/2020/05/07/hexo-start/index.html","8c62933fb82c79edbf0fcc1d39ab81ef"],["/2020/05/11/hello-world/index.html","b56894e3150f0adef070dd5f0ea35402"],["/2020/05/12/js-AST/index.html","6d0ce930b99a3d361a5e9cb5a91c166a"],["/2020/05/13/宝藏网站/index.html","f0212303f285baac1a7a9b9fd61506ce"],["/2020/05/13/程序员必备的谷歌浏览器插件/index.html","70ed7971aa0b4e3016498d2c26998f4c"],["/2020/05/13/高效使用Github寻找开源项目/index.html","afc0de45e6425347c094c35d60be41de"],["/2020/05/17/Git/index.html","b0b219360bb84039e59d4afc7efe4edc"],["/2020/05/18/布局/index.html","e64530733fbdeeba29f5b9cca586b9de"],["/archives/2020/04/index.html","2abeb0ea076190a3f16ffed66887a083"],["/archives/2020/04/page/2/index.html","9e08ea97190a1dc5403507a08c3037f4"],["/archives/2020/04/page/3/index.html","bfa3343c9892233f1715f15f4d300e81"],["/archives/2020/05/index.html","b4ce3b8b73d499409b53511aeb9c40d9"],["/archives/2020/index.html","885cccad0faec64e8ef911096100667f"],["/archives/2020/page/2/index.html","9266ad40a2c702cd433542e9bb7950ef"],["/archives/2020/page/3/index.html","f2328eb4d7cb57e6c10b2c2a2aeaab21"],["/archives/2020/page/4/index.html","71a60f0413058aeedff8fd47e1d7b8f3"],["/archives/index.html","81dad13bea9e5e70fd0a1f944d69a423"],["/archives/page/2/index.html","67f264f916789ad56f12235c8f94a80a"],["/archives/page/3/index.html","613f5230406eca088a1babb2ab6f4bc2"],["/archives/page/4/index.html","5c5cb1435f6a3a93bd2a8b371d653c52"],["/assets/algolia/algoliasearch.js","d5d2500bfe8443b42baaefe4996ee532"],["/assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["/assets/algolia/algoliasearchLite.js","ce9b0e62645c036a143f639b92e7789f"],["/assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["/categories/CSS/index.html","3fb10812b9f27f9d90ef104c79654093"],["/categories/CSS/布局/index.html","325c7d4a4b63bc24eb4a618bc4581e34"],["/categories/Git/index.html","13a462768757ed2d3f3157c41821e85a"],["/categories/Github/index.html","e10b5461f7bf02c6bd517d3a4b53676b"],["/categories/Github/寻找开源项目/index.html","08910e013fbb53a9329e87a56f3c5b22"],["/categories/Github/扩展插件/index.html","c70bef3cc5a842fade1cad8f5224ff62"],["/categories/HEXO/START/index.html","9d3e1faf46bbb5b7ba04c10f11742dc1"],["/categories/HEXO/hello-world/index.html","edb1f4c75477d8f151e1e073854d9119"],["/categories/HEXO/index.html","b0db42728b64b766380ac364d5f40337"],["/categories/JavaScript/index.html","745c94ced60395cc97a82aea8d1abe6b"],["/categories/JavaScript/notes/BOM/index.html","1e32c0e54a2f3f06ce883bc9d6a24c87"],["/categories/JavaScript/notes/DOM/index.html","09e07997bc0502c40696687688f34a32"],["/categories/JavaScript/notes/index.html","5be31d7135c3b1982f3f70aad2a956d4"],["/categories/JavaScript/notes/事件/index.html","e24dc1e046188539b86ad2d5ca9b8870"],["/categories/JavaScript/notes/基本语法、数据类型、运算符/index.html","3ed75189b29fb0f97c6debfafa01aacf"],["/categories/JavaScript/notes/异步操作/index.html","750148fcb92aece77e6459b880fc88ba"],["/categories/JavaScript/notes/标准库/index.html","b63682ffae268c5d62d7c1b359706ca9"],["/categories/JavaScript/notes/网页元素接口/index.html","e65d285bd6832b786d6233b215f78c49"],["/categories/JavaScript/notes/语法专题/index.html","66896199c0e01de7767258281e5c3dd8"],["/categories/JavaScript/notes/面向对象编程/index.html","4c99abb1d57f53958be8ca96919fc255"],["/categories/JavaScript/准备/index.html","c1feac0af7bc6f849e768c6de2ddd7fb"],["/categories/Node-js/index.html","376d615f258c0d8acb91192b3eeda731"],["/categories/Node-js/notes/Express/index.html","6c1a08b84374f5873aa33fef6b0382e8"],["/categories/Node-js/notes/MongoDB/index.html","40ff591c0b5ca31315760ede57681e84"],["/categories/Node-js/notes/Node-js应用/index.html","4860682c4231fb57bf6b9a93b193c2a8"],["/categories/Node-js/notes/Node模板引擎/index.html","1a67481952cdb26e561f822fc79d39b1"],["/categories/Node-js/notes/fs/index.html","433aa32fd07f390b5b2b7c0fb7385265"],["/categories/Node-js/notes/http/index.html","80d744a3db6b3a1083c34f3d01b88745"],["/categories/Node-js/notes/index.html","17b35d97ed12dd6cc143de7456a50b8d"],["/categories/Node-js/notes/mySql/index.html","cc78eb1ff1b72703e137fe8b4632432a"],["/categories/Node-js/notes/node-Apache应用/index.html","54307faf72b9b8ee10a9f9620cf4b642"],["/categories/Node-js/notes/page/2/index.html","89e128766c38fd35282a14b7e9406807"],["/categories/Node-js/notes/处理网站中的静态资源/index.html","f29304b773bda4c96c51f4b9c6086fe9"],["/categories/Node-js/notes/处理表单get提交/index.html","b467f7dea65c1383949175113cba41dd"],["/categories/Node-js/notes/模块系统/index.html","74c6016c7f9610cbea47191d5ba73614"],["/categories/Node-js/page/2/index.html","72524d24cb91531b3f2c28986405e42c"],["/categories/Node-js/准备/index.html","de7e403ff19aaeca983aa57332b3381f"],["/categories/Node-js/起步/index.html","08690a985785ec31e5a6fcce9bde7c18"],["/categories/TypeScript/README/index.html","0441237e5450e44136fc14889843e201"],["/categories/TypeScript/index.html","f0828570e9d35881727b3f93785b7979"],["/categories/TypeScript/notes/index.html","db0d7f8514e4c298550f36b72046e5f4"],["/categories/VUE/VUE-2/index.html","1848c67dba40fbe611eacde27eb7d5bf"],["/categories/VUE/VUE-2/notes/index.html","bf9941f152a103cc2791b6abd1ae25b8"],["/categories/VUE/VUE-2/notes/单文件组件/index.html","2a8f68a71d3a7dd88ea93d8b8a810739"],["/categories/VUE/VUE-2/notes/基本用法/index.html","abdad3c8721a078fe608d4a30e9ea018"],["/categories/VUE/VUE-2/notes/模块化相关规范/index.html","c6fdb47f6631878a717a4dd4a5ee1cee"],["/categories/VUE/VUE-2/notes/脚手架/index.html","159e41cca9e15817b214feed9e5843f7"],["/categories/VUE/VUE-2/准备/index.html","0024e4e7aef66c695a668f70046d39b0"],["/categories/VUE/VUE-3/index.html","95aca8c8fc64351f83b07dd660ec0e28"],["/categories/VUE/VUE-3/准备/index.html","6ba0e97f5ff54f1a91c83cdf5a1a3f39"],["/categories/VUE/index.html","1f8d9613928a202c3377f9e0d88a0971"],["/categories/index.html","1368504b62e46ea7d8f33371750c1851"],["/categories/webpack/README/index.html","0beefc9c9c4e67586a9f67c7c568d9ba"],["/categories/webpack/index.html","9ccc30ef20e328d080bf8bc079d8d5f2"],["/categories/宝藏网站/index.html","81de2a31a0a4c9a4496665d316d7052e"],["/css/index.css","38655570dd3f36ba17f5f20107b9603f"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["/img/alipay.jpg","af9cede49ac9ca841b1d4b059eda1e3a"],["/img/avatar_img.jpg","5c0a9e24b43f214d7c44c78eb9393094"],["/img/default_top_img.jpg","44c828e416f2545784f68b433de1b9e9"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/icp.png","6e26aed5ced63bc60524cc736611d39e"],["/img/index_img.jpg","a8826bf9b85b0dc59ff867165c19a6d1"],["/img/loading.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["/img/posts_cover/helloworld.jpg","0a0d287b3994571dd723eae3b33eec57"],["/img/pwa/16.png","4eaa84c84e0838ed533b6f68a09f3bc5"],["/img/pwa/32.png","9f8cdbb4dcbd0527fca1acac463cbfd5"],["/img/pwa/pwaicons/36.png","9f54ab021489940a358cb069f38c88d2"],["/img/pwa/pwaicons/512.png","8d08430b3ff28c94970dd950fd5b2eda"],["/img/wechat.jpg","27a8665b4633cb87fcab251cf8ef73c5"],["/index.html","53902389fa013dd46e04e1413b650602"],["/js/main.js","9ae2856869433ab1770b105c639b7710"],["/js/search/algolia.js","d50c62e5d368a89a795f652e8600dd8f"],["/js/search/local-search.js","271777e2b46e5743942ca9ac31baff15"],["/js/third-party/ClickShowText.js","22f4c82da4faed04c79e61fcbbdf675c"],["/js/third-party/activate-power-mode.js","e8455f75769585811cd6b3220787d08e"],["/js/third-party/canvas-nest.js","bb643bd9c2ac59f6ce2a1251b8014624"],["/js/third-party/canvas-ribbon.js","f6cac3572847858e5b8edb3e6894f5ad"],["/js/third-party/click_heart.js","c2420dfec66aa5bad663e6c365a129c8"],["/js/third-party/fireworks.js","080fdfcacffc6828826484645140af50"],["/js/third-party/piao.js","6df6ba5f90c4dff026fc3eea73933e8b"],["/js/tw_cn.js","de2abf47a3e2ff88c167a78a3256a0cd"],["/js/utils.js","fcbf12c4fd30e2c08400527366b20acc"],["/link/index.html","7d727de812a930c94fcaed9ca4446e69"],["/page/2/index.html","1488246b2bb4c95d18d57c0acc84f596"],["/page/3/index.html","8b7adc492d762fd4cb627c01574cc3be"],["/page/4/index.html","8f0a79c472a71b99f86f216ba73ebdc2"],["/tags/CSS/index.html","d9cfce78fa62169ddde8422b19a356e3"],["/tags/Front-End/index.html","50d91ff0be1cecaa61f7314face54e24"],["/tags/Git/index.html","4fe21569c153f9fc27eb588b03b1cf3a"],["/tags/Github/index.html","39330db3833f75c8191295fdd56a4a90"],["/tags/HEXO/index.html","f1f8983988cf46ca9ef8554fb6c299a4"],["/tags/JavaScript/index.html","cd177e64a5f629bc5c63f804aab11e07"],["/tags/Node-js/index.html","92e3c911908b074b0ec56018bc107d0f"],["/tags/Node-js/page/2/index.html","08a0672c74a566a32bc01e8d1fc74cd4"],["/tags/TypeScript/index.html","230beb1903e8fab7c207c21d89836cde"],["/tags/VUE-2/index.html","fb4d90d481d2fcab3ed01edd9d7f72f3"],["/tags/VUE-3/index.html","2856211da18b3b8f52a94b9809b0439a"],["/tags/VUE/index.html","52077d79782fc84eb243aa92f39dde73"],["/tags/hello/index.html","92d0d120a33af7e65e2794a94bdabeac"],["/tags/index.html","b4f0be6b8d2e2d9e0f71154829005a0f"],["/tags/webpack/index.html","e6152db69fe6d75e2ce0d59199514344"],["/tags/world/index.html","8a4ab529e6f0b9caf0ce7d695d0135f8"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"your_websie_url"});




