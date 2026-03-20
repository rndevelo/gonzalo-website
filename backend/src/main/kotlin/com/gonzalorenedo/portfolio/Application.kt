package com.gonzalorenedo.portfolio

import com.gonzalorenedo.portfolio.plugins.*
import io.ktor.server.application.*

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

fun Application.module() {
    configureHTTP()
    configureSerialization()
    configureRouting()
}
