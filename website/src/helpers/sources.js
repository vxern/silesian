import sources from "$lib/constants/sources";
import exampleData from "$lib/constants/example-data";

function getSource(identifier) {
  return sources[identifier];
}

function isSource(identifier) {
  return !!getSource(identifier);
}

function getExampleData(identifier) {
  return exampleData[identifier];
}

export { getSource, isSource, getExampleData }