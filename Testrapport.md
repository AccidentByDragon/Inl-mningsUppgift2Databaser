# Test Rapport
## Övriga test
alla tester inkluderar en version av "pm.expect(pm.response).to.have.status(200)" för att kolla att resquesten kom fram och besvarades av servern, detta är för att dubbel kolla att eventuella misslyckade tester är inte pågrund utav fel med servern genom att se till att servern ger en 200 respons, om denna misslyckas när den inte ska så är det på grund av något har gått fel med att skicka testen
## Manuella Tester
### Get metoder
Dessa enkla tester håller sig till att kolla enklare saker
#### GET all Destination/locations
det finns en get all request test för båda endpoint och både gör i grunden samma saker, de saker dem testar är följande:
kollar att datan den får tillbaka är av rätt content typ, detta gjordes genom att kolla om response headers inkluderade json som sin content typ genom följande metoden:
    pm.expect(pm.response.headers.get('Content-Type')).to.exist;
    pm.expect(pm.response.headers.get("Content-Type")).to.include('application/json')
dessa användes för att kolla att content-type header finns och att den faktiskt är json.
därefter så görs ett sista test som kollar om responsen är en Array, detta gör genom följande metod:
  pm.test("Response should be an array", function () {
     pm.expect(pm.response.json().destination).to.be.an('array');
  });
denna test (i detta exemplet mot destinations endpoint) kollar om responsen innehålelr en array vilket vi förväntar oss att den ska göra om den hämtar allt i en endpoint
anledning till att jag gjort testet på denna vis är för att det var en snabbt metod att kolla om GET ALL requests ger en korrekt respons samt som det kollar att content type är korrekt.
#### GET ALL destinations/locations Paginerade
dessa tester går ut på att be API:et att paginerar informationen genom följande tester och finns för båda endpoints:
1. Kollar om responsen följer den limit den har fått, detta görs genom att först spara en variabel som ska innehålla limiten (i dessa exemplen 1), och sedan kolla om den array som kommer som respons faktiskt ahr en längd av 1; därefter sparas den sista värdet av array för att användas i andra steget av testen.
2. efter första testet görs en test som kollar om request parametrarna ändras ger en anna resultat detta görs genom genom att skicka en chain request där page är 2 med en limit av 1 t.ex(HTTP://localhost:3000/destinations/2/1) för att sedan kolla om de sista värdet i den nya array som ges i respons är inte samma som den sparade värdet från första delen av testet
ajg valde denna metod för att göra testet då det är en någorlunda simpelt men tydlig sätt att testa om paginering görs rätt, i detta fallet används ett lågt värde för limit då databasen inte innehåller särskilt mycket data.
#### GET via ID
Dessa tester finns för alla endpoints i databasen och har samma struktur på testerna, där efter status kod test så genomförs två tester den första är en content type check för i samma stil som vid GET all testerna dvs. dessa metoder:
  pm.expect(pm.response.headers.get('Content-Type')).to.exist;
  pm.expect(pm.response.headers.get("Content-Type")).to.include('application/json')
Därefter görs en enkle test för att kolla om den objekt har ett id som stämmer den id man söker med, detta görs med följande request och test metod:
Request: 

  http://localhost:3000/locations/{{ogLocId}}

Metod:

  " pm.test("returned object has right id", function () {
    pm.expect(pm.response.json()).to.be.an('object');
    pm.expect(pm.response.json().searchlocation).to.have.property('_id').that.eqls(pm.environment.get('ogLocId'));
  });"
Denna kollar om denna returnerade objektet har ett id som stämmer med den inmatade id:et, genom att jämföra med den en variable med som är sparad i enviroment som också är den som används för att söka, just denna sätt att testa är då jag ansåg att det var den enklaste sättet att kolla om responser var korrekt medd en inmatade id; vid Destinations så ser testet ut ungefär likadant med locations byt till destinations och "ogLocId" byt mot "ogDestId".
#### GET bad requests
Dessa är en rad olika test requests som går ut påa tt dubbelkolla att de fel meddelanden som finns inprogrammerade ges när de ska ges då dessa finns för båda endpoints så görs endast testerna på locations endpoint här, den första av testet är med följande request:
##### Bad get request invalid ID
  http://localhost:3000/locations/stockholm
med denna test:
  pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
  });
i detta test så matas in en avsiktligt fel request med en invalid Id dvs en id som inte är en id enligt mongoDB; sedan kollar vi om API:et ger den rätta felmeddelande som vi vill ah, i detta fall 400.
##### Bad get request cannot find id
Nästa Bad request test som finns är med ett giltig ID som inte finns i databasen då använder vi följande request:
  http://localhost:3000/locations/{{ogDestId}}
med testet:
  pm.test("Status code is 404", function () {
    pm.response.to.have.status(404);
  });
Denna request och test matar in ett id som finns i destinations endpoint, vilket mongoDb accepterar dåd en känner igen den som ett id men skulle aldrig hitta ett obejkt, därför förväntas testet ge en 404 status kod då den inte hittar ett passande objekt.
### HTTP metoder
#### Create metoder
Dessa tester fokuserad på att genomföra Create metoder och kolla att de görs rät
### Stress Tests etc

## Automatiserade tester

## Tester som inte har gjorts och varför
### 6. Check if the API handles special characters and non-English text correctly in input data and returned responses.

### 7. Test the API’s response when sending concurrent requests to ensure that it can handle multiple users and maintain data consistency.

### 11. Verify that the API can recover gracefully from failures, such as database connection issues without compromising data integrity.
