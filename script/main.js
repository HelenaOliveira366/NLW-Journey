

//Usando a biblioteca DayJS
const formatador = (data) => {
    return{
        dia: {
            numerico: dayjs(data).format('DD'),
            semana: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd'),
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')
    }
};

//Object
/*
const atividade = {
    nome: "Estudar",
    data: new Date("2024-07-09 11:00"),
    finalizada: false
}
*/

//Array

let atividades = [
    {
        nome: "Estudar",
        data: new Date("2024-07-09 11:00"),
        finalizada: false
    },
    {
        nome: "Academia em grupo",
        data: new Date("2024-07-09 18:00"),
        finalizada: true
    },
    {
        nome: "Gaming session",
        data: new Date("2024-07-19 18:00"),
        finalizada: false
    }
];

/*
let atividades = [];
*/

//Criando estrutura atividades - Arrow function - se futuramente der erro, trocar pelo objeto (e descomentá-lo) 'atividade' 
const criarItemTarefa = (atividades) => {
    //Se a tarefa for marcada como finalizada, é adicionado o atributo 'checked', ao final a tag é fechada
    let input = '<input type="checkbox" id="" onchange="concluirTarefa(event)" value="${atividades.data}" ';
    //- se futuramente der erro, trocar pelo objeto (e descomentá-lo) 'atividade' 
    if(atividades.finalizada){
        input = input + 'checked';
    }
    input = input + '>'

    //DayJS
    const formatar = formatador(atividades.data);

    //Estrutura HTML com  valores
    // - se futuramente der erro, trocar pelo objeto (e descomentá-lo) 'atividade' 
    return `
        <div class="card-bg">
            ${input}
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle active" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle inactive" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                </svg>
                <span>${atividades.nome}</span>
            </div>
            <time class="short">
                ${formatar.dia.semana.curto},
                ${formatar.dia.numerico}
                <br>
                ${formatar.hora}
            </time>
            <time class="full">
                ${formatar.dia.semana.longo},
                dia ${formatar.dia.numerico}
                de ${formatar.mes}
                às ${formatar.hora}h
            </time>
        </div>
    `;
}

const atualizarListaAtividades = () => {
    const section = document.querySelector('section');

    //Apagar para posteriormente não haver duplicação das tarefas em salvarAtividade()
    section.innerHTML = '';

    //Verificar se a lista está vazia e retorna ao programa
    if(atividades.length == 0){
        section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`;
        return
    }

    //Imprimindo atividades na tela se houver itens no array
    // para atividade (item da vez) de atividades (array)
    for(let atividade of atividades){
        section.innerHTML += criarItemTarefa(atividade);
    }
} 

atualizarListaAtividades()

const salvarAtividade = (event) => {
    event.preventDefault();

    //Capturar eventos do formulário
    const dadosFormulario = new FormData(event.target);
    const nome = dadosFormulario.get('atividade');
    const dia = dadosFormulario.get('dia');
    const hora = dadosFormulario.get('hora');
    const data = `${dia} ${hora}`;
    const novaAtividade = {
        nome: nome,
        data: data,
        finalizada: false
    }

    //verifica se os horarios da tarefa a ser criada é o mesmo de outra tarefa já criada
    const atividadeExiste = atividades.find((atividades) => {
        return atividades.data == novaAtividade.data;
    })
    //Se horário for igual, alertar
    if(atividadeExiste){
        return alert('Dia/Hora não disponível');
    }

    //Adicionar ativadades novas e antigadas (...) na lista
    atividades = [novaAtividade, ...atividades];
    //atualizar a lista de atividades
    atualizarListaAtividades();
}

//Formatar dia da tarefa para inserção
const criarDiasSelecao = () => {
    const dias = [
        "2024-07-10",
        "2024-07-11",
        "2024-07-12",
        "2024-07-13",
    ]

    let diasSelecao = '';

    for(let dia of dias){
        const formatar  = formatador(dia);
        const diaFormatado = `
            ${formatar.dia.numerico}
            de ${formatar.mes}
        `;

        diasSelecao += `<option value="${dia}">${diaFormatado}</option>`;
    }

    //Captura datas e insere opções na tela
    document.querySelector('select[name="dia"]').innerHTML = diasSelecao
}

criarDiasSelecao();

const criarHorasSelecao = () => {
    let horasDisponiveis = '';

    for(let i = 6; i < 23; i++){
        horasDisponiveis += `<option value="${i}:00">${i}:00</option>`;
        horasDisponiveis += `<option value="${i}:30">${i}:30</option>`;
    }

    document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis;
}

criarHorasSelecao();

const concluirTarefa = (event) => {
    const input = event.target;
    const dataDesteInput = input.value;

    const atividade = atividades.find((atividade) => {
        return atividade.data == dataDesteInput;
    });

    if(!atividade){
        return;
    }

    atividade.finalizada = !atividade.finalizada;
}