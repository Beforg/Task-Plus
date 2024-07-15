export function validaCamposTarefa(nome: string, descricao: string, data: string) : boolean {
    if(nome === '' || descricao === '' || data === '') {
        return false;
    }
    return true;
}

export function validaConcluido(tarefa: Tarefa) : boolean {
    if(tarefa.concluido) {
        return true;
    }
    return false;
}