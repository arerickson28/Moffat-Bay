const slideshowContent = document.getElementById("slideshow-content");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");

const modalData = {
    krystalacres: {
      title: 'Krystal Acres Alpacas',
      description: '<p>Meet friendly alpacas and shop for alpaca goods.</p>',
      images: [
        { src: "/images/krystalAcresAlpacas/alpaca1.png", alt: "" },
        { src: "/images/krystalAcresAlpacas/alpaca2.jpg", alt: "" },
        { src: "/images/krystalAcresAlpacas/alpaca3.jpg", alt: "" },
        { src: "/images/krystalAcresAlpacas/alpaca4.jpg", alt: "" },
        { src: "/images/krystalAcresAlpacas/alpaca5.png", alt: "" },
        { src: "/images/krystalAcresAlpacas/alpaca6.png", alt: "" },
        { src: "/images/krystalAcresAlpacas/alpaca7.png", alt: "" },
        { src: "/images/krystalAcresAlpacas/alpaca8.jpg", alt: "" },
      ]
    },
    lavenderFarm: {
        title: 'Lavender Farm',
        description: '<p>Enjoy stunning fields of lavender and handcrafted goods.</p>',
        images: [
          { src: "/images/lavenderFarm/lavender1.jpg", alt: "" },
          { src: "/images/lavenderFarm/lavender2.jpg", alt: "" },
          { src: "/images/lavenderFarm/lavender3.jpg", alt: "" },
          { src: "/images/lavenderFarm/lavender4.jpg", alt: "" },
        ]
      },
      mountconstitution: {
        title: 'Mount Constitution',
        description: '<p>The highest point in the San Juans — epic views await!</p>',
        images: [
          { src: "/images/mountConstitution/mount1.jpg", alt: "" },
          { src: "/images/mountConstitution/mount2.jpg", alt: "" },
          { src: "/images/mountConstitution/mount3.jpeg", alt: "" },
          { src: "/images/mountConstitution/mount4.jpg", alt: "" },
          { src: "/images/mountConstitution/mount5.jpg", alt: "" },
          { src: "/images/mountConstitution/mount6.jpg", alt: "" },
          { src: "/images/mountConstitution/mount7.jpg", alt: "" },
          { src: "/images/mountConstitution/mount8.jpg", alt: "" },
          { src: "/images/mountConstitution/mount9.jpg", alt: "" },
          { src: "/images/mountConstitution/mount10.jpeg", alt: "" },
          { src: "/images/mountConstitution/mount11.jpg", alt: "" },
          { src: "/images/mountConstitution/mount12.jpg", alt: "" },
        ]
      },
      orcaWatching: {
        title: 'Watch Orcas at Lime Kiln Point',
        description: '<p>Lime Kiln is the best shore-based whale-watching spot in the country.</p>',
        images: [
          { src: "/images/orcas/orca1.jpg", alt: "" },
          { src: "/images/orcas/orca2.jpg", alt: "" },
          { src: "/images/orcas/orca3.jpg", alt: "" },
          { src: "/images/orcas/orca4.jpg", alt: "" },
          { src: "/images/orcas/orca5.jpg", alt: "" },
          { src: "/images/orcas/orca6.jpg", alt: "" },
          { src: "/images/orcas/orca7.jpg", alt: "" },
          { src: "/images/orcas/orca8.jpg", alt: "" },
          { src: "/images/orcas/orca9.jpg", alt: "" },
        ]
      },
      sculpturePark: {
        title: 'Sculpture Park',
        description: '<p>Explore art and nature together in this 20-acre open-air gallery.</p>',
        images: [
          { src: "/images/sculpturePark/sculp1.jpeg", alt: "" },
          { src: "/images/sculpturePark/sculp2.jpg", alt: "" },
          { src: "/images/sculpturePark/sculp3.jpg", alt: "" },
          { src: "/images/sculpturePark/sculp4.jpg", alt: "" },
          { src: "/images/sculpturePark/sculp5.jpg", alt: "" },
          { src: "/images/sculpturePark/sculp6.jpg", alt: "" },
          { src: "/images/sculpturePark/sculp7.jpg", alt: "" },
          { src: "/images/sculpturePark/sculp8.jpg", alt: "" },
          { src: "/images/sculpturePark/sculp9.jpg", alt: "" },
          { src: "/images/sculpturePark/sculp10.jpg", alt: "" },
          { src: "/images/sculpturePark/sculp11.jpg", alt: "" },
          { src: "/images/sculpturePark/sculp12.jpg", alt: "" },
          { src: "/images/sculpturePark/sculp13.jpeg", alt: "" },
        ]
      },
      sharkreef: {
        title: 'Shark Reef Sanctuary',
        description: '<p>Peaceful trail ending at rocky cliffs with seals and sea lions.</p>',
        images: [
          { src: "/images/sharkReef/reef1.jpg", alt: "" },
          { src: "/images/sharkReef/reef2.jpg", alt: "" },
          { src: "/images/sharkReef/reef3.jpg", alt: "" },
          { src: "/images/sharkReef/reef4.jpg", alt: "" },
          { src: "/images/sharkReef/reef5.jpg", alt: "" },
          { src: "/images/sharkReef/reef6.jpg", alt: "" },
          { src: "/images/sharkReef/reef7.jpg", alt: "" },
          { src: "/images/sharkReef/reef8.jpg", alt: "" },
          { src: "/images/sharkReef/reef9.jpg", alt: "" },
        ]
      },
      whalemuseum: {
        title: 'The Whale Museum',
        description: '<p>Learn about marine life and local orca populations in this educational museum.</p>',
        images: [
          { src: "/images/whaleMuseum/whale1.jpg", alt: "" },
          { src: "/images/whaleMuseum/whale2.jpg", alt: "" },
          { src: "/images/whaleMuseum/whale3.jpg", alt: "" },
          { src: "/images/whaleMuseum/whale4.jpg", alt: "" },
          { src: "/images/whaleMuseum/whale5.jpg", alt: "" },
          { src: "/images/whaleMuseum/whale6.jpg", alt: "" },
          { src: "/images/whaleMuseum/whale7.jpg", alt: "" },
        ]
      },
      juddcove: {
        title: 'Judd Cove Preserve',
        description: '<p>A serene spot for sunsets and nature watching.</p>',
        images: [
          { src: "/images/juddCove/cove1.jpeg", alt: "" },
          { src: "/images/juddCove/cove2.jpg", alt: "" },
          { src: "/images/juddCove/cove3.jpg", alt: "" },
          { src: "/images/juddCove/cove4.jpg", alt: "" },
          { src: "/images/juddCove/cove5.jpg", alt: "" },
          { src: "/images/juddCove/cove6.jpg", alt: "" },
          { src: "/images/juddCove/cove7.jpg", alt: "" },
          { src: "/images/juddCove/cove8.jpg", alt: "" },
        ]
      },
  };



function setupSlideshow() {
    let slides = document.querySelectorAll('.slides img');
    if (slides.length > 0) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[0].classList.add('active');
    }
  
    window.slideIndex = 0;
  
    window.changeSlide = function (n) {
      slides = document.querySelectorAll('.slides img'); // Refresh the list
  
      if (slides.length === 0) return;
  
      window.slideIndex += n;
      if (window.slideIndex >= slides.length) window.slideIndex = 0;
      if (window.slideIndex < 0) window.slideIndex = slides.length - 1;
  
      slides.forEach(slide => slide.classList.remove('active'));
      slides[window.slideIndex].classList.add('active');
    };
  
  }



function openModal(section) {
    const data = modalData[section];
    if (!data) return;
  
    // Set text content
    modalTitle.innerText = data.title;
    modalBody.innerHTML = data.description;
  
    // Clear and populate slideshow images
    slideshowContent.replaceChildren();
    data.images.forEach(({ src, alt }) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      slideshowContent.appendChild(img);
    });
  
    // Show the modal
     setupSlideshow();  // <-- Call it *after* images are in the DOM
     document.getElementById("myModal").style.display = "block";
  }

function closeModal() {
  document.getElementById('myModal').style.display = "none";
  slideshowContent.removeChild(slideshowContent.lastElementChild)
}

window.addEventListener("scroll", function () {
  const floatingText = document.querySelectorAll('.floating-text');
  floatingText.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
});
