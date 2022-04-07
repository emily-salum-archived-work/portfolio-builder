

# Portfolio Builder - Porque?

Eu decidi criar o portfolio builder porque achei interessante a alternativa de
carregar os dados de uma página localmente e hostear estaticamente.

### No caso do portfolio, os benefícios seriam:

- Eu não preciso trabalhar com a estrutura do HTML para adicionar um novo projeto, adicionar um novo idioma ou tecnologia que aprendi.

- Posso construir versões alternativas do conteúdo do portfolio, adaptando para diferentes cenários (essa funcionalidade, apesar de possível, ainda não está eficiente no momento atual, a implementação está em andamento)

- Se eu tentasse resolver isso com JS, Teria bem mais js, utilizado simplesmente para carregar dados para dentro da página.  


## Funcionalidades atualmente
- Cria a página do portfolio usando ejs, oferecendo alta versatilidade de conteudo.
- Interface do Electron utilizada para gerenciar e visualizar a página.
- Arquivos HTML, CSS e JS sao minificados para melhor performance da pagina.
- github_init é chamado por meio da interface, para enviar a página para seu repositório.


# Externos

Chokidar -> Watchers para atualizar arquivos após mudanças.

# Conclusão

De certa forma, eu adicionei trabalho extra na criação do portfolio, e para as funcionalidades
valerem a pena realmente ainda faltam implementações cruciais. Apesar disso, estou orgulhosa
do resultado.  

