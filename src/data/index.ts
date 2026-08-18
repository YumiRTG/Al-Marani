import { lf1 } from './lf1';
import { lf2 } from './lf2';
import { lf3 } from './lf3';
import { lf4 } from './lf4';
import { lf5 } from './lf5';
import { lf6 } from './lf6';
import { lf7 } from './lf7';
import { lf8 } from './lf8';
import { lf9 } from './lf9';
import { lf10 } from './lf10';
import { lf11 } from './lf11';
import { lf12 } from './lf12';
import { enhanceLf4 } from './lf4Enhancements';
import { enhanceLf5 } from './lf5Enhancements';
import { enhanceDepth } from './depthEnhancements';
import { expandLf4FromPdf } from './lf4PdfExpansion';
import { expandLf5FromUploads } from './lf5UploadExpansion';
import { expandLf6FromPdf } from './lf6PdfExpansion';
import { expandLf7FromPdf } from './lf7PdfExpansion';
import { ensureLearningCoverage } from './coverageEnhancements';
import { makeLearningMoreEngaging } from './engagementEnhancements';
import { refineLf9 } from './lf9Refinement';
import { addVideoLibrary } from './videoExtras';
import type { LearningModule, TopicContent } from '@/types';

const supportedContentTypes = new Set<TopicContent['type']>([
  'text',
  'info',
  'warning',
  'table',
  'list',
  'definition',
  'heading',
  'image',
  'video',
]);

function cleanModule(module: LearningModule): LearningModule {
  return {
    ...module,
    topics: module.topics.map(topic => ({
      ...topic,
      content: topic.content.filter(block => supportedContentTypes.has(block.type)),
    })),
  };
}

function withGitHubPagesAssets(module: LearningModule): LearningModule {
  const heroImage = module.heroImage.startsWith('/') && !module.heroImage.startsWith('//')
    ? `${import.meta.env.BASE_URL}${module.heroImage.slice(1)}`
    : module.heroImage;

  return { ...module, heroImage };
}

export const modules = [lf1, lf2, lf3, lf4, lf5, lf6, lf7, lf8, lf9, lf10, lf11, lf12]
  .map(enhanceLf4)
  .map(enhanceLf5)
  .map(enhanceDepth)
  .map(expandLf4FromPdf)
  .map(expandLf5FromUploads)
  .map(expandLf6FromPdf)
  .map(expandLf7FromPdf)
  .map(ensureLearningCoverage)
  .map(makeLearningMoreEngaging)
  .map(refineLf9)
  .map(cleanModule)
  .map(withGitHubPagesAssets)
  .map(addVideoLibrary);

export { lf1, lf2, lf3, lf4, lf5, lf6, lf7, lf8, lf9, lf10, lf11, lf12 };
