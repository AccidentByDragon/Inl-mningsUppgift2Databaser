import Location from "../Models/locationModel";
export default function location(server, mongoose) {
  /*fields are:
  locationName: String,
  Transport: Array,
  LocalCuisine: Array,
  Accomidation: Array,
  Country: populate from destination
  remember to use populate for country/destination
*/
  server.get('/api/locations', async (req, res) => {
    try {
      const locations = await Location.find().populate("Country") // here we refer to key from object
      res.status(200).json({ message: 'you are trying to find a location', locations }); 
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
}