Download de Vídeos do YouTube

Este é um projeto simples para baixar vídeos ou áudios de vídeos do YouTube diretamente no seu navegador. O arquivo baixado será salvo automaticamente na pasta Downloads dentro do diretório do projeto.

Funcionalidades:

Inserir o link de um vídeo do YouTube.
Escolher entre baixar o vídeo completo (MP4) ou apenas o áudio (WEBM).
Exibir o progresso do download em tempo real.

Requisitos:

Backend: Python 3.7+ instalado.
Instalar a biblioteca yt-dlp para lidar com o download do conteúdo. Você pode instalá-la executando:

pip install yt-dlp flask

Como Executar:

Clonar o repositório ou baixar os arquivos: Certifique-se de que os arquivos index.html, styles.css, script.js e app.py estão no mesmo diretório.

Iniciar o servidor backend: Navegue até o diretório do projeto e execute o seguinte comando no terminal:

python app.py

O servidor estará disponível em http://127.0.0.1:5000.

Abrir o frontend: Abra o arquivo index.html em seu navegador (clique duas vezes nele ou arraste para a barra de endereços do navegador).

Estrutura do Projeto
📂 Projeto
├── app.py          # Backend responsável pelo download.
├── index.html      # Frontend em HTML.
├── styles.css      # Estilização do frontend.
├── script.js       # Lógica em JavaScript para interações no frontend.
├── 📂 Downloads     # Pasta onde os arquivos serão salvos.
└── README.md       # Instruções do projeto.

Tecnologias Utilizadas:

Frontend: HTML, CSS e JavaScript.

Backend: Python com Flask e yt-dlp.

Observações:

O arquivo baixado será salvo na pasta Downloads dentro do diretório do projeto.
Para o backend funcionar, certifique-se de que o Python está instalado e que as dependências mencionadas estão configuradas.

Contribuição
Sinta-se à vontade para melhorar o projeto! Sugestões, correções e novas funcionalidades são bem-vindas.

Exemplo de Comando para Iniciar

python app.py

Agora é só aproveitar e baixar seus vídeos! 🎥🎵