let dev = true;

export default {
  animations: dev ? false : true,
  simulatedNetworkDelay: dev ? 0 : 300,
  bypassLogin: dev
};