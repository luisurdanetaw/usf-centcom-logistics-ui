import {useEffect, useState} from "react";
import {Blurhash} from "react-blurhash";

type ImageComponentProps = {
    src: string;
}
export const ImageComponent: React.FC<ImageComponentProps>  = ({src}) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.src = src;
    }, [src]);

    return (
        <div>
            <div style={{
                display: imageLoaded ? 'none' : 'inline',
                marginBottom: '20px',
                marginLeft: '70px',
                filter: 'brightness(0.2)',
                maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))'
            }}>
                <Blurhash
                    hash={'LOF$hPWBL4ofS%jsxvWVofj[oJa|'}
                    height={150}
                    width={100}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                />
            </div>
            <img src={src} alt="" className={imageLoaded ? 'fade-in' : ''} style={{display: !imageLoaded ? 'none' : 'inline', marginBottom: '20px', width: '275px', height: '150px'}}/>
        </div>
    )
}