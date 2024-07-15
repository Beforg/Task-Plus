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
    
    get getId() {
        return this.id;
    }

    get getNome() {
        return this.nome;
    }

    get getDescricao() {
        return this.descricao;
    }

    get getDataHora() {
        return this.dataHora;
    }

    get getConcluido() {
        return this.concluido;
    }

    set setId(id: number) {
        this.id = id;
    }

    set setNome(nome: string) {
        this.nome = nome;
    }

    set setDescricao(descricao: string) {
        this.descricao = descricao;
    }

    set setDataHora(dataHora: string) {
        this.dataHora = dataHora;
    }

    set setConcluido(concluido: boolean) {
        this.concluido = concluido;
    }

    public concluirTarefa() : boolean {
        if (this.concluido == true) {
            this.concluido = false;
            return this.concluido;
        } else {
            this.concluido = true;
            return this.concluido;
        }
    }
    
}