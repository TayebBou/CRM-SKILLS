package com.tayeb_bousfiha.crm_skills.service;

import com.tayeb_bousfiha.crm_skills.domain.Collaborator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Collection;

public interface CollaboratorRepositoryCustom {

    public Collection<Long> stringToCollectionLong(String string, Long lengthString);

    public Page<Collaborator> collaboratorsListToPage(List<Collaborator> collaborators, Pageable pageable);
}