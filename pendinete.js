window.navigator.geolocation.getCurrentPosition(result => {

    const btnbuscar = document.getElementById("btnbuscar")
    const query = document.getAnimations("input")
    const divNameCity= document.getElementById("nameCity")

    btnbuscar.addEventListener("click", event => {
        
        event.preventDefault()

       
        //const city = query.value
        

        
        const lat = result.coords.latitude
        const lon = result.coords.longitude
        const country =query.value
        const url = new URL("https://api.weatherbit.io/v2.0/current?")
        url.searchParams.set(`lat`, lat)
        url.searchParams.set(`lon`, lon)
        ul.searchParams.set(`include`,`minutely`)
        url.searchParams.set(`key`, "a87dda00c9e546089e87eed05fa8561b")
        url.searchParams.set(`city`,city)
        url.searchParams.set(`country`,country)

        consoe.log(url.href)
        /* const country =query.value
        const city = query.value */

        //https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&include=minutely&key=a87dda00c9e546089e87eed05fa8561b

        fetch(`https://api.weatherbit.io/v2.0/current?key=a87dda00c9e546089e87eed05fa8561b&country=${country}&city=${city}`)
            .then(response => response.json())

            .then(json => {
                const data = json.data[0]
                console.log(data)
                const cityName = data.city_name
                divNameCity.appendChild(cityName)
                divNameCity.innerText = cityName
                const contry = data.country_code
                const temp = data.temp

                console.log(cityName, contry, temp)

            })


    })
            
    <div class="mapboxgl-canvas-container mapboxgl-interactive mapboxgl-touch-drag-pan mapboxgl-touch-zoom-rotate"><canvas class="mapboxgl-canvas" tabindex="0" aria-label="Map" role="region" width="620" height="300" style="width: 620px; height: 300px;"></canvas></div>






})