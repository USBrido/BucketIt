const request = require("request-promise-native");

const callItem = function(item){
  return request('http://api.wolframalpha.com/v2/query?appid=GWUG5Y-352TX3H6HA&input=${item)&output=json')
};

module.exports = {callItem}
