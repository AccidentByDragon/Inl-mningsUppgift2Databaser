DOCUMENTATION:

API:

Overview: 

APi:et är gjord som en del av en uppgift för en högkskolekurs, API:et är tänkt att innehålla och ge information om resemål och om länderna de är i, jag har valt att hålla det relativt enkelt och använda städer som resemål och hållit båda endpoint relativt enkela då de var egentligen inte huvudfokuset av uppgiften.

API Authentification & Authorization

Inget vid nuläget
    
API Endpoint Structure
    Grund API: 
    
    http://localhost:3000/api/
    
  Endpoint strukturen har två Endpoints dessa är Destinations och Locations;
  
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
  
  API:et ska inte behöva några specifika headers i sina request annat än de som görs automatiskt av Postman
    De viktigaste responser som skickas tillbaka via Postman ska vara följande:
      X-Powered-By: Express
      Content-Type: application/json; charset=utf=8

  API Examples:
  
  Provide example responses for each endpoint, showcasing both successful and error scenarios. These examples should help developers understand what to expect when interacting with the API.
  Example request from Destinations, using the GET http://localhost:3000/api/destinations request:
  Med en Status Kod 200
    
    "{
      "message": "you are trying to find all destinations",
      "destination": [
        {
            "_id": "6620dd44c537f853cc47df96",
            "country": "Sweden",
            "climate": "Temperate",
            "locations": [
                "Stockholm",
                "Gothenburg"
            ],
            "__v": 0
        },
        {
            "_id": "66278453cf737aada67d6cd0",
            "country": "United Kingdom",
            "climate": "Wet",
            "locations": [],
            "__v": 0
        }
      ]
    }"
    Möjliga fel:
    Status Kod 500, "could not connect to server database"
  Example request from Locations, using GET http://localhost:3000/api/locations/:id med en accepterad objektID
  Med en Status Kod 200:
  
    "message": "you are trying to find a location",
    "searchlocation": {
        "_id": "6620ec152c10d5f1f754990b",
        "locationName": "Stockholm",
        "Transport": [
            "Trams",
            "Busses",
            "Ferries",
            "Rail"
        ],
        "Restauraunts": [
            "Fastfood Chains",
            "Pizzerias"
        ],
        "Accomidation": [
            "Hotels",
            "AirBnB"
        ],
        "Country": {
            "_id": "6620dd44c537f853cc47df96",
            "country": "Sweden",
            "climate": "Temperate",
            "locations": [
                "Stockholm",
                "Gothenburg"
            ],
            "__v": 0
        },
        "__v": 0
    }
    Möjliga Fel och meddelanden, för denna request:
    
      ID som inte är giltig/accepterad av MongoDB:
        Status 400
        "message": "Bad Request: you did not give a valid Id"

      ID som är giltig men inte finns i Databasen:
        Status 404
        "message": "Not Found: Location matching id wasn't found"

      Fel på Server eller övriga fel:
        Status 500
        "could not connect to server database"
  
  API error handling:
  
    Status 500, API:et ger denna status kod vid ett kommunikations fel med Databasen/Servern bästa lösningen är omstart av servern.
  
    Status 400, API:et ger denna error kod vid en Bad request, vanligast är att den ID som en request använder är inte godtagen av MongoDB och är därför ogiltig
  
    Status 404, API:et är byggd att ge denna status när den inte hittar något som passar på request, oftast beror detta på att den ID som requesten anvädner inte finns i endpointen t.ex om man söker i Locations med ett ObjektId från Destinations.
    

  API throttling:
    Finns ingen implementerade throttling eller limiting vid nuvarande tillfälle
