"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DotaWebAPI = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

// Private constants
var APP_ID = 570;
var API_URL = 'http://api.steampowered.com';
var STATIC_CDN = 'http://cdn.dota2.com/apps/dota2/images';
var MATCH_INTERFACE = "IDOTA2Match_".concat(APP_ID);
var ECONOMY_INTERFACE = "IEconDOTA2_".concat(APP_ID);
/**
 * This is a wrapper class that is constructed by providing a steam api key
 * and acts as an interface to make requests to the Steam DotA 2 Web API that is
 * publicly available.
 */

var DotaWebAPI = /*#__PURE__*/function () {
  /**
   * Provide a Steam API key in the form of a string.
   * Available here - https://steamcommunity.com/dev/apikey.
   *
   * @param {string} apiKey
   */
  function DotaWebAPI(apiKey) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, DotaWebAPI);
    this.apiKey = apiKey;
    this.heroes = {};
    this.items = {}; // Load heroes & items data asynchronously

    this.getHeroes().then(function (data) {
      return data.result.heroes;
    }).then(function (heroes) {
      return heroes.map(function (hero) {
        hero.localized_name = hero.name.replace(/npc_dota_hero_/gi, '');
        hero.images = {};
        ['sb', 'lg', 'full'].map(function (size) {
          return hero.images[size] = "".concat(STATIC_CDN, "/heroes/").concat(hero.localized_name, "_").concat(size, ".png");
        });
        hero.images.vert = "".concat(STATIC_CDN, "/heroes/").concat(hero.localized_name, "_vert.jpg");
        _this.heroes[hero.localized_name] = hero;
      });
    });
    // this.getItems().then(function (data) {
    //   return data.result.items;
    // }).then(function (items) {
    //   return items.map(function (item) {
    //     item.localized_name = item.name.replace(/item_/gi, '');
    //     item.images = {};
    //     item.images.lg = "".concat(STATIC_CDN, "/items/").concat(item.localized_name, "_lg.png");
    //     _this.items[item.localized_name] = item;
    //   });
    // });
  }
  /**
   * Retrieves match details based on the `matchId` passed in
   * @param {string} matchId
   */


  (0, _createClass2["default"])(DotaWebAPI, [{
    key: "getMatchDetails",
    value: function () {
      var _getMatchDetails = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(matchId) {
        var parameters, queryString, response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                parameters = {
                  'key': this.apiKey,
                  'match_id': matchId
                };
                queryString = buildQueryString(parameters);
                _context.prev = 2;
                _context.next = 5;
                return (0, _nodeFetch["default"])("".concat(API_URL, "/").concat(MATCH_INTERFACE, "/GetMatchDetails/v1?").concat(queryString));

              case 5:
                response = _context.sent;
                return _context.abrupt("return", handleResponse(response));

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);
                throw _context.t0;

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));

      function getMatchDetails(_x) {
        return _getMatchDetails.apply(this, arguments);
      }

      return getMatchDetails;
    }()
    /**
     * Retrieves a list of all the tournaments in the game.
     * @deprecated Steam no longer supports this endpoint.
     *
     * @param {string} [lang]  (optional - ISO639-1 char-set string)
     */

  }, {
    key: "getLeagueListing",
    value: function () {
      var _getLeagueListing = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(lang) {
        var parameters, queryString, response;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                parameters = {
                  'key': this.apiKey,
                  'language': lang
                };
                queryString = buildQueryString(parameters);
                _context2.prev = 2;
                response = (0, _nodeFetch["default"])("".concat(API_URL, "/").concat(MATCH_INTERFACE, "/GetLeagueListing/v1?").concat(queryString));
                return _context2.abrupt("return", handleResponse(response));

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](2);
                throw _context2.t0;

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 7]]);
      }));

      function getLeagueListing(_x2) {
        return _getLeagueListing.apply(this, arguments);
      }

      return getLeagueListing;
    }()
    /**
     * Returns a list of live league games & the current match details in each.
     */

  }, {
    key: "getLiveLeagueGames",
    value: function () {
      var _getLiveLeagueGames = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var parameters, queryString, response;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                parameters = {
                  'key': this.apiKey
                };
                queryString = buildQueryString(parameters);
                _context3.prev = 2;
                response = (0, _nodeFetch["default"])("".concat(API_URL, "/").concat(MATCH_INTERFACE, "/GetLiveLeagueGames/v1?").concat(queryString));
                return _context3.abrupt("return", handleResponse(response));

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](2);
                throw _context3.t0;

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 7]]);
      }));

      function getLiveLeagueGames() {
        return _getLiveLeagueGames.apply(this, arguments);
      }

      return getLiveLeagueGames;
    }()
    /**
     * Provide a list of optional parameters to collect a list of previous matches
     * filtered under those parameters, use null to skip parameter filter.
     * @param {number} [heroId] (optional - uint32)
     * @param {string} [gameMode] (optional - uint32)
     *  0 - None
     1 - All Pick
     2 - Captain's Mode
     3 - Random Draft
     4 - Single Draft
     5 - All Random
     6 - Intro
     7 - Diretide
     8 - Reverse Captain's Mode
     9 - The Greeviling
     10 - Tutorial
     11 - Mid Only
     12 - Least Played
     13 - New Player Pool
     14 - Compendium Matchmaking
     16 - Captain's Draft
     * @param {number} [skill] (uint32)
     0 - Any
     1 - Normal
     2 - High
     3 - Very High
     * @param {string} [minPlayers] (optional)
     * @param {string} [accountId] (optional)
     * @param {string} [leagueId] (optional)
     * @param {string} [startAtMatchId] (optional)
     * @param {string} [matchesRequested] ((optional) default: 25)
     * @param {string} [tournamentGamesOnly] ((optional) 0 = false, 1 = true)
     */

  }, {
    key: "getMatchHistory",
    value: function () {
      var _getMatchHistory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(heroId, gameMode, skill, minPlayers, accountId, leagueId, startAtMatchId, matchesRequested, tournamentGamesOnly) {
        var parameters, queryString, response;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                parameters = {
                  'key': this.apiKey,
                  'hero_id': heroId,
                  'game_mode': gameMode,
                  'skill': skill,
                  'minPlayers': minPlayers,
                  'account_id': accountId,
                  'league_id': leagueId,
                  'start_at_match_id': startAtMatchId,
                  'matches_requested': matchesRequested,
                  'tournament_games_only': tournamentGamesOnly
                };
                queryString = buildQueryString(parameters);
                _context4.prev = 2;
                response = (0, _nodeFetch["default"])("".concat(API_URL, "/").concat(MATCH_INTERFACE, "/GetMatchHistory/v1?").concat(queryString));
                return _context4.abrupt("return", handleResponse(response));

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](2);
                throw _context4.t0;

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 7]]);
      }));

      function getMatchHistory(_x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11) {
        return _getMatchHistory.apply(this, arguments);
      }

      return getMatchHistory;
    }()
    /**
     * Provide starting match id and number of matches to collect history of
     * matches under those filters.
     *
     * @param {number} [startMatchSeqNum] (optional - uint64)
     * @param {number} [matchesRequested] (optional - uint32)
     */

  }, {
    key: "getMatchHistoryBySequenceNumber",
    value: function () {
      var _getMatchHistoryBySequenceNumber = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(startMatchSeqNum, matchesRequested) {
        var parameters, queryString, response;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                parameters = {
                  'key': this.apiKey,
                  'start_at_match_seq_num': startMatchSeqNum,
                  'matches_requested': matchesRequested
                };
                queryString = buildQueryString(parameters);
                _context5.prev = 2;
                response = (0, _nodeFetch["default"])("".concat(API_URL, "/").concat(MATCH_INTERFACE, "/GetMatchHistoryBySequenceNum") + "/v1?".concat(queryString));
                return _context5.abrupt("return", handleResponse(response));

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](2);
                throw _context5.t0;

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 7]]);
      }));

      function getMatchHistoryBySequenceNumber(_x12, _x13) {
        return _getMatchHistoryBySequenceNumber.apply(this, arguments);
      }

      return getMatchHistoryBySequenceNumber;
    }()
    /**
     * Provide a list of league games by date ranges
     * @deprecated Steam no longer supports this endpoint.
     *
     * @param {number} [dateMin] (optional - uint32 Unix Timestamp)
     * @param {number} [dateMax] (optional - uint32 Unix Timestamp)
     */

  }, {
    key: "getScheduledLeagueGames",
    value: function () {
      var _getScheduledLeagueGames = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(dateMin, dateMax) {
        var parameters, queryString, response;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                parameters = {
                  'key': this.apiKey
                };
                queryString = buildQueryString(parameters);
                _context6.prev = 2;
                response = (0, _nodeFetch["default"])("".concat(API_URL, "/").concat(MATCH_INTERFACE, "/GetScheduledLeagueGames") + "/v1?".concat(queryString));
                return _context6.abrupt("return", handleResponse(response));

              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6["catch"](2);
                throw _context6.t0;

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[2, 7]]);
      }));

      function getScheduledLeagueGames(_x14, _x15) {
        return _getScheduledLeagueGames.apply(this, arguments);
      }

      return getScheduledLeagueGames;
    }()
    /**
     * Returns list of teams provided by starting id and amount
     * @param {number} [startTeamId] (optional - uint64)
     * @param {number} [teamsRequested] (optional - uint32)
     */

  }, {
    key: "getTeamInfo",
    value: function () {
      var _getTeamInfo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(startTeamId, teamsRequested) {
        var parameters, queryString, response;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                parameters = {
                  'key': this.apiKey,
                  'start_at_team_id': startTeamId,
                  'teams_requested': teamsRequested
                };
                queryString = buildQueryString(parameters);
                _context7.prev = 2;
                response = (0, _nodeFetch["default"])("".concat(API_URL, "/").concat(MATCH_INTERFACE) + "/GetTeamInfoByTeamID/v1?".concat(queryString));
                return _context7.abrupt("return", handleResponse(response));

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7["catch"](2);
                throw _context7.t0;

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[2, 7]]);
      }));

      function getTeamInfo(_x16, _x17) {
        return _getTeamInfo.apply(this, arguments);
      }

      return getTeamInfo;
    }()
    /**
     * Provide a tournament player's account id to collect his stats in
     * tournaments
     *
     * @param {string} accountId
     * @param {string} [leagueId] (optional)
     * @param {string} [heroId] (optional)
     * @param {string} [timeFrame] (optional)
     */

  }, {
    key: "getTournamentPlayerStats",
    value: function () {
      var _getTournamentPlayerStats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(accountId, leagueId, heroId, timeFrame) {
        var parameters, queryString, response;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                parameters = {
                  'key': this.apiKey,
                  'account_id': accountId,
                  'league_id': leagueId,
                  'hero_id': heroId,
                  'time_frame': timeFrame
                };
                queryString = buildQueryString(parameters);
                _context8.prev = 2;
                response = (0, _nodeFetch["default"])("".concat(API_URL, "/").concat(MATCH_INTERFACE, "/GetTournamentPlayerStats") + "/v1?".concat(queryString));
                return _context8.abrupt("return", handleResponse(response));

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8["catch"](2);
                throw _context8.t0;

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[2, 7]]);
      }));

      function getTournamentPlayerStats(_x18, _x19, _x20, _x21) {
        return _getTournamentPlayerStats.apply(this, arguments);
      }

      return getTournamentPlayerStats;
    }()
    /**
     * Returns a list of game items that are available depending on the latest
     * version of the patch
     *
     * @param {string} [lang] (optional)
     */

  }, {
    key: "getItems",
    value: function () {
      var _getItems = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(lang) {
        var parameters, queryString, response;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(Object.keys(this.items).length > 0)) {
                  _context9.next = 2;
                  break;
                }

                return _context9.abrupt("return", this.items);

              case 2:
                parameters = {
                  'key': this.apiKey,
                  'language': lang
                };
                queryString = buildQueryString(parameters);
                _context9.prev = 4;
                response = (0, _nodeFetch["default"])("".concat(API_URL, "/").concat(ECONOMY_INTERFACE, "/GetGameItems/v1?").concat(queryString));
                return _context9.abrupt("return", handleResponse(response));

              case 9:
                _context9.prev = 9;
                _context9.t0 = _context9["catch"](4);
                throw _context9.t0;

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[4, 9]]);
      }));

      function getItems(_x22) {
        return _getItems.apply(this, arguments);
      }

      return getItems;
    }()
    /**
     * Returns a list of heroes that are available depending on the latest version
     * of the patch
     *
     * @param {string} [lang] (optional)
     * @param {bool} [ifItemized] (optional)
     */

  }, {
    key: "getHeroes",
    value: function () {
      var _getHeroes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(lang, ifItemized) {
        var parameters, queryString, response;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(Object.keys(this.heroes).length > 0)) {
                  _context10.next = 2;
                  break;
                }

                return _context10.abrupt("return", this.heroes);

              case 2:
                parameters = {
                  'key': this.apiKey,
                  'language': lang,
                  'itemizedonly': ifItemized
                };
                queryString = buildQueryString(parameters);
                _context10.prev = 4;
                response = (0, _nodeFetch["default"])("".concat(API_URL, "/").concat(ECONOMY_INTERFACE, "/GetHeroes/v1?").concat(queryString));
                return _context10.abrupt("return", handleResponse(response));

              case 9:
                _context10.prev = 9;
                _context10.t0 = _context10["catch"](4);
                throw _context10.t0;

              case 12:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[4, 9]]);
      }));

      function getHeroes(_x23, _x24) {
        return _getHeroes.apply(this, arguments);
      }

      return getHeroes;
    }()
  }]);
  return DotaWebAPI;
}();
/** Private Functions **/

/**
 * Parses the response body from HTTP requests
 * @param {Promise<any>} response from  HTTP response
 * @return {Promise<any>} The deserialized response body
 */


exports.DotaWebAPI = DotaWebAPI;

function handleResponse(_x25) {
  return _handleResponse.apply(this, arguments);
}
/**
 * Constructs the query parameter string from a given object
 * @param {object} parameters wrapped in an object literal
 * @return {string}  the query string for the request
 */


function _handleResponse() {
  _handleResponse = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(response) {
    var res;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return response;

          case 2:
            res = _context11.sent;

            if (!res.ok) {
              _context11.next = 7;
              break;
            }

            return _context11.abrupt("return", res.json());

          case 7:
            return _context11.abrupt("return", res.statusText);

          case 8:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _handleResponse.apply(this, arguments);
}

function buildQueryString(parameters) {
  return Object.keys(parameters).filter(function (key) {
    return parameters[key];
  }).map(function (key) {
    return "".concat(key, "=").concat(parameters[key]);
  }).join('&');
}