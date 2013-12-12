var settings = (Meteor.settings || {}).public || {}
settings = settings.SemaCMS || {}
var collection = settings.fieldsCollection || "fields"
var publish = settings.fieldsPublish || "fields"

Fields = new Meteor.Collection(collection)
Meteor.publish(publish, function(options) {
	var versioning = (options || {}).versioning
	return Fields.find(versioning ? {} : { published: true })
})

console.info("SemaCMS: Published %s => %s", collection, publish)
