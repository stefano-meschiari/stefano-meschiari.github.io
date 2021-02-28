---
layout: post
title: 'AstroTRENDS: Weasel words'
date: 2015-02-15
description:
image:
category: astronomy
tags:
author: Stefano Meschiari
published: true
sitemap: false
---
<img class=" wp-image-1234 aligncenter" alt="Credit: Cliff" src="/img/blog/weasel.jpg">
I added a bunch of new keywords to <a title="AstroTRENDS: A new tool to track astronomy topics in the literature" href="http://www.stefanom.org/astrotrends-a-new-tool-to-track-astronomy-topics-in-the-literature/">AstroTRENDS</a>, mostly suggested by friends and people in the community who had read my Facebook post.

A thought I had yesterday is the following: has the astronomical literature become more speculative, and perhaps less committed to audacious claims, in recent times? It is difficult to test this hypothesis   by merely querying ADS for abstract keywords. It would certainly be better served by a <a href="http://en.wikipedia.org/wiki/Natural_language_processing" target="_blank"><em>natural-language processing</em></a> analysis of the full text, although this is just my uninformed speculation.
<!--more-->

A much simpler way is to search for the so-called "weasel words" (such a funny way of describing them from a non-native speaker POV!). Matthew Might (a CS professor from the University of Utah) has <a href="http://matt.might.net/articles/shell-scripts-for-passive-voice-weasel-words-duplicates/" target="_blank">a really interesting article</a> about the different abuses of language that are common among technical writers, and he created some automated tools for detecting them. It's a great read. (There's even an emacs minor mode called <a href="https://github.com/bnbeckwith/writegood-mode" target="_blank">writegood</a>  based on his recommendations, which I will be testing for sure). Although I don't necessarily agree with a strict adherence to all of his points, there are certainly some great pieces of advice there.

Taking his post as a reference, I added a new "weasel words" pseudo-keyword to AstroTRENDS. The "weasel words" keyword shows the result of an ADS query of refereed abstracts containing the following boolean expression:

<tt>Could OR Possibly OR Might OR Maybe OR Perhaps OR Quite OR Fairly OR Various OR Very OR Several OR Exceedingly OR Vastly OR Interestingly OR Surprisingly OR Remarkably OR Clearly OR Significantly OR Substantially OR Relatively OR Completely OR Extremely</tt>

We can <em>easily</em> disagree on whether using these words in an abstract constitutes "weaseling", or has any sort of nefarious purpose (I certainly pepper my writing with more than my fair share of those). It is still an interesting exercise to verify whether usage of those words has increased over time. The following plot shows the fraction of articles containing those words (i.e. number of articles containing the words normalized by the total article count) each year.

Keeping all the caveats above in mind, there is a definite upward, pretty linear-by-eye trend going on. I'm not sure whether it has to do with simple evolution of language and style, less boastful writing, an accident of fate/bug on my part, or some other factor.

This is of course a super-shallow analysis that would require <em>far</em> more insight than what I offered in this post, but it's still intriguing.  I tried to altavista whether this is well-known, but have come empty handed so far. Any ideas?

<a href="http://www.stefanom.org/playpen/Trends/keywords/index.php?year1=1970&amp;year2=2013&amp;keyword1=Weasel%20words:%20Could%20OR%20Possibly%20OR%20Might%20OR%20Maybe%20OR%20Perhaps%20OR%20Quite%20OR%20Fairly%20OR%20Various%20OR%20Very%20OR%20Several%20OR%20Exceedingly%20OR%20Vastly%20OR%20Interestingly%20OR%20Surprisingly%20OR%20Remarkably%20OR%20Clearly%20OR%20Significantly%20OR%20Substantially%20OR%20Relatively%20OR%20Completely%20OR%20Extremely&amp;normalize=5" target="_blank">You can play with the interactive plot itself by clicking this link.</a>

UPDATE: <a href="http://mingus.as.arizona.edu/~bjw/" target="_blank">Ben Weiner</a>  made a really good point on the Facebook astronomer group.     He suggests that an additional, alternative explanation could simply be that abstracts have become, on average, more verbose with time, which would explain the higher frequency of fluffy adjectives and adverbs. This could be checked with a control set of non-weasel words… which I will definitely try.

How did this post do with <a href="https://github.com/bnbeckwith/writegood-mode" target="_blank">writegood-mode</a>? Pretty nicely… but I got a grade of "11" on <a href="http://www.hemingwayapp.com" target="_blank">Hemingway</a>, with about 9 out 24 sentences being <em>hard to read</em>.   Oh well.
