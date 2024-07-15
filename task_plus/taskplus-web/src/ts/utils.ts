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
    tarefa: Tarefa) : void {
    if(btEditar.classList.contains('menu__botao-escolha-padrao')) {
        divEditarTarefa.classList.toggle('conteudo__show');
        editarNome.value = tarefa.getNome;
        editarDescricao.value = tarefa.getDescricao;
        editarData.value = tarefa.getDataHora;
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

export function alteraClasseRemoverTarefa(btEditar: HTMLButtonElement, btExcluir: HTMLButtonElement, divEditarTarefa: HTMLDivElement) : void {
    divEditarTarefa.classList.remove('conteudo__show');
    divEditarTarefa.classList.add('.conteudo__escondido');
    btExcluir.classList.remove('menu__botao-padrao-excluir');
    btEditar.classList.remove('menu__botao-escolha-padrao');
    btExcluir.classList.add('menu__botao-padrao-excluir-disable');
    btEditar.classList.add('menu__botao-escolha-padrao-disable');
}

export function formataData(data: string ) : Date {
    const dataRecebida = new Date(data);
    const formatacaoTipo = { year: 'numeric', month: '2-digit', day: '2-digit' } as Intl.DateTimeFormatOptions;
    const dataFormatada = dataRecebida.toLocaleDateString('pt-BR', formatacaoTipo);
    return new Date(dataFormatada);
}

export function montaTarefa(tarefa, tarefaElement: HTMLLIElement, dataFormatada: Date) : void {
    tarefaElement.innerHTML = `
    <input type="checkbox" class="tarefa__checkbox">
    <span class="tarefa__nome">${tarefa.nome}</span>
    <span class="tarefa__descricao-oculto">${tarefa.descricao}</span>
    <span class="tarefa__data">${dataFormatada}</span>
`;
}

export function limparListaDasTarefas(listaTarefas: HTMLUListElement) : void {
    while (listaTarefas.firstChild) {
        listaTarefas.removeChild(listaTarefas.firstChild);
    }
}

export function limpaCamposAddTarefa(tfNome: HTMLInputElement, tfDescricao: HTMLInputElement, tfData: HTMLInputElement) : void {
    tfNome.value = '';
    tfDescricao.value = '';
    tfData.value = '';
}