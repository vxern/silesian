import sources from "$lib/constants/sources";
import exampleDefinitions from "$lib/constants/example-definitions";

function getSource(identifier) {
  return sources[identifier];
}

function isSource(identifier) {
  return !!getSource(identifier);
}

function getExampleDefinition(identifier) {
  return exampleDefinitions[identifier];
}

export { getSource, isSource, getExampleDefinition }