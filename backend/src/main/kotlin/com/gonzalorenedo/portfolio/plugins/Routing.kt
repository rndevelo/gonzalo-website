package com.gonzalorenedo.portfolio.plugins

import com.gonzalorenedo.portfolio.routes.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        route("/api") {
            projectRoutes()
            skillRoutes()
            contactRoutes()
        }
        
        // Servir archivos estáticos del frontend
        static("/") {
            resources("static")
            defaultResource("index.html")
        }
    }
}
