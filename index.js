
const input_city = document.getElementById("input_city")
const country_code = document.getElementById("country_code")
const key = "a87dda00c9e546089e87eed05fa8561b"
const tarjetas = document.getElementById("tarjetas")

const weather_default = document.getElementById("default")
const input_city_value = input_city.value
const country_code_value = country_code.value
const key_value = key.value
const btnBuscar = document.getElementById("btnBuscar")





window.navigator.geolocation.getCurrentPosition(result => {
    lat = result.coords.latitude
    lon = result.coords.longitude

    mapboxgl.accessToken = 'pk.eyJ1IjoiZGllZ29lbmZmIiwiYSI6ImNrbnU0eXJqejA5ZzIydXFuYnlyaGgycnUifQ.7sAhHhu7425dm2tEFIFwzg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lon, lat],
        zoom: 0,
        Marker: ({ color: "blue", rotation: 45 })

    })


    var marker1 = new mapboxgl.Marker()
        .setLngLat([lon, lat])
        .addTo(map);


    fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=a87dda00c9e546089e87eed05fa8561b&include=minutely`)
        .then(response => response.json())

        .then(json => {
            const data = json.data[0]
            const p_city = document.createElement("p")
            const p_country = document.createElement("p")
            const p_temp = document.createElement("p")

            // tiempo 

            const icon_default = data.weather
            const weatherIcon = icon_default.icon
            const ulrIcon_Default = `https://www.weatherbit.io/static/img/icons/${weatherIcon}.png`
            const img_icon_default = document.createElement("img")
            img_icon_default.src = ulrIcon_Default
            const description_Default = icon_default.description
            const description_img_Default = document.createElement("p")
            description_img_Default.innerText = description_Default

            weather_default.appendChild(img_icon_default)
            weather_default.appendChild(description_img_Default)

            //datos de las ciudad
            weather_default.appendChild(p_city)
            weather_default.appendChild(p_country)
            weather_default.appendChild(p_temp)

            const cityDefault = data.city_name
            const countryDefault = data.country_code
            const tempDefault = data.temp


            p_city.innerText = cityDefault
            p_country.innerText = countryDefault
            p_temp.innerText = "temp: " + tempDefault + " Cº"

            const sensacion_termica_Default = data.app_temp
            const sensacion_P = document.createElement("p")
            weather_default.appendChild(sensacion_P)
            sensacion_P.innerText = "thermal sensation: " + sensacion_termica_Default + " Cº"

            const visibilidad_Default = data.vis
            const p_vis = document.createElement("p")
            weather_default.appendChild(p_vis)
            p_vis.innerText = "visibility is: " + visibilidad_Default + " KM"

        })

    btnBuscar.addEventListener("click", () => {
        const weather_default = document.getElementById("default")
        weather_default.style.display = "none"

        const input_city_value = input_city.value
        const country_code_value = country_code.value

        let promesa = fetch(`https://api.weatherbit.io/v2.0/current?key=a87dda00c9e546089e87eed05fa8561b&city=${input_city_value}&country=${country_code_value}`)


        promesa
            .then(response => response.json())

            .then(datos => {

                const data = datos.data[0]

                let nuevas_tarjetas = document.createElement("div")
                const background_img = document.createElement("img")
                nuevas_tarjetas.className = "nuevas_tarjetas"
                tarjetas.appendChild(nuevas_tarjetas)
                tarjetas.appendChild(background_img)

                const img_icon = document.createElement("img")
                const nameCity = document.createElement("h2")
                const country = document.createElement("h3")
                const temperatura = document.createElement("p")
                const description_img = document.createElement("p")
                const sensacion = document.createElement("p")

                nuevas_tarjetas.appendChild(img_icon)
                nuevas_tarjetas.appendChild(nameCity)
                nuevas_tarjetas.appendChild(country)
                nuevas_tarjetas.appendChild(temperatura)
                nuevas_tarjetas.appendChild(description_img)
                nuevas_tarjetas.appendChild(sensacion)


                //datos de las ciudad
                const cityName = data.city_name
                const country_code = data.country_code
                const temp = data.temp

                nameCity.innerText = cityName
                country.innerText = country_code

                // tiempo 
                temperatura.innerText = "temp:" + temp + " Cº"
                const weather = data.weather
                const weatherIcon = weather.icon
                const ulrIcon = `https://www.weatherbit.io/static/img/icons/${weatherIcon}.png`



                img_icon.src = ulrIcon
                const description = weather.description
                description_img.innerText = description
                const sensacion_termica = data.app_temp
                sensacion.innerText = "thermal sensation: " + sensacion_termica + " Cº"


                //Create a default Marker and add it to the map.
                const coordi_lon = data.lon
                const coordi_lat = data.lat
               
                // Create a default Marker, colored black, rotated 45 degrees.
                var marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })

                    .setLngLat([coordi_lon, coordi_lat])
                    .addTo(map);

            })


    })

})








