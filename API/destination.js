import Destination from "../Models/destinationModel";
export default function destination(server, mongoose) {
/*fields are:
  country: String,
  climate: String,
  locations: Array
*/
  server.get('/api/destinations', async (req, res) => {
    try {
      const destination = await Destination.find()
      res.status(200).json({ message: 'you are trying to a destination', destination });
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
}