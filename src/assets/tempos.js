const tempos = {
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
    }
}
export default tempos