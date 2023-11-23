"use client";

import { Button } from "@nextui-org/button";
import MapView from './map';
import exportGeoJSON from "./export"

const ExportButton = ({ geoJSONLayers }:any) => {
	const exportGeoJSON = () => {
		// Log GeoJSON data to the console (you can modify this to save or send the data as needed)
		console.log(geoJSONLayers);
	  };
	return (
		<Button onPress={() => exportGeoJSON}  color="primary" variant="ghost">
			Save
		</Button>
	);
};

export default ExportButton