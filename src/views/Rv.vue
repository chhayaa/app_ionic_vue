<template>
  <ion-page>
    <!-- <ion-header :translucent="true"> </ion-header> -->
    <ion-toolbar class="ion-no-border">
      <ion-item class="ion-no-padding ion-no-border">
        <ion-avatar slot="end">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ492AnNAAPJR3tuNh9iojWzyaVnyeQ3mApIw&usqp=CAU"
          /> </ion-avatar
        >{{ isDisabled }}
      </ion-item>
    </ion-toolbar>
    <ion-content class="ion-padding">
      <ion-toolbar>
        <ion-title>
          <h3 class="title">Your Rv's</h3>
          <!-- {{ maxPage.maxPage }} -->
        </ion-title>
      </ion-toolbar>

      <ion-button @click="toggleInfiniteScroll" expand="block">
        Toggle Infinite Scroll
      </ion-button>

      <ion-list
        class="ion-padding-top"
        v-for="Rv in totalRvs"
        v-bind:key="Rv._id"
      >
        <ion-item class="ion-no-padding ion-margin-bottom" href="/room">
          <ion-avatar slot="start">
            <img
              src="https://st.depositphotos.com/1203257/1763/i/950/depositphotos_17637335-stock-photo-yellowstone-rv-trip.jpg"
            />
          </ion-avatar>

          <ion-label>{{ Rv.name }}</ion-label>
          <ion-badge color="primary" class="ion-margin-end">10+</ion-badge>
          <div>
            <div class="circle">
              <ion-text color="light">
                <ion-icon src="/assets/icon/share.svg"></ion-icon>
              </ion-text>
            </div>
            <div class="small">
              Share
            </div>
          </div>
        </ion-item>
      </ion-list>
      <ion-fab
        style="margin-bottom:60px"
        @click="openAddRv"
        horizontal="end"
        vertical="bottom"
        slot="fixed"
      >
        <ion-fab-button color="primary" style="margin:auto">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
        <h6>Add an RV</h6>
      </ion-fab>
      <ion-infinite-scroll
        @ionInfinite="loadMore($event)"
        threshold="100px"
        id="infinite-scroll"
        :disabled="isDisabled"
      >
        <ion-infinite-scroll-content
          loading-spinner="bubbles"
          loading-text="Loading more data..."
        >
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonContent,
  IonIcon,
  IonAvatar,
  IonButton,
  IonModal,
  IonBadge,
  IonFab,
  IonFabButton,
  modalController,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import RvAddModal from "./RvAddModal.vue";
import axios from "axios";
export default {
  name: "Rv",
  component: {
    IonPage,
    IonToolbar,
    IonTitle,
    IonHeader,
    IonContent,
    IonIcon,
    IonAvatar,
    IonButton,
    IonModal,
    IonBadge,
    IonFab,
    IonFabButton,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  },
  setup() {
    const isDisabled = false;
    const toggleInfiniteScroll = () => {
      isDisabled.value = !isDisabled.value;
    };
    return {
      add,
      isDisabled,
      toggleInfiniteScroll,
    };
  },

  data() {
    return {
      page: 0,
      totalRvs: [],
      pageCount: [],
    };
  },

  created() {
    this.loadMore();
  },
  methods: {
    loadMore() {
      this.page = this.page + 1;
      this.listOfRvs(this.page);
    },
    async listOfRvs(page) {
      console.log(page);
      const options = {
        method: "POST",
        url: "http://localhost:3000/Rv/search",
        headers: { "Content-Type": "application/json" },
        data: { creator: "507f1f77bcf86cd799439014", page: this.page },
      };
      const data = await axios.request(options);

      data.data.data.forEach((element) => {
        this.totalRvs.push(element);
      });
      // this.totalRvs = data.data.data;
      this.pageCount = data.data;
      this.maxPage = this.pageCount.maxPage;
    },

    async openAddRv() {
      const modal = await modalController.create({
        component: RvAddModal,
        cssClass: "my-custom-class",
        swipeToClose: true,
        componentProps: {
          title: "New Title",
        },
      });
      return modal.present();
    },
  },
};
</script>

<style scoped>
.circle {
  width: 22px;
  height: 22px;
  background: #ffab01;
  font-size: 12px;
  border-radius: 50%;
  padding: 4px;
  margin: 0 auto;
}
.small {
  font-size: 12px;
}
</style>
