import { lf4 } from './lf4';
import { lf5 } from './lf5';
import { lf6 } from './lf6';
import { lf7 } from './lf7';
import { lf8 } from './lf8';
import { addVideoLibrary } from './videoExtras';

export const modules = [lf4, lf5, lf6, lf7, lf8].map(addVideoLibrary);

export { lf4, lf5, lf6, lf7, lf8 };
