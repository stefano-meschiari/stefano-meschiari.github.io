"use strict";

var isNode = typeof module !== 'undefined' && module.exports;

if (isNode) {
    var System = require('./system.js').System;
    var Units = require('./units.js').Units;
    var BHTree = require('./bhtree.js').BHTree;
    var Stellar = require('./stellar.js').Stellar;
    var _m = require('./math.js')._m;
    var Pool = require('./pool.js').Pool;
    var StreamController = require('./streamcontroller').StreamController;
} else {

}

var N = 500;
var PI = Math.PI;

var M = 1;
var a = 1;
var max_R = 30*a;

var rng = _m.seededRandom(1234);

var s = Stellar(N/2, function(R) {
    return (3*M/(4*PI*a*a*a) * Math.pow(1+R*R/(a*a), -5./2.));
}, max_R, rng);

s.eps = Math.pow(4./3. * Math.PI * a * a * a / s.size(), 1./3.);
s.eps_abs = 5e-2;
s.eps_rel = 5e-2;
s.theta = 0.9;
s.translate([0, 0, 0, 0, 0, 0]);

var s2 = Stellar(N/2, function(R) {
    return (3*M/(4*PI*a*a*a) * Math.pow(1+R*R/(a*a), -5./2.));
}, max_R, rng);

s2.translate([10, 5, 0, -3, 0, 0]);
s2.tag(1);
s.append(s2);
s.shuffle();
s.computeForce();
s.center();

var pool = new Pool(function() {
    return new Float64Array(3*N);
});



var dt = 0.01;
var tmax = 10;
var i = 0;
var tt = Date.now();
var streamer = new StreamController(function(buffer) {
    throw((Date.now-tt)/1000);
}, tmax, 1);

//s.useTimeStep_control = true;
while (s.t < tmax) {
    s.computeForce();
    var com = _m.norm(_m.subset(s.centerOfMass(), 3, 5 +1));
    s.center();
    streamer.push(s.toArray(pool.pop, [0, 1, 2]), s.t);
    console.log(s.t, s.dt_avg, streamer.bufferPercentage());
    s.evolve(s.t+dt);
//    s.writeSync("out_" + i + ".txt");
    i++;
}
