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

var precacheConfig = [["2020/04/09/node-README/index.html","6c731a734e4ac6714b27dffcf3bcc5a3"],["2020/04/09/node-http/index.html","4197255c85d78778be96cd9d58a666cc"],["2020/04/09/node-start/index.html","13534fa2b805ee7e502a57b9fbdbae33"],["2020/04/09/node-文件操作/index.html","192247e380ff9a54ec193a184466d2f8"],["2020/04/10/node-Apache目录列表(模板引擎)/index.html","54e13a76117419fc9886d58d5082ddb0"],["2020/04/10/node-Node中使用模板引擎/index.html","cd1e92682d0d1f448cd2748fed383435"],["2020/04/10/node-处理网站中的静态资源/index.html","05891e3fb277cc2e75bbc1dcdaf4ed8f"],["2020/04/10/node-处理表单get提交/index.html","c886ef88ba0f2d99c37e33ed9b081cce"],["2020/04/11/js-基本语法+数据类型+运算符/index.html","3cdb6ce866497cae4940e237a6bfe86c"],["2020/04/11/node-Express/index.html","5a8fe6a296d9908348a627a7c685361e"],["2020/04/11/node-模块系统/index.html","b497be02ba5000560a566f14647af651"],["2020/04/13/ts-README/index.html","4f7913e70134cc3d0f6c992b6a7007df"],["2020/04/13/ts-变量与数据类型/index.html","81e69aa79e2a9a5effe9e95effaef0e6"],["2020/04/14/node-MongoDB/index.html","15ab78847bc5c8616dbc56003747e415"],["2020/04/14/node-mySql/index.html","396061a19fdeca1aef3de5e3c07e563b"],["2020/04/15/node-综合案例/index.html","c3fd08664a06d42a1923bcc0691471bf"],["2020/04/16/vue-README/index.html","3802967df1ff31e2f97a129728607971"],["2020/04/20/vue-Vue单文件组件/index.html","8a4d75d9990942a1e48fb5b88104a0bb"],["2020/04/20/vue-模块化相关规范/index.html","e0ebcef21be4e4ea2716fbb7d899be80"],["2020/04/20/vue-脚手架/index.html","b6e669aa627524723c7a1de45762e39d"],["2020/04/20/webpack-README/index.html","5633ab7d840db704a233849851837c93"],["2020/04/21/vue-vue3.0/index.html","9996797439d12bc343fe08ede19a069c"],["2020/04/21/vue-基本用法/index.html","62553055198f819bbeb7671824685187"],["2020/04/23/js-BOM模型/index.html","22e5c0c184e2da8f3c8bb96e1c28262e"],["2020/04/23/js-DOM模型/index.html","6f2d584620bd3030f7469cb9280deb72"],["2020/04/23/js-导论/index.html","1ee2db45bafeb588dd505ae7b88a7c16"],["2020/04/23/js-异步操作/index.html","1e2174546acdd8b0c4d91d06a190a55d"],["2020/04/23/js-标准库/index.html","add33e564261ed9042c95ad2c9a1ff64"],["2020/04/23/js-面向对象编程/index.html","b3eb295f5e005cc7428d4dc4c8a02740"],["2020/04/24/js-语法专题/index.html","4280fe36e01ed14f1bb1da9468ebd131"],["2020/05/06/js-事件/index.html","9b741443d7aadb0abf76285366b9ba90"],["2020/05/06/js-附录：网页元素接口/index.html","62d7f6673450621a2b4c2f4e3f5dd0f0"],["2020/05/07/hexo-start/index.html","bed16a5256dbfb8c8f14e5cfd6eedf31"],["2020/05/11/hello-world/index.html","e20c24edc73dc61eb369d9fc7b30ea0a"],["archives/2020/04/index.html","dd08341b887a3436070691e040b9b47d"],["archives/2020/04/page/2/index.html","ab6dc5096a3d4479a00bc2c6c3037cfa"],["archives/2020/04/page/3/index.html","e043634304b48eed375650b3e76045aa"],["archives/2020/05/index.html","26d21679c94146bde9d0270bbfbcf32a"],["archives/2020/index.html","7ce57c7c51307816f469e950b9e2634a"],["archives/2020/page/2/index.html","b55747b509f0551304df6f2d847038b6"],["archives/2020/page/3/index.html","ee84e91ae8e3db12f301305bdaba85ca"],["archives/2020/page/4/index.html","0b1c5520d73a4f837dc5e4c4d02cbf56"],["archives/index.html","947c4f32ca3ed0cb07848a1315e141c3"],["archives/page/2/index.html","b8d425be37f6a31d9780f3fb5871b82e"],["archives/page/3/index.html","551b6b097f792dc46731477e83510a23"],["archives/page/4/index.html","c4f6f3323bed7b55dcd064f941f5af94"],["assets/algolia/algoliasearch.js","d5d2500bfe8443b42baaefe4996ee532"],["assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["assets/algolia/algoliasearchLite.js","ce9b0e62645c036a143f639b92e7789f"],["assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["categories/HEXO/START/index.html","d1ea44197a4ba13dd2c994f0b47136b1"],["categories/HEXO/hello-world/index.html","3c94e37bac8fb149e1bfc527fb848f8b"],["categories/HEXO/index.html","d4e57c9e00416e571a9915f84e040f01"],["categories/JavaScript/index.html","39a286969a905572bdb0e4b07cc88f62"],["categories/JavaScript/notes/BOM/index.html","546ad11bcafb2eabd240e58e6891da3b"],["categories/JavaScript/notes/DOM/index.html","5de17935b0bc511585c051b83c011273"],["categories/JavaScript/notes/index.html","b01df5d809912e5db58ad7d8dba96933"],["categories/JavaScript/notes/事件/index.html","f9ce10f82089fbefecadbc5eef6efb2a"],["categories/JavaScript/notes/基本语法、数据类型、运算符/index.html","9b23206582d4d98874f1a712ec972238"],["categories/JavaScript/notes/异步操作/index.html","cedd96e9e7ccaa5e0f6b2a0fcd409f25"],["categories/JavaScript/notes/标准库/index.html","dbe792d8ed436d485c1b8c15ba2c1c76"],["categories/JavaScript/notes/网页元素接口/index.html","e02f771e418571298294f0a1ed1b561e"],["categories/JavaScript/notes/语法专题/index.html","8e840f0a2490b5cb1e4d2c8117e8a7d3"],["categories/JavaScript/notes/面向对象编程/index.html","806b62594cd9672a09fe37455f329d05"],["categories/JavaScript/准备/index.html","683e6435bc93774a0052aef444d77b55"],["categories/Node-js/index.html","383d361a18187bf2ff078110abadaf8a"],["categories/Node-js/notes/Express/index.html","1111f0b780c455db59f0e06309b7ff07"],["categories/Node-js/notes/MongoDB/index.html","6546731b9c46ffcfba3ba69c9db0b5a0"],["categories/Node-js/notes/Node-js应用/index.html","7987c3d848fb0b921666bfad747cbac5"],["categories/Node-js/notes/Node模板引擎/index.html","5543b12c31d9fb16acaace4491ef76cf"],["categories/Node-js/notes/fs/index.html","234aefb918ed18c30a548029b2e3474e"],["categories/Node-js/notes/http/index.html","b4bd3e5a05ce82e702cc8722f29cdde3"],["categories/Node-js/notes/index.html","c4b3eefef722a1ac52f363af8614a023"],["categories/Node-js/notes/mySql/index.html","2d2be3eedaacb31f2cf3af502139f9db"],["categories/Node-js/notes/node-Apache应用/index.html","ecddc48de5ddba095426c0be3fd160f6"],["categories/Node-js/notes/page/2/index.html","2ad794e4945a940a109612e6d208e82f"],["categories/Node-js/notes/处理网站中的静态资源/index.html","8928d17918e5a74813072c189494159b"],["categories/Node-js/notes/处理表单get提交/index.html","e3cff1b4f3c62f5a82b686ee9c88b5b9"],["categories/Node-js/notes/模块系统/index.html","fe560965657e6694822de0b7d68d16f4"],["categories/Node-js/page/2/index.html","969e50d76e440088c7349dbc7ef0e196"],["categories/Node-js/准备/index.html","855d8446bb7e859d4d7eedff948892ce"],["categories/Node-js/起步/index.html","453679fc5cafaebe716b62f67571c7cf"],["categories/TypeScript/README/index.html","c19114bc726f7b492b13fa51ac18af35"],["categories/TypeScript/index.html","c64ec09a805e4888e4c3db2df2352169"],["categories/TypeScript/notes/index.html","f813174caf9e8ce6bdfe435b736438bc"],["categories/VUE/VUE-2/index.html","3b65d0727705d274b70df74134e68282"],["categories/VUE/VUE-2/notes/index.html","18a67de58bd38de79ec9bac641e060d8"],["categories/VUE/VUE-2/notes/单文件组件/index.html","e6fe392b8b88626b4bc0280626ab54a6"],["categories/VUE/VUE-2/notes/基本用法/index.html","5ab89ac29c30819c4e1af17197ae7f35"],["categories/VUE/VUE-2/notes/模块化相关规范/index.html","435b41bff4288747aca24732077f1e98"],["categories/VUE/VUE-2/notes/脚手架/index.html","bfcd16dc4dfebba8fce46c46654511cc"],["categories/VUE/VUE-2/准备/index.html","fe3897273c1cbe7a8541e9bf09602225"],["categories/VUE/VUE-3/index.html","d9506f41f9fccb38daacd849f9039b67"],["categories/VUE/VUE-3/准备/index.html","1bfb4b2d71a855d74b2be3f8269a605a"],["categories/VUE/index.html","0cd535d3780b494e64cff0b819e7ada8"],["categories/index.html","33b5869d8b7eb76d36ae5af7fdab8875"],["categories/webpack/README/index.html","71b657c477a6d0dc4d6321e92ced9c83"],["categories/webpack/index.html","234d7773c23f4002469fc825c8f220ce"],["css/index.css","38655570dd3f36ba17f5f20107b9603f"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["img/alipay.jpg","af9cede49ac9ca841b1d4b059eda1e3a"],["img/avatar_img.jpg","5c0a9e24b43f214d7c44c78eb9393094"],["img/default_top_img.jpg","44c828e416f2545784f68b433de1b9e9"],["img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["img/icp.png","6e26aed5ced63bc60524cc736611d39e"],["img/index_img.jpg","a8826bf9b85b0dc59ff867165c19a6d1"],["img/loading.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["img/posts_cover/helloworld.jpg","0a0d287b3994571dd723eae3b33eec57"],["img/pwa/16.png","4eaa84c84e0838ed533b6f68a09f3bc5"],["img/pwa/32.png","9f8cdbb4dcbd0527fca1acac463cbfd5"],["img/pwa/pwaicons/36.png","9f54ab021489940a358cb069f38c88d2"],["img/pwa/pwaicons/512.png","8d08430b3ff28c94970dd950fd5b2eda"],["img/wechat.jpg","27a8665b4633cb87fcab251cf8ef73c5"],["index.html","3d48aafbf3191a4396101a19666df462"],["js/main.js","9ae2856869433ab1770b105c639b7710"],["js/search/algolia.js","d50c62e5d368a89a795f652e8600dd8f"],["js/search/local-search.js","271777e2b46e5743942ca9ac31baff15"],["js/third-party/ClickShowText.js","22f4c82da4faed04c79e61fcbbdf675c"],["js/third-party/activate-power-mode.js","e8455f75769585811cd6b3220787d08e"],["js/third-party/canvas-nest.js","bb643bd9c2ac59f6ce2a1251b8014624"],["js/third-party/canvas-ribbon.js","f6cac3572847858e5b8edb3e6894f5ad"],["js/third-party/click_heart.js","c2420dfec66aa5bad663e6c365a129c8"],["js/third-party/fireworks.js","080fdfcacffc6828826484645140af50"],["js/third-party/piao.js","6df6ba5f90c4dff026fc3eea73933e8b"],["js/tw_cn.js","de2abf47a3e2ff88c167a78a3256a0cd"],["js/utils.js","fcbf12c4fd30e2c08400527366b20acc"],["link/index.html","c113689e28319885906f1fd33e80d14b"],["page/2/index.html","d74d08595205d98399f5e1526a6202b4"],["page/3/index.html","f5f8f87ead5ff06b4a484a730b71433b"],["page/4/index.html","427e8282e35a8ed81363f971ed423214"],["tags/HEXO/index.html","2acea96abe83d9a0152adea07673e58b"],["tags/JavaScript/index.html","f11835d984d3f33e9c92a6140f98e6af"],["tags/Node-js/index.html","62007d344631014eb594b35956907b52"],["tags/Node-js/page/2/index.html","911c3d04de36790fe2d0c08778368a76"],["tags/TypeScript/index.html","ad092044bea3159b7e34e67a185a87b4"],["tags/VUE-2/index.html","e19e4b767e671ebafa8f0e92564bedd4"],["tags/VUE-3/index.html","0a5415e638c6cdb5436b360afb37be80"],["tags/VUE/index.html","6baf62d3fd6768b34987d9653d0be950"],["tags/hello/index.html","637fdef9ead8cd2690f97a2003252a0a"],["tags/index.html","aabc6dbf498122e5be82ad81a32aacfc"],["tags/webpack/index.html","9db94304d00b5e65658abfbb1ec3a272"],["tags/world/index.html","1ebb24c565f57a32d3ff20e660b8f9e5"]];
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







