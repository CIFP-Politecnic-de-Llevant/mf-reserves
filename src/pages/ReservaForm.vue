<template>
  <q-page class="flex column q-gutter-lg" padding>

    <p class="text-h3">{{reserva.descripcio || 'Nova reserva'}}</p>
    <p class="text-subtitle2">Comprova la disponibilitat del calendari <a class="text-red" target="_blank" :href="`https://calendar.google.com/calendar/embed?src=${calendari.id}&ctz=Europe%2FMadrid`">AQUÍ</a></p>
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

import {onMounted, Ref, ref} from "vue";
import {Reserva} from "src/model/Reserva";
import {ReservatService} from "src/service/ReservaService";
import {Notify, useQuasar} from "quasar";
import {useRoute, useRouter} from "vue-router";
import moment from 'moment'
import {Calendari} from "src/model/Calendari";

const $q = useQuasar()
const $router = useRouter()
const $route = useRoute()

const reserva:Ref<Reserva> = ref({} as Reserva);

const calendari:Ref<Calendari> = ref({} as Calendari);
const idcalendari:string = ($route.params.idcalendari)?$route.params.idcalendari+'':'';

async function save(){
  if(!reserva.value.descripcio){
    Notify.create({
      message: "El motiu de la reserva és obligatori",
      type: 'negative'
    })
    return;
  }

  if(!reserva.value.dataInici){
    Notify.create({
      message: "La data d'inici és obligatòria",
      type: 'negative'
    })
    return;
  }

  if(!reserva.value.dataFi){
    Notify.create({
      message: "La data de fi és obligatòria",
      type: 'negative'
    })
    return;
  }

  if(reserva.value.dataInici && reserva.value.dataFi && moment(reserva.value.dataInici) > moment(reserva.value.dataFi)){
    Notify.create({
      message: "La data d'inici no pot ser posterior a la data de fi",
      type: 'negative'
    })
    return;
  }


  const dialog = $q.dialog({
    message: 'Carregant...',
    progress: true, // we enable default settings
    persistent: true, // we want the user to not be able to close it
    ok: false // we want the user to not be able to close it
  })

  await ReservatService.save(reserva.value,idcalendari)
  dialog.hide();

  //Redirect
  await $router.push('/reserves/'+idcalendari);
}

onMounted(async ()=>{
  calendari.value = await ReservatService.getCalendariById(idcalendari)

  const id:string = ($route.params.id)?$route.params.id+'':'';

  if(id && id!='') {
    reserva.value = await ReservatService.getReservaById(id,idcalendari);

    //Parsejam les dates
    reserva.value.dataInici = moment(reserva.value.dataInici).format("YYYY-MM-DD HH:mm");
    reserva.value.dataFi = moment(reserva.value.dataFi).format("YYYY-MM-DD HH:mm");
    console.log(reserva.value);
  }
})
</script>
