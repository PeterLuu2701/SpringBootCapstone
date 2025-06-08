package com.example.capstone.service.imp;

import com.example.capstone.dto.RoleDTO;
import com.example.capstone.entity.Role;
import com.example.capstone.mapper.RoleMapper;
import com.example.capstone.repository.RoleRepository;
import com.example.capstone.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoleServiceImp implements RoleService {
    @Autowired
    private final RoleRepository roleRepository;

    public RoleServiceImp(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public RoleDTO createRole(RoleDTO roleDTO) {
        Role role = RoleMapper.toEntity(roleDTO);
        Role savedRole = roleRepository.save(role);
        return RoleMapper.toDTO(savedRole);
    }

    @Override
    public RoleDTO getRoleById(Long id) {
        Optional<Role> roleOptional = roleRepository.findById(id);
        return roleOptional.map(RoleMapper::toDTO).orElse(null);
    }

    @Override
    public List<RoleDTO> getAllRoles() {
        return roleRepository.findAll().stream()
                .map(RoleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RoleDTO updateRole(Long id, RoleDTO roleDTO) {
        Optional<Role> existingRoleOptional = roleRepository.findById(id);

        if (existingRoleOptional.isPresent()) {
            Role existingRole = existingRoleOptional.get();

            existingRole.setName(roleDTO.getName());
            existingRole.setDescription(roleDTO.getDescription());

            Role updatedRole = roleRepository.save(existingRole);
            return RoleMapper.toDTO(updatedRole);
        }
        return null; // Role not found
    }

    @Override
    public boolean deleteRole(Long id) {
        if (roleRepository.existsById(Math.toIntExact(id))) {
            roleRepository.deleteById(Math.toIntExact(id));
            return true;
        }
        return false;
    }

    @Override
    public RoleDTO getRoleByName(String name) {
        Optional<Role> roleOptional = roleRepository.findByName(name);
        return roleOptional.map(RoleMapper::toDTO).orElse(null);
    }
}
