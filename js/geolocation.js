function geolocationSupport() {
    return 'geolocation' in navigator
}

const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 5000,
}

export function getCurrentPosition(options = defaultOptions) {
    if(!geolocationSupport()) throw new Error('No hay soporte de geolocalización en tu navegador')

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            resolve(position)
        }, () => {
            reject('No hemos podido obtener tu ubicación')   
        }, options)
    })
}

export async function getLatLng(options = defaultOptions) {
    try {
        const { coords: { latitude: lat, longitude: lng } } = await getCurrentPosition(options)
        return { lat, lng, isError: false }
    } catch {
        return { isError: true, lat: null, lng: null }
    }
}