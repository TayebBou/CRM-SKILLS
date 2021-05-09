package com.tayeb_bousfiha.crm_skills;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.tayeb_bousfiha.crm_skills");

        noClasses()
            .that()
                .resideInAnyPackage("com.tayeb_bousfiha.crm_skills.service..")
            .or()
                .resideInAnyPackage("com.tayeb_bousfiha.crm_skills.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..com.tayeb_bousfiha.crm_skills.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
