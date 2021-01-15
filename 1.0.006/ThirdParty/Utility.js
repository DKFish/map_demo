import { Cartesian3 } from '../Core/Cartesian3.js'
import { defined } from '../Core/defined.js'
import { DeveloperError } from '../Core/DeveloperError.js'
import { defaultValue } from '../Core/defaultValue.js';

var Utility = function () {

};
Utility.prototype.constructor = Utility;
Utility.GetUrlParam = function (paraName) {
    var url = document.location.toString();
    var arrObj = url.split("?");

    if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;

        for (var i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");

            if (arr != null && arr[0] == paraName) {
                return arr[1];
            }
        }
        return "";
    }
    else {
        return "";
    }
}

Utility.getMagic = function(uint8Array, byteOffset) {
    byteOffset = defaultValue(byteOffset, 0);
    return getStringFromTypedArray(uint8Array, byteOffset, Math.min(4, uint8Array.length));
}

Utility.CoorGeo2XY = function(wdj, jdj) {
    var mX, mY;//output
    var n1;
    var t, h2, B, L, e12, V2, V0, C, V, N, M, R, P2, C0, C1, C2, C3, n, l, m, x0b, y11;
    e12 = 0.006738525414683497;
    C = 6399698.9017827111;
    C0 = 6367558.49687;
    C1 = 32005.7801;
    C2 = 133.9213;
    C3 = 0.7032;
    B = wdj * 3.14159265358979 / 180.0;
    L = jdj * 3.14159265358979 / 180.0;
    t = Math.tan(B);
    h2 = e12 * Math.cos(B) * Math.cos(B);
    V2 = 1 + h2;
    V = Math.sqrt(V2);
    V0 = Math.sqrt(1.0 + e12);
    N = C / V;
    M = C / (V * V * V);
    R = C / (V * V);
    P2 = 206264.8062471;
    n1 = parseInt(L * P2 / (6 * 3600), 10);
    n = 1 + n1;
    l = L - (6 * n - 3) * 3600 / P2;
    m = l * Math.cos(B);
    x0b = C0 * B - Math.cos(B) * (C1 * Math.sin(B) + C2 * Math.sin(B) * Math.sin(B) * Math.sin(B) + C3 * Math.sin(B) * Math.sin(B) * Math.sin(B) * Math.sin(B) * Math.sin(B));
    mX = x0b + 0.5 * N * t * m * m + 1.0 / 24.0 * (5 - t * t + 9 * h2 + 4 * h2 * h2) * N * t * m * m * m * m + 1.0 / 720.0 * (61 - 58 * t * t + t * t * t * t) * N * t * m * m * m * m * m * m;
    y11 = N * m + 1.0 / 6.0 * (1 - t * t + h2) * N * m * m * m + 1.0 / 120.0 * (5 - 18 * t * t + t * t * t * t + 14 * h2 - 58 * h2 * t * t) * N * m * m * m * m * m;
    mY = Math.pow(10, 6) * n + 500000 + y11;

    return { x: mX, y: mY };
}

Utility.getExtensionFromUri = function(uri) {
    //>>includeStart('debug', pragmas.debug);
    if (uri === undefined) {
        throw new DeveloperError('uri is required.');
    }
    //>>includeEnd('debug');

    // var uriObject = new Uri(uri);
    // uriObject.normalize();
    // var path = uriObject.path;
    path = uri;
    var index = path.lastIndexOf('/');
    if (index !== -1) {
        path = path.substr(index + 1);
    }
    index = path.lastIndexOf('.');
    if (index === -1) {
        path = '';
    } else {
        path = path.substr(index + 1);
    }
    return path;
}

Utility.preDealPath = function (strSrcPath, bIsFile) {
    var strPath = strSrcPath.substr(0);
    strPath.trim();
    strPath.replace('\\', '/');
    if (strPath.length >= 2) {
        if (strPath.substr(0, 2) == "//") {
            strPath[0] = '\\';
            strPath[1] = '\\';
        }
        strPath.replace("//", "/");
        if (strPath.length > 5) {
            if (strPath.substr(0, 5) == "http:") {
                var i = 5;
                for (; i < strPath.length; i++) {
                    if (strPath.charAt(i) != '/') {
                        break;
                    }
                }

                var strRight = strPath.substr(i, strPath.length - i);
                strPath = "http://" + strRight;
            }
        }
    }
    if (!bIsFile) {
        var k = strPath.length - 1;
        while (k >= 0) {
            if (strPath.charAt(k) != '/') {
                break;
            }
            k--;
        }
        strPath = strPath.substr(0, k + 1);
        strPath += "/";
    }
    return strPath;
}
Utility.getDir = function (strSrcPath) {
    var len = strSrcPath.length;
    var pos = strSrcPath.lastIndexOf('/');
    if (pos < 0) {
        pos = strSrcPath.lastIndexOf('\\');
    }
    if (pos < 0) {
        return strSrcPath.substr(0);;
    }
    var str = strSrcPath.substr(0, pos);;
    if (str.charAt(str.length - 1) != '/') {
        str += "/";
    }
    return str;
}
Utility.getAbsolutePath = function (strSrcPath, strRefFile) {
    var strSourcePath = strSrcPath.substr(0);
    var strRefPath = strRefFile.substr(0);
    strSourcePath.trim();
    strRefPath.trim();

    var strSub;

    if (strSourcePath == '') {
        strSub = strRefPath.substr(0, 2);
        if ((strSub == './') || (strSub == '.\\')) {
            return strRefPath.substr(2);
        }
        strSub = strRefPath.substr(0, 3);
        if ((strSub == "../") || (strSub == "..\\")) {
            return "";
        }
    }

    if (strRefPath == "") {
        return strRefPath;
    }

    if ((strRefPath.length >= 2 && strRefPath.charAt(1) == ':') ||
        (strRefPath.length >= 5 && strRefPath.charAt(4) == ':')) {
        return strRefPath;
    }

    strSub = strRefPath.substr(0, 2);
    if (strSub == "\\\\" || strSub == "//") {
        return strRefPath;
    }
    strSourcePath = Utility.preDealPath(strSourcePath, false);
    strRefPath = Utility.preDealPath(strRefPath, true);
    strSub = strRefPath.substr(0, 2);
    var strSub1 = strRefPath.substr(0, 3);
    if (strSub == "./") {
        strRefPath = strRefPath.substr(2);
        return strSourcePath + strRefPath;
    }
    else if (strRefPath.length >= 2 && strRefPath.charAt(1) == ':') {
        return strRefPath;
    }

    else if (strRefPath.charAt(0) != '/' && strSub1 != "../") {
        return strSourcePath + strRefPath;
    }
    else if (strRefPath.charAt(0) == '/') {
        return strRefPath;
    }
    else if (strSub1 == "../") {
        var nIndex = 0;
        do {
            nIndex = strSourcePath.lastIndexOf('/');
            strSourcePath = strSourcePath.substr(0, nIndex);
            strRefPath = strRefPath.substr(3);
        } while (strRefPath.substr(0, 3) == "../");
        return strSourcePath + "/" + strRefPath;
    }
    return strSrcPath;
}

Utility.screenToWorld = function() {
    var screenCenter = new THREE.Vector2();
    var screenRaycaster = new THREE.Raycaster();
    var worldPosition = new THREE.Vector3();

    return function (screenPoint,scene,tileset) {
     
        if(!defined(window.SRSOrigin)){
            return  undefined;
        }
        var pX = (screenPoint.x / window.innerWidth) * 2 - 1;
        var pY = - (screenPoint.y / window.innerHeight) * 2 + 1;
        screenCenter.x = pX;
        screenCenter.y = pY;
        screenRaycaster.setFromCamera(screenCenter, scene.camera);
        var intersects = screenRaycaster.intersectObjects(tileset.meshGroup.children, true);
        if (intersects.length > 0) {
            worldPosition = intersects[0].point;
            var matrix = new THREE.Matrix4().makeRotationX(Math.PI / 2);
            worldPosition.applyMatrix4(matrix);
        }
        else{
            return  undefined;
        }
        return new Cartesian3(worldPosition.x, worldPosition.y, worldPosition.z);
    }
}();

Utility.computePixelSizeVector = function (viewPort, proMatrix, modelViewMatrix) {

    // pre adjust P00,P20,P23,P33 by multiplying them by the viewport window matrix.
    // here we do it in short hand with the knowledge of how the window matrix is formed
    // note P23,P33 are multiplied by an implicit 1 which would come from the window matrix.
    // Robert Osfield, June 2002.

    // scaling for horizontal pixels
    var dViewportWidth = viewPort.z;
    var dViewportHeight = viewPort.w;

    var P = proMatrix.elements;
    var M = modelViewMatrix.elements;

    var P00 = P[0] * dViewportWidth * 0.5;
    var P20_00 = P[8] * dViewportWidth * 0.5 + P[11] * dViewportWidth * 0.5;
    var scale_00 = new THREE.Vector3(M[0] * P00 + M[2] * P20_00,
        M[4] * P00 + M[6] * P20_00,
        M[8] * P00 + M[10] * P20_00);

    // scaling for vertical pixels
    var P10 = P[5] * dViewportHeight * 0.5;
    var P20_10 = P[9] * dViewportHeight * 0.5 + P[11] * dViewportHeight * 0.5;
    var scale_10 = new THREE.Vector3(M[1] * P10 + M[2] * P20_10,
        M[5] * P10 + M[6] * P20_10,
        M[9] * P10 + M[10] * P20_10);

    var P23 = P[11];
    var P33 = P[15];
    var pixelSizeVector = new THREE.Vector4(M[2] * P23,
        M[6] * P23,
        M[10] * P23,
        M[14] * P23 + M[15] * P33);

    var scaleRatio = 0.7071067811 / Math.sqrt(scale_00.lengthSq() + scale_10.lengthSq());
    pixelSizeVector.multiplyScalar(scaleRatio);

    return pixelSizeVector;
};

Utility.expandSphere = function (resSphere, otherSphere) {

    // ignore operation if incomming BoundingSphere is invalid.
    if (otherSphere.empty()) return;

    // This sphere is not set so use the inbound sphere
    if (resSphere.empty()) {
        resSphere.set(otherSphere.center, otherSphere.radius);
        return;
    }


    // Calculate d == The distance between the sphere centers
    var diff = new THREE.Vector3();
    diff.subVectors(resSphere.center, otherSphere.center);
    var d = diff.length();

    // New sphere is already inside this one
    if (d + otherSphere.radius <= resSphere.radius) {
        return;
    }

    //  New sphere completely contains this one
    if (d + resSphere.radius <= otherSphere.radius) {
        resSphere.set(otherSphere.center, otherSphere.radius);
        return;
    }


    // Build a new sphere that completely contains the other two:
    //
    // The center point lies halfway along the line between the furthest
    // points on the edges of the two spheres.
    //
    // Computing those two points is ugly - so we'll use similar triangles
    var new_radius = (resSphere.radius + d + otherSphere.radius) * 0.5;
    var ratio = (new_radius - resSphere.radius) / d;

    var newCenter = new THREE.Vector3(resSphere.center.x, resSphere.center.y, resSphere.center.z);


    newCenter.x += (otherSphere.center.x - resSphere.center.x) * ratio;
    newCenter.y += (otherSphere.center.y - resSphere.center.y) * ratio;
    newCenter.x += (otherSphere.center.z - resSphere.center.z) * ratio;

    resSphere.set(newCenter, new_radius);

};

Utility.mulVec3Vec4 = function (lhs, rhs) {

    return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z + rhs.w;
};
Utility.computeSpherePixelSize = function (sphere, pixelSizeVector) {

    return Math.abs(sphere.radius / Utility.mulVec3Vec4(sphere.center, pixelSizeVector));

};

Utility.isZeroVec2 = function (pnt2) {

    return (pnt2.x == 0 && pnt2.y == 0);

};

Utility.isZeroVec3 = function (pnt3) {

    return (pnt3.x === 0 && pnt3.y === 0 && pnt3.z === 0);

};

export { Utility };