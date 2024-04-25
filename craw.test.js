const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./craw.js");

// tests with no query paramethers
const URLnofinalSlashHTTP = "http://boot.dev.blog/path";
const URLnofinalSlashHTTPS = "https://boot.dev.blog/path";

const URLfinalSlashHTTP = "http://boot.dev.blog/path/";
const URLfinalSlashHTTPS = "https://boot.dev.blog/path/";

test("Remove the protocol http", () => {
  expect(normalizeURL(URLnofinalSlashHTTP)).toBe("boot.dev.blog/path");
});

test("Remove the protocol https", () => {
  expect(normalizeURL(URLnofinalSlashHTTPS)).toBe("boot.dev.blog/path");
});

test("Remove the final / http", () => {
  expect(normalizeURL(URLfinalSlashHTTP)).toBe("boot.dev.blog/path");
});

test("Remove the final / https", () => {
  expect(normalizeURL(URLfinalSlashHTTPS)).toBe("boot.dev.blog/path");
});

// tests with query paramethers

const URLnofinalSlashHTTPqueryParameter =
  "http://boot.dev.blog/path?reversed=true";

const URLfinalSlashHTTPqueryParamether =
  "http://boot.dev.blog/path/?reversed=true";

const URLnofinalSlashHTTPmultipleQueryParameter =
  "http://boot.dev.blog/path?reversed=true&search=boot.dev";

test("Retain the query paramethers", () => {
  expect(normalizeURL(URLnofinalSlashHTTPqueryParameter)).toBe(
    "boot.dev.blog/path?reversed=true"
  );
});

test("Retain the query paramethers final /", () => {
  expect(normalizeURL(URLfinalSlashHTTPqueryParamether)).toBe(
    "boot.dev.blog/path?reversed=true"
  );
});

test("Retain the query paramethers multiple query", () => {
  expect(normalizeURL(URLnofinalSlashHTTPmultipleQueryParameter)).toBe(
    "boot.dev.blog/path?reversed=true&search=boot.dev"
  );
});

// tests with port

const URLwithDefaultPortHTTP = "http://boot.dev.blog:80/path";
const URLwithDefaultPortHTTPS = "https://boot.dev.blog:443/path";
const URLwithNonDefaultPort = "http://boot.dev.blog:8080/path";

test("Normalize URL by removing default HTTP port", () => {
  expect(normalizeURL(URLwithDefaultPortHTTP)).toBe("boot.dev.blog/path");
});

test("Retain non-default port in URL", () => {
  expect(normalizeURL(URLwithNonDefaultPort)).toBe("boot.dev.blog:8080/path");
});

test("Normalize URL by removing default HTTPS port", () => {
  expect(normalizeURL(URLwithDefaultPortHTTPS)).toBe("boot.dev.blog/path");
});

// getURLsFromHTML tests

test("It extracts URLs from a simple html page", () => {
  const htmlpage1 = '<div><a href="/path"></a></div>';
  const baseurl = "https://base.url";
  const hrefList = getURLsFromHTML(htmlpage1, baseurl);
  expect(hrefList).toEqual(["https://base.url/path"]);
});

test("It extracts URLs from a more complex html page", () => {
  const htmlpage1 =
    '<div><a href="/path"></a></div><a href="/otherPath"><p></p></a>';
  const baseurl = "https://base.url";
  const hrefList = getURLsFromHTML(htmlpage1, baseurl);
  expect(hrefList).toEqual([
    "https://base.url/path",
    "https://base.url/otherPath",
  ]);
});

test("It extracts a full path URL from a simple html page", () => {
  const htmlpage1 = '<div><a href="https://base.url/path"></a></div>';
  const baseurl = "https://base.url";
  const hrefList = getURLsFromHTML(htmlpage1, baseurl);
  expect(hrefList).toEqual(["https://base.url/path"]);
});

test("getURLsFromHTML both", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [
    "https://blog.boot.dev/path/one",
    "https://other.com/path/one",
  ];
  expect(actual).toEqual(expected);
});
