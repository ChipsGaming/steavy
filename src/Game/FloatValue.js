module.exports = class{
  constructor(volume, min = 0, max = 100, accuracy = 2){
    this.volume = volume;
    this.min = min;
    this.max = max;
    this.accuracy = accuracy;
  }

  plus(volume){
    this.volume += volume;
    if(this.volume > this.max){
      this.volume = this.max;
    }
    else if(this.volume < this.min){
      this.volume = this.min
    }
  }

  get fixedVolume(){
    return this.volume.toFixed(this.accuracy);
  }

  get isMaxValue(){
    return this.volume === this.max;
  }

  get isMinValue(){
    return this.volume === this.min;
  }
}
