package org.agus.springboot.cinema_project.validation;

import jakarta.validation.GroupSequence;
import org.agus.springboot.cinema_project.validation.groups.BasicChecks;
import org.agus.springboot.cinema_project.validation.groups.CustomChecks;

@GroupSequence({BasicChecks.class, CustomChecks.class})
public interface ValidationOrder {}
