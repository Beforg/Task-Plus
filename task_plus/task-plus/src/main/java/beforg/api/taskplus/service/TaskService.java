package beforg.api.taskplus.service;

import beforg.api.taskplus.domain.task.ConcluidaDto;
import beforg.api.taskplus.domain.task.Task;
import beforg.api.taskplus.domain.task.TaskDto;
import beforg.api.taskplus.repositories.TaskRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public void criar(TaskDto taskDto) {
        taskRepository.save(new Task(taskDto.nome(), taskDto.descricao(), taskDto.data()));
    }
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
    public void concluir(@Valid ConcluidaDto dto) {
        Task task = taskRepository.findById(dto.id()).orElseThrow(() -> new IllegalArgumentException("Tarefa não encontrada"));
        task.setConcluido(dto.concluido());
        taskRepository.save(task);
    }
    public void atualizar(TaskDto taskDto) {
        Task task = taskRepository.findById(taskDto.id()).orElseThrow(() -> new IllegalArgumentException("Tarefa não encontrada"));
        task.setNome(taskDto.nome());
        task.setDescricao(taskDto.descricao());
        task.setData(taskDto.data());
        taskRepository.save(task);
    }
    public void deletar(Long id) {
        taskRepository.deleteById(id);
    }
}
