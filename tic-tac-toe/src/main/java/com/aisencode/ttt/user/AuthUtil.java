package com.aisencode.ttt.user;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;

import javax.servlet.http.HttpSession;

public class AuthUtil {

    public static Boolean isAuth(HttpSession session) {

        return session.getAttribute("isAuth") != null;
    }

    public static HttpHeaders setHeader() {
        HttpHeaders idHeader = new org.springframework.http.HttpHeaders();
        idHeader.set("X-CSE356", "61f9c246ca96e9505dd3f812");
        return idHeader;
    }


}
