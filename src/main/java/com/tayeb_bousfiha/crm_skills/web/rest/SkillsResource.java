package com.tayeb_bousfiha.crm_skills.web.rest;

import com.tayeb_bousfiha.crm_skills.domain.Skills;
import com.tayeb_bousfiha.crm_skills.repository.SkillsRepository;
import com.tayeb_bousfiha.crm_skills.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tayeb_bousfiha.crm_skills.domain.Skills}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SkillsResource {

    private final Logger log = LoggerFactory.getLogger(SkillsResource.class);

    private static final String ENTITY_NAME = "skills";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SkillsRepository skillsRepository;

    public SkillsResource(SkillsRepository skillsRepository) {
        this.skillsRepository = skillsRepository;
    }

    /**
     * {@code POST  /skills} : Create a new skills.
     *
     * @param skills the skills to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new skills, or with status {@code 400 (Bad Request)} if the skills has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/skills")
    public ResponseEntity<Skills> createSkills(@Valid @RequestBody Skills skills) throws URISyntaxException {
        log.debug("REST request to save Skills : {}", skills);
        if (skills.getId() != null) {
            throw new BadRequestAlertException("A new skills cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Skills result = skillsRepository.save(skills);
        return ResponseEntity.created(new URI("/api/skills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /skills} : Updates an existing skills.
     *
     * @param skills the skills to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated skills,
     * or with status {@code 400 (Bad Request)} if the skills is not valid,
     * or with status {@code 500 (Internal Server Error)} if the skills couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/skills")
    public ResponseEntity<Skills> updateSkills(@Valid @RequestBody Skills skills) throws URISyntaxException {
        log.debug("REST request to update Skills : {}", skills);
        if (skills.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Skills result = skillsRepository.save(skills);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, skills.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /skills} : get all the skills.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of skills in body.
     */
    @GetMapping("/skills")
    public List<Skills> getAllSkills() {
        log.debug("REST request to get all Skills");
        return skillsRepository.findAll();
    }

    /**
     * {@code GET  /skills/:id} : get the "id" skills.
     *
     * @param id the id of the skills to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the skills, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/skills/{id}")
    public ResponseEntity<Skills> getSkills(@PathVariable Long id) {
        log.debug("REST request to get Skills : {}", id);
        Optional<Skills> skills = skillsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(skills);
    }

    /**
     * {@code DELETE  /skills/:id} : delete the "id" skills.
     *
     * @param id the id of the skills to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/skills/{id}")
    public ResponseEntity<Void> deleteSkills(@PathVariable Long id) {
        log.debug("REST request to delete Skills : {}", id);
        Long skillUsedTimes = skillsRepository.findSkillUsedTimes(id);
        if(skillUsedTimes > 0) {
        throw new BadRequestAlertException("You cannot delete a skill in use", ENTITY_NAME, "skillUsed");
        } else {
        skillsRepository.deleteById(id);
        }
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
