module.exports = class{
  constructor(callback){
    this.callback = callback;
  }

  route(message){
    return this.callback.call(this, message);
  }
};
