const exportGeoJSON = (drawnLayers) => {
    const geojsonData = {
      type: 'FeatureCollection',
      features: [],
    };
        drawnLayers.forEach((item) => {
            const { layer, type } = item;
      
            if (type === 'marker') {
              // For markers, use the marker's latlng as coordinates
              coordinates = [layer.getLatLng().lng, layer.getLatLng().lat];
            } else {
              // For other shapes (polygon, polyline), use the layer's coordinates
              coordinates = layer.toGeoJSON().geometry.coordinates;
            }

            const feature = {
              type: 'Feature',
              geometry: {
                type: type === 'marker' ? 'Point' : type.charAt(0).toUpperCase() + type.slice(1), // Adjust type for markers
                coordinates,
              },
              properties: {
                type,
              },
            };
      
            geojsonData.features.push(feature);
          });
    console.log('Exported GeoJSON:', geojsonData);
  };

  export default exportGeoJSON