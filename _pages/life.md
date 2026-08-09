---
title: "生活"
layout: archive
permalink: /life/
author_profile: true
comments: false
---

{% assign life_posts = site.posts | where: "section", "生活" %}
{% if life_posts.size > 0 %}
  {% for post in life_posts %}
    {% include archive-single.html %}
  {% endfor %}
{% endif %}

{% if site.photography.size > 0 %}
  {% for post in site.photography reversed %}
    {% include archive-single.html %}
  {% endfor %}
{% endif %}

{% if life_posts.size == 0 and site.photography.size == 0 %}
暂无内容。
{% endif %}
