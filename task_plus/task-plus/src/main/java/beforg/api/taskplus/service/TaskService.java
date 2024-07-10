package beforg.api.taskplus.service;

import beforg.api.taskplus.domain.task.TaskDto;
import beforg.api.taskplus.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<TaskDto> listar() {
        return taskRepository
                .findAllNotConcluidoOrderByData()
                .stream()
                .map(TaskDto::new)
                .toList();
    }
    public List<TaskDto> listarConcluidas() {
        return taskRepository
                .findAllConcluidoOrderByData()
                .stream()
                .map(TaskDto::new)
                .toList();
    }
}
