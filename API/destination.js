import Destination from "../Models/destinationModel.js";
export default function destination(server, mongoose) {

/*fields are:
  country: String,
  climate: String,
  locations: Array
*/
  server.get('/api/destinations', async (req, res) => {
    try {
      const destination = await Destination.find()      
      res.status(200).json({ message: 'you are trying find to all destination', destination });
    } catch (error) {
      res.status(500).json({ error: error, errormessage: "could not connect to server database"})
    }
  });

  server.get('/api/destinations/:page/:limit', async (req, res) => {
    try {
      const InputPage = Number((req.params.page))
      if (InputPage != undefined && InputPage > 0) {
        const page = Number((req.params.page - 1));
        const limit = Number(req.params.limit);
        if (limit != undefined && limit > 0) {
          const tempDestination = await Destination.find().skip(page * limit).limit(limit)
          res.status(200).json({ message: 'you are trying find to all destination', tempDestination });
        }
        else {
          res.status(400).json({message: "Bad Request: limit(second number) must be a valid number and greater than 0"})
        }
      }
      else {
        res.status(400).json({ message: "Bad Request: page(first number) must be a valid number and greater than 0"})
      }
    } catch (error) {
      res.status(500).json({ error: error, errormessage: "could not connect to server database" })
    }
  });
  
  server.get('/api/destinations/:id', async (req, res) => {
    try {
      const correctIdCheck = mongoose.isValidObjectId(req.params.id)
      if (correctIdCheck == true) {
        const destination = await Destination.findById(req.params.id)
        if (!destination) {
          return res.status(404).json({ message: "Bad Request: Destination matching id wasn't found" });
        }
        else {
          res.status(200).json({ message: 'you are trying to a destination', destination }) //should this be country instead?
        }
      } else {
        res.status(400).json({ message: 'Bad request: you did not give a valid Id'})
      }
    } catch (error) {
      res.status(500).json({ error: error, errormessage: "could not connect to server database" })
    }
  });
  //experiment with a get/fetch using country, as ID assinged by MongoDB is awkward to remember
  server.post('/api/destinations', async (req, res) => {
    try {
      const country = req.body.country;
      const climate = req.body.climate;
      const locations = [];
      if (country == undefined || climate == undefined || locations == undefined) {
        res.status(400).json({ message: "Country, Climate and locations must not be undefined" })
      }
      else if (country.length <= 0 || climate.length <= 0) {
        res.status(400).json({ message: "Body must contain country and climate with more than 0 characters" })
      }
      else {
        const newDest = new Destination({
          country: country,
          climate: climate,
          locations: locations
        })
        await newDest.save();
        console.log(newDest);
        res.status(201).json({ createdDestination: newDest });
      }
    } catch (error) {
      res.status(500).json({ error: error, errormessage: "could not connect to server database" })
    }
  });

  server.put('/api/destinations/:id', async (req, res) => {
    try {
      const correctIdCheck = mongoose.isValidObjectId(req.params.id)
      if (correctIdCheck == true) {
        if (country == undefined || climate == undefined || locations == undefined)
        {
          res.status(400).json({ message: "Country, Climate and locations must not be undefined" })
        }
        else if (country.length <= 0 || climate.length <= 0) {
          res.status(400).json({ message: "Body must contain country and climate with more than 0 characters" })
        }
        else {
          const checkDestination = await Destination.findById(req.params.id)
          if (!checkDestination) {
            return res.status(404).json({ message: "Bad Request: Destination matching id wasn't found"});
          }
          else {
            const updateDestination = await Destination.findByIdAndUpdate(req.params.id, req.body);
            const returnDestination = await Destination.findById(req.params.id);
            res.status(200).json({ updatedDestination: updateDestination, Changedto: returnDestination });
          }
        }
      } else {
        res.status(400).json({ message: 'Bad request: you did not give a valid Id'})
      }      
    }
    catch (error) {
      res.status(500).json({ error: error, errormessage: "could not connect to server database" })
    }
  });

  server.delete('/api/destinations/:id', async (req, res) => {
    try {
      const correctIdCheck = mongoose.isValidObjectId(req.params.id)
      if (correctIdCheck == true) {
        const deletedDestination = await Destination.findByIdAndDelete(req.params.id);
        if (!deletedDestination) {
          return res.status(404).json({ message: "Bad Request: Destination matching id wasn't found"});
        }
        else {
          res.json({ message: 'destination has been deleted!', deletedDestination }); // Bekräftelse på att användaren har raderats.
        }
      } else {
        res.status(400).json({ message: 'Bad request: you did not give a valid Id'})
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occured while deleting destination." });
    }
  });
}