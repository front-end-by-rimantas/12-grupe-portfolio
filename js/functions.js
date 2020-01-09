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

    if ( !Array.isArray(data) ) {
        return console.error('ERROR: negaliu sugeneruoti "Gallery" sekcijos, del blogo formato duomenu.');
    }
    if ( data.length === 0 ) {
        return console.error('ERROR: negaliu sugeneruoti "Gallery" sekcijos, del tuscio saraso.');
    }

    // generuojame galerijos filtra
    let filterHTML = 'GALLERY FILTER';


    // generuojame galerijos elementus
    let listHTML = '';
    for ( let i=0; i<data.length; i++ ) {
        const work = data[i];
        listHTML += `<div class="gallery-item">
                        GALLERY ITEM ${i+1}
                    </div>`;
    }

    // viska apjungiame i galutine galerija
    HTML = `<div class="gallery">
                <div class="gallery-filter">
                    ${filterHTML}
                </div>
                <div class="gallery-list">
                    ${listHTML}
                </div>
            </div>`;
    
    document.querySelector(target).innerHTML = HTML;

    // sudeti eventListener ant filtravimo elementu

    return;
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