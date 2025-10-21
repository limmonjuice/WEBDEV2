package com.limmonjuice.funcar.DTO;

public record AuthResponse(String token, String username, Long expiresAt) {
}
