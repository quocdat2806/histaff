import React from 'react';
import { View } from 'react-native';

import { MainTabParamList } from '@/navigation/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { useAuthStore } from '@/store/authStore';
import { AppGrid, SafeAreaContainer } from '@/components/shared';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { scale } from 'react-native-size-matters';
import { Heading3, Heading6 } from '@/components/ui/Text';
import AppStyles from '@/style';

import {  Layout, Width } from '@/constants/dimens';
import { Colors } from '@/constants/colors';

import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import HomeItem, { HOME_GRID_DATA } from './components/HomeItem';

import { useTranslation } from '@/hooks/useTranslation';

import {
  SvgBusinessCard,
} from '@assets/svgs';
const data = [...new Array(6).keys()];

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;


const DEFAULT_AVATAR_URL = 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/11/tai-hinh-nen-dep-mien-phi-3.jpg';
export const HomeScreen = (_props: Props) => {
  const user = useAuthStore(state => state.user);
  const { t } = useTranslation();

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
          AppStyles.paddingHorizontal16,
          AppStyles.paddingVertical8,
          AppStyles.backGroundPrimary,
          AppStyles.gap8,
        ]}
      >
        <UserAvatar
          size={Layout.avatarSizeLarge}
          showStatus={false}
          source={{
            uri: DEFAULT_AVATAR_URL,
          }}
        />
        <View style={[AppStyles.f_1, AppStyles.a_start]}>
          <Heading6 color={Colors.white}>{t('hello')}</Heading6>
          <Heading3 fontType="bold" color={Colors.white}>
            {t('hello')}
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

