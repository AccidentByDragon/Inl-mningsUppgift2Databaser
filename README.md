# Inl-mningsUppgift2Databaser
What?
Hur fungerar den (API:et alltså)
varför testerna ser ut som den gör
INSTRUKTIONER:


DOCUMENTATION:
API:
  Overview:
    APi:et är gjord för att innehålla information om resemål och om länderna de är i, för att göra detta så har jag byggt API:et att innehålla två endpoints som är locations och destinations. 
      - destinions är den endpoint som ska innehålla information om länder såsom klimat och resemål i dem. 
      - locations är den endpoint som innehåller information om de olika resemålen som t.ex. resturanger och hotell osv, i locations finns det även country fältet som är populerad från destinations så att det går att få till gång till destinations info inuti locations.
    Jag ville ursprunligen att det skulle gå att få locations i destinations men jag fick nöja mig med att lägga in destinations som en array av strings som man updaterar manuellt via Postman
  API Authentification & Authorization
    Inget vid nuläget
  API Endpoint Structure
    Som tidigare nämnd finns det två Endpoints Desitnations och Locations dessa nås genom följande HTTP metod:
      http://localhost:3000/api/
    
  API Parameters and Headers
    Destinations:
      http://localhost:3000/api/destinations - Grund http metod som ger all data locations innehåller; stödjer Get och Post
      http://localhost:3000/api/destinations/:id - metod för att arbeta med en specifik obejkt med via Id, här byts :id ut mot objektId av den objekt man vill ha; stödjer Get, Put och Delete.
    Locations:
      http://localhost:3000/api/locations - Grund http metod som ger all data locations innehåller; stödjer Get och Post
      http://localhost:3000/api/locations/:id - metod för att arbeta med en specifik obejtk med via Id, här byts :id ut mot objektId av den objekt man vill ha; stödjer Get, Put och Delete.
Test Utförning:
  Första steget av projektet var att planera ut uppläget av databas scheman, med mål att dela ut informationen så att det blev så enkelt att ha tillgång till det som möjligt
  