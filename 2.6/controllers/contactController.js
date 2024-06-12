const path = require('path');
const rootDir = require('../util/path');

exports.getContactForm = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contact.html'));
};

exports.postContactForm = (req, res, next) => {
    console.log(req.body);
    res.redirect('/success');
};
