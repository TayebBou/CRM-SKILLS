package com.tayeb_bousfiha.crm_skills.web.rest;

import com.tayeb_bousfiha.crm_skills.CrmSkillsApp;
import com.tayeb_bousfiha.crm_skills.domain.Collaborator;
import com.tayeb_bousfiha.crm_skills.domain.User;
import com.tayeb_bousfiha.crm_skills.domain.Skills;
import com.tayeb_bousfiha.crm_skills.repository.CollaboratorRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.tayeb_bousfiha.crm_skills.domain.enumeration.FamilySituation;
/**
 * Integration tests for the {@link CollaboratorResource} REST controller.
 */
@SpringBootTest(classes = CrmSkillsApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class CollaboratorResourceIT {

    private static final String DEFAULT_REGISTER_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_REGISTER_NUMBER = "BBBBBBBBBB";

    private static final FamilySituation DEFAULT_FAMILY_SITUATION = FamilySituation.MARRIED;
    private static final FamilySituation UPDATED_FAMILY_SITUATION = FamilySituation.CELIBATE;

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_OF_BIRTH = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OF_BIRTH = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final byte[] DEFAULT_AVATAR = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_AVATAR = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_AVATAR_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_AVATAR_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_LINE_MANAGER = "AAAAAAAAAA";
    private static final String UPDATED_LINE_MANAGER = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_AVAILABILITY_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_AVAILABILITY_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CollaboratorRepository collaboratorRepository;

    @Mock
    private CollaboratorRepository collaboratorRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCollaboratorMockMvc;

    private Collaborator collaborator;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Collaborator createEntity(EntityManager em) {
        Collaborator collaborator = new Collaborator()
            .registerNumber(DEFAULT_REGISTER_NUMBER)
            .familySituation(DEFAULT_FAMILY_SITUATION)
            .phone(DEFAULT_PHONE)
            .dateOfBirth(DEFAULT_DATE_OF_BIRTH)
            .startDate(DEFAULT_START_DATE)
            .avatar(DEFAULT_AVATAR)
            .avatarContentType(DEFAULT_AVATAR_CONTENT_TYPE)
            .lineManager(DEFAULT_LINE_MANAGER)
            .availabilityDate(DEFAULT_AVAILABILITY_DATE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        collaborator.setAccount(user);
        // Add required entity
        Skills skills;
        if (TestUtil.findAll(em, Skills.class).isEmpty()) {
            skills = SkillsResourceIT.createEntity(em);
            em.persist(skills);
            em.flush();
        } else {
            skills = TestUtil.findAll(em, Skills.class).get(0);
        }
        collaborator.getSkills().add(skills);
        return collaborator;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Collaborator createUpdatedEntity(EntityManager em) {
        Collaborator collaborator = new Collaborator()
            .registerNumber(UPDATED_REGISTER_NUMBER)
            .familySituation(UPDATED_FAMILY_SITUATION)
            .phone(UPDATED_PHONE)
            .dateOfBirth(UPDATED_DATE_OF_BIRTH)
            .startDate(UPDATED_START_DATE)
            .avatar(UPDATED_AVATAR)
            .avatarContentType(UPDATED_AVATAR_CONTENT_TYPE)
            .lineManager(UPDATED_LINE_MANAGER)
            .availabilityDate(UPDATED_AVAILABILITY_DATE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        collaborator.setAccount(user);
        // Add required entity
        Skills skills;
        if (TestUtil.findAll(em, Skills.class).isEmpty()) {
            skills = SkillsResourceIT.createUpdatedEntity(em);
            em.persist(skills);
            em.flush();
        } else {
            skills = TestUtil.findAll(em, Skills.class).get(0);
        }
        collaborator.getSkills().add(skills);
        return collaborator;
    }

    @BeforeEach
    public void initTest() {
        collaborator = createEntity(em);
    }

    @Test
    @Transactional
    public void createCollaborator() throws Exception {
        int databaseSizeBeforeCreate = collaboratorRepository.findAll().size();
        // Create the Collaborator
        restCollaboratorMockMvc.perform(post("/api/collaborators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(collaborator)))
            .andExpect(status().isCreated());

        // Validate the Collaborator in the database
        List<Collaborator> collaboratorList = collaboratorRepository.findAll();
        assertThat(collaboratorList).hasSize(databaseSizeBeforeCreate + 1);
        Collaborator testCollaborator = collaboratorList.get(collaboratorList.size() - 1);
        assertThat(testCollaborator.getRegisterNumber()).isEqualTo(DEFAULT_REGISTER_NUMBER);
        assertThat(testCollaborator.getFamilySituation()).isEqualTo(DEFAULT_FAMILY_SITUATION);
        assertThat(testCollaborator.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testCollaborator.getDateOfBirth()).isEqualTo(DEFAULT_DATE_OF_BIRTH);
        assertThat(testCollaborator.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testCollaborator.getAvatar()).isEqualTo(DEFAULT_AVATAR);
        assertThat(testCollaborator.getAvatarContentType()).isEqualTo(DEFAULT_AVATAR_CONTENT_TYPE);
        assertThat(testCollaborator.getLineManager()).isEqualTo(DEFAULT_LINE_MANAGER);
        assertThat(testCollaborator.getAvailabilityDate()).isEqualTo(DEFAULT_AVAILABILITY_DATE);
    }

    @Test
    @Transactional
    public void createCollaboratorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = collaboratorRepository.findAll().size();

        // Create the Collaborator with an existing ID
        collaborator.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCollaboratorMockMvc.perform(post("/api/collaborators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(collaborator)))
            .andExpect(status().isBadRequest());

        // Validate the Collaborator in the database
        List<Collaborator> collaboratorList = collaboratorRepository.findAll();
        assertThat(collaboratorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkRegisterNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = collaboratorRepository.findAll().size();
        // set the field null
        collaborator.setRegisterNumber(null);

        // Create the Collaborator, which fails.


        restCollaboratorMockMvc.perform(post("/api/collaborators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(collaborator)))
            .andExpect(status().isBadRequest());

        List<Collaborator> collaboratorList = collaboratorRepository.findAll();
        assertThat(collaboratorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFamilySituationIsRequired() throws Exception {
        int databaseSizeBeforeTest = collaboratorRepository.findAll().size();
        // set the field null
        collaborator.setFamilySituation(null);

        // Create the Collaborator, which fails.


        restCollaboratorMockMvc.perform(post("/api/collaborators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(collaborator)))
            .andExpect(status().isBadRequest());

        List<Collaborator> collaboratorList = collaboratorRepository.findAll();
        assertThat(collaboratorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = collaboratorRepository.findAll().size();
        // set the field null
        collaborator.setPhone(null);

        // Create the Collaborator, which fails.


        restCollaboratorMockMvc.perform(post("/api/collaborators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(collaborator)))
            .andExpect(status().isBadRequest());

        List<Collaborator> collaboratorList = collaboratorRepository.findAll();
        assertThat(collaboratorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateOfBirthIsRequired() throws Exception {
        int databaseSizeBeforeTest = collaboratorRepository.findAll().size();
        // set the field null
        collaborator.setDateOfBirth(null);

        // Create the Collaborator, which fails.


        restCollaboratorMockMvc.perform(post("/api/collaborators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(collaborator)))
            .andExpect(status().isBadRequest());

        List<Collaborator> collaboratorList = collaboratorRepository.findAll();
        assertThat(collaboratorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = collaboratorRepository.findAll().size();
        // set the field null
        collaborator.setStartDate(null);

        // Create the Collaborator, which fails.


        restCollaboratorMockMvc.perform(post("/api/collaborators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(collaborator)))
            .andExpect(status().isBadRequest());

        List<Collaborator> collaboratorList = collaboratorRepository.findAll();
        assertThat(collaboratorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLineManagerIsRequired() throws Exception {
        int databaseSizeBeforeTest = collaboratorRepository.findAll().size();
        // set the field null
        collaborator.setLineManager(null);

        // Create the Collaborator, which fails.


        restCollaboratorMockMvc.perform(post("/api/collaborators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(collaborator)))
            .andExpect(status().isBadRequest());

        List<Collaborator> collaboratorList = collaboratorRepository.findAll();
        assertThat(collaboratorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCollaborators() throws Exception {
        // Initialize the database
        collaboratorRepository.saveAndFlush(collaborator);

        // Get all the collaboratorList
        restCollaboratorMockMvc.perform(get("/api/collaborators?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(collaborator.getId().intValue())))
            .andExpect(jsonPath("$.[*].registerNumber").value(hasItem(DEFAULT_REGISTER_NUMBER)))
            .andExpect(jsonPath("$.[*].familySituation").value(hasItem(DEFAULT_FAMILY_SITUATION.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].dateOfBirth").value(hasItem(DEFAULT_DATE_OF_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].avatarContentType").value(hasItem(DEFAULT_AVATAR_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].avatar").value(hasItem(Base64Utils.encodeToString(DEFAULT_AVATAR))))
            .andExpect(jsonPath("$.[*].lineManager").value(hasItem(DEFAULT_LINE_MANAGER)))
            .andExpect(jsonPath("$.[*].availabilityDate").value(hasItem(DEFAULT_AVAILABILITY_DATE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllCollaboratorsWithEagerRelationshipsIsEnabled() throws Exception {
        when(collaboratorRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCollaboratorMockMvc.perform(get("/api/collaborators?eagerload=true"))
            .andExpect(status().isOk());

        verify(collaboratorRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllCollaboratorsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(collaboratorRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCollaboratorMockMvc.perform(get("/api/collaborators?eagerload=true"))
            .andExpect(status().isOk());

        verify(collaboratorRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getCollaborator() throws Exception {
        // Initialize the database
        collaboratorRepository.saveAndFlush(collaborator);

        // Get the collaborator
        restCollaboratorMockMvc.perform(get("/api/collaborators/{id}", collaborator.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(collaborator.getId().intValue()))
            .andExpect(jsonPath("$.registerNumber").value(DEFAULT_REGISTER_NUMBER))
            .andExpect(jsonPath("$.familySituation").value(DEFAULT_FAMILY_SITUATION.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE))
            .andExpect(jsonPath("$.dateOfBirth").value(DEFAULT_DATE_OF_BIRTH.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.avatarContentType").value(DEFAULT_AVATAR_CONTENT_TYPE))
            .andExpect(jsonPath("$.avatar").value(Base64Utils.encodeToString(DEFAULT_AVATAR)))
            .andExpect(jsonPath("$.lineManager").value(DEFAULT_LINE_MANAGER))
            .andExpect(jsonPath("$.availabilityDate").value(DEFAULT_AVAILABILITY_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCollaborator() throws Exception {
        // Get the collaborator
        restCollaboratorMockMvc.perform(get("/api/collaborators/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCollaborator() throws Exception {
        // Initialize the database
        collaboratorRepository.saveAndFlush(collaborator);

        int databaseSizeBeforeUpdate = collaboratorRepository.findAll().size();

        // Update the collaborator
        Collaborator updatedCollaborator = collaboratorRepository.findById(collaborator.getId()).get();
        // Disconnect from session so that the updates on updatedCollaborator are not directly saved in db
        em.detach(updatedCollaborator);
        updatedCollaborator
            .registerNumber(UPDATED_REGISTER_NUMBER)
            .familySituation(UPDATED_FAMILY_SITUATION)
            .phone(UPDATED_PHONE)
            .dateOfBirth(UPDATED_DATE_OF_BIRTH)
            .startDate(UPDATED_START_DATE)
            .avatar(UPDATED_AVATAR)
            .avatarContentType(UPDATED_AVATAR_CONTENT_TYPE)
            .lineManager(UPDATED_LINE_MANAGER)
            .availabilityDate(UPDATED_AVAILABILITY_DATE);

        restCollaboratorMockMvc.perform(put("/api/collaborators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCollaborator)))
            .andExpect(status().isOk());

        // Validate the Collaborator in the database
        List<Collaborator> collaboratorList = collaboratorRepository.findAll();
        assertThat(collaboratorList).hasSize(databaseSizeBeforeUpdate);
        Collaborator testCollaborator = collaboratorList.get(collaboratorList.size() - 1);
        assertThat(testCollaborator.getRegisterNumber()).isEqualTo(UPDATED_REGISTER_NUMBER);
        assertThat(testCollaborator.getFamilySituation()).isEqualTo(UPDATED_FAMILY_SITUATION);
        assertThat(testCollaborator.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testCollaborator.getDateOfBirth()).isEqualTo(UPDATED_DATE_OF_BIRTH);
        assertThat(testCollaborator.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testCollaborator.getAvatar()).isEqualTo(UPDATED_AVATAR);
        assertThat(testCollaborator.getAvatarContentType()).isEqualTo(UPDATED_AVATAR_CONTENT_TYPE);
        assertThat(testCollaborator.getLineManager()).isEqualTo(UPDATED_LINE_MANAGER);
        assertThat(testCollaborator.getAvailabilityDate()).isEqualTo(UPDATED_AVAILABILITY_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingCollaborator() throws Exception {
        int databaseSizeBeforeUpdate = collaboratorRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCollaboratorMockMvc.perform(put("/api/collaborators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(collaborator)))
            .andExpect(status().isBadRequest());

        // Validate the Collaborator in the database
        List<Collaborator> collaboratorList = collaboratorRepository.findAll();
        assertThat(collaboratorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCollaborator() throws Exception {
        // Initialize the database
        collaboratorRepository.saveAndFlush(collaborator);

        int databaseSizeBeforeDelete = collaboratorRepository.findAll().size();

        // Delete the collaborator
        restCollaboratorMockMvc.perform(delete("/api/collaborators/{id}", collaborator.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Collaborator> collaboratorList = collaboratorRepository.findAll();
        assertThat(collaboratorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
