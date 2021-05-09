package com.tayeb_bousfiha.crm_skills.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.tayeb_bousfiha.crm_skills.domain.enumeration.FamilySituation;

/**
 * A Collaborator.
 */
@Entity
@Table(name = "collaborator")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Collaborator implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "register_number", nullable = false, unique = true)
    private String registerNumber;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "family_situation", nullable = false)
    private FamilySituation familySituation;

    @NotNull
    @Column(name = "phone", nullable = false, unique = true)
    private String phone;

    @NotNull
    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    
    @Lob
    @Column(name = "avatar", nullable = false)
    private byte[] avatar;

    @Column(name = "avatar_content_type", nullable = false)
    private String avatarContentType;

    @NotNull
    @Column(name = "line_manager", nullable = false)
    private String lineManager;

    @Column(name = "availability_date")
    private LocalDate availabilityDate;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private User account;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @NotEmpty
    @JoinTable(name = "collaborator_skills",
               joinColumns = @JoinColumn(name = "collaborator_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "skills_id", referencedColumnName = "id"))
    private Set<Skills> skills = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegisterNumber() {
        return registerNumber;
    }

    public Collaborator registerNumber(String registerNumber) {
        this.registerNumber = registerNumber;
        return this;
    }

    public void setRegisterNumber(String registerNumber) {
        this.registerNumber = registerNumber;
    }

    public FamilySituation getFamilySituation() {
        return familySituation;
    }

    public Collaborator familySituation(FamilySituation familySituation) {
        this.familySituation = familySituation;
        return this;
    }

    public void setFamilySituation(FamilySituation familySituation) {
        this.familySituation = familySituation;
    }

    public String getPhone() {
        return phone;
    }

    public Collaborator phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public Collaborator dateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        return this;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Collaborator startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public byte[] getAvatar() {
        return avatar;
    }

    public Collaborator avatar(byte[] avatar) {
        this.avatar = avatar;
        return this;
    }

    public void setAvatar(byte[] avatar) {
        this.avatar = avatar;
    }

    public String getAvatarContentType() {
        return avatarContentType;
    }

    public Collaborator avatarContentType(String avatarContentType) {
        this.avatarContentType = avatarContentType;
        return this;
    }

    public void setAvatarContentType(String avatarContentType) {
        this.avatarContentType = avatarContentType;
    }

    public String getLineManager() {
        return lineManager;
    }

    public Collaborator lineManager(String lineManager) {
        this.lineManager = lineManager;
        return this;
    }

    public void setLineManager(String lineManager) {
        this.lineManager = lineManager;
    }

    public LocalDate getAvailabilityDate() {
        return availabilityDate;
    }

    public Collaborator availabilityDate(LocalDate availabilityDate) {
        this.availabilityDate = availabilityDate;
        return this;
    }

    public void setAvailabilityDate(LocalDate availabilityDate) {
        this.availabilityDate = availabilityDate;
    }

    public User getAccount() {
        return account;
    }

    public Collaborator account(User user) {
        this.account = user;
        return this;
    }

    public void setAccount(User user) {
        this.account = user;
    }

    public Set<Skills> getSkills() {
        return skills;
    }

    public Collaborator skills(Set<Skills> skills) {
        this.skills = skills;
        return this;
    }

    public Collaborator addSkills(Skills skills) {
        this.skills.add(skills);
        skills.getCollaborators().add(this);
        return this;
    }

    public Collaborator removeSkills(Skills skills) {
        this.skills.remove(skills);
        skills.getCollaborators().remove(this);
        return this;
    }

    public void setSkills(Set<Skills> skills) {
        this.skills = skills;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Collaborator)) {
            return false;
        }
        return id != null && id.equals(((Collaborator) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Collaborator{" +
            "id=" + getId() +
            ", registerNumber='" + getRegisterNumber() + "'" +
            ", familySituation='" + getFamilySituation() + "'" +
            ", phone='" + getPhone() + "'" +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", avatar='" + getAvatar() + "'" +
            ", avatarContentType='" + getAvatarContentType() + "'" +
            ", lineManager='" + getLineManager() + "'" +
            ", availabilityDate='" + getAvailabilityDate() + "'" +
            "}";
    }
}
