import os
import shutil
import numpy as np


import torch
import pandas as pd
import whisper
import torchaudio

from pydub import AudioSegment
import re
import heapq
import math

import whisperx

import gc 

from utils.longest_matching import longest_fuzzy_matching

import re
from whisper.normalizers import EnglishTextNormalizer
import jiwer
from pydub import AudioSegment

def process(audio_path, text, wer_keep_threshold=0.3,wer_check_threshold=0.1):
    # Your processing function here
    # This is just a placeholder function
    # Replace it with your actual processing logic
    out_name = os.path.splitext(os.path.basename(audio_path))[0]
    segment_root = os.path.join('out', out_name)
    if os.path.exists(segment_root):
        shutil.rmtree(segment_root)
    os.makedirs(segment_root)
    
    check_folder = os.path.join(segment_root, 'inspection')
    os.makedirs(check_folder)
    FLAG = False
    model = whisperx.load_model('large-v2', 'cuda', compute_type="float16")
    result = {'segments': []}
    try:   
        audio = whisperx.load_audio(audio_path)
        result = model.transcribe(audio, batch_size=1)
        model_a, metadata = whisperx.load_align_model(language_code=result["language"], device='cuda')
        result = whisperx.align(result["segments"], model_a, metadata, audio,'cuda', return_char_alignments=False)
    except:
        FLAG = True
        
    sentence_level_alignment = []
    
    for segment in result['segments']:
        sentence_level_alignment.append(segment['text']+'\t'+str(segment['start'])+'\t'+str(segment['end']))
        
    ### Start segmentation
    normalizer = EnglishTextNormalizer()
    try:
        sound = AudioSegment.from_mp3(audio_path)
    except:
        FLAG = True
        print(str(audio_path) +" has problem!")
        
    if FLAG:
        print("returning from error in audio file")
        return "ERROR with audio file!"
    
    word_level_separation_gt = text

    # regex to remove multiple space
    word_level_separation_gt = re.sub('\n', ' ', word_level_separation_gt)
    word_level_separation_gt = re.sub(' +', ' ', word_level_separation_gt)
    word_level_separation_gt = normalizer(word_level_separation_gt)
    word_level_separation_gt = word_level_separation_gt.split(' ')
    
    for l in sentence_level_alignment:
        info = l.strip().split('\t')
        prediction_segment = normalizer(info[0]).split(' ')

        best_index, best_length = longest_fuzzy_matching(prediction_segment,word_level_separation_gt)
        matching = word_level_separation_gt[best_index:best_index + best_length]
        
        if len(prediction_segment)>0 and len(matching)>0:
            prediction_segment = ' '.join(prediction_segment)
            matching = ' '.join(matching)
            flag=True
            try:
                WER_LINE = jiwer.wer(matching, prediction_segment)
                #print(prediction_segment+'\t'+str(WER_LINE))
            except:
                flag=False
            if flag and WER_LINE < wer_keep_threshold:
                if WER_LINE < wer_check_threshold:
                    fd = open(os.path.join(segment_root, info[1]+'_'+info[2]+'.txt'), "w")
                    fd.write(matching)
                    fd.close()
                    audio_seg = sound[float(info[1])*1000:float(info[2])*1000]
                    audio_file = audio_seg.export(os.path.join(segment_root, info[1]+'_'+info[2]+'.mp3'), format="mp3") 
                    
                    audio_file.close()
                else:
                    fd = open(os.path.join(check_folder, info[1]+'_'+info[2]+'.txt'), "w")
                    fd.write(matching+'\n')
                    fd.write(prediction_segment+'\n')
                    fd.close()            
                    audio_seg = sound[float(info[1])*1000:float(info[2])*1000]
                    audio_file = audio_seg.export(os.path.join(check_folder, info[1]+'_'+info[2]+'.mp3'), format="mp3") 
                    
                    audio_file.close()  

    shutil.make_archive(out_name, 'zip', segment_root)
    shutil.move(out_name+'.zip', 'out/'+out_name+'.zip') 
    # os.remove(audio_path)
    del model
    return 'out/'+out_name+'.zip'