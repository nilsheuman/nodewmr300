var path      = require('path');
var settings  = require('../settings.json');

settings.path = path.normalize(path.join(__dirname, '..'));
settings.device = process.argv[2] || settings.device;


module.exports = settings;
