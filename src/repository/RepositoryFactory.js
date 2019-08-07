//import list of entity repository types
import ImageRepository from './ImageRepository';

const allRepository = {
    images: ImageRepository
};

export const RepositoryFactory = {
    get: name => allRepository[name]
};