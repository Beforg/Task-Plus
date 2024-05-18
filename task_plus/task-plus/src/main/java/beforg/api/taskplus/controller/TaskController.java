package beforg.api.taskplus.controller;

import beforg.api.taskplus.dto.TaskConcluidaDto;
import beforg.api.taskplus.dto.TaskDto;
import beforg.api.taskplus.model.Task;
import beforg.api.taskplus.repository.TaskRepository;
import beforg.api.taskplus.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;
    @Autowired
    private TaskRepository taskRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<String> criarTarefa(@RequestBody @Valid TaskDto taskDto) {
        taskRepository.save(new Task(taskDto.nome(), taskDto.descricao(), taskDto.data()));
        return ResponseEntity.ok().build();
    }
    @GetMapping
    public ResponseEntity<List<TaskDto>> listarTarefas() {
        List<TaskDto> tarefas = taskService.listar();
        return ResponseEntity.ok(tarefas);
    }

    @GetMapping("/concluidas")
    public ResponseEntity<List<TaskDto>> listarTarefasConcluidas() {
        List<TaskDto> tarefas = taskService.listarConcluidas();
        return ResponseEntity.ok(tarefas);
    }

    @PutMapping("/{id}/concluir")
    @Transactional
    public ResponseEntity<String> concluirTarefa(@PathVariable Long id, @RequestBody @Valid TaskConcluidaDto dto) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Tarefa não encontrada"));
        task.setConcluido(dto.concluido());
        taskRepository.save(task);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/atualizar")
    @Transactional
    public ResponseEntity<String> atualizarTarefa(@RequestBody @Valid TaskDto taskDto) {
        Task task = taskRepository.findById(taskDto.id()).orElseThrow(() -> new IllegalArgumentException("Tarefa não encontrada"));
        task.setNome(taskDto.nome());
        task.setDescricao(taskDto.descricao());
        task.setData(taskDto.data());
        taskRepository.save(task);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deletarTarefa(@PathVariable Long id) {
        taskRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
