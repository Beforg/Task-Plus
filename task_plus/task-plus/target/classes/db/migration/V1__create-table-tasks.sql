create table tasks(
        id SERIAL PRIMARY KEY,
        nome varchar(100) not null,
        descricao varchar(255) not null,
        data_criacao timestamp not null,
        concluido boolean not null
);