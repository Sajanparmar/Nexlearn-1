// Carousel functionality
const testimonials = [
    "The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive, and the interactive learning environment was engaging. I highly recommend it!",
    "This course helped me land my first job in web development. The projects were practical and the feedback was invaluable!",
    "I loved the hands-on approach and the supportive community. It made learning so much fun!"
  ];
  
  let currentTestimonialIndex = 0;
  
  document.querySelector('.carousel-controls button:first-child').addEventListener('click', () => {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    document.querySelector('.testimonial').textContent = testimonials[currentTestimonialIndex];
  });
  
  document.querySelector('.carousel-controls button:last-child').addEventListener('click', () => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    document.querySelector('.testimonial').textContent = testimonials[currentTestimonialIndex];
  });
  