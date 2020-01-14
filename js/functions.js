"use strict";

function updateOnScroll() {
    updateBackToTop();
    updateSkills();
}

function updateBackToTop() {
    const height = window.scrollY;
    const screenHeight = window.innerHeight;
    const backToTopHeightLimit = 0.5;
    const backToTopDOM = document.querySelector('.back-to-top');
    
    if ( height >= backToTopHeightLimit * screenHeight ) {
        backToTopDOM.classList.add('show');
    } else {
        backToTopDOM.classList.remove('show');
    }
}

function updateSkills() {
    const height = window.scrollY;
    const screenHeight = window.innerHeight;
    const progressBars = document.querySelectorAll('.progress-bar');
    
    for ( let i=0; i<progressBars.length; i++ ) {
        const bar = progressBars[i];
        const barPosition = bar.offsetTop;
        
        if ( height + screenHeight > barPosition ) {
            bar.classList.add('animate');
        }
    }
}

function renderHeaderNav() {
    const sections = document.querySelectorAll('[data-nav]');
    let HTML = '';

    for ( let i=0; i<sections.length; i++ ) {
        const link = sections[i].id;
        HTML += `<a href="${link.indexOf('https://') === 0 ? '' : '#'}${link}">${sections[i].dataset.nav}</a>`;
    }

    return document.querySelector('header nav').innerHTML = HTML;
}

function renderAchievements( data ) {
    const maxBlocks = 4;
    let createdBlocks = 0;
    let HTML = '';

    if ( !Array.isArray(data) ) {
        return console.error('ERROR: negaliu sugeneruoti "Achievements" sekcijos, del blogo formato duomenu.');
    }
    if ( data.length === 0 ) {
        return console.error('ERROR: negaliu sugeneruoti "Achievements" sekcijos, del tuscio saraso.');
    }

    // sugeneruojame HTML
    for ( let i=0; i<data.length; i++ ) {
        if ( createdBlocks === maxBlocks ) {
            break;
        }
        const block = data[i];

        // tikrinu, ar tai objektas
        if ( typeof(block) !== 'object' ||
             block === null ||
             Array.isArray(block) ) {
            continue;
        }

        if ( (block.icon || (typeof(block.icon) === 'string' && block.icon.length > 0)) &&
             (block.number || block.number > 0) &&
             (block.title || (typeof(block.title) === 'string' && block.title.length > 0)) ) {
            HTML += `<div class="col-3 col-sm-6 col-xs-12 block">
                        <i class="fa fa-${block.icon}"></i>
                        <span>${block.number}</span>
                        <h4>${block.title}</h4>
                    </div>`;
            
            createdBlocks++;
        }
    }
    
    // istatome HTML i reikiama vieta
    if ( createdBlocks === 0 ) {
        document.querySelector('#achievements').remove();
    } else {
        document.querySelector('#achievements > .row').innerHTML = HTML;
    }

    return;
}

function renderSkills( data ) {
    let HTML = '';

    if ( !Array.isArray(data) ) {
        return console.error('ERROR: negaliu sugeneruoti "Skills" sekcijos, del blogo formato duomenu.');
    }
    if ( data.length === 0 ) {
        return console.error('ERROR: negaliu sugeneruoti "Skills" sekcijos, del tuscio saraso.');
    }

    for ( let i=0; i<data.length; i++ ) {
        const skill = data[i];
        HTML += `<div class="progress-bar">
                    <div class="texts">
                        <div class="title">${skill.title}</div>
                        <div class="value">${skill.value}%</div>
                    </div>
                    <div class="bar">
                        <div class="value" style="width: ${skill.value}%;">
                            <div class="loading"></div>
                        </div>
                    </div>
                </div>`;
    }
    
    document.querySelector('#skills_progress_bars').innerHTML = HTML;

    return;
}

function renderGallery( target, data ) {
    let HTML = '';
    const targetDOM = document.querySelector(target);

    // target vietos validavimas
    if ( typeof(target) !== 'string' ) {
        return console.error('ERROR: vietos selectorius turi buti tekstinio tipo.');
    }
    if ( target.length === 0 ) {
        return console.error('ERROR: vietos selectorius negali buti tuscias tekstas.');
    }
    if ( targetDOM === null ) {
        return console.error('ERROR: pagal pateikta selectoriu norima vieta/elementas nerastas.');
    }

    // pradinis duomenu validavimas
    if ( !Array.isArray(data) ) {
        return console.error('ERROR: negaliu sugeneruoti "Gallery" sekcijos, del blogo formato duomenu.');
    }
    if ( data.length === 0 ) {
        return console.error('ERROR: negaliu sugeneruoti "Gallery" sekcijos, del tuscio saraso.');
    }

    // viska apjungiame i galutine galerija
    HTML = `<div class="gallery">
                <div class="gallery-filter">
                    ${ generateGalleryFilter( data ) }
                </div>
                <div class="gallery-list">
                    ${ generateGalleryList( data ) }
                </div>
            </div>`;
    
    targetDOM.innerHTML = HTML;

    // sudeti eventListener ant filtravimo elementu
    const filterItems = targetDOM.querySelectorAll('.filter-item');
    const galleryItems = targetDOM.querySelectorAll('.gallery-item');
    
    for ( let i=0; i<filterItems.length; i++ ) {
        // pridedam event listenerius
        filterItems[i].addEventListener('click', (event) => {
            // suzinome kas buvo paspaustas
            const findWhat = event.target.textContent;

            if ( findWhat === 'All categories' ) {
                // ieskome kuriuose gallery-item elementuose yra paminetas findWhat
                for ( let w=0; w<galleryItems.length; w++ ) {
                    const work = galleryItems[w];
                    work.classList.remove('hide');
                }
            } else {
                // ieskome kuriuose gallery-item elementuose yra paminetas findWhat
                for ( let w=0; w<galleryItems.length; w++ ) {
                    const work = galleryItems[w];
                    const categories = work.dataset.categories;
    
                    if ( categories.indexOf(findWhat) >= 0 ) {
                        work.classList.remove('hide');
                    } else {
                        work.classList.add('hide');
                    }
                }
            }
        })
    }

    return;
}

function generateGalleryFilter( data ) {
    let HTML = '<div class="filter-item active">All categories</div>';
    let list = [];
    let uniqueList = [];

    // surenkame visas kategorijas i viena sarasa
    for ( let i=0; i<data.length; i++ ) {
        const subList = data[i].category;

        // atrenkame ir paliekame tik unikalias kategorijas is surinkto saraso
        for ( let i=0; i<subList.length; i++ ) {
            const category = subList[i].toLowerCase();

            if ( uniqueList.indexOf(category) === -1 ) {
                uniqueList.push(category);
            }
        }
    }

    // for ( let i=0; i<data.length; i++ ) {
    //     list = list.concat(data[i].category);
    // }
    
    // uniqueList = list.filter( (cat, i) => list.indexOf(cat) === i );

    // sukonstruojame HTML
    for ( let i=0; i<uniqueList.length; i++ ) {
        HTML += `<div class="filter-item">${uniqueList[i]}</div>`;
    }
    
    return HTML;
}

function generateGalleryList( data ) {
    let HTML = '';

    for ( let i=0; i<data.length; i++ ) {
        const work = data[i];

        let catHTML = '';
        for ( let c=0; c<work.category.length; c++ ) {
            catHTML += `<span class="cat">${work.category[c]}</span>`;
        }
        
        HTML += `<div class="gallery-item"
                    data-categories="${(''+work.category).toLowerCase()}">
                    <img src="./img/works/${work.img}">
                    <div class="texts">
                        <span class="title">${work.title}</span>
                        <div class="categories">
                            ${catHTML}
                        </div>
                    </div>
                </div>`;
    }

    return HTML;
}

function renderServices( target, data ) {
    let HTML = '';

    for ( let i=0; i<data.length; i++ ) {
        const service = data[i];
        HTML += `<div class="col-3 col-sm-6 col-xs-12 block">
                    <i class="fa fa-${service.icon}"></i>
                    <h4>${service.title}</h4>
                    <span>${service.description}</span>
                </div>`;
    }

    document.querySelector(target).innerHTML = HTML;

    return;
}

function renderJobs( target, data ) {
    let HTML = '';

    for ( let i=0; i<data.length; i++ ) {
        HTML += generateJobBlock( data[i] );
    }

    document.querySelector(target).innerHTML = HTML;
    
    return;
}

function generateJobBlock( job ) {
    let durationFrom = jobDateFormat( job.duration.from );
    let durationTill = job.duration.till ? jobDateFormat( job.duration.till ) : 'Present';

    return `<div class="job-item">
                <div class="texts">
                    <h4 class="job-title">${job.title}</h4>
                    <div class="location">${job.location.city}, ${job.location.country}</div>
                </div>
                <div class="btn">
                    <span>${durationFrom}</span>
                    <span>to</span>
                    <span>${durationTill}</span>
                </div>
                <p>${job.description}</p>
            </div>`;
}

function jobDateFormat( date ) {
    const d = new Date(date.year, date.month-1, 1); 
    const year = date.year % 100;
    const month = d.toLocaleString('default', { month: 'short' });
    
    return `${month}'${year === 0 ? '00' : year}`;
}

function renderTestimonials( target, data ) {
    const DOM = document.querySelector(target);
    let testimonialsHTML = '';
    
    // atnaujiname duomenis: klonai pirmas gale ir paskutinis priekyje
    // data.push(data[0]);
    // data.unshift(data[data.length-2]);
    data = [ data[data.length-1], ...data, data[0] ];
    const middleIndex = Math.floor(data.length / 2);

    for ( let i=0; i<data.length; i++ ) {
        testimonialsHTML += generateTestimonial(data[i]);
    }

    const HTML = `<div class="testimonials" data-index="${middleIndex}">
                    <div class="list"
                        style="width: ${data.length}00%;
                            margin-left: -${middleIndex}00%;">${testimonialsHTML}</div>
                    <div class="controls">
                        <i class="fa fa-angle-left"></i>
                        <div class="line">
                            <div class="bar"
                                style="margin-left: ${(middleIndex - 1) * 100 / (data.length - 2)}%;
                                    width: ${100 / (data.length - 2)}%;"></div>
                        </div>
                        <i class="fa fa-angle-right"></i>
                    </div>
                </div>`;

    DOM.innerHTML = HTML;
    
    const arrows = DOM.querySelectorAll('.controls > .fa');
    arrows.forEach( arrow => arrow.addEventListener('click', updateTestimonials) );
    return;
}

function generateTestimonial( data ) {
    const fullStars = Math.round(data.stars * 2) / 2;
    const fullHTML = '<i class="fa fa-star"></i>'.repeat( Math.floor(fullStars) );
    const halfHTML = '<i class="fa fa-star-half-o"></i>'.repeat( fullStars%1 === 0 ? 0 : 1 );
    const emptyHTML = '<i class="fa fa-star-o"></i>'.repeat( 5 - Math.ceil(fullStars) );

    return `<div class="testimonial" style="width: 20%;">
                <div class="quote">99</div>
                <div class="author">${data.author}</div>
                <div class="stars">${fullHTML + halfHTML + emptyHTML}</div>
                <div class="text">${data.text}</div>
            </div>`;
}

function updateTestimonials( event ) {
    if ( testimonialsAnimationInProgress === true ) {
        return;
    }
    testimonialsAnimationInProgress = true;
    const elem = event.target;
    const parent = elem.closest('.testimonials');
    const list = parent.querySelector('.list');
    const bar = parent.querySelector('.bar');
    const currentIndex = parseInt(parent.dataset.index);

    let direction = 1;
    if ( elem.classList.contains('fa-angle-left') ) {
        direction = -1;
    }
    let nextIndex = currentIndex + direction;
    
    parent.setAttribute('data-index', nextIndex);
    list.style.marginLeft = nextIndex * -100 + '%';

    // jei i ekrana ivaziuoja "klonai", tai juos "teleportuojame"
    if ( nextIndex === 0 ) {
        setTimeout(() => {
            list.classList.add('no-animation');
            nextIndex = testimonials.length;
            parent.setAttribute('data-index', nextIndex);
            list.style.marginLeft = testimonials.length * -100 + '%';
        }, 1000);
        setTimeout(() => {
            list.classList.remove('no-animation');
        }, 1100)
    }
    if ( nextIndex === testimonials.length + 1 ) {
        setTimeout(() => {
            list.classList.add('no-animation');
            nextIndex = 1;
            parent.setAttribute('data-index', nextIndex);
            list.style.marginLeft = -100 + '%';
        }, 1000);
        setTimeout(() => {
            list.classList.remove('no-animation');
        }, 1100)
    }

    let barIndex = nextIndex;
    if ( nextIndex === 0 ) {
        barIndex = testimonials.length;
    }
    if ( nextIndex === testimonials.length + 1 ) {
        barIndex = 1;
    }
    bar.style.marginLeft = (barIndex - 1) * (100 / testimonials.length) + '%';
    

    setTimeout(() => {
        testimonialsAnimationInProgress = false;
    }, 1100);
}