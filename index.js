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

//console.log('Current locale: ', i18n.getLocale());

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

const http = require('http');
const httpProxy = require('http-proxy');
const targetHost = 'localhost';
const targetPort = 3000;


const proxy = httpProxy.createProxyServer({
  target: `http://${targetHost}:${targetPort}`
});

const server = http.createServer((req, res) => {
  proxy.web(req, res);
});

/* server.listen(3000, () => {
    console.log('Proxy server listening on port 3000');
}); */

app.listen(PORT, () => {
    //console.log(`Server is running on port ${PORT}`);
});
