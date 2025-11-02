import sources from "$lib/constants/sources";
import exampleContents from "$lib/constants/example-contents";

function compareLicence(a, b) {
  if (a === b) {
    return 0;
  }

  if (!a) {
    return -1;
  } else if (!b) {
    return 1;
  }

  if (a === "proprietary") {
    return -1;
  } else if (b === "proprietary") {
    return 1;
  }

  if (a === "granted") {
    return -1;
  } else if (b === "granted") {
    return 1;
  }

  if (a === "public") {
    return -1;
  }

  return compareName(a, b);
}

function compareAccess(a, b) {
  if (a === b) {
    return 0;
  }

  if (!a) {
    return -1;
  } else if (!b) {
    return 1;
  }

  if (a === "closed") {
    return -1;
  } else if (b === "closed") {
    return 1;
  }

  if (a === "limited") {
    return -1;
  } else if (b === "limited") {
    return 1;
  }

  return 0;
}

function compareProgress(a, b) {
  if (a === b) {
    return 0;
  }

  if (!a) {
    return -1;
  } else if (!b) {
    return 1;
  }

  const completionA = completion(a);
  const completionB = completion(b);

  if (Number.isNaN(completionA) && Number.isNaN(completionB)) {
    return 0;
  } else if (Number.isNaN(completionA)) {
    return -1;
  } else if (Number.isNaN(completionB)) {
    return 1;
  }

  if (completionA > completionB) {
    return 1;
  } else if (completionA < completionB) {
    return -1;
  }

  if (a.total < b.total) {
    return 1;
  } else if (a.total > b.total) {
    return -1;
  } else {
    return 0;
  }
}

function compareName(a, b) {
  return b.localeCompare(a, "pl", { sensitivity: "base" });
}

function compareAuthors(a, b) {
  if (!a && !b) {
    return 0;
  } else if (!a) {
    return -1;
  } else if (!b) {
    return 1;
  }

  return a.length > b.length ? 1 : -1;
}

function completion(progress) {
  if (progress.total === 0) {
    return 1;
  }

  return progress.imported / progress.total;
}

function getSource(identifier) {
  return sources[identifier];
}

function isSource(identifier) {
  return !!getSource(identifier);
}

function getExampleContents(identifier) {
  return exampleContents[identifier];
}

export { compareLicence, compareAccess, compareProgress, compareName, compareAuthors, completion, getSource, isSource, getExampleContents }