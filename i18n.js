const i18n = require('i18n');

i18n.configure({
    locales: ['en', 'vi'],
    directory: __dirname + '/locales',
    defaultLocale: 'en',
    objectNotation: true
});

// Ensure 'locale' property is set in the i18n object
i18n.locale = i18n.defaultLocale;

i18n.setLocaleFromCookie = (req) => {
    const { cookies } = req;
    const selectedLocale = cookies.locale || i18n.defaultLocale;
    i18n.locale = selectedLocale;  // Update the 'locale' property
};

module.exports = i18n;
