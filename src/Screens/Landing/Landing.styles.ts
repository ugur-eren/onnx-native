import {StyleSheet} from 'react-native';
import {Spacing} from '../../Styles';

export default StyleSheet.create({
  container: {
    paddingVertical: Spacing.pagePadding,
  },
  subtitle: {
    marginTop: Spacing.xxsmall,
    marginBottom: Spacing.small,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.small,
  },
  switchLabel: {
    marginRight: Spacing.xsmall,
  },
  gap: {
    height: Spacing.small,
  },
});
