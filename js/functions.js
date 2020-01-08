"use strict";

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

    return;
}

function generateGalleryFilter( data ) {
    return 'GALLERY FILTER';
}

function generateGalleryList( data ) {
    let HTML = '';

    for ( let i=0; i<data.length; i++ ) {
        const work = data[i];

        let catHTML = '';
        for ( let c=0; c<work.category.length; c++ ) {
            catHTML += `<span class="cat">${work.category[c]}</span>`;
        }
        
        HTML += `<div class="gallery-item">
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