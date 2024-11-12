import React from "react";
import ReactDOM from "react-dom/client";
import AudioRecorder from "./components/AudioRecordingComponent";
import useAudioRecorder from "./hooks/useAudioRecorder";

const addAudioElement = (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const audio = document.createElement("audio");
  audio.src = url;
  audio.controls = true;
  document.body.appendChild(audio);
};

function AudioRecorderComp() {
  const { isRecording, stopRecording, cancelRecording, ...recordControls } = useAudioRecorder()

  return (<>
    <AudioRecorder 
      onRecordingComplete={(blob) => addAudioElement(blob)} 
      // audioTrackConstraints={{
      //   noiseSuppression: true,
      //   echoCancellation: true,
      // }} 
      onNotAllowedOrFound={(err) => console.table(err)}
      showVisualizer={true}
      recorderControls={{ isRecording, stopRecording, cancelRecording, ...recordControls}}
    />
    <button onClick={stopRecording}>Save</button>
    <button onClick={cancelRecording}>Cancel</button>
    </>
  )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AudioRecorderComp />
  </React.StrictMode>
);
