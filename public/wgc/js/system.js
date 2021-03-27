"use strict";

if (typeof module !== 'undefined' && module.exports) {
    var BHTree = require("./bhtree.js").BHTree;
    var Units = require("./units.js").Units;
    var _m = require("./math.js")._m;
    var _ = require('underscore');
}

if (!(BHTree)) { throw new Error() };
if (!(Units)) { throw new Error() };
if (!(_m)) { throw new Error() };
if (!(_)) { throw new Error() };

function System(N) {
    this.p = [];
    this.f = [];
    this.changed = false;
    this.Phi = 0.;
    this.theta = 1.;
    this.eps = 1e-6;
    this.eps_abs = 1e-3;
    this.eps_rel = 1e-3;
    this.eps_control = 0.25;
    this.t = 0;

    this.computeGravity = true;

    var i;
    for (i = 0; i < N; i++) {
        this.p.push(new Float64Array(10));
        this.f.push(new Float64Array(3*2));
    }

    this.tree = new BHTree();
}

System.unserialize = function(data) {
    var s = new System(1);
    var props = ['p', 'f', 'Phi', 'theta', 'eps', 'eps_abs', 'eps_rel', 't', 'theta', 'computeGravity'];

    for (var i = 0; i < props.length; i++)
        s[props[i]] = data[props[i]];
    return s;
};

System.prototype.ith = function(i) {
    return this.p[i];
};

System.prototype.coords = function() {
    return this.p;
};

System.prototype.size = function() {
    return this.p.length;
};



System.prototype.centerOfMass = function(com, tag) {
    tag = (tag === undefined ? -1 : tag);
    var p = this.p;
    com = com || _m.zeros(7);
    for (var $i = 0, __length = com.length; $i < __length; $i++) com[$i] = 0.;

    for (var i = 0; i < p.length; i++) {
        if (tag >= 0 && p[i][9] != tag) continue;
        for (var j = 0; j <= 5; j++) {
            com[j] += p[i][j]*p[i][6];
        }
        com[6] += p[i][6];
    }

    for (i = 0; i <= 5; i++)
        com[i] /= com[6];

    return com;
};

System.prototype.evolve = function(to_t, force) {
    force = force || this.computeForce;
    _m.rk(this.t, this.p, force, to_t, this);
    this.t = to_t;
};

System.walker = function(n, p_i, f_i, i, self) {
    var open = false;
    var d2;

    if (self.computeGravity) {
        var com = n.com;
        var dix = com[0]-p_i[0];
        var diy = com[1]-p_i[1];
        var diz = com[2]-p_i[2];

        d2 = ((dix)*(dix))+((diy)*(diy))+((diz)*(diz));

        if (n.type != BHTree.PARTICLE && (((n.width)*(n.width))/d2 > self.theta2 || (((p_i[0] >= n.min[0]) && (p_i[0] <= n.min[0]+n.width)) && ((p_i[1] >= n.min[1]) && (p_i[1] <= n.min[1]+n.width)) && ((p_i[2] >= n.min[2]) && (p_i[2] <= n.min[2]+n.width))))) {
            open = true;
        } else {
            if (n.bodyIndex == i)
                return false;

            var m = Units.K2*n.mass;
            var d = Math.sqrt(d2 + self.eps2);
            var m_d3 = m/(d*d*d);

            f_i[3] += m_d3 * dix;
            f_i[4] += m_d3 * diy;
            f_i[5] += m_d3 * diz;

            self.Phi += -m * p_i[6] / d;
            self.timeStep_control = Math.min(self.timeStep_control, 1./(m_d3));
        };
    }

    return(open);
};

System.prototype.computeForce = function(t, p, f, self) {
    t = t || 0;
    p = p || this.p;
    f = f || this.f;
    self = self || this;

    var walker = System.walker;
    this.theta2 = ((this.theta)*(this.theta));
    this.eps2 = ((this.eps)*(this.eps));
    this.timeStep_control = 1e20;
    this.tree.update(p);
    this.Phi = 0.;
    var N = this.p.length;

    for (var i = 0; i < N; i++) {
        var p_i = p[i];
        var f_i = f[i];

        f_i[0] = p_i[3];
        f_i[1] = p_i[4];
        f_i[2] = p_i[5];
        f_i[3] = 0.;
        f_i[4] = 0.;
        f_i[5] = 0.;
        this.tree.walk(walker, p_i, f_i, i, self);
    };

    this.Phi /= 2.;
    this.timeStep_control = this.eps_control*Math.sqrt(this.timeStep_control);
};



System.prototype.bruteForce = function(t, p, f) {
    this.Phi = 0;
    var eps2 = ((this.eps)*(this.eps));
    var K2 = Units.K2;
    var i, j;
    t = t || 0;
    f = f || this.f;
    p = p || this.p;
    var N = p.length;

    for (i = 0; i < N; i++)
        for (var $i = 0, __length = f[i].length; $i < __length; $i++) f[i][$i] = 0;


    var dist = 0;
    for (i = 0; i < N; i++) {
        f[i][0] = p[i][3];
        f[i][1] = p[i][4];
        f[i][2] = p[i][5];

        for (j = 0; j < N; j++) {
            if (i >= j)
                continue;
            var d = Math.sqrt((((p[i][0]-p[j][0])*(p[i][0]-p[j][0])) + ((p[i][1]-p[j][1])*(p[i][1]-p[j][1])) + ((p[i][2] - p[j][2])*(p[i][2] - p[j][2]))) + eps2);
            var d3 = d*d*d;
            f[i][3] += -K2*p[j][6] * (p[i][0]-p[j][0])/d3;
            f[i][4] += -K2*p[j][6] * (p[i][1]-p[j][1])/d3;
            f[i][5] += -K2*p[j][6] * (p[i][2]-p[j][2])/d3;

            f[j][3] += K2*p[i][6] * (p[i][0]-p[j][0])/d3;
            f[j][4] += K2*p[i][6] * (p[i][1]-p[j][1])/d3;
            f[j][5] += K2*p[i][6] * (p[i][2]-p[j][2])/d3;

            this.Phi += -K2*p[i][6] * p[j][6]/d;

        }
    }

    { (function() { if (_m.isNaN(f)) throw 'f is NaN'; })() };
};

System.prototype.force = function() {
    return this.f;
};

System.prototype.potential = function() {
    return this.Phi;
};

System.prototype.kinetic = function() {
    var K = 0;
    for (var $i = 0, __v1 = (this.p), $1 = __v1[0], __length = __v1.length; $i < __length; $i++, $1 = __v1[$i]) K += ((($1[3])*($1[3]))+(($1[4])*($1[4]))+(($1[5])*($1[5]))) * $1[6];
    return 0.5*K;
};

System.prototype.energy = function() {
    return this.kinetic() + this.potential();
};

System.prototype.writeSync = function(file) {
    _m.writeMatrixSync(file, this.p);
};

System.prototype.center = function() {
    var com = this.centerOfMass();
    for (var i = 0; i < this.size(); i++)
        for (var j = 0; j <= 5; j++)
            this.p[i][j] -= com[j];
};

System.prototype.translate = function(v6) {
    for (var i = 0; i < this.size(); i++)
        for (var j = 0; j <= 5; j++)
            this.p[i][j] += v6[j];
};

System.prototype.append = function(sys) {
    for (var i = 0; i < sys.size(); i++) {
        this.p.push(sys.ith(i));
        this.f.push(new Float64Array(3*2));
    }
    this.tree = new BHTree();
};

System.prototype.tag = function(tag) {
    for (var i = 0; i < this.size(); i++) {
        this.ith(i)[9] = tag;
    };
};

System.prototype.shuffle = function() {
    this.p = _.shuffle(this.p);
};

System.prototype.sortBy = function(coord) {
    this.p.sort(function(pi, pj) { return pi[coord]-pj[coord]; });
};

System.prototype.toArray = function(arr, what) {
    var n = what.length;
    for (var i = 0; i < this.p.length; i++) {
        for (var j = 0; j < what.length; j++)
            arr[i*n+j] = this.p[i][what[j]];
    }
};

if (typeof(exports) !== 'undefined') {
    exports.System = System;
}

// Local Variables:
// eval: (add-hook 'after-save-hook (lambda() (shell-command "cd ..; make >/dev/null" nil)) nil t)
// End:
