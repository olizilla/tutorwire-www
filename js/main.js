require("./vendor/leaflet.awesome-markers")
require("./vendor/typeahead")
require("./vendor/jquery.validationEngine")
require("./vendor/jquery.validationEngine-en")

$('body.home').each(function () { require("./home") })
$('body.join').each(function () { require("./join") })
$('body.learn').each(function () { require("./learn") })
$('body.tutor').each(function () { require("./tutor") })