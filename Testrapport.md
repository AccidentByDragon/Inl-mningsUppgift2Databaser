# Test Rapport
## Övriga test
alla tester inkluderar en version av "pm.expect(pm.response).to.have.status(200)" för att kolla att resquesten kom fram och besvarades av servern, detta är för att dubbel kolla att eventuella misslyckade tester är inte pågrund utav fel med servern genom att se till att servern ger en 200 respons, om denna misslyckas när den inte ska så är det på grund av något har gått fel med att skicka testen

vid förklaringen av testerna skriver jag ut hela http strägnen men i postman collection använder jag mig av en enviroment variable som innehåller den del av http strängen som ser alltid likadan ut, dvs httP://localhost:3000/api/ är gömnd i en enviroment varible.
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

denna test (i detta exemplet mot destinations endpoint) kollar om responsen innehåller en array vilket vi förväntar oss att den ska göra om den hämtar allt i en endpoint
anledning till att jag gjort testet på denna vis är för att det var en snabbt metod att kolla om GET ALL requests ger en korrekt respons samt som det kollar att content type är korrekt.
#### GET ALL destinations/locations Paginerade
dessa tester går ut på att be API:et att paginerar informationen genom följande tester och finns för båda endpoints:

  1. Kollar om responsen följer den limit den har fått, detta görs genom att först spara en variabel som ska innehålla limiten (i dessa exemplen 1), och sedan kolla om den array som kommer som respons faktiskt har en längd av 1; därefter sparas den sista värdet av array för att användas i andra steget av testen.

  2. efter första testet görs en test som kollar om request parametrarna ändras ger en anna resultat detta görs genom genom att skicka en chain request där page är 2 med en limit av 1 t.ex(http://localhost:3000/api/destinations/2/1) för att sedan kolla om de sista värdet i den nya array som ges i respons är inte samma som den sparade värdet från första delen av testet

jag valde denna metod för att göra testet då det är en någorlunda simpelt men tydlig sätt att testa om paginering görs rätt, i detta fallet används ett lågt värde för limit då databasen inte innehåller särskilt mycket data.
#### GET via ID
Dessa tester finns för alla endpoints i databasen och har samma struktur på testerna, där efter status kod test så genomförs två tester den första är en content type check för i samma stil som vid GET all testerna dvs. dessa metoder:

    pm.expect(pm.response.headers.get('Content-Type')).to.exist;
    pm.expect(pm.response.headers.get("Content-Type")).to.include('application/json')

Därefter görs en enkle test för att kolla om den objekt har ett id som stämmer med den id man söker med, detta görs med följande request och test metod:
Request: 

  http://localhost:3000/api/locations/{{ogLocId}}

Metod:

    pm.test("returned object has right id", function () {
      pm.expect(pm.response.json()).to.be.an('object');
      pm.expect(pm.response.json().searchlocation).to.have.property('_id').that.eqls(pm.environment.get('ogLocId'));
    });

Denna kollar om denna returnerade objektet har ett id som stämmer med den inmatade id:et, genom att jämföra med den en variable med som är sparad i enviroment som också är den som används för att söka, just denna sätt att testa är då jag ansåg att det var den enklaste sättet att kolla om responser var korrekt medd en inmatade id; vid Destinations så ser testet ut ungefär likadant med locations byt till destinations och "ogLocId" byt mot "ogDestId".
#### GET bad requests
Dessa är en rad olika test requests som går ut påa tt dubbelkolla att de fel meddelanden som finns inprogrammerade ges när de ska ges då dessa finns för båda endpoints så görs endast testerna på locations endpoint här, den första av testet är med följande request:
##### Bad get request invalid ID

  http://localhost:3000/api/locations/stockholm

med denna test:

    pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
    });

i detta test så matas in en avsiktligt fel request med en invalid Id dvs en id som inte är en id enligt mongoDB; sedan kollar vi om API:et ger den rätta felmeddelande som vi vill ha, i detta fall 400.
##### Bad get request cannot find id
Nästa Bad request test som finns är med ett giltig ID som inte finns i databasen då använder vi följande request:

  http://localhost:3000/api/locations/{{ogDestId}}

med testet:

    pm.test("Status code is 404", function () {
    pm.response.to.have.status(404);
    });

Denna request och test matar in ett id som finns i destinations endpoint, vilket mongoDb accepterar då den känner igen det som ett id men skulle aldrig hitta ett obejkt, därför förväntas testet ge en 404 status kod då den inte hittar ett passande objekt.
### HTTP metoder
#### Create metoder
Dessa tester fokuserad på att genomföra Create metoder och kolla att de görs rätt och att det som skapas går att hitta efter, detta görs genom lite tester efter en Create request, då dessa ser likadant ut oavsätt endpoint så gör jag bara en förklaring som ska fungera för både, men använder http://localhost:3000/api/destinations för exemplet;
  1. den första testen är en status kod test, som letar efter status kod 201 för att konfirmera att objektet skapats, detta är i samma stil som tidigare status kod koll

    pm.test('Response status code is 201', function () {
      pm.response.to.have.status(201);
    })

  2. den andra testen är en test som går igenom objektet som skapats och kollar att API faktiskt har tagit emot requesten och matat in allt i rätt fält, sedan spara den ett id som API:et säger tillhör det nya objektet(destID) inför den tredje testet, den är sparade som en enviroment varibel så att den kan användas vid andra metoder(t.ex. DELETE). detta görs genom följande kod:

    pm.test("Response body has created Destination with _id property", function () {
      pm.expect(pm.response.json().createdDestination._id).to.exist;
      var savedID = pm.response.json().createdDestination._id;
      savedObjekt = pm.response.json().createdDestination;
      console.log(savedID);
      pm.environment.set('destID', savedID)
      console.log(pm.environment.get('destID'))
    });

  3. den tredje testet är en chain request som skickar en GET till samma databas med det sparade ID, detta görs för att dubbelkolla att det faktiskt finns ett objekt som passar har den ID som API:et säger den har skapat create requesten under, detta gör vi med följande kod:

    pm.test('The should be able to find an objekt with saved _id', function () {
      pm.sendRequest('http://localhost:3000/api/destinations/' + pm.environment.get('destID'), (error, response) => {
        if (error) {
            console.log(error);
        }
        pm.expect(response.json().destination._id).to.eql(savedObjekt._id);        
      });
    })

  denna test kollar om det nu finns ett objekt på det id som den matar in på samma sätt som de GET requests med id, gör, det hade gått att leta efter andra inmatade värden men detta var det enklaste sättet att göra kollen, som inte var att bara kolla om efter status koden.
#### Update Metoder
Dessa tester gick ut på att genomföra Update metoderna och verifiera att de faktiskt gör det de påstår att de gör, då Update metoden är likadan för båda endpoints så ser testerna ut likadant ut men anvädner en annan variable, denna varibel är en enviroment varible som lagrar ett object id från ett redan existerand objekt för att underlätta processen; jag använder http://localhost:3000/api/locations för förklaringen, med en request string som ser ut som följande:

  http://localhost:3000/api/locations/{{ogLocId}}

  1. efter en status test så är den första testet som görs en test som kollar om det objekt som API:et returnerar har det ID som matats in, detta görs genom följande metod:

    var checkedupdate;
    pm.test("Response body has created location with _id property", function () {
      pm.expect(pm.response.json()).to.be.an('object');
      pm.expect(pm.response.json().Changedto).to.have.property('_id').that.eqls(pm.environment.get('ogLocId'));
    checkedupdate = pm.response.json().Changedto;
    });

  Denna metod kollar om den id som requesten skickade (i exemplet ogLocId) update till är faktiskt den som returneras, jag valde denna metod då det var enklaste sättet att arbeta med API:et då den returnerar ett objekt så kan obejktets id kollas och jämförs med den inmatade ID strängen fårn requesten; jag passar också på att spara ned den retunerade objektet inför nästa steg i testet.

  2. Andra steget i tester är att göra en Chain Get request för att hämta ut objektet och kolla om den har sparats rätt genom att jämföra den tidigare sparade objektet med den som returneras genom chain requesten detta gör genom följande metod:

      pm.test("The updated info is saved", function(){
        pm.sendRequest('http://localhost:3000/api/locations/' + pm.environment.get('ogLocId'), (error, response) => {
        if (error) {
        console.log(error);
        }
          console.log(checkedupdate);
          console.log(response.json().searchlocation);
          pm.test('response should be same as updated info', function () {
          pm.expect(response.json().searchlocation).to.eql(checkedupdate)
        })    
      });
      });

  Denna test dubbellkollar om den tidigare updaterade objektet har faktiskt sparats korrekt och returneras om man letar efter den via en GET request, för att göra detta körs en GET request som siktar på den Id som används i de tidigare requests för att sedan jämföra den med den objekt som sparades i första steget, med logiken att om dessa är likadana så har Update gjort det den ska och sparat ned den korrekt.

  Jag valde dessa test metoder för att jag ansåg att det var de mest logiska och enkla sätten att kolla om requesten gjorts rätt samt som det känndes mest pålitliga och funktionella med API:et  
#### Delete Metoder
Dessa tester gick ut på att kolla att API:et genomförde Delete Requests på ett korrekt sätt, igen metoderna är likadan för både endpoints så använder jag bara en som exemple för förklaringen. Då denna request använder sig utav ett ID från de tidigare requests så kan den misslyckas om den inte hittar något eller har en ID att köra med. 
requesten i exemplet ser ut som följande: 

  http://localhost:3000/api/locations/{{locID}}

  1. efter den initialla status kod testen så körs en test för att kolla om DELETE request körs på den rätta id:et, detta görs genom följande metod:

    pm.test("Deleted object had correct id", function () {
      var responseObject = pm.response.json();
      pm.expect(responseObject).to.be.an('object');
      pm.expect(responseObject.deletedLocation).to.have.property('_id').that.eqls(pm.environment.get('locID'));
    });
  
  Denna test kollar om den Objekt API:et returnerar har ett Id som passar på den som requesten söker efter, detta är också samma Id som sparats från CREATE metoden för att underlätta och smidig göra testet.

  2. nästa steg i testet var en Chain request som söker på det Id som ska ha raderats och förväntar en 404 status kod, denna metod ser ut som följande:

    pm.test('The should no longer be an objekt with deleted _id', function () {
    pm.sendRequest('http://localhost:3000/api/locations/' + pm.environment.get('locID'), (error, response) => {
        if (error) {
            console.log(error);
        }
        pm.expect(response).to.have.status(404);
      });
    });
  
  hör var tanken att om DELETE genomförts korrekt genom att helt enkelt söka efter objektet som raderats. detta ska förväntas misslyckas med ett 404 respons då det inte ska finnas något på det id:et om Delete metoden har genomförts.

Jag valde dessa tester då de var tester som fungerade för att testa att requesten genomförts korrekt och på ett sätt som är tydlig genom tester; jag är däremot inte helt nöjd med att hela DELETE testet är beroende av en enviroment varible som kanske inte nödvändigt vis finns.

#### BAD Request
Dessa tester finns för att vissa delar av felmeddelandena som finns i UPDATE och DELETE metoderna, då de fungerar som de tidigare bad request tester så går jag endast kort igenom dem här; dessa tester avsiktligt skickar felaktig information till API:et för att kolla om det skickar rätt sorts felmeddelanden, de som har gjorts har invalid strings som inmatning och med en id som inte finns i endpointen. och förväntar sig att API:et ska skicak korrekt status meddelanden 400 vid en invalid string och 404 vid en id som inte finns i endpointen.
### Stress Tests etc
#### Performance
För att undsöka performance görs en enkel test baserad på att mäta responstiden, detta görs genoma tt skicka en GET request till följande endpoint:
  
  http://localhost:3000/api/locations

  därefter görs en snabb test som ser ut som följande:

    pm.test("Response time is less than 300ms", () => {
      pm.expect(pm.response.responseTime).to.be.below(300);
    });

Denna test mäter helt enkelt om responstidnen är under 300ms, jag körde med denna metod då det var den enklaste sättet att göra en manuell performance test.
#### Rate Limiting
Dessa tester undersöker om rate limitng finns genom att skicka en GET request till en endpoint i denna test:
  
  http://localhost:3000/api/locations

  därefter görs följande tester:

    pm.test("Rate limiting header is present", function () {
      pm.expect(pm.response.headers.has('X-RateLimit-Limit')).to.be.true;
    });

    pm.test("Rate limiting reset time is present", function () {
      pm.expect(pm.response.headers.has('X-RateLimit-Reset')).to.be.true;
    });

  dessa tester syfter att snabbt kolla om Rate limiting finns och har implementerats genom att kolla om headers det den ska ha, däremot så kollar inte denna test om Rate limiting implementerats korrekt, då detta är mer anpassad för en automatiserade test.
Jag valde att hålla mig till en enlare test här då som tidigare nämnt så är det lättare att kolla Rate Limiting via automatiserade testerna. 
## Automatiserade tester
De automatiserade testerna är i de flesta fallen identiska till de manuella testerna så jag hänvisar till de test sammanfattnignarna från manuella testerna för de flesta, däremot så finns det en test bland de automatiserade tester som inte finns innan då det inte var särskilt vettig att göra som en manuell test.
### Stress test
#### Implementering av Rate Limiting
Denna test finns endast i Automatiserade testerna och syftar till att göra det möjligt att udnersöka om den Rate limiting och throttling som finns gör det den ska, detta görs genom att skicka en request till följande:

  http://localhost:3000/api/locations

  därefter så görs följande test:

    pm.test("API returns 429 after Too Many Requests after exceeding rate limit", function () {
      if (pm.info.iteration > 100) {
        pm.expect(pm.response.code).to.equal(429);
      } else {
        pm.expect(pm.response.code).to.not.equal(429);
      }
    });

  Denna test kollar att om denna request har körts mer än 100 gånger så ska den få ett fel meddelande från servern, detta fungerar om testet körs för sig men om amn skulle köra hela collectionen så skulle servern stänga ut en innan man har kört alla iterationer vilket gör att testet misslyckas även om det fortfarande bevisar att servern tillämpar rate-limiting.
## Tester som inte har gjorts och varför
### 6. Check if the API handles special characters and non-English text correctly in input data and returned responses.
denna test hann jag inte impelementera varken API funktionalitet eller en test för att undersöka funktionalitet för.
### 7. Test the API’s response when sending concurrent requests to ensure that it can handle multiple users and maintain data consistency.
Denna test implementerade jag inte, då jag inte hann komma fram till en metod att gennomföra testet utan speciliserade verktyg.
### 11. Verify that the API can recover gracefully from failures, such as database connection issues without compromising data integrity.
Detta var en test jag inte han skapa test eller tillämpa API funktionalit för
### 12. Develop an automated test to handle edge cases, such as requests with missing or invalid parameters, and ensure that appropriate error messages are returned.
tillskillnad för de andra testerna här så har jag delvis implenterat funktionalitet för denna uppgift då det finns tester som skickar avsiktligt felaktiga request för att kolla hur servern hanterar dem men det finns inte specefika test delar för utan de finns som under kategorier av de andra testerna i form av Bad requests.