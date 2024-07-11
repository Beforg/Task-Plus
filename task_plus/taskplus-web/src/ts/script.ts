/**
 * @author Beforg
 * Task+
 */

/*Conexao com a API*/

import {adicionarTarefa, carregarTarefas, concluirTarefa, carregarTarefasConcluidas, excluirTarefa, editarTarefa} from './apiService.js';
import {avisoTarefa, avisoTarefaErro, mostrarEditarTarefa, limpaCamposEditarTarefa} from './utils.js';
import {validaCamposTarefa} from './validation.js';

atualizaTarefas();
// const url = 'http://localhost:8080/task'

// async function adicionarTarefa(nome, descricao, data) {
//     console.log(data);
//     const conexao = await fetch(url,  {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             nome: nome,
//             descricao: descricao,
//             data: data,
//             concluido: false
//         })
//     })

//     if (!conexao.ok) {
//         throw new Error(`HTTP error! status: ${conexao.status}`);
//     } else if (conexao.headers.get("content-type") && conexao.headers.get("content-type").includes("application/json")) {
//         const conexaoConvertida = await conexao.json();
//         return conexaoConvertida;
//     } else {
//         return;
//     }
    
// }

// async function carregarTarefas() {
//     const conexao = await fetch(url);
//     if (!conexao.ok) {
//         throw new Error(`HTTP error! status: ${conexao.status}`);
//     } else if (conexao.headers.get("content-type") && conexao.headers.get("content-type").includes("application/json")) {
//         const conexaoConvertida = await conexao.json();
//         return conexaoConvertida;
//     } else {
//         return;
//     }
// }

// async function concluirTarefa(id, booleano) {
//     const conexao = await fetch(`${url}/concluir`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             concluido: booleano,
//             id: id
//         })
//     });

//     if (!conexao.ok) {
//         throw new Error(`HTTP error! status: ${conexao.status}`);
//     } else if (conexao.headers.get("content-type") && conexao.headers.get("content-type").includes("application/json")) {
//         const conexaoConvertida = await conexao.json();
//         return conexaoConvertida;
//     } else {
//         return;
//     }
// }

// async function carregarTarefasConcluidas(){
//     const conexao = await fetch(`${url}/concluidas`);
//     if (!conexao.ok) {
//         throw new Error(`HTTP error! status: ${conexao.status}`);
//     } else if (conexao.headers.get("content-type") && conexao.headers.get("content-type").includes("application/json")) {
//         const conexaoConvertida = await conexao.json();
//         return conexaoConvertida;
//     } else {
//         return;
//     }
// }

// async function excluirTarefa(id) {
//     if (!id) throw new Error('ID não informado!');
//     const conexao = await fetch(`${url}/${id}`, {
//         method: 'DELETE'
//     });
//     if (!conexao.ok) {
//         throw new Error(`HTTP error! status: ${conexao.status}`);
//     } else if (conexao.headers.get("content-type") && conexao.headers.get("content-type").includes("application/json")) {
//         const conexaoConvertida = await conexao.json();
//         return conexaoConvertida;
//     } else {
//         return;
//     }
// }

// async function editarTarefa(id, nome, descricao, data) {
//     const conexao = await fetch(`${url}/atualizar`, {
//         method: 'PUT',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify({
//             id: id,
//             nome: nome,
//             descricao: descricao,
//             data: data
//         })
//     })
//     if(!conexao) {
//         throw new Error(`HTTP error! status: ${conexao.status}`);
//     } else if (conexao.headers.get("content-type") && conexao.headers.get("content-type").includes("application/json")) {
//         const conexaoConvertida = await conexao.json();
//         return conexaoConvertida;
//     } else {
//         return;
//     }
// }
/*Elementos*/

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

let idTarefaSelecionada:number = null;
let nomeTarefaSelecionada:string = null;
let descricaoTarefaSelecionada:string = null;
let dataTarefaSelecionada:string = null;


btPendentes.addEventListener('click', atualizaTarefas);

// btEditar.addEventListener('click', () => {
//     if(btEditar.classList.contains('menu__botao-escolha-padrao')) {
//         divEditarTarefa.classList.toggle('conteudo__show');
//         editarNome.value = nomeTarefaSelecionada;
//         editarDescricao.value = descricaoTarefaSelecionada;
//         editarData.value = dataTarefaSelecionada;
//     }
// });
btEditar.addEventListener('click', () => mostrarEditarTarefa(btEditar, divEditarTarefa,
     editarNome, editarDescricao, editarData, nomeTarefaSelecionada, 
     descricaoTarefaSelecionada, dataTarefaSelecionada));

btEditarTarefa.addEventListener('click', async () => {
    if (validaCamposTarefa(editarNome.value, editarDescricao.value, editarData.value) === false){
        avisoTarefaErro('Preencha todos os campos!');
        return;
    }
    await editarTarefa(idTarefaSelecionada, editarNome.value, editarDescricao.value, editarData.value);
    avisoTarefa('Tarefa editada com sucesso!');
    
    limparListaDasTarefas();
    atualizaTarefas();
    // editarNome.value = '';
    // editarDescricao.value = '';
    // editarData.value = '';
    // btExcluir.classList.remove('menu__botao-padrao-excluir');
    // btEditar.classList.remove('menu__botao-escolha-padrao');
    // btExcluir.classList.add('menu__botao-padrao-excluir-disable');
    // btEditar.classList.add('menu__botao-escolha-padrao-disable');
});

btExcluir.addEventListener('click',async () => {
    if(btExcluir.classList.contains('menu__botao-padrao-excluir')) {
        let resposta = confirm('Deseja realmente excluir a tarefa?');
        if (resposta) {
            alert('excluído!')
            await excluirTarefa(idTarefaSelecionada);
            atualizaTarefas();
            divEditarTarefa.classList.remove('conteudo__show');
            divEditarTarefa.classList.add('.conteudo__escondido');
            btExcluir.classList.remove('menu__botao-padrao-excluir');
            btEditar.classList.remove('menu__botao-escolha-padrao');
            btExcluir.classList.add('menu__botao-padrao-excluir-disable');
            btEditar.classList.add('menu__botao-escolha-padrao-disable');
        }
    }
});

btAddTarefa.addEventListener('click', () => {
    divAddTarefa.classList.toggle('conteudo__show');
});

btFiltrarTarefa.addEventListener('click', () => {
    divFiltrarTarefa.classList.toggle('conteudo__show');
});



/*Carregar tarefa da API e colocar na aplicação:*/

function carregarTarefasParaLista(nome,data,descricao,concluido,id) {
    const listaTarefas = document.getElementById('lista-com-tarefas') as HTMLUListElement;
    const tarefa = document.createElement('li') as HTMLLIElement;
    tarefa.className = 'principal-tarefas-item';
    
    const dataRecebida = new Date(data);
    const formatacaoTipo = { year: 'numeric', month: '2-digit', day: '2-digit' } as Intl.DateTimeFormatOptions;
    const dataFormatada = dataRecebida.toLocaleDateString('pt-BR', formatacaoTipo);
    
    tarefa.innerHTML = `
        <input type="checkbox" class="tarefa__checkbox">
        <span class="tarefa__nome">${nome}</span>
        <span class="tarefa__descricao-oculto">${descricao}</span>
        <span class="tarefa__data">${dataFormatada}</span>
        <p style="display: none;">${id}</p>
    `;

    if (concluido) {
        const cb = tarefa.querySelector(".tarefa__checkbox") as HTMLInputElement;
        cb.checked = true;
    }
    
    tarefa.addEventListener('click', function(event) {
        const audio = new Audio("./audio/conc.mp3");
        idTarefaSelecionada = id;
        nomeTarefaSelecionada = nome;
        descricaoTarefaSelecionada = descricao;
        dataTarefaSelecionada = data;
        const cb = this.querySelector(".tarefa__checkbox") as HTMLInputElement;
        
        if (event.target === cb) {
            const id = this.querySelector("p").textContent;
            concluirTarefa(id, cb.checked);
            if (cb.checked) {
                avisoTarefa(`Tarefa ${nome} concluída!`);
                audio.play();
                
            }
        } else {
            const todasTarefas = document.querySelectorAll('.tarefa__descricao-oculto');
            todasTarefas.forEach(tarefa => {
                tarefa.classList.remove('tarefa__descricao');
            });
            this.querySelector(".tarefa__descricao-oculto").classList.toggle('tarefa__descricao');
            btExcluir.classList.add('menu__botao-padrao-excluir');
            btEditar.classList.add('menu__botao-escolha-padrao');
            divEditarTarefa.classList.remove('conteudo__show');
            divEditarTarefa.classList.add('.conteudo__escondido');
        }
    });

    listaTarefas.appendChild(tarefa);
}

function limparListaDasTarefas() {
    const listaTarefas = document.getElementById('lista-com-tarefas');
    while (listaTarefas.firstChild) {
        listaTarefas.removeChild(listaTarefas.firstChild);
    }
}

function atualizaTarefas() {
limparListaDasTarefas();
carregarTarefas().then(tarefas => {
    tarefas.forEach(tarefa => {
        carregarTarefasParaLista(tarefa.nome,tarefa.data,tarefa.descricao,tarefa.concluido,tarefa.id);
    });
});
}
function listarConcluidas() {
    limparListaDasTarefas();
    carregarTarefasConcluidas().then(tarefas => {
        tarefas.forEach(tarefa => {
            carregarTarefasParaLista(tarefa.nome,tarefa.data,tarefa.descricao,tarefa.concluido,tarefa.id);
        });
    });
}

btConcluidas.addEventListener('click', listarConcluidas);

async function criarTarefa() {
    if (tfNome.value === '' || tfDescricao.value === '' || tfData.value === '') { 
        avisoTarefaErro('Preencha todos os campos!');
        return;
    }
    const audio = new Audio("./audio/add.mp3");
    const nome = tfNome.value;
    const descricao = tfDescricao.value;
    const data = tfData.value;
    await adicionarTarefa(nome, descricao,data);
    avisoTarefa('Tarefa adicionada com sucesso!');
    tfData.value = '';
    tfDescricao.value = '';
    tfNome.value = '';
    limparListaDasTarefas();
    atualizaTarefas();
    audio.play();
}

// function avisoTarefa(text) {
//     const aviso = document.createElement('div');
//     aviso.className = 'alerta';
//     aviso.textContent = text;
//     document.body.appendChild(aviso);
//     setTimeout(() => {
//         aviso.classList.add('fadeOut');
//     }, 2000);
//     setTimeout(() => {
//         aviso.remove();
//     }, 3000);

// }

// function avisoTarefaErro(text) {
//     const aviso = document.createElement('div');
//     aviso.className = 'alerta-erro';
//     aviso.textContent = text;
//     document.body.appendChild(aviso);
//     setTimeout(() => {
//         aviso.classList.add('fadeOut');
//     }, 2000);
//     setTimeout(() => {
//         aviso.remove();
//     }, 3000);

// }

botaoPostTarefa.addEventListener('click', criarTarefa);
