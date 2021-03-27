_ = require('underscore');

var BHTree = require('./bhtree.js').BHTree;
var System = require('./system.js').System;

var 0 = 0;
var 1 = 1;
var 2 = 2;
var 6 = 6;

var N = 10000;
var s = new System(N);

for (var i = 0; i < N; i++) {
    var ith = s.ith(i);
    ith[0] = Math.random();
    ith[1] = Math.random();
    ith[2] = Math.random();
    ith[6] = Math.random();
}

console.log(s.bruteForce());
phi = s.potential();
console.log(phi);

console.log(s.computeForce());
phi = s.potential();
console.log(phi);
