module.exports = class{
  constructor(regex, names, defaults = {}){
    this.regex = regex;
    this.names = names;
    this.defaults = defaults;
  }

  route(message){
    if(typeof message !== 'object' || !('content' in message)){
      return null;
    }

    const match = this.regex.exec(message.content);
    if(match === null){
      return null;
    }

    let result = {};
    for(const i in this.names){
      result[this.names[i]] = match[parseInt(i) + 1];
    }

    return Object.assign(this.defaults, result);
  }
};
