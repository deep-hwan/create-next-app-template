if(!self.define){let e,s={};const i=(i,c)=>(i=new URL(i+".js",c).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(c,n)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let r={};const o=e=>i(e,a),t={module:{uri:a},exports:r,require:o};s[a]=Promise.all(c.map((e=>t[e]||o(e)))).then((e=>(n(...e),r)))}}define(["./workbox-2f7b0673"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/UrQM4BYtHGP3WikaEOdvO/_buildManifest.js",revision:"584547346761d76faa57c1ad35ff94b1"},{url:"/_next/static/UrQM4BYtHGP3WikaEOdvO/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/156-272f5b7fac7bd57c.js",revision:"272f5b7fac7bd57c"},{url:"/_next/static/chunks/249.84d1a3fa9f3db97d.js",revision:"84d1a3fa9f3db97d"},{url:"/_next/static/chunks/698.6343bfd066c936de.js",revision:"6343bfd066c936de"},{url:"/_next/static/chunks/962-966bf2a75875d6fb.js",revision:"966bf2a75875d6fb"},{url:"/_next/static/chunks/framework-305cb810cde7afac.js",revision:"305cb810cde7afac"},{url:"/_next/static/chunks/main-4c59af365b97705f.js",revision:"4c59af365b97705f"},{url:"/_next/static/chunks/pages/404-61c35be490a2070d.js",revision:"61c35be490a2070d"},{url:"/_next/static/chunks/pages/_app-911371a421888894.js",revision:"911371a421888894"},{url:"/_next/static/chunks/pages/_error-4afcb85b7c260fd3.js",revision:"4afcb85b7c260fd3"},{url:"/_next/static/chunks/pages/index-8659e698de7b775b.js",revision:"8659e698de7b775b"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-2c6fe23605946801.js",revision:"2c6fe23605946801"},{url:"/_next/static/css/109f7f1f93894f3c.css",revision:"109f7f1f93894f3c"},{url:"/favicon.ico",revision:"6162576462aab18c0e1e30233d4b6351"},{url:"/icons/back-icon.svg",revision:"1f3f4353f3a2177d9c49544236e9e40a"},{url:"/icons/cancel-icon.svg",revision:"5ab1fe368582d59f3d56923b82e110bf"},{url:"/icons/copy-icon.svg",revision:"8ead5fd775a561593f2131cef2c483fc"},{url:"/icons/direct-icon.svg",revision:"080deff9613a94979a552134214dea10"},{url:"/icons/home-icon.svg",revision:"b41093803a29875403286efb00df92e5"},{url:"/icons/message-icon.svg",revision:"fccfe58fb64245cc86e48cb71632401e"},{url:"/icons/path-icon.svg",revision:"1ad8879de23df81fc96e807355acdc07"},{url:"/icons/profile-icon.svg",revision:"b0b3f10a6801d2fbc7d4bdc102ab0d6f"},{url:"/icons/setting-icon.svg",revision:"1b5aa914f850fbd216bb96e5846862d6"},{url:"/icons/toast-icon.svg",revision:"6e670ba958937053e9f8189b40e6c745"},{url:"/images/logo-192.png",revision:"b2a1799ee7f9f499bf3fb5beebd55060"},{url:"/images/logo-384.png",revision:"12247aae3bc006929ecf6b64fa8487f9"},{url:"/images/logo-512.png",revision:"711e651c19ab9c821a8d155ec8c30b2b"},{url:"/images/logo.svg",revision:"1201a0610200ca8e77d5747e27678634"},{url:"/images/widgets-img.png",revision:"36d27be7a6e8cd5606c8c63c4acbbd18"},{url:"/manifest.json",revision:"3a2f247b3be6ec1fc1c83f0afa686c05"},{url:"/robots.txt",revision:"504dc4b0f980ee8216a4972e0784ecb2"},{url:"/seo.config.tsx",revision:"0081373e266770188bd888c641f981a3"},{url:"/sitemap-0.xml",revision:"993ed810b63ecaf137fb7e6ae1074277"},{url:"/sitemap.xml",revision:"241e630e12bac713e4b546acd1ba208c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET")}));
