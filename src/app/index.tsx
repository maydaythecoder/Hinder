/*
the end goal of this MVP is to have swipable cards, functional chats, and an editable userinterface
post mvp the first push will be for bug fixes and optimizations aswell as docs
following that ill begin to impliment new ideas or improving the user interface
and finally thee last push in this loop will be for production and hosting readiness

dev loop:
  1 mvp
    2 bug fixes and optimizations/docs
    3 new ideas and ui improvements
    4 production and hosting readiness

1 will only be done once and 2,3,and 4 will be iterated over
the only case which will call for 1 to be reinstated is if a new core feature is being added
a core feature is defined by the following:
  - a change that alters the ui/ux in a way that is fundamentally different from the prior state
  - an addition of a functionality that alters the reward/encouraged behavior of the user
*/
import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import Cards from '@/components/Cards';
import { cardData } from '@/Data/Cards';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      {/*
      by default you land on the home page
      this will contain a modular component that will be used to navigate to other pages
      it will take a list of said pages
      upon the selection of a bottom navbar it will navigate to the selected page
      */}
      {cardData.map((card, index) => (
        <Cards key={index} title={card.title} description={card.description} imageUrl={card.imageUrl} />
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
