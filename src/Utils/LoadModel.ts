import RNFS from 'react-native-fs';

export const LoadModel = async (modelName: string): Promise<string> => {
  const outputPath = `${RNFS.CachesDirectoryPath}/${modelName}`;

  await RNFS.writeFile(outputPath, await RNFS.readFileRes(modelName, 'base64'), 'base64');

  return `file:${outputPath}`;
};
