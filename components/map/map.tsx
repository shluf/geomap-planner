'use client'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {Icon} from 'leaflet'

const MapView = () => {
    return (
        <>
<MapContainer className='h-96 w-3/4 rounded-lg' center={[-7.767959, 110.378545]} zoom={14} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  <Marker position={[-7.767959, 110.378545]} icon={new Icon({iconUrl: '/iconmarker.png', iconAnchor: [12, 41]})} >
    <Popup>
      For nothing. <br /> yes it is.
    </Popup>
  </Marker>
</MapContainer>
    </>
    )
}

export default MapView;