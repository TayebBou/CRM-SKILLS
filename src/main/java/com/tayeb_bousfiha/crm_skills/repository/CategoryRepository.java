package com.tayeb_bousfiha.crm_skills.repository;

import com.tayeb_bousfiha.crm_skills.domain.Category;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Category entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
