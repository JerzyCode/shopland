package agh.boksaoracz.shopland.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<String> handleProductNotFound(ProductNotFoundException ex) {
        log.error("handleProductNotFound(), ex={}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFound(UserNotFoundException ex) {
        log.error("handleUserNotFound(), ex={}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(NoAuthHeaderException.class)
    public ResponseEntity<String> handleNoAuthHeader(NoAuthHeaderException ex) {
        log.error("handleNoAuthHeader(), ex={}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<String> handleOrderNotFound(OrderNotFoundException ex) {
        log.error("handleOrderNotFound(), ex={}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(InsufficientAmountOfProductException.class)
    public ResponseEntity<String> handleInsufficientAmountOfProduct(InsufficientAmountOfProductException ex) {
        log.error("handleInsufficientAmountOfProduct(), ex={}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(OpinionException.class)
    public ResponseEntity<String> handleUserAlreadyAddedOpinion(OpinionException ex) {
        log.error("handleUserAlreadyAddedOpinion(), ex={}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(OpinionScoreOutOfBoundsException.class)
    public ResponseEntity<String> handleOpinionScoreOutOfBoundsException(OpinionScoreOutOfBoundsException ex) {
        log.error("handleOpinionScoreOutOfBoundsException(), ex={}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(OpinionDoesNotExistsException.class)
    public ResponseEntity<String> handleOpinionDoesNotExistsException(OpinionDoesNotExistsException ex) {
        log.error("handleOpinionDoesNotExistsException(), ex={}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}
