module.exports = class{
  constructor(world){
    this.world = world;
    this.timer = null;
    this.interval = null;
  }

  /**
   * description
   *
   * @return {boolean} true - если игровой цикл запущен.
   */
  get isStart(){
    return this.timer !== null;
  }

  /**
   * Запускает игровой цикл.
   *
   * @param {number} interval Периодичность симуляции в микросекундах.
   */
  start(interval){
    if(this.isStart){
      return;
    }

    this.timer = setInterval(
      this.tick.bind(this, interval, interval / 1000),
      interval
    );
    this.interval = interval;
  }

  /**
   * Останавливает игровой цикл.
   */
  stop(){
    if(!this.isStart){
      return;
    }

    clearInterval(this.timer);
    this.timer = null;
    this.interval = null;
  }

  /**
   * Выполняет симуляцию игрового мира.
   *
   * @param {number} delta Симулируемый период.
   * @param {number} k Коэффициент симуляции.
   */
  async tick(delta, k){
    this.world.update(delta, k);
  }
}
