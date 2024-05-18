package beforg.api.taskplus.repository;

import beforg.api.taskplus.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT t FROM Task t WHERE t.concluido = false ORDER BY t.data DESC")
    List<Task> findAllNotConcluidoOrderByData();
    @Query("SELECT t FROM Task t WHERE t.concluido = true ORDER BY t.data DESC")
    List<Task> findAllConcluidoOrderByData();
}
