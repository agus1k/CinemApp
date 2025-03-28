package org.agus.springboot.cinema_project.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = IsFunctionExistsValidation.class)
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface IsFunctionExists {
    String message() default "Esta funcion ya existe.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
