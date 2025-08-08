package com.example.capstone.service;

import com.example.capstone.dto.RoleDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoleService {
    RoleDTO createRole(RoleDTO roleDTO);
    RoleDTO getRoleById(Long id);
    List<RoleDTO> getAllRoles();
    RoleDTO updateRole(Long id, RoleDTO roleDTO);
    boolean deleteRole(Long id);
    RoleDTO getRoleByName(String name);
}
