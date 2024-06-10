---
layout: page
title: Posts
permalink: /posts/
order: 1
---

On this page, all blog posts, presentations and other updates are listed. 

{%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
{%- if site.categories.post.size > 0 -%}
  <br><br>

  <h2 class="post-list-heading">Posts</h2>
  <ul class="post-list">
      {%- for post in site.categories.post -%}
        {% if post.publish == true %}
          <li>
            {%- assign formatted_date = post.date | date: date_format -%}
            {% unless formatted_date == "Jan 1, 2000" %}
              <span class="post-meta">{{ formatted_date }}</span>
            {% endunless %}
            <h3>
              <a class="post-link" href="{{ post.url | relative_url }}">
                {{ post.title | escape }}
                {% if post.ongoing == true %}
                  <span class = "ongoing">(Ongoing)</span>
                {% endif %}
              </a>
            </h3>
            {%- if site.show_excerpts -%}
              {{ post.excerpt }}
            {%- endif -%}
          </li>
        {% endif %}
      {%- endfor -%}
  </ul>
{%- endif -%}

{%- if site.categories.trivia.size > 0 -%}
  <br><br>

  <h2 class="post-list-heading">Trivia</h2>
  <ul class="post-list">
    {%- for post in site.categories.trivia -%}
      {% if post.publish == true %}
        <li>
          {%- assign formatted_date = post.date | date: date_format -%}
          {% unless formatted_date == "Jan 1, 2000" %}
            <span class="post-meta">{{ formatted_date }}</span>
          {% endunless %}
          <h3>
            <a class="post-link" href="{{ post.url | relative_url }}">
              {{ post.title | escape }}
              {% if post.ongoing == true %}
                <span class = "ongoing">(Ongoing)</span>
              {% endif %}
            </a>
          </h3>
          {%- if site.show_excerpts -%}
            {{ post.excerpt }}
          {%- endif -%}
        </li>
      {% endif %}
    {%- endfor -%}
  </ul>
{%- endif -%}

{%- if site.categories.talk.size > 0 -%}
  <br><br>

  <h2 class="post-list-heading">Talks and presentations</h2>
  <ul class="post-list">
    {%- for post in site.categories.talk -%}
      {% if post.publish == true %}
        <li>
          {%- assign formatted_date = post.date | date: date_format -%}
          {% unless formatted_date == "Jan 1, 2000" %}
            <span class="post-meta">{{ formatted_date }}</span>
          {% endunless %}
          <h3>
            <a class="post-link" href="{{ post.url | relative_url }}">
              {{ post.title | escape }}
              {% if post.ongoing == true %}
                <span class = "ongoing">(Ongoing)</span>
              {% endif %}
            </a>
          </h3>
          {%- if site.show_excerpts -%}
            {{ post.excerpt }}
          {%- endif -%}
        </li>
      {% endif %}
    {%- endfor -%}
  </ul>
{%- endif -%}

<br><br>

<h2 class="post-list-heading">Upcoming posts</h2>

<ol>
{% for post in site.posts %}
  {% if post.publish == false %}
    <li>{{ post.title }} ({{- post.categories | first | capitalize -}})</li>
  {% endif %}
{% endfor %}
</ol>

<br><br>

<h2 class="post-list-heading" id = "Index">Index</h2>

{% assign def_array = "" | split: "," %}
{% assign link_array = "" | split: "," %}
{% for post in site.posts %}
  {% assign filename = post.path | split: "/" | last | split: "." | first %}
  {% if post.defs %}
    {% for def in post.defs %}
      {% assign item = def | append: "|" | append: post.url %}
      {% assign def_array = def_array | push: item %}
    {% endfor %}
  {% endif %}
{% endfor %}

{% assign def_array = def_array | sort %}
{% assign counter = 0 %}

<div id = "index">
  <div id = "left">
      {% assign alphabet = "ABCDEFGHIJKLM" | split: "" %}
      <ul>
      {% for letter in alphabet %}
        <li>{{ letter }}</li>
        <ul>
          {% for def in def_array %}
            {% assign def_split = def | split: "" %}
            {% if def_split[0] == letter %}
              {% assign value = def | split: "|" | first %}
              {% assign postlink = def | split: "|" | last %}
              <li><a href = "{{ postlink }}#{{ value | replace: " ", "" }}">{{ value }}</a></li>
              {% assign counter = counter | plus: 1 %}
            {% endif %}
          {% endfor %}
        </ul>
      {% endfor %}
      </ul>
  </div>

  <div id = "right">
      {% assign alphabet = "NOPQRSTUVWXYZ" | split: "" %}
      <ul>
        {% for letter in alphabet %}
          <li>{{ letter }}</li>
          <ul>
          {% for def in def_array %}
            {% assign def_split = def | split: "" %}
            {% if def_split[0] == letter %}
              {% assign value = def | split: "|" | first %}
              {% assign postlink = def | split: "|" | last %}
              <li><a href = "{{ postlink }}#{{ value | replace: " ", "" }}">{{ value }}</a></li>
              {% assign counter = counter | plus: 1 %}
            {% endif %}
          {% endfor %}
          </ul>
        {% endfor %}
      </ul>
  </div>
</div>