<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          GestSuite - Reserva d'espais
        </q-toolbar-title>

        <Menuapp v-if="enableApps && (rolsUser.find(rol=>rol===rols.ADMINISTRADOR || rol===rols.DIRECTOR || rol===rols.CAP_ESTUDIS || rol===rols.ADMINISTRATIU || rol===rols.WEB))"></Menuapp>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item v-if="!calendaris || calendaris.length==0">
          <q-item-section>
            <q-item-label>
              <q-skeleton type="rect" animation="wave"/>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="!calendaris || calendaris.length==0">
          <q-item-section>
            <q-item-label>
              <q-skeleton type="rect" animation="wave"/>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-for="calendari in calendaris" clickable :to="`/reserves/${calendari.id}`">
          <q-item-section avatar>
            <q-icon name="calendar_month" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{calendari.nom}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sortir</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script lang="ts">

import {defineComponent, Ref, ref} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {Rol} from '../model/Rol'
import Menuapp from '../components/common/AppsMenu.vue';
import {ReservatService} from "src/service/ReservaService";
import {Calendari} from "src/model/Calendari";

export default defineComponent({
  name: 'MainLayout',
  components:{
    Menuapp
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const rolsUser = (localStorage.getItem("rol"))?JSON.parse(localStorage.getItem("rol")!):[]; //Inicialitzem a un array buit si no existeix cap rol
    const router = useRouter()
    const route = useRoute()
    const rols = Rol;

    const enableGrupsCooperatius = (process.env.APP_ENABLE_GRUPSCOOPERATIUS==='true');
    const enableConvalidacions=(process.env.APP_ENABLE_CONVALIDACIONS==='true');
    const enableProfessoratManager=(process.env.APP_ENABLE_PROFESSORATMANAGER==='true');

    const enableApps = enableGrupsCooperatius || enableConvalidacions || enableProfessoratManager;

    const calendaris:Ref<Calendari[]> = ref([] as Calendari[]);

    return {
      rolsUser,
      rols,
      enableApps,
      leftDrawerOpen,
      calendaris,
      route,
      router,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      goBack(){
        router.go(-1);
      }
    }
  },
  async mounted (){
    this.calendaris = await ReservatService.findAllCalendaris();
    console.log("Calendaris",this.calendaris)
  }
})
</script>
