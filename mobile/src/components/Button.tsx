import React from 'react';
import { Button as ButtonNativeBase, Text, IButtonProps } from 'native-base';

interface ButtonProps extends IButtonProps {
  title: string;
  type?: 'PRIMARY' | 'SECUNDARY';
}

export const Button = ({ title, type = 'PRIMARY', ...props }: ButtonProps) => {
  const background = {
    PRIMARY: 'yellow.500',
    SECUNDARY: 'red.500',
  };

  const hover = {
    PRIMARY: 'yellow.600',
    SECUNDARY: 'red.600',
  };

  const color = {
    PRIMARY: 'black',
    SECUNDARY: 'white',
  };

  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      textTransform="uppercase"
      bg={background[type]}
      _pressed={{
        bg: hover[type],
      }}
      _loading={{
        _spinner: { color: 'black' },
      }}
      {...props}
    >
      <Text fontSize="sm" fontFamily="heading" color={color[type]}>
        {title}
      </Text>
    </ButtonNativeBase>
  );
};
