import dynamic from "next/dynamic";

const MapView = dynamic(() => import('./map'), {
    ssr: false
});

export default MapView