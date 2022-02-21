import { getWeeklyWeather } from './services/weather.js'
import { getLatLng } from './geolocation.js'
import { formatWeekList } from './utils/format-data.js'
import { createDOM } from './utils/dom.js'
import { createPeriodTime, showOtherSpecs } from './period-time.js'
import draggable from './draggable.js'

function tabPanelTemplate(id) {
    return `
        <div class="tabPanel" tabindex="0" aria-labelledby="tab-${ id }">
            <div class="dayWeather" id="dayWeather-${ id }">
                <ul class="dayWeather-list" id="dayWeather-list-${ id }">
                    
                </ul>
            </div>
        </div>
    `
}

function createTabPanel(id) {
    const $panel = createDOM(tabPanelTemplate(id))
    if(id > 0) {
        $panel.hidden = true
    }
    return $panel
}

function configWeeklyWeather(weekList) {
    const $container = document.querySelector('.tabs')
    weekList.forEach((day, index) => {
        const $panel = createTabPanel(index)
        $container.append($panel)
        day.forEach(weather => {
            $panel.querySelector('.dayWeather-list').append(createPeriodTime(weather))
        })
    })
}

export default async function weeklyWeather() {
    const $container = document.querySelector('.weeklyWeather')
    const { lat, lng, isError } = await getLatLng()
    if(isError) return console.log('Ha ocurrido un error ubicándote')
    const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lng)
    console.log(weather)
    if(weeklyWeatherError) return console.log('Oh! Ha ocurrido un error trayendo el pronóstico del clima')
    const weekList = formatWeekList(weather.list)
    configWeeklyWeather(weekList)
    showOtherSpecs(weather)
    draggable($container)
}