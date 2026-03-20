package com.gonzalorenedo.portfolio.routes

import com.gonzalorenedo.portfolio.models.ContactMessage
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.contactRoutes() {
    post("/contact") {
        try {
            val message = call.receive<ContactMessage>()
            println("=== NUEVO MENSAJE DE CONTACTO ===")
            println("Nombre: ${message.name}")
            println("Email: ${message.email}")
            println("Asunto: ${message.subject}")
            println("Mensaje: ${message.message}")
            println("================================")
            
            call.respond(mapOf("success" to true, "message" to "Mensaje recibido correctamente"))
        } catch (e: Exception) {
            call.respond(mapOf("success" to false, "message" to "Error al procesar el mensaje"))
        }
    }
}
