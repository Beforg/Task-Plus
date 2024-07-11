package beforg.api.taskplus.controller;

import beforg.api.taskplus.domain.task.ConcluidaDto;
import beforg.api.taskplus.domain.task.TaskDto;
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

    @PostMapping
    @Transactional
    public ResponseEntity<String> criarTarefa(@RequestBody @Valid TaskDto taskDto) {
        taskService.criar(taskDto);
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

    @PutMapping("/concluir")
    @Transactional
    public ResponseEntity<String> concluirTarefa(@RequestBody @Valid ConcluidaDto dto) {
        taskService.concluir(dto);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/atualizar")
    @Transactional
    public ResponseEntity<String> atualizarTarefa(@RequestBody @Valid TaskDto taskDto) {
        taskService.atualizar(taskDto);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deletarTarefa(@PathVariable Long id) {
        taskService.deletar(id);
        return ResponseEntity.ok().build();
    }
}
