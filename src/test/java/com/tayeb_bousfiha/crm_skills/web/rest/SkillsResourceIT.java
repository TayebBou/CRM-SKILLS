package com.tayeb_bousfiha.crm_skills.web.rest;

import com.tayeb_bousfiha.crm_skills.CrmSkillsApp;
import com.tayeb_bousfiha.crm_skills.domain.Skills;
import com.tayeb_bousfiha.crm_skills.repository.SkillsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SkillsResource} REST controller.
 */
@SpringBootTest(classes = CrmSkillsApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SkillsResourceIT {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private SkillsRepository skillsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSkillsMockMvc;

    private Skills skills;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Skills createEntity(EntityManager em) {
        Skills skills = new Skills()
            .label(DEFAULT_LABEL)
            .code(DEFAULT_CODE);
        return skills;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Skills createUpdatedEntity(EntityManager em) {
        Skills skills = new Skills()
            .label(UPDATED_LABEL)
            .code(UPDATED_CODE);
        return skills;
    }

    @BeforeEach
    public void initTest() {
        skills = createEntity(em);
    }

    @Test
    @Transactional
    public void createSkills() throws Exception {
        int databaseSizeBeforeCreate = skillsRepository.findAll().size();
        // Create the Skills
        restSkillsMockMvc.perform(post("/api/skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(skills)))
            .andExpect(status().isCreated());

        // Validate the Skills in the database
        List<Skills> skillsList = skillsRepository.findAll();
        assertThat(skillsList).hasSize(databaseSizeBeforeCreate + 1);
        Skills testSkills = skillsList.get(skillsList.size() - 1);
        assertThat(testSkills.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testSkills.getCode()).isEqualTo(DEFAULT_CODE);
    }

    @Test
    @Transactional
    public void createSkillsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = skillsRepository.findAll().size();

        // Create the Skills with an existing ID
        skills.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSkillsMockMvc.perform(post("/api/skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(skills)))
            .andExpect(status().isBadRequest());

        // Validate the Skills in the database
        List<Skills> skillsList = skillsRepository.findAll();
        assertThat(skillsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLabelIsRequired() throws Exception {
        int databaseSizeBeforeTest = skillsRepository.findAll().size();
        // set the field null
        skills.setLabel(null);

        // Create the Skills, which fails.


        restSkillsMockMvc.perform(post("/api/skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(skills)))
            .andExpect(status().isBadRequest());

        List<Skills> skillsList = skillsRepository.findAll();
        assertThat(skillsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = skillsRepository.findAll().size();
        // set the field null
        skills.setCode(null);

        // Create the Skills, which fails.


        restSkillsMockMvc.perform(post("/api/skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(skills)))
            .andExpect(status().isBadRequest());

        List<Skills> skillsList = skillsRepository.findAll();
        assertThat(skillsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSkills() throws Exception {
        // Initialize the database
        skillsRepository.saveAndFlush(skills);

        // Get all the skillsList
        restSkillsMockMvc.perform(get("/api/skills?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(skills.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)));
    }
    
    @Test
    @Transactional
    public void getSkills() throws Exception {
        // Initialize the database
        skillsRepository.saveAndFlush(skills);

        // Get the skills
        restSkillsMockMvc.perform(get("/api/skills/{id}", skills.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(skills.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE));
    }
    @Test
    @Transactional
    public void getNonExistingSkills() throws Exception {
        // Get the skills
        restSkillsMockMvc.perform(get("/api/skills/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSkills() throws Exception {
        // Initialize the database
        skillsRepository.saveAndFlush(skills);

        int databaseSizeBeforeUpdate = skillsRepository.findAll().size();

        // Update the skills
        Skills updatedSkills = skillsRepository.findById(skills.getId()).get();
        // Disconnect from session so that the updates on updatedSkills are not directly saved in db
        em.detach(updatedSkills);
        updatedSkills
            .label(UPDATED_LABEL)
            .code(UPDATED_CODE);

        restSkillsMockMvc.perform(put("/api/skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSkills)))
            .andExpect(status().isOk());

        // Validate the Skills in the database
        List<Skills> skillsList = skillsRepository.findAll();
        assertThat(skillsList).hasSize(databaseSizeBeforeUpdate);
        Skills testSkills = skillsList.get(skillsList.size() - 1);
        assertThat(testSkills.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testSkills.getCode()).isEqualTo(UPDATED_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingSkills() throws Exception {
        int databaseSizeBeforeUpdate = skillsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSkillsMockMvc.perform(put("/api/skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(skills)))
            .andExpect(status().isBadRequest());

        // Validate the Skills in the database
        List<Skills> skillsList = skillsRepository.findAll();
        assertThat(skillsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSkills() throws Exception {
        // Initialize the database
        skillsRepository.saveAndFlush(skills);

        int databaseSizeBeforeDelete = skillsRepository.findAll().size();

        // Delete the skills
        restSkillsMockMvc.perform(delete("/api/skills/{id}", skills.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Skills> skillsList = skillsRepository.findAll();
        assertThat(skillsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
