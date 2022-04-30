import {View} from 'react-native';
import Config from 'react-native-config';
import {useTheme} from './Hooks';
import Providers from './Providers';
import Router from './Router';
import {ThemedStyleSheet} from './Utils/ThemedStyleSheet';

function App() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
}

const AppContent: React.FC = () => {
  if (!Config.USE_CONFIG || Config.USE_CONFIG !== 'true') {
    throw new Error(
      'You need to fill in the .env file for the designated build environment. You can find the sample in .env.sample file',
    );
  }

  const theme = useTheme();

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Router />
    </View>
  );
};

const getStyles = ThemedStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

export default App;
