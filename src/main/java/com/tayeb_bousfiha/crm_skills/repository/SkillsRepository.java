package com.tayeb_bousfiha.crm_skills.repository;

import com.tayeb_bousfiha.crm_skills.domain.Skills;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Skills entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SkillsRepository extends JpaRepository<Skills, Long> {

    @Query("select count(distinct collaborator) from Collaborator collaborator left join collaborator.skills skill where skill.id = :id")
    Long findSkillUsedTimes(@Param("id") Long id);
}
