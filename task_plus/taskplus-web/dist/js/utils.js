export function avisoTarefa(text) {
    const aviso = document.createElement('div');
    aviso.className = 'alerta';
    aviso.textContent = text;
    document.body.appendChild(aviso);
    setTimeout(() => {
        aviso.classList.add('fadeOut');
    }, 2000);
    setTimeout(() => {
        aviso.remove();
    }, 3000);
}
export function avisoTarefaErro(text) {
    const aviso = document.createElement('div');
    aviso.className = 'alerta-erro';
    aviso.textContent = text;
    document.body.appendChild(aviso);
    setTimeout(() => {
        aviso.classList.add('fadeOut');
    }, 2000);
    setTimeout(() => {
        aviso.remove();
    }, 3000);
}
export function mostrarEditarTarefa(btEditar, divEditarTarefa, editarNome, editarDescricao, editarData, nomeTarefaSelecionada, descricaoTarefaSelecionada, dataTarefaSelecionada) {
    if (btEditar.classList.contains('menu__botao-escolha-padrao')) {
        divEditarTarefa.classList.toggle('conteudo__show');
        editarNome.value = nomeTarefaSelecionada;
        editarDescricao.value = descricaoTarefaSelecionada;
        editarData.value = dataTarefaSelecionada;
    }
}
export function limpaCamposEditarTarefa(editarNome, editarDescricao, editarData, btExcluir, btEditar) {
    editarNome.value = '';
    editarDescricao.value = '';
    editarData.value = '';
    btExcluir.classList.remove('menu__botao-padrao-excluir');
    btEditar.classList.remove('menu__botao-escolha-padrao');
    btExcluir.classList.add('menu__botao-padrao-excluir-disable');
    btEditar.classList.add('menu__botao-escolha-padrao-disable');
}
export function alteraClasseRemoverTarefa(btEditar, btExcluir, divEditarTarefa) {
    divEditarTarefa.classList.remove('conteudo__show');
    divEditarTarefa.classList.add('.conteudo__escondido');
    btExcluir.classList.remove('menu__botao-padrao-excluir');
    btEditar.classList.remove('menu__botao-escolha-padrao');
    btExcluir.classList.add('menu__botao-padrao-excluir-disable');
    btEditar.classList.add('menu__botao-escolha-padrao-disable');
}
