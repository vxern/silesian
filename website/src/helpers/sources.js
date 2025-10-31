import sources from "$lib/constants/sources";
import exampleContents from "$lib/constants/example-contents";

function getSource(identifier) {
  return sources[identifier];
}

function isSource(identifier) {
  return !!getSource(identifier);
}

function getExampleContents(identifier) {
  return exampleContents[identifier];
}

export { getSource, isSource, getExampleContents }