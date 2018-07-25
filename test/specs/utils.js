const assert = require('assert');

const navigateToStory = (kind, story) =>{
    browser.url(browser.url(`/iframe.html?selectedKind=${kind}&selectedStory=${story}`))
}

const vrCompare = () =>{
    let report = browser.checkElement('#root');
    console.log(report);
    report.forEach((viewport)=>{
        assert.equal(viewport.isWithinMisMatchTolerance, true);
    })
};

export {navigateToStory, vrCompare}