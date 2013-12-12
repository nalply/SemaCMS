Package.describe({
  summary: "Embedded theme-less bare-bone CMS"
});

Package.on_use(function (api) {
	api.use(['handlebars', 'templating'], 'client');

  api.add_files(
  	[
  	  "fields.js",
  	  "template.html",
  	],
  	"client"
  );

  api.add_files("collections.js", "server");
  
  api.export('SemaCMS');

  console.info("SemaCMS package (re-)loaded.");
});
