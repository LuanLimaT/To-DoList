document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.button-add-task');
    const input = document.querySelector('.input-task');
    const listaCompleta = document.querySelector('.list-tasks');
    let minhaListaDeItens = [];
  
    function adicionarNovaTarefa() {
        const tarefa = input.value.trim();
        const horaDeCriacao = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  
        if (tarefa) {
            minhaListaDeItens.push({ tarefa, concluida: false, horaDeCriacao });
            input.value = '';
            mostrarTarefas();
        }
    }
  
    function mostrarTarefas() {
        const tarefaListItems = minhaListaDeItens.map((item, posicao) => {
            return `
                <li class="task ${item.concluida ? 'done' : ''}">
                    <div class="task-content">
                        <img src="./img/checked.png" alt="check-na-tarefa" data-posicao="${posicao}" class="check-task">
                        <p class="task-text" data-posicao="${posicao}">${item.tarefa}</p>
                        <span class="task-time">${item.horaDeCriacao}</span>
                    </div>
                    <img src="./img/gear.png.jpg" alt="editar-tarefa" data-posicao="${posicao}" class="edit-task">
                    <img src="./img/trash.png" alt="tarefa-para-o-lixo" data-posicao="${posicao}" class="delete-task">
                </li>
            `;
        }).join('');
  
        listaCompleta.innerHTML = tarefaListItems;
        localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
    }
  
    function concluirTarefa(posicao) {
        minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
        mostrarTarefas();
    }
  
    function deletarItem(posicao) {
        minhaListaDeItens.splice(posicao, 1);
        mostrarTarefas();
    }
  
    function editarTarefa(posicao) {
        const novaTarefa = prompt('Edite a tarefa:', minhaListaDeItens[posicao].tarefa);
        if (novaTarefa !== null && novaTarefa.trim() !== '') {
            minhaListaDeItens[posicao].tarefa = novaTarefa.trim();
            mostrarTarefas();
        }
    }
  
    function recarregarTarefas() {
        const tarefasDoLocalStorage = localStorage.getItem('lista');
        if (tarefasDoLocalStorage) {
            minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
        }
        mostrarTarefas();
    }
  
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            adicionarNovaTarefa();
        }
    }
  
    function handleListClick(event) {
        const target = event.target;
        const posicao = target.getAttribute('data-posicao');
  
        if (target.classList.contains('check-task')) {
            concluirTarefa(posicao);
        } else if (target.classList.contains('delete-task')) {
            deletarItem(posicao);
        } else if (target.classList.contains('edit-task')) {
            editarTarefa(posicao);
        }
    }
  
    recarregarTarefas();
    button.addEventListener('click', adicionarNovaTarefa);
    input.addEventListener('keyup', handleKeyPress);
    listaCompleta.addEventListener('click', handleListClick);
  });
  