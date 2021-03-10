---
layout: page
title: Resume
permalink: /resume/
---
<div class="float-right">
<!--
Downloadable resume coming back soon!
<a class="more" href="/meschiari_resume.pdf">Download PDF</a>
-->
</div>


<h1 class="name">Stefano Meschiari, Ph.D.</h1>
<h2 class="subtitle">Data Science Technical Lead, Duo Security</h2>
<hr>
<div class="links">
<a href="mailto:stefano.meschiari@gmail.com" class="ui circular button"><i class="mail outline icon"></i> stefano.meschiari@gmail.com</a>
<a href="https://github.com/stefano-meschiari" class="ui circular button"><i class="github icon"></i> GitHub</a>
<a href="https://www.linkedin.com/in/stefano-meschiari-46966242/" class="ui circular button"><i class="linkedin icon"></i> LinkedIn</a>
</div>
<hr>

I am an experienced data scientist with a background in scientific research. I have worked on projects that involved  researching new algorithms and approaches to attacking hard problems, analyzing complex, label-poor datasets, building novel production ETL and ML platforms, helping to bring intelligent capabilities to fruition for users, and creating functional data tooling. I am comfortable with bootstrapping new ideas, and figuring out how to chip away at uncertainty, clarify and better define the solution space, and measure success.

I enjoy working with cross-functional teams to create, polish, and evolve from napkin ideas to production. In particular, I love collaborating with product and design teams to coherently integrate data science into their vision, and helping them test out new concepts and visualizations with data science-driven prototypes and customer discovery.

<div class="ui divider"></div>

### Experience
{% for job in site.data.jobs %}
<div class="ui segment {{job.emphasis}}">
<div class="ui divided grid">
  <div class="four wide column">
      <h4>{{job.title}}</h4>
      <h5>{{job.period}}</h5>
      {% if job.title2 %}
      <br>
      <h4>{{job.title2}}</h4>
      <h5>{{job.period2}}</h5>
      {% endif %}
      <br>

      <div class="links">
          <a href="{{templjobate.company_link}}" target="_blank">{{job.company}}</a>
      </div>
  </div>
  <div class="twelve wide column">
      {{ job.description | markdownify }}
  </div>

</div>
</div>
{% endfor %}

<div class="ui divider"></div>

### Technical Skills
* **Machine Learning**: Building supervised & unsupervised classification and regression pipelines via state of the art and custom algorithms; devising high-performance statistical and numerical methods that run in production clusters; time series analysis and forecasting; architecting high-volume ETL and machine learning pipelines.
* **Software engineering**: Building projects from prototypes to production using R, Scala, Python, JavaScript, Java, and C. Experienced in using SQL. Experienced in building functional front-end prototypes.
* **Soft skills**: Cross-team collaboration, project management, and leadership; mentoring and advising.

<div class="ui divider"></div>

### Education
* 2012 -- **Doctor of Philosophy** (Astronomy & Astrophysics), University of California at Santa Cruz. Received Whitford Prize for highest achievement in research, coursework, and teaching.
* 2006 -- **Master of Science** (Astronomy, with highest honors), University of Bologna
* 2004 -- **Bachelor of Science** (Astronomy, with highest honors), University of Bologna

<div class="ui divider"></div>

### Publications, Academic Honors and Awards
* Published 8 first-author publications on time series analysis, numerical optimization, and Monte-Carlo simulations  (cited 224 times); a total of 17 refereed papers (cited 992 times). See [research page](/research).
* 2014 -- Meschiari, S. (PI), Ludwig, R., Green, J., *Interactive Education Tools in the Public Square* (Award: $2,800, for creating an interactive outreach experience); *Bringing the Tools of Research Direct to the UT Classroom: Systemic, a Virtual Lab for Students* (Award: $87,710)
* 2010 -- *Award for Excellence in Teaching*
* 2008 -- *Whitford Prize* for graduate academic performance
* 2006 -- *Regents' Fellow*, University of California
