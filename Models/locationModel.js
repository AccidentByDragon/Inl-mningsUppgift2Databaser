import mongoose from "mongoose";
const locationSchema = mongoose.Schema({
  locationName: String,
  Transport: String,
  LocalCuisine: String,
  Accomidation: String,
  Country: {type: mongoose.Schema.Types.ObjectId, ref: 'destinations'}
})

const Location = mongoose.model('locations', locationSchema);
export default Location;