# Test Rapport
## Övriga test
alla tester inkluderar en version av "pm.expect(pm.response).to.have.status(200)" för att kolla att resquesten kom fram och besvarades av servern, detta är för att dubbel kolla att eventuella misslyckade tester är inte pågrund utav fel med servern genom att se till att servern ger en 200 respons, om denna misslyckas när den inte ska så är det på grund av något har gått fel med att skicka testen
## Manuella Tester
### Get metoder
Dessa enkla tester håller sig till att kolla enklare saker
#### GET all Destination/locations
det finns en get all request test för båda endpoint och både gör i grunden samma saker, det saker dem testar är följande:
kollar att datan den får tillbaka är av rätt content typ, detta gjordes genom att kolla om response headers inkluderade json som sin content typ genom följande metoden:
    pm.expect(pm.response.headers.get('Content-Type')).to.exist;
    pm.expect(pm.response.headers.get("Content-Type")).to.include('application/json')
dessa användes för att kolla att content-type header finns och att den faktiskt är json.
#### GET ALL destinations/locations Paginerade
dessa tester går ut på att be API:et att paginerar informationen genom följande tester och finns för båda endpoints:
1. Kollar om responsen följer den limit den har fått, detta görs genom att först spara en variabel som ska innehålla limiten (i dessa exemplen 1), och sedan kolla om den array som kommer som respons faktiskt ahr en längd av 1; därefter sparas den sista värdet av array för att användas i andra steget av testen.
2. efter första testet görs en test som kollar om request parametrarna ändras ger en anna resultat detta görs genom genom att skicka en chain request där page är 2 med en limit av 1 t.ex(HTTP://localhost:3000/destinations/2/1) för att sedan kolla om de sista värdet i den nya array som ges i respons är inte samma som den sparade värdet från första delen av testet
#### GET via ID
Dessa tester finns för alla endpoints i databasen och har samma struktur på testerna, där efter status kod test så genomförs två tester den första är en content type check för i samma stil som vid GET all testerna dvs. dessa metoder:
  pm.expect(pm.response.headers.get('Content-Type')).to.exist;
  pm.expect(pm.response.headers.get("Content-Type")).to.include('application/json')
Därefter görs en enkle test för att kolla om den objekt har ett id som stämmer den id man söker med, detta görs med följande metod:
  "var jsonData = pm.response.json();
  pm.test("returned object has right id", function () {
    pm.expect(pm.response.json()).to.be.an('object');
    pm.expect(pm.response.json().searchlocation).to.have.property('_id').that.eqls(pm.environment.get('ogLocId'));
  });"
Denna test 
### HTTP metoder

## Automatiserade tester

## Tester som inte har gjorts och varför
### 6. Check if the API handles special characters and non-English text correctly in input data and returned responses.

### 7. Test the API’s response when sending concurrent requests to ensure that it can handle multiple users and maintain data consistency.

### 11. Verify that the API can recover gracefully from failures, such as database connection issues without compromising data integrity.
