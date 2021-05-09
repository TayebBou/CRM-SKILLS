package com.tayeb_bousfiha.crm_skills.web.rest;

import com.tayeb_bousfiha.crm_skills.domain.Collaborator;
import com.tayeb_bousfiha.crm_skills.repository.CollaboratorRepository;
import com.tayeb_bousfiha.crm_skills.service.CollaboratorRepositoryCustom;
import com.tayeb_bousfiha.crm_skills.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.apache.commons.lang3.StringUtils;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.Collection;

/**
 * REST controller for managing {@link com.tayeb_bousfiha.crm_skills.domain.Collaborator}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CollaboratorResource {

    private final Logger log = LoggerFactory.getLogger(CollaboratorResource.class);

    private static final String ENTITY_NAME = "collaborator";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CollaboratorRepository collaboratorRepository;
    private final CollaboratorRepositoryCustom collaboratorRepositoryCustom;

    public CollaboratorResource(CollaboratorRepository collaboratorRepository, CollaboratorRepositoryCustom collaboratorRepositoryCustom) {
        this.collaboratorRepository = collaboratorRepository;
        this.collaboratorRepositoryCustom = collaboratorRepositoryCustom;
    }

    /**
     * {@code POST  /collaborators} : Create a new collaborator.
     *
     * @param collaborator the collaborator to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new collaborator, or with status {@code 400 (Bad Request)} if the collaborator has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/collaborators")
    public ResponseEntity<Collaborator> createCollaborator(@Valid @RequestBody Collaborator collaborator) throws URISyntaxException {
        log.debug("REST request to save Collaborator : {}", collaborator);
        if (collaborator.getId() != null) {
            throw new BadRequestAlertException("A new collaborator cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Collaborator result = collaboratorRepository.save(collaborator);
        return ResponseEntity.created(new URI("/api/collaborators/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /collaborators} : Updates an existing collaborator.
     *
     * @param collaborator the collaborator to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated collaborator,
     * or with status {@code 400 (Bad Request)} if the collaborator is not valid,
     * or with status {@code 500 (Internal Server Error)} if the collaborator couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/collaborators")
    public ResponseEntity<Collaborator> updateCollaborator(@Valid @RequestBody Collaborator collaborator) throws URISyntaxException {
        log.debug("REST request to update Collaborator : {}", collaborator);
        if (collaborator.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Collaborator result = collaboratorRepository.save(collaborator);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, collaborator.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /collaborators} : get all the collaborators.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of collaborators in body.
     */
    @GetMapping("/collaborators")
    public ResponseEntity<List<Collaborator>> getAllCollaborators(Pageable pageable) {
        log.debug("REST request to get a page of Collaborators");
        List<Collaborator> collaborators;
        collaborators = collaboratorRepository.findAllWithEagerRelationships();
        Page<Collaborator> page = collaboratorRepositoryCustom.collaboratorsListToPage(collaborators, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /collaborators/skills} : get all the collaborators by skills.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of skills in body.
     */
    @GetMapping("/collaborators/skills")
    public ResponseEntity<List<Collaborator>> getCollaboratorsBySkills(@RequestParam String skillId, Pageable pageable) {
        log.debug("requestParam {}", skillId);
        Long lengthSkills = Long.valueOf(StringUtils.countMatches(skillId, ",")+1);
        Collection<Long> skillsId = collaboratorRepositoryCustom.stringToCollectionLong(skillId, lengthSkills);
        List<Collaborator> collaborators = collaboratorRepository.findBySkills(skillsId, lengthSkills);
        Page<Collaborator> page = collaboratorRepositoryCustom.collaboratorsListToPage(collaborators, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /collaborators/:id} : get the "id" collaborator.
     *
     * @param id the id of the collaborator to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the collaborator, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/collaborators/{id}")
    public ResponseEntity<Collaborator> getCollaborator(@PathVariable Long id) {
        log.debug("REST request to get Collaborator : {}", id);
        Optional<Collaborator> collaborator = collaboratorRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(collaborator);
    }

    /**
     * {@code DELETE  /collaborators/:id} : delete the "id" collaborator.
     *
     * @param id the id of the collaborator to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/collaborators/{id}")
    public ResponseEntity<Void> deleteCollaborator(@PathVariable Long id) {
        log.debug("REST request to delete Collaborator : {}", id);
        collaboratorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
