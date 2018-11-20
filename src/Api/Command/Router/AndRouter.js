module.exports = class{
  constructor(routers){
    this.routers = routers;
  }

  route(message){
    let result = {};
    for(const router of this.routers){
      const match = router.route(message);
      if(match === null){
        return null;
      }

      Object.assign(result, match);
    }

    return result;
  }
};
