package beforg.api.taskplus.dto;

import jakarta.validation.constraints.NotNull;

public record TaskConcluidaDto(@NotNull boolean concluido) {
}
