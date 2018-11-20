module.exports = class{
  route(message){
    if(message.channel.type !== 'dm'){
      return null;
    }

    return {};
  }
}
