function printReports(pages) {
  console.log("\n\n\n\n---Starting the report---\n");
  const sortedPages = sortObjectIntoList(pages);
  for (const page of sortedPages) {
    console.log(`Found ${page[1]} internal links to ${page[0]}`);
  }
  console.log("\n---Report Ended---\n")
}

function sortObjectIntoList(obj) {
  const sortedOBJ = [];
  for (const [key, value] of Object.entries(obj)) {
    sortedOBJ.push([key, value]);
  }
  return sortedOBJ.sort((a, b) => b[1] - a[1]);
}

module.exports = {
  sortObjectIntoList,
  printReports, 
};
