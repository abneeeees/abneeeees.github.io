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
