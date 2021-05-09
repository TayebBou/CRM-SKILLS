package com.tayeb_bousfiha.crm_skills.web.rest;

import com.tayeb_bousfiha.crm_skills.CrmSkillsApp;
import com.tayeb_bousfiha.crm_skills.domain.Level;
import com.tayeb_bousfiha.crm_skills.repository.LevelRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link LevelResource} REST controller.
 */
@SpringBootTest(classes = CrmSkillsApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class LevelResourceIT {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private LevelRepository levelRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLevelMockMvc;

    private Level level;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Level createEntity(EntityManager em) {
        Level level = new Level()
            .label(DEFAULT_LABEL)
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION);
        return level;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Level createUpdatedEntity(EntityManager em) {
        Level level = new Level()
            .label(UPDATED_LABEL)
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION);
        return level;
    }

    @BeforeEach
    public void initTest() {
        level = createEntity(em);
    }

    @Test
    @Transactional
    public void createLevel() throws Exception {
        int databaseSizeBeforeCreate = levelRepository.findAll().size();
        // Create the Level
        restLevelMockMvc.perform(post("/api/levels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(level)))
            .andExpect(status().isCreated());

        // Validate the Level in the database
        List<Level> levelList = levelRepository.findAll();
        assertThat(levelList).hasSize(databaseSizeBeforeCreate + 1);
        Level testLevel = levelList.get(levelList.size() - 1);
        assertThat(testLevel.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testLevel.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testLevel.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createLevelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = levelRepository.findAll().size();

        // Create the Level with an existing ID
        level.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLevelMockMvc.perform(post("/api/levels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(level)))
            .andExpect(status().isBadRequest());

        // Validate the Level in the database
        List<Level> levelList = levelRepository.findAll();
        assertThat(levelList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLabelIsRequired() throws Exception {
        int databaseSizeBeforeTest = levelRepository.findAll().size();
        // set the field null
        level.setLabel(null);

        // Create the Level, which fails.


        restLevelMockMvc.perform(post("/api/levels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(level)))
            .andExpect(status().isBadRequest());

        List<Level> levelList = levelRepository.findAll();
        assertThat(levelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = levelRepository.findAll().size();
        // set the field null
        level.setCode(null);

        // Create the Level, which fails.


        restLevelMockMvc.perform(post("/api/levels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(level)))
            .andExpect(status().isBadRequest());

        List<Level> levelList = levelRepository.findAll();
        assertThat(levelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLevels() throws Exception {
        // Initialize the database
        levelRepository.saveAndFlush(level);

        // Get all the levelList
        restLevelMockMvc.perform(get("/api/levels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(level.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getLevel() throws Exception {
        // Initialize the database
        levelRepository.saveAndFlush(level);

        // Get the level
        restLevelMockMvc.perform(get("/api/levels/{id}", level.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(level.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingLevel() throws Exception {
        // Get the level
        restLevelMockMvc.perform(get("/api/levels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLevel() throws Exception {
        // Initialize the database
        levelRepository.saveAndFlush(level);

        int databaseSizeBeforeUpdate = levelRepository.findAll().size();

        // Update the level
        Level updatedLevel = levelRepository.findById(level.getId()).get();
        // Disconnect from session so that the updates on updatedLevel are not directly saved in db
        em.detach(updatedLevel);
        updatedLevel
            .label(UPDATED_LABEL)
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION);

        restLevelMockMvc.perform(put("/api/levels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLevel)))
            .andExpect(status().isOk());

        // Validate the Level in the database
        List<Level> levelList = levelRepository.findAll();
        assertThat(levelList).hasSize(databaseSizeBeforeUpdate);
        Level testLevel = levelList.get(levelList.size() - 1);
        assertThat(testLevel.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testLevel.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testLevel.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingLevel() throws Exception {
        int databaseSizeBeforeUpdate = levelRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLevelMockMvc.perform(put("/api/levels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(level)))
            .andExpect(status().isBadRequest());

        // Validate the Level in the database
        List<Level> levelList = levelRepository.findAll();
        assertThat(levelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLevel() throws Exception {
        // Initialize the database
        levelRepository.saveAndFlush(level);

        int databaseSizeBeforeDelete = levelRepository.findAll().size();

        // Delete the level
        restLevelMockMvc.perform(delete("/api/levels/{id}", level.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Level> levelList = levelRepository.findAll();
        assertThat(levelList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
