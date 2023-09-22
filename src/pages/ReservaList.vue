<template>
  <q-page class="flex column" padding>
      <div class="row">
        <div class="col-12">
          hola
          {{reserves}}
          adeu
          :filter="filter"
          <q-table
            :table-style="{ width: '100%' }"
            :dense="$q.screen.lt.lg"
            :grid="$q.screen.lt.sm"
            title="Les meves reserves"
            :rows="reserves"
            :columns="columnes"
            row-key="idusuari"
          >
            <template v-slot:top-right>
              <!--q-input borderless dense debounce="300" v-model="filter" placeholder="Cerca">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input-->
            </template>

            <template v-slot:body-cell-accions="props">
              <q-td :props="props">
                <div>
                  <q-btn-group push>
                    <q-btn icon="edit" color="primary" dense :to="'/reserva/'+props.value">
                      <q-tooltip>
                        Editar
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
import {QTableColumn} from "quasar";
import {Reserva} from "src/model/Reserva";
import moment from 'moment'

const reserves:Ref<Reserva[]> = ref([] as Reserva[]);
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
  }
]

onMounted(async ()=>{
  reserves.value = await ReservatService.findAll();
  console.log("reserves",reserves.value)
})

</script>
