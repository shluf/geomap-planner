'use client'

import { MapContainer, Marker, Popup, TileLayer, useMapEvents, FeatureGroup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {Icon} from 'leaflet'

//DRAW
import { EditControl } from 'react-leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'

const MapView = () => {

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    console.log(`Koordinat yang diclick: ${lat}, ${lng}`);
    
    const geoJSON = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          properties: {
            name: 'Clicked Point',
          },
        },
      ],
    };
    console.log("GeoJSON: ", geoJSON);
  };
  // Komponen yang menangani peristiwa klik pada peta
  const MyClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
  }

    const _onEdited = e => {
      let numEdited = 0;
      e.layers.eachLayer(layer => {
        numEdited += 1;
      });
      console.log(`_onEdited: edited ${numEdited} layers`, e);
  
      // this._onChange();
    };
  
    const _onCreated = e => {
      let type = e.layerType;
      let layer = e.layer;
      if (type === "marker") {
        // Do marker specific actions
        console.log("_onCreated: marker created", e);
      } else {
        console.log("_onCreated: something else created:", type, e);
      }
      // Do whatever else you need to. (save to db; etc)
  
      // this._onChange();
    };

    const _onDeleted = e => {
      let numDeleted = 0;
      e.layers.eachLayer(layer => {
        numDeleted += 1;
      });
      console.log(`onDeleted: removed ${numDeleted} layers`, e);
  
      // this._onChange();
    };

    return (
        <MapContainer className='h-full grow rounded-lg' center={[-7.767959, 110.378545]} zoom={14} scrollWheelZoom={true}>
        <MyClickHandler />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          <Marker position={[-7.767959, 110.378545]} icon={new Icon({iconUrl: '/iconmarker.gif', iconSize: [32,32], iconAnchor: [16, 20]})} >
            <Popup>
              Balairung <br /> Universitas Gadjah Mada
            </Popup>
          </Marker>
          <FeatureGroup >
                  <EditControl 
                    position="topright"
                    onEdited={_onEdited}
                    onDeleted={_onDeleted}
                    onCreated={_onCreated}
                    draw={{
                      rectangle: false,
                      circle: false,
                      marker: false,
                    }}
                  />
                </FeatureGroup>
        </MapContainer>
    )
}

export default MapView;