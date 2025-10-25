import sources from "$lib/constants/sources";

function getSource(identifier) {
  return sources[identifier];
}

export { getSource }