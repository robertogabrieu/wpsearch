const https = require("https");
const http = require("http");

class Url {
  // wrap node's https.get stream call as a promise
  // note: assumes utf-8 encoded data payload to get.
  async getdata(url) {
    return new Promise((resolve, reject) => {
      let protocol;
      if(url.includes('https://'))
        protocol = https;
      else
        protocol = http;
      
      protocol
        .get(url, (res) => {
          let status = res.statusCode;
          console.log(status);
          res.setEncoding("utf8");
          let data = "";
          res.on("data", (chunk) => {
            data = data + chunk;
          });
          res.on("end", () => {
            if (
              data.indexOf("/wp-admin/") !== -1 ||
              data.indexOf("/wp-content/") !== -1
            )
              resolve({
                status,
                data,
                wp: true,
              });
            else
              resolve({
                status,
                data,
                wp: false,
              });
          });
        })
        .on("error", (e) => {
          console.log(e);
          resolve({
            data: false,
          });
        });
    });
  }

  handleGetReturn(res) {}

  sanitizeUrl(url) {
    url = url.split('@').pop()
    let domain = url.replace(/http:\/\/|www\.|\.com|\.net|\.org|\.info|\.br/gi, "");
    return domain;
  }
}

module.exports = Url;
