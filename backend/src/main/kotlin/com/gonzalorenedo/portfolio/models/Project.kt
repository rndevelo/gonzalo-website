package com.gonzalorenedo.portfolio.models

import kotlinx.serialization.Serializable

@Serializable
data class Project(
    val id: Int,
    val name: String,
    val description: String,
    val tags: List<String>,
    val githubUrl: String? = null,
    val demoUrl: String? = null
)

val sampleProjects = listOf(
    Project(
        id = 1,
        name = "ParkSense",
        description = "App para encontrar tu coche usando GPS y Activity Recognition",
        tags = listOf("GPS", "Activity Recognition", "Maps", "Room", "Coroutines"),
        githubUrl = "https://github.com/gonzalorenedo/parksense"
    ),
    Project(
        id = 2,
        name = "CineTrack",
        description = "Catálogo de películas usando TMDB API",
        tags = listOf("TMDB API", "Retrofit", "Glide", "RecyclerView", "MVVM"),
        githubUrl = "https://github.com/gonzalorenedo/cinetrack"
    ),
    Project(
        id = 3,
        name = "WeatherNow",
        description = "App del tiempo con Open-Meteo API",
        tags = listOf("Open-Meteo API", "Ktor Client", "Jetpack Compose", "Flow"),
        githubUrl = "https://github.com/gonzalorenedo/weathernow"
    )
)
