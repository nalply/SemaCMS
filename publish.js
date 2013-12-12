var settings = (Meteor.settings || {}).public || {}
var settingsSemaCMS = settings.SemaCMS || {}
var collectionName = settingsSemaCMS.fieldsCollectionName || "fields"
var publishName = settingsSemaCMS.fieldsPublishName || "fields"

console.info("Publishing collection %s under %s", collectionName, publishName)

Fields = new Meteor.Collection(collectionName)
Meteor.publish(publishName, function(options) {
	console.info("Meteor.publish() " + publishName)
	var versioning = (options || {}).versioning
	return Fields.find(versioning ? {} : { published: true })
})
