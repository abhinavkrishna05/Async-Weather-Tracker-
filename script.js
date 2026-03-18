const API_KEY='ead334692c7cd8b339e29cedfbc533e1'
const form=document.querySelector('#weatherForm')
const weatherInfo=document.querySelector('.info')
const weatherHistory=document.querySelector('.history')
const searchHistory=JSON.parse(localStorage.getItem('searchHistory')) || []
form.addEventListener('submit', async(event)=>{
    event.preventDefault()
    const searchedCity=city.value
    getData(searchedCity)
})

async function getData(city){
    if(city){
        try{
            const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
            const data=await response.json()
            if(data.cod==200){
                console.log(data)
                weatherInfo.innerHTML=`
                    <h2>Weather Info</h2>
                    <p>City: ${data.name}</p>
                    <p>Temperature: ${(data.main.temp-273.15).toFixed(1)} °C</p>
                    <p>Weather: ${data.weather[0].main}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind: ${data.wind.speed} m/s</p>
                `
                if(!searchHistory.includes(city)){
                    searchHistory.push(city)
                    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
                    showHistory()
                }
            }else{
                 weatherInfo.innerHTML=`
                <h3>Weather Info</h3>
                <p>City not found</p>
                `
            }
        }catch(err){
        console.log(err)
       }
    }
}

function showHistory(){
    weatherHistory.innerHTML=''
    const history=JSON.parse(localStorage.getItem('searchHistory'))
    history?.forEach((city)=>{
        const li=document.createElement('button')
        li.textContent=city
        li.addEventListener('click',()=>{getData(city)})
        weatherHistory.appendChild(li)
    })
}
showHistory()