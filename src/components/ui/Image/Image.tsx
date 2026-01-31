import { Colors } from '@/constants/colors';
import { BorderRadius } from '@/constants/dimens';
import AppStyles from '@/style';
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  ImageProps,
  TouchableOpacity,
  ImageStyle,
  StyleProp,
  Image,
  ImageSourcePropType,
} from 'react-native';

type Shape = 'square' | 'rounded' | 'circle';

interface AppImageProps extends Omit<ImageProps, 'style'> {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  shape?: Shape;
  showLoader?: boolean;
  onPress?: () => void;
  fallbackElement?: React.ReactNode;
}

const SKELETON_COLOR = Colors.skeleton;

export const AppImage: React.FC<AppImageProps> = ({
  source,
  style,
  containerStyle,
  shape = 'rounded',
  showLoader = true,
  onPress,
  fallbackElement,
  resizeMode = 'cover',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [source]);

  const onLoadEnd = () => {
    setIsLoading(false);
  };

  const onError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const getBorderRadius = (): number => {
    if (shape === 'circle') return BorderRadius.rounded;
    if (shape === 'rounded') return BorderRadius.md;
    return 0;
  };

  const borderRadius = getBorderRadius();

  const ImageContent = (
    <>
      {!hasError && (
        <Image
          source={source}
          style={StyleSheet.absoluteFill}
          resizeMode={resizeMode}
          onLoadEnd={onLoadEnd}
          onError={onError}
          {...props}
        />
      )}

      {isLoading && showLoader && !hasError && (
        <View style={[styles.centerAbsolute, AppStyles.f_Row, AppStyles.a_center]}>
          <ActivityIndicator size="small" color={Colors.primary} />
        </View>
      )}

      {hasError && (
        <View style={[styles.centerAbsolute, AppStyles.f_Row, AppStyles.a_center]}>
          {fallbackElement ?? <View style={styles.errorPlaceholder} />}
        </View>
      )}
    </>
  );

  const computedContainerStyle = [
    AppStyles.f_Row,
    AppStyles.a_center,
    {
      borderRadius,
      backgroundColor: SKELETON_COLOR,
      overflow: 'hidden',
    },
    style,
    containerStyle,
  ] as StyleProp<ViewStyle>;

  if (onPress) {
    return <TouchableOpacity>{ImageContent}</TouchableOpacity>;
  }

  return <View style={computedContainerStyle}>{ImageContent}</View>;
};

const styles = StyleSheet.create({

  centerAbsolute: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  errorContainer: {
    backgroundColor: Colors.backgroundImageError,
  },
  errorPlaceholder: {
    width: '30%',
    height: '30%',
    backgroundColor: Colors.mutedImageError,
    borderRadius: BorderRadius.sm,
  },
});

