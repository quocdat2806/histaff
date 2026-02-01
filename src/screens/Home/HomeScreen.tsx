import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

import { navigate } from '@/navigation';
import { MainTabParamList } from '@/navigation/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { useAuthStore } from '@/store/authStore';
import { AppGrid, SafeAreaContainer } from '@/components/shared';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { scale } from 'react-native-size-matters';
import { Heading3, Heading6 } from '@/components/ui/Text';
import AppStyles from '@/style';

import { Spacing, Width } from '@/constants/dimens';
import { Colors } from '@/constants/colors';

import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import HomeItem, { HOME_GRID_DATA } from './components/HomeItem';

import {
  SvgBusinessCard,
 
} from '@assets/svgs';
const data = [...new Array(6).keys()];

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;

export const HomeScreen = (_props: Props) => {
  const user = useAuthStore(state => state.user);

  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };



  return (
    <SafeAreaContainer>
      <View
        style={[
          AppStyles.f_Row,
          AppStyles.j_spaceBetween,
          AppStyles.a_center,
          styles.gap8,
          styles.headerContainer,
        ]}
      >
        <UserAvatar
          size={scale(58)}
          showStatus={false}
          source={{
            uri: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/11/tai-hinh-nen-dep-mien-phi-3.jpg',
          }}
        />
        <View style={[AppStyles.f_1, AppStyles.a_start]}>
          <Heading6 color={Colors.white}>Hello</Heading6>
          <Heading3 fontType="bold" color={Colors.white}>
            Hello
          </Heading3>
        </View>
        <SvgBusinessCard />
      </View>
      <Carousel
        ref={ref}
        vertical={false}
        width={Width.fullScreenDimensionWidth}
        height={Width.fullScreenDimensionWidth / 2.5}
        autoPlay={true}
        autoPlayInterval={2000}
        loop={true}
        data={data}
        onProgressChange={progress}
        renderItem={({ index }) => <></>}
      />
      <AppGrid
        scrollEnabled={false}
        data={HOME_GRID_DATA}
        numColumns={4}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <HomeItem item={item} />}
      />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  gap8: {
    gap: Spacing.xs,
  },
  headerContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.primary,
  },

});
