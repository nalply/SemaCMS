SemaCMS = (function () {
  var SemaCMS = {}

  var settings = (Meteor.settings || {}).public || {}
  settings = settings.SemaCMS || {}

  var collection = settings.fieldsCollection || "fields"
  var publish = settings.fieldsPublish || "fields"
  var cmsHelper = settings.cmsHelper || "cms"
  var cmsFieldHelper = settings.cmsFieldHelper || "cmsField"


  // add parameter { versioning: true } to get all versions
  Meteor.subscribe(publish)
  console.info("SemaCMS: Subscribed %s => %s.", collection, publish)


  // {{cms.<fieldKey>}} to render the CMS field's content.
  // {{cms key}} to render the content of the field with key.
  Handlebars.registerHelper(cmsHelper, function(key) {
    var cms = SemaCMS.getCMS()
    if (key && cms[key]) {
      SemaCMS.Deps[key].depend()
      return SemaCMS.filter(cms[key])
    }

    // _.pluck(fields, 'content') for objects and also dep.depend().
    function keyContent(field, key) {
      SemaCMS.Deps[key].depend() 
      return [key, SemaCMS.filter(field)] 
    }
    return _.object(_.map(cms, keyContent))
  })


  // {{cmsField.<fieldKey>.<property>}} to use a field's property.
  // {{cmsField key property}}  to use the property of the field with key.
  Handlebars.registerHelper(cmsFieldHelper, function(key, property) {
    var cms = SemaCMS.getCMS()
    return key && cms[key] && property ? cms[key][property] : cms
  })

  console.info("SemaCMS: Registered Handlebars helpers %s and %s.", 
    cmsHelper, cmsFieldHelper)


  SemaCMS.Fields = new Meteor.Collection(collection)

  SemaCMS.Deps = {}

  SemaCMS.createDep = function(key) {
    if (!SemaCMS.Deps[key]) SemaCMS.Deps[key] = new Deps.Dependency
  }

  SemaCMS.getCMS = function(criteria) {
    var fields = SemaCMS.Fields.find(criteria || {}).fetch()
    _.each(fields, function(field) { SemaCMS.createDep(field.key) })

    // Map field array to an object with fields.key as keys.
    function keyField(field) { return [field.key, field] }
    return _.object(_.map(fields, keyField))
  }

  var filters = {}

  // filter(field) returns the field's filtered content
  SemaCMS.registerFilter = function(type, filter) {
    filters[type] = filter
    console.log(SemaCMS.getCMS({"type": type}))
    _.each(SemaCMS.getCMS({"type": type}), function(field) {
      console.info("dep.changed() for " + field.key)
      SemaCMS.Deps[field.key].changed()
    })
  }

  SemaCMS.filter = function(field) {
    var filter = filters[field.type]
    console.info("filter for key %s: %s", field.key, filter)
    return filter ? filter(field) : field.content
  }

  console.info("SemaCMS: Ready.")
  return SemaCMS
})()
