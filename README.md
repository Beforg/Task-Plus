# Task+

Aplicação feita com Java, Spring Boot, JavaScript, HTML, CSS, e PostgreSQL, com intuito de vincular uma API Java com um front-end.

![](https://github.com/Beforg/assets/blob/main/task%2B/inicio.png)

## Sobre:

Aplicação para gerenciar tarefas, com funcionalidades de **criar, editar e excluir** tarefas, além de colocar marcação de **concluída**. O projeto
usa uma API feita em Java com Spring conectada ao banco de dados PostgreSQL.

### Estrutura do Projeto:

#### Na parte do front, possui os seguintes itens:<br>

`audio`: pasta com os audios do projeto;<br>
`img`: pasta com as imagens do projeto;<br>
`index.html`: arquivo principal HTML;<br>
`reset.css e style.css`: arquivos para estilizar e resetar o css padrão;<br>
`script.js`: arquivo JavaScript principal do projeto¹.<br>

¹Apareceram alguns problemas na hora de eu separar os arquivos e manti todos em um só já que era um projeto com mais ênfase em testes.<br>

#### Na parte do back-end:<br>

`controller`: package onde fica o **controller** principal da aplicação;<br>
`dto`: package onde ficam as classes DTO do projeto;<br>
`model`: package onde fica a entidade que representa as Tarefas;<br>
`repository`: package onde fica a interface para a persistência dos dados no PostgreSQL<br>
`security`: package onde fica a classe CorsConfiguration, responsável pelas permissões da aplicação.<br>
`service`: classe para realização da lógica de negócio.<br>

## Funcionalidades:

### Adicionar novas tarefas:

Podemos adicionar novas tarefas, com o end-point `url/task` no método Post, que vai receber o nome, descrição e data da tarefa:

![](https://github.com/Beforg/assets/blob/main/task%2B/add-task.png)

As tarefas aparecem na tela assim que forem adicionadas, elas têm uma lógica dentro do arquivo JS para serem recarregadas após certas operações.<br>
  Ao adicionar tarefas, recebemos uma notificação da aplicação que uma nova tarefa foi adicionada, acionando o **som** de tarefa adicionada, essa parte fica por responsabilidade 
  do arquivo JS do projeto.

![](https://github.com/Beforg/assets/blob/main/task%2B/task-adicionada.png)

Ao clicar sobre a tarefa podemos, também, ver a descrição que foi inserida naquela tarefa. Desse mesmo jeito, nosso front guarda os dados do **Nome, Descrição, Data e ID** da tarefa, para caso necessário
seja acionada a **Edição** ou **Exclusão** da tarefa.

![](https://github.com/Beforg/assets/blob/main/task%2B/desc-task.png)

### Filtrar:

Podemos filtrar as tarefas pendentes ou concluídas na aplicação, a lógica da filtragem fica por conta do **back-end**, nas queries **JPQL** do `TaskRepository`.

```java
@Query("SELECT t FROM Task t WHERE t.concluido = false ORDER BY t.data DESC")
    List<Task> findAllNotConcluidoOrderByData();
    @Query("SELECT t FROM Task t WHERE t.concluido = true ORDER BY t.data DESC")
    List<Task> findAllConcluidoOrderByData();
```

![](https://github.com/Beforg/assets/blob/main/task%2B/filtro-tarefas.png)

Ao concluir as tarefas, recebemos o `TaskConcluidoDto` no back-end para atualizar o status de `concluido` da tarefa (recebendo true / false)

### Gerenciamento

Podemos gerenciar as tarefas, **editando ou excluindo** elas:

![](https://github.com/Beforg/assets/blob/main/task%2B/gerenciar-task.png)

## Considerações finais:

Foi um projeto simples com intuito de fazer a conexão do Back-End com o Front-End, foi um projeto feito do zero, foi minha primeira experiência com isso então não cuidei muito dos detalhes pois não tive tempo suficiente para dedicar a esse projeto, e como estou em outros projetos também não consegui dar toda atenção necessária,
pois logo vou atualizar esse ou criar outro mais completo.

### Tecnologias usadas:

- Java
- Spring Framework
- Flyway Migrations
- PostgreSQL
- JavaScript
- HTML
- CSS
