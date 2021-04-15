
import E2_6th from '@/assets/media/E_6th.wav'
import A2_5th from '@/assets/media/A_5th.wav'
import D3_4th from '@/assets/media/D_4th.wav'
import G3_3rd from '@/assets/media/G_3th.wav'
import B3_2nd from '@/assets/media/B_2nd.wav'
import E4_1st from '@/assets/media/E_1st.wav'
import D2_6th from '@/assets/media/D2_6th.wav'
import C2_6th from '@/assets/media/C2_6th.wav'
import G2_5th from '@/assets/media/G2_5th.wav'
import C3_4th from '@/assets/media/C3_4th.wav'
import F3_3rd from '@/assets/media/F3_3rd.wav'
import A3_2nd from '@/assets/media/A3_2nd.wav'
import D4_1st from '@/assets/media/D4_1st.wav'
const  tunningObjs = [{
    name:"Standard",
    strings:['E','A','D','G','B','E'],
    fileSrc:[E2_6th,A2_5th, D3_4th,G3_3rd ,B3_2nd,E4_1st],
    MIDInotes:['E2','A2','D3','G3','B3','E4'],
    frequencies:[82.41,110.00,146.83,196.00,246.94,329.63]
},
{
    name:"Drop D",
    strings:['D', 'A', 'D' ,'G', 'B', 'E'],
    fileSrc:[D2_6th,A2_5th, D3_4th,G3_3rd,B3_2nd,E4_1st],
    MIDInotes:['D2','A2','D3','G3','B3','E4'],
    frequencies:[73.42,110.00,146.83,196.00,246.94,329.63]
},

{
    name:"Drop C",
    strings:['C', 'G', 'C', 'F', 'A', 'D'],
    MIDInotes:['C2','G2','C3','F3','A3','D4'],
    fileSrc:[C2_6th,G2_5th, C3_4th,F3_3rd,A3_2nd,D4_1st],
    frequencies:[65.41,98.00,130.81,174.61,220.00,293.66]
}
]
export default tunningObjs