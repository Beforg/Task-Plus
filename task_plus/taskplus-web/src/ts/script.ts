/**
 * @author Beforg
 * Task+
 */

import {avisoTarefa,mostrarEditarTarefa} from './utils.js';
import { atualizaTarefas, criarTarefa, listarConcluidas, excluirTarefa, concluirTarefa,editarTarefa} from './tarefaService.js';

const nomeTarefa = document.getElementById('tf-nome') as HTMLInputElement;
const descricaoTarefa = document.getElementById('tf-descricao') as HTMLInputElement;
const dataTarefa = document.getElementById('tf-data')  as HTMLInputElement;
const btAddTarefa = document.getElementById('botao-add-tarefa') as HTMLButtonElement;
const btFiltrarTarefa = document.getElementById('botao-filtrar-tarefa') as HTMLButtonElement;
const botoesEscolhas = document.querySelectorAll('.menu__botao-escolha-padrao') as NodeListOf<HTMLButtonElement>;
const botaoPostTarefa = document.getElementById('requisicao-post') as HTMLButtonElement;
const divAddTarefa = document.getElementById('conteudo__add-tarefa') as HTMLDivElement;
const divFiltrarTarefa = document.getElementById('conteudo__filtrar-tarefa') as HTMLDivElement;
const tfNome = document.getElementById('tf-nome') as HTMLInputElement;
const tfDescricao = document.getElementById('tf-descricao') as HTMLInputElement;
const tfData = document.getElementById('tf-data') as HTMLInputElement;
const btEditar = document.getElementById('editar') as HTMLButtonElement;
const btExcluir = document.getElementById('excluir') as HTMLButtonElement;
const divEditarTarefa = document.getElementById('conteudo__editar-tarefa') as HTMLDivElement;
const btConcluidas = document.getElementById('botao-concluidas') as HTMLButtonElement;
const btPendentes = document.getElementById('botao-pendentes') as HTMLButtonElement; 
const editarNome = document.getElementById('tf-editar-nome') as HTMLInputElement;
const editarDescricao = document.getElementById('tf-editar-desc') as HTMLInputElement;
const editarData = document.getElementById('tf-editar-data') as HTMLInputElement;
const btEditarTarefa = document.getElementById('botao-editar') as HTMLButtonElement;
const cardTarefa = document.getElementById('lista-com-tarefas') as HTMLUListElement;
const tarefaElement = document.createElement('li') as HTMLLIElement;
tarefaElement.className = 'principal-tarefas-item';

atualizaTarefas(cardTarefa,tarefaElement);
let tarefaAtual: Tarefa = null;


btPendentes.addEventListener('click', () => atualizaTarefas(cardTarefa,tarefaElement));
btEditar.addEventListener('click', () => mostrarEditarTarefa(btEditar, divEditarTarefa,
     editarNome, editarDescricao, editarData,tarefaAtual));

btEditarTarefa.addEventListener('click', async () => editarTarefa(tarefaAtual,editarNome,editarDescricao,
    editarData,btExcluir,btEditar,cardTarefa,tarefaElement));

btExcluir.addEventListener('click',async () => {
    if(btExcluir.classList.contains('menu__botao-padrao-excluir')) {
        let resposta = confirm('Deseja realmente excluir a tarefa?');
        if (resposta) {
            excluirTarefa(tarefaAtual, cardTarefa, tarefaElement, btEditar, btExcluir, divEditarTarefa);
        }
    }
});

btAddTarefa.addEventListener('click', () => {divAddTarefa.classList.toggle('conteudo__show')});
btFiltrarTarefa.addEventListener('click', () => { divFiltrarTarefa.classList.toggle('conteudo__show');});
btConcluidas.addEventListener('click', () => listarConcluidas(cardTarefa,tarefaElement));
botaoPostTarefa.addEventListener('click', () => criarTarefa(tfNome, tfDescricao, tfData, cardTarefa, tarefaElement));

export function selecionaTarefa(event: Event, tarefa: Tarefa) : void {
        const audio = new Audio("./audio/conc.mp3") as HTMLAudioElement;
        const cb = this.querySelector(".tarefa__checkbox") as HTMLInputElement;
        tarefaAtual = tarefa;
        
        // VERIFICAÇÃO PARA QUANDO CLICAR VER SE O ALVO É O CHECKBOX
        if (event.target === cb) {
            concluirTarefa(tarefaAtual);
            if (cb.checked) {
                avisoTarefa(`Tarefa ${tarefaAtual.getNome} concluída!`);
                audio.play();
            }
        } else {
            const todasTarefas = document.querySelectorAll('.tarefa__descricao-oculto') as NodeListOf<HTMLSpanElement>;
            todasTarefas.forEach(tarefa => {
                tarefa.classList.remove('tarefa__descricao');
            });
            this.querySelector(".tarefa__descricao-oculto").classList.toggle('tarefa__descricao');
            btExcluir.classList.add('menu__botao-padrao-excluir');
            btEditar.classList.add('menu__botao-escolha-padrao');
            divEditarTarefa.classList.remove('conteudo__show');
            divEditarTarefa.classList.add('.conteudo__escondido');
        }
    
}


