<template>
  <ion-page>
    <ion-content fullscreen>
      <div>
        <div class="ion-padding-bottom">
          <img
            class="main"
            src="http://d2u4q3iydaupsp.cloudfront.net/M9YO50StNO9wcaIKVYLMIAVeaOrWxAHoEXoIO0K1D9hMa6RlXDkuExDgDwGnn1NTP70WO5k6SoYUhqA2jEzvSp5Fj0jmHNjAWq11rOt0OA59j6pLWSEK6jEWMrGxtiG2"
          />
        </div>
        <ion-list
          class="ion-padding-end"
          v-for="room in roomList"
          v-bind:key="room._id"
        >
          <ion-item class="ion-margin-bottom" href="/post">
            <ion-avatar slot="start">
              <img
                src="https://essblog.wpengine.com/wp-content/uploads/2020/05/rv-renovation-ideas.jpg"
              />
            </ion-avatar>
            <ion-label>
              <h2>
                <strong>{{ room.name }}</strong>
              </h2>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
      <ion-fab
        @click="openAddRoom()"
        horizontal="end"
        vertical="bottom"
        slot="fixed"
      >
        <ion-fab-button color="primary" style="margin:auto">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
        <h6>New Area</h6>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonItem,
  IonAvatar,
  IonLabel,
  IonIcon,
  IonFab,
  IonFabButton,
  modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { add } from "ionicons/icons";
import RoomAddModal from "./RoomAddModal.vue";
import axios from "axios";
export default defineComponent({
  components: {
    IonContent,
    IonItem,
    IonAvatar,
    IonLabel,
    IonIcon,
    IonFab,
    IonFabButton,
  },
  setup() {
    return {
      add,
    };
  },

  data() {
    return {
      roomList: [],
    };
  },

  created() {
    this.listOfRooms();
  },
  methods: {
    async listOfRooms() {
      const options = {
        method: "POST",
        url: "http://localhost:3000/Room/search",
        headers: { "Content-Type": "application/json" },
        data: {
          creator: "507f1f77bcf86cd799439014",
          page: 1,
          Rv: "60a27186c189465f8d33814b",
        },
      };

      const rooms = await axios.request(options);
      console.log(rooms);
      this.roomList = rooms.data.data;
      console.log(this.roomList);
    },

    async openAddRoom() {
      const modal = await modalController.create({
        component: RoomAddModal,
        cssClass: "my-custom-class",
        swipeToClose: true,
        componentProps: {
          title: "New Title",
        },
      });
      return modal.present();
    },
  },
});
</script>

<style scoped>
ion-icon {
  font-size: 30px;
}

.main {
  border-radius: 0px 0px 20px 20px;
}

/* .list-avatar {
  margin-top: 20px;
  size: 50px;
} */
</style>
