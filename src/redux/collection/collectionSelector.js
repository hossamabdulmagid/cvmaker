import { createSelector } from "reselect";

const selectCollection = (state) => state.collection;

export const selectCollections = createSelector(
  [selectCollection],
  (collection) => collection.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );

export const selectIsCollectionFetching = createSelector(
  [selectCollection],
  (collection) => collection.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectCollection],
  (collection) => !!collection.collections
);
