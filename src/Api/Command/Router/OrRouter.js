module.exports = class{
  constructor(routers){
    this.routers = routers;
  }

  route(message){
    for(const router of this.routers){
      const match = router.route(message);
      if(match === null){
        continue;
      }

      return match;
    }

    return null;
  }
};
