function normalizeURL(urlStr) {
  let norm = new URL(urlStr);
  if (norm.protocol === "http" && norm.port === "80") {
    norm.port = "";
  } else if (norm.protocol === "https" && norm.port === "443") {
    norm.port = "";
  }
  norm.protocol = "";
  if (norm.pathname.endsWith("/")) {
    norm.pathname = norm.pathname.slice(0, -1);
  }
  let credentials = ``;
  if (norm.password && norm.username) {
    credentials = `${norm.username}:${norm.password}@`;
  } else if (norm.username) {
    credentials = `${norm.username}@`;
  }
  const normUrl =
    credentials + norm.host + norm.pathname + norm.hash + norm.search;
  return normUrl;
}

module.exports = {
  normalizeURL,
};
