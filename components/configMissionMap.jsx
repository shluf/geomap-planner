'use client'

import React, { useState, useEffect } from "react";
import {Listbox, ListboxItem} from "@nextui-org/listbox";
import {Divider} from "@nextui-org/divider";
import {Button} from "@nextui-org/button";
import { Snippet } from "@nextui-org/snippet";
import {Card} from "@nextui-org/card"

import {RefreshIcon} from "./refreshIcon"
import EditButton from "@/components/map/editButton";
import Mission from "./mission/mission";
import MapView from "./map";


export default function MissionMap() {
    const [missions, setMissions] = useState([]);
    const fetchGeoJSONData = async () => {
      try {
        const response = await fetch("https://teal-extinct-kitten.cyclic.app/api/mission");
        const data = await response.json();
        setMissions(data);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };
    
    useEffect(() => {
      fetchGeoJSONData();
    }, []);

    // Delete mission
    const deleteMisssion = async (missionId) => {
      try {
        const res = await fetch(`https://teal-extinct-kitten.cyclic.app/api/mission/${missionId}`, {
          method: 'DELETE',
        });
  
        if (res.ok) {
          // Hapus misi dari state setelah berhasil dihapus dari server
          // setAllMission((prevMissions) => prevMissions.filter((mission) => mission._id !== missionId));
          console.log('Berhasil menghapus misi');
        }
      } catch (error) {
        console.error('Gagal menghapus misi:', error);
      }
    };

    // Merefresh list mission
    const RefreshClick = () => {
      fetchGeoJSONData();

      console.log(selectedValue)
      console.log(selectedGeoJSONId)
    };
    
    // Menyimpan GeoJSON yang dipilih
    const [selectedGeoJSON, setSelectedGeoJSON] = useState(null);
    // Menyimpan id GeoJSON yang dipilih
    const [selectedGeoJSONId, setSelectedGeoJSONId] = useState([]);
    
    const selectedValue = React.useMemo(
      () => Array.from(selectedGeoJSONId).join(", "),
      [selectedGeoJSONId]
    );

    // Mengambil data dari GeoJSON dan merekonstruksinya kembali menjadi GEOJSON serta menambahkan GEOJSON ID yang dipilih
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
      });
      setSelectedGeoJSONId(key)
      console.log("Selected GeoJSONId:", selectedGeoJSONId);
    } else {
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
          <EditButton />
            <Button onPress={() => deleteMisssion(selectedGeoJSONId)} variant="ghost" color="danger">Delete</Button>
            <Button isIconOnly onPress={RefreshClick} color="success" variant="solid" aria-label="Refresh">
              <RefreshIcon />
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
            // onAction={handleAction}
            selectionMode="single"
            selectedKeys={selectedGeoJSONId}
            onSelectionChange={setSelectedGeoJSONId}
            >
            {missions.map((item) => (
              <ListboxItem
                key={item._id}
                description={item.dateCreated}
                // color={item._id === null ? "danger" : "default"}
                // className={item.key === "delete" ? "text-danger" : ""}
                // onPress={() => setSelectedGeoJSONId(item._id)}
                onPress={() => handleAction(item._id)}
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
  