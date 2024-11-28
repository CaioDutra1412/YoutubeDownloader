document.addEventListener("DOMContentLoaded", () => {
    const videoUrlInput = document.getElementById("videoUrl");
    const downloadTypeInputs = document.getElementsByName("downloadType");
    const startDownloadButton = document.getElementById("startDownload");
    const progressMessage = document.getElementById("progressMessage");
    const progressBar = document.getElementById("progressBar");

    // Função para iniciar o download
    startDownloadButton.addEventListener("click", () => {
        const videoUrl = videoUrlInput.value.trim();
        if (!videoUrl) {
            progressMessage.textContent = "Por favor, insira o link do vídeo.";
            return;
        }

        // Obter o tipo de download selecionado (mp3 ou mp4)
        let downloadType = "mp4"; // Valor padrão
        for (const input of downloadTypeInputs) {
            if (input.checked) {
                downloadType = input.value;
                break;
            }
        }

        // Exibir mensagem de progresso
        progressMessage.textContent = "Iniciando o download...";
        progressBar.style.width = "0%";  // Reseta a barra de progresso
        progressBar.textContent = "0%";  // Reseta o texto de progresso

        // Enviar a requisição para o backend Flask
        fetch('http://localhost:5000/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: videoUrl, downloadType: downloadType }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                progressMessage.textContent = `Erro: ${data.error}`;
            } else {
                progressMessage.textContent = `Download concluído! Arquivo salvo como ${data.filename}.`;
            }
        })
        .catch(error => {
            progressMessage.textContent = `Erro na requisição: ${error}`;
        });

        // Atualizar a barra de progresso periodicamente
        const updateProgressBar = setInterval(() => {
            fetch('http://localhost:5000/progress')
                .then(response => response.json())
                .then(data => {
                    const progress = data.progress;
                    progressBar.style.width = `${progress}%`;
                    progressBar.textContent = `${Math.round(progress)}%`;
                    if (progress >= 100) {
                        clearInterval(updateProgressBar);
                    }
                })
                .catch(error => {
                    console.error('Erro ao obter progresso:', error);
                });
        }, 500);  // Atualiza a cada 500ms
    });
});
