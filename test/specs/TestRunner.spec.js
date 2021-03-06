import { urls } from '../stories_list';
import { navigateToStory, vrCompare } from '../utils';

describe('Visual Regression', () => {

  urls.forEach((ele) => {
    describe(ele.kind, () => {
      ele.stories.forEach(story => {
        it(story, () => {
          navigateToStory(ele.kind, story)
          vrCompare();
        })
      })
    })
  });
 
})