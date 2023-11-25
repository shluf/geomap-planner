"use client";

import { Button } from "@nextui-org/button";

const SaveButton = ({ geoJSONLayers }:any) => {
	const exportGeoJSON = () => {
		console.log(geoJSONLayers);
	  };
	return (
		<Button  color="primary" variant="ghost">
			Save
		</Button>
	);
};

export default SaveButton