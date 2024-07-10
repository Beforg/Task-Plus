package beforg.api.taskplus.domain.task;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record TaskDto(@NotBlank String nome, @NotBlank String descricao, @NotNull LocalDate data, boolean concluido, Long id) {
        public TaskDto(Task task) {
                this(task.getNome(), task.getDescricao(), task.getData(), task.isConcluido(), task.getId());
        }
}
