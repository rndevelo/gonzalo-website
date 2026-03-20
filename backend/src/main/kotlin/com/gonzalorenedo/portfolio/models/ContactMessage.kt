package com.gonzalorenedo.portfolio.models

import kotlinx.serialization.Serializable

@Serializable
data class ContactMessage(
    val name: String,
    val email: String,
    val subject: String,
    val message: String
)
