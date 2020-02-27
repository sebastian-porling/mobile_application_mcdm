<template>
  <div id="formquestions">
	
    <v-form id="form" v-model="valid" lazy-validation ref="form">
      <div id="functions">
		<v-btn class="mx-2" fixed fab dark color="primary" @click="help = !help">
			<v-icon dark>mdi-help</v-icon>
		</v-btn>
        <h2 class="text-center font-weight-thin">Needed functions:</h2>
        <v-row align="center" justify="center">
          <v-switch class="pa-2" v-model="functionsNeeded[0]" label="App store presence" value="App store presence"></v-switch>
          <v-switch class="pa-2" v-model="functionsNeeded[1]" label="Integrated camera function" value="Integrated camera function"></v-switch>
          <v-switch class="pa-2" v-model="functionsNeeded[2]" label="Bluetooth" value="Bluetooth"></v-switch>
          <v-switch class="pa-2" v-model="functionsNeeded[3]" label="NFC" value="NFC"></v-switch>
          <v-switch class="pa-2" v-model="functionsNeeded[4]" label="Notifications" value="Notifications"></v-switch>
          <v-switch class="pa-2" v-model="functionsNeeded[5]" label="Surrounding sensors" value="Surrounding sensors"></v-switch>
          <v-switch class="pa-2" v-model="functionsNeeded[6]" label="Vibration" value="Vibration"></v-switch>
          <v-switch class="pa-2" v-model="functionsNeeded[7]" label="Contacts" value="Contacts"></v-switch>
          <v-switch class="pa-2" v-model="functionsNeeded[8]" label="Scheduling" value="Scheduling"></v-switch>
          <v-switch class="pa-2" v-model="functionsNeeded[9]" label="Background sync" value="Background sync"></v-switch>
          <v-switch class="pa-2" v-model="functionsNeeded[10]" label="High accuracy GPS" value="High accuracy GPS"></v-switch>
          <v-switch class="pa-2" v-model="functionsNeeded[11]" label="Geofencing" value="Geofencing"></v-switch>
          <v-switch class="pa-2" v-model="functionsNeeded[12]" label="VR/AR" value="VR/AR"></v-switch>
          <v-switch class="pa-2" v-model="functionsNeeded[13]" label="Advanced screen manipulation" value="Advanced screen manipulation"></v-switch>
        </v-row>
      </div>
      <v-row align="center" justify="center">
        <div class="radio-question">
          <v-label>Which competences are available in the customers business?:</v-label>
          <v-radio-group v-model="questions.competence" required :rules="[v => !!v || 'You must add the competence!']">
            <v-radio label="Web" value="web"></v-radio>
            <v-radio label="Android and/or iOS" value="native"></v-radio>
            <v-radio label="All of the above" value="all"></v-radio>
            <v-radio label="None" value="none"></v-radio>
          </v-radio-group>
        </div>
      </v-row>

      <v-row align="center" justify="center">
        <div class="radio-question">
          <v-label>Does a website with the same functions already exist? :</v-label>
          <v-radio-group
            v-model="questions.website"
            required
            :rules="[v => !!v || 'You must anwer the question']"
          >
            <v-radio label="Yes" value="yes-exists"></v-radio>
            <v-radio label="No" value="no-exists"></v-radio>
          </v-radio-group>
        </div>
      </v-row>

      <v-row align="center" justify="center">
        <div class="radio-question">
          <v-label>Is the app short-lived?:</v-label>
          <v-radio-group
            v-model="questions.shortLived"
            required
            :rules="[v => !!v || 'You must anwer the question']"
          >
            <v-radio label="Yes" value="yes-short"></v-radio>
            <v-radio label="No" value="no-short"></v-radio>
          </v-radio-group>
        </div>
      </v-row>
      <v-row align="center" justify="center">
        <v-btn
          elevation="5"
          x-large
          color="primary"
          id="next"
          @click="validateQuestions()"
        >Next</v-btn>
      </v-row>
    </v-form>
	<v-dialog v-model="help" max-width="500px">
          <v-card>
            <v-card-text>
				<br>
				<p><b>App store presence</b> - Does the app have to be available on Google Play and/or App store?</p>
				<p><b>Integrated camera function</b> - Are more advaced camara functions necassary for the application? Such as zoom and/or ISO etc.</p>
				<p><b>Bluetooth</b> - Does the application need to access Bluetooth?</p>
				<p><b>NFC</b> - Does the application need to access NFC?</p>
				<p><b>Notifications</b> - Does the application need to have Push Notifications or Local Notifications? </p>
				<p><b>Surrounding sensors</b> - Are sensors like ambient light or proximity sensor needed?</p>
				<p><b>Vibration</b> - Does the application need to make the phone vibrate?</p>
				<p><b>Contacts</b> - Does the application need to access the phones contact list?</p>
				<p><b>Scheduling</b> - Does the application need acces to the phones local task Scheduling? Like making timers and reminders?</p>
				<p><b>Background sync</b> - Does the application need to synchronize data while not actively used?</p>
				<p><b>High accuracy GPS</b> - Will the application need more accuracy for GPS than just "tagging"?</p>
				<p><b>Geofencing</b> - Does the app need to define geographic areas and receive notifications when the device enters or leaves these areas</p>
				<p><b>VR/AR</b> - Virtual and/or Augumented Reality</p>
				<p><b>Advanced screen manipulation</b> - Does the applacation need to access the screen orientation, screen lock and fullscreen mode?</p>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text color="primary" @click="help = false">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
		help: false,
      functionsNeeded: this.$store.state.formQuestions.functionsNeeded,
      questions: this.$store.state.formQuestions.questions,
      valid: true
    };
  },
  methods: {
    validateQuestions() {
      if (!this.$refs.form.validate()) {
        this.valid = false;
      } else {
        this.$store.state.formQuestions = {
          functionsNeeded: this.functionsNeeded,
          questions: this.questions
        };
        console.log(this.$store.state.formQuestions);
        this.$router.push("/ranking");
      }
    }
  }
};
</script>

<style>
.pa-2 {
  padding-left: 10px;
  padding-right: 10px;
  
}
#functions {
  padding: 10px;
}
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.radio-question {
  min-width: 100%;
  padding-left: 30pt;
  padding-right: 30pt;
}
#next {
  margin-bottom: 30pt;
  margin-top: 10pt;
}
#form {
  max-width: 800px;
  margin: 0 auto;
}
#functions{
	padding: 12px;
}
@media screen and (min-width: 460px) {
  .radio-question {
    min-width: 460px;
    padding-left: 10pt;
    padding-right: 10pt;
  }
}

</style>