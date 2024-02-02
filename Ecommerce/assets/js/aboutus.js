document.addEventListener("DOMContentLoaded", function () {
    let scrollButton = document.querySelector('.scrolltotop button');

    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        scrollButton.style.display = 'block';
      } else {
        scrollButton.style.display = 'none';
      }
    });

    scrollButton.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });