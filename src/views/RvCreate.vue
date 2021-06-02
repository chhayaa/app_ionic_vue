<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="closeRvAddModal()">
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Add an Rv</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding" v-if="rvData">
      <div class="ion-padding-vertical input-universal">
        <ion-label>Name Of Rv </ion-label>
        <input
          type="text"
          placeholder="Family Rv"
          class="bg-custom"
          name="name"
          v-model="rvData.name"
        />
      </div>

      <div class="ion-padding-vertical input-universal">
        <ion-label>Add an Image</ion-label>
        <ion-input
          placeholder="Add an Image"
          class="bg-custom"
          v-model="rvData.image"
        ></ion-input>
      </div>
      <div class="ion-text-center ion-padding-vertical">
        <ion-button shape="round" fill="outline" color="primary" size="medium">
          <ion-icon
            src="/assets/icon/share.svg"
            class="ion-padding-end"
          ></ion-icon>

          Share With People
        </ion-button>
      </div>
      <div class="ion-text-center">
        <ion-button
          @click="createRv()"
          color="primary"
          shape="round"
          size="medium"
        >
          Add Rv
        </ion-button>
      </div>
      <input v-model="message.name" placeholder="edit me" />
      <p>Message is: {{ message }}</p>
      <p>Rv Data: {{ rvData }}</p>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonIcon,
  IonButton,
  modalController,
} from "@ionic/vue";
import { arrowBack } from "ionicons/icons";
import axios from "axios";
export default {
  name: "RvModal",
  components: {
    IonPage,
    IonContent,
    IonIcon,
    IonButton,
  },
  setup() {
    return { arrowBack };
  },

  data() {
    return {
      rvData: { name: "abc", image: "" },
      message: { name: "" },
    };
  },
  methods: {
    closeRvAddModal() {
      modalController.dismiss();
    },

    async createRv() {
      const options = {
        method: "POST",
        url: "http://localhost:3000/RV/create",
        headers: { "Content-Type": "application/json" },
        data: {
          name: "chhaya",
          image: "",
          creator: "507f1f77bcf86cd799439014",
        },
      };

      const createdRv = await axios.request(options);
      this.console.log(createdRv);
      // console.log(this.familyRvName);
      this.closeRvAddModal();
    },
  },
};
</script>
