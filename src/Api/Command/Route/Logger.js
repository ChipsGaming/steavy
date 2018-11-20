module.exports = class{
  route(message){
    console.log(`${message.author.username}: ${message.content.substr(0, 100)}`);

    return {};
  }
}
