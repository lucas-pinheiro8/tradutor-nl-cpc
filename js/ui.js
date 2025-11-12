// Estado da aplicação
const state = {
    mode: 'nl-to-cpc',
    propositions: {},
    propCounter: 0
};

/**
 * Cria partículas animadas no fundo
 */
function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    for (let i = 0; i < CONFIG.ui.particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 100 + 50 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(particle);
    }
}

/**
 * Atualiza o modo de tradução
 * @param {string} mode - 'nl-to-cpc' ou 'cpc-to-nl'
 */
function updateMode(mode) {
    state.mode = mode;
    
    // Atualizar botões de modo
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (mode === 'nl-to-cpc') {
        document.getElementById('mode-nl-to-cpc').classList.add('active');
        document.getElementById('input-title').textContent = 'Entrada (NL)';
        document.getElementById('output-title').textContent = 'Saída (CPC)';
        document.getElementById('input-text').placeholder = 'Digite uma frase em português...';
        document.getElementById('propositions-section').classList.add('hidden');
        document.getElementById('detected-props-section').classList.add('hidden');
    } else {
        document.getElementById('mode-cpc-to-nl').classList.add('active');
        document.getElementById('input-title').textContent = 'Entrada (CPC)';
        document.getElementById('output-title').textContent = 'Saída (NL)';
        document.getElementById('input-text').placeholder = 'Digite uma fórmula lógica...';
        document.getElementById('propositions-section').classList.remove('hidden');
        document.getElementById('detected-props-section').classList.add('hidden');
    }
    
    // Limpar campos
    document.getElementById('input-text').value = '';
    document.getElementById('output-text').innerHTML = '<span class="placeholder">Resultado aparecerá aqui...</span>';
    document.getElementById('output-text').classList.remove('has-content');
    document.getElementById('analysis-section').classList.add('hidden');
    
    // Resetar proposições
    state.propositions = {};
    state.propCounter = 0;
    
    // Atualizar UI
    updateExamples();
    renderPropositions();
}

/**
 * Atualiza os exemplos exibidos
 */
function updateExamples() {
    const examplesDiv = document.getElementById('examples');
    examplesDiv.innerHTML = '';
    
    CONFIG.examples[state.mode].forEach(ex => {
        const btn = document.createElement('button');
        btn.className = 'example-btn';
        btn.textContent = ex;
        btn.onclick = () => {
            document.getElementById('input-text').value = ex;
        };
        examplesDiv.appendChild(btn);
    });
}

/**
 * Adiciona uma nova proposição
 */
function addProposition() {
    if (Object.keys(state.propositions).length >= CONFIG.ui.maxPropositions) {
        alert('Limite máximo de proposições atingido!');
        return;
    }
    
    const varName = String.fromCharCode(80 + Object.keys(state.propositions).length);
    state.propositions[varName] = '';
    renderPropositions();
}

/**
 * Remove uma proposição
 * @param {string} varName - Nome da variável a remover
 */
function removeProposition(varName) {
    delete state.propositions[varName];
    renderPropositions();
}

/**
 * Atualiza o valor de uma proposição
 * @param {string} varName - Nome da variável
 * @param {string} value - Novo valor
 */
function updateProposition(varName, value) {
    state.propositions[varName] = value;
}

/**
 * Renderiza a lista de proposições
 */
function renderPropositions() {
    const list = document.getElementById('propositions-list');
    list.innerHTML = '';
    
    if (Object.keys(state.propositions).length === 0) {
        list.innerHTML = '<div class="empty-state">Nenhuma proposição definida ainda</div>';
        return;
    }
    
    Object.keys(state.propositions).forEach(varName => {
        const div = document.createElement('div');
        div.className = 'prop-item';
        div.innerHTML = `
            <span class="prop-label">${varName}:</span>
            <input 
                type="text" 
                value="${state.propositions[varName]}"
                placeholder="Significado da proposição..."
                class="prop-input"
                onchange="updateProposition('${varName}', this.value)"
            />
            <button 
                onclick="removeProposition('${varName}')"
                class="remove-btn"
                aria-label="Remover proposição ${varName}"
            >
                🗑️
            </button>
        `;
        list.appendChild(div);
    });
}

/**
 * Mostra as proposições detectadas (modo NL→CPC)
 * @param {Object} props - Dicionário de proposições
 */
function showDetectedPropositions(props) {
    const section = document.getElementById('detected-props-section');
    const list = document.getElementById('detected-props-list');
    
    list.innerHTML = '';
    
    Object.entries(props).forEach(([varName, meaning]) => {
        const div = document.createElement('div');
        div.className = 'prop-item';
        div.innerHTML = `
            <span class="prop-label">${varName}:</span>
            <div style="flex: 1; padding: 15px 20px; background: rgba(255, 255, 255, 0.95); border-radius: 15px; color: #333; font-size: 1.05em;">${meaning}</div>
        `;
        list.appendChild(div);
    });
    
    section.classList.remove('hidden');
}

/**
 * Mostra a análise do resultado da tradução
 * @param {Object} result - Resultado da tradução
 */
function showAnalysis(result) {
    const section = document.getElementById('analysis-section');
    const success = result.success;
    
    section.className = success ? 'analysis success' : 'analysis error';
    
    section.innerHTML = `
        <div class="analysis-content">
            <div class="analysis-icon">${success ? '✅' : '❌'}</div>
            <div class="analysis-text">
                <h3>${result.message || (success ? 'Tradução realizada com sucesso!' : 'Erro na tradução')}</h3>
                <p>${result.details || ''}</p>
            </div>
        </div>
    `;
    
    section.classList.remove('hidden');
}

/**
 * Executa a tradução baseado no modo atual
 */
function handleTranslate() {
    const input = document.getElementById('input-text').value.trim();
    
    // Validar entrada
    if (!input) {
        showAnalysis({
            success: false,
            message: 'Entrada vazia',
            details: CONFIG.messages.error.emptyInput
        });
        return;
    }
    
    if (state.mode === 'nl-to-cpc') {
        // Tradução NL → CPC
        const result = translator.translateNLtoCPC(input);
        
        // Atualizar saída
        const outputBox = document.getElementById('output-text');
        outputBox.innerHTML = `<p style="font-family: 'Courier New', monospace; font-size: 2em; font-weight: bold; color: #667eea;">${result.formula}</p>`;
        outputBox.classList.add('has-content');
        
        // Mostrar proposições detectadas
        showDetectedPropositions(result.propositions);
        
        // Mostrar análise
        showAnalysis(result);
        
    } else {
        // Tradução CPC → NL
        const result = translator.translateCPCtoNL(input, state.propositions);
        
        if (result.success) {
            // Atualizar saída
            const outputBox = document.getElementById('output-text');
            outputBox.innerHTML = `<p style="font-size: 1.3em; line-height: 1.6; color: #333;">${result.sentence}</p>`;
            outputBox.classList.add('has-content');
            
            // Mostrar análise
            showAnalysis(result);
        } else {
            // Mostrar erro
            showAnalysis(result);
        }
    }
}

/**
 * Inicializa a aplicação
 */
function initializeApp() {
    // Criar partículas de fundo
    createParticles();
    
    // Configurar event listeners
    document.getElementById('mode-nl-to-cpc').onclick = () => updateMode('nl-to-cpc');
    document.getElementById('mode-cpc-to-nl').onclick = () => updateMode('cpc-to-nl');
    document.getElementById('add-prop-btn').onclick = addProposition;
    document.getElementById('translate-btn').onclick = handleTranslate;
    
    // Atalho de teclado (Enter para traduzir)
    document.getElementById('input-text').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleTranslate();
        }
    });
    
    // Inicializar modo padrão
    updateMode('nl-to-cpc');
    
    console.log('✅ Tradutor NL↔CPC inicializado com sucesso!');
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initializeApp);