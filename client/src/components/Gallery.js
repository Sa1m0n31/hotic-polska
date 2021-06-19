import React, {useEffect, useState} from 'react';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import skorka1 from '../static/img/skorka-1.jpg'
import skorka2 from '../static/img/skorka-2.jpg'
import boczne1 from '../static/img/boczne1.jpg'
import boczne2 from '../static/img/boczne2.jpg'
import boczne3 from '../static/img/boczne3.jpg'
import dolne1 from '../static/img/dolne1.jpg'
import dolne2 from '../static/img/dolne2.jpg'
import dolne3 from '../static/img/dolne3.jpg'
import btm1 from '../static/img/btm1.png';
import btm2 from '../static/img/btm2.png';
import btm3 from '../static/img/btm3.png';
import btm4 from '../static/img/galeria1.jpg'
import btm5 from '../static/img/galeria2.jpg'
import btm6 from '../static/img/galeria3.jpg'
import btm7 from '../static/img/galeria4.jpg'
import btm8 from '../static/img/galeria5.jpg'
import btm9 from '../static/img/galeria6.jpg'

const Gallery = ({openProp, toggle, start}) => {
    let [index, setIndex] = useState(start);
    let [open, setOpen] = useState(openProp);

    useEffect(() => {
        setOpen(openProp);
    });

    useEffect(() => {
        setIndex(start);
    }, [open]);

   const images = [
       skorka1, skorka2,
       boczne1, boczne2, boczne3,
       dolne1, dolne2, dolne3,
       btm1, btm2, btm3,
       btm4, btm5, btm6,
       btm7, btm8, btm9
   ];

   return <>{open && <Lightbox
        mainSrc={images[index]}
        nextSrc={images[index+1 % images.length]}
        prevSrc={images[index-1 % images.length]}
        onMovePrevRequest={() => {
                setIndex(index-1);
            }
        }
        onMoveNextRequest={() => {
                setIndex(index+1);
            }
        }
        onCloseRequest={() => {
            toggle(false);
        }
        }
   >
   </Lightbox>}
       </>
}

export default Gallery;
