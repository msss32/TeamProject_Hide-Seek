jQuery(document).ready(function ($) {
  let modalTrigger = $(".cd-modal-trigger"),
    transitionLayer = $(".cd-transition-layer"),
    transitionBackground = transitionLayer.children(),
    modalWindow = $(".cd-modal");

  let frameProportion = 1.57,
    frames = 35,
    resize = false;

  setLayerDimensions();
  $(window).on("resize", function () {
    if (!resize) {
      resize = true;
      !window.requestAnimationFrame
        ? setTimeout(setLayerDimensions, 300)
        : window.requestAnimationFrame(setLayerDimensions);
    }
  });

  window.onload = async function (event) {
    event.preventDefault();
    transitionLayer.addClass("visible opening");
    let delay = $(".no-cssanimations").length > 0 ? 0 : 600;
    setTimeout(() => {
      modalWindow.addClass("visible");
    }, delay);
  };

  function setLayerDimensions() {
    let windowWidth = $(window).width(),
      windowHeight = $(window).height(),
      layerHeight,
      layerWidth;

    if (windowWidth / windowHeight > frameProportion) {
      layerWidth = windowWidth;
      layerHeight = layerWidth / frameProportion;
    } else {
      layerHeight = windowHeight * 1.2;
      layerWidth = layerHeight * frameProportion;
    }

    transitionBackground.css({
      width: layerWidth * frames + "px",
      height: layerHeight + "px",
    });

    resize = false;
  }
});
