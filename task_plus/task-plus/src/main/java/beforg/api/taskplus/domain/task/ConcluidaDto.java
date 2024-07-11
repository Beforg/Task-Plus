package beforg.api.taskplus.domain.task;

import jakarta.validation.constraints.NotNull;

public record ConcluidaDto(@NotNull boolean concluido, @NotNull Long id) {
}
