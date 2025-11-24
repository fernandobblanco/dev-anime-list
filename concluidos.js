// Exibe os animes concluídos
function exibirAnimesC() {
    const container = document.getElementById('anime-list');
    container.innerHTML = '';

    const animesParaExibir = animes.filter(anime => anime.status === 'concluido');

    if (animesParaExibir.length === 0) {
        container.innerHTML = '<p class="no-results">Nenhum anime concluído ainda</p>';
        return;
    }

    animesParaExibir.forEach(anime => {
        const card = criarCartaoConcluido(anime);
        container.appendChild(card);
    });
}

// Cria o card de um anime concluído
function criarCartaoConcluido(anime) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        ${anime.imagem ? `<div class="card-image-container"><img src="${anime.imagem}" alt="Capa de ${anime.nome}" class="card-image"></div>` : ''}
        <div class="card-text-content">
            <div class="card-header">
                <h2>${anime.nome}</h2>
                <span class="episodios">${anime.episodios} ep</span>
            </div>
            <p class="descricao">${anime.descricao}</p>
            <div class="card-footer">
                <button class="btn-status btn-voltar" onclick="mudarStatusC(${anime.id})" data-status="${anime.status}">
                    Remover de concluídos
                </button>
            </div>
        </div>
    `;
    return card;
}

// Alterna o status entre concluído ↔ para assistir
function mudarStatusC(id) {
    const anime = animes.find(a => a.id === id);
    if (anime) {
        anime.status = anime.status === 'concluido' ? 'para-assistir' : 'concluido';
        salvarAnimes();
        exibirAnimesC();
    }
}

// Filtra a lista de concluídos
function filtrarAnimesC() {
    const termo = document.getElementById('search-input').value.toLowerCase();
    const container = document.getElementById('anime-list');
    container.innerHTML = '';

    const animesParaExibir = animes.filter(anime =>
        anime.status === 'concluido' &&
        (anime.nome.toLowerCase().includes(termo) ||
         anime.descricao.toLowerCase().includes(termo))
    );

    if (animesParaExibir.length === 0) {
        container.innerHTML = '<p class="no-results">Nenhum anime encontrado</p>';
        return;
    }

    animesParaExibir.forEach(anime => {
        const card = criarCartaoConcluido(anime);
        container.appendChild(card);
    });
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    carregarAnimes().then(() => {
        exibirAnimesC();
    });
});
