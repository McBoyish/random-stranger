import type { NextPage } from 'next';
import React from 'react';
import Home from '../src/Home';
import { ScrollView } from 'react-native';

const HomePage: NextPage = () => {
  return (
    <ScrollView>
      <Home />
    </ScrollView>
  );
};

export default HomePage;
