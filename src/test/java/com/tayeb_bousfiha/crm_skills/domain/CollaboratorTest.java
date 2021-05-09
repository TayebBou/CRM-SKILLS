package com.tayeb_bousfiha.crm_skills.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tayeb_bousfiha.crm_skills.web.rest.TestUtil;

public class CollaboratorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Collaborator.class);
        Collaborator collaborator1 = new Collaborator();
        collaborator1.setId(1L);
        Collaborator collaborator2 = new Collaborator();
        collaborator2.setId(collaborator1.getId());
        assertThat(collaborator1).isEqualTo(collaborator2);
        collaborator2.setId(2L);
        assertThat(collaborator1).isNotEqualTo(collaborator2);
        collaborator1.setId(null);
        assertThat(collaborator1).isNotEqualTo(collaborator2);
    }
}
