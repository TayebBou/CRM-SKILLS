package com.tayeb_bousfiha.crm_skills.service;

import com.tayeb_bousfiha.crm_skills.domain.Collaborator;
import com.tayeb_bousfiha.crm_skills.repository.CollaboratorRepository;

import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageImpl;

import java.util.List;
import java.util.Collection;
import java.util.ArrayList;

@Service
public class CollaboratorRepositoryCustomImpl implements CollaboratorRepositoryCustom 
{
    private final CollaboratorRepository collaboratorRepository;

    // constructor-based injection
    public CollaboratorRepositoryCustomImpl(CollaboratorRepository collaboratorRepository){
        
        this.collaboratorRepository = collaboratorRepository;
    }

    // Convert String to Collection<Long>
    public Collection<Long> stringToCollectionLong(String string, Long lengthString){
        Collection<Long> result =  new ArrayList<Long>();
        String[] arrOfStr = string.split(",", lengthString.intValue());
        for (String a : arrOfStr){
            result.add(Long.parseLong(a));
        }
        return result;
    }

    // Convert a List of collaborators to a page of collaborators
    public Page<Collaborator> collaboratorsListToPage(List<Collaborator> collaborators, Pageable pageable){
        int start = (int) pageable.getOffset();
        int end;
        if((start + pageable.getPageSize()) > collaborators.size()){
            end = collaborators.size();
        } else {
            end = (start + pageable.getPageSize());
        }
        Page<Collaborator> page = new PageImpl<Collaborator>(collaborators.subList(start, end), pageable, collaborators.size());
        return page;
    }
}