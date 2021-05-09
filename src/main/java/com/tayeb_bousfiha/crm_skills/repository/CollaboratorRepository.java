package com.tayeb_bousfiha.crm_skills.repository;

import com.tayeb_bousfiha.crm_skills.domain.Collaborator;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Collection;

/**
 * Spring Data  repository for the Collaborator entity.
 */
@Repository
public interface CollaboratorRepository extends JpaRepository<Collaborator, Long> {

    @Query(value = "select distinct collaborator from Collaborator collaborator left join fetch collaborator.skills",
        countQuery = "select count(distinct collaborator) from Collaborator collaborator")
    Page<Collaborator> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct collaborator from Collaborator collaborator left join fetch collaborator.skills")
    List<Collaborator> findAllWithEagerRelationships();

    @Query("select collaborator from Collaborator collaborator left join fetch collaborator.skills where collaborator.id =:id")
    Optional<Collaborator> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select distinct collaborator from Collaborator collaborator left join fetch collaborator.skills where collaborator IN (select collaborator from Collaborator collaborator join collaborator.skills skill where skill.id IN :skillsId GROUP BY collaborator having count (distinct skill.id)=:lengthSkills)")
    List<Collaborator> findBySkills(@Param("skillsId") Collection<Long> skillsId, @Param("lengthSkills") Long lengthSkills);
}
