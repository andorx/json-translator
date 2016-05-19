var fs = require('fs'),
    when = require("when"),
    nodefn = require("when/node"),
    jsonFile = require('jsonfile'),
    M$Translator = require('mstranslator');

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
      return asyncTranslateObject(rawObject, fromLang, toLang);
    })
    .then(function(translatedObject) {
      writeTranslatedObjectToJsonFile(translatedObject, targetPath);
    });

  function asyncReadJsonFile(path) {
    return nodefn.call(jsonFile.readFile.bind(jsonFile), path);
  }

  function asyncTranslateObject(object, fromLang, toLang) {
    return when.all(Object.keys(object).map(function(key, index) {
      if (typeof object[key] === 'object') {
        return asyncTranslateObject(object[key], fromLang, toLang);
      } else {
        return nodefn.call(translateClient.translate.bind(translateClient), {
            text: object[key],
            from: fromLang,
            to: toLang
          })
          .then(function(result) {
            object[key] = result;
            return object;
          });
      }
    }))
    ;
  }

  function writeTranslatedObjectToJsonFile(translatedObject, path) {
    fs.writeFileSync(path, JSON.stringify(translatedObject) , 'utf-8');
  }
};