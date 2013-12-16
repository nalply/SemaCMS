# SemaCMSe

###A barebone theme-less embedded CMS as a Meteor package

**Note:** The project is in an early stage. There is no backend yet.

Theming for Wordpress and similar other CMS can be difficult. One develops a theme, but the devil is in the detail. You have quite to force round pegs into square holes. The CMS Processwire has a different approach. There is no theme. One just writes the server application in HTML and invokes a PHP API to embed content. The content re-uses the application theming.

SemaCMS steals this idea from Processwire. SemaCMS is just a Meteor package and shares the database with the application by using an additional collection `cms` (the name is configurable). There are two Handlebar helper `cms` and `cmsField` to embed content and metadata in templates. A short example:

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
</template>
```

The content of the CMS is organized in documents called **fields**. Each field has an unique **key**, versions, languages and a type. The type defines a validator function, the backend editor and an output filter.

## Usage

### Embed a field with key 'key'

```html
<template name="example">
  {{cms 'key'}}
</template>
```

or

```html
<template name="example">
  {{cms.key}}
</template>
```

### Display the type of a field with 'key'

```html
<template name="example">
  {{cmsField 'key' 'type'}}
</template>
```

or

```html
<template name="example">
  {{cmsField.key.type}}
</template>
```

### Register a filter for a field type

```javascript
SemaCMS.registerFilter('type', function(field) {
  return yourFilter(field.content)  
})
```

Note that if you have HTML markup, you need `new Handlebars.SafeString()` in your filter function. The default filter for the type `richtext` does this for you.

### Register a backend for a field type

It's planned to use a third-party WYSIWYG editor component for the texts. Depending on the type the editor is configured differently, for example for plain texts there are no formatting buttons.

Exact details: Todo.

### Register a validator for a field type

It's planned for types like numbers. The validator prevents the storing of a non-number in a number field.

Exact details: Todo.

### Register a backend allow callback

It's planned to callback when a template containing a backend is rendered. By default everybody can edit the fields. The callback is given the user ID and the field key and returns a truthy value if the user is allowed to edit that field.

Exact details: Todo.

## Installation

It's planned that a getting started text is set up automatically the first time SemaCMS is used.

Exact details: Todo.
