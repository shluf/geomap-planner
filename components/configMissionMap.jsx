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
    const items = [
      {
        key: "1",
        label: "Mission 1",
        geometry: [{
                "type": "LineString",
                "coordinates": [
                  [1, 1],
                  [2, 2],
                  [3, 3]
                ]
              },
            {
                "type": "Polygon",
                "coordinates": [
                  [
                    [110.373827, -7.75964],
                    [110.367305, -7.772056],
                    [110.376744, -7.780561],
                    [110.389273, -7.772822],
                    [110.38421, -7.759555],
                    [110.373827, -7.75964],
                  ]
                ]
              }]
            },
      {
        key: "2",
        label: "Mission 2",
        geometry: [{
          "type": "LineString",
          "coordinates": [
            [110.382494, -7.753262],
            [110.370823, -7.766274],
          ]
        },
      {
          "type": "Polygon",
          "coordinates": [
            [
              [110.386698, -7.7684],
              [110.366447, -7.774353],
              [110.379319, -7.788299],
              [110.39219, -7.782687],
              [110.386698, -7.7684],
            ]
          ]
        },
      ]
      },
      {
        key: "3",
        label: "Mission 3",
        geometry: [{
          "type": "LineString",
          "coordinates": [
            [110.38318, -7.755048],
            [110.378375, -7.765678],
            [110.369279, -7.762191],
            [110.367477, -7.778264],
            [110.367134, -7.782942],
          ]
        },
      {
          "type": "Polygon",
          "coordinates": [
            [
              [110.383781, -7.767209],
              [110.380263, -7.776394],
              [110.388672, -7.777669],
              [110.390989, -7.769335],
            ]
          ]
        }]
      },
      {
        key: "4",
        label: "Mission 4",
      },
      {
        key: "5",
        label: "Mission 5",
      }
    ];
    
    // Menyimpan GeoJSON yang dipilih
    const [selectedGeoJSON, setSelectedGeoJSON] = useState(null);

    // Mengambil data dari Items dan merekonstruksinya kembali menjadi GEOJSON
    const handleAction = (key) => {
      const selectedItem = items.find(item => item.key === key);
  
      if (selectedItem && selectedItem.geometry) {
        // Access the geometry property and update the selected GeoJSON
        const selectedGeometry = selectedItem.geometry;
        setSelectedGeoJSON({
          type: "FeatureCollection",
          features: selectedGeometry.map((geometry, index) => ({
            type: "Feature",
            geometry,
            properties: {
              name: `${selectedItem.label} - Geometry ${index + 1}`,
            },
          })),
        });

      } else {
        alert("Mission not found");
      }
    };

    // Mengecek isi GEOJSON yang dipilih
    useEffect(() => {
      // Perform actions when selectedGeoJSON is updated
      if (selectedGeoJSON) {
        console.log("Selected GeoJSON:", selectedGeoJSON);
        // You can perform other actions with the updated GeoJSON here
      }
    }, [selectedGeoJSON]);

    return (
      <>
      <div className="flex flex-row justify-center w-full h-full gap-4">
      <div className="flex-col">
        <Card className="p-3 flex item-center justify-center mb-4">
          <div className="flex justify-center gap-3">
          <SaveButton />
            <Button variant="ghost" color="danger">Delete</Button>
          </div>
            <Divider className="mt-3" />
          <div className="mt-5">
            <Snippet hideSymbol hideCopyButton variant="flat">
              <span>
                List of all Mission :
              </span>
            </Snippet>
          </div>
        </Card>
        <Mission>
          <Listbox
            items={items}
            aria-label="Dynamic Actions"
            onAction={handleAction}
            >
            {(item) => (
              <ListboxItem
                key={item.key}
                color={item.key === "delete" ? "danger" : "default"}
                className={item.key === "delete" ? "text-danger" : ""}
                >
                {item.label}
              </ListboxItem>
            )}
          </Listbox>
        </Mission>
        </div>
        <MapView selectedGeoJSON={selectedGeoJSON} />
        </div>
      </>
    );
  }
  