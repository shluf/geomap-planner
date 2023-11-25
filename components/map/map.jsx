'use client'
import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, FeatureGroup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {Icon, geoJSON} from 'leaflet'

import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";

//DRAW
import { EditControl } from 'react-leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import exportGeoJSON from './export';

//EXPORT
import exportButton from './exportButton';

const MapView = () => {
  const [geoJSONLayers, setGeoJSONLayers] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  // const onEachFeature = (feature, layer) => {
  //   layer.on({
  //     click: () => {
  //       setSelectedFeature(feature);
  //     },
  //   });
  // };
 
  // Icon Marker
  const customIcon = new L.Icon({
    iconUrl: '/iconmarker.gif',
    iconSize: [32, 32], 
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const handleClick = () =>{
    var misi = prompt('Mission Name: ');
    getMisi[0](misi)
    getMisi[1](true)
    console.log(misi);
}

//---------JANGAN DIUBAH-----------
const [lat, setLat] = useState(0)
const [lng, setLng] = useState(0)
  const geoJSON = {
    'type': "FeatureCollection",
    'features': [
      {
        'type': "Feature",
        'geometry': {
          type: "Point",
          coordinates: [lng, lat],
        },
        'properties': {
          name: "Clicked Point",
        },
      },
    ],
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    console.log(`Koordinat yang diclick: ${lat}, ${lng}`);

    setLat(lat)
    setLng(lng)
  };
//Save to Backend (WORK)
const saveGeoJSON = async() => {
  try {
    const response = await fetch("http://localhost:5000/api/mission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ geoJSON }),
    })
  console.log(geoJSON);
  } catch(error){
    console.log(error);
  }
}

  // Komponen yang menangani peristiwa klik pada peta
  const MyClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
  }
//-------------END----------------

    const _onEdited = e => {
      let numEdited = 0;
      e.layers.eachLayer(layer => {
        numEdited += 1;
      });
      
      // Menambahkan Geojson yang telah diedit
      setGeoJSONLayers(
        e.layers.getLayers().map((layer) => layer.toGeoJSON())
      );
      console.log(`_onEdited: edited ${numEdited} layers`, e);
      // this._onChange();
    };
  
    const _onCreated = e => {
      let type = e.layerType;
      // let layer = e.layer;

      // Menambahkan Geojson yang telah dibuat
      if (type === 'polygon' || type === 'marker' || type === 'polyline') {
      // Simpan layer yang baru dibuat
      setGeoJSONLayers((prevLayers) => [...prevLayers, e.layer.toGeoJSON()]);
    };
      // Do whatever else you need to. (save to db; etc)

      // this._onChange();
    };

    const _onDeleted = e => {
      // let numDeleted = 0;
      // e.layers.eachLayer(layer => {
      //   numDeleted += 1;
      // });
      // setDeletedLayerKey(deletedLayerId);
      // console.log(`onDeleted: removed ${numDeleted} layers`, e);

      // const deletedLayerId = Array.from(e.layers.keys())[0];
      // setGeoJSONLayers((prevLayers) =>
      //   prevLayers.filter((layer, index) => index !== deletedLayerId)
      // );
      
      // this._onChange();
    };

    const exportGeoJSON = () => {
      // Log GeoJSON data to the console (you can modify this to save or send the data as needed)
      console.log(geoJSONLayers);
    };

    return (
      <>
        <MapContainer className='h-full grow rounded-lg' center={[-7.767959, 110.378545]} zoom={14} scrollWheelZoom={true}>
        <MyClickHandler />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          <Marker position={[-7.767959, 110.378545]} icon={new Icon({iconUrl: '/iconmarker.gif', iconSize: [32,32], iconAnchor: [16, 32], popupAnchor: [0, -32]})} >
            <Popup>
              <b>Balairung</b> <br /> Universitas Gadjah Mada
            </Popup>
          </Marker>
          <FullscreenControl forceSeparateButton={true} />
          <FeatureGroup >
                  <EditControl 
                    position="topright"
                    onEdited={_onEdited}
                    onDeleted={_onDeleted}
                    onCreated={_onCreated}
                    draw={{
                      rectangle: false,
                      circle: false,
                      marker: {
                        icon: customIcon,
                      },
                    }}
                  />
                </FeatureGroup>
          {/* {geoJSONLayers.map((layer, index) => (
          <GeoJSON key={index} data={layer} />
        ))} */}
        
          {/* {geoJSON && (
            <GeoJSON data={geoJSON} onEachFeature={onEachFeature} />
          )} */}

        </MapContainer>
          <button onClick={saveGeoJSON}>Export</button>
          <button onClick={handleClick}>Nama</button>
          </>
    )
}

export default MapView;