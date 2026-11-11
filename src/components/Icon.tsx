import { Feather } from '@expo/vector-icons';
import { ComponentProps } from 'react';

export type IconName = ComponentProps<typeof Feather>['name'];

type IconProps = {
  name: IconName;
  size?: number;
  color: string;
};

export function Icon({ name, size = 22, color }: IconProps) {
  return <Feather name={name} size={size} color={color} />;
}
