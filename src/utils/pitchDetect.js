import {PitchDetector} from 'pitchy'
let mediaDevicePromise
let updatePitchParameters = null
function updatePitchHandler (){
    try{
        mediaDevicePromise =  requestMicrophonePermission()
       }catch(err) {
         console.error("request microphone permission error, please check the permission issue or refresh the webpage")
       }
       if(!mediaDevicePromise) return
       mediaDevicePromise.then((stream)=>{      
         const res = initalizeAudioContextAndAnalyserNode(stream)
         const pitchDetector  = initatePitchDetector(res.analyserNode)
         updatePitchParameters = {
           sampleRate : res.audioContext.sampleRate,
           detector:pitchDetector.detector,
           input:pitchDetector.input,
           analyserNode:res.analyserNode
         }
         for(let i in updatePitchParameters) if(!updatePitchParameters[i]) return  console.error("initate updatepitchParameters error, please check " + i)
         console.log('updatePitchParameters lauched successfully, prepared to detect pitch')
         })   
}
function requestMicrophonePermission(){
    const mediaDevicePromise = navigator.mediaDevices.getUserMedia({
    audio: true,
    echoCancellation: true,
    noiseSuppression: true})
    return mediaDevicePromise
// ask for the  microphone permission from user,if successed, a promise object will be returned 
}
function initalizeAudioContextAndAnalyserNode(stream){
  const audioContext = window.AudioContext || window.webkitAudioContext
  const audioCtx = new audioContext()
  const audioSourceNode = audioCtx.createMediaStreamSource(stream);
  const analyserNode = audioCtx.createAnalyser()
  analyserNode.fftSize = 1024
  audioSourceNode.connect(analyserNode)
  return {
    audioContext:audioCtx,
    analyserNode
    }
}
function initatePitchDetector(analyserNode){
    const detector = PitchDetector.forFloat32Array(analyserNode.fftSize); //forFloat32Array is an constructor function of pitchDector, for details please check documentation of pitchy.js
    const input = new Float32Array(detector.inputLength);
   return {
     input,
     detector
   }
}
updatePitchHandler()
export {updatePitchParameters}