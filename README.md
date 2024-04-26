# Inl-mningsUppgift2Databaser
INSTRUKTIONER:
Satsar på G, VG är helt ok, jag fick väldigt ont om tid vid testandet pga hälso problem
### Importera Enveiroment:
Många av testerna är byggda genom envieroment varibles i postman därför ska envieroment importeras för att de ska kunna fungera ordentligt;
Envieroment finns här:
Import Filer\Locations & Destinations.postman_environment.json
### postman mock server:


### Without connection string:
Vissa utav testerna är beroende av existerande data, för att dessa ska fungera gör följande:
#### 1. Importering av JSON till Databaser
Importera JSON filerna in i MongoDB:
Import Filer\PVTInlämningsuppgift2.locations.json
Import Filer\PVTInlämningsuppgift2.locations.json
#### 2. ändra server connection string inuti Server.js
Gå in i Server.js och byt ut connection string mot din egna
  
  