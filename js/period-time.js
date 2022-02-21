import { createDOM } from './utils/dom.js'
import { formatDate, formatTemp } from './utils/format-data.js'
import { formatWind, formatHumidity } from './utils/format-data.js'

export function periodTimeTemplate({ temp, date, icon, description }) {
    return `
        <li class="dayWeather-item">
            <span class="dayWeather-time">${ date }</span>
            <img class="dayWeather-icon" width="48" height="48" src="https://openweathermap.org/img/wn/${ icon }@2x.png" alt="${ description }" rain="">
            <span class="dayWeather-temp">${ temp }</span>
        </li>
    `
}

export function createPeriodTime(weather) {
    const dateOptions = {
        hour: 'numeric',
        hour12: true
    }
    const temp = formatTemp(weather.main.temp)
    const date = formatDate(new Date(weather.dt * 1000), dateOptions)
    const config = {
        temp,
        date,
        icon: weather.weather[0].icon,
        description: weather.weather[0].description,
    }
    return createDOM(periodTimeTemplate(config))
}

export function showOtherSpecs(weather) {
    const $periodTimeFirst = document.querySelector('.dayWeather-item')
    const $hourSelected = document.querySelector('.hourSelected')
    $periodTimeFirst.classList.add('is-selected')
    $hourSelected.hidden = false
    loadOtherSpecs(weather, 0)
    const $periodTimeAll = document.querySelectorAll('.dayWeather-item')
    $periodTimeAll.forEach((item, index) => {
        item.addEventListener('click', () => handleShowSpecsClick(item, index, weather))
    })
}

function handleShowSpecsClick($element, index, weather) {
    removeSelected()
    $element.classList.add('is-selected')
    loadOtherSpecs(weather, index)
}

function removeSelected() {
    const $periodTime = document.querySelectorAll('.dayWeather-item')
    $periodTime.forEach(item => {
        item.classList.remove('is-selected')
    })
}

function loadOtherSpecs(weather, index) {
    const $max = document.querySelector('#max')
    const $min = document.querySelector('#min')
    const $wind = document.querySelector('#wind')
    const $humidity = document.querySelector('#humidity')
    const max = formatTemp(weather.list[index].main.temp_max)
    const min = formatTemp(weather.list[index].main.temp_min)
    const wind = formatWind(weather.list[index].wind.deg)
    const humidity = formatHumidity(weather.list[index].main.humidity)
    $max.textContent = max
    $min.textContent = min    
    $wind.textContent = wind
    $humidity.textContent = humidity
}