# Inl-mningsUppgift2Databaser
## Betygs mål
Satsar på G, VG är helt ok, jag fick väldigt ont om tid vid testandet pga hälso problem
## Postman
### Collections link:
https://www.postman.com/karlloe/workspace/expressnosql
### Postman Mockserver
Jag har inte skapat ett åostman mockserver för projektet då jag inte han göra det och det finns inte som ett krav under inlämningen
## INSTRUKTIONER:
### Beroenden
Programmet använder sig utav NPM, Express, MongoDB, Express-rate-limiter, nodemon och faker
dessa installeras genom, gärna i denna ordning:

    npm init -y
    npm i express mongoose
    npm i express-rate-limit
    npm i -g nodemon
    npm install @faker-js/faker

### Importera Enviroment:
Många av testerna är byggda genom envieroment varibles i postman därför ska envieroment importeras för att de ska kunna fungera ordentligt;
Enviroment finns här:

    Import Filer\Locations & Destinations.postman_environment.json

### mongoDB Atlas link
https://cloud.mongodb.com/v2/6613fa50eb8fd13d2991c8f0#/clusters
#### ändra server connection string inuti Server.js!
Gå in i Server.js och byt ut connection string mot din egna
### Övriga steg
Vissa utav testerna är beroende av existerande data, för att dessa ska fungera gör följande:
#### 1. Importering av JSON till Databaser
Importera JSON filerna in i MongoDB:

    Import Filer\PVTInlämningsuppgift2.locations.json
    Import Filer\PVTInlämningsuppgift2.locations.json

#### 2. ändra server connection string inuti Server.js
Gå in i Server.js och byt ut connection string mot din egna
  
  