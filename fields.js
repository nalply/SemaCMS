var settings = (Meteor.settings || {}).public || {}
var settingsSemaCMS = settings.SemaCMS || {}
var collectionName = settingsSemaCMS.fieldsCollectionName || "fields"
var publishName = settingsSemaCMS.fieldsPublishName || "fields"
var cmsContentHelperName = settingsSemaCMS.cmsContentHelperName || "cms"
var cmsFieldHelperName = settingsSemaCMS.cmsFieldHelperName || "cmsField"

console.info("Subscribe collection %s under %s", collectionName, publishName)
console.info("Register handlebar helpers %s and %s", 
	cmsContentHelperName, cmsFieldHelperName)


Meteor.subscribe(publishName) 
// add parameter { versioning: true } to get all versions

SemaCMS = {
	  Fields: new Meteor.Collection(collectionName)
  , getCMS: function(criteria) {
			var fields = SemaCMS.Fields.find(criteria || {}).fetch()

      // Map field array to an object with fields.key as keys.
			// The root field's key is empty. Use $ instead.  v
			function key_field(field) { return [field.key || '$', field] }
			return _.object(_.map(fields, key_field))
		}
}


// {{cms.<fieldKey>}} to render the CMS field's content.
// {{cms key}} to render the content of the field with key.
Handlebars.registerHelper(cmsContentHelperName, function(key) {
	var cms = SemaCMS.getCMS()
	if (key && cms[key]) return cms[key].content;

	// Object _.pluck(fields, 'content')
	function key_fieldcontent(field, key) { return [key, field.content] }
	return _.object(_.map(cms, key_fieldcontent))
})


// {{cmsField.<fieldKey>.<property>}} to use a field's property.
// {{cmsField key property}}  to use the property of the field with key.
// Examples: {{cmsField.child.}}
Handlebars.registerHelper(cmsFieldHelperName, function(key, property) {
	var cms = SemaCMS.getCMS();
	return key && cms[key] && property ? cms[key][property] : cms;
})

// Todo does not work:
// {{cmsField.<property> key}}