package agh.boksaoracz.shopland.service;

import agh.boksaoracz.shopland.exception.*;
import agh.boksaoracz.shopland.model.dto.OpinionCommand;
import agh.boksaoracz.shopland.model.dto.OpinionDto;
import agh.boksaoracz.shopland.model.entity.Opinion;
import agh.boksaoracz.shopland.model.entity.UserRole;
import agh.boksaoracz.shopland.repository.OpinionRepository;
import agh.boksaoracz.shopland.repository.ProductRepository;
import agh.boksaoracz.shopland.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class OpinionService {
    private final OpinionRepository opinionRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public List<OpinionDto> getOpinionsByUser(Long userId) {
        return opinionRepository.findAllByUserId(userId)
                .stream()
                .map(OpinionDto::of)
                .toList();
    }

    public List<OpinionDto> getOpinionsByProductId(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ProductNotFoundException(String.format("Can't fetch opinions for product with id=%s no exists.", productId));
        }

        return opinionRepository.findAllByProductId(productId)
                .stream()
                .map(OpinionDto::of)
                .toList();
    }

    public void addOpinion(OpinionCommand command, Long userId, Long productId) {
        if (opinionRepository.existsByUserIdAndProductId(userId, productId)) {
            throw new OpinionException("User already added opinion");
        }

        validateOpinionUpdating(command);

        var user = userRepository.findById(userId).orElseThrow(() ->
                new UserNotFoundException(String.format("Can't find user with id=%s.", userId)));
        var product = productRepository.findById(productId).orElseThrow(() ->
                new ProductNotFoundException(String.format("Can't find product with id=%s.", productId)));

        var opinion = Opinion.builder()
                .content(command.getContent())
                .value(command.getScore())
                .product(product)
                .user(user)
                .build();

        opinionRepository.save(opinion);
    }


    public void updateOpinion(OpinionCommand command, Long userId, Long opinionId) {
        validateOpinionUpdating(command);
        var opinion = opinionRepository.findById(opinionId)
                .orElseThrow(() ->
                        new OpinionDoesNotExistsException(String.format("Opinion with id=%s doesnt exist.", opinionId)));

        if (!Objects.equals(opinion.getUser().getId(), userId)) {
            throw new OpinionException("Opinion doesn't belong to user!");
        }

        opinion.setContent(command.getContent());
        opinion.setValue(command.getScore());
        opinionRepository.save(opinion);
    }

    public void deleteOpinion(Long opinionId, Long userId) {
        var opinion = opinionRepository.findById(opinionId)
                .orElseThrow(() ->
                        new OpinionDoesNotExistsException(String.format("Opinion with id=%s doesnt exist.", opinionId)));

        if (opinion.getUser().getRole() == UserRole.ADMIN) {
            opinionRepository.deleteById(opinionId);
        }

        if (!Objects.equals(opinion.getUser().getId(), userId)) {
            throw new OpinionException("Opinion doesn't belong to user!");
        }

        opinionRepository.deleteById(opinionId);
    }


    private void validateOpinionUpdating(OpinionCommand command) {
        if (command.getScore() < 0 || command.getScore() > 5) {
            throw new OpinionScoreOutOfBoundsException("Opinion score should be between 0 and 5 included.");
        }
    }


}
