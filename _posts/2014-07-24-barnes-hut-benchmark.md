---
layout: post
title: "A JavaScript benchmark: Barnes-Hut gravity"
date: 2014-07-24
category: astronomy
tags:
    - astronomy
    - javascript
    - gravity
    - algorithms
    - benchmark
author: Stefano Meschiari
published: true
sitemap: false
---
<iframe src="/public/wgc/test_gravity.html?v=0" width="600" height="650"></iframe>

[<em>Updated on March 2021 with new devices!</em>]

In one of my last posts (<a href="{% post_url 2014-07-16-barnes-hut %}">An interactive Barnes-Hut tree</a>) I talked briefly about one of the "fun" projects I'm working on, When Giants Collide (work in progress, <a href="https://github.com/stefano-meschiari/WhenGiantsCollide">GitHub repo</a>), and promised myself to blog about its development as I went along. I just finished refining the algorithm for building the tree and calculating the gravitational force.

<!--more-->

The small app above is a benchmark pitting the Barnes-Hut algorithm for computing gravity (<a href="http://en.wikipedia.org/wiki/Barnes–Hut_simulation" target="_blank">an O(N log(N)) algorithm</a>) against a brute-force direct summation (an O(N^2) algorithm). It calculates the gravitational field of a random collection of particles using both methods for N = 256 to N = 16,384; a lower amount of time spent indicates a faster algorithm. The time used to compute the gravitational force is averaged over 12 iterations to minimize fluctuations. Results are plotted in real time. Try to toggle the logarithmic axis to see the actual difference between an $O(N^2)$ and an $O(N \log N)$ algorithm!

Lastly, it calculates an overall "score" for the JavaScript interpreter by only running the Barnes-Hut algorithm for N = 16,384. You can see a table of scores for a few different browsers and devices I have access to (lower is better). If you'd like, <a href="mailto:stefano.meschiari@gmail.com">send me your score</a>!

<h3>Scores (lower is better)</h3>

<table class="ui celled table structured">
  <thead>
    <tr><th>Device</th><th>Running on</th><th>Score</th><th>Relative to MacBook Pro, 2012, Chrome 36</th></tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">MacBook Air (M1, 2020), 11.2.3</td>
      <td>Safari 14.0.3</td>
      <td>5,275</td>
      <td>0.36x</td>
    </tr>
    <tr>
      <td>Chrome 89</td>
      <td>6,850</td>
      <td>0.46x</td>
    </tr>
    <tr>
      <td rowspan="4">MacBook Pro (Retina, late 2012), 10.9.4</td>
      <td>Chrome 36</td>
      <td>14,641</td>
      <td>1.0x</td>
    </tr>
    <tr>
      <td>Safari 7.0.5</td>
      <td>17,541</td>
      <td>1.2x</td>
    </tr>
    <tr>
      <td>Firefox 30</td>
      <td>18,866</td>
      <td>1.3x</td>
    </tr>
    <tr>
      <td>Node 0.10.29</td>
      <td>21,858</td>
      <td>1.5x</td>
    </tr>
    <tr>
      <td rowspan="2">iPhone 5S, 7.1.2</td>
      <td>Safari</td>
      <td>63,841</td>
      <td>4.4x</td>
    </tr>
    <tr>
      <td>Mercury (no JIT)</td>
      <td>561,033</td>
      <td>38.3x</td>
    </tr>
    <tr>
      <td>iPhone 5C, 7.1.2</td>
      <td>Safari</td>
      <td>147,141</td>
      <td>10.0x</td>
    </tr>
  </tbody>
</table>

<h3>Some observations about JavaScript optimization</h3>
Chrome turned out to be the fastest browser at this particular benchmark. Surprisingly, a previous version of the same code was actually the  slowest on my MacBook -- almost 6x as slow as Safari! That was quite unexpected, as in my (limited) experience building web apps Chrome tends to edge out other browsers in terms of JavaScript execution speed.

So I waded a little bit more into my code to understand what was making my code so inefficient. This <a href="https://developers.google.com/speed/articles/optimizing-javascript" target="_blank">Google optimization guide</a> and <a href="http://www.html5rocks.com/en/tutorials/speed/v8/" target="_blank">this post on HTML5Rocks</a> (specifically talking about optimizing for V8, the just-in-time compiler embedded in Chrome) proved very useful. What I learned:
<ol>
 	<li>Use the idiomatic JavaScript style for creating classes (using prototypes, new, straightforward constructors etc.) instead of using an object factory and closures.</li>
 	<li>Avoid creating closures, when possible.</li>
 	<li>Use node.js to profile the application and identify functions that are not getting optimized (using <em>--trace-opt</em>).</li>
 	<li>Both Safari and Firefox had good baseline scores even <i>before</i> these optimizations. I found it quite surprising that V8 was much more fastidious about my code than the other JavaScript engines.</li>
</ol>
Another finding was how much slower alternative browsers (e.g. Chrome, Mercury) are on iOS. Alternative browsers use the same engine as Safari, but they don't have access to<a href="http://daringfireball.net/2011/03/nitro_ios_43" target="_blank"> Nitro's Just-In-Time compilation</a> -- this means that they will be quite a bit slower than Safari on a computationally-intensive benchmark. How much slower? On my iPhone 5S, almost a factor of 10!

<h3>Web workers are awesome</h3>
The benchmark runs in a different thread, so that the page itself remains responsive. This is accomplished using Web Workers, a relatively new technology that allows the page to spin off threads to do computation-heavy work. <a href="http://caniuse.com/webworkers" target="_blank">It's quite well supported</a>, and I found it pretty easy to learn (<a href="http://stackoverflow.com/questions/21408510/chrome-cant-load-web-worker" target="_blank">aside from some surprising quirks</a>). I plan on spinning off some of the tasks in <a title="Systemic Live" href="http://www.stefanom.org/systemic-live/">Systemic Live</a> -- which currently either block the interface or use timers -- into Web Workers (it'll be a quite a bit of work, so don't hold your breath).