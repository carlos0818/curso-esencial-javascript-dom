import { BASE_API, API_KEY } from '../constants.js'

export async function getCurrentWeather(lat, lng) {
    const response = await fetch(`${ BASE_API }weather?lat=${ lat }&lon=${ lng }&units=metric&appid=${ API_KEY }`)
    if(!response.ok) return {
        isError: true,
        data: null
    }

    const data = await response.json()
    return {
        isError: false,
        data
    }
}

export async function getWeeklyWeather(lat, lng) {
    const response = await fetch(`${ BASE_API }forecast?lat=${ lat }&lon=${ lng }&units=metric&appid=${ API_KEY }`)
    if(!response.ok) return {
        isError: true,
        data: null
    }

    const data = await response.json()
    return {
        isError: false,
        data
    }
}