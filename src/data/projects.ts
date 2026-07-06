// Define a shared data structure to ensure media links are always synced
import { VIDEOGRAPHY_DATA } from './videography';
import { DESIGN_DATA } from './design';
import { PHOTOGRAPHY_PROJECTS } from './photography_projects';
import { PHOTO_COLLECTION_DATA } from './photoCollection';

export const PROJECT_DATA = [
  ...PHOTOGRAPHY_PROJECTS,
  ...PHOTO_COLLECTION_DATA,
  ...VIDEOGRAPHY_DATA,
  ...DESIGN_DATA
];
