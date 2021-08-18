import translationConstants from "../common/translationConstants";

export const loadListObjects = (
  typeSelect,
  quantity,
  kanjis,
  iAdjectives,
  naAdjectives,
  names,
  words,
  verbs,
  setListObjects
) => {
  let listOfObjects = [];
  switch (typeSelect) {
    case translationConstants.TYPE_KANJI:
      if (kanjis && kanjis.length > 0)
        listOfObjects = parcourirEntityList(
          typeSelect,
          quantity,
          kanjis,
          listOfObjects
        );
      break;
    case translationConstants.TYPE_I_ADJECTIVE:
      if (iAdjectives && iAdjectives.length > 0)
        listOfObjects = parcourirEntityList(
          typeSelect,
          quantity,
          iAdjectives,
          listOfObjects
        );
      break;
    case translationConstants.TYPE_NA_ADJECTIVE:
      if (naAdjectives && naAdjectives.length > 0)
        listOfObjects = parcourirEntityList(
          typeSelect,
          quantity,
          naAdjectives,
          listOfObjects
        );
      break;
    case translationConstants.TYPE_NAME:
      if (names && names.length > 0)
        listOfObjects = parcourirEntityList(
          typeSelect,
          quantity,
          names,
          listOfObjects
        );
      break;
    case translationConstants.TYPE_WORD:
      if (words && words.length > 0)
        listOfObjects = parcourirEntityList(
          typeSelect,
          quantity,
          words,
          listOfObjects
        );
      break;
    case translationConstants.TYPE_VERB:
      if (verbs && verbs.length > 0)
        listOfObjects = parcourirEntityList(
          typeSelect,
          quantity,
          verbs,
          listOfObjects
        );
      break;
    default:
      if (kanjis && kanjis.length > 0)
        listOfObjects = parcourirEntityList(
          typeSelect,
          quantity,
          kanjis,
          listOfObjects
        );
      if (iAdjectives && iAdjectives.length > 0)
        listOfObjects = parcourirEntityList(
          typeSelect,
          quantity,
          iAdjectives,
          listOfObjects
        );
      if (naAdjectives && naAdjectives.length > 0)
        listOfObjects = parcourirEntityList(
          typeSelect,
          quantity,
          naAdjectives,
          listOfObjects
        );
      if (names && names.length > 0)
        listOfObjects = parcourirEntityList(
          typeSelect,
          quantity,
          names,
          listOfObjects
        );
      if (words && words.length > 0)
        listOfObjects = parcourirEntityList(
          typeSelect,
          quantity,
          words,
          listOfObjects
        );
      if (verbs && verbs.length > 0)
        listOfObjects = parcourirEntityList(
          typeSelect,
          quantity,
          verbs,
          listOfObjects
        );
  }
  setListObjects(listOfObjects);
  sessionStorage.setItem("listObjects", JSON.stringify(listOfObjects));
};

const parcourirEntityList = (
  typeSelect,
  quantity,
  entityList,
  listOfObjects
) => {
  for (let index = 0; index < entityList.length; index++) {
    if (listOfObjects.length === 0) {
      listOfObjects.push(mapToObject(entityList[index]));
    } else if (listOfObjects.length < quantity) {
      let object = mapToObject(entityList[index]);
      let indexToInsert = getIndexOfInsertion(
        object.numberOfUse,
        listOfObjects,
        quantity
      );
      if (indexToInsert !== -1) {
        listOfObjects.splice(indexToInsert, 0, object);
      }
    } else {
      let object = mapToObject(entityList[index]);
      let indexToInsert = getIndexOfInsertion(
        object.numberOfUse,
        listOfObjects,
        quantity
      );
      if (indexToInsert !== -1) {
        listOfObjects.splice(indexToInsert, 0, object);
        if (listOfObjects.length > quantity) {
          listOfObjects.pop();
        }
      }
    }
  }
  return listOfObjects;
};

const getIndexOfInsertion = (numberOfUse, listOfObjects, quantity) => {
  if (listOfObjects.length === 0) {
    return 0;
  }
  for (let index = 0; index < listOfObjects.length; index++) {
    let object = listOfObjects[index];
    if (numberOfUse > object.numberOfUse) {
      return index;
    }
  }
  if (listOfObjects.length < quantity) {
    return listOfObjects.length;
  } else {
    return -1;
  }
};

const mapToObject = (entity) => {
  if (entity.kanji) {
    return {
      id: entity.id,
      value: entity.kanji,
      numberOfUse: entity.numberOfUse,
    };
  } else if (entity.neutralForm) {
    return {
      id: entity.id,
      value: entity.neutralForm,
      kanjis: null,
      neutralForm: entity.neutralForm,
      groupe: entity.groupe,
      numberOfUse: entity.numberOfUse,
    };
  } else if (entity.kanjis) {
    return {
      id: entity.id,
      value: entity.kanjis,
      kanjis: entity.kanjis,
      neutralForm: null,
      groupe: null,
      numberOfUse: entity.numberOfUse,
    };
  } else {
    return null;
  }
};
