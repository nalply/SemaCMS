# SemaCMS - minimal theme-less embedded CMS as a Meteor package

The project is in an early stage. There is no backend yet.

Wordpress and similar other CMS suffer that theming can be difficult. One writes a theme, but to get the theme working you have force round pegs through square holes. Processwire is a CMS which seems to work the other way round. There is no theme. One just writes the server application in HTML and invokes a PHP API.

SemaCMS takes this idea: It works within a Meteor application. SemaCMS is a Meteor package. There are two Handlebar helper `cms` and `cmsField` which can be used everywhere in a template. The former inserts the content of a CMS field, the latter makes the attributes of a CMS field available. A short example:

```html
<template name="example">
  <div id="content_{{fieldKey}}">
    {{cms fieldKey}} 
  </div>

  <div id="field_example">
    <h1>CMS field with key «example»</h1>
    <div class="type">Field type: {{cmsField.example.type}}</div>
    <div class="path">Field path: {{cmsField.example.path}}</div>
    <div class="content">Content: {{cmsField.example.content}}</div>
  </div>
</div>
```

The content of the CMS is organized in an hierarchy of **fields**. Each field has an unique **key**, versions and languages, and a type. The type defines a validator function, the backend editor and an output filter.

## Installation

Todo.
