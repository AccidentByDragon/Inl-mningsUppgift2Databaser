import destination from "./API/destination.js";
import location from "./API/location.js";

export default function (server, mongoose) {
  destination(server, mongoose);
  location(server, mongoose);
}