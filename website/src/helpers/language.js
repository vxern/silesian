
const localeToFlag = {
  szl: "szl",
  pl: "pl",
  cs: "cz",
  sk: "sk",
  de: "de",
  "en-GB": "gb",
};

export function getFlag(locale) {
  return localeToFlag[locale];
}
