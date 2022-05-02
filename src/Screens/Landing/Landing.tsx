import {useEffect, useRef, useState} from 'react';
import {Button, ScrollView, Switch, View} from 'react-native';
import {InferenceSession, Tensor} from 'onnxruntime-react-native';
import {Text} from '../../Components';
import {PageContainer} from '../../Containers';
import {OnboardingLandingScreenProps} from '../../Typings/NavigationTypes';
import {LoadModel} from '../../Utils/LoadModel';
import {Spacing} from '../../Styles';

type Props = OnboardingLandingScreenProps;

const STATE_SIZE = 30;

const randomizeState = (stateArr: Float32Array): Float32Array => {
  Object.keys(stateArr).forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    stateArr[key as any] = Math.random();
  });

  return stateArr;
};

const Landing: React.FC<Props> = () => {
  const encoder = useRef<undefined | InferenceSession>();
  const decoder = useRef<undefined | InferenceSession>();
  const [output, setOutput] = useState('');
  const [constantState, setConstantState] = useState(false);

  useEffect(() => {
    (async () => {
      const encoderModelPath = await LoadModel('mnist.ort');
      // const decoderModelPath = await LoadModel('dxfinal_urti.ort');

      console.log(encoderModelPath);
      // console.log(decoderModelPath);

      encoder.current = await InferenceSession.create(encoderModelPath, {});
      // decoder.current = await InferenceSession.create(decoderModelPath, {});
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
    <PageContainer withSafeArea withPadding style={{paddingVertical: Spacing.pagePadding}}>
      <ScrollView>
        <Text fontSize={26} align="center">
          MoDN Simplified
        </Text>

        <Text fontSize={22} align="center" style={{marginTop: 6, marginBottom: 16}}>
          Mock App
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 12}}>
          <Text style={{marginRight: 12}}>Constant state</Text>

          <Switch value={constantState} onValueChange={() => setConstantState((prev) => !prev)} />
        </View>

        <Button title="Disease Run" onPress={onDiseaseRunPress} />

        <View style={{height: 16}} />

        <Button title="Question Run" onPress={onQuestionRunPress} />

        <View style={{height: 16}} />

        <Text>{output}</Text>
      </ScrollView>
    </PageContainer>
  );
};

export default Landing;
