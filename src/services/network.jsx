import axios from "axios";

let env = "local";
import devConfig from "../../devConfig"


export function getJSON(route, fakeData) {
  if (env == "local") {
    return delayedResponse(fakeData);
  } else {
    return axios(route);
  }
}

function delayedResponse(fakeData) {
  return new Promise(function (resolve) {
    setTimeout(
      () => {
        resolve(JSON.parse(JSON.stringify(fakeData)));
      }, devConfig.simulatedNetworkDelay
    );
  });
}