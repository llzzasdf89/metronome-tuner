/**
 * Encapsulate all the functions related to the Compare function
 */
function pitchCompare (pitchFrequency,currentTuning,stringIndex) {
  const frequencies = currentTuning.frequencies
    if (stringIndex < 0 || stringIndex === undefined) return;
    const currentStringFrequency = frequencies[stringIndex];
    const centsOffset = getCentsOffset(pitchFrequency,currentStringFrequency)
    return centsOffset
  }
  function getCentsOffset(pitchFrequency,FrequencyTobeCompared){
    return Math.round(1200 * Math.log2(pitchFrequency / FrequencyTobeCompared))
  }
export {pitchCompare}
  