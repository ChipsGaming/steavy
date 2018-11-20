module.exports = class{
  constructor(roles = [], handlers = []){
    this.roles = new Set;
    this.handlers = new Set;
    this.allowed = new Map;

    roles.forEach(this.addRole.bind(this));
    handlers.forEach(this.addHandler.bind(this));
  }

  /**
   * @param {string} role Добавляемая роль.
   */
  addRole(role){
    if(this.roles.has(role)){
      return;
    }

    this.roles.add(role);
    this.allowed.set(role, new Set);
  }

  /**
   * @param {string} role Удаляемая роль.
   */
  removeRole(role){
    if(!this.roles.has(role)){
      return;
    }

    this.roles.delete(role);
    this.allowed.delete(role);
  }

  /**
   * @param {string} handler Регистрируемый обработчик.
   */
  addHandler(handler){
    this.handlers.add(handler);
  }

  /**
   * Предоставляет роли доступ к обработчику.
   *
   * @param {string} role Расширяемая роль.
   * @param {Array[string]} handlers Целевые обработчики.
   */
  allow(role, handlers){
    if(!this.roles.has(role)){
      this.addRole(role);
    }

    for(const handler of handlers){
      if(!this.handlers.has(handler)){
        this.addHandler(handler);
      }
      if(this.isAllowed(role, handler)){
        return;
      }
    
      this.allowed.get(role).add(handler);
    }
  }

  /**
   * Предоставляет роли доступ к обработчикам.
   *
   * @param {string} role Расширяемая роль.
   * @param {regex} pattern Шаблон выбора обработчиков.
   */
  allowPattern(role, pattern){
    let allowedHandlers = [];
    for(const handler of this.handlers.values()){
      if(!pattern.test(handler)){
        continue;
      }

      allowedHandlers.push(handler);
    }
    this.allow(role, allowedHandlers);
  }

  /**
   * Отзывает у роли доступ к обработчику.
   *
   * @param {string} role Сужаемая роль.
   * @param {Array[string]} handlers [optional] Целевой обработчик (по умолчанию 
   * все обработчики).
   */
  reject(role, handlers = '*'){
    if(!this.roles.has(role)){
      this.addRole(role);
    }
    if(!Array.isArray(handlers)){
      handlers = [handlers];
    }

    for(const handler of handlers){
      if(handler === '*'){
        for(const h of this.handlers){
          this.reject(role, h);
        }
      }
      else{
        if(!this.handlers.has(handler)){
          return;
        }
      
        this.allowed.get(role).delete(handler);
      }
    }
  }

  /**
   * @param {string} role Проверяемая роль.
   * @param {string} handler Целевой обработчик.
   *
   * @return {boolean} true - если у данной роли есть доступ к обработчику.
   */
  isAllowed(role, handler){
    if(!this.roles.has(role)){
      return false;
    }

    return this.allowed.get(role).has(handler);
  }
};
