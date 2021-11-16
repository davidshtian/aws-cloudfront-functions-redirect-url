var querystring = require("querystring");

function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var headers = request.headers;
  var host = headers.host.value;
  var qs = request.querystring;
  var newurl = "";
  var orihost = "example.com"; // Change the redirect URL to your choice
  var dsthost = "www.example.com"; // Change the redirect URL to your choice

  if (host === orihost) {
    if (Object.keys(qs).length != 0) {
      console.log(qs);
      // Update query string
      Object.keys(qs).forEach(function (key) {
        // Check if any multiValue
        if (qs[key].hasOwnProperty("multiValue")) {
          var multiValue = qs[key]["multiValue"];

          // Traverse multiValue
          multiValue.forEach(function (item, index) {
            multiValue[index] = item["value"];
          });
          qs[key] = multiValue;
        } else {
          qs[key] = qs[key]["value"];
        }
      });

      var newqs = querystring.stringify(qs);
      newurl = `https://${dsthost}${uri}?${newqs}`;
    } else {
      newurl = `https://${dsthost}${uri}`;
    }

    console.log(newurl);
    var response = {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: { location: { value: newurl } },
    };
    return response;
  }
  return request;
}
