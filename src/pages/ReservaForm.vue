<template>
  <q-page class="flex column q-gutter-lg" padding>

    <p class="text-h3">{{reserva.descripcio || 'Nova reserva'}}</p>
    <p class="text-subtitle2">Comprova la disponibilitat del calendari <a class="text-red" target="_blank" href="https://calendar.google.com/calendar/u/0/embed?src=c_fde278d64cd5f4b1b2d54ce1e07a948ab1fdfdf92d411a68433043bab8f17f3a@group.calendar.google.com&ctz=Europe/Madrid">AQUÍ</a></p>
    <q-input v-model="reserva.descripcio" label="Motiu de la reserva"/>


    <div class="flex justify-center">
      <div class="q-ma-lg">
        <p class="text-subtitle1">Data inici reserva</p>
        <div class="q-gutter-md row items-start">
          <q-date v-model="reserva.dataInici" mask="YYYY-MM-DD HH:mm" color="primary" />
          <q-time v-model="reserva.dataInici" mask="YYYY-MM-DD HH:mm" color="primary" />
        </div>
      </div>

      <div class="q-ma-lg">
        <p class="text-subtitle1">Data fi reserva</p>
        <div class="q-gutter-md row items-start">
          <q-date v-model="reserva.dataFi" mask="YYYY-MM-DD HH:mm" color="primary" />
          <q-time v-model="reserva.dataFi" mask="YYYY-MM-DD HH:mm" color="primary" />
        </div>
      </div>
    </div>

    <q-btn color="primary" icon="save" label="Desar" @click="save" />
  </q-page>
</template>

<script lang="ts" setup>

import {Ref, ref} from "vue";
import {Reserva} from "src/model/Reserva";
import {ReservatService} from "src/service/ReservaService";
import {useQuasar} from "quasar";
import {useRouter} from "vue-router";

const $q = useQuasar()
const $router = useRouter();

const reserva:Ref<Reserva> = ref({} as Reserva);

async function save(){
  const dialog = $q.dialog({
    message: 'Carregant...',
    progress: true, // we enable default settings
    persistent: true, // we want the user to not be able to close it
    ok: false // we want the user to not be able to close it
  })

  await ReservatService.save(reserva.value)
  dialog.hide();

  //Redirect
  await $router.push('/reserves');
}

/*
import { defineComponent } from 'vue';
import {UsuariProfessor} from "src/model/UsuariProfessor";
import {UsuariProfessorService} from "src/service/UsuariProfessorService";


export default defineComponent({
  name: 'UsuariForm',
  data() {
    return {
      usuari: {} as UsuariProfessor,
      usuaris: [] as UsuariProfessor[],
      pathPhotos: process.env.APP_PATHPHOTOS_CONVALIDACIONS,
    }
  },
  async created() {
    await this.get();
  },
  methods: {
    get: async function () {
      const dialog = this.$q.dialog({
        message: 'Carregant...',
        progress: true, // we enable default settings
        persistent: true, // we want the user to not be able to close it
        ok: false // we want the user to not be able to close it
      });
      const id:string = (this.$route.params.id)?this.$route.params.id+'':'';

      if(id && id!='') {
        console.log(id)
        const usuari:UsuariProfessor = await UsuariProfessorService.getById(parseInt(id));

        this.usuari = usuari;

        const usuaris = await UsuariProfessorService.findUsuaris();
        this.usuaris = await Promise.all(usuaris);

        if(this.usuari.substitut){
          this.usuari.substitut = this.usuaris.find(u=>u.id===this.usuari.substitut?.id)
        }
      }


      //dialog.hide();
    },
    save: async function(){
      const dialog = this.$q.dialog({
        message: 'Carregant...',
        progress: true, // we enable default settings
        persistent: true, // we want the user to not be able to close it
        ok: false // we want the user to not be able to close it
      })

      await UsuariProfessorService.save(this.usuari)
      dialog.hide();

      //Redirect
      await this.$router.push('/usuaris');
    }
  }
})*/
</script>
