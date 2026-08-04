import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';
import { Feather } from '@expo/vector-icons';

// `NativeTabs.Trigger.Icon`'s props are strict; allow using a custom child by
// casting to `any` so we can render vector icons inside it without TS errors.
const TabIcon: any = NativeTabs.Trigger.Icon;

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <TabIcon>
          <Feather name="home" size={20} color={colors.text} />
        </TabIcon>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <TabIcon>
          <Feather name="compass" size={20} color={colors.text} />
        </TabIcon>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
