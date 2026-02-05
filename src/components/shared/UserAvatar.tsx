import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle, ImageSourcePropType } from 'react-native';
import { AppImage } from '@/components/ui/';
import { Colors } from '@/constants/colors';
import { Layout } from '@/constants/dimens';
export type UserStatus = 'online' | 'offline' | 'busy' | 'away';

export interface UserAvatarProps {
  source: ImageSourcePropType;
  size?: number;
  status?: UserStatus;
  showStatus?: boolean;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  badgeBorderColor?: string;
}

const STATUS_COLORS: Record<string, string> = {
  online: Colors.online,
  offline: Colors.offline,
  busy: Colors.busy,
  away: Colors.away,
};

const DEFAULT_SIZE = Layout.avatarSizeDefault;

export const UserAvatar: React.FC<UserAvatarProps> = ({
  source,
  size = DEFAULT_SIZE,
  status,
  showStatus = true,
  onPress,
  containerStyle,
  badgeBorderColor = Colors.white,
}) => {
  const shouldShowBadge = useMemo(() => {
    return showStatus && !!status;
  }, [showStatus, status]);

  const statusColor = useMemo(() => {
    if (!shouldShowBadge) return null;
    return STATUS_COLORS[status!] || status;
  }, [shouldShowBadge, status]);

  const badgeSize = Math.round(size * 0.28);
  const badgeBorderWidth = Math.max(2, size * 0.04);

  const AvatarContent = (
    <View style={[{ width: size, height: size }, containerStyle]}>
      <AppImage
        onPress={onPress}
        source={source}
        style={{ width: size, height: size }}
        shape="circle"
        resizeMode="cover"
        showLoader={false}
      />

      {shouldShowBadge && statusColor && (
        <View
          style={[
            styles.badge,
            {
              width: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              backgroundColor: statusColor,
              borderColor: badgeBorderColor,
              borderWidth: badgeBorderWidth,
            },
          ]}
        />
      )}
    </View>
  );

  return AvatarContent;
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    right: 0,
  },
});
