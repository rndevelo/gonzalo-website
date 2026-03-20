package com.gonzalorenedo.portfolio.models

import kotlinx.serialization.Serializable

@Serializable
data class Skill(
    val name: String,
    val percentage: Int,
    val category: String
)

val sampleSkills = listOf(
    Skill("Kotlin", 95, "Lenguaje"),
    Skill("Jetpack Compose", 90, "UI"),
    Skill("Coroutines/Flow", 85, "Concurrencia"),
    Skill("Clean Architecture", 88, "Arquitectura"),
    Skill("Dagger Hilt", 82, "DI"),
    Skill("Room/Retrofit", 85, "Persistencia/Red"),
    Skill("Git", 90, "Herramientas"),
    Skill("Firebase", 80, "Backend-as-a-Service"),
    Skill("Android Studio", 95, "IDE")
)
