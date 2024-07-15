import { adicionarTarefaApi, carregarTarefasApi, carregarTarefasConcluidasApi, concluirTarefaApi } from "./apiService.js";
import { avisoTarefa, avisoTarefaErro, limparListaDasTarefas, limpaCamposAddTarefa, formataData, montaTarefa } from "./utils.js";
import { validaConcluido } from "./validation.js";
import { selecionaTarefa } from "./script.js";

export async function criarTarefa(tfNome: HTMLInputElement, tfDescricao: HTMLInputElement, 
    tfData: HTMLInputElement, listaTarefas: HTMLUListElement, tarefaElement: HTMLLIElement) {
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
    atualizaTarefas(listaTarefas, tarefaElement);
    audio.play();
    // const nome = tfNome.value;
    // const descricao = tfDescricao.value;
    // const data = tfData.value;
    // tfData.value = '';
    // tfDescricao.value = '';
    // tfNome.value = '';
}

export function atualizaTarefas(listaTarefas: HTMLUListElement, tarefaElement: HTMLLIElement) {
    limparListaDasTarefas(listaTarefas);
    carregarTarefasApi().then(tarefas => {
        tarefas.forEach(tarefa => {
            const tarefaRecebida : Tarefa = popularListaDeTarefas(tarefa.getNome,tarefa.getDataHora,tarefa.getDescricao,tarefa.getConcluido,tarefa.getId,tarefaElement,listaTarefas);
            tarefaElement.addEventListener('click', (event) => selecionaTarefa(event, tarefaRecebida));
        });
    });
}

export function listarConcluidas(listaTarefas: HTMLUListElement, tarefaElement: HTMLLIElement) {
    limparListaDasTarefas(listaTarefas);
    carregarTarefasConcluidasApi().then(tarefas => {
        tarefas.forEach(tarefa => {
            popularListaDeTarefas(tarefa.getNome,tarefa.getDataHora,tarefa.getDescricao,tarefa.getConcluido,tarefa.getId,tarefaElement,listaTarefas);
         });
    });
}  

function popularListaDeTarefas(nome: string, data: string, descricao:string, concluido:boolean,
    id:number, tarefaElement: HTMLLIElement, listaTarefas: HTMLUListElement) : Tarefa {
    const tarefa: Tarefa = new Tarefa(id,nome,descricao,data,concluido);
    const dataFormatada: Date = formataData(tarefa.dataHora);
    montaTarefa(tarefa, tarefaElement, dataFormatada);
    
    if (validaConcluido(tarefa)) {
        const cb = tarefaElement.querySelector(".tarefa__checkbox") as HTMLInputElement;
        cb.checked = true;
    }

    listaTarefas.appendChild(tarefaElement);
    return tarefa;
}

