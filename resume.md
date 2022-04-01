---
layout: page
title: Resume
permalink: /resume/
---
<a href="/files/meschiari_cv.pdf" class="ui button right floated">Download PDF</a>
<h1 class="name">Stefano Meschiari, Ph.D.</h1>
<h2 class="subtitle">Data Scientist</h2>


I am an experienced Data Scientist with a background in scientific research. As a Data Science leader, I work cross-functionally to create, evolve, and deliver data science solutions that are practical, usable, and trustworthy. I ensure success by fostering alignment across Product, Design, and Engineering, tearing down communication barriers and semantic gaps, and advocating for customer value. I lead teams through the full research and development lifecycle, while supporting individuals’ professional growth.

<hr>
<div class="links">
<a href="mailto:stefano.meschiari@gmail.com" class="ui circular button"><i class="mail outline icon"></i> stefano.meschiari@gmail.com</a>
<a href="https://github.com/stefano-meschiari" class="ui circular button"><i class="github icon"></i> GitHub</a>
<a href="https://www.linkedin.com/in/stefano-meschiari-46966242/" class="ui circular button"><i class="linkedin icon"></i> LinkedIn</a>
</div>

<div class="ui divider"></div>

### Skills
* **Machine Learning**: Building supervised and unsupervised classification and regression pipelines via state of the art and custom algorithms; devising high-performance statistical and numerical methods; time series analysis and forecasting.
* **Data Science and Engineering**: Architecting high-volume ETL and machine learning pipelines on AWS EMR using Spark, SparkML and H2O. Building components from MVP to production using R, Scala, Python, SQL, JavaScript, Java, and C. Creating interactive tools and reproducible research reports for company-wide consumption.
* **Leadership**: Mentoring peers from junior to senior positions. Scoping complex tasks, evaluating risk and impact, and acting as a data advocate across multiple teams. Researching knotty problems with curiosity and rigor. Designing technical interviews. Explaining complex concepts to stakeholders with clarity and empathy. Creating knowledge value via clear presentations, technical reports, and workshops.

<div class="ui divider"></div>

### Experience
{% for job in site.data.jobs %}
<div class="ui segment {{job.emphasis}}">
<div class="ui divided grid">
  <div class="four wide column">
      {% for title in job.titles %}
      <h4>{{title.title}}</h4>
      <h5>{{title.period}}</h5>
      <br>
      {% endfor %}

      <div class="links">
          <a href="{{job.company_link}}" target="_blank">{{job.company}}</a>
      </div>
  </div>
  <div class="twelve wide column">
      {{ job.description | markdownify }}
  </div>

</div>
</div>
{% endfor %}



<div class="ui divider"></div>

### Education
* 2012 -- **Doctor of Philosophy** (Astronomy & Astrophysics), University of California at Santa Cruz. Received Whitford Prize for highest achievement in research, coursework, and teaching.
* 2006 -- **Master of Science** (Astronomy, with highest honors), University of Bologna
* 2004 -- **Bachelor of Science** (Astronomy, with highest honors), University of Bologna

<div class="ui divider"></div>

### Publications, Academic Honors and Awards
* Published 8 first-author refereed publications on time series analysis, optimization, and physical
simulations (cited 437 times); a total of 17 refereed publications (cited 1,444 times). See [research page](/research).
* 2014 -- Meschiari, S. (PI), Ludwig, R., Green, J., *Interactive Education Tools in the Public Square* (Award: $2,800, for creating an interactive outreach experience); *Bringing the Tools of Research Direct to the UT Classroom: Systemic, a Virtual Lab for Students* (Award: $87,710)
* 2010 -- *Award for Excellence in Teaching*
* 2008 -- *Whitford Prize* for graduate academic performance
* 2006 -- *Regents' Fellow*, University of California
