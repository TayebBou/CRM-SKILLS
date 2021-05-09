package com.tayeb_bousfiha.crm_skills.repository;

import com.tayeb_bousfiha.crm_skills.domain.Level;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Level entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LevelRepository extends JpaRepository<Level, Long> {
}
