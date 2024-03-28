from flask import Flask, send_from_directory, request, send_file
from werkzeug.utils import secure_filename
import os
import zipfile
from process import process
from flask_cors import CORS
from flask import redirect
app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'wav', 'mp3'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# @app.before_request
# def before_request():
    # if app.env == "development":
    #     return
    # if request.is_secure:
    #     url = request.url.replace("https://", "http://", 1)
    #     code = 301
    #     return redirect(url, code=code)
    # return

@app.route('/api')
def index():
    return send_from_directory('static', 'index.html')

CORS(app)
@app.route('/api/processExample', methods=['POST'])
def process_request2():
    audio_path = ""

    # if request.form.get('audio'):
    #     return 'No audio file provided'
    
    audio_file = request.form.get('audio')

    if(audio_file == ""):
        return 'No audio file provided'
    
    audio_path = "example/" + audio_file

    print("printing audio file and path")
    print(audio_file)
    print(audio_path)

    text_file = request.form.get('text')
    text_path = ""

    if text_file and text_file != "":
        text_path = "example/" + text_file
        try:
            with open(text_path, 'r') as file:
                text_content = file.read()
        except FileNotFoundError:
            print(f"Text file '{text_file}' not found")
            text_content = ""
    else:
        print("No text file provided")
        text_content = ""

    if audio_path != "":
        print("processing file")
        print(audio_path)
        zip_filename = process(audio_path, text_content)
        print("file processed")
    else:
        return send_file('utils/ERROR', as_attachment=True)
    
    if not zip_filename.endswith('zip'):
        print("returning error response")
        return send_file('utils/ERROR', as_attachment=True)
    else:
        print("returning response") 
        return send_file(zip_filename, as_attachment=True)
    


@app.route('/api/process', methods=['POST'])
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
        print("processing file")
        print(audio_path)
        zip_filename = process(audio_path, text_content)
        print("file processed")
    else:
        return send_file('utils/ERROR', as_attachment=True)
    
    if not zip_filename.endswith('zip'):
        print("returning error response")
        return send_file('utils/ERROR', as_attachment=True)
    else:
        print("returning response") 
        return send_file(zip_filename, as_attachment=True)

if __name__ == '__main__':
    # http
    app.run(port=5005)
    
