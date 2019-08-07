<template>
  <v-app>
      <Header />

    <v-content>
      <ImagesListMain />
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header';
import ImagesListMain from './components/ImagesListMain'
//import ErrorLogger from './Utils/ErrorLogger';

export default {
  name: 'App',
  components: {
      ImagesListMain,
      Header,
  },
  data: () => ({
    //
  }),

};
</script>
