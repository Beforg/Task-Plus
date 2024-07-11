export function validaCamposTarefa(nome: string, descricao: string, data: string) : boolean {
    if(nome === '' || descricao === '' || data === '') {
        return false;
    }
    return true;
}