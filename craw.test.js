const { test, expect } = require("@jest/globals");
const { normalizeURL } = require("./craw.js");

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
