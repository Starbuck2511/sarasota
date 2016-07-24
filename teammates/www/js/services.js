angular.module('starter.services', [])

.factory('Groups', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var groups = [{
    id: 0,
    name: 'MPS Montagskicker',
    description: 'Immer montags um 19:30 Uhr in Gablenberg'
  }, {
    id: 1,
    name: 'RTS Allstars',
    description: 'Hallenkicker, dienstags 18:30 Uhr in Musberg'

  }];

  return {
    all: function() {
      return groups;
    },

    get: function(groupId) {
      for (var i = 0; i < groups.length; i++) {
        if (groups[i].id === parseInt(groupId)) {
          return groups[i];
        }
      }
      return null;
    }
  };
});
