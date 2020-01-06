"use strict";

function renderAchievements( data ) {
    const maxBlocks = 4;
    let createdBlocks = 0;
    let HTML = '';

    // sugeneruojame HTML
    for ( let i=0; i<data.length; i++ ) {
        if ( createdBlocks === maxBlocks ) {
            break;
        }
        const block = data[i];

        if ( block.icon &&
             block.number &&
             block.title ) {
            HTML += `<div class="col-3 block">
                        <i class="fa fa-${block.icon}"></i>
                        <span>${block.number}</span>
                        <h4>${block.title}</h4>
                    </div>`;
            
            createdBlocks++;
        }
    }
    console.log(createdBlocks);
    

    // istatome HTML i reikiama vieta
    document.querySelector('#achievements > .row').innerHTML = HTML;
    return;
}