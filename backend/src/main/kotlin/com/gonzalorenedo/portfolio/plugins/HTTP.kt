package com.gonzalorenedo.portfolio.plugins

import io.ktor.server.application.*
import io.ktor.server.plugins.cors.*
import io.ktor.http.*

fun Application.configureHTTP() {
    install(CORS) {
        allowMethod(HttpMethod.Get)
        allowMethod(HttpMethod.Post)
        allowHeader("Content-Type")
        anyHost() // En producción, especifica tu dominio
    }
}
