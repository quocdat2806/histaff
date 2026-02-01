import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground
} from 'react-native';



import { ImageAssets } from '@assets';

import AppStyles from '@/style';

import authService from '@/api/Auth';
import { ApiError } from '@/services/network';

import { Spacing } from '@/constants/dimens';
import { Texts } from '@/constants/texts';
import { Colors } from '@/constants/colors';

import ROUTERS from '@/routers';

import { useAlert } from '@/context/AlertContext';
import { AppInput } from '@/components/ui/Input';
import { AppButton } from '@/components/ui/Button';
import { Heading2, Heading6 } from '@/components/ui/Text';
import { navigate } from '@/navigation';







export const CompanyCodeScreen = () => {
  const [companyCode, setCompanyCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { showAlert, hideAlert } = useAlert();

  const handleLogin = async () => {


    setLoading(true);

    try {
      navigate('Auth', { screen: ROUTERS.Login });
      // const response = await authService.login({
      //   companyCode: companyCode,
      // });

    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiError?.message;
      showAlert({ title: 'Login Error', message: errorMessage, primaryAction: { label: 'OK', onPress: () => {} } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={ImageAssets.background} style={AppStyles.f_1} >
      <View style={[AppStyles.f_1, AppStyles.j_center, styles.container]}>
        <View style={styles.header}>
          <Heading2 color={Colors.white} fontType='bold'>{Texts.login}</Heading2>
          <Heading6 color='secondary'>
            {Texts.inputCompanyCode}
          </Heading6>
        </View>

        <View style={styles.form}>
          <AppInput
            lableColor={Colors.white}
            label={Texts.companyCode}
            variant='outlined'
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.lg,
  },

  form: {
    marginBottom: Spacing.lg,
    gap: Spacing.xs,
  },
});
