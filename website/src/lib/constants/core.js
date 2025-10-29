export default Object.freeze({
  project: {
    name: "silesian.eu",
    author: "Dorian Oszczęda",
    url: "https://silesian.eu",
    keywords: ["ślōnski", "godka", "jynzyk", "polski", "dykcjōnŏrz", "narzecza", "słowa", "nauka"],
    subject: "ślōnski słownik",
    language: "szl",
  },
  specialLetters: [
    "ã",
    "ć",
    "ł",
    "ŏ",
    "ō",
    "ô",
    "õ",
    "ń",
    "ś",
    "ź",
    "ż",
  ],
  subdomains: {
    dictionary: "http://dictionary.localhost",
    translate: "http://translate.localhost",
    map: "http://map.localhost",
    guide: "http://guide.localhost",
  },
  links: {
    github: "https://github.com/vxern/silesian.eu",
    instagram: "https://instagram.com/silesian.eu",
    x: "https://x.com/silesian.eu",
    discord: "https://discord.gg/silesian.eu",
    release: `https://github.com/vxern/silesian.eu/releases/tag/v${import.meta.env.PACKAGE_VERSION}`,
  },
  contact: {
    emailAddress: "kontakt@silesian.eu",
  },
  limits: {
    searchHistory: 21,
  },
});