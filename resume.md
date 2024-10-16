---
layout: page
title: Resume
permalink: /resume/
---
<a href="/files/meschiari_cv.pdf" class="ui button right floated">Download Resume (PDF)</a>
<h1 class="name">Stefano Meschiari, Ph.D.</h1>
<h2 class="subtitle">Data Scientist</h2>


I am an experienced Data Scientist with a background in scientific research. As a Data Science leader with more than 8 years’ experience, I use data and algorithms to deliver solutions that are practical, durable, and trustworthy. I bring a scientific mindset, rigorous craft, and people-first attitude to every team I join. I thrive on cross-functional projects that require strong leadership across many teams and quarters.

<hr>
<div class="links">
<a href="mailto:stefano.meschiari@gmail.com" class="ui circular button"><i class="mail outline icon"></i> stefano.meschiari@gmail.com</a>
<a href="https://github.com/stefano-meschiari" class="ui circular button"><i class="github icon"></i> GitHub</a>
<a href="https://www.linkedin.com/in/stefano-meschiari-46966242/" class="ui circular button"><i class="linkedin icon"></i> LinkedIn</a>
</div>

<div class="ui divider"></div>

### Skills
* **Machine Learning** (supervised and unsupervised classification and regression; fraud detection; custom ML algorithms development; high-performance numerical algorithms; applied ML research in the security and fraud space)
* **Data and Software Engineering** (high-volume ETL and ML pipelines on AWS and Databricks; data products for BI/internal analysis; web-based applications and games; open-source development; Spark/SparkML, H2O, Python, Java, Scala, C, JavaScript, React)
* **Data Science and Analysis** (causal inference and A/B testing; dashboards, tooling, and reproducible reports for executive decision-making; Python, R, SQL, Streamlit, Shiny, Databricks)
* **Team Leadership** (mentoring junior teammates to senior positions; scoping complex timelines and deliverables, evaluating risk and impact, and acting as a data advocate across multiple teams; distilling complex concepts to stakeholders and users)

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
