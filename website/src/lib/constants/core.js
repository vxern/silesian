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
    // Nasals
    {
      colours: "text-yellow-400",
      letters: [
        "ã",
        "ĩ",
        "õ",
        "õ̱",
        "ũ",
        "ỹ",
      ],
    },
    // Vł (oł, eł)
    {
      colours: "text-blue-400",
      letters: [
        "ŏ",
        "ĕ",
      ],
    },
    // łV (ło, łō)
    {
      colours: "text-green-400",
      letters: [
        "ô",
        "ô̱",
      ],
    },
    // Polish
    {
      colours: "text-red-400",
      letters: [
        "ć",
        "ś",
        "ź",
        "ń",
        "ł",
        "ż",
      ],
    },
  ],
  subdomains: {
    dictionary: "http://dictionary.localhost",
    thesaurus: "http://thesaurus.localhost",
    translate: "http://translate.localhost",
    map: "http://map.localhost",
    guide: "http://guide.localhost",
    resources: "http://resources.localhost",
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