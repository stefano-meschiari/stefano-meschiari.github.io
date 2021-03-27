"use strict";

var isNode = typeof module !== 'undefined' && module.exports;

if (isNode) {
    var System = require('./system.js').System;
    var Units = require('./units.js').Units;
    var BHTree = require('./bhtree.js').BHTree;
    var _m = require('./math.js')._m;
}

var K2 = Units.K2;

// CHECK 
var s = new System(24000), i;
var M = 1.;
var a = 1.;
var m = M/s.size();
var rng = _m.seededRandom(123);

var max_R = 10;
var max_M = Math.pow(max_R*a, 3)/Math.pow(Math.sqrt(max_R*max_R+1) * a, 3);

var Ms = _m.uniformRandom(_m.zeros(s.size()), 0, max_M*M, rng);
var plummer_M = function(r, M_r) {
    return M_r/M - r*r*r*Math.pow(r*r+a*a, -1.5);
};

var Rs = _m.zeros(s.size());
for (var $i = 0, __v1 = (Ms), $1 = __v1[0], __length = __v1.length; $i < __length; $i++, $1 = __v1[$i]) Rs[$i] = _m.bisect(0, max_R * a, plummer_M, 1e-5, $1);
var sigmas = _m.zeros(s.size());

for (i = 0; i < s.size(); i++) {
    _m.rk23(0, 0, function(r, sigma2) {
        return -
    }, Rs[i]);
}

console.log(_m.max(Rs));
console.log(_m.min(Rs));

var v3 = _m.zeros(3);
var sigma = _m.zeros(1);

for (i = 0; i < s.size(); i++) {
    var p = s.ith(i);
    p[6] = m;

    _m.sphereRandom(v3, rng);
    var r = Rs[i];
    var norm = _m.norm(v3);
    for (var $i = 0, __v1 = (v3), $1 = __v1[0], __length = __v1.length; $i < __length; $i++, $1 = __v1[$i]) p[$i] = $1 / norm * r;

    // d\sigma^2 / dr = -GM(r)/r^2 = -G M_T/R_T^3 R

    _m.gaussianRandom(sigma, 0., Math.sqrt(0.1*K2*M/(a*a*a) * (r*r)), rng);

    _m.sphereRandom(v3, rng);
    norm = _m.norm(v3);
    for (var $i = 0, __length = v3.length; $i < __length; $i++) v3[$i] /= norm;

    p[3] = sigma[0] * v3[0];
    p[4] = sigma[0] * v3[1];
    p[5] = sigma[0] * v3[2];

}

s.writeSync('out_' + i + ".txt");
stop();

var j;

s.eps_abs = 1e-5;
s.eps_rel = 1e-5;
s.eps = 1e-2;


console.log(s.eps);
s.bruteForce();
var E = s.kinetic() + s.potential();
console.log(E);
console.log(s.kinetic(), s.potential());
var Phi = s.potential();
s.computeForce();
console.error((Phi - s.potential())/Phi);



i = 0;

for (var t = 1; t < 1000; t += 5) {
    var com = s.centerOfMass();
    s.computeForce();
    s.writeSync('out_' + i + ".txt");
    var v = Math.sqrt(((com[3])*(com[3]))+((com[4])*(com[4]))+((com[5])*(com[5])));
    console.log(s.t, s.dt_avg, 2.*s.kinetic()/s.potential(), (s.kinetic() + s.potential()-E)/E, v, com[6], s.potential() / (3./5*K2*M/a));

    s.evolve(t, s.computeForce);
    i++;
}

// Local Variables:
// eval: (add-hook 'after-save-hook (lambda() (shell-command "cd ..; make >/dev/null")) nil t)
// End:

