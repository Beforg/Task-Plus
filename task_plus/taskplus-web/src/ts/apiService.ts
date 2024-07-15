const url = 'http://localhost:8080/task'

export async function adicionarTarefaApi(tarefa: Tarefa) {
    const conexao = await fetch(url,  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: tarefa.getNome,
            descricao: tarefa.getDescricao,
            data: tarefa.getDataHora,
            concluido: false
        })
    })

    if (!conexao.ok) {
        throw new Error(`HTTP error! status: ${conexao.status}`);
    } else if (conexao.headers.get("content-type") && conexao.headers.get("content-type")!.includes("application/json")) {
        const conexaoConvertida = await conexao.json();
        return conexaoConvertida;
    } else {
        return;
    }
    
}

export async function carregarTarefasApi() {
    const conexao = await fetch(url);
    if (!conexao.ok) {
        throw new Error(`HTTP error! status: ${conexao.status}`);
    } else if (conexao.headers.get("content-type") && conexao.headers.get("content-type")!.includes("application/json")) {
        const conexaoConvertida = await conexao.json();
        return conexaoConvertida;
    } else {
        return;
    }
}

export async function concluirTarefaApi(id, booleano) {
    const conexao = await fetch(`${url}/concluir`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            concluido: booleano,
            id: id
        })
    }) as Response;

    if (!conexao.ok) {
        throw new Error(`HTTP error! status: ${conexao.status}`);
    } else if (conexao.headers.get("content-type") && conexao.headers.get("content-type")!.includes("application/json")) {
        const conexaoConvertida = await conexao.json();
        return conexaoConvertida;
    } else {
        return;
    }
}

export async function carregarTarefasConcluidasApi(){
    const conexao = await fetch(`${url}/concluidas`);
    if (!conexao.ok) {
        throw new Error(`HTTP error! status: ${conexao.status}`);
    } else if (conexao.headers.get("content-type") && conexao.headers.get("content-type")!.includes("application/json")) {
        const conexaoConvertida = await conexao.json();
        return conexaoConvertida;
    } else {
        return;
    }
}

export async function excluirTarefaApi(id) {
    if (!id) throw new Error('ID não informado!');
    const conexao: Response = await fetch(`${url}/${id}`, {
        method: 'DELETE'
    });
    if (!conexao.ok) {
        throw new Error(`HTTP error! status: ${conexao.status}`);
    } else if (conexao.headers.get("content-type") && conexao.headers.get("content-type")!.includes("application/json")) {
        const conexaoConvertida = await conexao.json();
        return conexaoConvertida;
    } else {
        return;
    }
}

export async function editarTarefaApi(id, nome, descricao, data) {
    const conexao: Response = await fetch(`${url}/atualizar`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            descricao: descricao,
            data: data
        })
    }) as Response;
    if(!conexao.ok) {
        throw new Error(`HTTP error! status: ${conexao.status}`);
    } else if (conexao.headers.get("content-type") && conexao.headers.get("content-type")!.includes("application/json")) {
        const conexaoConvertida = await conexao.json();
        return conexaoConvertida;
    } else {
        return;
    }
}