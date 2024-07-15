export function validaCamposTarefa(nome, descricao, data) {
    if (nome === '' || descricao === '' || data === '') {
        return false;
    }
    return true;
}
