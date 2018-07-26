const assert = require('assert');

const navigateToStory = (kind, story) =>{
    console.log(`Navigating to: ${kind} / ${story}`)
    browser.url(browser.url(`/iframe.html?selectedKind=${kind}&selectedStory=${story}`))
}

const vrCompare = () =>{
    let report = browser.checkElement('#root'); 
    report.forEach((viewport)=>{
        assert.equal(viewport.isWithinMisMatchTolerance, true);
    })
};

export {navigateToStory, vrCompare}