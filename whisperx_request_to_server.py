# CUDA_VISIBLE_DEVICES=1 python whisperx_request_to_server.py
import whisperx

from flask import Flask, request, jsonify, render_template 
from flask_cors import CORS

from tempfile import NamedTemporaryFile 

device = "cuda" 
compute_type = "float16" # change to "int8" if low on GPU mem (may reduce accuracy)
audio_model = whisperx.load_model("large-v3", device, compute_type=compute_type, language="en")
# model_a, metadata = whisperx.load_align_model(language_code="en", device=device)

def process_file(input_file):
    temp_file = NamedTemporaryFile().name 
    # Write wav data to the temporary file as bytes.
    with open(temp_file, 'w+b') as f:
        f.write(input_file.read())
    # https://github.com/m-bain/whisperX 
    audio = whisperx.load_audio(temp_file)
    result = audio_model.transcribe(audio, language="en") 

    try:
        return result['segments'][0]['text'].replace('"\'', '').strip()
    except IndexError:
        return ''

    # result = whisperx.align(result["segments"], model_a, metadata, audio, device, return_char_alignments=False)
    # return ' '.join([segment['text'].strip() for segment in result['segments']])

app = Flask(__name__, template_folder='./templates')
CORS(app)  # This will enable CORS for all routes
# CORS(app, origins=["http://localhost:9999"])

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/process_audio', methods=['POST'])
def process_audio():
    try: 
        if 'file' not in request.files:
            return render_template('display_error.html', data={'error': 'No file part'})
        
        file = request.files['file']
        processed_result = process_file(file) 
        return render_template('display_result.html', data={'result': processed_result})
    except Exception as e:
        return render_template('display_error.html', data={'error': str(e)})

@app.route('/transcribe', methods=['POST'])
def transcribe():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    result = process_file(file) 
    # print(f"Transcription: {result}")
    return jsonify({'result': result}) 

if __name__ == '__main__':
    app.run()