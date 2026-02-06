import { View } from 'react-native';
import { RowSection, RowSectionProps } from './RowSection';
import AppStyles from '@/style';
import { AppText } from '../ui';
import { SvgNext } from '@assets/svgs';

interface CardInfoSectionProps extends RowSectionProps {
  icon: React.ReactNode;
  title: string;
  expandable?: boolean;
}

export const CardInfoSection = (props: CardInfoSectionProps) => {
  const { icon, title, expandable, ...rest } = props;
  return (
    <View
      style={[
        AppStyles.paddingHorizontal16,
        AppStyles.paddingVertical20,
        AppStyles.borderRadius12,
        AppStyles.gap10,
        AppStyles.backGroundWhite,
      ]}
    >
      <View
        style={[AppStyles.f_Row, AppStyles.j_spaceBetween, AppStyles.gap10]}
      >
        {icon}
        <AppText fontType="bold">{title}</AppText>
        {expandable ? <SvgNext /> : <></>}
      </View>
      <RowSection {...rest} />
    </View>
  );
};
