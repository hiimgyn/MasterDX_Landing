const express = require('express');
const path = require('path');
const i18n = require('./i18n');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(i18n.init); // Initialize i18n middleware

app.use(express.static(path.join(__dirname, 'views', 'assets')));

app.use(cookieParser());

app.use((req, res, next) => {
    i18n.setLocaleFromCookie(req);
    next();
});

app.get('/setLanguage/:locale', (req, res) => {
    const { locale } = req.params;
    if (i18n.getLocales().includes(locale)) {
        res.cookie('locale', locale);
    }
    res.redirect('back');
});

app.get('/', (req, res) => {
    ejs.renderFile(path.join(__dirname, 'views/index.ejs'), { i18n }, (err, html) => {
        if (err) {
            return res.status(500).send('Error rendering HTML.');
        }
        res.send(html);
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;