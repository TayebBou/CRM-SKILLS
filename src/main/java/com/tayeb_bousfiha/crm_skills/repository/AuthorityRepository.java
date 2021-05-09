package com.tayeb_bousfiha.crm_skills.repository;

import com.tayeb_bousfiha.crm_skills.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
