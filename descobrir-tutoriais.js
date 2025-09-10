// Script para descobrir automaticamente tutoriais na pasta Tutoriais
// Execute este script sempre que adicionar novos arquivos .md na pasta Tutoriais

const fs = require('fs');
const path = require('path');

function descobrirTutoriais() {
    const tutoriaisPath = path.join(__dirname, 'Tutoriais');
    
    if (!fs.existsSync(tutoriaisPath)) {
        console.log('❌ Pasta Tutoriais não encontrada!');
        return;
    }
    
    const arquivos = fs.readdirSync(tutoriaisPath);
    const arquivosMarkdown = arquivos.filter(arquivo => arquivo.endsWith('.md'));
    
    console.log('📚 Tutoriais encontrados:');
    arquivosMarkdown.forEach((arquivo, index) => {
        console.log(`${index + 1}. ${arquivo}`);
    });
    
    // Gerar código JavaScript para atualizar o index.html
    const listaArquivos = arquivosMarkdown.map(arquivo => `            '${arquivo}'`).join(',\n');
    
    console.log('\n🔧 Cole este código no index.html na função discoverTutorialFiles():');
    console.log('```javascript');
    console.log('        const knownTutorials = [');
    console.log(listaArquivos);
    console.log('        ];');
    console.log('```');
}

descobrirTutoriais();
