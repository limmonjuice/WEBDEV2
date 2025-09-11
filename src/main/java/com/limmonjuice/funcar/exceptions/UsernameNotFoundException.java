package com.limmonjuice.funcar.exceptions;

public class UsernameNotFoundException extends RuntimeException{
    UsernameNotFoundException(String message){
        super(message);
    }
}
