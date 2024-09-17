<template>
  <Loader v-if="state.isLoading"/>
  <template v-else>
    <div
      class="row justify-content-end"
      v-if="isSearch"
    >
      <div class="col-lg-4 ml-auto">
        <Field
          type="text"
          :placeholder="t('field.title.search')"
          :isShowLabel="false"
          v-model="searchFieldValue"
        />
      </div>
    </div>
    <table
      class="table"
    >
      <thead>
      <tr>
        <th v-if="draggable"></th>
        <th v-if="showIndex" scope="col">#</th>
        <th
          v-for="th in table"
          scope="col"
        >
          {{ th.title }}
        </th>
        <th v-if="edit"></th>
        <th v-if="editByReturnId"></th>
        <th v-if="remove"></th>
      </tr>
      </thead>
      <Sortable
        :list="list"
        item-key="id"
        tag="tbody"
        v-if="draggable"
        @update="emit('onDragEnd', $event)"
      >
        <template #item="{element, index}">
          <tr>
            <td width="30" v-if="draggable">
                            <span class="draggable-dots">
                                <Icon name="dots-three-outline" class="cursor-pointer"/>
                            </span>
            </td>
            <td
              v-if="showIndex"
              width="30"
            >
              {{ index + 1 }}
            </td>
            <template
              v-for="(cell,i) in table"
              :key="i"
            >
              <td
                :width="cell.width ? cell.width : 'auto'"
                v-if="cell.type === 'showHide'"
              >
                                <span
                                  @click="showHideActionHandler(element)"
                                  class="eye"
                                >
                                    <Icon
                                      name="eye"
                                      :color="element.show ? 'green' : 'red'"
                                    />
                                </span>
              </td>
              <td
                :width="cell.width ? cell.width : 'auto'"
                v-else-if="cell.type === 'changePrices'"
              >
                                    <span @click="changePricesHandler(element,cell)" role="button">
                                        {{ t('table.th.changePrices') }}
                                    </span>
              </td>
              <td v-else :width="cell.width ? cell.width : 'auto'">
                {{ element[cell.value] }}
              </td>
            </template>
            <td
              v-if="editByReturnId"
              class="middle"
              width="30"
            >
              <span
                class="edit-btn"
                role="button"
                @click="editInModal(element)"
              >
                  <Icon
                    name="edit"
                  />
              </span>
            </td>
            <td
              v-if="edit"
              class="middle"
              width="30"
            >
              <span
                class="edit-btn"
                role="button"
                @click="goToPage(element)"
              >
                  <Icon
                    name="edit"
                  />
              </span>
            </td>
            <td
              v-if="remove"
              width="30"
            >
              <span
                class="edit-btn"
                role="button"
                @click="showRemoveModal(element)"
              >
                  <Icon
                    class="trash-icon"
                    name="trash"
                  />
              </span>
            </td>
          </tr>
        </template>
      </Sortable>
      <template
        v-else
      >
        <tbody>
        <template
          v-for="(item,idx) in list"
          :key="idx"
        >
          <tr>
            <th
              v-if="showIndex"
              width="30"
            >
              {{ idx + 1 }}
            </th>
            <template
              v-for="(cell,i) in table"
              :key="i"
            >
              <td
                :width="cell.width ? cell.width : 'auto'"
                v-if="cell.type === 'showHide'"
              >
                                    <span
                                      @click="showHideActionHandler(item)"
                                      class="eye"
                                    >
                                        <Icon
                                          name="eye"
                                          :color="item.show ? 'green' : 'red'"
                                        />
                                    </span>
              </td>
              <td
                :width="cell.width ? cell.width : 'auto'"
                v-if="cell.type === 'changePrices'"
              >
                                    <span @click="changePricesHandler(item,cell)" role="button">
                                        {{ t('table.th.changePrices') }}
                                    </span>
              </td>
              <td
                :width="cell.width ? cell.width : 'auto'"
                v-else
              >
                {{ item[cell.value] }}
              </td>
            </template>

            <td
              v-if="editByReturnId"
              class="middle"
              width="30"
            >
              <span
                class="edit-btn"
                role="button"
                @click="editInModal(item)"
              >
                  <Icon
                    name="edit"
                  />
              </span>
            </td>
            <td
              v-if="edit"
              class="middle"
              width="30"
            >
              <span
                class="edit-btn"
                role="button"
                @click="goToPage(item)"
              >
                  <Icon
                    name="edit"
                  />
              </span>
            </td>
            <td
              v-if="remove"
              width="30"
            >
                                <span
                                  class="edit-btn"
                                  role="button"
                                  @click="showRemoveModal(item)"
                                >
                                    <Icon
                                      class="trash-icon"
                                      name="trash"
                                    />
                                </span>
            </td>
          </tr>
        </template>
        </tbody>

      </template>
    </table>
  </template>

  <Modal
    :open="isModalOpen"
    :title="t('headers.isRemove')"
    width="50%"
    height="90%"
    @action="modalActionsHandler"
  >
    <p>Удалить элемент {{ itemToRemoveTitle }} навсегда?</p>
    <template #actions>
      <div
        class="modal-footer"
      >
        <button
          type="button"
          class="btn btn-secondary"
          @click="hideRemoveModal"
        >
          {{ t('button.cancel') }}
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="removeItemHandler"
        >
          {{ t('button.delete') }}
        </button>
      </div>
    </template>
  </Modal>

  <ChangePriceModal
    v-if="showChangePriceModal"
    :productId="productToFetchVariants"
    :is-show-modal="showChangePriceModal"
    @action="changePriceModalActions"
  />
</template>

<script setup lang="ts">

import Loader from "@/components/Share/Loader/Loader.vue";
import Icon from "@/components/Share/Icon/Icon.vue";
import router from "@/router"
import {useI18n} from "vue-i18n";
import Modal from "@/components/Share/Modal/Modal.vue";
import {Ref, ref, watch} from "vue";

const {t} = useI18n()

import SortableJS from 'sortablejs'
import {MultiDrag} from 'sortablejs/modular/sortable.core.esm'
import {Sortable} from 'sortablejs-vue3'
import Field from "@/components/Form/Field/Field.vue";
import ChangePriceModal from "@/views/Variants/inc/ChangePriceModal.vue";

try {
  SortableJS?.mount(new MultiDrag())
} catch (error) {

}


const emit = defineEmits(['action', 'onDragEnd'])

const props = defineProps({
  table: {
    type: Array,
    default: () => []
  },
  list: {
    type: Array,
    default: () => []
  },
  page: {
    type: String,
    default: ''
  },
  remove: {
    type: Boolean,
    default: false
  },
  state: {
    type: Object,
    default: {}
  },
  edit: {
    type: Boolean,
    default: true
  },
  editByReturnId: {
    type: Boolean,
    default: false
  },
  draggable: {
    type: Boolean,
    default: false
  },
  showIndex: {
    type: Boolean,
    default: false
  },
  isSearch: {
    type: Boolean,
    default: false
  }
})

const searchFieldValue: Ref = ref('')

const isModalOpen: Ref = ref(false)

const goToPage = (item) => {
  router.push({name: props.page, params: {id: item.id}})
}


const editInModal = (item) => {
  emit('action', {type: 'editInModal', value: item})
}

const modalActionsHandler = (event: any) => {
  switch (event) {
    case 'cancel':
      hideRemoveModal()
      break
    default:
      break

  }
}

const itemToRemove: Ref = ref({});
const itemToRemoveTitle: Ref = ref('');

const showRemoveModal = (item: any) => {
  itemToRemove.value = item
  itemToRemoveTitle.value = item.title
  isModalOpen.value = true
}
const hideRemoveModal = () => {
  isModalOpen.value = false
  itemToRemove.value = {}
  itemToRemoveTitle.value = ''
}

const removeItemHandler = () => {
  emit('action', {type: 'removeItem', value: itemToRemove.value})
  hideRemoveModal()
}

const changePriceModalActions = (event) => {
  if (event) {
    switch (event.type) {
      case 'hideChangePriceModal':
        hideChangePriceModal()
        break
      case 'reload':
        emit('action', {type: 'reload', value: true})
        break
      default:
        break
    }
  }
}

const showChangePriceModal: Ref = ref(false)

const hideChangePriceModal = () => {
  showChangePriceModal.value = false
}
const changePricesHandler = (item: any, cell: any) => {
  changePriceModalAction(item, cell)
}

const productToFetchVariants: Ref = ref(0)
const changePriceModalAction = (item: any, cell: any) => {
  showChangePriceModal.value = true
  productToFetchVariants.value = item?.id
}

const showHideActionHandler = (item: any) => {
  emit('action', {type: 'showHide', value: item})
}


watch(() => searchFieldValue.value, () => {
  emit('action', {type: 'search', value: searchFieldValue.value})
})


</script>

<style lang="scss" scoped>
.edit-btn {
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: block;
  margin-left: auto;
}

.middle {
  vertical-align: middle;
}

.eye {
  height: auto;
  display: block;
  width: 25px;
  cursor: pointer;
}

.trash-icon {
  width: 120%;
  height: 130%;
}

.draggable-dots {
  width: 26px;
  display: block;
  cursor: pointer;
}
</style>