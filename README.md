## Steps to create a react native application with onnx runtime

- Install `react-native-asset` package as dev dependency
- Install `onnxruntime-react-native` and `react-native-fs` dependencies
- Create a script entry at `package.json` file with `react-native link && react-native-asset` command
- Increase minSdkVersion to 24 for Android
- Increase ios platform version to 13 for IOS
- Add `pod 'onnxruntime-react-native', :path => '../node_modules/onnxruntime-react-native'` to Podfile at main target for IOS
- Add assets path for models to `react-native.config.js` file with path to the models. (`assets: ['./src/Models']`)
- <details>
    <summary>Create a function with the following code:</summary>
    
    ```ts
    import RNFS from 'react-native-fs';
    import {IsAndroid} from './Helpers';

    export const LoadModel = async (modelName: string): Promise<string> => {
      if (IsAndroid) {
        const outputPath = `${RNFS.CachesDirectoryPath}/${modelName}`;

        await RNFS.writeFile(outputPath, await RNFS.readFileRes(modelName, 'base64'), 'base64');

        return `file:${outputPath}`;
      } else {
        return `${RNFS.MainBundlePath}/${modelName}`;
      }
    };
    ```
  </details>
  
Congrats! You can now use onnx runtime with react native.
  
Keep in mind you need to load the model with the `LoadModel` function created at the last step.
  
`await InferenceSession.create(await LoadModel('model_name.ort'));`
