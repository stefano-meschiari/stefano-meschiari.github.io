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
    importScripts("vendor/underscore-min.js", "math.js?v=worker", "units.js?v=worker", "bhtree.js?v=worker", "system.js?v=worker", "pool.js?v=worker",
                 "streamcontroller.js?v=worker");
}


var onmessage = function(event) {
    var system, pool, streamer;
    var data = event.data;
    var tmax = data.tmax;
    var frameRate = data.frameRate;
    var dt = data.dt;

    system = System.unserialize(data.system);

    pool = new Pool(function() {
        return new Float64Array((3 +1)*system.size());
    });

    streamer = new StreamController(function(buffer) {
        postMessage({
            type:'streaming',
            buffer:buffer
        });

        for (var i = 0; i < buffer.length; i++)
            pool.destroy(buffer[i]);

        buffer.length = 0;
    }, tmax, frameRate);

    system.useTimeStep_control = true;
    system.sortBy(2);

    var coords = [0, 1, 2, 9];
    var last = null;

    while (system.t < tmax) {
        system.center();

        var xyz = pool.pop();
        system.toArray(xyz, coords);

        if (last != null) {
            var xyz_12 = pool.pop();
            for (var i = 0; i < xyz.length; i += coords.length) {
                xyz_12[i+0] = 0.5*(last[i+0]+xyz[i+0]);
                xyz_12[i+1] = 0.5*(last[i+1]+xyz[i+1]);
                xyz_12[i+2] = 0.5*(last[i+2]+xyz[i+2]);
                xyz_12[i+2 +1] = xyz[i+2 +1];
            }
            streamer.push(xyz_12, system.t-0.5*dt);
        }

        streamer.push(xyz, system.t);

        system.evolve(system.t + dt);

        system.center();

        last = xyz;

        if (!streamer.isRealTime() )
            postMessage({
                type:'buffering',
                millisToRealTime:streamer.millisToRealTime(),
                millisLeft:streamer.millisLeft(),
                percentage:streamer.bufferPercentage()
            });

    }

    streamer.done();

    postMessage({
        type:'done'
    });
};

