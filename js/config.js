
const CONFIG = {
    // Exemplos para cada modo
    examples: {
        'nl-to-cpc': [
            'Se chover então a grama ficará molhada',
            'João estuda e Maria trabalha',
            'Vou ao cinema ou fico em casa',
            'Não está fazendo frio',
            'O alarme toca se e somente se houver movimento'
        ],
        'cpc-to-nl': [
            'P → Q',
            'P ∧ Q',
            '(P ∨ Q) → R',
            '¬P ↔ Q',
            '(P ∧ Q) ∧ R'
        ]
    },

    // Conectivos lógicos suportados
    connectives: {
        '∧': {
            name: 'conjunção',
            word: 'e',
            priority: 3
        },
        '∨': {
            name: 'disjunção',
            word: 'ou',
            priority: 2
        },
        '¬': {
            name: 'negação',
            word: 'não',
            priority: 4
        },
        '→': {
            name: 'implicação',
            word: 'então',
            priority: 1
        },
        '↔': {
            name: 'bicondicional',
            word: 'se e somente se',
            priority: 0
        }
    },

    // Padrões de tradução NL → CPC
    nlPatterns: [
        {
            pattern: /se (.+?) então (.+)/i,
            operator: '→',
            extract: (m) => [m[1].trim(), m[2].trim()]
        },
        {
            pattern: /(.+?) e (.+?)(?:\.|$)/i,
            operator: '∧',
            extract: (m) => [m[1].trim(), m[2].trim()]
        },
        {
            pattern: /(.+?) ou (.+?)(?:\.|$)/i,
            operator: '∨',
            extract: (m) => [m[1].trim(), m[2].trim()]
        },
        {
            pattern: /não (.+)/i,
            operator: '¬',
            extract: (m) => [m[1].trim()]
        },
        {
            pattern: /(.+?) se e somente se (.+)/i,
            operator: '↔',
            extract: (m) => [m[1].trim(), m[2].trim()]
        }
    ],

    // Mapeamento de operadores para palavras
    operatorWords: {
        '→': ' então ',
        '∧': ' e ',
        '∨': ' ou ',
        '↔': ' se e somente se ',
        '¬': 'não '
    },

    // Configurações de UI
    ui: {
        particlesCount: 20,
        animationDuration: 15000,
        maxPropositions: 26 // A-Z
    },

    // Mensagens do sistema
    messages: {
        success: {
            nlToCpc: 'Tradução NL→CPC realizada com sucesso!',
            cpcToNl: 'Tradução CPC→NL realizada com sucesso!'
        },
        error: {
            emptyInput: 'Digite algo para traduzir',
            noPropositions: 'Defina as proposições antes de traduzir',
            invalidFormula: 'Fórmula inválida'
        }
    }
};

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}