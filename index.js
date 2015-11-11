module.exports = {
  configOptions : [
    {
      type         : 'array',
      name         : 'selectors',
      defaultValue : []
    }
  ],

  name : 'banned-selectors',
  message : function(error) {
    return '"' + error.error.message + '" is a banned class. It\'s either too general or collides with one of our utility classes.';
  },
  test : function(ast, path, options) {
    var errors = [];

    ast.traverse(function(node) {
      var selector;

      if (node.type !== 'simpleSelector') {
        return;
      }

      selector = node.toString();
      selector = selector.replace(/(\r\n|\n|\r)/gm,"");
      selector = selector.replace(/\s\s+/g, ' ');
      selector = selector.replace(/(\w)\.(\w)/g, '$1 .$2');
      selector = selector.split(' ');

      selector.forEach(function(string) {
        if (options.selectors.indexOf(string) !== -1) {
          errors.push({
            node: node,
            message: string
          });
        }
      });
    });

    return errors;
  }
};
