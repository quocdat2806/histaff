import {
  createNavigationContainerRef,
  CommonActions,
  StackActions,
} from '@react-navigation/native';
import type { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();


export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName] extends undefined
    ? undefined
    : RootStackParamList[RouteName],
) {
  if (navigationRef.isReady()) {
    (navigationRef.navigate as (n: RouteName, p?: RootStackParamList[RouteName]) => void)(name, params);
  }
}


export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}


export function reset(
  state:
    | { index: number; routes: Array<{ name: keyof RootStackParamList; params?: unknown }> }
    | ReturnType<typeof CommonActions.reset>['payload'],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.reset(state as Parameters<typeof CommonActions.reset>[0]));
  }
}


export function push<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName] extends undefined
    ? undefined
    : RootStackParamList[RouteName],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name as string, params as object | undefined));
  }
}


export function replace<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName] extends undefined
    ? undefined
    : RootStackParamList[RouteName],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name as string, params as object | undefined));
  }
}


export function pop(count = 1) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(count));
  }
}
