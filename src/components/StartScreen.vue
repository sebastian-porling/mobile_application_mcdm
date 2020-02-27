<template>

<div id="startscreen">
	<div id="title">
		<h1 class="font-weight-thin text-center">Welcome to the Decision-model</h1>
	</div>

	<v-row
        align="center"
        justify="center" id="desc">
		<p class="font-weight-thin">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, possimus. <br>
			Voluptate veniam dolorum quas ipsam cupiditate at tempora libero, <br>
			perferendis reiciendis saepe doloremque ipsum nihil nisi velit quod tenetur voluptatum.
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