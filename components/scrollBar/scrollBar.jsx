import React from "react";
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import {Content} from "./content";
  
export default function ScrollBar() {
  return (
    <ScrollShadow hideScrollBar className="w-[300px] h-[250px]">
      <Content />
    </ScrollShadow>
  );
}
