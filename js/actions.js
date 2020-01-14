"use strict";

renderHeaderNav();

renderAchievements( achievements );

renderSkills( skills );

renderGallery( '#latest_works_gallery', works );

renderServices( '#services_blocks', services );

renderJobs( '#job_history_blocks', jobHistory );

window.addEventListener('scroll', updateOnScroll);

renderTestimonials('#testimonials_block', testimonials);

autoCounter();