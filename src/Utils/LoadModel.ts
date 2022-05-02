/* eslint no-else-return: "off" */

import RNFS from 'react-native-fs';
import {IsAndroid} from './Helpers';

export const LoadModel = async (modelName: string): Promise<string> => {
  if (IsAndroid) {
    const outputPath = `${RNFS.CachesDirectoryPath}/${modelName}`;

    await RNFS.writeFile(outputPath, await RNFS.readFileRes(modelName, 'base64'), 'base64');

    return `file:${outputPath}`;
  } else {
    const inputPath = `${RNFS.MainBundlePath}/${modelName}`;
    const outputPath = `${RNFS.LibraryDirectoryPath}/${modelName}-${Math.round(
      Math.random() * 10 ** 6,
    )}`;

    await RNFS.copyFile(inputPath, outputPath);

    console.log(inputPath);
    console.log(outputPath);
    console.log(await RNFS.exists(outputPath));

    return `file:${outputPath}`;
  }
};
