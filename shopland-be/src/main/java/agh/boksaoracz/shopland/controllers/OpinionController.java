package agh.boksaoracz.shopland.controllers;

import agh.boksaoracz.shopland.model.dto.OpinionCommand;
import agh.boksaoracz.shopland.model.dto.OpinionDto;
import agh.boksaoracz.shopland.service.HeaderService;
import agh.boksaoracz.shopland.service.OpinionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rest/api/opinion")
public class OpinionController {
    private final HeaderService headerService;
    private final OpinionService opinionService;

    @GetMapping("/user")
    public ResponseEntity<List<OpinionDto>> getOpinionByUser() {
        var userId = headerService.getUserId();
        return ResponseEntity.ok(opinionService.getOpinionsByUser(userId));
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<List<OpinionDto>> getOpinionByProductId(@PathVariable Long productId) {
        return ResponseEntity.ok(opinionService.getOpinionsByProductId(productId));
    }

    @PostMapping("/products/{productId}")
    public ResponseEntity<Void> addOpinionForProduct(@PathVariable Long productId, @RequestBody OpinionCommand command) {
        var userId = headerService.getUserId();
        opinionService.addOpinion(command, userId, productId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{opinionId}")
    public ResponseEntity<Void> updateOpinionForProduct(@PathVariable Long opinionId, @RequestBody OpinionCommand command) {
        var userId = headerService.getUserId();
        opinionService.updateOpinion(command, userId, opinionId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{opinionId}")
    public ResponseEntity<Void> deleteOpinion(@PathVariable Long opinionId) {
        opinionService.deleteOpinion(opinionId);
        return ResponseEntity.ok().build();
    }


}
