// Every photo ships in two sizes: an 800px "thumb" for phones and cards, and
// the full-size original for large screens. Use `responsive()` to get src/srcSet.
import PalmCourt from "../images/Slider/01.jpg";
import PalmCourtSm from "../images/thumbs/slider-01.jpg";
import Onyx from "../images/Slider/02.jpg";
import OnyxSm from "../images/thumbs/slider-02.jpg";
import MapleLane from "../images/Slider/03.jpg";
import MapleLaneSm from "../images/thumbs/slider-03.jpg";
import Evergreen from "../images/Slider/04.jpg";
import EvergreenSm from "../images/thumbs/slider-04.jpg";
import Staircase from "../images/01.jpg";
import StaircaseSm from "../images/thumbs/01.jpg";
import Loft from "../images/02.jpg";
import LoftSm from "../images/thumbs/02.jpg";
import Azure from "../images/03.jpg";
import AzureSm from "../images/thumbs/03.jpg";
import Kitchen from "../images/04.jpg";
import KitchenSm from "../images/thumbs/04.jpg";
import Skyline from "../images/05.jpg";
import SkylineSm from "../images/thumbs/05.jpg";

const image = (src, thumb, width) => ({ src, thumb, width });

export const images = {
  palmCourt: image(PalmCourt, PalmCourtSm, 1920),
  onyx: image(Onyx, OnyxSm, 1920),
  mapleLane: image(MapleLane, MapleLaneSm, 1920),
  evergreen: image(Evergreen, EvergreenSm, 1920),
  staircase: image(Staircase, StaircaseSm, 1067),
  loft: image(Loft, LoftSm, 1600),
  azure: image(Azure, AzureSm, 1600),
  kitchen: image(Kitchen, KitchenSm, 1600),
  skyline: image(Skyline, SkylineSm, 1280),
};

// `sizes` describes how wide the image is rendered, so the browser can pick
// the smallest file that still looks sharp.
export const responsive = (img, sizes = "100vw") => ({
  src: img.src,
  srcSet: `${img.thumb} 800w, ${img.src} ${img.width}w`,
  sizes,
});
