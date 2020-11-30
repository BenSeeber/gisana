import { Streamlit} from "./streamlit"
import { RenderData } from "streamlit-component-lib"
import * as L from "leaflet"
import "leaflet/dist/leaflet.css"

const map = document.createElement("div")

map.style.height = "600px"
map.setAttribute("id", "mapid")
document.body.appendChild(map)

const mymap = L.map("mapid").setView([50.676285, -120.334276], 13)

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1Ijoib2hiZW4iLCJhIjoiY2tpM2x1cjdiMWJubjJxbXNqNm5xemVhZyJ9.fe7ore4qnzAZiZE_IoMsNw",
  }
).addTo(mymap)




function onRender2(event: Event): void {
  // Get the RenderData from the event
  const data = (event as CustomEvent<RenderData>).detail
  let markers = data.args["marker"]

/*
  function onMapClick(e: any) {
    L.popup()
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(mymap)
    Streamlit.setComponentValue(e.latlng)
    Streamlit.setFrameHeight()
  }
  mymap.on("click", onMapClick)
*/
  
  const iconUrl = 'https://upload.wikimedia.org/wikipedia/commons/9/90/Simpleicons_Places_map-marker-6.svg';
  const shadowUrl = 'https://upload.wikimedia.org/wikipedia/commons/9/90/Simpleicons_Places_map-marker-6.svg';
  const iconDefault = L.icon({
    iconUrl,
    //shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });


  for (var i=0; i<markers.length; i++) {
           
    L.marker(markers[i].slice(0,2),{icon: iconDefault}).bindPopup(markers[i][2]).addTo(mymap);
 
 }

  Streamlit.setFrameHeight() 
}

// Attach our `onRender` handler to Streamlit's render event.
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender2)

function onMapDrag(e: any) {
  Streamlit.setComponentValue(mymap.getBounds())
  Streamlit.setFrameHeight()
}
mymap.on("dragend", onMapDrag)
mymap.on("zoomend", onMapDrag)

/*
function onRender(event: Event): void {
  Streamlit.setFrameHeight()
}
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
*/
Streamlit.setComponentReady()
Streamlit.setFrameHeight()