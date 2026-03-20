package com.gonzalorenedo.portfolio.routes

import com.gonzalorenedo.portfolio.models.sampleProjects
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.projectRoutes() {
    get("/projects") {
        call.respond(sampleProjects)
    }
}
