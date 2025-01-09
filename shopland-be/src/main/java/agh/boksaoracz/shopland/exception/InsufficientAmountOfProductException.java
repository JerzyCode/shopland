package agh.boksaoracz.shopland.exception;

public class InsufficientAmountOfProductException extends RuntimeException {
  public InsufficientAmountOfProductException(String message) {
    super(message);
  }
}
