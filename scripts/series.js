import getDados from "./getDados.js";

// Constantes e configurações
// Substitua no início do arquivo
const COMENTARIOS_API_URL = '/comentarios';
const AVALIACOES_API_URL = '/avaliacoes-comentarios';

const API_BASE_URL = '/series';
const TRANSLATE_API_URL = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t';
const AVATAR_API_URL = 'https://api.dicebear.com/7.x/identicon/svg';

// Elementos do DOM
const DOM_ELEMENTS = {
    serieId: new URLSearchParams(window.location.search).get('id'),
    listaTemporadas: document.getElementById('temporadas-select'),
    fichaSerie: document.getElementById('temporadas-episodios'),
    fichaDescricao: document.getElementById('ficha-descricao'),
    estrelas: document.querySelectorAll('.estrela'),
    mensagemAvaliacao: document.getElementById('mensagem-avaliacao'),
    comentariosLista: document.getElementById('comentarios-lista'),
    comentarioNome: document.getElementById('comentario-nome'),
    comentarioTexto: document.getElementById('comentario-texto'),
    enviarComentario: document.getElementById('enviar-comentario'),
    avatarFoto: document.getElementById('avatar-foto'),
    avatarOpcoes: document.querySelectorAll('input[name="avatar"]'),
    modalResposta: document.getElementById('modal-resposta'),
    fecharModal: document.querySelector('.fechar-modal')
};

// Utilitários
const Utils = {
    /**
     * Traduz texto usando a API do Google Translate
     * @param {string} texto - Texto a ser traduzido
     * @returns {Promise<string>} - Promise com o texto traduzido
     */
    traduzirTexto: async (texto) => {
        try {
            const url = `${TRANSLATE_API_URL}&q=${encodeURIComponent(texto)}`;
            const response = await fetch(url);
            const data = await response.json();
            return data[0][0][0];
        } catch (error) {
            console.error('Erro ao traduzir texto:', error);
            return texto; // Retorna o texto original em caso de erro
        }
    },

    /**
     * Gera um avatar aleatório
     * @returns {string} - URL do avatar gerado
     */
    gerarAvatarAleatorio: () => {
        const avatarId = Math.random().toString(36).substring(7);
        return `${AVATAR_API_URL}?seed=${avatarId}`;
    },

    /**
     * Mostra uma notificação Toast
     * @param {string} mensagem - Mensagem a ser exibida
     * @param {string} tipo - Tipo de notificação (sucesso, erro, aviso)
     */
    mostrarNotificacao: (mensagem, tipo = 'sucesso') => {
        const backgrounds = {
            sucesso: "linear-gradient(to right, #00b09b, #96c93d)",
            erro: "linear-gradient(to right, #ff416c, #ff4b2b)",
            aviso: "linear-gradient(to right, #f7971e, #ffd200)"
        };

        Toastify({
            text: mensagem,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: backgrounds[tipo] || backgrounds.sucesso,
        }).showToast();
    },
    
    /**
     * Lê um arquivo como URL de dados
     * @param {File} file - Arquivo a ser lido
     * @returns {Promise<string>} - Promise com a URL de dados
     */
    lerArquivoComoDataURL: (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }
};

// Serviço de Dados
const DataService = {
    /**
     * Obtém dados da API
     * @param {string} endpoint - Endpoint da API
     * @returns {Promise<object>} - Promise com os dados
     */
    getDados: async (endpoint) => {
        try {
            const response = await getDados(endpoint);
            console.log(`Data received from ${endpoint}:`, response);  // Log the received data

            return response;
        } catch (error) {
            console.error(`Erro ao obter dados de ${endpoint}:`, error);
            throw error;
        }
    },

    /**
     * Obtém informações da série
     * @returns {Promise<object>} - Promise com os dados da série
     */
    // getInfoSerie: async () => {
    //     return DataService.getDados(`${API_BASE_URL}/${DOM_ELEMENTS.serieId}`);
    // },
    getInfoSerie: async () => {
        console.log('Fetching series information...');
        const data = await DataService.getDados(`${API_BASE_URL}/${DOM_ELEMENTS.serieId}`);
        console.log('Series info:', data);  // Log series info
        return data;
    },

    /**
     * Obtém temporadas da série
     * @returns {Promise<object[]>} - Promise com as temporadas
     */
    getTemporadas: async () => {
        return DataService.getDados(`${API_BASE_URL}/${DOM_ELEMENTS.serieId}/temporadas/todas`);
    },

    /**
     * Obtém episódios de uma temporada
     * @param {string} temporada - Número da temporada
     * @returns {Promise<object[]>} - Promise com os episódios
     */
    getEpisodios: async (temporada) => {
        return DataService.getDados(`${API_BASE_URL}/${DOM_ELEMENTS.serieId}/temporadas/${temporada}`);
    }
};

// Manipulação da Interface
const UI = {
    /**
     * Carrega as temporadas no select
     */
    carregarTemporadas: async () => {
        try {
            const data = await DataService.getTemporadas();
            const temporadasUnicas = [...new Set(data.map(temporada => temporada.temporada))];
            
            DOM_ELEMENTS.listaTemporadas.innerHTML = '';
            
            // Opção padrão
            UI.criarOption('', 'Selecione a temporada');
            
            // Opções de temporadas
            temporadasUnicas.forEach(temporada => {
                UI.criarOption(temporada, temporada);
            });
            
            // Opção "Todas as temporadas"
            UI.criarOption('todas', 'Todas as temporadas');
        } catch (error) {
            console.error('Erro ao carregar temporadas:', error);
            Utils.mostrarNotificacao('Erro ao carregar temporadas', 'erro');
        }
    },

    /**
     * Cria uma opção para o select de temporadas
     * @param {string} value - Valor da opção
     * @param {string} text - Texto da opção
     */
    criarOption: (value, text) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        DOM_ELEMENTS.listaTemporadas.appendChild(option);
    },

    /**
     * Carrega os episódios de uma temporada
     */
    carregarEpisodios: async () => {
        try {
            const temporada = DOM_ELEMENTS.listaTemporadas.value;
            if (!temporada) return;

            const data = await DataService.getEpisodios(temporada);
            const temporadasUnicas = [...new Set(data.map(item => item.temporada))];
            
            DOM_ELEMENTS.fichaSerie.innerHTML = '';
            
            temporadasUnicas.forEach(temporada => {
                const episodiosTemporada = data.filter(serie => serie.temporada === temporada);
                
                const paragrafo = document.createElement('p');
                paragrafo.textContent = `Temporada ${temporada}`;
                
                const ul = document.createElement('ul');
                ul.className = 'episodios-lista';
                
                episodiosTemporada.forEach(serie => {
                    const li = document.createElement('li');
                    li.textContent = `${serie.numeroEpisodio} - ${serie.titulo}`;
                    ul.appendChild(li);
                });
                
                DOM_ELEMENTS.fichaSerie.appendChild(paragrafo);
                DOM_ELEMENTS.fichaSerie.appendChild(document.createElement('br'));
                DOM_ELEMENTS.fichaSerie.appendChild(ul);
            });
        } catch (error) {
            console.error('Erro ao carregar episódios:', error);
            Utils.mostrarNotificacao('Erro ao carregar episódios', 'erro');
        }
    },

    /**
     * Carrega as informações da série
     */
    carregarInfoSerie: async () => {
        try {
            const data = await DataService.getInfoSerie();
            const sinopseTraduzida = await Utils.traduzirTexto(data.sinopse);
            
            DOM_ELEMENTS.fichaDescricao.innerHTML = `
                <img src="${data.poster}" alt="${data.titulo}" />
                <div>
                    <h2>${data.titulo}</h2>
                    <div class="descricao-texto">
                        <p><b>Média de avaliações:</b> ${data.avaliacao}</p>
                        <p>${sinopseTraduzida}</p>
                        <p><b>Estrelando:</b> ${data.atores}</p>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Erro ao carregar informações da série:', error);
            Utils.mostrarNotificacao('Erro ao carregar informações da série', 'erro');
        }
    },

    /**
     * Configura a avaliação por estrelas
     */
    configurarAvaliacaoEstrelas: () => {
        DOM_ELEMENTS.estrelas.forEach(estrela => {
            estrela.addEventListener('click', () => {
                const valor = estrela.getAttribute('data-value');
                DOM_ELEMENTS.mensagemAvaliacao.textContent = `Você avaliou com ${valor} estrelas!`;
                
                const cores = {
                    alta: "#4CAF50",    // 4-5 estrelas
                    media: "#FF9800",   // 3 estrelas
                    baixa: "#F44336"    // 1-2 estrelas
                };
                
                DOM_ELEMENTS.mensagemAvaliacao.style.color = 
                    valor >= 4 ? cores.alta : 
                    valor == 3 ? cores.media : 
                    cores.baixa;
            });
        });
    }
};

// Gerenciamento de Comentários
const Comentarios = {
    avatarEscolhido: 'aleatorio',
    fotoUrl: '',

    /**
     * Inicializa o sistema de comentários
     */
    init: () => {
        Comentarios.configurarEventos();
        Comentarios.carregarComentarios();
    },

    /**
     * Configura os eventos dos comentários
     */
    configurarEventos: () => {
        // Escolha de avatar
        DOM_ELEMENTS.avatarOpcoes.forEach(opcao => {
            opcao.addEventListener('change', () => {
                Comentarios.avatarEscolhido = opcao.value;
                if (opcao.value === 'foto') {
                    DOM_ELEMENTS.avatarFoto.click();
                }
            });
        });

        // Upload de foto
        DOM_ELEMENTS.avatarFoto.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            if (file) {
                try {
                    Comentarios.fotoUrl = await Utils.lerArquivoComoDataURL(file);
                } catch (error) {
                    console.error('Erro ao ler arquivo:', error);
                }
            }
        });

        // Envio de comentário
        DOM_ELEMENTS.enviarComentario.addEventListener('click', Comentarios.enviarComentario);

        // Fechar modal
        DOM_ELEMENTS.fecharModal.addEventListener('click', () => {
            DOM_ELEMENTS.modalResposta.style.display = 'none';
        });

        // Fechar modal ao clicar fora
        window.addEventListener('click', (event) => {
            if (event.target === DOM_ELEMENTS.modalResposta) {
                DOM_ELEMENTS.modalResposta.style.display = 'none';
            }
        });
    },

    /**
     * Envia um novo comentário
     */
    enviarComentario: async () => {
        const nome = DOM_ELEMENTS.comentarioNome.value.trim();
        const texto = DOM_ELEMENTS.comentarioTexto.value.trim();

        if (!nome || !texto) {
            alert('Por favor, preencha seu nome e o comentário.');
            return;
        }

        try {
            const avatarUrl = Comentarios.obterAvatarUrl();
            const comentario = Comentarios.criarComentario(nome, texto, avatarUrl);
            
            Comentarios.adicionarComentario(comentario);
            Comentarios.salvarComentario(comentario);
            Comentarios.limparFormulario();
            
            Utils.mostrarNotificacao("Comentário adicionado com sucesso!");
        } catch (error) {
            console.error('Erro ao enviar comentário:', error);
            Utils.mostrarNotificacao('Erro ao enviar comentário', 'erro');
        }
    },

    /**
     * Obtém a URL do avatar baseado na escolha do usuário
     * @returns {string} URL do avatar
     */
    obterAvatarUrl: () => {
        switch (Comentarios.avatarEscolhido) {
            case 'foto':
                return Comentarios.fotoUrl || Utils.gerarAvatarAleatorio();
            case 'aleatorio':
            default:
                return Utils.gerarAvatarAleatorio();
        }
    },

    /**
     * Cria um objeto de comentário
     * @param {string} autor - Nome do autor
     * @param {string} texto - Texto do comentário
     * @param {string} avatar - URL do avatar
     * @returns {object} Objeto do comentário
     */
    criarComentario: (autor, texto, avatar) => ({
        autor: autor,
        data: new Date().toLocaleDateString('pt-BR'),
        texto: texto,
        avatar: avatar,
        respostas: [],
        curtidas: 0,
        naoCurtidas: 0
    }),

    /**
     * Adiciona um comentário à lista
     * @param {object} comentario - Comentário a ser adicionado
     * @param {boolean} isResposta - Se é uma resposta
     * @param {HTMLElement} comentarioPai - Elemento pai para respostas
     */
    adicionarComentario: (comentario, isResposta = false, comentarioPai = null) => {
        const comentarioDiv = document.createElement('div');
        comentarioDiv.classList.add('comentario');
        
        comentarioDiv.innerHTML = Comentarios.criarHTMLComentario(comentario);
        
        if (!isResposta) {
            DOM_ELEMENTS.comentariosLista.appendChild(comentarioDiv);
        } else {
            comentarioPai.querySelector('.respostas').appendChild(comentarioDiv);
        }
        
        Comentarios.configurarEventosComentario(comentarioDiv, comentario);
    },

    /**
     * Cria o HTML de um comentário
     * @param {object} comentario - Dados do comentário
     * @returns {string} HTML do comentário
     */
    criarHTMLComentario: (comentario) => `
        <div class="comentario-cabecalho">
            <img src="${comentario.avatar}" alt="Usuário" class="comentario-avatar">
            <div class="comentario-info">
                <span class="comentario-autor">${comentario.autor}</span>
                <span class="comentario-data">${comentario.data}</span>
            </div>
            <div class="comentario-acoes">
                <button class="curtida-btn">👍 Curtir</button>
                <span class="curtida-contador">${comentario.curtidas} curtida${comentario.curtidas !== 1 ? 's' : ''}</span>
                <button class="nao-curtida-btn">👎 Não Curtir</button>
                <span class="nao-curtida-contador">${comentario.naoCurtidas} não curtida${comentario.naoCurtidas !== 1 ? 's' : ''}</span>
                <button class="resposta-btn">💬 Responder</button>
                <button class="editar-btn">✏️ Editar</button>
                <button class="excluir-btn">🗑️ Excluir</button>
            </div>
        </div>
        <div class="comentario-conteudo">
            <p>${comentario.texto}</p>
        </div>
        <div class="respostas"></div>
    `,

    /**
     * Configura os eventos de um comentário
     * @param {HTMLElement} comentarioDiv - Elemento do comentário
     * @param {object} comentario - Dados do comentário
     */
    configurarEventosComentario: (comentarioDiv, comentario) => {
        // Curtir
        comentarioDiv.querySelector('.curtida-btn').addEventListener('click', () => {
            comentario.curtidas++;
            comentarioDiv.querySelector('.curtida-contador').textContent = 
                `${comentario.curtidas} curtida${comentario.curtidas !== 1 ? 's' : ''}`;
            Comentarios.atualizarComentarioLocalStorage(comentario);
        });

        // Não curtir
        comentarioDiv.querySelector('.nao-curtida-btn').addEventListener('click', () => {
            comentario.naoCurtidas++;
            comentarioDiv.querySelector('.nao-curtida-contador').textContent = 
                `${comentario.naoCurtidas} não curtida${comentario.naoCurtidas !== 1 ? 's' : ''}`;
            Comentarios.atualizarComentarioLocalStorage(comentario);
        });

        // Responder
        comentarioDiv.querySelector('.resposta-btn').addEventListener('click', () => {
            Comentarios.abrirModalResposta(comentarioDiv);
        });

        // Editar
        comentarioDiv.querySelector('.editar-btn').addEventListener('click', () => {
            Comentarios.editarComentario(comentarioDiv, comentario);
        });

        // Excluir
        comentarioDiv.querySelector('.excluir-btn').addEventListener('click', () => {
            Comentarios.excluirComentario(comentarioDiv, comentario);
        });
    },

    /**
     * Abre o modal de resposta
     * @param {HTMLElement} comentarioPai - Elemento pai para a resposta
     */
    abrirModalResposta: (comentarioPai) => {
        DOM_ELEMENTS.modalResposta.style.display = 'flex';
        
        // Configurar envio da resposta
        const enviarResposta = document.getElementById('enviar-resposta');
        enviarResposta.onclick = async () => {
            const nomeResposta = document.getElementById('resposta-nome').value.trim();
            const textoResposta = document.getElementById('resposta-texto').value.trim();
            const avatarEscolhido = document.querySelector('input[name="avatar-resposta"]:checked').value;
            const avatarFoto = document.getElementById('avatar-foto-resposta');
            
            if (!textoResposta) return;

            try {
                let avatarUrl = avatarEscolhido === 'foto' && avatarFoto.files[0] ? 
                    await Utils.lerArquivoComoDataURL(avatarFoto.files[0]) : 
                    Utils.gerarAvatarAleatorio();
                
                const resposta = Comentarios.criarComentario(
                    nomeResposta || "Usuário Anônimo",
                    textoResposta,
                    avatarUrl
                );
                
                Comentarios.adicionarComentario(resposta, true, comentarioPai);
                DOM_ELEMENTS.modalResposta.style.display = 'none';
            } catch (error) {
                console.error('Erro ao enviar resposta:', error);
                Utils.mostrarNotificacao('Erro ao enviar resposta', 'erro');
            }
        };
    },

    /**
     * Edita um comentário
     * @param {HTMLElement} comentarioDiv - Elemento do comentário
     * @param {object} comentario - Dados do comentário
     */
    editarComentario: (comentarioDiv, comentario) => {
        const novoTexto = prompt("Edite seu comentário:", comentario.texto);
        if (novoTexto) {
            comentario.texto = novoTexto;
            comentarioDiv.querySelector('.comentario-conteudo p').textContent = novoTexto;
            Comentarios.atualizarComentarioLocalStorage(comentario);
        }
    },

    /**
     * Exclui um comentário
     * @param {HTMLElement} comentarioDiv - Elemento do comentário
     * @param {object} comentario - Dados do comentário
     */
    excluirComentario: (comentarioDiv, comentario) => {
        if (confirm("Tem certeza que deseja excluir este comentário?")) {
            comentarioDiv.remove();
            Comentarios.removerComentarioLocalStorage(comentario);
        }
    },

    /**
     * Carrega comentários do localStorage
     */
    carregarComentarios: () => {
        const comentarios = Comentarios.obterComentariosLocalStorage();
        comentarios.forEach(comentario => Comentarios.adicionarComentario(comentario));
    },

    /**
     * Limpa o formulário de comentário
     */
    limparFormulario: () => {
        DOM_ELEMENTS.comentarioNome.value = '';
        DOM_ELEMENTS.comentarioTexto.value = '';
        Comentarios.fotoUrl = '';
        DOM_ELEMENTS.avatarFoto.value = '';
    },

    /**
     * Obtém comentários do localStorage
     * @returns {object[]} Array de comentários
     */
    obterComentariosLocalStorage: () => {
        const comentariosSerieKey = `comentarios_serie_${DOM_ELEMENTS.serieId}`;
        return JSON.parse(localStorage.getItem(comentariosSerieKey)) || [];
    },

    /**
     * Salva um comentário no localStorage
     * @param {object} comentario - Comentário a ser salvo
     */
    salvarComentario: (comentario) => {
        const comentariosSerieKey = `comentarios_serie_${DOM_ELEMENTS.serieId}`;
        const comentarios = Comentarios.obterComentariosLocalStorage();
        comentarios.push(comentario);
        localStorage.setItem(comentariosSerieKey, JSON.stringify(comentarios));
    },

    /**
     * Atualiza um comentário no localStorage
     * @param {object} comentario - Comentário atualizado
     */
    atualizarComentarioLocalStorage: (comentario) => {
        const comentariosSerieKey = `comentarios_serie_${DOM_ELEMENTS.serieId}`;
        let comentarios = Comentarios.obterComentariosLocalStorage();
        comentarios = comentarios.map(c => 
            c.autor === comentario.autor && c.data === comentario.data && c.texto === comentario.texto ? 
            comentario : c
        );
        localStorage.setItem(comentariosSerieKey, JSON.stringify(comentarios));
    },

    /**
     * Remove um comentário do localStorage
     * @param {object} comentario - Comentário a ser removido
     */
    removerComentarioLocalStorage: (comentario) => {
        const comentariosSerieKey = `comentarios_serie_${DOM_ELEMENTS.serieId}`;
        let comentarios = Comentarios.obterComentariosLocalStorage();
        comentarios = comentarios.filter(c => 
            !(c.autor === comentario.autor && c.data === comentario.data && c.texto === comentario.texto)
        );
        localStorage.setItem(comentariosSerieKey, JSON.stringify(comentarios));
    }
};

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', () => {
    // Carregar dados da série
    UI.carregarInfoSerie();
    UI.carregarTemporadas();
    UI.configurarAvaliacaoEstrelas();
    
    // Evento para carregar episódios quando selecionar temporada
    DOM_ELEMENTS.listaTemporadas.addEventListener('change', UI.carregarEpisodios);
    
    // Inicializar sistema de comentários
    Comentarios.init();
});