// Lista de animes
let animes = [];

// Carrega JSON e restaura status do localStorage
async function carregarAnimes() {
    try {
        const response = await fetch('animes.json');
        animes = await response.json();

        const saved = localStorage.getItem('animes');
        if (saved) {
            const estadosSalvos = JSON.parse(saved);
            animes = animes.map(anime => {
                const existente = estadosSalvos.find(a => a.id === anime.id);
                if (existente) anime.status = existente.status;
                return anime;
            });
        }
    } catch (error) {
        console.error('Erro ao carregar animes:', error);
    }
}

// Exibe os animes "para assistir"
function exibirAnimes() {
    const container = document.getElementById('anime-list');
    container.innerHTML = '';

    const filtrados = animes.filter(a => a.status === 'para-assistir');

    filtrados.forEach(anime => {
        container.appendChild(criarCartao(anime));
    });
}

// Filtra resultados da busca
function filtrarAnimes() {
    const termo = document.getElementById('search-input').value.toLowerCase();
    const container = document.getElementById('anime-list');
    container.innerHTML = '';

    const filtrados = animes.filter(anime =>
        anime.status === 'para-assistir' &&
        (anime.nome.toLowerCase().includes(termo) ||
         anime.descricao.toLowerCase().includes(termo))
    );

    if (!filtrados.length) {
        container.innerHTML = '<p class="no-results">Nenhum anime encontrado</p>';
        return;
    }

    filtrados.forEach(anime => {
        container.appendChild(criarCartao(anime));
    });
}

// Cria o card do anime
function criarCartao(anime) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        ${anime.imagem ? `
            <div class="card-image-container">
                <img src="${anime.imagem}" alt="Capa de ${anime.nome}" class="card-image">
            </div>` : ''}
        
        <div class="card-text-content">
            <div class="card-header">
                <h2>${anime.nome}</h2>
                <span class="episodios">${anime.episodios} ep</span>
            </div>

            <p class="descricao">${anime.descricao}</p>

            <div class="card-footer">
                <button class="btn-status" onclick="mudarStatus(${anime.id})">
                    Marcar como concluído
                </button>
            </div>
        </div>
    `;
    return card;
}

// Alterna o status do anime
function mudarStatus(id) {
    const anime = animes.find(a => a.id === id);
    if (!anime) return;

    anime.status = anime.status === 'para-assistir' ? 'concluido' : 'para-assistir';
    salvarAnimes();
    exibirAnimes();
}

// Salva o estado atual no localStorage
function salvarAnimes() {
    localStorage.setItem('animes', JSON.stringify(animes));
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    carregarAnimes().then(() => exibirAnimes());
});
