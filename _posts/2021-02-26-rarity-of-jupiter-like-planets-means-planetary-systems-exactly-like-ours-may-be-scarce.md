---
layout: post
title: Rarity of Jupiter-like planets means planetary systems exactly like ours may
  be scarce
description: I teamed up with a very, very smart high school student
date: 2015-12-13
author: Stefano Meschiari
category: astronomy
tags:
  - citizen_science
  - exoplanets
  - HD32963
  - planet_formation
  - R
published: true
---
Is our little corner of the galaxy a special place? As of this date, we’ve <a href="http://exoplanets.org">discovered more than 1,500 exoplanets</a>: planets orbiting stars other than our sun. Thousands more will be added to the list in the coming years as we confirm planetary candidates by alternative, independent methods.

In the hunt for other planets, we’re especially interested in those that might potentially host life. So we focus our modern exoplanet surveys on planets that might be similar to Earth: low-mass, rocky and with just the right temperature to allow for liquid water. But what about the other planets in the solar system? The <a href="https://en.wikipedia.org/wiki/Copernican_principle">Copernican principle</a> – the idea that the Earth and the solar system are not unique or special in the universe – suggests the architecture of our planetary system should be common. But it doesn’t seem to be.
<img src="https://62e528761d0685343e1c-f3d1b99a743ffa4142d9d7f1978d9686.ssl.cf2.rackcdn.com/files/105306/width668/image-20151210-7425-1kd373r.png" alt="A mass-period diagram. Each dot marks the mass and orbital period of a confirmed exoplanet." />
<div class="caption">A mass-period diagram. Each dot marks the mass and orbital period of a confirmed exoplanet.</div>

The figure above, called a <em>mass-period diagram</em>, provides a visual way to compare the planets of our solar system with those we’ve spotted farther away. It charts the orbital periods (the time it takes for a planet to make one trip around its central star) and the masses of the planets discovered so far, compared with the properties of solar system planets.

Planets like Earth, Jupiter, Saturn and Uranus occupy “empty” parts of the diagram – we haven’t found other planets with similar masses and orbits so far. At face value, this would indicate that the majority of planetary systems do not resemble our own solar system.

The solar system lacks close-in planets (planets with orbital periods between a few and a few tens of days) and super-Earths (a class of planets with masses a few times the mass of the Earth often detected in other planetary systems). On the other hand, it does feature several long-period gaseous planets with very nearly circular orbits (Jupiter, Saturn, Uranus and Neptune).

Part of this difference is due to selection effects: close-in, massive planets are easier to discover than far-out, low-mass planets. In light of this discovery bias, astronomers <a href="http://aasnova.org/2015/09/25/how-normal-is-our-solar-system/">Rebecca Martin and Mario Livio</a> convincingly argue that our solar system is actually <a href="http://dx.doi.org/10.1088/0004-637X/810/2/105">more typical than it seems at first glance</a>.

There is a sticking point, however: Jupiter still stands out. It’s an outlier based both on its orbital location (with a corresponding period of about 12 years) and its very-close-to-circular orbit. Understanding whether Jupiter’s relative uniqueness is a real feature, or another product of selection effects, has real implications for our understanding of exoplanets.
<figure><iframe src="https://www.youtube.com/embed/3afEX8a2jPg?wmode=transparent&amp;start=0" width="440" height="260" frameborder="0" allowfullscreen="allowfullscreen"></iframe></figure>
<div class="caption">Jupiter as seen by the Hubble Space Telescope.</div>

<h2>Throwing its weight around</h2>
According to our understanding of how our solar system formed, Jupiter shaped much of the other planets' early history. Due to its gravity, it influenced the <a href="http://www.sciencedaily.com/releases/2011/06/110605132437.htm">formation of Mars</a> and Saturn. It potentially facilitated the development of life by shielding Earth from cosmic collisions that would have delayed or extinguished it, and by funneling water-rich bodies towards it. And its gravity <a href="http://doi.org/10.1073/pnas.1423252112">likely swept the inner solar system of solid debris</a>. Thanks to this clearing action, Jupiter might have prevented the formation of super-Earth planets with massive atmospheres, thereby ensuring that the inner solar system is populated with small, rocky planets with thin atmospheres.

Without Jupiter, it looks unlikely that we’d be here. As a consequence, figuring out if Jupiter is a relatively common type of planet might be crucial to understanding whether terrestrial planets with a similar formation environment as Earth are abundant in the galaxy.

Despite their relative heft, it’s a challenge to discover Jupiter analogs – those planets with periods and masses similar to Jupiter’s. Astronomers typically discover them using an indirect detection technique called the <a href="https://en.wikipedia.org/wiki/Doppler_spectroscopy">Doppler radial velocity method</a>. The gravitational pull of the planet causes tiny shifts in the wavelength of features in the spectrum of the star, in a distinctive, periodic pattern. We can detect these shifts by periodically capturing the star’s light with a telescope and turning it into a spectrum with <a href="https://www2.keck.hawaii.edu/inst/hires/">a spectrograph</a>. This periodic signal, based on a planet’s long orbital period, can require monitoring a star over many years, even decades.
<h1>Are Jupiter-like planets rare?</h1>
<a href="http://arxiv.org/abs/1512.00417">In a recent paper</a>, Dominick Rowan, a high school senior from New York, and his coauthors (including astronomers from the University of Texas, the University of California at Santa Cruz and me) analyzed the Doppler data for more than 1,100 stars. Each star was observed with the <a href="http://www.keckobservatory.org/">Keck Observatory telescope</a> in Hawaii; many of them had been monitored for a decade or more. To analyze the data, he used the <a href="https://www.r-project.org">open-source statistical environment R</a> together with a freely available application that I developed, called <a href="http://www.stefanom.org/systemic">Systemic</a>. Many universities use an <a href="http://www.stefanom.org/systemic-live">online version</a> to teach how to analyze astronomical data.

Our team studied the available data for each star and calculated the probability that a Jupiter-like planet could have been missed – either because not enough data are available, or because the data are not of high enough quality. To do this, we simulated hundreds of millions of possible scenarios. Each was created with a computer algorithm and represents a set of alternative possible observations. This procedure makes it possible to infer how many Jupiter analogs (both discovered and undiscovered) orbited the sample of 1,100 stars.
<img src="https://62e528761d0685343e1c-f3d1b99a743ffa4142d9d7f1978d9686.ssl.cf2.rackcdn.com/files/105134/width668/image-20151209-15552-1nqxyfv.png" alt="Orbit of the newly discovered Jupiter-mass planet orbiting the star HD 32963, compared to the orbits of Earth and Jupiter around the sun." />
<div class="caption">Orbit of the newly discovered Jupiter-mass planet orbiting the star HD 32963, compared to the orbits of Earth and Jupiter around the Sun.</div>

While carrying out this analysis, we discovered a <a href="http://exoplanet.eu/catalog/hd_32963_b/">new Jupiter-like planet</a> orbiting HD 32963, which is a star very similar to the sun in terms of age and physical properties. To make this discovery, we analyzed each star with an automated algorithm that tried to uncover periodic signals potentially associated with the presence of a planet.

We pinpointed the frequency of Jupiter analogs across the survey at approximately 3%. This result is broadly consistent with previous estimates, which were based on a smaller set of stars or a different discovery technique. It greatly strengthens earlier predictions because we took <em>decades</em> of observations into account in the simulations.

This result has several consequences. First, the relative rarity of Jupiter-like planets indicates that true solar system analogs should themselves be rare. By extension, given the important role that Jupiter played at all stages of the formation of the solar system, Earth-like habitable planets with similar formation history to our solar system will be rare.

Finally, it also underscores that Jupiter-like planets do not form as readily around stars as other types of planets do. It could be because not enough solid material is available, or because these gas giants migrate closer to the central stars very efficiently. <a href="http://astrobites.org/2015/08/18/giant-planets-from-far-out-there/">Recent planet-formation simulations</a> tentatively bear out the latter explanation.

Long-running, ongoing surveys will continue to help us understand the architecture of the outer regions of planetary systems. Programs including the Keck planet search and the <a href="http://arxiv.org/abs/1512.02965">McDonald Planet Search</a> have been accumulating data for decades. Discovering ice giants similar to Uranus and Neptune will be even tougher than tracking down these Jupiter analogs. Because of their long orbital periods (84 and 164 years) and the very small Doppler shifts they induce on their central stars (tens of times smaller than a Jupiter-like planet), the detection of Uranus and Neptune analogs lies far in the future.

This article was originally published on <a href="http://theconversation.com">The Conversation</a>. Read the <a href="https://theconversation.com/rarity-of-jupiter-like-planets-means-planetary-systems-exactly-like-ours-may-be-scarce-52116">original article</a>.