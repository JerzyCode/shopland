package agh.boksaoracz.shopland.repository;

import agh.boksaoracz.shopland.model.entity.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OpinionRepository extends JpaRepository<Opinion, Long> {
    List<Opinion> findAllByUserId(Long userId);

    List<Opinion> findAllByProductId(Long productId);

    boolean existsByUserIdAndProductId(Long userId, Long productId);

}
