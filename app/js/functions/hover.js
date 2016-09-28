'use strict';

// Bring in jQuery for this
define(['jquery'], () => {
    // When hovering over the doughnut, make it a different colour
    let changeDoughnutColour = () => {
        console.log('Started');
        $('div.doughnut').hover(
            () => {
                console.log('Hover');
                $('div.doughnut').removeClass('doughnut').addClass('doughnut-hover'); // When we hover over the element
            },
            () => {
                console.log('Away!');
                $('div.doughnut-hover').removeClass('doughnut-hover').addClass('doughnut'); // When we move away from the element
            }
        );
    };
    return {
        changeDoughnutColour: changeDoughnutColour
    };
});
