import {useEffect, useRef, useState} from 'react';
import {Button, ScrollView, Switch, View} from 'react-native';
import {InferenceSession, Tensor} from 'onnxruntime-react-native';
import {Text} from '../../Components';
import {PageContainer} from '../../Containers';
import {OnboardingLandingScreenProps} from '../../Typings/NavigationTypes';
import {LoadModel} from '../../Utils/LoadModel';
import styles from './Landing.styles';

type Props = OnboardingLandingScreenProps;

const STATE_SIZE = 30;

const randomizeState = (stateArr: Float32Array): Float32Array => {
  return stateArr.map(() => Math.random());
};

const Landing: React.FC<Props> = () => {
  const encoder = useRef<undefined | InferenceSession>();
  const decoder = useRef<undefined | InferenceSession>();
  const [output, setOutput] = useState('');
  const [constantState, setConstantState] = useState(false);

  useEffect(() => {
    (async () => {
      const encoderModelPath = await LoadModel('dem_agem.ort');
      const decoderModelPath = await LoadModel('dxfinal_urti.ort');

      encoder.current = await InferenceSession.create(encoderModelPath);
      decoder.current = await InferenceSession.create(decoderModelPath, {});
    })();
  });

  const onDiseaseRunPress = async () => {
    const stateArr = constantState
      ? new Float32Array(STATE_SIZE)
      : randomizeState(new Float32Array(STATE_SIZE));

    const response = await decoder.current?.run(
      {state: new Tensor('float32', stateArr, [1, STATE_SIZE])},
      decoder.current?.outputNames,
    );

    setOutput(JSON.stringify(response, null, 2));
  };

  const onQuestionRunPress = async () => {
    const stateArr = constantState
      ? new Float32Array(STATE_SIZE)
      : randomizeState(new Float32Array(STATE_SIZE));

    const response = await encoder.current?.run(
      {
        state: new Tensor('float32', stateArr, [1, STATE_SIZE]),
        x: new Tensor('float32', new Float32Array(1), [1, 1]),
      },
      encoder.current?.outputNames,
    );

    setOutput(JSON.stringify(response, null, 2));
  };

  return (
    <PageContainer withSafeArea withPadding style={styles.container}>
      <ScrollView>
        <Text fontSize={26} align="center">
          MoDN Simplified
        </Text>

        <Text fontSize={22} align="center" style={styles.subtitle}>
          Mock App
        </Text>

        <View style={styles.switch}>
          <Text style={styles.switchLabel}>Constant state</Text>

          <Switch value={constantState} onValueChange={() => setConstantState((prev) => !prev)} />
        </View>

        <Button title="Disease Run" onPress={onDiseaseRunPress} />

        <View style={styles.gap} />

        <Button title="Question Run" onPress={onQuestionRunPress} />

        <View style={styles.gap} />

        <Text selectable>{output}</Text>
      </ScrollView>
    </PageContainer>
  );
};

export default Landing;
