# 📚 Biblioteca de Tutoriais

Uma biblioteca moderna e responsiva para organizar e visualizar tutoriais em formato Markdown.

## 🚀 Como Funcionar

### Para desenvolvimento local:
1. **Use o Live Server do VS Code** (extensão Live Server)
2. Clique com o botão direito no `index.html` > "Open with Live Server"
3. A biblioteca carregará automaticamente os tutoriais da pasta `Tutoriais/`

### Para produção (GitHub Pages):
1. Faça push do repositório para o GitHub
2. Vá em Settings > Pages
3. Selecione source: "Deploy from a branch" > "main"
4. Acesse via: `https://[seu-usuario].github.io/[nome-do-repo]`

## 📁 Estrutura do Projeto

```
├── index.html                  # Aplicação principal
├── Tutoriais/                 # Pasta com seus tutoriais em Markdown
│   └── *.md                   # Arquivos de tutorial
├── descobrir-tutoriais.js     # Script para descobrir novos tutoriais
└── README.md                  # Este arquivo
```

## 📝 Adicionando Novos Tutoriais

### Método 1: Arquivos Locais (Recomendado)
1. Coloque arquivos `.md` na pasta `Tutoriais/`
2. Execute: `node descobrir-tutoriais.js`
3. Atualize o código no `index.html` conforme indicado
4. Commit e push para o GitHub

### Método 2: Interface Web
1. Clique no botão "+" na interface
2. Escreva o tutorial em Markdown
3. Salve (será armazenado no Firebase)

## 🎯 Recursos

- ✅ **Carregamento automático** de arquivos Markdown
- ✅ **Interface responsiva** com cartões visuais  
- ✅ **Syntax highlighting** para código
- ✅ **Botão copiar** em blocos de código
- ✅ **Emojis automáticos** baseados no conteúdo
- ✅ **Sidebar navegável**
- ✅ **Firebase integration** para novos tutoriais
- ✅ **Funciona offline** (tutoriais locais)

## 🔧 Por que usar Live Server?

O navegador não consegue carregar arquivos locais diretamente por questões de segurança (CORS policy). Você precisa de um servidor HTTP:

- **Live Server**: Para desenvolvimento local
- **GitHub Pages**: Para produção/compartilhamento
- **Netlify/Vercel**: Alternativas para hospedagem

## 💡 Dicas

1. **Títulos**: Use `# Título` no início dos arquivos .md
2. **Emojis**: O sistema detecta automaticamente baseado no conteúdo
3. **Descrições**: O primeiro parágrafo vira resumo no cartão
4. **Organização**: Mantenha arquivos na pasta `Tutoriais/`

## 🆘 Problemas Comuns

**"Não funcionou no navegador"**
- ❌ Não abra `index.html` diretamente no navegador
- ✅ Use Live Server ou GitHub Pages

**"Não apareceram os tutoriais"**
- Verifique se os arquivos estão em `Tutoriais/`
- Execute `node descobrir-tutoriais.js` e atualize o código
- Confira o console do navegador para erros

**"Firebase não funciona"**
- Normal! Os tutoriais locais funcionam independentemente
- Firebase é apenas para tutoriais criados via interface
