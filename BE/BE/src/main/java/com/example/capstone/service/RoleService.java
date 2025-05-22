package com.example.capstone.service;

import com.example.capstone.entity.Role;
import com.example.capstone.util.error.IdInvalidException;
import org.springframework.data.domain.Page;
import java.util.Optional;

public interface RoleService {

    Role createRole(Role role) throws IdInvalidException;

    Page<Role> getAllRoles(int page, int size);

    Optional<Role> getRoleById(int id);

    Role updateRole(Role updatedRole) throws IdInvalidException;

    void deleteRole(int id) throws IdInvalidException;
}