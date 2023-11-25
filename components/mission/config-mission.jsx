'use client'

import React, { useState } from "react";
import {Listbox, ListboxItem} from "@nextui-org/listbox";
import Mission from "./mission";

export default function MissionList() {
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
                    [4, 4],
                    [5, 5],
                    [6, 6],
                    [4, 4]
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
            [1, 1],
            [2, 2],
            [3, 3]
          ]
        },
      {
          "type": "Polygon",
          "coordinates": [
            [
              [4, 4],
              [5, 5],
              [6, 6],
              [4, 4]
            ]
          ]
        }]
      },
      {
        key: "3",
        label: "Mission 3",
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
  
    const [selectedGeoJSON, setSelectedGeoJSON] = useState(null);

    const handleAction = (key) => {
      const selectedItem = items.find(item => item.key === key);
  
      if (selectedItem && selectedItem.geometry) {
        // Access the geometry property and update the selected GeoJSON
        const selectedGeometry = selectedItem.geometry;
        setSelectedGeoJSON({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: selectedGeometry,
              properties: {
                name: selectedItem.label
              }
            }
          ]
        }); console.log((selectedItem));
        // Perform your desired action with geometry here
      } else {
        alert(key); // Fallback to alert if no geometry property is found
      }
    };

    return (
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
    );
  }
  