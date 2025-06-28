---
layout: post
title:  "Climbing in Fontainebleau"
date:   2025-04-22
categories: trivia
publish: yes

---

<center>

    {% for image in site.static_files %}
        {% if image.path contains 'Extra/Font25' %}
            <img src = "{{ image.path }}" alt = "Fontainebleau 2025"><br>
        {% endif %}
    {% endfor %}

</center>