define(function (require) {
  var registerSuite = require('intern!object'),
      assert        = require('intern/chai!assert'),
      plugin        = require('intern/dojo/node!../index'),
      fs            = require('intern/dojo/node!fs'),
      gonzales      = require('intern/dojo/node!../node_modules/gonzales-pe');

  registerSuite({
    name: 'polish-banned-selectors',

    message: function () {
      assert.strictEqual(plugin.message({ error : { message : '.icon-xlarge' } }), '".icon-xlarge" is a banned class. It\'s either too general or collides with one of our utility classes.');
    }
  });

  registerSuite({
    name: 'polish-banned-selectors CSS tests',
    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/css.css', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'css' }), './tests/css.css', { selectors: ['.icon-large', '.hover'] });

        assert.strictEqual(errors.length, 2);
        assert.equal(errors[0].node.toString().trim(), '.icon-large');
        assert.equal(errors[1].node.toString().trim(), '.great-class .hover');
      }));
    }
  });

  registerSuite({
    name: 'polish-banned-selectors SCSS tests',
    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/scss.scss', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'scss' }), './tests/scss.scss', { selectors: ['.icon-large', '.hover'] });

        assert.strictEqual(errors.length, 2);
        assert.equal(errors[0].node.toString().trim(), '.icon-large');
        assert.equal(errors[1].node.toString().trim(), '.hover');
      }));
    }
  });
});