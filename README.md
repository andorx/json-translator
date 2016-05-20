# json-translator
Translate JSON files (supported nested structure) using [MSTranslator](https://datamarket.azure.com/dataset/bing/microsofttranslator) service

### Usage:
**jsonTranslate(options)**, `options` param requires these properties:
- *clientId*: Microsoft Translator App Id,
- *clientSecret*: Microsoft Translator App Secret Key,
- *sourcePath*: source file in JSON format,
- *targetPath*: target to store translated json content,
- *fromLang*: translate from language,
- *toLang*: translate to language

### TODO:
- Multiple translator client support (Google Translate)
- Guarantee the order of properties after translated
