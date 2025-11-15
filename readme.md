# 🧠 Tradutor NL ↔ CPC - Agente de IA

Sistema inteligente para tradução bidirecional entre Linguagem Natural (português) e Cálculo Proposicional Clássico.<br>
Autores: <br>
Lucas Pinheiro Coelho Cacere<br>
Guilherme Modesto Saturi<br>
Yasmin Gurgel Batista <br>
João Pedro Gomes Gonçalves<br>


## 🎯 Visão Geral

Este projeto implementa um **Agente de IA** capaz de realizar traduções bidirecionais entre:

1. **Linguagem Natural (NL)** → **Cálculo Proposicional Clássico (CPC)**
   - Converte frases em português para fórmulas lógicas

2. **Cálculo Proposicional Clássico (CPC)** → **Linguagem Natural (NL)**
   - Converte fórmulas lógicas para frases em português

### Conectivos Suportados

| Símbolo | Nome | Português | Prioridade |
|---------|------|-----------|------------|
| `∧` | Conjunção | e | 3 |
| `∨` | Disjunção | ou | 2 |
| `¬` | Negação | não | 4 |
| `→` | Implicação | se...então | 1 |
| `↔` | Bicondicional | se e somente se | 0 |

---

## ✨ Funcionalidades

### 🔄 Modo NL → CPC
- ✅ Detecção automática de proposições
- ✅ Suporte a múltiplas proposições (até 26 - A-Z)
- ✅ Reconhecimento de padrões linguísticos
- ✅ Geração de fórmulas com parênteses para expressões complexas
- ✅ Remoção automática de artigos (o, a, os, as)

### 🔤 Modo CPC → NL
- ✅ Definição manual de proposições
- ✅ Validação de variáveis
- ✅ Tradução de fórmulas complexas
- ✅ Formatação automática de sentenças
- ✅ Inserção inteligente de conectivos

### 🎨 Interface
- ✅ Design moderno e responsivo
- ✅ Animações suaves
- ✅ Exemplos interativos
- ✅ Feedback visual de resultados
- ✅ Análise de sucesso/erro

---

## 🏗️ Arquitetura do Sistema

### Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│                  CAMADA DE APRESENTAÇÃO                      │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Interface Web (HTML/CSS)              │    │
│  │  - index.html: Estrutura semântica                 │    │
│  │  - style.css: Estilos e layout                     │    │
│  │  - animations.css: Efeitos visuais                 │    │
│  └────────────────────────────────────────────────────┘    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                 CAMADA DE CONTROLE (UI)                      │
│  ┌────────────────────────────────────────────────────┐    │
│  │              ui.js - Gerenciador de Interface       │    │
│  │  - Controle de estado da aplicação                 │    │
│  │  - Event listeners e interações                    │    │
│  │  - Renderização dinâmica                           │    │
│  │  - Atualização de exemplos                         │    │
│  └────────────────────────────────────────────────────┘    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                  CAMADA DE LÓGICA                            │
│  ┌────────────────────────────────────────────────────┐    │
│  │        translator.js - Agente Tradutor             │    │
│  │                                                     │    │
│  │  ┌──────────────────────────────────────────┐     │    │
│  │  │  Analisador de Padrões (NL)              │     │    │
│  │  │  - Regex patterns                        │     │    │
│  │  │  - Extração de proposições               │     │    │
│  │  │  - Mapeamento P, Q, R...                 │     │    │
│  │  └──────────────────────────────────────────┘     │    │
│  │                                                     │    │
│  │  ┌──────────────────────────────────────────┐     │    │
│  │  │  Construtor de Fórmulas                  │     │    │
│  │  │  - Aplicação de operadores               │     │    │
│  │  │  - Geração de parênteses                 │     │    │
│  │  │  - Validação sintática                   │     │    │
│  │  └──────────────────────────────────────────┘     │    │
│  │                                                     │    │
│  │  ┌──────────────────────────────────────────┐     │    │
│  │  │  Sintetizador de Sentenças (NL)          │     │    │
│  │  │  - Substituição de variáveis             │     │    │
│  │  │  - Conversão de operadores               │     │    │
│  │  │  - Formatação de texto                   │     │    │
│  │  └──────────────────────────────────────────┘     │    │
│  └────────────────────────────────────────────────────┘    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                 CAMADA DE CONFIGURAÇÃO                       │
│  ┌────────────────────────────────────────────────────┐    │
│  │           config.js - Configurações                │    │
│  │  - Padrões de tradução                             │    │
│  │  - Exemplos pré-definidos                          │    │
│  │  - Constantes do sistema                           │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```
---

## 🔄 Estratégia de Tradução

### Abordagem Técnica

O sistema utiliza **Pattern Matching** baseado em expressões regulares para identificar estruturas linguísticas e mapeá-las para operadores lógicos.

### Padrões Implementados (NL → CPC)

#### 1. Padrões Simples (2 proposições)

| Padrão Linguístico | Operador | Exemplo | Fórmula |
|-------------------|----------|---------|---------|
| "se X então Y" | → | Se chover então molha | P → Q |
| "X e Y" | ∧ | João estuda e Maria trabalha | P ∧ Q |
| "X ou Y" | ∨ | Vou ao cinema ou fico em casa | P ∨ Q |
| "não X" | ¬ | Não está frio | ¬P |
| "X se e somente se Y" | ↔ | Alarme toca sse houver movimento | P ↔ Q |

#### 2. Padrões Complexos (3+ proposições)

| Padrão Linguístico | Fórmula | Exemplo |
|-------------------|---------|---------|
| "se X e Y então Z" | (P ∧ Q) → R | Se chover e ventar então cancela |
| "se X ou Y então Z" | (P ∨ Q) → R | Se João ou Maria vier então festa |
| "X e Y e Z" | (P ∧ Q) ∧ R | João, Maria e Pedro estudam |
| "X ou Y ou Z" | (P ∨ Q) ∨ R | Vou de ônibus, carro ou a pé |
| "X e Y sse Z" | (P ∧ Q) ↔ R | João e Maria vão sse fizer sol |
| "X ou Y sse Z" | (P ∨ Q) ↔ R | Vou à praia ou piscina sse calor |

### Algoritmo de Tradução

#### NL → CPC

```javascript
1. Normalizar texto (minúsculas, remover pontuação)
2. Remover artigos (o, a, os, as)
3. Iterar sobre padrões (do mais específico ao geral):
   a. Aplicar regex para encontrar correspondência
   b. Se encontrou:
      - Extrair proposições do match
      - Mapear cada proposição única para variável (P, Q, R...)
      - Construir fórmula aplicando operador
      - Retornar resultado
4. Se nenhum padrão correspondeu:
   - Tratar como proposição atômica
   - Retornar P
```

#### CPC → NL

```javascript
1. Validar presença de proposições
2. Verificar se todas variáveis da fórmula têm definição
3. Substituir variáveis por seus significados:
   - Ordenar por tamanho decrescente (evitar substituições parciais)
   - Usar regex com word boundaries
4. Substituir operadores lógicos por palavras:
   ∧ → " e "
   ∨ → " ou "
   ¬ → "não "
   → → " então "
   ↔ → " se e somente se "
5. Remover parênteses
6. Adicionar "Se" no início (se houver implicação)
7. Capitalizar primeira letra
8. Adicionar ponto final
9. Retornar sentença
```

### Processamento de Proposições

```javascript
// Exemplo de extração
Input: "Se chover e ventar então fico em casa"

Passo 1: Match com padrão "se X e Y então Z"
Passo 2: Extrai ["chover", "ventar", "fico em casa"]
Passo 3: Mapeia:
  - "chover" não existe → cria P = "chover"
  - "ventar" não existe → cria Q = "ventar"
  - "fico em casa" não existe → cria R = "fico em casa"
Passo 4: Aplica template: (P ∧ Q) → R
Output: {
  formula: "(P ∧ Q) → R",
  propositions: {
    P: "chover",
    Q: "ventar",
    R: "fico em casa"
  }
}
```

---

## 📚 Exemplos de Uso

### Exemplo 1: Implicação Simples

**Modo: NL → CPC**

```
📝 Entrada:
"Se chover então a grama ficará molhada"

📤 Saída:
Fórmula: P → Q

🎯 Proposições Detectadas:
P = chover
Q = a grama ficará molhada

✅ Análise: Tradução realizada com sucesso!
Detectadas 2 proposição(ões)
```

---

### Exemplo 2: Conjunção

**Modo: NL → CPC**

```
📝 Entrada:
"João estuda e Maria trabalha"

📤 Saída:
Fórmula: P ∧ Q

🎯 Proposições Detectadas:
P = joão estuda
Q = maria trabalha

✅ Análise: Tradução realizada com sucesso!
Detectadas 2 proposição(ões)
```

---

### Exemplo 3: Implicação Complexa (3 proposições)

**Modo: NL → CPC**

```
📝 Entrada:
"Se chover e ventar então a aula será cancelada"

📤 Saída:
Fórmula: (P ∧ Q) → R

🎯 Proposições Detectadas:
P = chover
Q = ventar
R = a aula será cancelada

✅ Análise: Tradução realizada com sucesso!
Detectadas 3 proposição(ões)
```

---

### Exemplo 4: Bicondicional Complexo

**Modo: NL → CPC**

```
📝 Entrada:
"João estuda e Maria trabalha se e somente se fizer frio"

📤 Saída:
Fórmula: (P ∧ Q) ↔ R

🎯 Proposições Detectadas:
P = joão estuda
Q = maria trabalha
R = fizer frio

✅ Análise: Tradução realizada com sucesso!
Detectadas 3 proposição(ões)
```

---

### Exemplo 5: CPC → NL

**Modo: CPC → NL**

```
🔧 Definir Proposições:
P: chover
Q: ventar
R: a aula ser cancelada

📝 Entrada:
(P ∧ Q) → R

📤 Saída:
"Se chover e ventar então a aula ser cancelada."

✅ Análise: Tradução realizada com sucesso!
Fórmula convertida para linguagem natural
```

---

### Exemplo 6: Negação

**Modo: NL → CPC**

```
📝 Entrada:
"Não está fazendo frio"

📤 Saída:
Fórmula: ¬P

🎯 Proposições Detectadas:
P = está fazendo frio

✅ Análise: Tradução realizada com sucesso!
Detectadas 1 proposição(ões)
```

---

### Exemplo 7: Conjunção Tripla

**Modo: NL → CPC**

```
📝 Entrada:
"João estuda e Maria trabalha e Pedro descansa"

📤 Saída:
Fórmula: (P ∧ Q) ∧ R

🎯 Proposições Detectadas:
P = joão estuda
Q = maria trabalha
R = pedro descansa

✅ Análise: Tradução realizada com sucesso!
Detectadas 3 proposição(ões)
```

---

## 📊 Análise de Resultados

### Casos de Sucesso ✅

#### 1. Padrões Bem Estruturados
```
✅ "Se chover então molha"
✅ "João estuda e Maria trabalha"
✅ "Não está frio"
✅ "Se chover e ventar então cancela"
```

#### 2. Frases com Artigos
```
✅ "O alarme toca se e somente se houver movimento"
→ Remove "O" automaticamente
→ P ↔ Q
```

#### 3. Múltiplas Proposições
```
✅ "Se A e B então C" → (P ∧ Q) → R
✅ "A e B e C" → (P ∧ Q) ∧ R
✅ "A ou B ou C" → (P ∨ Q) ∨ R
```

### Casos de Erro ❌

#### 1. Ambiguidade de Escopo

**Problema:**
```
Entrada: "João estuda e Maria trabalha ou Pedro descansa"
```

**Ambiguidade:**
- `(P ∧ Q) ∨ R` ?
- `P ∧ (Q ∨ R)` ?

**Solução Atual:**
O sistema interpreta da esquerda para direita: `(P ∧ Q) ∨ R`

**Melhoria Futura:**
Detectar ambiguidade e pedir esclarecimento ao usuário.

---

#### 2. Negações de Escopo Complexo

**Problema:**
```
Entrada: "Não é verdade que João estuda ou Maria trabalha"
```

**Saída Esperada:** `¬(P ∨ Q)`  
**Saída Atual:** `¬P` (captura apenas "não é verdade")

**Causa:**
O padrão de negação atual é simples demais: `/não (.+)/`

**Solução:**
Adicionar padrão específico para "Não é verdade que...":
```javascript
{
    pattern: /não\s+é\s+verdade\s+que\s+(.+)/i,
    operator: 'negation_scope',
    // Processar recursivamente o conteúdo
}
```

---

#### 3. Quantificadores

**Problema:**
```
Entrada: "Todos os alunos estudam"
```

**Limitação:**
Sistema não suporta lógica de predicados (∀, ∃)

**Saída Atual:**
Trata como proposição atômica: `P = "todos os alunos estudam"`

**Solução Futura:**
Implementar módulo de lógica de predicados

---

#### 4. Frases Muito Informais

**Problema:**
```
Entrada: "Chove daí molha"
```

**Esperado:** `P → Q`  
**Atual:** Não detecta (falta "se...então")

**Solução:**
Adicionar padrões informais:
```javascript
{
    pattern: /(.+?)\s+daí\s+(.+)/i,
    operator: '→'
}
```

---

#### 5. Ordem Invertida

**Problema:**
```
Entrada: "A grama fica molhada quando chove"
```

**Esperado:** `P → Q` (onde P=chover, Q=grama molhada)  
**Atual:** Não detecta

**Solução:**
Adicionar padrão "quando":
```javascript
{
    pattern: /(.+?)\s+quando\s+(.+)/i,
    operator: '→',
    extract: (m) => [m[2].trim(), m[1].trim()] // Ordem invertida!
}
```

---

## ⚠️ Limitações e Possibilidades de Melhoria

### Limitações Atuais

#### 1. **Escopo Limitado de Padrões**

**Problema:**
- Sistema reconhece ~15 padrões
- Frases fora desses padrões não são processadas

**Impacto:**
```
❌ "Sempre que chove, molha" - não detectado
❌ "Chove, logo molha" - não detectado
❌ "Caso chova, molhará" - não detectado
```

**Proposta de Melhoria:**
- Adicionar 50+ padrões variados
- Implementar sinônimos de conectivos
- Usar NLP para análise sintática

---

#### 2. **Ausência de Análise Semântica**

**Problema:**
- Sistema não compreende significado
- Apenas casa padrões sintáticos

**Exemplo de Limitação:**
```
Input: "Se 2+2=5 então a Terra é plana"
Output: P → Q (aceita, mas é absurdo)
```

**Proposta de Melhoria:**
- Integrar base de conhecimento
- Validação semântica básica
- Detectar contradições óbvias

---

#### 3. **Tratamento de Ambiguidade**

**Problema:**
- Sistema escolhe uma interpretação sem avisar
- Usuário não sabe que há ambiguidade

**Exemplo:**
```
Input: "A e B ou C"
Possíveis: (A ∧ B) ∨ C  ou  A ∧ (B ∨ C)
Output atual: (A ∧ B) ∨ C (sem avisar)
```

**Proposta de Melhoria:**
- Detectar ambiguidades
- Mostrar múltiplas interpretações
- Pedir esclarecimento ao usuário

```javascript
// Interface proposta
{
  ambiguous: true,
  interpretations: [
    { formula: "(P ∧ Q) ∨ R", explanation: "..." },
    { formula: "P ∧ (Q ∨ R)", explanation: "..." }
  ],
  message: "Frase ambígua. Escolha a interpretação:"
}
```

---

#### 4. **Precedência de Operadores**

**Problema:**
- Não gera parênteses automaticamente
- Pode gerar fórmulas ambíguas

**Exemplo:**
```
Input: "A ou B e C"
Correto: A ∨ (B ∧ C)  [∧ tem maior precedência]
Output atual: P ∨ Q ∧ R  [ambíguo!]
```

**Proposta de Melhoria:**
Implementar sistema de precedência:
```javascript
const precedence = {
    '¬': 4,  // Maior precedência
    '∧': 3,
    '∨': 2,
    '→': 1,
    '↔': 0   // Menor precedência
};

function addParentheses(formula, precedence) {
    // Adicionar parênteses baseado em precedência
}
```

---

#### 5. **Negação de Escopo Complexo**

**Problema:**
- Não detecta alcance correto da negação

**Limitação:**
```
❌ "Não é verdade que A e B"
   Esperado: ¬(P ∧ Q)
   Atual: ¬P

❌ "Nem A nem B"
   Esperado: ¬P ∧ ¬Q
   Atual: Não detecta
```

**Proposta de Melhoria:**
```javascript
patterns: [
    {
        pattern: /não\s+é\s+verdade\s+que\s+(.+)/i,
        operator: '¬_scope',
        process: (content) => {
            const inner = parseRecursively(content);
            return `¬(${inner})`;
        }
    },
    {
        pattern: /nem\s+(.+?)\s+nem\s+(.+)/i,
        operator: 'nor',
        build: (vars) => `¬${vars[0]} ∧ ¬${vars[1]}`
    }
]
```

---

### Propostas de Melhoria

#### 1. **Integração com LLMs** 🤖

**Vantagens:**
- Maior robustez
- Compreensão de contexto
- Tratamento de variações linguísticas
- Suporte a múltiplos idiomas

**Implementação:**
```javascript
async function translateWithLLM(text) {
    const prompt = `
    Traduza a seguinte frase para lógica proposicional:
    "${text}"
    
    Formato de resposta:
    Formula: [fórmula]
    Proposições: {P: "...", Q: "..."}
    `;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }]
        })
    });
    
    return parseResponse(await response.json());
}
```

**Desvantagens:**
- Custo de API
- Dependência de serviço externo
- Latência de rede

---

#### 2. **Parser NLP (spaCy/NLTK)** 📖

**Vantagens:**
- Análise sintática profunda
- Identificação de dependências
- Extração de entidades
- Gratuito e local

**Implementação (conceitual):**
```python
import spacy

nlp = spacy.load('pt_core_news_lg')

def parse_sentence(text):
    doc = nlp(text)
    
    # Identificar estrutura
    for token in doc:
        if token.text.lower() == 'se':
            antecedent = extract_clause(token, 'right')
        if token.text.lower() == 'então':
            consequent = extract_clause(token, 'right')
    
    return build_formula(antecedent, consequent)
```

---

#### 3. **Gerador de Tabelas Verdade** 📊

**Funcionalidade:**
- Calcular valores de verdade para todas combinações
- Detectar tautologias
- Detectar contradições
- Verificar equivalências

**Interface proposta:**
```javascript
class TruthTableGenerator {
    generate(formula) {
        const vars = this.extractVariables(formula);
        const combinations = this.generateCombinations(vars);
        
        return combinations.map(combo => ({
            values: combo,
            result: this.evaluate(formula, combo)
        }));
    }
    
    isTautology(formula) {
        return this.generate(formula).every(row => row.result);
    }
    
    isContradiction(formula) {
        return this.generate(formula).every(row => !row.result);
    }
}
```

**Exemplo de uso:**
```
Formula: P → Q

Tabela Verdade:
| P | Q | P → Q |
|---|---|-------|
| V | V |   V   |
| V | F |   F   |
| F | V |   V   |
| F | F |   V   |

Análise: Não é tautologia, não é contradição
```

---

#### 4. **Validador e Simplificador** ⚡

**Funcionalidades:**
- Validar sintaxe de fórmulas
- Simplificar expressões equivalentes
- Aplicar leis de De Morgan
- Remover redundâncias

**Implementação:**
```javascript
class FormulaSimplifier {
    simplify(formula) {
        let simplified = formula;
        
        // Aplicar leis de De Morgan
        simplified = this.applyDeMorgan(simplified);
        
        // Eliminar dupla negação
        simplified = simplified.replace(/¬¬/g, '');
        
        // Identidade: P ∧ V ≡ P
        simplified = simplified.replace(/\((.+?) ∧ V\)/g, '$1');
        
        // Anulação: P ∨ V ≡ V
        simplified = simplified.replace(/\((.+?) ∨ V\)/g, 'V');
        
        return simplified;
    }
    
    applyDeMorgan(formula) {
        // ¬(P ∧ Q) ≡ ¬P ∨ ¬Q
        formula = formula.replace(/¬\((.+?) ∧ (.+?)\)/g, '¬$1 ∨ ¬$2');
        
        // ¬(P ∨ Q) ≡ ¬P ∧ ¬Q
        formula = formula.replace(/¬\((.+?) ∨ (.+?)\)/g, '¬$1 ∧ ¬$2');
        
        return formula;
    }
}
```

**Exemplo:**
```
Input: ¬(P ∧ Q)
Output: ¬P ∨ ¬Q
Explicação: Lei de De Morgan aplicada
```

---

#### 5. **Modo Interativo com Feedback** 💬

**Funcionalidade:**
- Mostrar múltiplas interpretações
- Permitir escolha do usuário
- Aprendizado com feedback

**Interface proposta:**
```javascript
// Quando detecta ambiguidade
{
    ambiguous: true,
    options: [
        {
            formula: "(P ∧ Q) ∨ R",
            description: "João estuda E (Maria trabalha OU Pedro descansa)",
            probability: 0.7
        },
        {
            formula: "P ∧ (Q ∨ R)",
            description: "(João estuda E Maria trabalha) OU Pedro descansa",
            probability: 0.3
        }
    ],
    message: "Frase ambígua. Qual interpretação você quis dizer?"
}
```

**UI:**
```html
<div class="ambiguity-selector">
    <h3>⚠️ Múltiplas Interpretações Possíveis</h3>
    <div class="options">
        <button onclick="selectInterpretation(0)">
            Opção 1: (P ∧ Q) ∨ R
            <span class="description">...</span>
        </button>
        <button onclick="selectInterpretation(1)">
            Opção 2: P ∧ (Q ∨ R)
            <span class="description">...</span>
        </button>
    </div>
</div>
```

---

#### 6. **Suporte a Lógica de Predicados** 🎓

**Expansão:**
- Quantificadores universais (∀)
- Quantificadores existenciais (∃)
- Variáveis e predicados
- Maior expressividade

**Exemplo:**
```
Input: "Todos os humanos são mortais"
Output: ∀x (Humano(x) → Mortal(x))

Input: "Existe alguém que é feliz"
Output: ∃x Feliz(x)
```

**Implementação (conceitual):**
```javascript
class PredicateLogicTranslator extends LogicTranslator {
    translateQuantifiers(text) {
        const patterns = [
            {
                pattern: /todos?\s+(?:os?\s+)?(.+?)\s+(?:são|é)\s+(.+)/i,
                template: (subject, predicate) => 
                    `∀x (${subject}(x) → ${predicate}(x))`
            },
            {
                pattern: /existe(?:m)?\s+(.+?)\s+que\s+(?:são|é)\s+(.+)/i,
                template: (subject, predicate) => 
                    `∃x (${subject}(x) ∧ ${predicate}(x))`
            }
        ];
        
        // Processar padrões...
    }
}
```

---

#### 7. **Exportação de Resultados** 💾

**Funcionalidades:**
- Exportar para LaTeX
- Exportar para JSON
- Gerar imagem da fórmula
- Copiar para área de transferência

**Implementação:**
```javascript
class ExportManager {
    exportToLatex(formula, propositions) {
        let latex = '\\begin{align*}\n';
        latex += `  \\text{Fórmula: } & ${this.formulaToLatex(formula)} \\\\\n`;
        latex += '  \\text{Onde:} & \\\\\n';
        
        Object.entries(propositions).forEach(([var, meaning]) => {
            latex += `  ${var} &= \\text{"${meaning}"} \\\\\n`;
        });
        
        latex += '\\end{align*}';
        return latex;
    }
    
    formulaToLatex(formula) {
        return formula
            .replace(/∧/g, '\\land')
            .replace(/∨/g, '\\lor')
            .replace(/¬/g, '\\neg')
            .replace(/→/g, '\\rightarrow')
            .replace(/↔/g, '\\leftrightarrow');
    }
    
    exportToJSON(formula, propositions) {
        return JSON.stringify({
            formula,
            propositions,
            timestamp: new Date().toISOString(),
            version: '1.0.0'
        }, null, 2);
    }
}
```

---

#### 8. **Histórico de Traduções** 📜

**Funcionalidade:**
- Salvar traduções anteriores
- Buscar no histórico
- Favoritar traduções
- Estatísticas de uso

**Implementação:**
```javascript
class TranslationHistory {
    constructor() {
        this.history = this.loadFromStorage();
    }
    
    add(translation) {
        this.history.unshift({
            id: Date.now(),
            input: translation.input,
            output: translation.output,
            mode: translation.mode,
            timestamp: new Date(),
            favorite: false
        });
        
        // Manter apenas últimas 50
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
        
        this.saveToStorage();
    }
    
    search(query) {
        return this.history.filter(item => 
            item.input.includes(query) || 
            item.output.includes(query)
        );
    }
    
    getStatistics() {
        return {
            total: this.history.length,
            byMode: {
                'nl-to-cpc': this.history.filter(h => h.mode === 'nl-to-cpc').length,
                'cpc-to-nl': this.history.filter(h => h.mode === 'cpc-to-nl').length
            },
            favorites: this.history.filter(h => h.favorite).length
        };
    }
}
```

---

#### 9. **Temas e Personalização** 🎨

**Funcionalidades:**
- Modo escuro/claro
- Temas personalizados
- Tamanho de fonte ajustável
- Cores de operadores customizáveis

**Implementação:**
```javascript
const themes = {
    light: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        cardBg: 'rgba(255, 255, 255, 0.95)',
        text: '#333',
        accent: '#f5576c'
    },
    dark: {
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        cardBg: 'rgba(255, 255, 255, 0.1)',
        text: '#fff',
        accent: '#0f3460'
    },
    ocean: {
        background: 'linear-gradient(135deg, #2e3192 0%, #1bffff 100%)',
        cardBg: 'rgba(255, 255, 255, 0.15)',
        text: '#fff',
        accent: '#1bffff'
    }
};

function applyTheme(themeName) {
    const theme = themes[themeName];
    document.documentElement.style.setProperty('--bg-gradient', theme.background);
    document.documentElement.style.setProperty('--card-bg', theme.cardBg);
    document.documentElement.style.setProperty('--text-color', theme.text);
    document.documentElement.style.setProperty('--accent-color', theme.accent);
}
```

---

#### 10. **Modo Educacional** 📚

**Funcionalidades:**
- Explicação passo a passo
- Dicas contextuais
- Exercícios guiados
- Feedback pedagógico

**Exemplo:**
```javascript
class EducationalMode {
    explainTranslation(input, result) {
        return {
            steps: [
                {
                    title: "1. Normalização",
                    description: "Convertendo para minúsculas e removendo pontuação",
                    before: input,
                    after: result.normalized
                },
                {
                    title: "2. Identificação de Padrão",
                    description: "Detectado padrão de implicação: 'se X então Y'",
                    pattern: "se (.+?) então (.+)",
                    matched: true
                },
                {
                    title: "3. Extração de Proposições",
                    description: "Identificadas 2 proposições distintas",
                    propositions: result.propositions
                },
                {
                    title: "4. Construção da Fórmula",
                    description: "Aplicando operador de implicação (→)",
                    formula: result.formula
                }
            ],
            quiz: {
                question: "Qual conectivo representa 'se...então'?",
                options: ["∧", "∨", "→", "↔"],
                correct: 2
            }
        };
    }
}
```

---

## 📁 Estrutura do Projeto

```
tradutor-nl-cpc/
├── index.html          
├── css/
│   ├── style.css      
│   └── animations.css 
├── js/
│   ├── config.js      
│   ├── translator.js  
│   └── ui.js                  
└── README.md
```

### Descrição dos Componentes

#### 📄 `index.html`
Estrutura semântica da aplicação com:
- Header com título e descrição
- Seletor de modos
- Cards de entrada/saída
- Seções de proposições
- Botão de tradução
- Área de análise
- Informações de conectivos

#### 🎨 `css/style.css`
Estilos visuais incluindo:
- Reset CSS e variáveis
- Layout responsivo (Grid/Flexbox)
- Componentes (cards, botões, inputs)
- Efeitos glassmorphism
- Gradientes e sombras
- Media queries para mobile

#### ✨ `css/animations.css`
Animações separadas:
- `@keyframes` para cada animação
- Transições suaves
- Efeitos hover
- Animações de entrada

#### ⚙️ `js/config.js`
Configurações centralizadas:
- Exemplos pré-definidos
- Padrões de tradução
- Conectivos e operadores
- Mensagens do sistema
- Constantes da UI

#### 🧠 `js/translator.js`
Agente de IA com:
- Classe `LogicTranslator`
- Métodos `translateNLtoCPC()` e `translateCPCtoNL()`
- Padrões regex para matching
- Validação de fórmulas
- Análise de complexidade

#### 🎮 `js/ui.js`
Controle da interface:
- Gerenciamento de estado
- Event listeners
- Renderização dinâmica
- Criação de partículas
- Atualização de exemplos
- Feedback visual

---



---


## 🔗 Links Úteis

- **Repositório GitHub:** https://github.com/seu-usuario/tradutor-nl-cpc
- **Aplicação Online:** https://seu-usuario.github.io/tradutor-nl-cpc
- **Vídeo Demonstrativo:** https://youtube.com/watch?v=xxxxx

## 📚 Referências

1. **Lógica Matemática**
   - ALENCAR FILHO, E. *Iniciação à Lógica Matemática*. Nobel, 2002.
   - SILVA, F. S. C. *Lógica para Ciência da Computação*. Campus, 2006.

2. **Inteligência Artificial**
   - RUSSELL, S.; NORVIG, P. *Artificial Intelligence: A Modern Approach*. Pearson, 2020.
   - LUGER, G. F. *Artificial Intelligence: Structures and Strategies*. Addison Wesley, 2008.

3. **Processamento de Linguagem Natural**
   - JURAFSKY, D.; MARTIN, J. H. *Speech and Language Processing*. Pearson, 2023.
   - BIRD, S.; KLEIN, E.; LOPER, E. *Natural Language Processing with Python*. O'Reilly, 2009.

4. **Documentação Online**
   - MDN Web Docs: https://developer.mozilla.org
   - W3Schools: https://w3schools.com
   - CSS-Tricks: https://css-tricks.com

---
### Objetivos de Aprendizagem Alcançados

- ✅ Compreender fundamentos de lógica proposicional
- ✅ Implementar agente inteligente
- ✅ Aplicar técnicas de NLP básicas
- ✅ Desenvolver interface web moderna
- ✅ Trabalhar em equipe com versionamento
- ✅ Documentar projeto de forma profissional

---

---

## 🌟 Destaques

### O que torna este projeto especial:

1. **✨ Interface Moderna**
   - Design profissional com animações
   - Responsivo para todos dispositivos
   - Experiência de usuário intuitiva

2. **🧠 Inteligência Real**
   - Não é apenas um conversor simples
   - Detecta padrões complexos
   - Suporta múltiplas proposições

3. **📚 Documentação Completa**
   - README detalhado
   - Exemplos práticos
   - Análise de limitações

4. **🔧 Código Organizado**
   - Separação de responsabilidades
   - Arquitetura limpa
   - Fácil de manter e expandir

5. **🚀 Pronto para Produção**
   - Totalmente funcional
   - Hospedável facilmente
   - Sem dependências externas

---

## 🎉 Conclusão

Este projeto demonstra a aplicação prática de conceitos de Inteligência Artificial e Lógica Computacional na resolução de um problema real: a tradução entre linguagem natural e formal.

Através de uma interface moderna e intuitiva, o sistema permite que usuários sem conhecimento técnico possam trabalhar com lógica proposicional, facilitando o aprendizado e a aplicação desses conceitos.

As limitações identificadas abrem caminho para trabalhos futuros, incluindo integração com LLMs, suporte a lógica de predicados e funcionalidades educacionais avançadas.

---
