package agh.boksaoracz.shopland.service;

import agh.boksaoracz.shopland.exception.NoAuthHeaderException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.NativeWebRequest;

@Service
@RequiredArgsConstructor
public class HeaderService {
    private static final String BEARER_PREFIX = "Bearer ";
    private static final String AUTHORIZATION = "Authorization";
    private final NativeWebRequest nativeWebRequest;
    private final JwtService jwtService;

    public Long getUserId() throws NoAuthHeaderException {
        var header = nativeWebRequest.getHeader(AUTHORIZATION);
        if (header == null) {
            throw new NoAuthHeaderException();
        }
        var token = header.contains(BEARER_PREFIX) ? header.substring(BEARER_PREFIX.length()) : header;
        return jwtService.extractUserId(token);
    }
}
