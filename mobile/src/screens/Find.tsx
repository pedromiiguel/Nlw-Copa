import React, { useState } from 'react';

import { Heading, useToast, VStack } from 'native-base';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export const Find = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');

  const toast = useToast();
  const { navigate } = useNavigation();

  const handleJoinPoll = async () => {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        toast.show({
          title: 'Informe o código.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      await api.post('polls/join', { code });

      toast.show({
        title: 'Você entrou no bolão com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

      navigate('polls');
    } catch (error) {
      console.log(error);
      setIsLoading(false);

      if (error.response?.data?.message === 'Poll not found') {
        toast.show({
          title: 'Bolão não encontrado.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      if (error.response?.data?.message === 'You already join this poll') {
        toast.show({
          title: 'Você já está nesse bolão.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      toast.show({
        title: 'Não foi possível encontrar o bolão.',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  };

  return (
    <VStack bgColor="gray.900" flex={1}>
      <Header title="Buscar por código" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de {'\n'}
          seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          onChangeText={setCode}
          autoCapitalize="characters"
        />

        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPoll}
        />
      </VStack>
    </VStack>
  );
};
