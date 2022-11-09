import React, { useCallback, useState } from 'react';

import { VStack, Icon, useToast, FlatList } from 'native-base';
import { Octicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { PollCard, PollCardProps } from '../components/PollCard';
import { Loading } from '../components/Loading';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { api } from '../services/api';
import { EmptyPollList } from '../components/EmptyPollList';

export const Polls = () => {
  const { navigate } = useNavigation();
  const [polls, setPolls] = useState<PollCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      fetchPolls();
    }, [])
  );

  const fetchPolls = async () => {
    try {
      setIsLoading(true);

      const response = await api.get('/polls');

      setPolls(response.data.polls);
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possível carregar os bolões.',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          onPress={() => navigate('find')}
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={polls}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PollCard
              data={item}
              onPress={() => navigate('details', { id: item.id })}
            />
          )}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPollList />}
        />
      )}
    </VStack>
  );
};
