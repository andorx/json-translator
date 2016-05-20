var fs = require('fs');
var keys = require('when/keys');
var nodefn = require('when/node');
var jsonFile = require('jsonfile');
var M$Translator = require('mstranslator');

module.exports = function jsonTranslator(options) {
  'use strict';

  let clientId = options.clientId,
      clientSecret = options.clientSecret,
      sourcePath = options.sourcePath,
      targetPath = options.targetPath,
      fromLang = options.fromLang,
      toLang  = options.toLang,
      translateClient = new M$Translator({
        client_id: clientId,
        client_secret: clientSecret
      }, true);

  asyncReadJsonFile(sourcePath)
    .then(function(rawObject) {
      return asyncTranslateObject(rawObject);
    })
    .then(function(translatedObject) {
      writeTranslatedObjectToJsonFile(translatedObject, targetPath);
    });

  function asyncReadJsonFile(path) {
    return nodefn.call(jsonFile.readFile.bind(jsonFile), path);
  }

  function asyncTranslateObject(object) {
    for (var prop in object) {
      if (typeof object[prop] !== 'object') {
        object[prop] = nodefn.call(translateClient.translate.bind(translateClient), {
            text: object[prop],
            from: fromLang,
            to: toLang
          })
          .then(function(result) {
            return result;
          });
      } else {
        object[prop] = asyncTranslateObject(object[prop]);
      }
    }

    return keys.all(object);
  }

  function writeTranslatedObjectToJsonFile(translatedObject, path) {
    fs.writeFileSync(path, JSON.stringify(translatedObject, null, 2) , 'utf-8');
  }
};