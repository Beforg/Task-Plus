class Tarefa {

    id: number;
    nome: string;
    descricao: string;
    dataHora: string;
    concluido: boolean;

    constructor(id: number, nome: string, descricao: string, dataHora: string, concluido: boolean) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.dataHora = dataHora;
        this.concluido = concluido;
    }

}