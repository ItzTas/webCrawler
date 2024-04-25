const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function normalizeURL(urlStr) {
  let norm = new URL(urlStr);
  if (norm.protocol === "http" && norm.port === "80") {
    norm.port = "";
  } else if (norm.protocol === "https" && norm.port === "443") {
    norm.port = "";
  }
  if (norm.pathname.slice(-1) === "/") {
    norm.pathname = norm.pathname.slice(0, -1);
  } else if (norm.pathname === "/") {
    norm.pathname = "";
  }
  let credentials = "";
  if (norm.password && norm.username) {
    credentials = `${norm.username}:${norm.password}@`;
  } else if (norm.username) {
    credentials = `${norm.username}@`;
  }
  const normUrl =
    credentials + norm.host + norm.pathname + norm.hash + norm.search;
  return normUrl;
}

function getURLsFromHTML(HTMLpage, baseURL) {
  let urlList = [];
  const dom = new JSDOM(HTMLpage);
  const anchors = dom.window.document.querySelectorAll("a");
  for (const anchor of anchors) {
    if (anchor.hasAttribute("href")) {
      let href = anchor.getAttribute("href");

      try {
        href = new URL(href, baseURL).href;
        urlList.push(href);
      } catch (err) {
        console.log(`${err.message}: ${anchor.href}`);
      }
    }
  }
  return urlList;
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  try {
    let baseurlobj = new URL(baseURL);
    let currentURLobj = new URL(currentURL);
    let normCurrent = normalizeURL(currentURL);

    console.log(currentURL);

    if (baseurlobj.hostname !== currentURLobj.hostname) {
      return pages;
    }

    if (pages[normCurrent] > 0) {
      pages[normCurrent]++;
      return pages;
    } else {
      pages[normCurrent] = 1;
    }

    console.log(`crawling ${currentURL}`);
    let html = "";
    try {
      html = await fetchHTML(currentURL);
    } catch (err) {
      console.log(`${err.message}`);
      return pages;
    }
    const nextURLs = getURLsFromHTML(html, baseURL);
    for (let link of nextURLs) {
      pages = await crawlPage(baseURL, link, pages);
    }
    return pages;
  } catch (err) {
    console.log(`Error crawling the webpage: ${err.message} ${currentURL}`);
  }
}

async function fetchHTML(url) {
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    throw new Error(`Got Network error: ${err.message}`);
  }

  if (res.status > 399) {
    throw new Error(`Got HTTP error: ${res.status} ${res.statusText}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    throw new Error(`Got non-HTML response: ${contentType}`);
  }

  return res.text();
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
