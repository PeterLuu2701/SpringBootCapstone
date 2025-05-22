package com.example.capstone.service.imp;

import com.example.capstone.entity.Role;
import com.example.capstone.repository.RoleRepository;
import com.example.capstone.service.RoleService;
import com.example.capstone.util.error.IdInvalidException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImp implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImp(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role createRole(Role role) throws IdInvalidException {
        if (role.getName() == null || role.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Role name cannot be empty");
        }
        if (roleRepository.existsByName(role.getName())) {
            throw new IllegalArgumentException("Role name already exists");
        }
        return roleRepository.save(role);
    }

    @Override
    public Page<Role> getAllRoles(int page, int size) {
        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Page must be >= 0 and size must be > 0");
        }
        Pageable pageable = PageRequest.of(page, size);
        return roleRepository.findAll(pageable);
    }

    @Override
    public Optional<Role> getRoleById(int id) {
        return roleRepository.findById(id);
    }

    @Override
    public Role updateRole(Role updatedRole) throws IdInvalidException {
        if (updatedRole.getName() == null || updatedRole.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Role name cannot be empty");
        }
        Optional<Role> optionalRole = roleRepository.findById(updatedRole.getId());
        if (!optionalRole.isPresent()) {
            throw new IdInvalidException("Role with ID " + updatedRole.getId() + " does not exist");
        }
        Role role = optionalRole.get();
        if (!role.getName().equals(updatedRole.getName()) && roleRepository.existsByName(updatedRole.getName())) {
            throw new IllegalArgumentException("Role name already exists");
        }
        role.setName(updatedRole.getName());
        role.setDescription(updatedRole.getDescription());
        return roleRepository.save(role);
    }

    @Override
    public void deleteRole(int id) throws IdInvalidException {
        if (!roleRepository.existsById(id)) {
            throw new IdInvalidException("Role with ID " + id + " does not exist");
        }
        roleRepository.deleteById(id);
    }
}