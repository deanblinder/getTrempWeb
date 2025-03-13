module.exports = {
  i18n: {
    defaultLocale: "he",
    locales: ["en", "he"],
    localeDetection: true,
  },
  localePath: "./src/locales",
  defaultNS: "common",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
