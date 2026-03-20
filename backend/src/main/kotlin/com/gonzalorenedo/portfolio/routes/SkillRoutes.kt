package com.gonzalorenedo.portfolio.routes

import com.gonzalorenedo.portfolio.models.sampleSkills
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.skillRoutes() {
    get("/skills") {
        call.respond(sampleSkills)
    }
}
