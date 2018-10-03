var flash = require('connect-flash');

exports.home = function(req, res) {
    res.redirect('/api/restaurants');

}
