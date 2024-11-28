import os
import yt_dlp
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

# Variáveis globais para controlar o progresso
progress = 0

# Função de progresso
def progress_hook(d):
    global progress
    if d['status'] == 'downloading':
        total_size = d.get('total_bytes', 0)
        downloaded = d.get('downloaded_bytes', 0)
        if total_size > 0:
            progress = (downloaded / total_size) * 100

# Função para retornar o progresso
@app.route('/progress', methods=['GET'])
def get_progress():
    return jsonify({'progress': progress})

# Rota para o download
@app.route('/download', methods=['POST'])
def download_video():
    url = request.json.get('url')
    download_type = request.json.get('downloadType', 'mp4')

    if not url:
        return jsonify({'error': 'Por favor, forneça um link válido.'}), 400

    if download_type == 'mp3':
        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': os.path.join('downloads', '%(title)s.%(ext)s'),
            'progress_hooks': [progress_hook],
        }
    else:
        ydl_opts = {
            'format': 'best',
            'outtmpl': os.path.join('downloads', '%(title)s.%(ext)s'),
            'progress_hooks': [progress_hook],
        }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info_dict)
            return jsonify({'message': f'Arquivo {filename} baixado com sucesso!', 'filename': filename}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    if not os.path.exists('downloads'):
        os.makedirs('downloads')
    app.run(debug=True)
