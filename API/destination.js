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
  
  server.get('/api/destinations/:id', async (req, res) => {
    try {
      const destination = await Destination.findById(req.params.id)
      res.status(200).json({ message: 'you are trying to a destination', destination }) //should this be country instead?
    } catch (error) {
      res.status(500).json({ error: error })
    }
  });
  //experiment with a get/fetch using country, as ID assinged by MongoDB is awkward to remember


  server.post('/api/destinations', async (req, res) => {
    try {
      const country = req.body.country;
      const climate = req.body.climate;
      const locations = [];

      if (country.length <= 0 || climate.length <= 0) {
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
      res.status(500).json({ error: error })
    }
  });

  server.put('/api/destinations/:id', async (req, res) => {
    try {
      const updateDestination = await Destination.findByIdAndUpdate(req.params.id, req.body);
      const returnDestination = await Destination.findById(req.params.id);
      res.json({ updatedDestination: updateDestination, Changedto: returnDestination });
    }
    catch (error) {
      res.status(500).json({ error: error })
    }
  });

  server.delete('/api/destinations/:id', async (req, res) => {
    try {
      const deletedDestination = await Destination.findByIdAndDelete(req.params.id);
      if (!deletedDestination) {
        return res.status(404).json({ message: "destination wasn't found" });
      }
      res.json({ message: "destination has been deleted!" }); // Bekräftelse på att användaren har raderats.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occured while deleting destination." });
    }
  });
}