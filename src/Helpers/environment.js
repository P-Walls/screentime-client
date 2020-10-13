let APIURL = "";

// console.log(window.location.hostname);
switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    APIURL = "localhost:3025";
    break;

  case "screentime-client.herokuapp.com":
    APIURL = "screentime-server.herokuapp.com";
    break;

  default:
    alert("URL Error!");
    break;
}
export default APIURL;
