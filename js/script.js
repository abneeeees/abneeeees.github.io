const artCarousel = document.querySelector(".art-carousel");

if (artCarousel) {
  const artRow = artCarousel.querySelector(".art-row");
  const leftButton = artCarousel.querySelector(".art-nav-left");
  const rightButton = artCarousel.querySelector(".art-nav-right");

  const getScrollStep = () => {
    const firstCard = artRow.querySelector(".art-card");
    if (!firstCard) {
      return artRow.clientWidth;
    }

    const cardStyles = window.getComputedStyle(firstCard);
    const rowStyles = window.getComputedStyle(artRow);
    const cardWidth = firstCard.offsetWidth;
    const cardMargins =
      parseFloat(cardStyles.marginLeft) + parseFloat(cardStyles.marginRight);
    const gap = parseFloat(rowStyles.columnGap || rowStyles.gap || "0");

    return cardWidth + cardMargins + gap;
  };

  const updateArtNav = () => {
    const maxScrollLeft = artRow.scrollWidth - artRow.clientWidth;
    const isScrollable = maxScrollLeft > 4;
    const scrolledFromStart = artRow.scrollLeft > 4;
    const isAtEnd = artRow.scrollLeft >= maxScrollLeft - 4;

    leftButton.classList.toggle(
      "is-hidden",
      !isScrollable || !scrolledFromStart,
    );
    rightButton.classList.toggle("is-hidden", !isScrollable || isAtEnd);
  };

  const scrollArtRow = (direction) => {
    artRow.scrollBy({
      left: getScrollStep() * direction,
      behavior: "smooth",
    });
  };

  leftButton.addEventListener("click", () => scrollArtRow(-1));
  rightButton.addEventListener("click", () => scrollArtRow(1));
  artRow.addEventListener("scroll", updateArtNav, { passive: true });
  window.addEventListener("resize", updateArtNav);

  updateArtNav();
}

const upiLink = document.querySelector("#upi-link");

if (upiLink) {
  const upiStatus = document.querySelector("#upi-status");
  const upiId = upiLink.dataset.upiId || "";
  const upiDeepLink = upiLink.dataset.upiLink || upiLink.href;
  let statusResetTimeout;

  const showUpiStatus = (message) => {
    if (!upiStatus) {
      return;
    }

    window.clearTimeout(statusResetTimeout);
    upiStatus.textContent = message;
    statusResetTimeout = window.setTimeout(() => {
      upiStatus.textContent = "";
    }, 2200);
  };

  const copyText = async (text) => {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "absolute";
    helper.style.left = "-9999px";
    document.body.appendChild(helper);
    helper.select();

    const didCopy = document.execCommand("copy");
    document.body.removeChild(helper);

    if (!didCopy) {
      throw new Error("Copy failed");
    }
  };

  const isPhone = () => {
    const mobileAgent =
      /Android|iPhone|iPod|Windows Phone|BlackBerry|Opera Mini/i.test(
        navigator.userAgent,
      );
    const mobileScreen = window.matchMedia("(max-width: 768px)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    return mobileAgent || (mobileScreen && coarsePointer);
  };

  upiLink.addEventListener("click", async (event) => {
    if (isPhone()) {
      return;
    }

    event.preventDefault();

    try {
      await copyText(upiId);
      showUpiStatus("Copied");
    } catch {
      showUpiStatus("Copy failed");
    }
  });

  upiLink.addEventListener("keydown", async (event) => {
    if (event.key !== " ") {
      return;
    }

    event.preventDefault();

    if (isPhone()) {
      window.location.href = upiDeepLink;
      return;
    }

    try {
      await copyText(upiId);
      showUpiStatus("Copied");
    } catch {
      showUpiStatus("Copy failed");
    }
  });
}

// rotate image and music
const img = document.querySelector(".hero-pfp img");
const audio = document.getElementById("bg-music");

let isPlaying = false;

img.addEventListener("mouseenter", () => {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
  } else {
    audio.pause();
    isPlaying = false;
  }
});