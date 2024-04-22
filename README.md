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
Test Utförning:
  Första steget av projektet var att planera ut uppläget av databas scheman, med mål att dela ut informationen så att det blev så enkelt att ha tillgång till det som möjligt
  