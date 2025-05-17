const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const model = 'pierreguillou/gpt2-small-portuguese'; // Modelo GPT-2 em português

app.post('/chatbot', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const prompt = "Você é um assistente virtual útil. Responda em português de forma clara e concisa: ";
        const requestBody = {
            inputs: prompt + userMessage, // Adiciona o prompt à mensagem do usuário
            parameters: {
                max_new_tokens: 100, // Tamanho máximo da resposta
                temperature: 0.7,    // Respostas mais focadas
                top_k: 50,           // Limita a escolha de palavras
                top_p: 0.9,          // Usa apenas as palavras mais prováveis
                repetition_penalty: 1.5 // Evita repetições
            }
        };

        const apiUrl = `https://api-inference.huggingface.co/models/${model}`;

        // Aguarda o modelo carregar
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5 segundos

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiToken}`
            },
            body: JSON.stringify(requestBody)
        });

        // Verifica se a resposta da API é válida
        if (!response.ok) {
            const errorData = await response.text(); // Captura o corpo do erro como texto
            console.error('Erro na requisição:', errorData);
            return res.status(500).json({ error: 'Erro na requisição à API' });
        }

        // Tenta processar a resposta como JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            console.error('Erro ao processar a resposta da API:', error);
            throw new Error('Resposta da API inválida');
        }

        console.log('Resposta da API:', data);

        // Verifica se a resposta contém o campo "generated_text"
        if (!data || !data[0] || !data[0].generated_text) {
            return res.status(500).json({ error: 'Resposta da API inválida' });
        }

        // Limpa a resposta gerada
        const botResponse = cleanResponse(data[0].generated_text);

        // Retorna a resposta do modelo
        res.json({ response: botResponse });
    } catch (error) {
        console.error('Erro no backend:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

function cleanResponse(text) {
    // Remove caracteres de nova linha e espaços em excesso
    text = text.replace(/\n/g, ' ').trim();
    
    // Verifica se a resposta está em português
    const portugueseWords = ['oi', 'olá', 'como', 'você', 'bem', 'ajuda'];
    const isPortuguese = portugueseWords.some(word => text.toLowerCase().includes(word));
    
    if (!isPortuguese) {
        return 'Desculpe, não entendi. Pode reformular?';
    }

    // Retorna a resposta completa
    return text;
}
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));