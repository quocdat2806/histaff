import React, { useState } from 'react';
import { View, ImageBackground } from 'react-native';

import { ImageAssets } from '@assets';

import AppStyles from '@/style';

import authService from '@/api/Auth';
import { ApiError } from '@/services/network';

import { Texts } from '@/constants/texts';
import { Colors } from '@/constants/colors';

import ROUTERS from '@/routers';

import { useAlert } from '@/context/AlertContext';
import { AppInput } from '@/components/ui/Input';
import { AppButton } from '@/components/ui/Button';
import { Heading2, Heading6 } from '@/components/ui/Text';
import { navigate } from '@/navigation';
import { useTranslation } from '@/hooks/useTranslation';

export const CompanyCodeScreen = () => {
  const [companyCode, setCompanyCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { showAlert, hideAlert } = useAlert();
  const { t } = useTranslation();

  const handleLogin = async () => {
    setLoading(true);

    try {
      navigate(ROUTERS.Auth, { screen: ROUTERS.Login });
      // const response = await authService.login({
      //   companyCode: companyCode,
      // });
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiError?.message;
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
    <ImageBackground source={ImageAssets.background} style={AppStyles.f_1}>
      <View
        style={[
          AppStyles.f_1,
          AppStyles.j_center,
          AppStyles.paddingHorizontal16,
        ]}
      >
        <View style={AppStyles.marginBottom16}>
          <Heading2 color={Colors.white} fontType="bold">
            {Texts.login}
          </Heading2>
          <Heading6 color="secondary">{Texts.inputCompanyCode}</Heading6>
        </View>

        <View style={[AppStyles.marginBottom16, AppStyles.gap8]}>
          <AppInput
            labelColor={Colors.white}
            label={Texts.companyCode}
            variant="outlined"
            placeholder={Texts.inputCompanyCodePlaceholder}
            onChangeText={setCompanyCode}
            value={companyCode}
          />
        </View>
        <AppButton
          disabled={!companyCode.trim()}
          label={Texts.login}
          onPress={handleLogin}
          loading={loading}
        />
      </View>
    </ImageBackground>
  );
};
