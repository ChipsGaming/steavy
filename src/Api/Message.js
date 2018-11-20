module.exports = class{
  constructor(content = ''){
    this.content = content;
  }

  /**
   * Добавляет перенос строки в конце сообщения.
   *
   * @return {Message} Вызываемый объект.
   */
  nl(){
    this.content += "\n";

    return this;
  }

  /**
   * Выполняет обратный вызов, если условие истино.
   *
   * @param {function|boolean} condition Условие.
   * @param {function} callback Функция обратного вызова, получающая в качестве 
   * аргумента данное сообщение.
   *
   * @return {Message} Вызываемый объект.
   */
  is(condition, callback){
    if(typeof condition === 'function'){
      condition = condition(this);
    }

    if(!condition){
      return this;
    }

    callback(this);

    return this;
  }

  /**
   * Добавляет строку в конце сообщения.
   *
   * @param {string} str Добавляемая строка.
   *
   * @return {Message} Вызываемый объект.
   */
  addString(str){
    this.content += str;

    return this;
  }

  /**
   * Псевдоним addString.
   */
  str(str){
    return this.addString(str);
  }

  /**
   * Добавляет курсивную строку.
   *
   * @param {string} str Добавляемая строка.
   *
   * @return {Message} Вызываемый объект.
   */
  ital(str){
    return this.addString(`*${str}*`);
  }

  /**
   * Добавляет жирную строку.
   *
   * @param {string} str Добавляемая строка.
   *
   * @return {Message} Вызываемый объект.
   */
  bold(str){
    return this.addString(`**${str}**`);
  }

  /**
   * Добавляет строку в конце сообщения, форматируя ее как блок кода.
   *
   * @param {string} str Добавляемая строка.
   *
   * @return {Message} Вызываемый объект.
   */
  addCodeBlock(str){
    this.content += `\`\`\`${str}\`\`\``;

    return this;
  }

  /**
   * Псевдоним addCodeBlock.
   */
  code(str){
    return this.addCodeBlock(str);
  }

  /**
   * Выполняет обратный вызов для каждого элемента списка.
   *
   * @param {Array} list Добавляемый список.
   * @param {function} callback Функция обратного вызова, принимающая следующие 
   * аргументы: очередной элемент списка, индекс элемента в списке, данное 
   * собщение.
   *
   * @return {Message} Вызываемый объект.
   */
  addList(list, callback){
    list.forEach((e, i) => callback(e, i, this));

    return this;
  }

  /**
   * Псевдоним addList.
   */
  list(list, callback){
    return this.addList(list, callback);
  }

  visit(visitor){
    visitor.visit(this);

    return this;
  }

  /**
   * Отправляет сообщение получателю.
   *
   * @param {Client} client Получатель сообщения.
   */
  send(client){
    if(typeof client.send !== 'function'){
      return;
    }
    if(typeof this.content !== 'string' || this.content.length === 0){
      return;
    }

    client.send(this.content);

    return this;
  }

  /**
   * Отправляет сообщение получателям.
   *
   * @param {Array[Client]} clients Получатели сообщения.
   */
  sendAll(clients){
    clients.forEach(this.send.bind(this));
  }
};
