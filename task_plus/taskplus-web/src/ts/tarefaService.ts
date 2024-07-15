import { adicionarTarefaApi, carregarTarefasApi, carregarTarefasConcluidasApi, concluirTarefaApi, excluirTarefaApi, editarTarefaApi } from "./apiService.js";
import { avisoTarefa, avisoTarefaErro, limparListaDasTarefas, limpaCamposAddTarefa, formataData, montaTarefa, alteraClasseRemoverTarefa, limpaCamposEditarTarefa } from "./utils.js";
import { validaConcluido, validaCamposTarefa } from "./validation.js";
import { selecionaTarefa } from "./script.js";

export async function criarTarefa(tfNome: HTMLInputElement, tfDescricao: HTMLInputElement, 
    tfData: HTMLInputElement, listaTarefas: HTMLUListElement, cardTarefa: HTMLLIElement) {
    if (tfNome.value === '' || tfDescricao.value === '' || tfData.value === '') { 
        avisoTarefaErro('Preencha todos os campos!');
        return;
    }
    const audio = new Audio("./audio/add.mp3") as HTMLAudioElement;

    const newTarefa:Tarefa = new Tarefa(null,tfNome.value,tfDescricao.value,tfData.value,false);
    await adicionarTarefaApi(newTarefa);
    avisoTarefa('Tarefa adicionada com sucesso!');
    limpaCamposAddTarefa(tfNome, tfDescricao, tfData);
    limparListaDasTarefas(listaTarefas);
    atualizaTarefas(listaTarefas, cardTarefa);
    audio.play();
}

export function atualizaTarefas(listaTarefas: HTMLUListElement, cardTarefa: HTMLLIElement) {
    limparListaDasTarefas(listaTarefas);
    carregarTarefasApi().then(tarefas => {
        tarefas.forEach(tarefa => {
            const tarefaRecebida : Tarefa = popularListaDeTarefas(tarefa.getNome,tarefa.getDataHora,tarefa.getDescricao,tarefa.getConcluido,tarefa.getId,cardTarefa,listaTarefas);
            cardTarefa.addEventListener('click', (event) => selecionaTarefa(event, tarefaRecebida));
        });
    });
}

export function listarConcluidas(listaTarefas: HTMLUListElement, cardTarefa: HTMLLIElement) {
    limparListaDasTarefas(listaTarefas);
    carregarTarefasConcluidasApi().then(tarefas => {
        tarefas.forEach(tarefa => {
            popularListaDeTarefas(tarefa.getNome,tarefa.getDataHora,tarefa.getDescricao,tarefa.getConcluido,tarefa.getId,cardTarefa,listaTarefas);
         });
    });
}  

function popularListaDeTarefas(nome: string, data: string, descricao:string, concluido:boolean,
    id:number, cardTarefa: HTMLLIElement, listaTarefas: HTMLUListElement) : Tarefa {
    const tarefa: Tarefa = new Tarefa(id,nome,descricao,data,concluido);
    const dataFormatada: Date = formataData(tarefa.dataHora);
    montaTarefa(tarefa, cardTarefa, dataFormatada);
    
    if (validaConcluido(tarefa)) {
        const cb = cardTarefa.querySelector(".tarefa__checkbox") as HTMLInputElement;
        cb.checked = true;
    }

    listaTarefas.appendChild(cardTarefa);
    return tarefa;
}

export async function excluirTarefa(tarefaAtual: Tarefa, listaTarefas: HTMLUListElement, 
    cardTarefa: HTMLLIElement, btEditar: HTMLButtonElement, btExcluir: HTMLButtonElement, 
    divEditarTarefa: HTMLDivElement) {

    await excluirTarefaApi(tarefaAtual.getId);
            atualizaTarefas(listaTarefas,cardTarefa);
            alert('excluído!')
            alteraClasseRemoverTarefa(btEditar, btExcluir, divEditarTarefa);
}

export async function concluirTarefa(tarefaAtual: Tarefa) {
    concluirTarefaApi(tarefaAtual.getId, tarefaAtual.concluirTarefa());
}

export async function editarTarefa(tarefaAtual: Tarefa, editarNome: HTMLInputElement,
     editarDescricao: HTMLInputElement, editarData: HTMLInputElement, btExcluir: HTMLButtonElement,
      btEditar: HTMLButtonElement, listaTarefas: HTMLUListElement, cardTarefa: HTMLLIElement) {
    if (validaCamposTarefa(editarNome.value, editarDescricao.value, editarData.value) === false){
        avisoTarefaErro('Preencha todos os campos!');
        return;
    }
    await editarTarefaApi(tarefaAtual.getId, editarNome.value, editarDescricao.value, editarData.value);
    avisoTarefa('Tarefa editada com sucesso!');
    limpaCamposEditarTarefa(editarNome, editarDescricao, editarData, btExcluir, btEditar);
    limparListaDasTarefas(listaTarefas);
    atualizaTarefas(listaTarefas,cardTarefa);
}