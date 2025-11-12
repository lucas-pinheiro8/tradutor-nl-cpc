class LogicTranslator {
    constructor() {
        this.nlPatterns = [
            // Bicondicional com conjunção no antecedente: "A e B se e somente se C"
            {
                pattern: /(.+?)\s+e\s+(.+?)\s+se\s+e\s+somente\s+se\s+(.+)/i,
                operator: 'complex',
                extract: (m) => [m[1].trim(), m[2].trim(), m[3].trim()],
                build: (vars) => `(${vars[0]} ∧ ${vars[1]}) ↔ ${vars[2]}`
            },
            // Bicondicional com disjunção no antecedente: "A ou B se e somente se C"
            {
                pattern: /(.+?)\s+ou\s+(.+?)\s+se\s+e\s+somente\s+se\s+(.+)/i,
                operator: 'complex',
                extract: (m) => [m[1].trim(), m[2].trim(), m[3].trim()],
                build: (vars) => `(${vars[0]} ∨ ${vars[1]}) ↔ ${vars[2]}`
            },
            // Bicondicional simples - DEVE VIR DEPOIS dos complexos
            {
                pattern: /(.+?)\s+se\s+e\s+somente\s+se\s+(.+)/i,
                operator: '↔',
                extract: (m) => [m[1].trim(), m[2].trim()]
            },
            // Implicação com múltiplas condições no antecedente
            {
                pattern: /se\s+(.+?)\s+e\s+(.+?)\s+então\s+(.+)/i,
                operator: 'complex',
                extract: (m) => [m[1].trim(), m[2].trim(), m[3].trim()],
                build: (vars) => `(${vars[0]} ∧ ${vars[1]}) → ${vars[2]}`
            },
            // Implicação com disjunção no antecedente
            {
                pattern: /se\s+(.+?)\s+ou\s+(.+?)\s+então\s+(.+)/i,
                operator: 'complex',
                extract: (m) => [m[1].trim(), m[2].trim(), m[3].trim()],
                build: (vars) => `(${vars[0]} ∨ ${vars[1]}) → ${vars[2]}`
            },
            // Implicação simples
            {
                pattern: /se\s+(.+?)\s+então\s+(.+)/i,
                operator: '→',
                extract: (m) => [m[1].trim(), m[2].trim()]
            },
            // Conjunção múltipla (3 elementos)
            {
                pattern: /(.+?)\s+e\s+(.+?)\s+e\s+(.+?)(?:\.|$)/i,
                operator: 'complex',
                extract: (m) => [m[1].trim(), m[2].trim(), m[3].trim()],
                build: (vars) => `(${vars[0]} ∧ ${vars[1]}) ∧ ${vars[2]}`
            },
            // Conjunção simples
            {
                pattern: /(.+?)\s+e\s+(.+?)(?:\.|$)/i,
                operator: '∧',
                extract: (m) => [m[1].trim(), m[2].trim()]
            },
            // Disjunção múltipla (3 elementos)
            {
                pattern: /(.+?)\s+ou\s+(.+?)\s+ou\s+(.+?)(?:\.|$)/i,
                operator: 'complex',
                extract: (m) => [m[1].trim(), m[2].trim(), m[3].trim()],
                build: (vars) => `(${vars[0]} ∨ ${vars[1]}) ∨ ${vars[2]}`
            },
            // Disjunção simples
            {
                pattern: /(.+?)\s+ou\s+(.+?)(?:\.|$)/i,
                operator: '∨',
                extract: (m) => [m[1].trim(), m[2].trim()]
            },
            // Negação
            {
                pattern: /não\s+(.+)/i,
                operator: '¬',
                extract: (m) => [m[1].trim()]
            }
        ];
        
        this.operatorWords = CONFIG.operatorWords;
    }

    /**
     * Traduz Linguagem Natural para Cálculo Proposicional
     * @param {string} text - Frase em português
     * @returns {Object} Resultado com formula, propositions e success
     */
    translateNLtoCPC(text) {
        const props = {};
        const propMap = {};
        let propCounter = 0;
        
        // Normalizar texto
        text = text.toLowerCase().trim().replace(/\.$/, '');
        
        let matched = false;
        let formula = '';
        
        // Tentar encontrar padrão correspondente
        for (let patternObj of this.nlPatterns) {
            const match = text.match(patternObj.pattern);
            if (match) {
                const extracted = patternObj.extract(match);
                const propVars = [];
                
                // Criar proposições para cada elemento extraído
                extracted.forEach(prop => {
                    // Limpar a proposição
                    prop = prop.replace(/^(o|a|os|as)\s+/i, '').trim();
                    
                    if (!propMap[prop]) {
                        const varName = String.fromCharCode(80 + propCounter); // P, Q, R, S, T...
                        propMap[prop] = varName;
                        props[varName] = prop;
                        propCounter++;
                    }
                    propVars.push(propMap[prop]);
                });
                
                // Construir fórmula baseado no operador
                if (patternObj.operator === 'complex') {
                    // Usar função de build customizada
                    formula = patternObj.build(propVars);
                } else if (patternObj.operator === '¬') {
                    formula = `¬${propVars[0]}`;
                } else {
                    formula = `${propVars[0]} ${patternObj.operator} ${propVars[1]}`;
                }
                
                matched = true;
                break;
            }
        }
        
        // Se não encontrou padrão, tratar como proposição simples
        if (!matched) {
            text = text.replace(/^(o|a|os|as)\s+/i, '').trim();
            props['P'] = text;
            formula = 'P';
        }
        
        return {
            formula: formula,
            propositions: props,
            success: true,
            message: CONFIG.messages.success.nlToCpc,
            details: `Detectadas ${Object.keys(props).length} proposição(ões)`
        };
    }

    /**
     * Traduz Cálculo Proposicional para Linguagem Natural
     * @param {string} formula - Fórmula lógica
     * @param {Object} propositions - Dicionário de proposições
     * @returns {Object} Resultado com sentence e success
     */
    translateCPCtoNL(formula, propositions) {
        // Validar se proposições foram definidas
        if (!propositions || Object.keys(propositions).length === 0) {
            return {
                sentence: '',
                success: false,
                message: CONFIG.messages.error.noPropositions,
                details: 'É necessário definir o significado de cada variável proposicional'
            };
        }
        
        // Validar se todas as variáveis da fórmula têm definição
        const varsInFormula = this.extractVariables(formula);
        const missingVars = varsInFormula.filter(v => !propositions[v]);
        
        if (missingVars.length > 0) {
            return {
                sentence: '',
                success: false,
                message: 'Proposições incompletas',
                details: `Faltam definições para: ${missingVars.join(', ')}`
            };
        }
        
        let sentence = formula;
        
        // Substituir variáveis proposicionais pelos seus significados
        // Ordenar por tamanho decrescente para evitar substituições parciais
        const sortedVars = Object.keys(propositions).sort((a, b) => b.length - a.length);
        sortedVars.forEach(varName => {
            const regex = new RegExp(`\\b${varName}\\b`, 'g');
            sentence = sentence.replace(regex, propositions[varName]);
        });
        
        // Substituir operadores lógicos por palavras
        Object.keys(this.operatorWords).forEach(op => {
            const escapedOp = op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            sentence = sentence.replace(new RegExp(escapedOp, 'g'), this.operatorWords[op]);
        });
        
        // Remover parênteses
        sentence = sentence.replace(/\(/g, '').replace(/\)/g, '');
        
        // Adicionar "Se" no início para implicações
        if (formula.includes('→') || sentence.includes('então')) {
            if (!sentence.toLowerCase().startsWith('se ')) {
                sentence = 'Se ' + sentence;
            }
        }
        
        // Capitalizar primeira letra e adicionar ponto final
        sentence = sentence.trim();
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
        if (!sentence.endsWith('.')) {
            sentence += '.';
        }
        
        return {
            sentence: sentence,
            success: true,
            message: CONFIG.messages.success.cpcToNl,
            details: 'Fórmula convertida para linguagem natural'
        };
    }

    /**
     * Valida uma fórmula lógica
     * @param {string} formula - Fórmula a ser validada
     * @returns {boolean} true se válida
     */
    validateFormula(formula) {
        // Verifica parênteses balanceados
        let balance = 0;
        for (let char of formula) {
            if (char === '(') balance++;
            if (char === ')') balance--;
            if (balance < 0) return false;
        }
        return balance === 0;
    }

    /**
     * Extrai variáveis proposicionais de uma fórmula
     * @param {string} formula - Fórmula lógica
     * @returns {Array} Array com as variáveis encontradas
     */
    extractVariables(formula) {
        const vars = new Set();
        const regex = /[A-Z]/g;
        let match;
        while ((match = regex.exec(formula)) !== null) {
            vars.add(match[0]);
        }
        return Array.from(vars).sort();
    }

    /**
     * Analisa a complexidade de uma fórmula
     * @param {string} formula - Fórmula lógica
     * @returns {Object} Análise da fórmula
     */
    analyzeFormula(formula) {
        const vars = this.extractVariables(formula);
        const operators = {
            '∧': (formula.match(/∧/g) || []).length,
            '∨': (formula.match(/∨/g) || []).length,
            '¬': (formula.match(/¬/g) || []).length,
            '→': (formula.match(/→/g) || []).length,
            '↔': (formula.match(/↔/g) || []).length
        };
        
        return {
            variables: vars,
            variableCount: vars.length,
            operators: operators,
            operatorCount: Object.values(operators).reduce((a, b) => a + b, 0),
            hasParentheses: formula.includes('('),
            complexity: this.calculateComplexity(formula)
        };
    }

    /**
     * Calcula complexidade da fórmula
     * @param {string} formula - Fórmula lógica
     * @returns {string} Nível de complexidade
     */
    calculateComplexity(formula) {
        const varCount = this.extractVariables(formula).length;
        const opCount = (formula.match(/[∧∨¬→↔]/g) || []).length;
        const hasParens = formula.includes('(');
        
        if (varCount === 1 && opCount === 0) return 'trivial';
        if (varCount === 1 && opCount === 1) return 'simples';
        if (varCount === 2 && opCount === 1 && !hasParens) return 'simples';
        if (varCount === 2 && opCount >= 2) return 'média';
        if (varCount >= 3 && !hasParens) return 'média';
        if (hasParens || varCount >= 4) return 'complexa';
        return 'média';
    }
}

// Criar instância global do tradutor
const translator = new LogicTranslator();