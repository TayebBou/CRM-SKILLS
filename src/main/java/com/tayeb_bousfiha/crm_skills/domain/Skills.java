package com.tayeb_bousfiha.crm_skills.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Skills.
 */
@Entity
@Table(name = "skills")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Skills implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "label", nullable = false, unique = true)
    private String label;

    @NotNull
    @Column(name = "code", nullable = false, unique = true)
    private String code;

    @ManyToMany(mappedBy = "skills")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Collaborator> collaborators = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "skills", allowSetters = true)
    private Category category;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public Skills label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getCode() {
        return code;
    }

    public Skills code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Set<Collaborator> getCollaborators() {
        return collaborators;
    }

    public Skills collaborators(Set<Collaborator> collaborators) {
        this.collaborators = collaborators;
        return this;
    }

    public Skills addCollaborators(Collaborator collaborator) {
        this.collaborators.add(collaborator);
        collaborator.getSkills().add(this);
        return this;
    }

    public Skills removeCollaborators(Collaborator collaborator) {
        this.collaborators.remove(collaborator);
        collaborator.getSkills().remove(this);
        return this;
    }

    public void setCollaborators(Set<Collaborator> collaborators) {
        this.collaborators = collaborators;
    }

    public Category getCategory() {
        return category;
    }

    public Skills category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Skills)) {
            return false;
        }
        return id != null && id.equals(((Skills) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Skills{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", code='" + getCode() + "'" +
            "}";
    }
}
