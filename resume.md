---
layout: page
title: Resume
permalink: /resume/
---
<a href="/files/cv.pdf" class="ui button right floated">Download PDF</a>
<h1 class="name">Stefano Meschiari, Ph.D.</h1>
<h2 class="subtitle">Data Scientist</h2>


I am an experienced data scientist with a background in scientific research. I have worked on projects that involved researching new algorithms and creative approaches to attack hard problems; analyzing complex, label-poor datasets and extracting meaningful patterns to guide decision-making; building novel production ETL and ML platforms; helping to bring ML-powered product capabilities to fruition for users; and creating functional data tooling and APIs.

I enjoy working with cross-functional teams to create, iterate, and deliver from idea, to MVP, to production. In particular, I love collaborating with product and design teams to coherently integrate data science into their vision, and helping them iterate fast on new concepts and ideas with data-driven prototypes and customer discovery.

<hr>
<div class="links">
<a href="mailto:stefano.meschiari@gmail.com" class="ui circular button"><i class="mail outline icon"></i> stefano.meschiari@gmail.com</a>
<a href="https://github.com/stefano-meschiari" class="ui circular button"><i class="github icon"></i> GitHub</a>
<a href="https://www.linkedin.com/in/stefano-meschiari-46966242/" class="ui circular button"><i class="linkedin icon"></i> LinkedIn</a>
</div>

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

### Technical Skills
* **Machine Learning**: Building supervised and unsupervised classification and regression pipelines via state of the art and custom algorithms; devising high-performance statistical and numerical methods; time series analysis and forecasting. Experienced with sklearn, SparkML, H2O.
* **Software engineering**: Architecting high-volume Spark ETL and machine learning pipelines on AWS EMR; building DS projects from prototypes to production using R, Scala, Python, SQL, JavaScript, Java, and C; building interactive, rich front-end prototypes.
* **Soft skills**: Mentoring and advising (references available on request); scoping complex tasks, evaluating risk and impact, and acting as a data advocate across multiple teams; working on knotty research problems with tenacity and a positive attitude; explaining complex, multivariate concepts to stakeholders with clarity and empathy.


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
