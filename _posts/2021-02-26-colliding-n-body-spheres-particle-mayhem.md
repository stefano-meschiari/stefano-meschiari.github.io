---
layout: post
title: |
  Colliding N-body spheres: Particle Mayhem!
author: Stefano Meschiari
date: 2014-08-07
description: Having fun with physics simulations in the browser
image:
category: astronomy
tags:
  - visualization
  - when-giants-collide
published: true
sitemap: false
---
<a href="http://www.stefanom.org/wgc/test_nbody.html" class="ui fluid button">
<i class="play icon"></i>
Play
</a>

When Giants Collide — WGC for short — is one of the "fun" projects I am working on. Once finished, it will be a small in-browser simulator where you can collide giant planets together (with some degree of realism). You can see my progress on my <a href="https://github.com/stefano-meschiari/WhenGiantsCollide">GitHub repo</a> and the series of <a href="http://www.stefanom.org/category/when-giants-collide/" target="_blank">blog posts under this category.</a>

<!--more-->
In this little demo app, you can run an N-body simulation in your browser where you make two spheres made of point masses "collide". You can tweak various parameters (collision speed,  impact parameter, distance and number of particles) to change the outcome of the simulation.

<h3>Underneath it all: TreeSPH.js</h3>
The app above is powered by the portion of WGC's code that computes the gravitational force between a set of point particles (<a href="http://www.scholarpedia.org/article/N-body_simulations_(gravitational)" target="_blank">a gravitational N-body system</a>). The gravitational force is computed using the <a title="An interactive Barnes-Hut tree" href="http://www.stefanom.org/bh-tree/" target="_blank">Barnes-Hut tree gravity algorithm</a>, and the coordinates of the points are evolved using a third-order embedded Runge-Kutta algorithm. The code is available in the <a href="https://github.com/stefano-meschiari/WhenGiantsCollide" target="_blank">GitHub repo</a> for WGC.

I am now working on writing the hydrodynamical part (via the <a href="http://en.wikipedia.org/wiki/Smoothed-particle_hydrodynamics" target="_blank">SPH algorithm</a>), which will let me simulate the collision between two gaseous spheres. The resulting library will be called <strong>treesph.js</strong>.

<strong>treesph.js </strong>will be an open-source JavaScript library able to power small-scale hydrodynamical simulations — either in the browser (through web workers), or within a JavaScript environment (e.g. Node.js). It comes with:

- a library to set up initial equilibrium conditions (e.g. Lane-Emden spheres, or N-body spheres with isotropic velocity dispersion);
- a canvas-based library to plot and animate the simulation snapshots;
- a fast library for operating on vectors and matrices that minimizes allocations and copying, and other math routines.

<h3>Performance notes</h3>
While playing with the app, you may be wondering (a) why there is a "buffering" stage before you can see the evolution of the system, and (b) why so few particles?
<h4>Buffering: it's all about delayed gratification</h4>
The app animates the particle motion at 30 frames per second. This requirement places a hard and fast constraint: if you want to compute the particle motion at each frame request, then the computation must take less than 1/30th of a second, otherwise the webpage will freeze as the JavaScript engine tries to catch up with the accumulated frame requests. For reasonable number of particles (say, 100 or more — see below) and the time steps required by the above app, this requirement is <em>way </em>overshot.

This issue can be ameliorated by running the numerical computation in a separate thread (<a href="https://developer.mozilla.org/en-US/docs/Web/Guide/Performance/Using_web_workers" target="_blank">a web worker</a>), and drawing frames on the main thread as soon as they are computed. This is still not as optimal: while it solves the UI freezing issue, the particle motion will appear very jerky as it will be animated at (typically) less than a frame per second!

In order to solve this issue, I created a small JavaScript library (<strong>streamingcontroller.js</strong>; available in the same <a href="https://github.com/stefano-meschiari/WhenGiantsCollide" target="_blank">GitHub repo</a>, documentation upcoming). <strong>Streamingcontroller.js </strong>first estimates the expected wall time — the time in seconds — needed to complete the simulation. Then, within the web worker thread, it "buffers" the simulation snapshots by adding them to a pool of snapshots. Once the buffer is big enough that the simulation can be run in real time without hiccups, the library starts streaming the snapshots back to the main thread where the animation is drawn. In the main thread, a second buffer receives the snapshots; the second buffer is then emptied at 30 frames per second.
<h4>More particles, pretty please?</h4>
The default setting of the app is to animate 250 particles (125 per sphere). Why so few, when typical number of particles quoted for <em>N</em>-body simulations routinely exceed millions — or <a href="http://www.mpa-garching.mpg.de/galform/virgo/millennium/index.shtml" target="_blank">even billions!</a> — of particles?

There are three bottlenecks at work. The first is obvious: the code isn't fully optimized and profiled yet, and I am certain there is room for improvement. I am writing a small math library of common mathematical routines called <strong>math.js </strong>(also in the same <a href="https://github.com/stefano-meschiari/WhenGiantsCollide" target="_blank">GitHub repo</a>) which will be fully optimized for V8.

The second is also obvious: simulations with lots of particles are usually run at full-speed, on multiple cores, and in the background. These simulations can save their snapshots, to be plotted and animated at the end of the run. An online app (or game) with real-time requirements (or, say, a &lt;1 minute buffering time) doesn't have this kind of luxury!

The third is the worst hurdle, and it is inherent to the nature of JavaScript: <a href="http://sealedabstract.com/rants/why-mobile-web-apps-are-slow/" target="_blank">JavaScript is slow</a>. I am not a JavaScript guru by any means, but I do have a good amount of experience writing performant numerical code in a variety of languages (mostly C). While JavaScript is typically fast enough for most tasks on the web, it is<i> </i><strong>slow</strong> on personal computers and even <strong>slower</strong> on mobile platforms for physically-motivated, accurate simulations. In its present form, it is not well-suited to run these kinds of numerical tasks as quickly as the underlying hardware allows. Although JavaScript interpreters have been improving by leaps and bounds, and careful code can exploit some of these optimizations, they are hitting a wall of <a href="http://sealedabstract.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-09-at-3.59.43-PM.png" target="_blank">diminishing returns</a>. Since JavaScript is the only runtime available on browsers, it is the ultimate bottleneck.

You can check out the other demos using code from WGC in <a href="http://www.stefanom.org/wgc" target="_blank">this webpage</a>.
