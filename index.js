import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const COMMIT_MESSAGES = [
  "Improve code readability",
  "Refactor function for clarity",
  "Add missing error handling",
  "Improve input validation",
  "Refactor module for better structure",
  "Optimize performance of utility function",
  "Update documentation for clarity",
  "Add comments for maintainability",
  "Improve naming conventions",
  "Clean up unused code",
  "Refactor repetitive logic",
  "Improve async handling",
  "Simplify conditional logic",
  "Enhance logging for debugging",
  "Standardize formatting",
  "Improve test coverage",
  "Add unit tests for edge cases",
  "Refactor to reduce complexity",
  "Improve type safety",
  "Convert function to async",
  "Improve config structure",
  "Refactor middleware pipeline",
  "Add safeguards for null values",
  "Improve error messages",
  "Adjust linting rules",
  "Fix race condition in async task",
  "Enhance environment handling",
  "Improve caching strategy",
  "Refactor API helpers",
  "Improve directory structure",
  "Adjust debounce/throttle timings",
  "Improve build script reliability",
  "Refactor to follow best practices",
  "Improve dependency injection",
  "Enhance modularization",
  "Break larger function into smaller parts",
  "Add validation to API requests",
  "Improve state handling",
  "Clean up temporary logs",
  "Improve configuration defaults",
];

const markCommit = (x, y) => {
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();
  const x = random.int(0, 54);
  const y = random.int(0, 6);
  let calcDate = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d");

  const now = moment();

  // If calculated date > current date → clamp it to current date
  if (calcDate.isAfter(now)) {
    return;
  }

  const date = calcDate.format();
  const message =
    COMMIT_MESSAGES[Math.floor(Math.random() * COMMIT_MESSAGES.length)];
  console.log("message", message);

  const data = {
    date: date,
  };
  console.log(date);
  jsonfile.writeFile(path, data, () => {
    simpleGit()
      .add([path])
      .commit(message, { "--date": date }, makeCommits.bind(this, --n));
  });
};

makeCommits(30);
