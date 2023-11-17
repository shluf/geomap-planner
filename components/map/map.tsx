'use client'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {Icon} from 'leaflet'

const MapView = () => {
    return (
        <>
<MapContainer className='h-full grow rounded-lg' center={[-7.767959, 110.378545]} zoom={14} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  <Marker position={[-7.767959, 110.378545]} icon={new Icon({iconUrl: '/iconmarker.gif', iconSize: [32,32], iconAnchor: [16, 25]})} >
    <Popup>
      Balairung <br /> Universitas Gadjah Mada
    </Popup>
  </Marker>
</MapContainer>
    </>
    )
}

export default MapView;