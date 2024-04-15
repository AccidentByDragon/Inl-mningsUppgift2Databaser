import mongoose from "mongoose";
const destinationSchema = mongoose.Schema({
  country: String,
  climate: String,
  locations: Array //may be possible to use populate, easiest emthod would be to use strings
})

const Destination = mongoose.model('locations', destinationSchema);

export default Destination;