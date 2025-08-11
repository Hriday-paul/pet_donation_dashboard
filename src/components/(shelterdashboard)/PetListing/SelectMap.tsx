"use client"

import { useState, useRef } from "react"
import type React from "react"
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api"
import { config } from "../../../utils/config"

const mapKey = config.MAP_KEY!

const SelectMap = ({
    height = "300px",
    selectedLocation,
    setSelectedLocation,
    defaultLocation,
}: {
    height?: string
    selectedLocation: { latitude: number; longitude: number } | null
    setSelectedLocation: React.Dispatch<React.SetStateAction<{ latitude: number; longitude: number } | null>>
    defaultLocation?: { latitude: number; longitude: number }
}) => {

    console.log(defaultLocation)

    const mapRef = useRef<google.maps.Map | null>(null)
    const [googleMaps, setGoogleMaps] = useState<any>(null)

    const onLoad = (map: google.maps.Map) => {
        mapRef.current = map
        setGoogleMaps(window.google.maps)
    }

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat()
            const lng = e.latLng.lng()
            setSelectedLocation({ latitude: lat, longitude: lng })
        }
    }

    return (
        <LoadScriptNext googleMapsApiKey={mapKey}>
            <GoogleMap
                mapContainerStyle={{ height: height, width: "100%" }}
                center={
                    selectedLocation
                        ? { lat: selectedLocation.latitude, lng: selectedLocation.longitude }
                        : defaultLocation
                            ? { lat: defaultLocation.latitude, lng: defaultLocation.longitude }
                            : { lat: 53.3498, lng: -6.2603 }
                }
                zoom={10}
                onLoad={onLoad}
                onClick={handleMapClick}
            >
                {(selectedLocation || defaultLocation) && (
                    <Marker
                        position={{
                            lat: (selectedLocation || defaultLocation)?.latitude ?? 53.3498,
                            lng: (selectedLocation || defaultLocation)?.longitude ?? -6.2603
                        }}
                    />

                )}
            </GoogleMap>
        </LoadScriptNext>
    )
}

export default SelectMap;
