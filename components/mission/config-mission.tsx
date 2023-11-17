'use client'

import React from "react";
import {Listbox, ListboxItem} from "@nextui-org/listbox";
import Mission from "./mission";

export default function MissionList() {
    const items = [
      {
        key: "1",
        label: "Mission 1",
      },
      {
        key: "2",
        label: "Mission 2",
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
  
    return (
      <Mission>
        <Listbox
          items={items}
          aria-label="Dynamic Actions"
          onAction={(key) => alert(key)}
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
  