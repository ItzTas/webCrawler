#!/usr/bin/env node

function processArguments() {
  if (process.argv.length < 3) {
    console.log("The arguments cannot be less than 1");
  } else if (process.argv.length > 3) {
    console.log("The arguments cannot be greater than 1");
  } else {
    console.log(
      `The crawler is starting with the ${process.argv[2]} as the base url`
    );
  }
}

function main() {
  processArguments();
}

main();
