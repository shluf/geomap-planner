'use client'

import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, FeatureGroup, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L, {Icon} from 'leaflet'
import { Button } from "@nextui-org/button";

import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";

//DRAW
import { EditControl } from 'react-leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'


const MapView = ({selectedGeoJSON}) => {
  // Icon Marker
  const customIcon = new L.Icon({
    iconUrl: '/iconmarker.gif',
    iconSize: [32, 32], 
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Tempat menyimpan GEOJSON yang ada di map menjadi array 
  const [geoJSONLayers, setGeoJSONLayers] = useState([]);

  // ===================Fungsi ekstraksi sekaligus export geojson====================

  const extractGeoJSON = () => {
    const extractedGeoJSON = {
      type: 'FeatureCollection',
      features: [],
    };

    geoJSONLayers.forEach((layer) => {
      const extractedFeature = {
        type: 'Feature',
        geometry: layer.geometry,
        properties: layer.properties,
      };

      extractedGeoJSON.features.push(extractedFeature);
    });

    console.log('Extracted GeoJSON:', extractedGeoJSON);


    // MENAMBAHKAN NAMA MISI PADA SETIAP LAYER
    const exportGeoJSON = (missionName) => {
      // Add mission name to each feature in the GeoJSON
      const geoJSONWithMissionName = {
        mission: missionName,
        geojson: {
          type: 'FeatureCollection',
          features: extractedGeoJSON.features.map((feature) => ({
            ...feature,
            properties: {
              ...feature.properties,
            },
          })),
        }
      };

      // SEND TO SERVER
        const saveGeoJSON = async() => {
          try {
            const response = await fetch("https://teal-extinct-kitten.cyclic.app/api/mission", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify( geoJSONWithMissionName ),
            })
            console.log('GeoJSON data sent successfully:', response, geoJSONWithMissionName);
          } catch(error){
            console.log(error);
          }
        }
        saveGeoJSON();
      };
      
      const handleClick = () => {
      var misi = prompt('Mission Name: ');
      if (misi) {
        exportGeoJSON(misi);
        console.log(misi);
      } else {
        console.log('Mission name not provided.');
      }
    };
    handleClick();
  };

  // ===================END====================
    

    const _onEdited = e => {
      let numEdited = 0;
      e.layers.eachLayer(layer => {
        numEdited += 1;
      });
      console.log(`_onEdited: edited ${numEdited} layers`, e);
      

      // Menambahkan Geojson yang telah diedit
      setGeoJSONLayers(
        e.layers.getLayers().map((layer) => layer.toGeoJSON())
      );
    };
  
    const _onCreated = e => {
      let type = e.layerType;
      // let layer = e.layer;

      // Menambahkan Geojson yang telah dibuat
      setGeoJSONLayers((prevLayers) => [...prevLayers, e.layer.toGeoJSON()]); 
    };

    const _onDeleted = e => {
      // YANG UPDATE LAYER SETELAH DIHAPUS BELUM BISA DITAMBAHIN KE GEOJSON

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

    // Menambahkan features dari mission list kedalam GeoJSON
    useEffect(() => {
      // Update GeoJSON layers when selectedGeoJSON changes
      if (selectedGeoJSON) {
        setGeoJSONLayers(prevLayers => [...prevLayers, ...selectedGeoJSON.features])
      } 
    }, [selectedGeoJSON]);

    // Menghapus semua Features didalam map
    const clearAllLayers = () => {
      // Remove all GeoJSON layers from the state
      console.log(geoJSONLayers)
      setGeoJSONLayers([]);
    };


    
    return (
      <div className="hidden md:flex flex-col h-full w-full" >
        <MapContainer className='h-full w-full rounded-lg' center={[-7.767959, 110.378545]} zoom={15} scrollWheelZoom={true}>
        
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          <Marker position={[-7.767959, 110.378545]} riseOnHover={true} icon={new Icon({iconUrl: '/iconmarker.gif', iconSize: [32,32], iconAnchor: [16, 32], popupAnchor: [0, -32]})} >
            <Popup>
              <b>Balairung</b> <br /> Universitas Gadjah Mada
            </Popup>
          </Marker>
          <FullscreenControl forceSeparateButton={true} position='topright' />
          
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
                    {geoJSONLayers.map((layer, index) => (
                      <GeoJSON key={index} data={layer} />
                      ))}
          </FeatureGroup>

        </MapContainer>
        <div className='flex items-center justify-center gap-6 pt-4'>
        <Button  onPress={extractGeoJSON} color="primary" variant="solid">Export</Button>
        <Button  onPress={clearAllLayers} color="danger" variant="ghost">Clear</Button>
        </div>
      </div>
    )
  }
  
  export default MapView;