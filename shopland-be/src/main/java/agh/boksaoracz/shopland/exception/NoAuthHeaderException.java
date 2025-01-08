package agh.boksaoracz.shopland.exception;

public class NoAuthHeaderException extends RuntimeException {
    private static final String MESSAGE = "No authorization header included.";

    public NoAuthHeaderException() {
        super(MESSAGE);
    }
}
