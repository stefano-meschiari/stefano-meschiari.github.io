---
layout: post
title: An interactive Barnes-Hut tree
date: 2014-07-16
description: A simple JavaScript implementation of a Barnes-Hut tree
category: astronomy
tags:
    - astronomy
    - javascript
    - gravity
    - algorithms
author: Stefano Meschiari
published: true
sitemap: false
---
<iframe src="/public/wgc/test_tree.html?v=0" width="600" height="600"></iframe>

I've recently started experimenting with a new  visualization that I think will turn out pretty darn cool. Its draft name is <a href="http://en.wikipedia.org/wiki/When_Worlds_Collide" target="_blank">When Giants Collide.</a> When  Giants Collide will address a common request from planetary crashers: "<em>Can I see what happens when two giant planets collide"</em>?

<!--more-->

When Giants Collide will be a super-simple JavaScript app (so it will run in your browser) that will simulate the collision of two massive spheres of gas. The simulation will have to model both gravity and the dynamics of the gas: to address this, I've been dusting off and reviewing an old <a href="http://en.wikipedia.org/wiki/Smoothed-particle_hydrodynamics" target="_blank">Smoothed-Particle Hydrodynamics</a> (SPH) code I worked on for a brief period in graduate school. SPH is a very simple technique for cheaply simulating gas flows with good spatial accuracy, and is somewhat straightforward to code. There are some shortcuts that have to be taken, too -- large time steps, low particle counts, and more (e.g., a polytropic equation of state for the gas giants; more on this in future posts). These shortcuts come at the expense of realism, but will enable fast, smooth animation in the browser.

<h3>Gravity with the  Barnes-Hut algorithm</h3>
Gravity is an essential ingredient of When Giants Collide! Even with very low particle counts (say, <em>N </em>= 1000), a brute force calculation that just sums up the mutual gravitational force between particles won't do if you want to run the simulation at 60 frames per second. Direct summing is an N^2 operation:
<script src="https://gist.github.com/stefano-meschiari/875fdfde63eba2cb620d.js"></script>
(this is a simple force accumulator written in R).

A better way that involves only a slightly more complicated algorithm is to use the <a href="http://adsabs.harvard.edu/abs/1986Natur.324..446B" target="_blank">Barnes-Hut algorithm</a> (a short Nature paper with more than 1,000 citations!). The algorithm involves recursively subdividing space into cubes and loading them with particles, such that every cube contains either 0 or 1 particles. This is represented in code with an oct-tree structure.  Once such a tree is constructed, one can calculate the gravitational force on a given particle in the brute-force way for close particles, and in an approximate way for distant particles; whether to use one or the other is determined by walking the tree down from the top. An excellent explanation (with great visuals!) is provided <a href="http://arborjs.org/docs/barnes-hut" target="_blank">in this article</a>.

The other advantage is that, once the tree has been already built for the gravity calculation, it can be used to identify the nearest neighbors of a given particle through the same tree-walking procedure. The nearest neighbors are needed for the hydrodynamical part of the SPH algorithm (see, e.g., this review article by <a href="http://adsabs.harvard.edu/abs/2009NewAR..53...78R" target="_blank">Stefan Rosswog</a> or this one by <a href="http://adsabs.harvard.edu/abs/2012JCoPh.231..759P" target="_blank">Daniel Price</a>).
<h3>An interactive tree</h3>
Below is an interactive JavaScript applet that subdivides space with the Barnes-Hut algorithm. You can add new points by clicking on the surface, or using the buttons to add new, random ones.

The code for building the Barnes-Hut tree from an array of 3D positions is available at the <a href="https://github.com/stefano-meschiari/WhenGiantsCollide" target="_blank">GitHub repository for When Giants Collide.</a> I will be developing the code in the open, and post periodically about my progress. Hopefully by the end of summer I will have an attractive app running on any modern device and web browser. Any ideas on how to gamify it?