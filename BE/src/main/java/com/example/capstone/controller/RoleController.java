package com.example.capstone.controller;

import com.example.capstone.dto.RoleDTO;
import com.example.capstone.entity.Role;
import com.example.capstone.service.imp.RoleServiceImp;
import com.example.capstone.util.error.IdInvalidException;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/roles")
public class RoleController {

    private final RoleServiceImp roleService;

    public RoleController(RoleServiceImp roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<Page<RoleDTO>> getAllRoles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Role> roles = roleService.getAllRoles(page, size);
        Page<RoleDTO> roleDTOPage = roles.map(RoleDTO::new);
        return ResponseEntity.ok(roleDTOPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleDTO> getRoleById(@PathVariable("id") int id) throws IdInvalidException {
        Optional<Role> role = roleService.getRoleById(id);
        if (role.isPresent()) {
            return ResponseEntity.ok(new RoleDTO(role.get()));
        } else {
            throw new IdInvalidException("Role with ID " + id + " does not exist");
        }
    }

    @PostMapping
    public ResponseEntity<RoleDTO> createRole(@Valid @RequestBody Role role) throws IdInvalidException {
        Role createdRole = roleService.createRole(role);
        return ResponseEntity.status(HttpStatus.CREATED).body(new RoleDTO(createdRole));
    }

    @PutMapping
    public ResponseEntity<RoleDTO> updateRole(@Valid @RequestBody Role role) throws IdInvalidException {
        Role updatedRole = roleService.updateRole(role);
        return ResponseEntity.ok(new RoleDTO(updatedRole));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable("id") int id) throws IdInvalidException {
        roleService.deleteRole(id);
        return ResponseEntity.noContent().build();
    }
}