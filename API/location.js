import Location from "../Models/locationModel.js";
export default function location(server, mongoose) {

  /*fields are:
  locationName: String,
  Transport: Array,
  Restauraunts: Array,
  Accomidation: Array,
  Country: populate from destination
  remember to use populate for country/destination
*/
  server.get('/api/locations', async (req, res) => {
    try {
      const templocations = await Location.find().populate("Country") // here we refer to key from object
      res.status(200).json({ message: 'you are trying to find all locations', locations: templocations }); 
    } catch (error) {
      res.status(500).json({ error: error })
    }
  });

  server.get('/api/locations/:id', async (req, res) => {
    try {
      const searchlocation = await Location.findById(req.params.id).populate("Country") // here we refer to key from object
      res.status(200).json({ message: 'you are trying to find a location', searchlocation })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  });
  //experiment with a get/fetch using country, as ID assinged by MongoDB is awkward to remember

  server.post('/api/locations', async (req, res) => {
    try {
      const locName = req.body.locationName;
      const locTransport = req.body.locationTransport;
      const locCuisine = req.body.restauraunts;
      const locAccomidation = req.body.accomidations;
      const linkedDestination = req.body.country;

      if (locName.length <= 0 || linkeDestination.length <= 0) {
        res.status(400).json({ message: "Body must contain username and password with more than 0 characters" })
      }
      else {
        const newLoc = new Location({
          locationName: locName,
          Transport: locTransport,
          Restauraunts: locCuisine,
          Accomidation: locAccomidation,
          Country: linkedDestination
        })
        await newLoc.save();
        console.log(newLoc);
        res.status(201).json({ createdBook: newLoc });
      }
    } catch (error) {
      res.status(500).json({ error: error })
    }
  });

  server.put('/api/locations/:id', async (req, res) => {
    try {
      const updateLocation = await Location.findByIdAndUpdate(req.params.id, req.body);
      const returnLcoation = await Location.findById(req.params.id);
      res.json({ updatedLocation: updateLocation, Changedto: returnLcoation });
    }
    catch (error) {
      res.status(500).json({ error: error })
    }
  });

  server.delete('/api/locations/:id', async (req, res) => {
    try {
      const deletedLocation = await Location.findByIdAndDelete(req.params.id);
      if (!deletedLocation) {
        return res.status(404).json({ message: "Location wasn't found" });
      }
      res.json({ message: "Location has been deleted!" }); // Bekräftelse på att användaren har raderats.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occured while deleting location." });
    }
  });

}