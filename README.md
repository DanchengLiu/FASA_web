## Section 1: understanding the project
This is web demo for a software called FASA. What FASA does is that it segments and aligns long audio with noisy transcription.
In the static folder, there is an index.html that defines everything about frontend. In the app.py, it has functions that deal with requests from frontend.
In the example folder, there are five audio file and transcription pairs.

The important logic behind this current version is that user will upload an audio file and some kinds of transcription either from the text box or upload. The audio file will be soted in uploads. Then a process function will be called, and output will be generated in the out folder. Flask sends the zipped output back to the user via download.

## Section2: improvements
A few things that could help:

1. UI is ugly. Some beautiful designs could help a lot!

2. I think providing some examples in case user does not have audio at hand could be really helpful. In this case, we need a selection box (or dropdown menu) for using examples. When the user wants to use example, we should use the cached example files instead. Note that process function takes audio file path as input, and extracted text (instead of text file) as input.

3. currently the audio could only be mp3 or wav. Maybe a conversion function would be really helpful in case people want to upload AAC file (from iOS)


## Installation:
```
pip install -r requirements.txt 


```
## Running backend

``` 
cd backend
gunicorn -w 1 app:app   -b 127.0.0.1:5005 
```
## Running frontend


First create and edit .env file. An example env.example is provided. Then run node.
```
cp .env.example .env
npm run start

```

