<template>
  <q-page class="flex column" padding>
      <div class="row">
        <div class="col-12">
          <h3>Calendari: {{calendari.nom}}</h3>
          <p class="text-subtitle2">Visualitza el calendari <a class="text-red" target="_blank" :href="`https://calendar.google.com/calendar/embed?src=${calendari.id}&ctz=Europe%2FMadrid`">AQUÍ</a></p>
          <p class="text-subtitle2">Afegeix el calendari en format iCal amb aquesta URL: <a class="text-red" target="_blank" :href="`https://calendar.google.com/calendar/ical/${calendari.id}/public/basic.ics`">https://calendar.google.com/calendar/ical/{{calendari.id}}/public/basic.ics</a></p>

          <q-btn-group push class="q-mb-lg">
            <q-btn  color="primary" label="Nova reserva" icon="add" :to="`/reserva/${calendari.id}`"/>
          </q-btn-group>

          <q-table
            :table-style="{ width: '100%' }"
            :dense="$q.screen.lt.lg"
            :grid="$q.screen.lt.sm"
            title="Les meves reserves"
            :rows="reserves"
            :columns="columnes"
            row-key="id"
            :filter="filter"
          >
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Cerca">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>
            </template>

            <template v-slot:body-cell-accions="props">
              <q-td :props="props">
                <div>
                  <q-btn-group push>
                    <q-btn icon="edit" color="primary" dense :to="'/reserva/'+calendari.id+'/'+props.value">
                      <q-tooltip>
                        Editar
                      </q-tooltip>
                    </q-btn>
                    <q-btn icon="delete" color="primary" dense @click="esborrar(props.value)">
                      <q-tooltip>
                        Esborra
                      </q-tooltip>
                    </q-btn>
                  </q-btn-group>
                </div>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
  </q-page>
</template>

<script lang="ts" setup>

import {onMounted, Ref, ref} from "vue";
import {ReservatService} from "src/service/ReservaService";
import {QTableColumn, useQuasar} from "quasar";
import {Reserva} from "src/model/Reserva";
import moment from 'moment'
import {Calendari} from "src/model/Calendari";
import {useRoute} from "vue-router";
const $q = useQuasar();
const reserves:Ref<Reserva[]> = ref([] as Reserva[]);
const calendari:Ref<Calendari> = ref({} as Calendari);
const $route = useRoute()

const idcalendari:string = ($route.params.idcalendari)?$route.params.idcalendari+'':'';

const columnes:QTableColumn[] = [
  {
    name: 'descripcio',
    required: true,
    label: 'Descripció',
    align: 'left',
    field: row => row.descripcio,
    sortable: true
  },
  {
    name: 'datainici',
    required: true,
    label: 'Data Inici',
    align: 'left',
    field: row => moment(row.dataInici).format("DD/MM/YYYY HH:mm"),
    sortable: true
  },
  {
    name: 'datafi',
    required: true,
    label: 'Data Fi',
    align: 'left',
    field: row => moment(row.dataFi).format("DD/MM/YYYY HH:mm"),
    sortable: true
  },
  {
    name: 'accions',
    required: true,
    label: 'Accions',
    align: 'center',
    field: row => row.id,
    sortable: true
  }
]

const filter = ref('')

function esborrar(id:number){
  $q.dialog({
    title: 'Confirm',
    message: 'Vol eliminar aquesta reserva?',
    ok: "D'acord",
    cancel: "Cancel·la",
    persistent: true
  }).onOk(async () => {
    console.log('>>>> OK',id)
    await ReservatService.esborrar(id,idcalendari);
    setTimeout(function(){
      //Refresh data
      window.location.reload();
    },2000)
  })
}

onMounted(async ()=>{
  calendari.value = await ReservatService.getCalendariById(idcalendari)
  reserves.value = await ReservatService.findAllMyReserves(idcalendari);
})

</script>
