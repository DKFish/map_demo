define(["./when"],function(i){"use strict";return function(s){var a;return function(e){var r=e.data,n=[],t={id:r.id,result:void 0,error:void 0};return i.when(function(e,r,n){try{return e(r,n)}catch(e){return i.when.reject(e)}}(s,r.parameters,n)).then(function(e){t.result=e}).otherwise(function(e){e instanceof Error?t.error={name:e.name,message:e.message,stack:e.stack}:t.error=e}).always(function(){i.defined(a)||(a=i.defaultValue(self.webkitPostMessage,self.postMessage)),r.canTransferArrayBuffer||(n.length=0);try{a(t,n)}catch(e){t.result=void 0,t.error="postMessage failed with error: "+function(e){var r,n=e.name,t=e.message;r=i.defined(n)&&i.defined(t)?n+": "+t:e.toString();var s=e.stack;return i.defined(s)&&(r+="\n"+s),r}(e)+"\n  with responseMessage: "+JSON.stringify(t),a(t)}})}}});
