# json-translator
Translate JSON files (supported nested structure) using MSTranslator service

### Usage:
**TranslateJsonFromFile(options)**, `options` param requires these properties:
- *clientId*: Microsoft Translator App Id,
- *clientSecret*: Microsoft Translator App Secret Key,
- *sourcePath*: source file in JSON format,
- *targetPath*: target to store translated json content,
- *fromLang*: translate from language,
- *toLang*: translate to language

### TODO:
- Add reference link to Microsoft Translator
- Export to Node module
- Multiple translator client support (Google Translate)
