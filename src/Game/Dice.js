module.exports = class{
  constructor(volume){
    this.volume = volume;
  }

  roll(){
    return Math.floor(Math.random() * this.volume) + 1;
  }
}
