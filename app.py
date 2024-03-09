from flask import Flask, send_from_directory, request, send_file
from werkzeug.utils import secure_filename
import os
import zipfile
from process import process
app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'wav', 'mp3'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/process', methods=['POST'])
def process_request():
    audio_path = ""
    
    if 'audio' not in request.files:
        return 'No audio file provided'
    audio_file = request.files['audio']
    if audio_file.filename == '':
        return 'No selected audio file'
    
    ### HERE: it checks whether the audio file is allowed
    if audio_file and allowed_file(audio_file.filename):
        audio_filename = secure_filename(audio_file.filename)
        audio_path = os.path.join(app.config['UPLOAD_FOLDER'], audio_filename)
        audio_file.save(audio_path)
    else:
        # might add something here to convert audio type
        pass
    
    text_content = request.form.get('text', '')

    if 'textFile' in request.files:
        text_file = request.files['textFile']
        if text_file.filename != '':
            text_filename = secure_filename(text_file.filename)
            text_path = os.path.join(app.config['UPLOAD_FOLDER'], text_filename)
            text_file.save(text_path)
            with open(text_path, 'r') as file:
                text_content += file.read()
                
    if audio_path != "":
        zip_filename = process(audio_path, text_content)
    else:
        return send_file('utils/ERROR', as_attachment=True)
    
    if not zip_filename.endswith('zip'):
        return send_file('utils/ERROR', as_attachment=True)
    else:
        return send_file(zip_filename, as_attachment=True)

if __name__ == '__main__':
    app.run(host='alcor.cse.buffalo.edu',port=5000,debug=False)
