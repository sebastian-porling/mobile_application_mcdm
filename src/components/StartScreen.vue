<template>

<div id="startscreen">
	<div id="title">
		<h1 class="font-weight-thin text-center">Welcome to the Decision-model</h1>
	</div>

	<v-row
        align="center"
        justify="center" id="desc">
		<p class="font-weight-thin">
			You can start the decision-making by pressing start!
		</p>
	</v-row>
	
	<v-row align="center" justify="center">
		<router-link to="/questions">
			<v-btn elevation="5" x-large color="primary">Start</v-btn>
		</router-link>
	</v-row>
	
</div>
  
</template>

<script>
export default {

}
</script>

<style>
#startscreen{
	margin-top: 20pt;
	overflow: hidden;
}
#title{
	margin-bottom: 20pt;
}
#desc{
	max-width: 400px;
	padding: 10px;
	margin: 0 auto;
}
</style>