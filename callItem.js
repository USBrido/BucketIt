const request = require("request-promise-native");

const callItem = function(item) {
  return request('http://api.wolframalpha.com/v2/query?appid=GWUG5Y-352TX3H6HA&input=${item)&output=json');
};

//datatypes specs

const media = ['television', 'movie', 'academyaward', 'award', 'tv', 'cinema'];

const books = ['book', 'library', 'betseller', 'magazine', 'bookclub', 'novel'];

const food = ['restaurant', 'pub', 'bar', 'eatery', 'fair', 'market'];

module.exports = {callItem, media, books, food};
