import Location from "../Models/locationModel.js";
export default function location(server, mongoose) {

  /*fields are:
  locationName: String,
  Transport: Array,
  Restauraunts: Array,
  Accomidation: Array,
  Country: populate from destination
  remember to use populate for country/destination
  String will be use disntead of arrays if all else fails
*/
  server.get('/api/locations', async (req, res) => {
    try {
      const templocations = await Location.find().populate("Country") // here we refer to key from object
      res.status(200).json({ message: 'you are trying to find all locations', locations: templocations }); 
    } catch (error) {
      res.status(500).json({ error: error, errormessage: "could not connect to server database" })
    }
  });

  server.get('/api/locations/:page/:limit', async (req, res) => {
    try {
      const InputPage = Number((req.params.page))
      if (InputPage != undefined && InputPage > 0) {
        const page = Number((req.params.page - 1));
        const limit = Number(req.params.limit);
        if (limit != undefined && limit > 0) {
          const templocations = await Location.find().skip(page * limit).limit(limit).populate("Country") // here we refer to key from object
          res.status(200).json({ message: 'you are trying to find all locations', templocations });
        }
        else {
          res.status(400).json({ message: "Bad Request: limit(second number) must be a valid number and greater than 0" })
        }
      }
      else {
        res.status(400).json({ message: "Bad Request: page(first number) must be a valid number and greater than 0" })
      }
    } catch (error) {
      res.status(500).json({ error: error, errormessage: "could not connect to server database" })
    }
  });

   server.get('/api/locations/:id', async (req, res) => {
     try {
       const correctIdCheck = mongoose.isValidObjectId(req.params.id)
       if (correctIdCheck == true) {
         const searchlocation = await Location.findById(req.params.id).populate("Country") // here we refer to key from object
         if (!searchlocation) {
           res.status(404).json({ message: "Bad Request: Location matching id wasn't found" });
         }
         else {
           res.status(200).json({ message: 'you are trying to find a location', searchlocation })
         }
       }
       else {
         res.status(400).json({ message: 'Bad Request: you did not give a valid Id' })
       }

    } catch (error) {
      res.status(500).json({ error: error, errormessage: "could not connect to server database" })
    }
  });
  //experiment with a get/fetch using country, as ID assinged by MongoDB is awkward to remember
/*   server.get('/api/locations/:country', async (req, res) => {
    try {
      const SearchCountry =req.params.country
      const filteredList = await Location.find({locationName:SearchCountry}).populate("Country")
    } catch (error) {
      res.status(500).json({ error: error, errorMessage:"Somethign went wrong"})
    }
  }); */

  server.post('/api/locations', async (req, res) => {
    try {
      const locName = req.body.locationName;
      const locTransport = req.body.Transport;
      const locCuisine = req.body.Restauraunts;
      const locAccomidation = req.body.Accomidation;
      const linkedDestination = req.body.Country;
      if (locName == undefined || locTransport == undefined || locCuisine == undefined || locAccomidation == undefined || linkedDestination == undefined) {
        res.status(400).json({
          message: "Bad Request: Body must contain and the correct data in the right format: locationName: String, Transport: Array, Restauraunts: Array, Accomidation: Array, Country: objectId of a Destination" })
      }
      else if (locName.length <= 0 || linkedDestination.length <= 0) {
        res.status(400).json({ message: "Bad Request: LocationName and Country must both be longer than 0 characters" })
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
        res.status(201).json({ createdBLocation: newLoc });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occured while creating the location." });
    }
  });

  server.put('/api/locations/:id', async (req, res) => {
    try {
      const locName = req.body.locationName;
      const locTransport = req.body.Transport;
      const locCuisine = req.body.Restauraunts;
      const locAccomidation = req.body.Accomidation;
      const linkedDestination = req.body.Country;
      const correctIdCheck = mongoose.isValidObjectId(req.params.id)
      if (correctIdCheck == true) {
        if (locName == undefined || locTransport == undefined || locCuisine == undefined || locAccomidation == undefined || linkedDestination == undefined) {
          res.status(400).json({
            message: "Bad Request: Body must contain and the correct data in the right format: locationName: String, Transport: Array, Restauraunts: Array, Accomidation: Array, Country: objectId of a Destination"
          })
        }
        else if (locName.length <= 0 || linkedDestination.length <= 0) {
          res.status(400).json({ message: "Bad Request: LocationName and Country must both be longer than 0 characters" })
        }
        else {
          const returnLocation = await Location.findById(req.params.id);
          if (!returnLocation) {
            res.status(404).json({ message: "Bad Request: Location matching id wasn't found"});
          }
          else {
            const updateLocation = await Location.findByIdAndUpdate(req.params.id, req.body);
            const NewLocation = await Location.findById(req.params.id);
            res.status(200).json({ updatedLocation: updateLocation, Changedto: NewLocation });
          }
        }
      } else {
        res.status(400).json({ message: 'Bad Request: you did not provide a valid Id'})
      }
    }
    catch (error) {
      res.status(500).json({ message: "An error occured while updating location." });
    }
  });

  server.delete('/api/locations/:id', async (req, res) => {
    try {
      const correctIdCheck = mongoose.isValidObjectId(req.params.id)
      if (correctIdCheck == true) {
        const deletedLocation = await Location.findByIdAndDelete(req.params.id);
        if (!deletedLocation) {
          res.status(404).json({ message: "Bad Request: Location matching id wasn't found"});
        }
        else {
          res.json({ message: "Location has been deleted!", deletedLocation }); // Bekräftelse på att användaren har raderats.
        }
      } else {
        res.status(400).json({ message: 'Bad Request: you did not provide a valid Id'})
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occured while deleting location."});
    }
  });

}