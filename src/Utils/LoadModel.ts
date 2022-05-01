import RNFS from 'react-native-fs';

export const LoadModel = async (modelName: string): Promise<string> => {
  const outputPath = `${RNFS.CachesDirectoryPath}/${modelName}`;

  console.log(JSON.stringify(await RNFS.readDir(RNFS.MainBundlePath), null, 2));

  return;

  await RNFS.writeFile(outputPath, await RNFS.readFileRes(modelName, 'base64'), 'base64');

  return `file:${outputPath}`;
};
