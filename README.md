Tutor Wire - Frontend [![Dependency Status](https://david-dm.org/olizilla/tutorwire-www.png)](https://david-dm.org/olizilla/tutorwire-www) [![devDependency Status](https://david-dm.org/olizilla/tutorwire-www/dev-status.png)](https://david-dm.org/olizilla/tutorwire-www#info=devDependencies)
=========================

**An experiment in build time compilation of static html, with all the moving parts and dynamism powered by JS after page load**

Uses:
- [Handlebars] - Simple templating for pages, layouts and partials.
- [Assemble] - Merging all the htmls into a real website in _dist 
- [Browserify] - Node style module require for the frontend
- [Grunt] - The task runner that brings it all together with a `grunt`

[Handlebars]: http://handlebarsjs.com/
[Assemble]: https://github.com/assemble/assemble
[Browserify]: http://browserify.org/
[Grunt]: http://gruntjs.com/

Running
---

Use the [forever](https://npmjs.org/package/forever) module to start the process as a daemon: 

```sh
NODE_ENV=xxx forever start index.js
```

Where `NODE_ENV` corresponds to the name of the config file you want to use.