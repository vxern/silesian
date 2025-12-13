const countryToFlag = {
  poland: "pl",
  czechia: "cz",
  germany: "de",
  slovakia: "sk",
};

export function getFlag(locale) {
  return countryToFlag[locale];
}
