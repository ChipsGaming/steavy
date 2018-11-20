module.exports = (message, routeMatch) => {
  const player = message.loop.world.getPlayerAvatar(message.author.id);

  player.say(routeMatch.message);
};
