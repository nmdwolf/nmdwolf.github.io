---
layout: post
title:  "Olympic Games: Paris 2024"
date:   2024-09-08
categories: trivia
publish: yes

---

In 2024, the Olympic Games took place in Paris, so we had to be there. To nobody's surprise, we went to see the boulder and lead climbing competition. Since we were in the vicinity anyway, we also went for an outdoor boulder session in Fontainebleau.

<center>

    {% for image in site.static_files %}
        {% if image.path contains 'Extra/OlympicGames24' %}
            <img src = "{{ image.path }}" alt = "Olympic Games: Paris 2024"><br>
        {% endif %}
    {% endfor %}

</center>