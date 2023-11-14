import {
    WhatsappShareButton,
    WhatsappIcon,
  } from "react-share";

function Share (){
    const shareUrl = "https://spotify/happy-playlist"
    return(
        <div id="social-share">
            <WhatsappShareButton url={shareUrl}
            title={"I'm sharing with you my playlist of the day!"}
            separator={" "}>
                <WhatsappIcon size={40}/>
            </WhatsappShareButton>
        </div>
    )
}

export default  Share