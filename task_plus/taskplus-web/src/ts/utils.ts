export function avisoTarefa(text: string) : void {
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

export function avisoTarefaErro(text: string) : void {
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

export function mostrarEditarTarefa(btEditar: HTMLButtonElement, divEditarTarefa: HTMLDivElement, 
    editarNome: HTMLInputElement, editarDescricao: HTMLInputElement, editarData: HTMLInputElement,
    nomeTarefaSelecionada: string, descricaoTarefaSelecionada: string, dataTarefaSelecionada: string) : void {
    if(btEditar.classList.contains('menu__botao-escolha-padrao')) {
        divEditarTarefa.classList.toggle('conteudo__show');
        editarNome.value = nomeTarefaSelecionada;
        editarDescricao.value = descricaoTarefaSelecionada;
        editarData.value = dataTarefaSelecionada;
    }
}

export function limpaCamposEditarTarefa(editarNome: HTMLInputElement, editarDescricao: HTMLInputElement,
     editarData: HTMLInputElement, btExcluir: HTMLButtonElement, btEditar: HTMLButtonElement) : void {
    editarNome.value = '';
    editarDescricao.value = '';
    editarData.value = '';
    btExcluir.classList.remove('menu__botao-padrao-excluir');
    btEditar.classList.remove('menu__botao-escolha-padrao');
    btExcluir.classList.add('menu__botao-padrao-excluir-disable');
    btEditar.classList.add('menu__botao-escolha-padrao-disable');
}