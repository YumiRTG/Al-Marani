import { lf4 } from './lf4';
import { lf5 } from './lf5';
import { lf6 } from './lf6';
import { lf7 } from './lf7';
import { lf8 } from './lf8';
import { lf9 } from './lf9';
import { addVideoLibrary } from './videoExtras';
import type { LearningModule } from '@/types';

function withGitHubPagesAssets(module: LearningModule): LearningModule {
  const heroImage = module.heroImage.startsWith('/') && !module.heroImage.startsWith('//')
    ? `${import.meta.env.BASE_URL}${module.heroImage.slice(1)}`
    : module.heroImage;

  return {
    ...module,
    heroImage,
  };
}

export const modules = [lf4, lf5, lf6, lf7, lf8, lf9]
  .map(withGitHubPagesAssets)
  .map(addVideoLibrary);

export { lf4, lf5, lf6, lf7, lf8, lf9 };
