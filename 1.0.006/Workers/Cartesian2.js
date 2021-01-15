define(["exports","./when","./Check","./Math"],function(e,B,i,R){"use strict";function O(e,n,t){this.x=B.defaultValue(e,0),this.y=B.defaultValue(n,0),this.z=B.defaultValue(t,0)}O.fromSpherical=function(e,n){B.defined(n)||(n=new O);var t=e.clock,r=e.cone,a=B.defaultValue(e.magnitude,1),i=a*Math.sin(r);return n.x=i*Math.cos(t),n.y=i*Math.sin(t),n.z=a*Math.cos(r),n},O.fromElements=function(e,n,t,r){return B.defined(r)?(r.x=e,r.y=n,r.z=t,r):new O(e,n,t)},O.fromCartesian4=O.clone=function(e,n){if(B.defined(e))return B.defined(n)?(n.x=e.x,n.y=e.y,n.z=e.z,n):new O(e.x,e.y,e.z)},O.packedLength=3,O.pack=function(e,n,t){return t=B.defaultValue(t,0),n[t++]=e.x,n[t++]=e.y,n[t]=e.z,n},O.unpack=function(e,n,t){return n=B.defaultValue(n,0),B.defined(t)||(t=new O),t.x=e[n++],t.y=e[n++],t.z=e[n],t},O.packArray=function(e,n){var t=e.length,r=3*t;if(B.defined(n)){if(!Array.isArray(n)&&n.length!==r)throw new i.DeveloperError("If result is a typed array, it must have exactly array.length * 3 elements");n.length!==r&&(n.length=r)}else n=new Array(r);for(var a=0;a<t;++a)O.pack(e[a],n,3*a);return n},O.unpackArray=function(e,n){var t=e.length;B.defined(n)?n.length=t/3:n=new Array(t/3);for(var r=0;r<t;r+=3){var a=r/3;n[a]=O.unpack(e,r,n[a])}return n},O.fromArray=O.unpack,O.maximumComponent=function(e){return Math.max(e.x,e.y,e.z)},O.minimumComponent=function(e){return Math.min(e.x,e.y,e.z)},O.minimumByComponent=function(e,n,t){return t.x=Math.min(e.x,n.x),t.y=Math.min(e.y,n.y),t.z=Math.min(e.z,n.z),t},O.maximumByComponent=function(e,n,t){return t.x=Math.max(e.x,n.x),t.y=Math.max(e.y,n.y),t.z=Math.max(e.z,n.z),t},O.magnitudeSquared=function(e){return e.x*e.x+e.y*e.y+e.z*e.z},O.magnitude=function(e){return Math.sqrt(O.magnitudeSquared(e))};var t=new O;O.distance=function(e,n){return O.subtract(e,n,t),O.magnitude(t)},O.distanceSquared=function(e,n){return O.subtract(e,n,t),O.magnitudeSquared(t)},O.normalize=function(e,n){var t=O.magnitude(e);return 0===t?(n.x=0,n.y=0,n.z=0):(n.x=e.x/t,n.y=e.y/t,n.z=e.z/t),n},O.dot=function(e,n){return e.x*n.x+e.y*n.y+e.z*n.z},O.multiplyComponents=function(e,n,t){return t.x=e.x*n.x,t.y=e.y*n.y,t.z=e.z*n.z,t},O.divideComponents=function(e,n,t){return t.x=e.x/n.x,t.y=e.y/n.y,t.z=e.z/n.z,t},O.add=function(e,n,t){return t.x=e.x+n.x,t.y=e.y+n.y,t.z=e.z+n.z,t},O.subtract=function(e,n,t){return t.x=e.x-n.x,t.y=e.y-n.y,t.z=e.z-n.z,t},O.multiplyByScalar=function(e,n,t){return t.x=e.x*n,t.y=e.y*n,t.z=e.z*n,t},O.divideByScalar=function(e,n,t){return t.x=e.x/n,t.y=e.y/n,t.z=e.z/n,t},O.negate=function(e,n){return n.x=-e.x,n.y=-e.y,n.z=-e.z,n},O.abs=function(e,n){return n.x=Math.abs(e.x),n.y=Math.abs(e.y),n.z=Math.abs(e.z),n};var a=new O;O.lerp=function(e,n,t,r){return O.multiplyByScalar(n,t,a),r=O.multiplyByScalar(e,1-t,r),O.add(a,r,r)};var u=new O,o=new O;O.angleBetween=function(e,n){O.normalize(e,u),O.normalize(n,o);var t=O.dot(u,o),r=O.magnitude(O.cross(u,o,u));return Math.atan2(r,t)};var r=new O;O.mostOrthogonalAxis=function(e,n){var t=O.normalize(e,r);return O.abs(t,t),n=t.x<=t.y?t.x<=t.z?O.clone(O.UNIT_X,n):O.clone(O.UNIT_Z,n):t.y<=t.z?O.clone(O.UNIT_Y,n):O.clone(O.UNIT_Z,n)},O.projectVector=function(e,n,t){var r=O.dot(e,n)/O.dot(n,n);return O.multiplyByScalar(n,r,t)},O.equals=function(e,n){return e===n||B.defined(e)&&B.defined(n)&&e.x===n.x&&e.y===n.y&&e.z===n.z},O.equalsArray=function(e,n,t){return e.x===n[t]&&e.y===n[t+1]&&e.z===n[t+2]},O.equalsEpsilon=function(e,n,t,r){return e===n||B.defined(e)&&B.defined(n)&&R.CesiumMath.equalsEpsilon(e.x,n.x,t,r)&&R.CesiumMath.equalsEpsilon(e.y,n.y,t,r)&&R.CesiumMath.equalsEpsilon(e.z,n.z,t,r)},O.cross=function(e,n,t){var r=e.x,a=e.y,i=e.z,u=n.x,o=n.y,d=n.z,l=a*d-i*o,f=i*u-r*d,y=r*o-a*u;return t.x=l,t.y=f,t.z=y,t},O.midpoint=function(e,n,t){return t.x=.5*(e.x+n.x),t.y=.5*(e.y+n.y),t.z=.5*(e.z+n.z),t},O.fromDegrees=function(e,n,t,r,a){return e=R.CesiumMath.toRadians(e),n=R.CesiumMath.toRadians(n),O.fromRadians(e,n,t,r,a)};var d=new O,l=new O,f=new O(40680631590769,40680631590769,40408299984661.445);O.fromRadians=function(e,n,t,r,a){t=B.defaultValue(t,0);var i=B.defined(r)?r.radiiSquared:f,u=Math.cos(n);d.x=u*Math.cos(e),d.y=u*Math.sin(e),d.z=Math.sin(n),d=O.normalize(d,d),O.multiplyComponents(i,d,l);var o=Math.sqrt(O.dot(d,l));return l=O.divideByScalar(l,o,l),d=O.multiplyByScalar(d,t,d),B.defined(a)||(a=new O),O.add(l,d,a)},O.fromDegreesArray=function(e,n,t){var r=e.length;B.defined(t)?t.length=r/2:t=new Array(r/2);for(var a=0;a<r;a+=2){var i=e[a],u=e[a+1],o=a/2;t[o]=O.fromDegrees(i,u,0,n,t[o])}return t},O.fromRadiansArray=function(e,n,t){var r=e.length;B.defined(t)?t.length=r/2:t=new Array(r/2);for(var a=0;a<r;a+=2){var i=e[a],u=e[a+1],o=a/2;t[o]=O.fromRadians(i,u,0,n,t[o])}return t},O.fromDegreesArrayHeights=function(e,n,t){var r=e.length;B.defined(t)?t.length=r/3:t=new Array(r/3);for(var a=0;a<r;a+=3){var i=e[a],u=e[a+1],o=e[a+2],d=a/3;t[d]=O.fromDegrees(i,u,o,n,t[d])}return t},O.fromRadiansArrayHeights=function(e,n,t){var r=e.length;B.defined(t)?t.length=r/3:t=new Array(r/3);for(var a=0;a<r;a+=3){var i=e[a],u=e[a+1],o=e[a+2],d=a/3;t[d]=O.fromRadians(i,u,o,n,t[d])}return t},O.ZERO=Object.freeze(new O(0,0,0)),O.UNIT_X=Object.freeze(new O(1,0,0)),O.UNIT_Y=Object.freeze(new O(0,1,0)),O.UNIT_Z=Object.freeze(new O(0,0,1)),O.prototype.clone=function(e){return O.clone(this,e)},O.prototype.equals=function(e){return O.equals(this,e)},O.prototype.equalsEpsilon=function(e,n,t){return O.equalsEpsilon(this,e,n,t)},O.prototype.toString=function(){return"("+this.x+", "+this.y+", "+this.z+")"};var V=new O,I=new O;function y(e,n,t,r,a){var i=e.x,u=e.y,o=e.z,d=n.x,l=n.y,f=n.z,y=i*i*d*d,c=u*u*l*l,s=o*o*f*f,m=y+c+s,h=Math.sqrt(1/m),x=O.multiplyByScalar(e,h,V);if(m<r)return isFinite(h)?O.clone(x,a):void 0;var p=t.x,g=t.y,z=t.z,v=I;v.x=x.x*p*2,v.y=x.y*g*2,v.z=x.z*z*2;var w,M,q,C,S,b,A,E=(1-h)*O.magnitude(e)/(.5*O.magnitude(v)),k=0;do{k=(w=y*(S=(M=1/(1+(E-=k)*p))*M)+c*(b=(q=1/(1+E*g))*q)+s*(A=(C=1/(1+E*z))*C)-1)/(-2*(y*(S*M)*p+c*(b*q)*g+s*(A*C)*z))}while(Math.abs(w)>R.CesiumMath.EPSILON12);return B.defined(a)?(a.x=i*M,a.y=u*q,a.z=o*C,a):new O(i*M,u*q,o*C)}function c(e,n,t){this.longitude=B.defaultValue(e,0),this.latitude=B.defaultValue(n,0),this.height=B.defaultValue(t,0)}c.fromRadians=function(e,n,t,r){return t=B.defaultValue(t,0),B.defined(r)?(r.longitude=e,r.latitude=n,r.height=t,r):new c(e,n,t)},c.fromDegrees=function(e,n,t,r){return e=R.CesiumMath.toRadians(e),n=R.CesiumMath.toRadians(n),c.fromRadians(e,n,t,r)};var s=new O,m=new O,h=new O,x=new O(1/6378137,1/6378137,1/6356752.314245179),p=new O(1/40680631590769,1/40680631590769,1/40408299984661.445),g=R.CesiumMath.EPSILON1;function z(e,n){this.x=B.defaultValue(e,0),this.y=B.defaultValue(n,0)}c.fromCartesian=function(e,n,t){var r=B.defined(n)?n.oneOverRadii:x,a=B.defined(n)?n.oneOverRadiiSquared:p,i=y(e,r,a,B.defined(n)?n._centerToleranceSquared:g,m);if(B.defined(i)){var u=O.multiplyComponents(i,a,s);u=O.normalize(u,u);var o=O.subtract(e,i,h),d=Math.atan2(u.y,u.x),l=Math.asin(u.z),f=R.CesiumMath.sign(O.dot(o,e))*O.magnitude(o);return B.defined(t)?(t.longitude=d,t.latitude=l,t.height=f,t):new c(d,l,f)}},c.toCartesian=function(e,n,t){return O.fromRadians(e.longitude,e.latitude,e.height,n,t)},c.clone=function(e,n){if(B.defined(e))return B.defined(n)?(n.longitude=e.longitude,n.latitude=e.latitude,n.height=e.height,n):new c(e.longitude,e.latitude,e.height)},c.equals=function(e,n){return e===n||B.defined(e)&&B.defined(n)&&e.longitude===n.longitude&&e.latitude===n.latitude&&e.height===n.height},c.equalsEpsilon=function(e,n,t){return t=B.defaultValue(t,0),e===n||B.defined(e)&&B.defined(n)&&Math.abs(e.longitude-n.longitude)<=t&&Math.abs(e.latitude-n.latitude)<=t&&Math.abs(e.height-n.height)<=t},c.ZERO=Object.freeze(new c(0,0,0)),c.prototype.clone=function(e){return c.clone(this,e)},c.prototype.equals=function(e){return c.equals(this,e)},c.prototype.equalsEpsilon=function(e,n){return c.equalsEpsilon(this,e,n)},c.prototype.toString=function(){return"("+this.longitude+", "+this.latitude+", "+this.height+")"},z.fromElements=function(e,n,t){return B.defined(t)?(t.x=e,t.y=n,t):new z(e,n)},z.fromCartesian3=z.clone=function(e,n){if(B.defined(e))return B.defined(n)?(n.x=e.x,n.y=e.y,n):new z(e.x,e.y)},z.fromCartesian4=z.clone,z.packedLength=2,z.pack=function(e,n,t){return t=B.defaultValue(t,0),n[t++]=e.x,n[t]=e.y,n},z.unpack=function(e,n,t){return n=B.defaultValue(n,0),B.defined(t)||(t=new z),t.x=e[n++],t.y=e[n],t},z.packArray=function(e,n){var t=e.length,r=2*t;if(B.defined(n)){if(!Array.isArray(n)&&n.length!==r)throw new i.DeveloperError("If result is a typed array, it must have exactly array.length * 2 elements");n.length!==r&&(n.length=r)}else n=new Array(r);for(var a=0;a<t;++a)z.pack(e[a],n,2*a);return n},z.unpackArray=function(e,n){var t=e.length;B.defined(n)?n.length=t/2:n=new Array(t/2);for(var r=0;r<t;r+=2){var a=r/2;n[a]=z.unpack(e,r,n[a])}return n},z.fromArray=z.unpack,z.maximumComponent=function(e){return Math.max(e.x,e.y)},z.minimumComponent=function(e){return Math.min(e.x,e.y)},z.minimumByComponent=function(e,n,t){return t.x=Math.min(e.x,n.x),t.y=Math.min(e.y,n.y),t},z.maximumByComponent=function(e,n,t){return t.x=Math.max(e.x,n.x),t.y=Math.max(e.y,n.y),t},z.magnitudeSquared=function(e){return e.x*e.x+e.y*e.y},z.magnitude=function(e){return Math.sqrt(z.magnitudeSquared(e))};var v=new z;z.distance=function(e,n){return z.subtract(e,n,v),z.magnitude(v)},z.distanceSquared=function(e,n){return z.subtract(e,n,v),z.magnitudeSquared(v)},z.normalize=function(e,n){var t=z.magnitude(e);return n.x=e.x/t,n.y=e.y/t,n},z.dot=function(e,n){return e.x*n.x+e.y*n.y},z.multiplyComponents=function(e,n,t){return t.x=e.x*n.x,t.y=e.y*n.y,t},z.divideComponents=function(e,n,t){return t.x=e.x/n.x,t.y=e.y/n.y,t},z.add=function(e,n,t){return t.x=e.x+n.x,t.y=e.y+n.y,t},z.subtract=function(e,n,t){return t.x=e.x-n.x,t.y=e.y-n.y,t},z.multiplyByScalar=function(e,n,t){return t.x=e.x*n,t.y=e.y*n,t},z.divideByScalar=function(e,n,t){return t.x=e.x/n,t.y=e.y/n,t},z.negate=function(e,n){return n.x=-e.x,n.y=-e.y,n},z.abs=function(e,n){return n.x=Math.abs(e.x),n.y=Math.abs(e.y),n};var w=new z;z.lerp=function(e,n,t,r){return z.multiplyByScalar(n,t,w),r=z.multiplyByScalar(e,1-t,r),z.add(w,r,r)};var M=new z,q=new z;z.angleBetween=function(e,n){return z.normalize(e,M),z.normalize(n,q),R.CesiumMath.acosClamped(z.dot(M,q))};var C=new z;z.mostOrthogonalAxis=function(e,n){var t=z.normalize(e,C);return z.abs(t,t),n=t.x<=t.y?z.clone(z.UNIT_X,n):z.clone(z.UNIT_Y,n)},z.equals=function(e,n){return e===n||B.defined(e)&&B.defined(n)&&e.x===n.x&&e.y===n.y},z.equalsArray=function(e,n,t){return e.x===n[t]&&e.y===n[t+1]},z.equalsEpsilon=function(e,n,t,r){return e===n||B.defined(e)&&B.defined(n)&&R.CesiumMath.equalsEpsilon(e.x,n.x,t,r)&&R.CesiumMath.equalsEpsilon(e.y,n.y,t,r)},z.ZERO=Object.freeze(new z(0,0)),z.UNIT_X=Object.freeze(new z(1,0)),z.UNIT_Y=Object.freeze(new z(0,1)),z.prototype.clone=function(e){return z.clone(this,e)},z.prototype.equals=function(e){return z.equals(this,e)},z.prototype.equalsEpsilon=function(e,n,t){return z.equalsEpsilon(this,e,n,t)},z.prototype.toString=function(){return"("+this.x+", "+this.y+")"},e.Cartesian2=z,e.Cartesian3=O,e.Cartographic=c,e.scaleToGeodeticSurface=y});
