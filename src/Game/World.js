const EventEmitter = require('events');

module.exports = class{
  constructor(){
    this.locations = new Map;
    this.players = new Map;
    this.events = new EventEmitter;
  }

  update(delta, k){
    for(const location of this.locations.values()){
      location.update(delta, k);
    }
  }

  addLocation(location){
    this.locations.set(location.id, location);
    location.world = this;
  }

  removeLocation(location){
    this.locations.delete(location.id);
    location.world = null;
  }

  setPlayerAvatar(client, person){
    this.players.set(client.id, person.id);
    person.setClient(client);
  }

  getPlayerAvatar(playerId){
    if(!this.players.has(playerId)){
      return null;
    }

    const personId = this.players.get(playerId);
    for(const location of this.locations.values()){
      if(location.persons.has(personId)){
        return location.persons.get(personId);
      }
    }

    return null;
  }
}
