const suuid = require('short-uuid'),
  FloatValue = require('./FloatValue');

module.exports = class{
  constructor(){
    this.id = suuid().new();
    this.location = null;
    this.client = null;
    this.name = '';
    this.state = '';
    this.description = '';
    this.role = 'player';
    this.health = new FloatValue(100);
    this.energy = new FloatValue(100);
  }

  update(delta, k){
    if(!this.energy.isMaxValue){
      this.addEnergy(8 * k);
    }
    if(!this.health.isMaxValue){
      this.addHealth(0.02 * k);
    }
  }

  get isPlayer(){
    return this.client !== null;
  }

  get isDie(){
    return this.health.volume / this.health.max < 0.1;
  }

  isEquals(person){
    return this.id === person.id;
  }

  setClient(client){
    this.client = client;
  }

  setState(state){
    this.state = state;
    this.location.world.events.emit('person.setState', this);
  }

  setDescription(description){
    this.description = description;
    this.location.world.events.emit('person.setDescription', this);
  }

  addHealth(volume){
    const isDie = this.isDie;

    this.health.plus(volume);
    this.location.world.events.emit('person.addHealth', this, volume);

    if(!isDie && this.isDie){
      this.die();
    }
    if(isDie && !this.isDie){
      this.revive();
    }
  }

  addEnergy(volume){
    this.energy.plus(volume);
    this.location.world.events.emit('person.addEnergy', this, volume);
  }

  die(){
    this.location.world.events.emit('person.die', this);
  }

  revive(){
    this.location.world.events.emit('person.revive', this);
  }

  say(message){
    this.location.world.events.emit('person.say', this, message);
  }

  move(location){
    const prevLocation = this.location;
    this.location.removePerson(this);

    this.location = location;
    location.addPerson(this);

    this.addEnergy(-50);

    this.location.world.events.emit('person.move', this, location, prevLocation);
  }

  hit(weapon, person){
    this.addEnergy(-20);
    const volume = -10;
    this.location.world.events.emit('person.hit', this, weapon, person, volume);
    person.addHealth(volume);
  }
}
