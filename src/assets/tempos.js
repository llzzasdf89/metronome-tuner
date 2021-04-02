const tempos = {
    notesInQueue:[],
    lookahead:25,
    scheduleAheadTime:0.1,
    nextNoteTime:0,
    audioCtx:null,
    bpmValue:0,
    currentBeat:0,
    intervalID:null,
    noteNum:4,
    beatNum:4,
    circleObj:[{
        id:0,
        isActive:false
      },{
        id:1,
        isActive:false
      },{
        id:2,
        isActive:false
      },{
        id:3,
        isActive:false
      }],
    mapBpmToName:function(tempo = 40){
                if(tempo < 24) return 'Larghissimo';
                if(tempo <45) return 'Grave';
                if(tempo <60) return 'Largo';
                if(tempo < 66)return 'Larghetto';
                if(tempo < 76)return 'Adagio';
                if(tempo < 108)return 'Andante';
                if(tempo < 120)return 'Moderato';
                if(tempo < 156)return 'Allegro';
                if(tempo < 200) return 'Presto';
                return "Prestissimo"
    },
    mapBartoNote:function(bar,currentNote){
        bar = parseInt(bar)
        switch(bar){
            case 4: 
            if(currentNote === "quarter") return  1
            else if(currentNote === "eighth") return 1/2
            else return 1/4
            case 8:
                if(currentNote === "quarter") return 1/4
                else if(currentNote === "eighth") return 1
                else return 1/2
            case 16:
                if(currentNote === "quarter") return  1/4
                else if(currentNote === "eighth") return 1/2
                else return 1    
        }
    },
    scheduler:function(){
        while(this.nextNoteTime < this.audioCtx.currentTime + this.scheduleAheadTime){
            this.scheduleNote(this.currentBeat,this.nextNoteTime)
            this.nextNote()
        }
    },
    scheduleNote:function(beatNumber, time){
        this.notesInQueue.push({note:beatNumber,time})
        const osc = this.audioCtx.createOscillator();
        const envelope = this.audioCtx.createGain()
        osc.frequency.value = (beatNumber % this.beatNum ==0)?1000:800 //stress the first beat
        envelope.gain.value = 1
        envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
        osc.connect(envelope);
        envelope.connect(this.audioCtx.destination);
        osc.start(time);
        osc.stop(time + 0.03)
    },
    nextNote:function()
    {
        // Advance current note and time by a quarter note (crotchet if you're posh)
        const secondsPerBeat = 60.0 / this.bpmValue; // Notice this picks up the CURRENT tempo value to calculate beat length.
        this.nextNoteTime += secondsPerBeat; // Add beat length to last beat time
        this.countBeat()
    },
    countBeat:function(){
        //this function is used to control the display of circle and count the beat which is playing
        /**
         * Notice: The meaning of 'currentBeat' is used to tell user which beat he is currently in.
         * On the other hand, this variable is corresponding to the index of circleObj, which is starting from 0 instead of 1.
         * For example, in the user interface, the first circle will turn black if currentBeat values 0.
         */

        /**'beatNum' means how many beats per bar */
        //if there is only one beat in a bar, we need to control only 1 circle displaying
        if(this.beatNum === 1) return this.circleObj[this.currentBeat].isActive = true

        if(this.currentBeat === 0){
            this.circleObj[this.beatNum - 1].isActive = false 
            this.circleObj[this.currentBeat].isActive = true
            ++this.currentBeat
            //if currentBeat is 0, then its previous beat should be beatNum - 1. switch it off.
        } 
        else if(this.currentBeat >= this.beatNum - 1){
            this.circleObj[this.currentBeat-1].isActive = false
            this.circleObj[this.currentBeat].isActive = true
            this.currentBeat = 0
            //if currentBeat is approaching upper boundary of array, set it to the first beat, which is 0
        }
        else {
            this.circleObj[this.currentBeat-1].isActive = false
            this.circleObj[this.currentBeat].isActive = true
            ++this.currentBeat
            //if currentBeat is not approaching boundary, then we directly + 1
        }

      },
}
export default tempos