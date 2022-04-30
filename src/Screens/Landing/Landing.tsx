import {useEffect} from 'react';
import {InferenceSession} from 'onnxruntime-react-native';
import RNFS from 'react-native-fs';
import {Text} from '../../Components';
import {PageContainer} from '../../Containers';
import {OnboardingLandingScreenProps} from '../../Typings/NavigationTypes';
import {LoadModel} from '../../Utils/LoadModel';

type Props = OnboardingLandingScreenProps;

const Landing: React.FC<Props> = () => {
  useEffect(() => {
    (async () => {
      const modelPath = await LoadModel('dxfinal_dehyd.ort');

      console.log(modelPath);

      console.log(
        await InferenceSession.create(modelPath, {
          logSeverityLevel: 0,
        }),
      );
    })();
  });

  return (
    <PageContainer withSafeArea withPadding>
      <Text fontSize={18}>Hello</Text>
    </PageContainer>
  );
};

export default Landing;
