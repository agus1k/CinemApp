package org.agus.springboot.cinema_project.services;

import org.agus.springboot.cinema_project.entities.Auditorium;
import org.agus.springboot.cinema_project.exception.custom.AuditoriumNotFoundException;
import org.agus.springboot.cinema_project.repositories.AuditoriumRepository;
import org.springframework.stereotype.Service;

@Service
public class AuditoriumService {

    private final AuditoriumRepository auditoriumRepository;

    public AuditoriumService(AuditoriumRepository auditoriumRepository) {
        this.auditoriumRepository = auditoriumRepository;
    }

    public Auditorium getAuditorium(Long id) {
        return auditoriumRepository.findById(id).orElseThrow(() -> new AuditoriumNotFoundException("Auditorium not found"));
    }
}
