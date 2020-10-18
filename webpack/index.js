/*
Two terminal tabs.
1. cd into site folder: jekyll serve
2. cd from Sites like normal: yarn build

When webpack tosses the new JS into the jekyll assets folder, Jekyll picks it up and builds.

*/
import STRPG from './scripts';
//import two from './scripts/two';

STRPG.myFunction('Did this work?');
console.log('From index.js');