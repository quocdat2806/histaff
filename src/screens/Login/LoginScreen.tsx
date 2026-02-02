import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthStackParamList } from '@/navigation/types';

import AppStyles from '@/style';

import { useAuthStore } from '@/store';
import { useAlert } from '@/context/AlertContext';

import { Spacing } from '@/constants/dimens';
import { Texts } from '@/constants/texts';
import { Colors } from '@/constants/colors';

import { ApiError } from '@/services/network';

import { AppInput } from '@/components/ui/Input';
import { AppButton } from '@/components/ui/Button';

import { ImageAssets } from '@assets';

import { Subtitle } from '@/components/ui/Text';

import { useTranslation } from '@/hooks/useTranslation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen = (_props: Props) => {
  const login = useAuthStore(state => state.login);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { showAlert, hideAlert } = useAlert();

  const handleLogin = async () => {
    login(
      { id: '1', name: 'Test User', token: 'vlxxxxxx', isAvatar: false },
      'vlxxxxxx',
    );

    try {
    } catch (err: any) {
      const error = err as ApiError;
      const errorMessage = error?.message;
      showAlert({
        title: t('loginError'),
        message: errorMessage,
        primaryAction: { label: t('ok'), onPress: hideAlert },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={ImageAssets.backgroundLogin} style={AppStyles.f_1}>
      <View style={[AppStyles.f_1, AppStyles.j_center, 

        AppStyles.paddingHorizontal16,
      ]}>
        <View style={[AppStyles.marginBottom16,AppStyles.gap8]}>
          <AppInput
            variant="outlined"
            placeholder={Texts.inputAccount}
            onChangeText={setAccount}
            value={account}
          />
          <AppInput
            secureTextEntry
            showPasswordToggle
            variant="outlined"
            placeholder={Texts.inputPassword}
            onChangeText={setPassword}
            value={password}
          />
          <View style={[AppStyles.f_Row, AppStyles.j_spaceBetween]}>
            <Subtitle color={Colors.white}>{Texts.forgotPassword}</Subtitle>
            <Subtitle color={Colors.white}>
              {Texts.loginWithOtherAccount}
            </Subtitle>
          </View>
        </View>

        <AppButton
          disabled={!account.trim() || !password.trim()}
          label={Texts.login}
          onPress={handleLogin}
          loading={loading}
        />
      </View>
      <View style={[styles.textFooter, { bottom: insets.bottom + Spacing.xs }]}>
        <Subtitle center color={Colors.white}>
          HiStaff HRM Solution ©Tinhvan Consulting
        </Subtitle>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  textFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});
