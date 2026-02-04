import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  CompanyCode: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Contact: undefined;
  CheckIn: undefined;
  Notification: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  Register: undefined;
  Approve: undefined;
  RegisterLeave: undefined;
  RegisterOvertime: undefined;
  RegisterExplanation: undefined;
  RegisterHistory: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
