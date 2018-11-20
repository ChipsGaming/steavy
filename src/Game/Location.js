const suuid = require('short-uuid');

module.exports = class{
  constructor(){
    this.id = suuid().new();
    this.world = null;
    this.roads = new Map;
    this.persons = new Map;
    this.name = '';
    this.description = '';
  }

  update(delta, k){
    for(const person of this.persons.values()){
      person.update(delta, k);
    }
  }

  isEquals(location){
    return this.id === location.id;
  }

  setName(name){
    this.name = name;
  }

  setDescription(description){
    this.description = description;
  }

  addRoad(location){
    if(location.world === null){
      this.world.addLocation(location);
    }
    this.roads.set(location.id, location);
  }

  removeRoad(location){
    this.roads.delete(location.id);
  }

  removeAllRoads(){
    this.roads.clear();
  }

  addPerson(person){
    this.persons.set(person.id, person);
    person.location = this;
  }

  removePerson(person){
    this.persons.delete(person.id);
    person.location = null;
  }
}
