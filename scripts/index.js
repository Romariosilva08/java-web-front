import getDados from "./getDados.js";

const elementos = {
    top5: document.querySelector('[data-name="top5"]'),
    lancamentos: document.querySelector('[data-name="lancamentos"]'),
    series: document.querySelector('[data-name="series"]'),
    todasSeries: document.querySelector('[data-name="todasSeries"]')
};

// Função para criar a lista de filmes

// Função para criar a lista de filmes
function criarListaFilmes(elemento, dados) {
    // Verifique se há um elemento <ul> dentro da seção
    const ulExistente = elemento.querySelector('ul');

    // Se um elemento <ul> já existe dentro da seção, remova-o
    if (ulExistente) {
        elemento.removeChild(ulExistente);
    }

    const ul = document.createElement('ul');
    ul.className = 'lista';
    const listaHTML = dados.map((filme) => `
        <li>
            <a href="/detalhes.html?id=${filme.id}">
                <img src="${filme.poster}" alt="${filme.titulo}">
            </a>
        </li>
    `).join('');

    ul.innerHTML = listaHTML;
    elemento.appendChild(ul);
}

// Função genérica para tratamento de erros
function lidarComErro(mensagemErro) {
    console.error(mensagemErro);
}

const categoriaSelect = document.querySelector('[data-categorias]');
const sectionsParaOcultar = document.querySelectorAll('.section'); 

categoriaSelect.addEventListener('change', function () {
    const categoria = document.querySelector('[data-name="categoria"]');
    const categoriaSelecionada = categoriaSelect.value;

    if (categoriaSelecionada === 'todos') {

        for (const section of sectionsParaOcultar) {
            section.classList.remove('hidden')
        }
        categoria.classList.add('hidden');

    } else {

        for (const section of sectionsParaOcultar) {
            section.classList.add('hidden')
        }

        categoria.classList.remove('hidden')
        // Faça uma solicitação para o endpoint com a categoria selecionada
        getDados(`/api/series/categoria/${categoriaSelecionada}`)
            .then(data => {
                criarListaFilmes(categoria, data);
            })
            .catch(error => {
                lidarComErro("Ocorreu um erro ao carregar os dados da categoria.");
            });
    }
});

geraSeries()
function geraSeries() {
    const urls = [
        '/api/series/top5', 
        '/api/series/lancamentos', 
        '/api/series'
    ];

    // Using Promise.all to fetch data from multiple URLs
    Promise.all(urls.map(url => getDados(url).catch(e => null))) // Catch individual errors for each URL
        .then(data => {
            // Check if data is valid before processing
            if (data[0]) {
                criarListaFilmes(elementos.top5, data[0]);
            } else {
                console.error('Erro ao carregar top5');
            }

            if (data[1]) {
                criarListaFilmes(elementos.lancamentos, data[1]);
            } else {
                console.error('Erro ao carregar lançamentos');
            }

            if (data[2]) {
                criarListaFilmes(elementos.series, data[2].slice(0, 5)); 
                criarListaFilmes(elementos.todasSeries, data[2]);
            } else {
                console.error('Erro ao carregar todas as séries');
            }
        })
        .catch(error => {
            console.error('Erro geral ao carregar dados:', error);
            lidarComErro('Ocorreu um erro ao carregar os dados.');
        });
}


document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggle-dark-mode');
    const body = document.body;

    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                toggleButton.textContent = 'light_mode';
            } else {
                toggleButton.textContent = 'dark_mode';
            }
        });
    } else {
        console.error('Botão "toggle-dark-mode" não encontrado no DOM.');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const botToggle = document.getElementById('bot-toggle');
    const chatBox = document.getElementById('chat-box');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');

    // Cache para armazenar respostas
    const responseCache = new Map();

    // Abrir/fechar o chat
    botToggle.addEventListener('click', () => {
        chatBox.style.display = chatBox.style.display === 'block' ? 'none' : 'block';
    });

    // Enviar mensagem
    chatSend.addEventListener('click', () => {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            chatInput.value = '';
            respondToUser(userMessage);
        }
    });

    // Adicionar mensagem ao chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Responder ao usuário
    async function respondToUser(userMessage) {
        try {
            const botResponse = await getBotResponse(userMessage);
            addMessage(botResponse, 'bot');
        } catch (error) {
            console.error('Erro ao obter resposta do bot:', error);
            addMessage('Desculpe, ocorreu um erro ao processar sua mensagem.', 'bot');
        }
    }

    // Chamar o backend para obter a resposta do chatbot
    async function getBotResponse(userMessage) {
        const apiUrl = 'http://localhost:3000/chatbot';
    
        if (responseCache.has(userMessage)) {
            return responseCache.get(userMessage);
        }
    
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Detalhes do erro:', errorData);
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log('Resposta do backend:', data);
    
            if (!data || !data.response) {
                throw new Error('Resposta da API inválida');
            }
    
            responseCache.set(userMessage, data.response);
            return data.response;
        } catch (error) {
            console.error('Erro ao obter resposta do bot:', error);
            throw error;
        }
    }
});