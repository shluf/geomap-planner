'use client'

import React, { useState, useEffect } from "react";
import {Listbox, ListboxItem} from "@nextui-org/listbox";
import {Divider} from "@nextui-org/divider";
import {Button} from "@nextui-org/button";
import { Snippet } from "@nextui-org/snippet";
import {Card} from "@nextui-org/card"

import SaveButton from "@/components/map/saveButton";
import Mission from "./mission/mission";
import MapView from "./map";


export default function MissionMap() {
    const [missions, setMissions] = useState([]);
    const fetchGeoJSONData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/mission");
        const data = await response.json();
        setMissions(data);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };
    
    useEffect(() => {
      fetchGeoJSONData();
    }, []);

    // Merefresh list mission
    const RefreshClick = () => {
      fetchGeoJSONData();
    };
    
    // Menyimpan GeoJSON yang dipilih
    const [selectedGeoJSON, setSelectedGeoJSON] = useState(null);

    // Mengambil data dari GeoJSON dan merekonstruksinya kembali menjadi GEOJSON
    const handleAction = (key) => {
      const selectedGeojson = missions.find(mission => mission._id === key);
  
      if (selectedGeojson && selectedGeojson.geojson && selectedGeojson.geojson.features) {
        const selectedGeometry = selectedGeojson.geojson;
        setSelectedGeoJSON({
          type: 'FeatureCollection',
          features: selectedGeometry.features.map((feature) => ({
            ...feature,
            properties: {
              ...feature.properties,
            },
        })
        ),
      })} else {
        alert("Mission not found");
      }
    };

    // Mengecek isi GEOJSON yang dipilih dari list
    useEffect(() => {
      if (selectedGeoJSON) {
        console.log("Selected GeoJSON:", selectedGeoJSON);
      }
    }, [selectedGeoJSON]);

    return (
      <>
      <div className="flex flex-row justify-center w-full h-full gap-4">
      <div className="flex-col">
        <Card className="p-3 flex item-center justify-center mb-4">
          <div className="flex justify-center gap-3">
          <SaveButton />
            <Button isDisabled variant="ghost" color="danger">Delete</Button>
            <Button isIconOnly onPress={RefreshClick} color="success" variant="solid" aria-label="Refresh">
            </Button>
          </div>
            <Divider className="mt-3" />
          <div className="flex mt-5 justify-center">
            <Snippet hideSymbol hideCopyButton variant="flat">
              <span>
                List of all Mission :
              </span>
            </Snippet>
          </div>
        </Card>
        <Mission>
          <Listbox
            classNames={{
              list: "max-h-[450px] overflow-y-scroll",
            }}
            items={missions}
            aria-label="Dynamic Actions"
            onAction={handleAction}
            >
            {missions.map((item) => (
              <ListboxItem
                key={item._id}
                // color={item.key === "delete" ? "danger" : "default"}
                // className={item.key === "delete" ? "text-danger" : ""}
                >
                {item.mission}
              </ListboxItem>
            ))}
          </Listbox>
        </Mission>
        </div>
        <MapView selectedGeoJSON={selectedGeoJSON} />
        </div>
      </>
    );
  }
  