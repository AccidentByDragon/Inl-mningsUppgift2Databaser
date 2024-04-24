# Inl-mningsUppgift2Databaser
What?
Hur fungerar den (API:et alltså)
varför testerna ser ut som den gör
INSTRUKTIONER:


DOCUMENTATION:
API:
  Overview:  
    APi:et är gjord som en del av en uppgift för en högkskolekurs, API:et är tänkt att innehålla och ge information om resemål och om länderna de är i, jag har valt att hålla det relativt enkelt och använda städer som resemål och hållit båda endpoint relativt enkela då de var egentligen inte huvudfokuset av uppgiften.

  API Authentification & Authorization
    Inget vid nuläget
  API Endpoint Structure
    Grund API: http://localhost:3000/api/
      Endpoint strukturen har två Endpoints dessa är Destinations och Locations
    Destinations:
      http://localhost:3000/api/destinations
      Destinations är den endpoint som innehåller information om länder, objekten i denna endpoint innehåller följande fält: country, climate, locations och _id; country är en string som ska är tänkt att innehåller ett namnet av destinationen; climate är en string fält som ska innehålla information om väder, temperatur och annat klimat relaterat; locations ska vara en array som kan fyllas med namnen på locations som finns i Destinationen, jag ville ursprunligen att det skulle gå att få locations i destinations men jag fick nöja mig med att lägga in destinations som en array av strings som man updaterar manuellt via Postman; _id är den automatiskt givna objectId och är den som används vid sökningar på id.
      
    Locations:
      http://localhost:3000/api/locations
      Locations är den endpoint som innehåller information om resemål, objekten i denna endpoint innehåller föjlande fält: locationName, Transport, Restaurants, Accomidation, Country och _id; locationName är en string fält som är tänkt att innehålla namnet av resemålet; Transport ska vara en array som ska fyllas med strings som namnger de olika transport former som finns vid resemålet; Restauraunts ska vara en array som ska fyllas med strings som namnger de olika restaurangersorter som finns vid resemålet; Accomidation ska vara en array som fylls med strings som namnger eller beskriver de boendealternativ som finns vid resemålet; Country är en string field som ska fyllas med en _id från Destinations endpoint för att den ska vara populerade med objekt från destinations; _id är den automatiskt givna objectId och är den som används vid sökningar på id. 
  API Parameters
    Destinations:
      http://localhost:3000/api/destinations - Grund http metod som ger all data locations innehåller; används vid GET och POST metoder
      http://localhost:3000/api/destinations/:id - metod för att arbeta med en specifik obejkt med via Id, här byts :id ut mot objektId av den objekt man vill ha; Kan användas till GET, PUT och DELETE.
      http://localhost:3000/api/destinations/:page/:limit
    Locations:
      http://localhost:3000/api/locations - Grund http metod som ger all data locations innehåller; används vid GET och POST metoder
      http://localhost:3000/api/locations/:id - metod för att arbeta med en specifik obejkt med via Id, här byts :id ut mot objektId av den objekt man vill ha; Kan användas till GET, PUT och DELETE.
      http://localhost:3000/api/locations/:page/:limit
  API Headers:
      ???
      Request headers are sent by the client to the server and contain information and instructions related to the requested resource, while response headers are sent by the server to the client and provide metadata, instructions, and additional information about the response itself.
  API Examples:
      Provide example responses for each endpoint, showcasing both successful and error scenarios. These examples should help developers understand what to expect when interacting with the API.
  API error handling:
      List all possible error codes and their meanings, along with guidance on how to handle these errors in the client application. This will help developers troubleshoot issues and create more robust applications.
  API throttling

Testrapport:
  
  